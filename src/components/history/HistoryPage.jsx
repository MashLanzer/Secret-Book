import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format, subMonths, isAfter } from 'date-fns'
import { es } from 'date-fns/locale'
import { useExperiences } from '../../hooks/useExperiences'
import { positions } from '../../data/positions'
import { formatDate } from '../../utils/helpers'
import StarRating from '../ui/StarRating'
import PositionSVG from '../ui/PositionSVG'
import ActivityCalendar from './ActivityCalendar'

const FILTERS = [
  { key: '1m', label: 'Último mes' },
  { key: '3m', label: '3 meses' },
  { key: 'all', label: 'Todo' },
]

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
      return true
    })
  }, [history, filter])

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

  return (
    <div className="page-container">
      <motion.div
        className="pt-8 mb-5"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Historial</h1>
        <p className="text-white/40 text-sm">{filtered.length} registros</p>
      </motion.div>

      {/* Calendar */}
      <motion.div
        className="glass-card mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <ActivityCalendar history={history} />
      </motion.div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: filter === f.key ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.06)',
              color: filter === f.key ? 'white' : 'rgba(255,255,255,0.4)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      {Object.entries(grouped).length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-4xl mb-3">📅</p>
          <p>Sin registros aún</p>
          <Link to="/app/catalog" className="text-purple-400 text-sm mt-2 block">
            Explorar catálogo →
          </Link>
        </div>
      ) : (
        Object.entries(grouped).map(([month, entries]) => (
          <div key={month} className="mb-5">
            <p className="section-title capitalize">{month}</p>
            <div className="space-y-2">
              {entries.map((entry, i) => {
                const pos = positions.find(p => String(p.id) === String(entry.positionId))
                if (!pos) return null
                const myExp = myExperiences[String(pos.id)] || {}
                const partnerExp = partnerExperiences[String(pos.id)] || {}
                return (
                  <motion.div
                    key={entry.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link to={`/app/catalog/${pos.id}`}>
                      <div className="glass-card p-4 flex gap-3">
                        <PositionSVG type={pos.svgType} size={48} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{pos.nombre}</p>
                          <p className="text-xs text-white/40 mb-1">{formatDate(entry.fecha)}</p>
                          <div className="flex gap-3">
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
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
