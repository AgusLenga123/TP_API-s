import './AboutLeague.css'

const AboutLeague = () => {
  return (
    <section className="about section reveal" id="about">
      <div className="container">
        <div className="about__content">
          <div className="about__text">
            <h2 className="section-title">Sobre la Liga</h2>
            <p className="about__description">
              La Liga Juvenil de Baloncesto reúne a equipos de distintas categorías para competir durante toda la temporada en un entorno deportivo, formativo y competitivo.
            </p>
            <p className="about__description">
              Nuestra plataforma te permite seguir todos los resultados, consultar las estadísticas y mantenerte al día con el calendario de partidos.
            </p>
          </div>
          <div className="about__highlights">
            <div className="about__highlight-card">
              <div className="about__highlight-icon">🎯</div>
              <h3>Competencia</h3>
              <p>Torneos organizados con formato profesional</p>
            </div>
            <div className="about__highlight-card">
              <div className="about__highlight-icon">📈</div>
              <h3>Desarrollo</h3>
              <p>Formación integral de jóvenes deportistas</p>
            </div>
            <div className="about__highlight-card">
              <div className="about__highlight-icon">🤝</div>
              <h3>Comunidad</h3>
              <p>Una comunidad unida por la pasión al básquet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutLeague
