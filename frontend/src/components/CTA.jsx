import './CTA.css'

const CTA = () => {
  return (
    <section className="cta reveal" id="cta">
      <div className="cta__bg-elements">
        <div className="cta__bg-circle cta__bg-circle--1"></div>
        <div className="cta__bg-circle cta__bg-circle--2"></div>
      </div>
      <div className="container cta__container">
        <div className="cta__content">
          <span className="cta__emoji">🏀</span>
          <h2 className="cta__title">¿Listo para seguir la temporada?</h2>
          <p className="cta__subtitle">
            Explorá la clasificación, los partidos y los equipos de la liga juvenil.
          </p>
          <a href="#clasificacion" className="btn btn-secondary btn-lg cta__button" id="btn-explorar">
            Explorar la Liga
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
