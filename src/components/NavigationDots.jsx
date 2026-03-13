import { useNavigate, useLocation } from 'react-router-dom'

export default function NavigationDots({ pages }) {
  const navigate = useNavigate()
  const location = useLocation()

  const currentIndex = pages.findIndex(p => p.path === location.pathname)
  if (currentIndex === -1) return null

  const handlePrev = () => {
    if (currentIndex > 0) navigate(pages[currentIndex - 1].path)
  }
  const handleNext = () => {
    if (currentIndex < pages.length - 1) navigate(pages[currentIndex + 1].path)
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      {/* Prev */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="glass rounded-full w-10 h-10 flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        aria-label="Previous page"
      >
        ‹
      </button>

      {/* Dots */}
      <div className="glass rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
        {pages.map((page, i) => (
          <button
            key={page.path}
            onClick={() => navigate(page.path)}
            title={page.label}
            className={`nav-dot rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-5 h-5 bg-rose-500 active'
                : 'w-3 h-3 bg-rose-300 hover:bg-rose-400'
            }`}
            aria-label={page.label}
          />
        ))}
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentIndex === pages.length - 1}
        className="glass rounded-full w-10 h-10 flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  )
}