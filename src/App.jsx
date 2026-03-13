import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import UsPage from './pages/UsPage'
import HerPage from './pages/HerPage'
import SorryPage from './pages/SorryPage'
import SpecialPage from './pages/SpecialPage'
import MusicPlayer from './components/MusicPlayer'
import FloatingPetals from './components/FloatingPetals'
import NavigationDots from './components/NavigationDots'

const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem('anjali_user')
  if (!user) return <Navigate to="/" replace />
  return children
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = sessionStorage.getItem('anjali_user')
    if (user) setIsLoggedIn(true)
  }, [])

  const pages = [
    { path: '/us', label: 'Us' },
    { path: '/her', label: 'Her' },
    { path: '/sorry', label: 'Sorry' },
    { path: '/special', label: 'Special' },
  ]

  return (
    <Router>
      <FloatingPetals />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/us" element={<ProtectedRoute><UsPage /></ProtectedRoute>} />
        <Route path="/her" element={<ProtectedRoute><HerPage /></ProtectedRoute>} />
        <Route path="/sorry" element={<ProtectedRoute><SorryPage /></ProtectedRoute>} />
        <Route path="/special" element={<ProtectedRoute><SpecialPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isLoggedIn && <MusicPlayer />}
      {isLoggedIn && <NavigationDots pages={pages} />}
    </Router>
  )
}

export default App