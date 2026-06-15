import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { format, eachDayOfInterval, subDays, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

const DAY_LABELS = ['D', 'L', 'M', 'X', 'J', 'V', 'S']

export default function ActivityCalendar({ history = [] }) {
  const [selectedDay, setSelectedDay] = useState(null)

  const days = useMemo(() => {
    const end = new Date()
    const start = subDays(end, 90)
    return eachDayOfInterval({ start, end })
  }, [])

  const activityMap = useMemo(() => {
    const map = {}
    history.forEach(entry => {
      if (!entry.fecha) return
      const date = entry.fecha.toDate ? entry.fecha.toDate() : new Date(entry.fecha)
      const key = format(startOfDay(date), 'yyyy-MM-dd')
      map[key] = (map[key] || 0) + 1
    })
    return map
  }, [history])

  const weeks = useMemo(() => {
    const ws = []
    let week = []
    const firstDay = days[0].getDay()
    for (let i = 0; i < firstDay; i++) week.push(null)
    days.forEach(d => {
      week.push(d)
      if (week.length === 7) { ws.push(week); week = [] }
    })
    if (week.length) {
      while (week.length < 7) week.push(null)
      ws.push(week)
    }
    return ws
  }, [days])

  const getColor = (day) => {
    if (!day) return 'transparent'
    const key = format(day, 'yyyy-MM-dd')
    const count = activityMap[key] || 0
    if (count === 0) return 'rgba(255,255,255,0.05)'
    if (count === 1) return 'rgba(124,58,237,0.45)'
    if (count === 2) return 'rgba(168,85,247,0.65)'
    return '#ec4899'
  }

  const getMonthLabel = (week) => {
    for (const day of week) {
      if (day && day.getDate() === 1) return format(day, 'MMM', { locale: es })
    }
    return null
  }

  const totalActivity = Object.values(activityMap).reduce((a, b) => a + b, 0)
  const activeDays = Object.keys(activityMap).length

  const favDay = useMemo(() => {
    const counts = {}
    history.forEach(entry => {
      if (!entry.fecha) return
      const d = entry.fecha.toDate ? entry.fecha.toDate() : new Date(entry.fecha)
      const day = format(d, 'EEEE', { locale: es })
      counts[day] = (counts[day] || 0) + 1
    })
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0]
  }, [history])

  const selectedKey = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : null
  const selectedCount = selectedKey ? (activityMap[selectedKey] || 0) : 0

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-white/70 text-sm font-semibold">Últimos 90 días</p>
        <p className="text-white/40 text-xs">{totalActivity} sesiones · {activeDays} días activos</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {/* Day labels column */}
          <div className="flex flex-col gap-1 mr-0.5" style={{ paddingTop: '20px' }}>
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="w-3 h-3 flex items-center justify-center">
                <span className="text-[8px] text-white/25 leading-none">{i % 2 === 1 ? label : ''}</span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex gap-1" style={{ minWidth: 'max-content' }}>
            {weeks.map((week, wi) => {
              const monthLabel = getMonthLabel(week)
              return (
                <div key={wi} className="flex flex-col gap-1">
                  {/* Month label row */}
                  <div className="h-4 flex items-end pb-0.5">
                    {monthLabel && (
                      <span className="text-[9px] text-white/40 capitalize leading-none">{monthLabel}</span>
                    )}
                  </div>
                  {/* Day cells */}
                  {week.map((day, di) => {
                    const key = day ? format(day, 'yyyy-MM-dd') : null
                    const isSelected = key !== null && selectedKey === key
                    return (
                      <motion.div
                        key={di}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          background: getColor(day),
                          cursor: day ? 'pointer' : 'default',
                        }}
                        whileHover={day ? { scale: 1.5 } : {}}
                        whileTap={day ? { scale: 0.85 } : {}}
                        animate={isSelected
                          ? { scale: 1.35, boxShadow: '0 0 8px rgba(236,72,153,0.7)' }
                          : { scale: 1, boxShadow: '0 0 0px rgba(0,0,0,0)' }
                        }
                        onClick={() => day && setSelectedDay(isSelected ? null : day)}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tooltip badge */}
      {selectedDay && (
        <motion.div
          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.3)' }}
        >
          <span className="text-pink-400 text-xs font-semibold capitalize">
            {format(selectedDay, "d 'de' MMMM", { locale: es })}
          </span>
          <span className="text-white/30 text-xs">·</span>
          <span className="text-white/60 text-xs">
            {selectedCount} {selectedCount === 1 ? 'sesión' : 'sesiones'}
          </span>
        </motion.div>
      )}

      {/* Legend + favorite day */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-white/25">Menos</span>
          {['rgba(255,255,255,0.05)', 'rgba(124,58,237,0.45)', 'rgba(168,85,247,0.65)', '#ec4899'].map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
          ))}
          <span className="text-[10px] text-white/25">Más</span>
        </div>
        {favDay && (
          <span className="text-[10px] text-white/35 capitalize">
            Favorito: <span className="text-purple-300">{favDay}</span>
          </span>
        )}
      </div>
    </div>
  )
}
