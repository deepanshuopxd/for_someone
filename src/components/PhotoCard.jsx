import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function PhotoCard({ src, alt, caption, index, style = 'polaroid', className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const delay = (index % 6) * 0.1

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay, ease: [0.175, 0.885, 0.32, 1.275] }
    }
  }

  if (style === 'polaroid') {
    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        className={`polaroid cursor-pointer ${className}`}
        style={{
          transform: `rotate(${(index % 3 - 1) * 3}deg)`,
          transformOrigin: 'center',
        }}
      >
        <div className="relative overflow-hidden bg-gray-100" style={{ paddingBottom: '100%' }}>
          <img
            src={src}
            alt={alt || `Memory ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Placeholder if no image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200 text-rose-300 text-4xl">
            {!src && '📸'}
          </div>
        </div>
        {caption && (
          <p className="font-accent text-rose-500 text-xs text-center mt-2">{caption}</p>
        )}
      </motion.div>
    )
  }

  // Simple card style
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      className={`relative overflow-hidden rounded-2xl shadow-md cursor-pointer photo-card ${className}`}
    >
      <div className="relative" style={{ paddingBottom: '100%' }}>
        <img
          src={src}
          alt={alt || `Photo ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200 text-rose-300 text-4xl">
          {!src && '📸'}
        </div>
      </div>
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <p className="font-accent text-white text-xs">{caption}</p>
        </div>
      )}
    </motion.div>
  )
}