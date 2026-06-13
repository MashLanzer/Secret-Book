import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const NOTES = [
  { id: 1, title: 'Lista del super', preview: 'Leche, pan, huevos, aceite...', date: 'Hoy', color: '#fef3c7' },
  { id: 2, title: 'Ideas para el fin de semana', preview: 'Ir al cine, cocinar algo nuevo...', date: 'Ayer', color: '#ddd6fe' },
  { id: 3, title: 'Pendientes trabajo', preview: 'Enviar informe, reunión a las 3pm...', date: 'Lun', color: '#d1fae5' },
  { id: 4, title: 'Películas para ver', preview: 'Dune 2, Poor Things, Past Lives...', date: 'Dom', color: '#fce7f3' },
]

export default function CamouflagePage() {
  const navigate = useNavigate()
  const [tapCount, setTapCount] = useState(0)
  const tapTimer = useRef(null)
  const [shake, setShake] = useState(false)

  const handleTitleTap = () => {
    setTapCount(prev => {
      const next = prev + 1
      if (tapTimer.current) clearTimeout(tapTimer.current)
      if (next >= 5) {
        sessionStorage.setItem('sb_unlocked', '1')
        navigate('/login')
        return 0
      }
      tapTimer.current = setTimeout(() => setTapCount(0), 2500)
      if (next === 3) setShake(true), setTimeout(() => setShake(false), 600)
      return next
    })
  }

  return (
    <div className="min-h-screen" style={{ background: '#f9f7f4', color: '#1a1a1a' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          <motion.h1
            className="text-3xl font-bold select-none cursor-default"
            style={{ color: '#1a1a1a' }}
            animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            onPointerDown={handleTitleTap}
          >
            Notas
          </motion.h1>
          <div className="flex gap-3">
            <button className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: '#e8e6e3' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: '#e8e6e3' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Notes grid */}
        <div className="px-4 grid grid-cols-2 gap-3">
          {NOTES.map(note => (
            <div
              key={note.id}
              className="rounded-2xl p-4 cursor-pointer active:scale-95 transition-transform"
              style={{ background: note.color, minHeight: 120 }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: '#374151' }}>{note.title}</p>
              <p className="text-xs text-gray-500 line-clamp-3">{note.preview}</p>
              <p className="text-xs text-gray-400 mt-3">{note.date}</p>
            </div>
          ))}
          <div
            className="rounded-2xl p-4 flex items-center justify-center cursor-pointer"
            style={{ background: '#e8e6e3', minHeight: 60, gridColumn: '1 / -1' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </div>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: '#9ca3af' }}>
          {tapCount > 0 ? `${tapCount}/5` : 'Escribe lo que sea...'}
        </p>
      </div>
    </div>
  )
}
