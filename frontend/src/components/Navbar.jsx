import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#F97316" stroke="#1E3A8A" strokeWidth="2"/>
              <path d="M20 2 Q20 20 20 38" stroke="#1E3A8A" strokeWidth="1.5" fill="none"/>
              <path d="M2 20 Q20 20 38 20" stroke="#1E3A8A" strokeWidth="1.5" fill="none"/>
              <path d="M6 8 Q20 14 34 8" stroke="#1E3A8A" strokeWidth="1.2" fill="none"/>
              <path d="M6 32 Q20 26 34 32" stroke="#1E3A8A" strokeWidth="1.2" fill="none"/>
            </svg>
          </div>
          <span className="navbar__logo-text">Youth Basketball League</span>
        </Link>

        <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`} id="navbar-menu">
          <div className="navbar__links">
            <Link to="/" className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`} onClick={closeMenu}>Inicio</Link>
            <Link to="/clasificacion" className={`navbar__link ${location.pathname === '/clasificacion' ? 'navbar__link--active' : ''}`} onClick={closeMenu}>Clasificación</Link>
            <Link to="/partidos" className={`navbar__link ${location.pathname === '/partidos' ? 'navbar__link--active' : ''}`} onClick={closeMenu}>Partidos</Link>
            <Link to="/equipos" className={`navbar__link ${location.pathname === '/equipos' ? 'navbar__link--active' : ''}`} onClick={closeMenu}>Equipos</Link>
          </div>
          <Link to="/login" className="btn btn-secondary navbar__cta" id="btn-login" onClick={closeMenu}>
            Iniciar Sesión
          </Link>
        </div>

        <button
          className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
          id="btn-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
