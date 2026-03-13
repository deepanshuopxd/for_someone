import { useState, useRef, useEffect } from 'react'

// Add your music files to public/music/ folder and list them here
const SONGS = [
  { title: 'Song 1', artist: 'For Anjali', src: '/music/song1.mp3' },
  { title: 'Song 2', artist: 'Our Melody', src: '/music/song2.mp3' },
  { title: 'Song 3', artist: 'Love Theme', src: '/music/song3.mp3' },
  { title: 'Song 4', artist: 'Special Tune', src: '/music/song4.mp3' },
  { title: 'Song 5', artist: 'Forever Ours', src: '/music/song5.mp3' },
]

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef(null)

  const current = SONGS[currentIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, currentIndex])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100)
      setDuration(audio.duration)
    }
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    const val = parseFloat(e.target.value)
    if (audio && audio.duration) {
      audio.currentTime = (val / 100) * audio.duration
      setProgress(val)
    }
  }

  const playNext = () => setCurrentIndex(i => (i + 1) % SONGS.length)
  const playPrev = () => setCurrentIndex(i => (i - 1 + SONGS.length) % SONGS.length)

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={current.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onEnded={playNext}
        loop={false}
      />

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="fixed top-4 right-4 z-50 glass rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-rose-500 hover:scale-110 transition-all"
        aria-label="Music Player"
      >
        {isPlaying ? '🎵' : '🎶'}
      </button>

      {/* Player panel */}
      {isOpen && (
        <div className="fixed top-20 right-4 z-50 glass rounded-2xl p-4 w-72 shadow-2xl border border-white/40">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-accent text-rose-600 text-sm font-semibold">♪ Our Playlist</span>
            <button onClick={() => setIsOpen(false)} className="text-rose-300 hover:text-rose-500 text-lg leading-none">×</button>
          </div>

          {/* Song info */}
          <div className="text-center mb-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-rose-300 to-rose-600 flex items-center justify-center text-2xl mb-2 animate-spin-slow shadow-lg">
              🎵
            </div>
            <p className="font-display text-rose-800 font-semibold text-sm truncate">{current.title}</p>
            <p className="text-rose-400 text-xs">{current.artist}</p>
          </div>

          {/* Progress */}
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="music-progress w-full"
              style={{ '--progress': `${progress}%` }}
            />
            <div className="flex justify-between text-xs text-rose-400 mt-1">
              <span>{formatTime(audioRef.current?.currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <button onClick={playPrev} className="text-rose-400 hover:text-rose-600 text-xl transition-colors">⏮</button>
            <button
              onClick={() => setIsPlaying(p => !p)}
              className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors shadow-md text-lg"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={playNext} className="text-rose-400 hover:text-rose-600 text-xl transition-colors">⏭</button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <span className="text-rose-400 text-sm">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="music-progress flex-1"
              style={{ '--progress': `${volume * 100}%` }}
            />
            <span className="text-rose-400 text-sm">🔊</span>
          </div>

          {/* Song list */}
          <div className="mt-3 border-t border-white/30 pt-3 space-y-1 max-h-32 overflow-y-auto">
            {SONGS.map((song, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setIsPlaying(true) }}
                className={`w-full text-left px-2 py-1 rounded-lg text-xs transition-all ${
                  i === currentIndex
                    ? 'bg-rose-100 text-rose-700 font-semibold'
                    : 'text-rose-400 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                {i === currentIndex && isPlaying ? '▶ ' : `${i + 1}. `}{song.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}