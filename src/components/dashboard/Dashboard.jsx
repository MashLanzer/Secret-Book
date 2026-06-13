import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useExperiences } from '../../hooks/useExperiences'
import { getAvatarUrl, formatDate } from '../../utils/helpers'
import { positions, CATEGORIES } from '../../data/positions'
import { ACHIEVEMENTS } from '../../data/achievements'
import StarRating from '../ui/StarRating'
import PositionSVG from '../ui/PositionSVG'

function StatCard({ label, value, icon, color }) {
  return (
    <motion.div
      className="glass-card p-4 flex flex-col gap-1"
      whileTap={{ scale: 0.97 }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-white/40 font-medium">{label}</span>
    </motion.div>
  )
}

export default function Dashboard() {
  const { profile, coupleData } = useAuth()
  const { myExperiences, partnerExperiences, history, getStats } = useExperiences()

  const stats = getStats()
  const progressPct = Math.round((stats.realizadas / 100) * 100)

  const recentHistory = history.slice(0, 5)

  const categoryStats = useMemo(() => {
    return Object.entries(CATEGORIES).map(([key, cat]) => {
      const catPositions = positions.filter(p => p.categoria === key)
      const done = catPositions.filter(p => myExperiences[String(p.id)]?.realizada).length
      return { key, cat, done, total: catPositions.length }
    })
  }, [myExperiences])

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6 pt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-white/40 text-sm">Bienvenido/a,</p>
          <h1 className="text-2xl font-bold gradient-text">{profile?.displayName || 'Amor'} 💕</h1>
        </div>
        <Link to="/app/profile">
          <img
            src={getAvatarUrl(profile?.avatarSeed || 'default', profile?.avatarStyle)}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 object-cover"
            style={{ borderColor: 'rgba(168,85,247,0.5)', background: 'rgba(26,10,46,0.8)' }}
          />
        </Link>
      </motion.div>

      {/* Pair banner */}
      {!profile?.coupleId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5"
        >
          <Link to="/app/pair">
            <div
              className="p-4 rounded-2xl flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))',
                border: '1px solid rgba(168,85,247,0.4)',
              }}
            >
              <span className="text-2xl">💑</span>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Conecta con tu pareja</p>
                <p className="text-white/40 text-xs">Vincula tu cuenta para compartir el libro</p>
              </div>
              <span className="text-purple-400">›</span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Progress banner */}
      <motion.div
        className="glass-card p-5 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-white/80 font-semibold">Progreso del libro</p>
          <span className="gradient-text font-bold text-lg">{progressPct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
        </div>
        <p className="text-white/30 text-xs mt-2">
          {stats.realizadas} de 100 posiciones exploradas
        </p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        className="grid grid-cols-2 gap-3 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard label="Exploradas" value={stats.realizadas} icon="✅" />
        <StatCard label="Favoritas" value={stats.favoritas} icon="❤️" />
        <StatCard label="Pendientes" value={100 - stats.realizadas} icon="📋" />
        <StatCard label="Rating prom." value={stats.avgRating ? stats.avgRating.toFixed(1) + '★' : '—'} icon="⭐" />
      </motion.div>

      {/* Categories */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="section-title">Por categoría</p>
        <div className="space-y-2">
          {categoryStats.map(({ key, cat, done, total }) => (
            <Link key={key} to={`/app/catalog?cat=${key}`}>
              <div className="glass-card p-3 flex items-center gap-3">
                <span className="text-xl w-8 text-center">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium text-white/80">{cat.label}</p>
                    <span className="text-xs text-white/40">{done}/{total}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.round((done / total) * 100)}%`,
                        background: cat.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent activity */}
      {recentHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-3">
            <p className="section-title mb-0">Actividad reciente</p>
            <Link to="/app/history" className="text-purple-400 text-sm">Ver todo →</Link>
          </div>
          <div className="space-y-2">
            {recentHistory.map(entry => {
              const pos = positions.find(p => String(p.id) === String(entry.positionId))
              if (!pos) return null
              const myExp = myExperiences[String(pos.id)] || {}
              return (
                <Link key={entry.id} to={`/app/catalog/${pos.id}`}>
                  <div className="glass-card p-3 flex items-center gap-3">
                    <PositionSVG type={pos.svgType} size={44} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white/90 truncate">{pos.nombre}</p>
                      <p className="text-xs text-white/40">{formatDate(entry.fecha)}</p>
                    </div>
                    {myExp.calificacion && (
                      <StarRating value={myExp.calificacion} readOnly size={14} />
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Quick action */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/app/roulette">
          <div
            className="p-4 rounded-2xl text-center font-bold text-white"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.3))', border: '1px solid rgba(168,85,247,0.3)' }}
          >
            🎲 ¿Sin ideas? Gira la ruleta
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
