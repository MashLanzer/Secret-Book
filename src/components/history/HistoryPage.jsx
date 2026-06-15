import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { format, subMonths, isAfter } from 'date-fns'
import { es } from 'date-fns/locale'
import { useExperiences } from '../../hooks/useExperiences'
import { positions, CATEGORIES } from '../../data/positions'
import { formatDate, getStreakDays } from '../../utils/helpers'
import StarRating from '../ui/StarRating'
import PositionSVG from '../ui/PositionSVG'
import ActivityCalendar from './ActivityCalendar'

const FILTERS = [
  { key: '1m', label: '1 mes' },
  { key: '3m', label: '3 meses' },
  { key: 'all', label: 'Todo' },
  { key: 'top', label: '⭐ 5' },
]

function AnimatedNumber({ value, decimals = 0 }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const animation = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v)),
    })
    return animation.stop
  }, [value])
  return <span>{display}</span>
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function HistoryPage() {
  const { history, myExperiences, partnerExperiences } = useExperiences()
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    const now = new Date()
    return history.filter(entry => {
      if (!entry.fecha) return false
      const date = entry.fecha.toDate ? entry.fecha.toDate() : new Date(entry.fecha)
      if (filter === '1m') return isAfter(date, subMonths(now, 1))
      if (filter === '3m') return isAfter(date, subMonths(now, 3))
      if (filter === 'top') return myExperiences[String(entry.positionId)]?.calificacion === 5
      return true
    })
  }, [history, filter, myExperiences])

  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach(entry => {
      if (!entry.fecha) return
      const date = entry.fecha.toDate ? entry.fecha.toDate() : new Date(entry.fecha)
      const key = format(date, 'MMMM yyyy', { locale: es })
      if (!groups[key]) groups[key] = []
      groups[key].push(entry)
    })
    return groups
  }, [filtered])

  const streak = useMemo(
    () => getStreakDays(history.map(e => e.fecha).filter(Boolean)),
    [history]
  )

  const activeDaysCount = useMemo(() => {
    const dates = new Set(
      history.map(entry => {
        if (!entry.fecha) return null
        const d = entry.fecha.toDate ? entry.fecha.toDate() : new Date(entry.fecha)
        return format(d, 'yyyy-MM-dd')
      }).filter(Boolean)
    )
    return dates.size
  }, [history])

  const avgRating = useMemo(() => {
    const ratings = history
      .map(e => myExperiences[String(e.positionId)]?.calificacion)
      .filter(Boolean)
    if (!ratings.length) return 0
    return parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1))
  }, [history, myExperiences])

  const stats = [
    { icon: '🔥', label: 'Racha', value: streak, suffix: 'd', decimals: 0 },
    { icon: '📅', label: 'Días activos', value: activeDaysCount, suffix: '', decimals: 0 },
    { icon: '⭐', label: 'Rating prom.', value: avgRating, suffix: '', decimals: 1 },
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
        <h1 className="text-2xl font-bold gradient-text">Historial</h1>
        <p className="text-white/40 text-sm">
          <AnimatedNumber value={filtered.length} /> registros
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-3 gap-2 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
      >
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-3 text-center">
            <div className="text-lg mb-0.5">{s.icon}</div>
            <div className="text-base font-bold text-white leading-tight">
              <AnimatedNumber value={s.value} decimals={s.decimals} />{s.suffix}
            </div>
            <div className="text-[10px] text-white/40 mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Calendar */}
      <motion.div
        className="glass-card mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        <ActivityCalendar history={history} />
      </motion.div>

      {/* Filter tabs with animated pill */}
      <motion.div
        className="flex gap-0 mb-5 p-1 rounded-2xl relative"
        style={{ background: 'rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
      >
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="flex-1 py-2 rounded-xl text-xs font-medium relative transition-colors duration-200"
            style={{ color: filter === f.key ? 'white' : 'rgba(255,255,255,0.35)' }}
          >
            {filter === f.key && (
              <motion.div
                layoutId="filterPill"
                className="absolute inset-0 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Entries */}
      <AnimatePresence mode="wait">
        {Object.entries(grouped).length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card p-8 text-center"
          >
            <motion.div
              className="text-4xl mb-3"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              📅
            </motion.div>
            <p className="text-white/50 text-sm mb-3">
              {filter === 'top' ? 'Aún no tienes sesiones con 5 estrellas' : 'Sin registros aún'}
            </p>
            <Link
              to="/app/catalog"
              className="text-sm font-semibold px-4 py-2 rounded-xl inline-block"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))', color: '#c084fc' }}
            >
              Explorar catálogo →
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="entries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Object.entries(grouped).map(([month, entries]) => (
              <div key={month} className="mb-6">
                <motion.div
                  className="flex items-center gap-2 mb-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="section-title capitalize mb-0">{month}</p>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(124,58,237,0.2)', color: 'rgba(168,85,247,0.9)' }}
                  >
                    {entries.length}
                  </span>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                >
                  {entries.map((entry, i) => {
                    const pos = positions.find(p => String(p.id) === String(entry.positionId))
                    if (!pos) return null
                    const myExp = myExperiences[String(pos.id)] || {}
                    const partnerExp = partnerExperiences[String(pos.id)] || {}
                    const cat = CATEGORIES[pos.categoria]
                    return (
                      <motion.div key={entry.id || i} variants={itemVariants}>
                        <Link to={`/app/catalog/${pos.id}`}>
                          <motion.div
                            className="glass-card p-4 flex gap-3"
                            whileHover={{ x: 4, scale: 1.01 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <PositionSVG type={pos.svgType} size={48} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-white truncate">{pos.nombre}</p>
                              {cat && (
                                <span
                                  className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full mb-1"
                                  style={{ background: cat.bg, color: cat.color }}
                                >
                                  {cat.icon} {cat.label}
                                </span>
                              )}
                              <p className="text-xs text-white/60 mb-1">{formatDate(entry.fecha)}</p>
                              <div className="flex gap-3 flex-wrap">
                                {myExp.calificacion && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-white/30">Tú</span>
                                    <StarRating value={myExp.calificacion} readOnly size={12} />
                                  </div>
                                )}
                                {partnerExp.calificacion && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-white/30">💕</span>
                                    <StarRating value={partnerExp.calificacion} readOnly size={12} />
                                  </div>
                                )}
                              </div>
                              {myExp.comentario && (
                                <p className="text-xs text-white/40 mt-1 italic truncate">"{myExp.comentario}"</p>
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
