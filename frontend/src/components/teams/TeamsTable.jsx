const TeamsTable = ({ teams, onView, onEdit, onDelete }) => {
  if (teams.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">🏀</span>
        <h3 className="empty-state__title">No se encontraron equipos</h3>
        <p className="empty-state__desc">Intenta ajustar tu búsqueda o filtros.</p>
      </div>
    )
  }

  return (
    <div className="teams-table-container">
      <table className="teams-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Entrenador</th>
            <th>Jugadores</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td className="teams-table__name">{team.name}</td>
              <td>{team.coach}</td>
              <td>{team.players} jugadores</td>
              <td>
                <span className={`teams-table__badge teams-table__badge--${team.status.toLowerCase()}`}>
                  {team.status}
                </span>
              </td>
              <td>
                <div className="teams-table__actions">
                  <button className="teams-table__action-btn" onClick={() => onView(team)} title="Ver detalle">
                    👁
                  </button>
                  {onEdit && (
                    <button className="teams-table__action-btn" onClick={() => onEdit(team)} title="Editar">
                      ✏
                    </button>
                  )}
                  {onDelete && (
                    <button className="teams-table__action-btn teams-table__action-btn--delete" onClick={() => onDelete(team)} title="Eliminar">
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

export default TeamsTable
