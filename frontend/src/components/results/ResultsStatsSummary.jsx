const ResultsStatsSummary = ({ stats }) => {
  return (
    <div className="results-stats">
      <div className="results-stats__card">
        <span className="results-stats__label">Partidos Finalizados</span>
        <span className="results-stats__value">{stats.finishedMatches}</span>
      </div>
      <div className="results-stats__card">
        <span className="results-stats__label">Resultados Cargados</span>
        <span className="results-stats__value" style={{color: 'var(--color-success)'}}>{stats.loadedResults}</span>
      </div>
      <div className="results-stats__card">
        <span className="results-stats__label">Pendientes de Carga</span>
        <span className="results-stats__value" style={{color: '#ca8a04'}}>{stats.pendingResults}</span>
      </div>
      <div className="results-stats__card">
        <span className="results-stats__label">Último Resultado</span>
        <span className="results-stats__value results-stats__value--date" style={{color: 'var(--color-text)'}}>
          {stats.lastResultDate || 'N/A'}
        </span>
      </div>
    </div>
  )
}

export default ResultsStatsSummary
