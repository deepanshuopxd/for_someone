import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageWrapper from '../components/PageWrapper'
import Confetti from 'react-confetti'
import { useWindowSize } from '../hooks/useWindowSize'

const reasons = [
  { emoji: '😔', text: "For every time I said something without thinking and it hurt you." },
  { emoji: '⏰', text: "For the moments I wasn't there when you needed me the most." },
  { emoji: '🗣️', text: "For every time I raised my voice when I should have listened instead." },
  { emoji: '😶', text: "For the times I went quiet when you deserved my words." },
  { emoji: '💔', text: "For any tear I ever caused to fall from those beautiful eyes." },
  { emoji: '🤐', text: "For the times I kept things to myself instead of being open with you." },
  { emoji: '😤', text: "For every argument that didn't need to happen." },
  { emoji: '🧍', text: "For the times I made you feel alone even when I was right there." },
]

const promises = [
  { emoji: '🤝', text: "I promise to always be there, even when it's hard." },
  { emoji: '👂', text: "I promise to listen first and speak second." },
  { emoji: '💬', text: "I promise to always tell you how I feel, openly and honestly." },
  { emoji: '🛡️', text: "I promise to protect your heart like it is the most precious thing in the world — because it is." },
  { emoji: '🌱', text: "I promise to grow with you, to be better for you, every single day." },
  { emoji: '❤️', text: "I promise that no matter what, you will never have to question my love for you." },
]

function AnimatedItem({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  )
}

export default function SorryPage() {
  const [confetti, setConfetti] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const { width, height } = useWindowSize()

  const handleAccept = () => {
    setConfetti(true)
    setAccepted(true)
    setTimeout(() => setConfetti(false), 7000)
  }

  return (
    <PageWrapper>
      {confetti && (
        <Confetti width={width} height={height} colors={['#f43f5e','#fb7185','#fda4af','#fce7f3','#fbbf24','#a78bfa']} numberOfPieces={300} recycle={false} />
      )}
      <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(160deg, #1a0a10 0%, #3b0f22 40%, #6b1a3a 70%, #9f2855 100%)' }}>
        {/* Hero */}
        <div className="relative overflow-hidden py-16 px-4 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, ease: [0.175, 0.885, 0.32, 1.275] }} className="text-7xl mb-4">💔</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-4xl sm:text-6xl text-rose-200 font-bold mb-3">I'm Sorry</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="font-accent text-rose-300 text-xl">From the deepest part of my heart</motion.p>
        </div>

        <div className="container-responsive max-w-2xl">
          {/* Letter */}
          <AnimatedItem>
            <div className="mx-2 mb-10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300" />
              <div className="text-3xl mb-4 text-center">📜</div>
              <p className="font-body text-rose-100 leading-relaxed text-sm sm:text-base mb-4">Anjali,</p>
              <p className="font-body text-rose-100 leading-relaxed text-sm sm:text-base mb-4 italic">I've been sitting here, trying to find the right words, and honestly — I don't think there are any words big enough to hold how sorry I truly am. But I'm going to try, because you deserve every effort I have.</p>
              <p className="font-body text-rose-100 leading-relaxed text-sm sm:text-base mb-4 italic">I'm sorry for the times I wasn't the person you needed me to be. I'm sorry for the moments I let my ego win over our love. I'm sorry for every single time you felt unseen, unheard, or unloved — because you are the most seen, the most heard, the most loved person in my world.</p>
              <p className="font-body text-rose-100 leading-relaxed text-sm sm:text-base mb-4 italic">You never deserved any pain from me. You deserve oceans of love, every single day. And I intend to spend my days making sure you feel exactly that.</p>
              <p className="font-body text-rose-100 leading-relaxed text-sm sm:text-base mb-4 italic">I am not perfect. But I promise you — loving you perfectly is the one thing I will never stop trying to do.</p>
              <p className="font-body text-rose-200 mt-6">Yours, completely,<br /><span className="font-accent text-rose-300 text-xl">Always 💕</span></p>
            </div>
          </AnimatedItem>

          {/* Sorry for */}
          <div className="mb-10 px-2">
            <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-display text-2xl text-rose-200 text-center mb-6">I'm sorry for...</motion.h3>
            <div className="space-y-3">
              {reasons.map((r, i) => (
                <AnimatedItem key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="text-2xl flex-shrink-0">{r.emoji}</span>
                    <p className="font-body text-rose-200 text-sm sm:text-base leading-relaxed">{r.text}</p>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          </div>

          {/* Promises */}
          <div className="mb-10 px-2">
            <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-display text-2xl text-rose-200 text-center mb-6">And I promise...</motion.h3>
            <div className="space-y-3">
              {promises.map((p, i) => (
                <AnimatedItem key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-3 p-4 rounded-2xl border border-rose-400/30" style={{ background: 'rgba(244,63,94,0.1)' }}>
                    <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                    <p className="font-body text-rose-100 text-sm sm:text-base leading-relaxed">{p.text}</p>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          </div>

          {/* Forgive button */}
          <div className="text-center px-2 mb-8">
            <AnimatePresence mode="wait">
              {!accepted ? (
                <motion.button key="btn" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAccept} className="px-10 py-4 rounded-full font-display text-lg font-semibold text-white shadow-2xl" style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)' }}>
                  I forgive you 💕
                </motion.button>
              ) : (
                <motion.div key="accepted" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} className="text-center">
                  <div className="text-6xl mb-3">🥰</div>
                  <p className="font-display text-rose-200 text-2xl">Thank you, my love</p>
                  <p className="font-accent text-rose-300 text-lg mt-1">I'll never stop making it up to you 💕</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}