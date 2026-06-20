const mockPlayers = [
  'Lucas Pérez', 'Juan Gómez', 'Martín López', 'Pedro Silva', 
  'Mateo García', 'Tomás Rodríguez', 'Nicolás Martínez', 'Thiago Fernández'
]

const TeamDetailModal = ({ isOpen, onClose, team }) => {
  if (!isOpen || !team) return null

  // Mock player list based on team.players count (max 8)
  const playersList = mockPlayers.slice(0, Math.min(team.players, 8))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--large" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <h2 className="modal__title">{team.name}</h2>
            <span className={`teams-table__badge teams-table__badge--${team.status.toLowerCase()}`} style={{marginTop: '8px'}}>
              {team.status}
            </span>
          </div>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="modal__body">
          <div className="team-detail__stats">
            <div className="team-detail__stat-box">
              <div className="team-detail__stat-label">Entrenador</div>
              <div className="team-detail__stat-value" style={{fontSize: '1.2rem'}}>{team.coach}</div>
            </div>
            <div className="team-detail__stat-box">
              <div className="team-detail__stat-label">Jugadores</div>
              <div className="team-detail__stat-value">{team.players}</div>
            </div>
            <div className="team-detail__stat-box">
              <div className="team-detail__stat-label">Partidos Jugados</div>
              <div className="team-detail__stat-value">14</div>
            </div>
            <div className="team-detail__stat-box">
              <div className="team-detail__stat-label">Victorias</div>
              <div className="team-detail__stat-value" style={{color: 'var(--color-success)'}}>9</div>
            </div>
            <div className="team-detail__stat-box">
              <div className="team-detail__stat-label">Derrotas</div>
              <div className="team-detail__stat-value" style={{color: '#ef4444'}}>5</div>
            </div>
            <div className="team-detail__stat-box">
              <div className="team-detail__stat-label">Empates</div>
              <div className="team-detail__stat-value">0</div>
            </div>
          </div>

          <div>
            <h3 className="form-label" style={{marginBottom: '16px'}}>Lista de Jugadores (Ejemplo)</h3>
            <ul className="team-detail__players-list">
              {playersList.map((player, index) => (
                <li key={index} className="team-detail__player-item">{player}</li>
              ))}
              {team.players > 8 && (
                <li className="team-detail__player-item" style={{justifyContent: 'center', color: 'var(--color-text-secondary)'}}>
                  + {team.players - 8} más
                </li>
              )}
              {team.players === 0 && (
                <div style={{color: 'var(--color-text-secondary)', fontSize: '0.875rem'}}>Sin jugadores registrados</div>
              )}
            </ul>
          </div>
        </div>
        
        <div className="modal__footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default TeamDetailModal
