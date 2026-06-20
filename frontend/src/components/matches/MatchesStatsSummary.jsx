const MatchesStatsSummary = ({ stats }) => {
  return (
    <div className="matches-stats">
      <div className="matches-stats__card">
        <span className="matches-stats__label">Partidos Totales</span>
        <span className="matches-stats__value">{stats.totalMatches}</span>
      </div>
      <div className="matches-stats__card">
        <span className="matches-stats__label">Pendientes</span>
        <span className="matches-stats__value" style={{color: 'var(--color-secondary)'}}>{stats.pendingMatches}</span>
      </div>
      <div className="matches-stats__card">
        <span className="matches-stats__label">Finalizados</span>
        <span className="matches-stats__value" style={{color: 'var(--color-success)'}}>{stats.finishedMatches}</span>
      </div>
      <div className="matches-stats__card">
        <span className="matches-stats__label">Próximo Partido</span>
        <span className="matches-stats__value matches-stats__value--date" style={{color: 'var(--color-text)'}}>
          {stats.nextMatchDate || 'N/A'}
        </span>
      </div>
    </div>
  )
}

export default MatchesStatsSummary
