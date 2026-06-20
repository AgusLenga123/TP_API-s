import './Features.css'

const features = [
  {
    icon: '🏀',
    title: 'Equipos',
    description: 'Consulta planteles y entrenadores.',
  },
  {
    icon: '📅',
    title: 'Partidos',
    description: 'Visualizá el calendario completo.',
  },
  {
    icon: '🏆',
    title: 'Clasificación',
    description: 'Seguí la tabla de posiciones actualizada.',
  },
  {
    icon: '👥',
    title: 'Jugadores',
    description: 'Conocé a los integrantes de cada equipo.',
  },
]

const Features = () => {
  return (
    <section className="features section reveal" id="features">
      <div className="container">
        <h2 className="section-title">Todo lo que necesitás para seguir el torneo</h2>
        
        <div className="features__grid">
          {features.map((feature, index) => (
            <div
              className="features__card"
              key={index}
              id={`feature-${index}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="features__icon-wrapper">
                <span className="features__icon">{feature.icon}</span>
              </div>
              <h3 className="features__title">{feature.title}</h3>
              <p className="features__description">{feature.description}</p>
              <div className="features__arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
