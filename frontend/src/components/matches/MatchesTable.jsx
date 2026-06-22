const MatchesTable = ({ matches, onView, onEdit, onDelete }) => {
  if (matches.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">🏀</span>
        <h3 className="empty-state__title">No hay partidos programados</h3>
        <p className="empty-state__desc">Intenta ajustar tu búsqueda o crea un nuevo partido.</p>
      </div>
    )
  }

  return (
    <div className="matches-table-container">
      <table className="matches-table">
        <thead>
          <tr>
            <th>Encuentro</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Lugar</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>
                <div className="matches-table__teams">
                  <span>{match.homeTeam}</span>
                  <span className="matches-table__vs">VS</span>
                  <span>{match.awayTeam}</span>
                </div>
              </td>
              <td>{new Date(match.date).toLocaleDateString('es-AR')}</td>
              <td>{match.time}</td>
              <td>{match.location}</td>
              <td>
                <span className={`matches-table__badge matches-table__badge--${match.status.toLowerCase()}`}>
                  {match.status}
                </span>
              </td>
              <td>
                <div className="matches-table__actions">
                  <button className="matches-table__action-btn" onClick={() => onView(match)} title="Ver detalle">
                    👁
                  </button>
                  {onEdit && (
                    <button className="matches-table__action-btn" onClick={() => onEdit(match)} title="Editar">
                      ✏
                    </button>
                  )}
                  {onDelete && (
                    <button className="matches-table__action-btn matches-table__action-btn--delete" onClick={() => onDelete(match)} title="Eliminar">
                      🗑
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MatchesTable
