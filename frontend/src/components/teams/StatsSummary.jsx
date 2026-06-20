const StatsSummary = ({ stats }) => {
  return (
    <div className="teams-stats">
      <div className="teams-stats__card">
        <span className="teams-stats__label">Equipos Registrados</span>
        <span className="teams-stats__value">{stats.totalTeams}</span>
      </div>
      <div className="teams-stats__card">
        <span className="teams-stats__label">Jugadores Totales</span>
        <span className="teams-stats__value">{stats.totalPlayers}</span>
      </div>
      <div className="teams-stats__card">
        <span className="teams-stats__label">Entrenadores</span>
        <span className="teams-stats__value">{stats.totalCoaches}</span>
      </div>
    </div>
  )
}

export default StatsSummary
