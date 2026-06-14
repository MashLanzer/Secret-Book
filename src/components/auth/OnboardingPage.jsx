import { useState } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAvatarUrl } from '../../utils/helpers'

const AVATAR_STYLES = [
  { key: 'fun-emoji', label: 'Emoji' },
  { key: 'bottts', label: 'Robot' },
  { key: 'adventurer', label: 'Aventurero' },
  { key: 'micah', label: 'Retrato' },
  { key: 'lorelei', label: 'Lorelei' },
  { key: 'pixel-art', label: 'Pixel' },
]

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.displayName?.split(' ')[0] || '')
  const [avatarStyle, setAvatarStyle] = useState('fun-emoji')
  const [avatarSeed, setAvatarSeed] = useState(user?.uid || 'default')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name.trim(),
        avatarStyle,
        avatarSeed,
        avatarUrl: getAvatarUrl(avatarSeed, avatarStyle),
        coupleId: null,
        partnerId: null,
        createdAt: serverTimestamp(),
      }, { merge: true })
      await refreshProfile(user.uid)
      navigate('/app/pair')
    } finally {
      setSaving(false)
    }
  }

  const randomSeed = () => setAvatarSeed(Math.random().toString(36).substring(2, 10))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>

      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Tu Perfil</h1>
          <p className="text-white/40 text-sm">Personaliza cómo aparecerás en el libro</p>
        </div>

        <div className="glass-strong p-7 rounded-3xl">
          {/* Avatar preview */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={getAvatarUrl(avatarSeed, avatarStyle)}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-2 object-cover"
                style={{ borderColor: 'rgba(168,85,247,0.5)', background: 'rgba(26,10,46,0.8)' }}
              />
              <button
                onClick={randomSeed}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
              >
                🎲
              </button>
            </div>
            <p className="text-white/40 text-xs mt-2">Toca 🎲 para cambiar</p>
          </div>

          {/* Avatar styles */}
          <div className="mb-5">
            <p className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Estilo de avatar</p>
            <div className="grid grid-cols-3 gap-2">
              {AVATAR_STYLES.map(s => (
                <button
                  key={s.key}
                  onClick={() => setAvatarStyle(s.key)}
                  className="py-2 px-1 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: avatarStyle === s.key
                      ? 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(236,72,153,0.4))'
                      : 'rgba(255,255,255,0.05)',
                    border: avatarStyle === s.key
                      ? '1px solid rgba(168,85,247,0.6)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: avatarStyle === s.key ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="mb-6">
            <p className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Tu nombre</p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="¿Cómo te llamas?"
              maxLength={20}
              className="input-field"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!name.trim() || saving}
            className="btn-primary w-full"
          >
            {saving ? 'Guardando...' : 'Continuar →'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
