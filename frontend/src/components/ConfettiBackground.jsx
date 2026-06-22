import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import './ConfettiBackground.css'

const ConfettiBackground = () => {
  const location = useLocation()
  
  const publicPaths = ['/', '/clasificacion', '/partidos', '/equipos']
  const isPublic = publicPaths.includes(location.pathname)

  // Generate a fixed number of particles with useMemo so they don't jump around on re-renders
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      type: i % 5,
      left: `${Math.random() * 100}vw`,
      duration: `${15 + Math.random() * 25}s`,
      delay: `-${Math.random() * 25}s`
    }))
  }, [])

  if (!isPublic) return null

  return (
    <div className="confetti-container">
      {particles.map((p) => (
        <div key={p.id} className={`confetti confetti-${p.type}`} style={{
          left: p.left,
          animationDuration: p.duration,
          animationDelay: p.delay
        }}></div>
      ))}
    </div>
  )
}

export default ConfettiBackground
