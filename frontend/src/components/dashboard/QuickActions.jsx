import { Link } from 'react-router-dom'

const actions = [
  {
    icon: '👥',
    title: 'Equipos',
    description: 'Gestionar equipos y entrenadores.',
    link: '/dashboard/equipos',
    color: 'blue',
  },
  {
    icon: '🧑‍🤝‍🧑',
    title: 'Jugadores',
    description: 'Administrar planteles.',
    link: '/dashboard/jugadores',
    color: 'orange',
  },
  {
    icon: '📅',
    title: 'Partidos',
    description: 'Crear y editar partidos.',
    link: '/dashboard/partidos',
    color: 'green',
  },
  {
    icon: '📊',
    title: 'Resultados',
    description: 'Cargar resultados.',
    link: '/dashboard/resultados',
    color: 'purple',
  },
]

const QuickActions = () => {
  return (
    <section className="quick-actions" id="quick-actions">
      <h2 className="quick-actions__title">Accesos Rápidos</h2>
      <div className="quick-actions__grid">
        {actions.map((action, index) => (
          <div className="quick-actions__card" key={index} id={`quick-action-${index}`}>
            <div className="quick-actions__card-header">
              <div className={`quick-actions__card-icon quick-actions__card-icon--${action.color}`}>
                {action.icon}
              </div>
              <h3 className="quick-actions__card-title">{action.title}</h3>
            </div>
            <p className="quick-actions__card-desc">{action.description}</p>
            <Link to={action.link} className="quick-actions__card-btn">
              Ir a {action.title}
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h10M11 6l4 4-4 4" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default QuickActions
