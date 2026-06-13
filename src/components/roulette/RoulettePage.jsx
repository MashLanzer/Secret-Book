import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { positions } from '../../data/positions'
import { useExperiences } from '../../hooks/useExperiences'
import PositionSVG from '../ui/PositionSVG'
import { CATEGORIES } from '../../data/positions'

const FILTER_OPTIONS = [
  { key: 'all', label: '✨ Todas', desc: 'Cualquier posición' },
  { key: 'pending', label: '📋 Pendientes', desc: 'Que no han hecho' },
  { key: 'favorites', label: '❤️ Favoritas', desc: 'Solo las favoritas' },
  { key: 'easy', label: '🌱 Fáciles', desc: 'Dificultad 1 o 2' },
  { key: 'hard', label: '⚡ Avanzadas', desc: 'Dificultad 4 o 5' },
]

export default function RoulettePage() {
  const navigate = useNavigate()
  const { myExperiences } = useExperiences()
  const [filterKey, setFilterKey] = useState('all')
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [angle, setAngle] = useState(0)

  const pool = useMemo(() => {
    return positions.filter(pos => {
      const exp = myExperiences[String(pos.id)] || {}
      if (filterKey === 'pending') return !exp.realizada
      if (filterKey === 'favorites') return exp.favorita
      if (filterKey === 'easy') return pos.dificultad <= 2
      if (filterKey === 'hard') return pos.dificultad >= 4
      return true
    })
  }, [filterKey, myExperiences])

  const spin = () => {
    if (spinning || pool.length === 0) return
    setSpinning(true)
    setResult(null)
    const spins = 5 + Math.random() * 3
    const newAngle = angle + spins * 360 + Math.random() * 360
    setAngle(newAngle)

    setTimeout(() => {
      const picked = pool[Math.floor(Math.random() * pool.length)]
      setResult(picked)
      setSpinning(false)
    }, 2200)
  }

  return (
    <div className="page-container">
      <motion.div
        className="pt-8 mb-6 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Ruleta</h1>
        <p className="text-white/40 text-sm mt-1">Deja que el destino decida 🎲</p>
      </motion.div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {FILTER_OPTIONS.map(f => (
          <button
            key={f.key}
            onClick={() => { setFilterKey(f.key); setResult(null) }}
            className="flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-2xl text-xs transition-all"
            style={{
              background: filterKey === f.key ? 'linear-gradient(135deg,rgba(124,58,237,0.4),rgba(236,72,153,0.4))' : 'rgba(255,255,255,0.05)',
              border: filterKey === f.key ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: filterKey === f.key ? 'white' : 'rgba(255,255,255,0.4)',
            }}
          >
            <span className="font-semibold">{f.label}</span>
            <span className="text-[10px] mt-0.5 opacity-60">{f.desc}</span>
          </button>
        ))}
      </div>

      <p className="text-center text-white/30 text-xs mb-6">
        {pool.length} posiciones disponibles
      </p>

      {/* Roulette wheel */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-52 h-52">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #7c3aed, #a855f7, #ec4899, #f472b6, #7c3aed)',
              opacity: 0.3,
            }}
          />
          {/* Spinning inner */}
          <motion.div
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(26,10,46,0.9)', border: '2px solid rgba(168,85,247,0.3)' }}
            animate={{ rotate: angle }}
            transition={{ duration: 2.2, ease: [0.1, 0.4, 0.0, 1.0] }}
          >
            {/* Segments visual */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 w-0.5 h-1/2 origin-bottom"
                  style={{
                    transform: `rotate(${deg}deg) translateX(-50%)`,
                    background: 'rgba(168,85,247,0.2)',
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
                >
                  <span className="text-2xl">{spinning ? '🌀' : '🎲'}</span>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Pointer */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4"
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
              clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
              filter: 'drop-shadow(0 2px 8px rgba(168,85,247,0.6))',
            }}
          />
        </div>

        {/* Spin button */}
        <motion.button
          onClick={spin}
          disabled={spinning || pool.length === 0}
          className="mt-6 px-10 py-4 rounded-2xl font-bold text-white text-lg disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          {spinning ? 'Girando...' : pool.length === 0 ? 'Sin opciones' : '🎲 Girar'}
        </motion.button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && !spinning && (
          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 18, stiffness: 300 }}
          >
            <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">¡El destino eligió!</p>
            <PositionSVG type={result.svgType} size={80} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold gradient-text mb-2">{result.nombre}</h2>
            <span
              className="badge text-xs mb-3"
              style={{
                background: CATEGORIES[result.categoria]?.bg,
                color: CATEGORIES[result.categoria]?.color,
              }}
            >
              {CATEGORIES[result.categoria]?.icon} {CATEGORIES[result.categoria]?.label}
            </span>
            <p className="text-white/50 text-sm mt-2 mb-4 leading-relaxed">
              {result.descripcion}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/app/catalog/${result.id}`)}
                className="btn-primary flex-1"
              >
                Ver detalle →
              </button>
              <button onClick={spin} className="btn-secondary px-4">
                🔄
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
