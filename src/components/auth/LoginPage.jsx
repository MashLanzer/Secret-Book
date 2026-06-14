import { useState, useEffect } from 'react'
import { signInWithPopup, getRedirectResult, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth, googleProvider } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Capacitor } from '@capacitor/core'
import { FirebaseAuthentication } from '@capacitor-firebase/authentication'

const orbs = [
  { color: '#7c3aed', size: 400, x: [-20, 20], y: [-30, 10], delay: 0, opacity: 0.13 },
  { color: '#ec4899', size: 320, x: [15, -15], y: [10, -20], delay: 1.5, opacity: 0.11 },
  { color: '#4f46e5', size: 280, x: [-10, 25], y: [20, -10], delay: 0.8, opacity: 0.10 },
  { color: '#a21caf', size: 240, x: [20, -5], y: [-15, 15], delay: 2.2, opacity: 0.09 },
]

function HeartsLogo() {
  return (
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ filter: 'drop-shadow(0 0 24px rgba(168,85,247,0.5))' }}
    >
      <svg width="72" height="64" viewBox="0 0 72 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* Left heart */}
        <path
          d="M22 8C16 8 10 13 10 20c0 10 12 20 22 28C42 40 54 30 54 20c0-7-6-12-12-12-4 0-7.5 2-10 5-2.5-3-5.5-5-10-5z"
          fill="url(#heartGradient)"
          opacity="0.9"
        />
        {/* Right heart — offset */}
        <path
          d="M36 14C30 14 24 19 24 26c0 10 12 20 22 28C56 46 68 36 68 26c0-7-6-12-12-12-4 0-7.5 2-10 5-2.5-3-5.5-5-10-5z"
          fill="url(#heartGradient)"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getRedirectResult(auth)
      .then(result => {
        if (result?.user) navigate('/')
        else setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await FirebaseAuthentication.signInWithGoogle({ useCredentialManager: false })
        const idToken = result.credential?.idToken
        if (!idToken) throw new Error('No se obtuvo idToken')
        const credential = GoogleAuthProvider.credential(idToken)
        await signInWithCredential(auth, credential)
      } else {
        await signInWithPopup(auth, googleProvider)
      }
      navigate('/')
    } catch (e) {
      console.error('Auth error:', e)
      setError(`${e.code ? `[${e.code}] ` : ''}${e.message || JSON.stringify(e)}`)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>
        <div className="text-center">
          <div className="relative w-14 h-14 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-pink-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          </div>
          <p className="text-white/40 text-sm tracking-wide">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>

      {/* Animated background orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            opacity: orb.opacity,
            filter: 'blur(60px)',
            left: `${[10, 60, 5, 55][i]}%`,
            top: `${[10, 60, 55, 15][i]}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: orb.delay }}
        />
      ))}

      <motion.div
        className="w-full max-w-sm relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HeartsLogo />
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold gradient-text tracking-tight mb-2">Secret Book</h1>
          <p className="text-white/40 text-sm tracking-wide">Solo para ustedes dos</p>
        </motion.div>

        {/* Card with gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(236,72,153,0.3), rgba(124,58,237,0.2))',
            padding: '1px',
            borderRadius: '24px',
          }}
        >
          <div style={{ background: 'rgba(13,6,23,0.92)', borderRadius: '23px', backdropFilter: 'blur(20px)' }}
            className="p-8">

            <h2 className="text-xl font-bold text-white text-center mb-1">Bienvenido/a</h2>
            <p className="text-white/40 text-sm text-center mb-8">
              Inicia sesión con tu cuenta de Google
            </p>

            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              style={{ background: 'white', color: '#374151' }}
            >
              <GoogleIcon />
              <span>Continuar con Google</span>
            </button>

            {error && (
              <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <p className="text-red-400 text-xs text-center font-mono break-all">{error}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-white/30 text-xs text-center mt-6 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Aplicación privada · Acceso restringido
        </motion.p>
      </motion.div>
    </div>
  )
}
