const PlayersTable = ({ players, onView, onEdit, onDelete }) => {
  if (players.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">🏀</span>
        <h3 className="empty-state__title">No hay jugadores registrados</h3>
        <p className="empty-state__desc">Intenta ajustar tu búsqueda o crea un nuevo jugador.</p>
      </div>
    )
  }

  return (
    <div className="players-table-container">
      <table className="players-table">
        <thead>
          <tr>
            <th>Nombre y Apellido</th>
            <th>Categoría</th>
            <th>Equipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>
                <div className="players-table__name">
                  <div className="players-table__avatar">
                    {player.firstName.charAt(0)}{player.lastName.charAt(0)}
                  </div>
                  {player.firstName} {player.lastName}
                </div>
              </td>
              <td>
                <span className="players-table__badge players-table__badge--category">
                  {player.category}
                </span>
              </td>
              <td>{player.team}</td>
              <td>
                <span className={`players-table__badge players-table__badge--${player.status.toLowerCase()}`}>
                  {player.status}
                </span>
              </td>
              <td>
                <div className="players-table__actions">
                  <button className="players-table__action-btn" onClick={() => onView(player)} title="Ver detalle">
                    👁
                  </button>
                  <button className="players-table__action-btn" onClick={() => onEdit(player)} title="Editar">
                    ✏
                  </button>
                  <button className="players-table__action-btn players-table__action-btn--delete" onClick={() => onDelete(player)} title="Eliminar">
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayersTable
