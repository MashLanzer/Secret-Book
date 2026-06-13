import { format, isToday, isYesterday, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  if (isToday(date)) return 'Hoy'
  if (isYesterday(date)) return 'Ayer'
  return format(date, "d 'de' MMMM, yyyy", { locale: es })
}

export const formatDateShort = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return format(date, 'd MMM', { locale: es })
}

export const getDifficultyLabel = (level) => {
  const labels = { 1: 'Muy fácil', 2: 'Fácil', 3: 'Moderada', 4: 'Difícil', 5: 'Experto' }
  return labels[level] || '—'
}

export const getDifficultyColor = (level) => {
  const colors = {
    1: '#22c55e',
    2: '#86efac',
    3: '#f59e0b',
    4: '#f97316',
    5: '#ef4444',
  }
  return colors[level] || '#888'
}

export const getAvatarUrl = (seed, style = 'fun-emoji') =>
  `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1a0a2e`

export const buildCoupleId = (uid1, uid2) =>
  [uid1, uid2].sort().join('_')

export const generateInviteCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase()

export const calcAverageRating = (ratingA, ratingB) => {
  const vals = [ratingA, ratingB].filter(Boolean)
  if (!vals.length) return 0
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

export const getStreakDays = (historyDates) => {
  if (!historyDates.length) return 0
  const sorted = [...historyDates].sort((a, b) => b - a)
  let streak = 0
  let current = new Date()
  current.setHours(0, 0, 0, 0)
  for (const date of sorted) {
    const d = date.toDate ? date.toDate() : new Date(date)
    d.setHours(0, 0, 0, 0)
    const diff = differenceInDays(current, d)
    if (diff <= 1) {
      streak++
      current = d
    } else {
      break
    }
  }
  return streak
}
