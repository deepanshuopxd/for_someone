import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageWrapper from '../components/PageWrapper'
import SectionTitle from '../components/SectionTitle'
import { HER_PHOTOS, HER_VIDEOS } from '../config/imageConfig'

function HerPhoto({ photo, index }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 9) * 0.05 }}
      whileHover={{ scale: 1.06, zIndex: 20 }}
      className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group"
      style={{ aspectRatio: '1' }}
    >
      {!loaded && <div className="absolute inset-0 shimmer" />}
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={e => { e.target.style.display = 'none' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
        <span className="text-white font-accent text-xs">💕 {index + 1}</span>
      </div>
    </motion.div>
  )
}

function VideoPlayer({ video, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="glass rounded-3xl overflow-hidden shadow-xl p-2"
    >
      <video
        controls
        poster={video.poster}
        className="w-full rounded-2xl max-h-72 sm:max-h-96 object-cover"
        preload="metadata"
      >
        <source src={video.src} type="video/mp4" />
        Your browser does not support video.
      </video>
      <p className="font-accent text-rose-500 text-sm text-center py-2">{video.title}</p>
    </motion.div>
  )
}

export default function HerPage() {
  return (
    <PageWrapper>
      <div
        className="min-h-screen pb-28"
        style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 30%, #fdf0f5 70%, #fff5f7 100%)' }}
      >
        {/* Hero */}
        <div className="relative overflow-hidden py-16 px-4 text-center">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #f43f5e 1px, transparent 1px)', backgroundSize: '30px 30px' }}
          />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }} className="text-6xl mb-4">🌸</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-4xl sm:text-6xl text-rose-700 font-bold mb-3">Her</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-accent text-rose-400 text-xl">The most beautiful soul I know</motion.p>
        </div>

        <div className="container-responsive max-w-5xl">
          {/* Note */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mx-2 mb-12 glass rounded-3xl p-6 sm:p-10 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-3 left-5 text-3xl opacity-20 font-accent text-rose-300 rotate-[-20deg]">✦</div>
            <div className="absolute bottom-3 right-5 text-3xl opacity-20 font-accent text-rose-300 rotate-[20deg]">✦</div>
            <div className="text-4xl mb-4">💌</div>
            <h3 className="font-display text-2xl text-rose-700 font-semibold mb-4">A note for you</h3>
            <p className="font-body text-rose-800 leading-relaxed text-sm sm:text-base italic mb-4">
              "Looking at your photos is my favorite thing. Every single one reminds me of why I fell for you — your eyes that hold entire galaxies, your smile that makes the world stop for a second, and the way you exist so beautifully in every frame. You don't even try, and yet you are the most breathtaking thing I have ever seen."
            </p>
            <p className="font-body text-rose-800 leading-relaxed text-sm sm:text-base italic mb-4">
              "These 54 photos are 54 reasons I count myself the luckiest person alive. But honestly? No photo ever does you justice. You are so much more radiant in real life, so much more alive, so much more you."
            </p>
            <p className="font-accent text-rose-500 text-lg">— Always yours 💕</p>
          </motion.div>

          {/* Videos */}
          <SectionTitle title="Moving Pictures" subtitle="Because photos weren't enough" emoji="🎬" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 mb-12">
            {HER_VIDEOS.map((video, i) => <VideoPlayer key={i} video={video} index={i} />)}
          </div>

          {/* Photos */}
          <SectionTitle title="54 Reasons" subtitle="Every photo is a reminder of how beautiful you are" emoji="📸" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 px-2">
            {HER_PHOTOS.map((photo, i) => <HerPhoto key={i} photo={photo} index={i} />)}
          </div>

          {/* Closing */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-12 mx-2 text-center">
            <div className="flex justify-center gap-2 text-3xl mb-4">
              {['🌸','💕','🌹','✨','💖','🌺','💗','🌷'].map((e, i) => (
                <motion.span key={i} animate={{ y: [0, -10, 0] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}>{e}</motion.span>
              ))}
            </div>
            <p className="font-display text-rose-600 text-xl sm:text-2xl italic">"You are the finest, loveliest, tenderest, and most beautiful person I have ever known."</p>
            <p className="font-accent text-rose-400 mt-2"></p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}