import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PositionSVG from '../ui/PositionSVG'
import StarRating from '../ui/StarRating'
import { CATEGORIES } from '../../data/positions'
import { getDifficultyLabel, getDifficultyColor } from '../../utils/helpers'

export default function PositionCard({ position, myExp = {}, partnerExp = {} }) {
  const cat = CATEGORIES[position.categoria]

  return (
    <motion.div whileTap={{ scale: 0.97 }} className="glass-card overflow-hidden">
      <Link to={`/app/catalog/${position.id}`}>
        {/* Header */}
        <div className="p-4 flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: cat?.bg || 'rgba(168,85,247,0.15)' }}
          >
            <PositionSVG type={position.svgType} size={44} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm leading-tight truncate">{position.nombre}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="badge text-xs"
                style={{ background: cat?.bg, color: cat?.color }}
              >
                {cat?.icon} {cat?.label}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: getDifficultyColor(position.dificultad) }}
              >
                {getDifficultyLabel(position.dificultad)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {myExp.realizada && <span className="text-green-400 text-lg">✅</span>}
            {myExp.favorita && <span className="text-pink-400 text-base">❤️</span>}
          </div>
        </div>

        {/* Description */}
        <div className="px-4 pb-3">
          <p className="text-white/40 text-xs line-clamp-2">{position.descripcion}</p>
        </div>

        {/* Ratings */}
        {(myExp.calificacion || partnerExp.calificacion) && (
          <div className="px-4 pb-3 flex gap-4">
            {myExp.calificacion && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-white/30">Tú:</span>
                <StarRating value={myExp.calificacion} readOnly size={12} />
              </div>
            )}
            {partnerExp.calificacion && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-white/30">Pareja:</span>
                <StarRating value={partnerExp.calificacion} readOnly size={12} />
              </div>
            )}
          </div>
        )}

        {/* Wishlist */}
        {myExp.wishlist && !myExp.realizada && (
          <div className="px-4 pb-3">
            <span className="text-xs" style={{ color: myExp.wishlist === 'quiero' ? '#ec4899' : myExp.wishlist === 'interesa' ? '#f59e0b' : 'rgba(255,255,255,0.3)' }}>
              {myExp.wishlist === 'quiero' ? '❤️ Quieres probarla' : myExp.wishlist === 'interesa' ? '🔥 Te llama la atención' : '❌ No te interesa'}
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  )
}
