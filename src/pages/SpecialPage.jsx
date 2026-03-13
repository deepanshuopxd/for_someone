import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageWrapper from '../components/PageWrapper'
import Confetti from 'react-confetti'
import { useWindowSize } from '../hooks/useWindowSize'

const reasons = [
  { emoji: '🌟', title: "You light up every room", text: "The moment you walk in, the whole atmosphere shifts. You don't even notice it, but everyone else does." },
  { emoji: '🧠', title: "Your mind is extraordinary", text: "The way you think, the things you notice, the connections you make — your intelligence is one of your most beautiful qualities." },
  { emoji: '💪', title: "Your strength amazes me", text: "You carry so much with so much grace. You face hard things and you come out brighter on the other side. That takes real courage." },
  { emoji: '😂', title: "Your laugh is everything", text: "I would do anything to hear your laugh. It is the most infectious, genuine, beautiful sound in my entire world." },
  { emoji: '💛', title: "Your kindness is rare", text: "The way you treat people — every person, always — tells me everything about who you are. You have one of the most generous hearts I've ever encountered." },
  { emoji: '🎨', title: "You make life more beautiful", text: "You bring color to ordinary days. You notice small beautiful things. You make even the mundane feel like something worth savoring." },
  { emoji: '🔥', title: "Your passion inspires me", text: "When you care about something, you pour your whole soul into it. Watching you be passionate about anything is one of my favorite things." },
  { emoji: '🌙', title: "You understand me like nobody else", text: "You see me. The real me. And somehow, you choose me anyway. That means more than I can ever say." },
  { emoji: '🦋', title: "You've changed me for the better", text: "I am a better person because of you. You've made me gentler, kinder, more patient. You've shown me what love actually looks like." },
  { emoji: '♾️', title: "You are irreplaceable", text: "There is nobody else like you. There never could be. You are one of a kind — and I got to be the lucky one who gets to love you." },
]

const finalLines = [
  "You are my first thought in the morning.",
  "You are the thing I am most grateful for.",
  "You are my safe place, my happy place, my favorite place.",
  "You are the reason I believe in beautiful things.",
  "You are everything, Anjali.",
  "You are everything. 💕",
]

function ReasonCard({ reason, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.7, delay: (index % 5) * 0.1 }} whileHover={{ scale: 1.02, y: -4 }} className="relative rounded-3xl p-5 sm:p-6 overflow-hidden shadow-lg" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-400 to-rose-600 rounded-l-3xl" />
      <div className="pl-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{reason.emoji}</span>
          <h3 className="font-display text-rose-200 font-semibold text-base sm:text-lg">{reason.title}</h3>
        </div>
        <p className="font-body text-rose-300 text-sm sm:text-base leading-relaxed italic">{reason.text}</p>
      </div>
    </motion.div>
  )
}

function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1, delay: Math.random() * 5, duration: 2 + Math.random() * 4,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map(s => (
        <motion.div key={s.id} className="absolute rounded-full bg-white" style={{ left: s.left, top: s.top, width: s.size, height: s.size }} animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }} />
      ))}
    </div>
  )
}

function FinalMessage() {
  const [visible, setVisible] = useState(0)
  const [showHeart, setShowHeart] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisible(i)
      if (i >= finalLines.length) {
        clearInterval(interval)
        setTimeout(() => { setShowHeart(true); setShowConfetti(true); setTimeout(() => setShowConfetti(false), 8000) }, 800)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} className="text-center py-12 px-4">
      {showConfetti && <Confetti width={width} height={height} colors={['#f43f5e','#fb7185','#fda4af','#fce7f3','#fbbf24','#a78bfa','#34d399']} numberOfPieces={400} recycle={false} />}
      <div className="space-y-4 mb-10 max-w-xl mx-auto">
        {finalLines.map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 20 }} animate={visible > i ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={`font-display leading-relaxed ${i === finalLines.length - 1 ? 'text-2xl sm:text-4xl text-rose-300 font-bold glow-text' : 'text-lg sm:text-xl text-rose-200'}`}>
            {line}
          </motion.p>
        ))}
      </div>
      {showHeart && (
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="flex justify-center gap-4 text-5xl">
          {['💕','💖','💗','💓','💝'].map((e, i) => (
            <motion.span key={i} animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}>{e}</motion.span>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default function SpecialPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen pb-28 relative" style={{ background: 'linear-gradient(160deg, #0d0010 0%, #1a0020 30%, #2d0040 60%, #1a0030 100%)' }}>
        <StarField />
        <div className="relative z-10">
          {/* Hero */}
          <div className="text-center py-16 px-4">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.175, 0.885, 0.32, 1.275] }} className="text-7xl mb-4">✨</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-4xl sm:text-6xl text-rose-200 font-bold mb-3 glow-text">How Special You Are</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="font-accent text-rose-400 text-xl">Let me count the ways...</motion.p>
          </div>

          <div className="container-responsive max-w-3xl">
            {/* Opening quote */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-2 mb-12 text-center rounded-3xl p-8 shadow-2xl" style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}>
              <p className="font-display text-rose-200 text-lg sm:text-2xl italic leading-relaxed">"I don't know what I did to deserve someone like you. But whatever it was, I would do it a thousand times more — because you are the greatest thing that has ever happened to me."</p>
              <div className="mt-4 text-3xl">💕</div>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-6 px-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-700" />
              <span className="font-display text-rose-300 text-sm">10 reasons you are extraordinary</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-700" />
            </div>

            {/* Reason cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 mb-12">
              {reasons.map((r, i) => <ReasonCard key={i} reason={r} index={i} />)}
            </div>

            {/* Special card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-2 mb-12 rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(159,18,57,0.3) 100%)', border: '1px solid rgba(244,63,94,0.4)' }}>
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f43f5e 0, #f43f5e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🌹</div>
                <h3 className="font-display text-rose-200 text-2xl sm:text-3xl font-bold mb-4">There is nobody like you</h3>
                <p className="font-body text-rose-200 leading-relaxed text-sm sm:text-base italic mb-4">In a world full of billions of people, you are the one I would find. Again and again and again. Through every life, every version of this world, every timeline — I would always find my way to you.</p>
                <p className="font-body text-rose-200 leading-relaxed text-sm sm:text-base italic mb-4">You are not just special to me. You are rare. You are the kind of person songs are written about, the kind of love that people spend their whole lives searching for. And I have you. I have you.</p>
                <p className="font-body text-rose-200 leading-relaxed text-sm sm:text-base italic">I hope you feel it — every single day — how deeply, wildly, endlessly loved you are. Not just by me, but by this universe that put us in the same place at the same time.</p>
              </div>
            </motion.div>

            <FinalMessage />

            {/* End */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center pb-16 px-4">
              <div className="h-px bg-gradient-to-r from-transparent via-rose-600 to-transparent mb-8" />
              <p className="font-accent text-rose-500 text-lg mb-2">Made with every piece of my heart</p>
              <p className="font-accent text-rose-400 text-base mb-6">for my Anjali 💕</p>
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="text-6xl">💖</motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}