import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#F97316" stroke="white" strokeWidth="2" opacity="0.9"/>
                  <path d="M20 2 Q20 20 20 38" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/>
                  <path d="M2 20 Q20 20 38 20" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/>
                  <path d="M6 8 Q20 14 34 8" stroke="white" strokeWidth="1.2" fill="none" opacity="0.3"/>
                  <path d="M6 32 Q20 26 34 32" stroke="white" strokeWidth="1.2" fill="none" opacity="0.3"/>
                </svg>
              </div>
              <span className="footer__logo-text">Youth Basketball League</span>
            </div>
            <p className="footer__tagline">
              La plataforma oficial de la liga juvenil de baloncesto.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__links-group">
              <h4 className="footer__links-title">Liga</h4>
              <a href="#clasificacion" className="footer__link">Clasificación</a>
              <a href="#partidos" className="footer__link">Partidos</a>
              <a href="#equipos" className="footer__link">Equipos</a>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">Plataforma</h4>
              <a href="#" className="footer__link">Administradores</a>
              <a href="#" className="footer__link">Iniciar Sesión</a>
              <a href="#about" className="footer__link">Sobre Nosotros</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Youth Basketball League</p>
          <p className="footer__made">Hecho con 🏀 para el baloncesto juvenil</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
