const MatchCard = ({ match, onView, onEdit, onDelete }) => {
  return (
    <div className="match-card">
      <div className="match-card__header">
        <div className="match-card__title">
          <span>{match.homeTeam}</span>
          <span className="matches-table__vs">VS</span>
          <span>{match.awayTeam}</span>
        </div>
        <span className={`matches-table__badge matches-table__badge--${match.status.toLowerCase()}`}>
          {match.status}
        </span>
      </div>
      <div className="match-card__info">
        <span className="match-card__info-row">
          <span>📅</span> {new Date(match.date).toLocaleDateString('es-AR')} a las {match.time}
        </span>
        <span className="match-card__info-row">
          <span>📍</span> {match.location}
        </span>
      </div>
      <div className="match-card__actions">
        <button className="match-card__btn" onClick={() => onView(match)}>
          👁 Ver
        </button>
        {onEdit && (
          <button className="match-card__btn" onClick={() => onEdit(match)}>
            ✏ Editar
          </button>
        )}
        {onDelete && (
          <button className="match-card__btn match-card__btn--delete" onClick={() => onDelete(match)}>
            🗑 Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default MatchCard
