import { useState, useEffect } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { getAvatarUrl } from '../../utils/helpers'
import { useExperiences } from '../../hooks/useExperiences'

const AVATAR_STYLES = [
  { key: 'fun-emoji', label: '😊 Emoji' },
  { key: 'bottts', label: '🤖 Robot' },
  { key: 'adventurer', label: '🧙 Aventurero' },
  { key: 'micah', label: '🎨 Retrato' },
  { key: 'lorelei', label: '🌸 Lorelei' },
  { key: 'pixel-art', label: '🕹️ Pixel' },
]

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const animation = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.round(v)),
    })
    return animation.stop
  }, [value])
  return <span>{display}</span>
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const { getStats } = useExperiences()
  const navigate = useNavigate()

  const [editName, setEditName] = useState(false)
  const [name, setName] = useState(profile?.displayName || '')
  const [avatarStyle, setAvatarStyle] = useState(profile?.avatarStyle || 'fun-emoji')
  const [avatarSeed, setAvatarSeed] = useState(profile?.avatarSeed || user?.uid)
  const [saving, setSaving] = useState(false)
  const [diceRotate, setDiceRotate] = useState(0)
  const [partnerProfile, setPartnerProfile] = useState(null)

  const stats = getStats()

  useEffect(() => {
    if (profile?.partnerId) {
      getDoc(doc(db, 'users', profile.partnerId)).then(snap => {
        if (snap.exists()) setPartnerProfile(snap.data())
      })
    }
  }, [profile?.partnerId])

  const rollDice = () => {
    setDiceRotate(r => r + 180)
    setAvatarSeed(Math.random().toString(36).substring(2, 10))
  }

  const saveProfile = async () => {
    setSaving(true)
    await updateDoc(doc(db, 'users', user.uid), {
      displayName: name.trim(),
      avatarStyle,
      avatarSeed,
      avatarUrl: getAvatarUrl(avatarSeed, avatarStyle),
    })
    await refreshProfile(user.uid)
    setSaving(false)
    setEditName(false)
  }

  const handleLogout = async () => {
    await signOut(auth)
    sessionStorage.removeItem('sb_unlocked')
    navigate('/')
  }

  const statCards = [
    { icon: '🌸', label: 'Exploradas', value: stats.realizadas, glow: 'rgba(168,85,247,0.25)' },
    { icon: '❤️', label: 'Favoritas', value: stats.favoritas, glow: 'rgba(236,72,153,0.25)' },
    { icon: '💬', label: 'Comentarios', value: stats.conComentarios, glow: 'rgba(124,58,237,0.25)' },
  ]

  const quickLinks = [
    { to: '/app/achievements', icon: '🏆', label: 'Logros', sub: 'Ver todos los logros' },
    { to: '/app/stats', icon: '📊', label: 'Estadísticas', sub: 'Análisis completo' },
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        className="pt-8 mb-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-2xl font-bold gradient-text">Mi Perfil</h1>
        <p className="text-white/40 text-sm">{user?.email}</p>
      </motion.div>

      {/* Avatar card */}
      <motion.div
        className="glass-card p-6 mb-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Avatar with pulsing ring */}
        <div className="relative mb-4">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #7c3aed, #ec4899, #7c3aed)',
              padding: '2.5px',
              borderRadius: '9999px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.6), transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="relative rounded-full overflow-hidden"
            style={{ padding: '2.5px', background: 'conic-gradient(from 0deg, #7c3aed, #ec4899, #7c3aed)' }}
          >
            <img
              src={getAvatarUrl(avatarSeed, avatarStyle)}
              alt="Avatar"
              className="w-24 h-24 rounded-full block object-cover"
              style={{ background: 'rgba(26,10,46,0.9)' }}
            />
          </div>
          <motion.button
            onClick={rollDice}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}
            animate={{ rotate: diceRotate }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.85 }}
          >
            🎲
          </motion.button>
        </div>

        {/* Name display / edit */}
        <AnimatePresence mode="wait">
          {editName ? (
            <motion.div
              key="editing"
              className="w-full flex flex-col items-center gap-2 mb-2"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-field text-center text-lg font-bold w-full"
                maxLength={20}
                autoFocus
                onKeyDown={e => e.key === 'Enter' && saveProfile()}
              />
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setEditName(false)}
                  className="flex-1 py-2 rounded-xl text-sm text-white/40 transition-all hover:text-white/60"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="display"
              onClick={() => setEditName(true)}
              className="text-xl font-bold gradient-text mb-1 flex items-center gap-1.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {profile?.displayName}
              <span className="text-base text-white/30">✏️</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Avatar style grid */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          {AVATAR_STYLES.map(s => (
            <motion.button
              key={s.key}
              onClick={() => setAvatarStyle(s.key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 rounded-xl text-xs font-medium transition-colors"
              style={{
                background: avatarStyle === s.key
                  ? 'linear-gradient(135deg,rgba(124,58,237,0.4),rgba(236,72,153,0.4))'
                  : 'rgba(255,255,255,0.05)',
                border: avatarStyle === s.key
                  ? '1px solid rgba(168,85,247,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                color: avatarStyle === s.key ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            >
              {s.label}
            </motion.button>
          ))}
        </div>

        {/* Save button (only when not in name-edit mode, for avatar changes) */}
        {!editName && (
          <motion.button
            onClick={saveProfile}
            disabled={saving}
            className="btn-primary w-full mt-4 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                Guardando...
              </span>
            ) : '💾 Guardar avatar'}
          </motion.button>
        )}
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-3 gap-2 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
      >
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card p-3 text-center"
            whileHover={{ y: -3, scale: 1.03 }}
            transition={{ duration: 0.2 }}
            style={{ boxShadow: `0 0 0 0 ${s.glow}` }}
            whileInView={{ boxShadow: `0 4px 20px ${s.glow}` }}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-xl font-bold gradient-text leading-tight">
              <AnimatedNumber value={s.value} />
            </div>
            <div className="text-[10px] text-white/40 mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Partner card */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
      >
        {profile?.coupleId && partnerProfile ? (
          <div
            className="glass-card p-4 flex items-center gap-4"
            style={{ border: '1px solid rgba(236,72,153,0.2)' }}
          >
            <div className="relative">
              <img
                src={getAvatarUrl(partnerProfile.avatarSeed || partnerProfile.uid, partnerProfile.avatarStyle || 'fun-emoji')}
                alt="Pareja"
                className="w-14 h-14 rounded-full object-cover"
                style={{ background: 'rgba(26,10,46,0.9)', border: '2px solid rgba(236,72,153,0.4)' }}
              />
              <span className="absolute -bottom-1 -right-1 text-sm">💕</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{partnerProfile.displayName || 'Tu pareja'}</p>
              <p className="text-white/40 text-xs">Pareja conectada</p>
            </div>
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
            />
          </div>
        ) : !profile?.coupleId ? (
          <Link to="/app/pair">
            <motion.div
              className="p-5 rounded-2xl flex items-center gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.15))',
                border: '1px solid rgba(168,85,247,0.3)',
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-3xl">💑</span>
              <div className="flex-1">
                <p className="text-white font-semibold">Conectar pareja</p>
                <p className="text-white/50 text-xs">Vincula tu cuenta para compartir el libro</p>
              </div>
              <motion.span
                className="text-purple-400"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronRight />
              </motion.span>
            </motion.div>
          </Link>
        ) : null}
      </motion.div>

      {/* Quick links */}
      <motion.div
        className="glass-card mb-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.24 }}
      >
        {quickLinks.map((item, i) => (
          <Link key={i} to={item.to}>
            <motion.div
              className="flex items-center justify-between p-4"
              style={{ borderBottom: i < quickLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)', x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-white/85 font-medium text-sm">{item.label}</p>
                  <p className="text-white/30 text-xs">{item.sub}</p>
                </div>
              </div>
              <motion.span
                className="text-white/30"
                whileHover={{ x: 3, color: 'rgba(168,85,247,0.8)' }}
              >
                <ChevronRight />
              </motion.span>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pb-6"
      >
        <motion.button
          onClick={handleLogout}
          className="w-full py-3.5 rounded-2xl font-semibold text-red-400 transition-colors"
          style={{ border: '1px solid rgba(239,68,68,0.2)' }}
          whileHover={{ backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          Cerrar sesión
        </motion.button>
      </motion.div>
    </div>
  )
}
