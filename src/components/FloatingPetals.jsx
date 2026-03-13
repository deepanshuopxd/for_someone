import { useEffect, useState } from 'react'

const EMOJIS = ['🌸', '🌹', '💕', '🌺', '✨', '💗', '🌷', '💖']

export default function FloatingPetals() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${0.8 + Math.random() * 1}rem`,
      opacity: 0.4 + Math.random() * 0.4,
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute"
          style={{
            left: p.left,
            top: '-5%',
            fontSize: p.fontSize,
            opacity: p.opacity,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}