import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { useExperiences } from '../../hooks/useExperiences'
import { positions, CATEGORIES } from '../../data/positions'

export default function StatsPage() {
  const { myExperiences, partnerExperiences } = useExperiences()

  const categoryData = useMemo(() => {
    return Object.entries(CATEGORIES).map(([key, cat]) => {
      const catPos = positions.filter(p => p.categoria === key)
      const done = catPos.filter(p => myExperiences[String(p.id)]?.realizada).length
      return {
        subject: cat.label,
        yo: done,
        total: catPos.length,
        pct: Math.round((done / catPos.length) * 100),
        color: cat.color,
      }
    })
  }, [myExperiences])

  const topRated = useMemo(() => {
    return positions
      .map(p => ({ ...p, myRating: myExperiences[String(p.id)]?.calificacion || 0, partnerRating: partnerExperiences[String(p.id)]?.calificacion || 0 }))
      .filter(p => p.myRating || p.partnerRating)
      .sort((a, b) => ((b.myRating + b.partnerRating) / 2) - ((a.myRating + a.partnerRating) / 2))
      .slice(0, 5)
  }, [myExperiences, partnerExperiences])

  const difficultyDist = useMemo(() => {
    const done = positions.filter(p => myExperiences[String(p.id)]?.realizada)
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    done.forEach(p => { dist[p.dificultad] = (dist[p.dificultad] || 0) + 1 })
    return Object.entries(dist).map(([d, count]) => ({
      name: ['', 'Muy fácil', 'Fácil', 'Moderada', 'Difícil', 'Experto'][d],
      count,
    }))
  }, [myExperiences])

  const COLORS = ['#7c3aed', '#a855f7', '#d946ef', '#ec4899', '#f472b6']

  const myTotal = Object.values(myExperiences).filter(e => e.realizada).length
  const partnerTotal = Object.values(partnerExperiences).filter(e => e.realizada).length

  return (
    <div className="page-container">
      <motion.div
        className="pt-8 mb-5"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Estadísticas</h1>
        <p className="text-white/40 text-sm">Tu análisis completo</p>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="grid grid-cols-3 gap-3 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Tú', value: myTotal, icon: '👤' },
          { label: 'Pareja', value: partnerTotal, icon: '💕' },
          { label: 'Total', value: 100, icon: '📚' },
        ].map(s => (
          <div key={s.label} className="glass-card p-3 text-center">
            <span className="text-xl">{s.icon}</span>
            <p className="text-xl font-bold text-white mt-1">{s.value}</p>
            <p className="text-xs text-white/40">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Category radar */}
      <motion.div
        className="glass-card p-4 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="section-title">Cobertura por categoría</p>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={categoryData}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
            <Radar dataKey="pct" stroke="#a855f7" fill="#a855f7" fillOpacity={0.25} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top rated */}
      {topRated.length > 0 && (
        <motion.div
          className="glass-card p-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="section-title">Mejor calificadas</p>
          <div className="space-y-2">
            {topRated.map((pos, i) => {
              const avg = ((pos.myRating + pos.partnerRating) / (pos.myRating && pos.partnerRating ? 2 : 1)).toFixed(1)
              return (
                <div key={pos.id} className="flex items-center gap-3">
                  <span className="text-white/30 text-sm w-5 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 truncate">{pos.nombre}</p>
                  </div>
                  <span className="text-amber-400 text-sm font-bold">★ {avg}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Difficulty distribution */}
      <motion.div
        className="glass-card p-4 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="section-title">Por dificultad</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={difficultyDist} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'rgba(26,10,46,0.95)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 12, color: 'white' }}
              cursor={{ fill: 'rgba(168,85,247,0.1)' }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {difficultyDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie: category breakdown */}
      <motion.div
        className="glass-card p-4 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="section-title">Distribución de categorías</p>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie data={categoryData.filter(c => c.done > 0)} dataKey="done" cx="50%" cy="50%" innerRadius={35} outerRadius={60}>
                {categoryData.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {categoryData.filter(c => c.done > 0).map(c => (
              <div key={c.subject} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <span className="text-xs text-white/60 flex-1 truncate">{c.subject}</span>
                <span className="text-xs font-bold" style={{ color: c.color }}>{c.done}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
