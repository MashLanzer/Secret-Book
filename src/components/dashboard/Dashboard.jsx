import { useMemo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, animate } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useExperiences } from '../../hooks/useExperiences'
import { getAvatarUrl, formatDate } from '../../utils/helpers'
import { positions, CATEGORIES } from '../../data/positions'
import StarRating from '../ui/StarRating'
import PositionSVG from '../ui/PositionSVG'

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const animation = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.round(v)),
    })
    return animation.stop
  }, [value])
  return <span>{display}</span>
}

const statIcons = {
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
  heart: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  clock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  star: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
}

function StatCard({ label, value, iconKey, color, raw, delay }) {
  return (
    <motion.div
      className="glass-card p-4 flex flex-col gap-2 relative overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Subtle glow in corner */}
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20 blur-xl pointer-events-none" style={{ background: color }} />
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: color + '25', color }}>
        {statIcons[iconKey]}
      </div>
      <span className="text-2xl font-bold text-white tracking-tight">
        {raw ? value : <AnimatedNumber value={value} />}
      </span>
      <span className="text-xs text-white/40 font-medium uppercase tracking-wide">{label}</span>
    </motion.div>
  )
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function Dashboard() {
  const { profile } = useAuth()
  const { myExperiences, history, getStats } = useExperiences()

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
        className="flex items-center justify-between mb-7 pt-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">Bienvenido/a</p>
          <h1 className="text-2xl font-bold gradient-text">{profile?.displayName || 'Amor'} 💕</h1>
        </div>

        <Link to="/app/profile">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative"
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', padding: 2 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative w-12 h-12 rounded-full p-0.5" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
              <img
                src={getAvatarUrl(profile?.avatarSeed || 'default', profile?.avatarStyle)}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
                style={{ background: 'rgba(26,10,46,0.8)' }}
              />
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Pair banner */}
      {!profile?.coupleId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="mb-5"
        >
          <Link to="/app/pair">
            <motion.div
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-2xl flex items-center gap-3 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(236,72,153,0.18))',
                border: '1px solid rgba(168,85,247,0.35)',
              }}
            >
              <span className="text-2xl">💑</span>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Conecta con tu pareja</p>
                <p className="text-white/40 text-xs">Vincula tu cuenta para compartir el libro</p>
              </div>
              <motion.span
                className="text-purple-400 text-lg"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >›</motion.span>
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* Progress banner */}
      <motion.div
        className="glass-card p-5 mb-5 relative overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
      >
        {/* Background glow */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }} />

        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-white/80 font-semibold text-sm">Progreso del libro</p>
            <p className="text-white/30 text-xs mt-0.5">{stats.realizadas} de 100 posiciones</p>
          </div>
          <motion.span
            className="gradient-text font-bold text-3xl tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatedNumber value={progressPct} />%
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', width: '60%' }}
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 1.8, delay: 1.6, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <StatCard label="Exploradas"  value={stats.realizadas}   iconKey="check" color="#7c3aed" delay={0.18} />
        <StatCard label="Favoritas"   value={stats.favoritas}    iconKey="heart" color="#ec4899" delay={0.23} />
        <StatCard label="Pendientes"  value={100 - stats.realizadas} iconKey="clock" color="#a855f7" delay={0.28} />
        <StatCard
          label="Rating prom."
          value={stats.avgRating ? stats.avgRating.toFixed(1) + ' ★' : '—'}
          iconKey="star"
          color="#f59e0b"
          delay={0.33}
          raw
        />
      </div>

      {/* Categories */}
      <div className="mb-5">
        <motion.p
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Por categoría
        </motion.p>
        <motion.div
          className="space-y-2"
          variants={listVariants}
          initial="hidden"
          animate="show"
          style={{ transitionDelay: '0.38s' }}
        >
          {categoryStats.map(({ key, cat, done, total }) => (
            <motion.div key={key} variants={itemVariants}>
              <Link to={`/app/catalog?cat=${key}`}>
                <motion.div
                  className="glass-card p-3 flex items-center gap-3"
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-xl w-8 text-center">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1.5">
                      <p className="text-sm font-medium text-white/80">{cat.label}</p>
                      <span className="text-xs text-white/40 tabular-nums">{done}/{total}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((done / total) * 100)}%` }}
                        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recent activity */}
      {recentHistory.length > 0 && (
        <div className="mb-5">
          <motion.div
            className="flex justify-between items-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42 }}
          >
            <p className="section-title mb-0">Actividad reciente</p>
            <Link to="/app/history">
              <motion.span
                className="text-purple-400 text-sm"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                Ver todo →
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            className="space-y-2"
            variants={listVariants}
            initial="hidden"
            animate="show"
            style={{ transitionDelay: '0.44s' }}
          >
            {recentHistory.map(entry => {
              const pos = positions.find(p => String(p.id) === String(entry.positionId))
              if (!pos) return null
              const myExp = myExperiences[String(pos.id)] || {}
              return (
                <motion.div key={entry.id} variants={itemVariants}>
                  <Link to={`/app/catalog/${pos.id}`}>
                    <motion.div
                      className="glass-card p-3 flex items-center gap-3"
                      whileHover={{ x: 3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PositionSVG type={pos.svgType} size={44} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white/90 truncate">{pos.nombre}</p>
                        <p className="text-xs text-white/40">{formatDate(entry.fecha)}</p>
                      </div>
                      {myExp.calificacion && <StarRating value={myExp.calificacion} readOnly size={14} />}
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      )}

      {/* Quick action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-2 mb-4"
      >
        <Link to="/app/roulette">
          <motion.div
            className="p-4 rounded-2xl text-center font-bold text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.25))',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(168,85,247,0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />
            <span className="relative">🎲 ¿Sin ideas? Gira la ruleta</span>
          </motion.div>
        </Link>
      </motion.div>

    </div>
  )
}
