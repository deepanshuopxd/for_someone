import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageWrapper from '../components/PageWrapper'
import SectionTitle from '../components/SectionTitle'
import { US_PHOTOS, US_CAPTIONS } from '../config/imageConfig'

const paragraphs = [
  {
    emoji: '🌸',
    text: "Every great story has a beginning — ours started with a moment that changed everything. The day I first saw you, I didn't know the universe was quietly arranging itself into something beautiful. Something that would become us.",
  },
  {
    emoji: '💫',
    text: "You walked into my life like the first warm day after a long winter — unexpected, gentle, and completely transforming. Every small memory we've made together has become a treasure I carry with me.",
  },
  {
    emoji: '💕',
    text: "Through every laugh, every long conversation that turned the night into morning, every moment we shared — I realized that this is what life is supposed to feel like. Like home. Like you.",
  },
  {
    emoji: '🌹',
    text: "These photos are more than just pictures. They are the chapters of our story — moments frozen in time that remind me how lucky I am to have someone like you beside me. Someone who makes every ordinary day extraordinary.",
  },
]

function StoryParagraph({ emoji, text, index }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex items-start gap-4 glass rounded-2xl p-5 sm:p-6 shadow-md"
    >
      <span className="text-3xl flex-shrink-0 mt-1">{emoji}</span>
      <p className="font-body text-rose-800 leading-relaxed text-sm sm:text-base italic">{text}</p>
    </motion.div>
  )
}

function PhotoGrid({ photos, captions }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {photos.map((photo, i) => {
        const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
        return (
          <motion.div
            key={i}
            ref={ref}
            initial={{ opacity: 0, scale: 0.85, rotate: (i % 3 - 1) * 4 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: (i % 3 - 1) * 2 } : {}}
            transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="polaroid cursor-pointer"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200" style={{ paddingBottom: '100%' }}>
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.classList.add('flex', 'items-center', 'justify-center')
                }}
              />
              {/* Fallback placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-rose-300 text-3xl opacity-50">
                📸
              </div>
            </div>
            <p className="font-accent text-rose-500 text-xs text-center mt-1 truncate px-1">
              {captions[i] || `Memory ${i + 1} 💕`}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function UsPage() {
  return (
    <PageWrapper>
      <div
        className="min-h-screen pb-28"
        style={{ background: 'linear-gradient(180deg, #fff0f5 0%, #fdf2f8 40%, #fff5f7 100%)' }}
      >
        {/* Hero section */}
        <div className="relative overflow-hidden" style={{ minHeight: '40vh' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-rose-100/80 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="text-6xl mb-4"
            >
              💑
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-6xl text-rose-700 font-bold mb-3"
            >
              Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-accent text-rose-400 text-xl sm:text-2xl"
            >
              Our beautiful story together
            </motion.p>
          </div>
        </div>

        <div className="container-responsive max-w-3xl">
          {/* Story paragraphs */}
          <div className="space-y-4 mb-12 px-2">
            {paragraphs.map((p, i) => (
              <StoryParagraph key={i} {...p} index={i} />
            ))}
          </div>

          {/* Section divider */}
          <SectionTitle
            title="Our Memories"
            subtitle="18 chapters of our story"
            emoji="🎞️"
          />

          {/* Photo grid */}
          <div className="px-2">
            <PhotoGrid photos={US_PHOTOS} captions={US_CAPTIONS} />
          </div>

          {/* Closing note */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center glass rounded-3xl p-8 mx-2 shadow-lg"
          >
            <div className="text-4xl mb-4">💕</div>
            <p className="font-display text-rose-700 text-lg sm:text-xl italic leading-relaxed">
              "Every day with you is my favorite day. So today is my new favorite day."
            </p>
            <p className="font-accent text-rose-400 mt-3">—  just how I feel about us</p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}