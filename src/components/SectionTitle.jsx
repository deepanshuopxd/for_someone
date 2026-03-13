import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionTitle({ title, subtitle, emoji = '💕' }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center py-8 px-4"
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <h2 className="font-display text-3xl sm:text-4xl text-rose-700 font-bold mb-2">{title}</h2>
      {subtitle && (
        <p className="font-accent text-rose-400 text-lg sm:text-xl">{subtitle}</p>
      )}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
        <span className="text-rose-300 text-sm">✦</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
      </div>
    </motion.div>
  )
}