const PlayerCard = ({ player, onView, onEdit, onDelete }) => {
  return (
    <div className="player-card">
      <div className="player-card__header">
        <div className="player-card__title">
          <div className="players-table__avatar">
            {player.firstName.charAt(0)}{player.lastName.charAt(0)}
          </div>
          {player.firstName} {player.lastName}
        </div>
        <span className={`players-table__badge players-table__badge--${player.status.toLowerCase()}`}>
          {player.status}
        </span>
      </div>
      <div className="player-card__info">
        <span className="player-card__info-row">
          <span>🛡️</span> {player.team}
        </span>
        <span className="player-card__info-row">
          <span>📊</span> {player.category}
        </span>
      </div>
      <div className="player-card__actions">
        <button className="player-card__btn" onClick={() => onView(player)}>
          👁 Ver
        </button>
        <button className="player-card__btn" onClick={() => onEdit(player)}>
          ✏ Editar
        </button>
        <button className="player-card__btn player-card__btn--delete" onClick={() => onDelete(player)}>
          🗑 Eliminar
        </button>
      </div>
    </div>
  )
}

export default PlayerCard
