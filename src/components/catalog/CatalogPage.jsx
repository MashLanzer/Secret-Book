import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { positions, CATEGORIES } from '../../data/positions'
import { useExperiences } from '../../hooks/useExperiences'
import PositionCard from './PositionCard'

const FILTER_STATUS = [
  { key: 'all', label: 'Todas' },
  { key: 'done', label: '✅ Realizadas' },
  { key: 'pending', label: '📋 Pendientes' },
  { key: 'favorites', label: '❤️ Favoritas' },
  { key: 'wishlist', label: '💕 Deseos' },
]

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { myExperiences, partnerExperiences } = useExperiences()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [difficulty, setDifficulty] = useState(0)
  const catFilter = searchParams.get('cat') || 'all'

  const setCat = (cat) => {
    if (cat === 'all') searchParams.delete('cat')
    else searchParams.set('cat', cat)
    setSearchParams(searchParams)
  }

  const filtered = useMemo(() => {
    return positions.filter(pos => {
      const myExp = myExperiences[String(pos.id)] || {}
      if (catFilter !== 'all' && pos.categoria !== catFilter) return false
      if (difficulty && pos.dificultad !== difficulty) return false
      if (search && !pos.nombre.toLowerCase().includes(search.toLowerCase())) return false
      if (status === 'done' && !myExp.realizada) return false
      if (status === 'pending' && myExp.realizada) return false
      if (status === 'favorites' && !myExp.favorita) return false
      if (status === 'wishlist' && !myExp.wishlist) return false
      return true
    })
  }, [catFilter, status, difficulty, search, myExperiences])

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        className="pt-8 mb-5"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Catálogo</h1>
        <p className="text-white/40 text-sm mt-1">{filtered.length} posiciones</p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar posición..."
          className="input-field pl-10"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
        {[{ key: 'all', label: '✨ Todas' }, ...Object.entries(CATEGORIES).map(([k, v]) => ({ key: k, label: `${v.icon} ${v.label}` }))].map(cat => (
          <button
            key={cat.key}
            onClick={() => setCat(cat.key)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: catFilter === cat.key ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.06)',
              color: catFilter === cat.key ? 'white' : 'rgba(255,255,255,0.5)',
              border: catFilter === cat.key ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
        {FILTER_STATUS.map(f => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs transition-all"
            style={{
              background: status === f.key ? 'rgba(168,85,247,0.25)' : 'transparent',
              color: status === f.key ? '#a855f7' : 'rgba(255,255,255,0.4)',
              border: status === f.key ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-2 mb-4 items-center">
        <span className="text-xs text-white/40">Dificultad:</span>
        {[0, 1, 2, 3, 4, 5].map(d => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className="w-7 h-7 rounded-full text-xs font-bold transition-all"
            style={{
              background: difficulty === d ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.06)',
              color: 'white',
            }}
          >
            {d === 0 ? 'All' : d}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-4xl mb-3">🔍</p>
          <p>Sin resultados</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((pos, i) => (
            <motion.div
              key={pos.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <PositionCard
                position={pos}
                myExp={myExperiences[String(pos.id)] || {}}
                partnerExp={partnerExperiences[String(pos.id)] || {}}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
