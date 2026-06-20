import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg-elements">
        <div className="hero__bg-circle hero__bg-circle--1"></div>
        <div className="hero__bg-circle hero__bg-circle--2"></div>
        <div className="hero__bg-circle hero__bg-circle--3"></div>
        <div className="hero__bg-line hero__bg-line--1"></div>
        <div className="hero__bg-line hero__bg-line--2"></div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__badge">🏀 TEMPORADA 2026</span>
          <h1 className="hero__title">
            Liga Juvenil de
            <span className="hero__title-highlight"> Baloncesto</span>
          </h1>
          <p className="hero__subtitle">
            Seguí la clasificación, consultá los partidos y conocé a todos los equipos participantes desde una única plataforma.
          </p>
          <div className="hero__buttons">
            <a href="#clasificacion" className="btn btn-primary btn-lg" id="btn-ver-clasificacion">
              Ver Clasificación
            </a>
            <a href="#partidos" className="btn btn-outline btn-lg" id="btn-ver-calendario">
              Ver Calendario
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">8</span>
              <span className="hero__stat-label">Equipos</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">96</span>
              <span className="hero__stat-label">Jugadores</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">28</span>
              <span className="hero__stat-label">Partidos</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__illustration">
            <div className="hero__court">
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero__court-svg">
                {/* Court background */}
                <rect x="20" y="60" width="360" height="280" rx="12" fill="#1E3A8A" opacity="0.08"/>
                <rect x="30" y="70" width="340" height="260" rx="8" fill="none" stroke="#1E3A8A" strokeWidth="2" opacity="0.15"/>
                {/* Center circle */}
                <circle cx="200" cy="200" r="50" fill="none" stroke="#1E3A8A" strokeWidth="2" opacity="0.15"/>
                <line x1="200" y1="70" x2="200" y2="330" stroke="#1E3A8A" strokeWidth="2" opacity="0.15"/>
                
                {/* Basketball */}
                <circle cx="200" cy="160" r="45" fill="#F97316" className="hero__ball">
                  <animate attributeName="cy" values="160;145;160" dur="2s" repeatCount="indefinite"/>
                </circle>
                <path d="M200 115 Q200 160 200 205" stroke="#1E3A8A" strokeWidth="2" fill="none" opacity="0.4">
                  <animate attributeName="d" values="M200 115 Q200 160 200 205;M200 100 Q200 145 200 190;M200 115 Q200 160 200 205" dur="2s" repeatCount="indefinite"/>
                </path>
                <path d="M155 160 Q200 160 245 160" stroke="#1E3A8A" strokeWidth="2" fill="none" opacity="0.4">
                  <animate attributeName="d" values="M155 160 Q200 160 245 160;M155 145 Q200 145 245 145;M155 160 Q200 160 245 160" dur="2s" repeatCount="indefinite"/>
                </path>

                {/* Player silhouettes */}
                <g opacity="0.6">
                  {/* Player 1 */}
                  <circle cx="120" cy="240" r="12" fill="#1E3A8A"/>
                  <rect x="112" y="255" width="16" height="30" rx="6" fill="#1E3A8A"/>
                  
                  {/* Player 2 */}
                  <circle cx="280" cy="250" r="12" fill="#F97316"/>
                  <rect x="272" y="265" width="16" height="30" rx="6" fill="#F97316"/>
                  
                  {/* Player 3 */}
                  <circle cx="160" cy="280" r="12" fill="#1E3A8A"/>
                  <rect x="152" y="295" width="16" height="25" rx="6" fill="#1E3A8A"/>
                  
                  {/* Player 4 */}
                  <circle cx="240" cy="270" r="12" fill="#F97316"/>
                  <rect x="232" y="285" width="16" height="28" rx="6" fill="#F97316"/>
                </g>

                {/* Scoreboard */}
                <rect x="130" y="30" width="140" height="35" rx="8" fill="var(--color-primary)" opacity="0.9"/>
                <text x="155" y="53" fill="white" fontSize="14" fontWeight="700" fontFamily="Inter">24</text>
                <text x="192" y="53" fill="#F97316" fontSize="12" fontWeight="600" fontFamily="Inter">VS</text>
                <text x="225" y="53" fill="white" fontSize="14" fontWeight="700" fontFamily="Inter">18</text>
              </svg>
            </div>

            {/* Floating cards */}
            <div className="hero__float-card hero__float-card--1">
              <span className="hero__float-icon">🏆</span>
              <div>
                <strong>Hawks</strong>
                <span>Líder</span>
              </div>
            </div>

            <div className="hero__float-card hero__float-card--2">
              <span className="hero__float-icon">📊</span>
              <div>
                <strong>+15 pts</strong>
                <span>Promedio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
