import { useState } from 'react'
import { motion } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getAvatarUrl } from '../../utils/helpers'
import { useExperiences } from '../../hooks/useExperiences'
import { Link } from 'react-router-dom'

const AVATAR_STYLES = [
  { key: 'fun-emoji', label: '😊 Emoji' },
  { key: 'bottts', label: '🤖 Robot' },
  { key: 'adventurer', label: '🧙 Aventurero' },
  { key: 'micah', label: '🎨 Retrato' },
  { key: 'lorelei', label: '🌸 Lorelei' },
  { key: 'pixel-art', label: '🕹️ Pixel' },
]

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const { getStats } = useExperiences()
  const navigate = useNavigate()
  const [editName, setEditName] = useState(false)
  const [name, setName] = useState(profile?.displayName || '')
  const [avatarStyle, setAvatarStyle] = useState(profile?.avatarStyle || 'fun-emoji')
  const [avatarSeed, setAvatarSeed] = useState(profile?.avatarSeed || user?.uid)
  const [saving, setSaving] = useState(false)

  const stats = getStats()

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

  return (
    <div className="page-container">
      <motion.div
        className="pt-8 mb-5"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Mi Perfil</h1>
      </motion.div>

      {/* Avatar section */}
      <motion.div
        className="glass-card p-6 mb-4 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative mb-4">
          <img
            src={getAvatarUrl(avatarSeed, avatarStyle)}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 object-cover"
            style={{ borderColor: 'rgba(168,85,247,0.5)', background: 'rgba(26,10,46,0.8)' }}
          />
          <button
            onClick={() => setAvatarSeed(Math.random().toString(36).substring(2, 10))}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}
          >
            🎲
          </button>
        </div>

        {editName ? (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-field text-center text-lg font-bold mb-2"
            maxLength={20}
            autoFocus
          />
        ) : (
          <button onClick={() => setEditName(true)} className="text-xl font-bold gradient-text mb-1">
            {profile?.displayName} ✏️
          </button>
        )}
        <p className="text-white/40 text-sm">{user?.email}</p>

        {/* Avatar styles */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          {AVATAR_STYLES.map(s => (
            <button
              key={s.key}
              onClick={() => setAvatarStyle(s.key)}
              className="py-2 rounded-xl text-xs font-medium transition-all"
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
            </button>
          ))}
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="btn-primary w-full mt-4"
        >
          {saving ? 'Guardando...' : '💾 Guardar cambios'}
        </button>
      </motion.div>

      {/* Stats summary */}
      <motion.div
        className="glass-card p-5 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="section-title">Mis estadísticas</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Exploradas', value: stats.realizadas },
            { label: 'Favoritas', value: stats.favoritas },
            { label: 'Comentarios', value: stats.conComentarios },
          ].map(s => (
            <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p className="text-2xl font-bold gradient-text">{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pair banner when not connected */}
      {!profile?.coupleId && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Link to="/app/pair">
            <div
              className="p-5 rounded-2xl flex items-center gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))',
                border: '1px solid rgba(168,85,247,0.35)',
              }}
            >
              <span className="text-3xl">💑</span>
              <div className="flex-1">
                <p className="text-white font-semibold">Conectar pareja</p>
                <p className="text-white/50 text-xs">Vincula tu cuenta para compartir el libro</p>
              </div>
              <span className="text-purple-400 text-lg">›</span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Quick links */}
      <motion.div
        className="glass-card mb-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { to: '/app/achievements', label: '🏆 Logros', sub: 'Ver todos los logros' },
          { to: '/app/stats', label: '📊 Estadísticas', sub: 'Análisis completo' },
        ].map((item, i) => (
          <Link key={i} to={item.to}>
            <div
              className="flex items-center justify-between p-4 transition-colors hover:bg-white/5"
              style={{ borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            >
              <div>
                <p className="text-white/80 font-medium">{item.label}</p>
                <p className="text-white/30 text-xs">{item.sub}</p>
              </div>
              <span className="text-white/30">›</span>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleLogout}
          className="w-full py-3.5 rounded-2xl font-semibold text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-all"
        >
          Cerrar sesión
        </button>
      </motion.div>
    </div>
  )
}
