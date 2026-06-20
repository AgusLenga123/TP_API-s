const stats = [
  {
    icon: '👥',
    label: 'Equipos',
    value: 8,
    color: 'blue',
  },
  {
    icon: '🏃',
    label: 'Jugadores',
    value: 96,
    color: 'orange',
  },
  {
    icon: '📅',
    label: 'Partidos Programados',
    value: 24,
    color: 'green',
  },
  {
    icon: '✅',
    label: 'Partidos Finalizados',
    value: 18,
    color: 'purple',
  },
]

const StatsCards = () => {
  return (
    <section className="stats" id="stats-section">
      <div className="stats__grid">
        {stats.map((stat, index) => (
          <div
            className={`stats__card stats__card--${stat.color}`}
            key={index}
            id={`stat-card-${index}`}
          >
            <div className={`stats__icon stats__icon--${stat.color}`}>
              {stat.icon}
            </div>
            <div className="stats__info">
              <div className="stats__label">{stat.label}</div>
              <div className="stats__value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsCards
