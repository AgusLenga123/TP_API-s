const PlayersStatsSummary = ({ stats }) => {
  return (
    <div className="players-stats">
      <div className="players-stats__card">
        <span className="players-stats__label">Total Jugadores</span>
        <span className="players-stats__value">{stats.totalPlayers}</span>
      </div>
      <div className="players-stats__card">
        <span className="players-stats__label">Categorías Activas</span>
        <span className="players-stats__value">{stats.activeCategories}</span>
      </div>
      <div className="players-stats__card">
        <span className="players-stats__label">Equipos con Jugadores</span>
        <span className="players-stats__value">{stats.teamsWithPlayers}</span>
      </div>
    </div>
  )
}

export default PlayersStatsSummary
