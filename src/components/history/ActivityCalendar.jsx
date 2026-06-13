import { useMemo } from 'react'
import { format, eachDayOfInterval, subDays, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

export default function ActivityCalendar({ history = [] }) {
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
    if (count === 1) return 'rgba(124,58,237,0.5)'
    if (count === 2) return 'rgba(124,58,237,0.75)'
    return '#a855f7'
  }

  const totalActivity = Object.values(activityMap).reduce((a, b) => a + b, 0)
  const activeDays = Object.keys(activityMap).length

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-white/70 text-sm font-semibold">Últimos 90 días</p>
        <p className="text-white/40 text-xs">{activeDays} días activos</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: 'max-content' }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: getColor(day) }}
                  title={day ? `${format(day, 'd MMM', { locale: es })}: ${activityMap[format(day, 'yyyy-MM-dd')] || 0} registros` : ''}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-white/30">Menos</span>
        {['rgba(255,255,255,0.05)', 'rgba(124,58,237,0.4)', 'rgba(124,58,237,0.65)', '#a855f7'].map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-xs text-white/30">Más</span>
      </div>
    </div>
  )
}
