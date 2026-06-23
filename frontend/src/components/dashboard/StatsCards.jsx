const StatsCards = ({ stats }) => {
  const statCards = [
    { icon: '👥', label: 'Equipos', value: stats.teams, color: 'blue' },
    { icon: '🏃', label: 'Jugadores', value: stats.players, color: 'orange' },
    { icon: '📅', label: 'Partidos Programados', value: stats.matchesScheduled, color: 'green' },
    { icon: '✅', label: 'Partidos Finalizados', value: stats.matchesFinished, color: 'purple' },
  ]
  return (
    <section className="stats" id="stats-section">
      <div className="stats__grid">
        {statCards.map((stat, index) => (
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
