import { useState } from 'react'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { buildCoupleId, generateInviteCode } from '../../utils/helpers'

export default function PairPage() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState(null) // 'create' | 'join'
  const [myCode] = useState(generateInviteCode)
  const [inputCode, setInputCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const createRoom = async () => {
    setLoading(true)
    setError('')
    try {
      await setDoc(doc(db, 'invites', myCode), {
        creatorId: user.uid,
        code: myCode,
        createdAt: serverTimestamp(),
        used: false,
      })
      setMode('create')
    } catch (e) {
      setError('Error al crear código. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const joinRoom = async () => {
    if (!inputCode.trim()) return
    setLoading(true)
    setError('')
    try {
      const inviteRef = doc(db, 'invites', inputCode.trim().toUpperCase())
      const inviteSnap = await getDoc(inviteRef)
      if (!inviteSnap.exists() || inviteSnap.data().used) {
        setError('Código inválido o ya utilizado.')
        setLoading(false)
        return
      }
      const invite = inviteSnap.data()
      if (invite.creatorId === user.uid) {
        setError('No puedes unirte a tu propio código.')
        setLoading(false)
        return
      }

      const coupleId = buildCoupleId(user.uid, invite.creatorId)
      await setDoc(doc(db, 'couples', coupleId), {
        coupleId,
        userA: invite.creatorId,
        userB: user.uid,
        createdAt: serverTimestamp(),
      })
      await updateDoc(doc(db, 'users', user.uid), {
        coupleId, partnerId: invite.creatorId,
      })
      await updateDoc(doc(db, 'users', invite.creatorId), {
        coupleId, partnerId: user.uid,
      })
      await updateDoc(inviteRef, { used: true })
      await refreshProfile(user.uid)
      navigate('/app/dashboard')
    } catch (e) {
      setError('Error al unirse. Verifica el código.')
    } finally {
      setLoading(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(myCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const checkPaired = async () => {
    await refreshProfile(user.uid)
    navigate('/app/dashboard')
  }

  return (
    <div className="page-container">
      <motion.div
        className="pt-8 mb-6"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Conectar Pareja</h1>
        <p className="text-white/40 text-sm mt-1">Vincula tu cuenta con la de tu pareja</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {!mode ? (
          <div className="glass-card p-7 space-y-4">
            <div className="text-center mb-2">
              <span className="text-4xl">💑</span>
            </div>
            <button
              onClick={createRoom}
              disabled={loading}
              className="btn-primary w-full text-base py-4"
            >
              💌 Crear código de invitación
            </button>
            <button
              onClick={() => setMode('join')}
              className="btn-secondary w-full text-base py-4"
            >
              🔑 Tengo un código
            </button>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </div>
        ) : mode === 'create' ? (
          <div className="glass-card p-7 text-center">
            <p className="text-white/60 text-sm mb-3">Comparte este código con tu pareja:</p>
            <div
              className="text-4xl font-bold tracking-[0.3em] gradient-text mb-4 cursor-pointer"
              onClick={copyCode}
            >
              {myCode}
            </div>
            <button onClick={copyCode} className="btn-secondary w-full mb-4">
              {copied ? '✅ Copiado' : '📋 Copiar código'}
            </button>
            <p className="text-white/30 text-xs mb-4">
              Tu pareja debe ingresar este código desde su dispositivo.
              Mantén esta pantalla abierta.
            </p>
            <button
              onClick={checkPaired}
              className="btn-primary w-full"
            >
              Ya nos conectamos ✓
            </button>
            <button
              onClick={() => setMode(null)}
              className="text-white/30 text-sm mt-3 w-full text-center"
            >
              ← Volver
            </button>
          </div>
        ) : (
          <div className="glass-card p-7">
            <p className="text-white/60 text-sm mb-3">Ingresa el código de tu pareja:</p>
            <input
              type="text"
              value={inputCode}
              onChange={e => setInputCode(e.target.value.toUpperCase())}
              placeholder="Ej: AB12CD"
              maxLength={6}
              className="input-field text-center text-2xl tracking-widest font-bold mb-4"
            />
            <button
              onClick={joinRoom}
              disabled={!inputCode.trim() || loading}
              className="btn-primary w-full"
            >
              {loading ? 'Conectando...' : 'Conectar 💕'}
            </button>
            {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
            <button onClick={() => setMode(null)} className="text-white/30 text-sm mt-3 w-full text-center">
              ← Volver
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
