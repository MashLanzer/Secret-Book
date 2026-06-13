import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function triggerConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#a855f7', '#ec4899', '#f472b6', '#c084fc', '#ffffff'],
  })
}

export default function ConfettiOnMount() {
  useEffect(() => { triggerConfetti() }, [])
  return null
}
