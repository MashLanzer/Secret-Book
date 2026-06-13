import { useState, useEffect } from 'react'
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { auth, googleProvider } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getRedirectResult(auth)
      .then(result => {
        if (result?.user) {
          navigate('/')
        } else {
          setLoading(false)
        }
      })
      .catch(e => {
        console.error('Redirect result error:', e)
        setLoading(false)
      })
  }, [])

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/')
    } catch (e) {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        try {
          await signInWithRedirect(auth, googleProvider)
        } catch (e2) {
          setError(`Error: ${e2.code}`)
          setLoading(false)
        }
      } else {
        setError(`Error: ${e.code}`)
        setLoading(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>

      <div className="fixed top-0 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      <div className="fixed bottom-1/4 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />

      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <motion.div
            className="text-6xl mb-4 block"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
          >
            📖
          </motion.div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Secret Book</h1>
          <p className="text-white/40 text-sm">Solo para ustedes dos</p>
        </div>

        <div className="glass-strong p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-white text-center mb-2">Bienvenido/a</h2>
          <p className="text-white/50 text-sm text-center mb-8">
            Inicia sesión con tu cuenta de Google
          </p>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          {error && (
            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <p className="text-red-400 text-xs text-center font-mono break-all">{error}</p>
            </div>
          )}
        </div>

        <p className="text-white/25 text-xs text-center mt-6">
          Aplicación privada · Acceso restringido
        </p>
      </motion.div>
    </div>
  )
}
