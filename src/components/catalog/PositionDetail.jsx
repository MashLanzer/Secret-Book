import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPositionById, CATEGORIES } from '../../data/positions'
import { useAuth } from '../../contexts/AuthContext'
import { useExperiences } from '../../hooks/useExperiences'
import { getDifficultyLabel, getDifficultyColor, getAvatarUrl, formatDate } from '../../utils/helpers'
import PositionSVG from '../ui/PositionSVG'
import StarRating from '../ui/StarRating'
import { triggerConfetti } from '../ui/Confetti'

function DotMeter({ value, max = 5, color }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full transition-all"
          style={{ background: i < value ? color : 'rgba(255,255,255,0.12)' }}
        />
      ))}
    </div>
  )
}

export default function PositionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const position = getPositionById(id)
  const { user, profile } = useAuth()
  const { getMyExp, getPartnerExp, saveExperience } = useExperiences()

  const myExp = getMyExp(id)
  const partnerExp = getPartnerExp(id)
  const cat = position ? CATEGORIES[position.categoria] : null

  const [realizada, setRealizada] = useState(myExp.realizada || false)
  const [favorita, setFavorita] = useState(myExp.favorita || false)
  const [calificacion, setCalificacion] = useState(myExp.calificacion || 0)
  const [comentario, setComentario] = useState(myExp.comentario || '')
  const [wishlist, setWishlist] = useState(myExp.wishlist || null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setRealizada(myExp.realizada || false)
    setFavorita(myExp.favorita || false)
    setCalificacion(myExp.calificacion || 0)
    setComentario(myExp.comentario || '')
    setWishlist(myExp.wishlist || null)
  }, [id, myExp.realizada])

  if (!position) {
    return (
      <div className="page-container pt-16 text-center text-white/40">
        <p className="text-4xl mb-4">😕</p>
        <p>Posición no encontrada</p>
      </div>
    )
  }

  const handleSave = async () => {
    setSaving(true)
    const wasNotDone = !myExp.realizada
    await saveExperience(id, { realizada, favorita, calificacion, comentario, wishlist })
    if (realizada && wasNotDone) triggerConfetti()
    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>
      {/* Back */}
      <div className="flex items-center gap-3 p-5 pt-12">
        <button onClick={() => navigate(-1)} className="text-white/50 hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <span
          className="badge text-xs"
          style={{ background: cat?.bg, color: cat?.color }}
        >
          {cat?.icon} {cat?.label}
        </span>
      </div>

      <div className="px-5 pb-32 max-w-md mx-auto">
        {/* Hero */}
        <motion.div
          className="glass-card p-8 mb-5 flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <PositionSVG type={position.svgType} size={100} className="mb-4" />
          <h1 className="text-2xl font-bold gradient-text mb-2">{position.nombre}</h1>
          <p className="text-white/50 text-sm leading-relaxed">{position.descripcion}</p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          className="glass-card p-5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Métricas</p>
          <div className="space-y-3">
            {[
              { label: 'Dificultad', value: position.dificultad, color: getDifficultyColor(position.dificultad), extra: getDifficultyLabel(position.dificultad) },
              { label: 'Flexibilidad', value: position.flexibilidad, color: '#a855f7' },
              { label: 'Intensidad', value: position.intensidad, color: '#ec4899' },
            ].map(m => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-white/60 text-sm">{m.label}</span>
                <div className="flex items-center gap-3">
                  {m.extra && <span className="text-xs" style={{ color: m.color }}>{m.extra}</span>}
                  <DotMeter value={m.value} color={m.color} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* My experience */}
        <motion.div
          className="glass-card p-5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
            Tu experiencia
          </p>

          {/* Wishlist (if not done) */}
          {!realizada && (
            <div className="mb-4">
              <p className="text-white/50 text-xs mb-2">Lista de deseos</p>
              <div className="flex gap-2">
                {[
                  { key: 'quiero', label: '❤️ Quiero probarla' },
                  { key: 'interesa', label: '🔥 Me llama' },
                  { key: 'no', label: '❌ No interesa' },
                ].map(w => (
                  <button
                    key={w.key}
                    onClick={() => setWishlist(wishlist === w.key ? null : w.key)}
                    className="flex-1 py-2 rounded-xl text-xs font-medium transition-all"
                    style={{
                      background: wishlist === w.key ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.05)',
                      border: wishlist === w.key ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      color: wishlist === w.key ? 'white' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Done toggle */}
          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="text-white/80 text-sm font-medium">✅ La hemos realizado</span>
            <button
              onClick={() => setRealizada(!realizada)}
              className="relative w-12 h-6 rounded-full transition-all"
              style={{ background: realizada ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.12)' }}
            >
              <div
                className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm"
                style={{ left: realizada ? '26px' : '4px' }}
              />
            </button>
          </div>

          {/* Favorite */}
          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="text-white/80 text-sm font-medium">❤️ Es favorita</span>
            <button
              onClick={() => setFavorita(!favorita)}
              className="text-2xl transition-transform active:scale-75"
            >
              {favorita ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Rating */}
          <div className="py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="text-white/80 text-sm font-medium block mb-2">⭐ Tu calificación</span>
            <StarRating value={calificacion} onChange={setCalificacion} size={28} />
          </div>

          {/* Comment */}
          <div className="pt-3">
            <span className="text-white/80 text-sm font-medium block mb-2">📝 Comentario personal</span>
            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="¿Cómo fue la experiencia?"
              rows={3}
              className="input-field resize-none text-sm"
            />
          </div>
        </motion.div>

        {/* Partner's view */}
        {(partnerExp.realizada || partnerExp.calificacion) && (
          <motion.div
            className="glass-card p-5 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
              Su experiencia 💕
            </p>
            {partnerExp.realizada && <p className="text-green-400 text-sm mb-2">✅ También la realizó</p>}
            {partnerExp.calificacion && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/50 text-sm">Calificación:</span>
                <StarRating value={partnerExp.calificacion} readOnly size={18} />
              </div>
            )}
            {partnerExp.comentario && (
              <div className="p-3 rounded-xl mt-2" style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)' }}>
                <p className="text-white/70 text-sm italic">"{partnerExp.comentario}"</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full text-base py-4"
        >
          {saving ? 'Guardando...' : saved ? '✅ Guardado' : '💾 Guardar experiencia'}
        </button>
      </div>
    </div>
  )
}
