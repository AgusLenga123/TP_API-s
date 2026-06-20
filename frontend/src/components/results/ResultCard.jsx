const ResultCard = ({ result, onView, onEdit }) => {
  return (
    <div className="result-card">
      <div className="result-card__header">
        <div className="result-card__teams">
          <span>{result.homeTeam}</span>
          <span className="result-card__vs">VS</span>
          <span>{result.awayTeam}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px'}}>
          <span className={`results-table__badge results-table__badge--${result.status.toLowerCase()}`}>
            {result.status}
          </span>
          {result.status === 'Finalizado' && (
            <span className="results-table__score" style={{fontSize: 'var(--font-size-base)', padding: '2px 8px'}}>
              {result.homeScore} - {result.awayScore}
            </span>
          )}
        </div>
      </div>
      <div className="result-card__info">
        <span className="result-card__date">
          📅 {new Date(result.date).toLocaleDateString('es-AR')}
        </span>
      </div>
      <div className="result-card__actions">
        <button className="result-card__btn" onClick={() => onView(result)}>
          👁 Ver
        </button>
        {result.status === 'Pendiente' ? (
          <button className="result-card__btn" onClick={() => onEdit(result)}>
            🏀 Cargar
          </button>
        ) : (
          <button className="result-card__btn" onClick={() => onEdit(result)}>
            ✏ Editar
          </button>
        )}
      </div>
    </div>
  )
}

export default ResultCard
