import { motion } from 'framer-motion'

export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`min-h-screen relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  )
}