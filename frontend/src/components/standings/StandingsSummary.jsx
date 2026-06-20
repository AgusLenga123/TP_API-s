const StandingsSummary = ({ leaderName, totalTeams, totalMatches }) => {
  return (
    <div className="standings-summary">
      <div className="standings-summary__card">
        <span className="standings-summary__label">Líder Actual</span>
        <div className="standings-summary__value">
          <span className="standings-summary__icon">🥇</span>
          <span>{leaderName}</span>
        </div>
      </div>
      <div className="standings-summary__card">
        <span className="standings-summary__label">Equipos Participantes</span>
        <div className="standings-summary__value">
          <span className="standings-summary__icon">🏀</span>
          <span>{totalTeams}</span>
        </div>
      </div>
      <div className="standings-summary__card">
        <span className="standings-summary__label">Partidos Jugados</span>
        <div className="standings-summary__value">
          <span className="standings-summary__icon">📅</span>
          <span>{totalMatches}</span>
        </div>
      </div>
      <div className="standings-summary__card">
        <span className="standings-summary__label">Temporada</span>
        <div className="standings-summary__value">
          <span className="standings-summary__icon">🏆</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  )
}

export default StandingsSummary
