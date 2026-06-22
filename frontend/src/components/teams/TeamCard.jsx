const TeamCard = ({ team, onView, onEdit, onDelete }) => {
  return (
    <div className="team-card">
      <div className="team-card__header">
        <span className="team-card__title">{team.name}</span>
        <span className={`teams-table__badge teams-table__badge--${team.status.toLowerCase()}`}>
          {team.status}
        </span>
      </div>
      <div className="team-card__info">
        <span className="team-card__info-row">
          <span>👔</span> {team.coach}
        </span>
        <span className="team-card__info-row">
          <span>🏃</span> {team.players} jugadores
        </span>
      </div>
      <div className="team-card__actions">
        <button className="team-card__btn" onClick={() => onView(team)}>
          👁 Ver
        </button>
        {onEdit && (
          <button className="team-card__btn" onClick={() => onEdit(team)}>
            ✏ Editar
          </button>
        )}
        {onDelete && (
          <button className="team-card__btn team-card__btn--delete" onClick={() => onDelete(team)}>
            🗑 Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default TeamCard
