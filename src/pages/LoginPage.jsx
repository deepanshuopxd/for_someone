import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const VALID_NAMES = ['anjali', 'anu']

const HEARTS = ['💕', '💗', '💖', '💓', '💝', '🌸', '✨', '🌹']

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [hearts, setHearts] = useState([])
  const [showWelcome, setShowWelcome] = useState(false)
  const [typedText, setTypedText] = useState('')
  const navigate = useNavigate()

  const fullText = "A little place made just for you..."

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(timer)
    }, 60)
    return () => clearInterval(timer)
  }, [])

  const spawnHearts = (x, y) => {
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 80,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
    }))
    setHearts(h => [...h, ...newHearts])
    setTimeout(() => setHearts(h => h.filter(heart => !newHearts.find(n => n.id === heart.id))), 2000)
  }

  const handleClick = (e) => {
    spawnHearts(e.clientX, e.clientY)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (VALID_NAMES.includes(name.trim().toLowerCase())) {
      setShowWelcome(true)
      sessionStorage.setItem('anjali_user', name.trim())
      onLogin()
      setTimeout(() => navigate('/us'), 2500)
    } else {
      setError("Only my special girl can enter 💕")
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      onClick={handleClick}
      style={{
        background: 'linear-gradient(135deg, #fff0f5 0%, #fce7f3 30%, #fbcfe8 60%, #fda4af 100%)',
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: `radial-gradient(circle, #f43f5e, #fb7185)`,
              left: `${10 + i * 15}%`,
              top: `${5 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Heart particles from click */}
      {hearts.map(h => (
        <motion.span
          key={h.id}
          className="fixed pointer-events-none text-xl z-50"
          style={{ left: h.x, top: h.y }}
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0, y: -80 }}
          transition={{ duration: 2 }}
        >
          {h.emoji}
        </motion.span>
      ))}

      {/* Main card */}
      <AnimatePresence>
        {!showWelcome ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, y: -40 }}
            transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
            className={`relative z-10 glass rounded-3xl p-8 sm:p-12 w-full max-w-md mx-4 shadow-2xl ${shake ? 'animate-bounce' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Top decoration */}
            <div className="text-center mb-2">
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💕
              </motion.div>
            </div>

            <div className="text-center mb-8">
              <h1 className="font-display text-3xl sm:text-4xl text-rose-700 font-bold mb-2">
                Welcome, Love
              </h1>
              <p className="font-body text-rose-500 text-sm min-h-[1.5rem]">
                {typedText}
                <span className="typewriter-cursor opacity-75 animate-pulse">|</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-accent text-rose-600 text-sm block mb-2 text-center">
                  Enter your name to unlock this world...
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError('') }}
                  placeholder="Your name..."
                  className="w-full bg-white/70 border-2 border-rose-200 focus:border-rose-400 rounded-2xl px-5 py-3 font-display text-rose-700 text-center text-lg outline-none transition-all placeholder:text-rose-200 shadow-inner"
                  autoFocus
                  autoComplete="off"
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-rose-500 text-xs text-center mt-2 font-body"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-rose-400 to-rose-600 text-white font-display font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-rose-300 transition-shadow text-lg"
              >
                Enter Our Story 💖
              </motion.button>
            </form>

            {/* Decorative corners */}
            <div className="absolute top-3 left-3 text-rose-200 text-xl">✿</div>
            <div className="absolute top-3 right-3 text-rose-200 text-xl">✿</div>
            <div className="absolute bottom-3 left-3 text-rose-200 text-xl">✿</div>
            <div className="absolute bottom-3 right-3 text-rose-200 text-xl">✿</div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <motion.div
              className="text-8xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              💕
            </motion.div>
            <motion.h1
              className="font-accent text-5xl text-rose-600 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome, Anjali!
            </motion.h1>
            <motion.p
              className="font-body text-rose-400 mt-2 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your story awaits... ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hint */}
      <motion.p
        className="absolute bottom-6 text-rose-300 text-xs font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Click anywhere to spread some love ✨
      </motion.p>
    </div>
  )
}