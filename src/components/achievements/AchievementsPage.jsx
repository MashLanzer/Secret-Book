import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { doc, setDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../contexts/AuthContext'
import { useExperiences } from '../../hooks/useExperiences'
import { positions } from '../../data/positions'
import { ACHIEVEMENTS } from '../../data/achievements'
import { triggerConfetti } from '../ui/Confetti'

export default function AchievementsPage() {
  const { profile } = useAuth()
  const { myExperiences } = useExperiences()
  const [unlocked, setUnlocked] = useState({})
  const [newUnlock, setNewUnlock] = useState(null)

  useEffect(() => {
    if (profile?.coupleId) loadUnlocked()
  }, [profile?.coupleId])

  const loadUnlocked = async () => {
    const snap = await getDocs(collection(db, 'couples', profile.coupleId, 'achievements'))
    const data = {}
    snap.forEach(d => { data[d.id] = d.data() })
    setUnlocked(data)
  }

  const stats = useMemo(() => {
    const exps = Object.values(myExperiences)
    const realizadas = exps.filter(e => e.realizada).length
    const favoritas = exps.filter(e => e.favorita).length
    const conComentarios = exps.filter(e => e.comentario?.trim()).length
    const tieneCalificacionPerfecta = exps.some(e => e.calificacion === 5)
    const avanzadasRealizadas = positions.filter(p => p.dificultad >= 4 && myExperiences[p.id]?.realizada).length
    const cats = new Set(positions.filter(p => myExperiences[p.id]?.realizada).map(p => p.categoria))
    return {
      realizadas, favoritas, conComentarios,
      tieneCalificacionPerfecta, avanzadasRealizadas,
      categoriasCompletadas: cats.size, rachaActual: 0,
    }
  }, [myExperiences])

  useEffect(() => {
    if (!profile?.coupleId) return
    ACHIEVEMENTS.forEach(async (ach) => {
      if (!unlocked[ach.id] && ach.condition(stats)) {
        await setDoc(doc(db, 'couples', profile.coupleId, 'achievements', ach.id), {
          unlockedAt: serverTimestamp(),
        })
        setUnlocked(prev => ({ ...prev, [ach.id]: { unlockedAt: new Date() } }))
        setNewUnlock(ach)
        triggerConfetti()
        setTimeout(() => setNewUnlock(null), 4000)
      }
    })
  }, [stats, unlocked, profile?.coupleId])

  const unlockedCount = ACHIEVEMENTS.filter(a => unlocked[a.id]).length

  return (
    <div className="page-container">
      <motion.div
        className="pt-8 mb-5"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Logros</h1>
        <p className="text-white/40 text-sm">{unlockedCount} de {ACHIEVEMENTS.length} desbloqueados</p>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="glass-card p-4 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between mb-2">
          <span className="text-white/70 text-sm font-medium">Progreso de logros</span>
          <span className="gradient-text font-bold">{Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)' }}
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* New unlock toast */}
      <AnimatePresence>
        {newUnlock && (
          <motion.div
            className="glass-strong p-4 mb-4 flex items-center gap-3"
            style={{ border: '1px solid rgba(168,85,247,0.5)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span className="text-3xl">{newUnlock.icon}</span>
            <div>
              <p className="text-white font-bold text-sm">¡Logro desbloqueado!</p>
              <p className="text-white/60 text-xs">{newUnlock.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements grid */}
      <div className="space-y-3">
        {ACHIEVEMENTS.map((ach, i) => {
          const isUnlocked = !!unlocked[ach.id]
          return (
            <motion.div
              key={ach.id}
              className="glass-card p-4 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ opacity: isUnlocked ? 1 : 0.5 }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: isUnlocked
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(236,72,153,0.4))'
                    : 'rgba(255,255,255,0.05)',
                  border: isUnlocked ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {isUnlocked ? ach.icon : '🔒'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm">{ach.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{ach.description}</p>
              </div>
              {isUnlocked && (
                <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
