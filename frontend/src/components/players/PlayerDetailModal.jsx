const PlayerDetailModal = ({ isOpen, onClose, player }) => {
  if (!isOpen || !player) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--large" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="player-detail__header-content">
            <div className="player-detail__avatar-large">
              {player.firstName.charAt(0)}{player.lastName.charAt(0)}
            </div>
            <div className="player-detail__info">
              <h2>{player.firstName} {player.lastName}</h2>
              <div className="player-detail__badges">
                <span className={`players-table__badge players-table__badge--${player.status.toLowerCase()}`}>
                  {player.status}
                </span>
                <span className="players-table__badge players-table__badge--category">
                  {player.category}
                </span>
                <span className="players-table__badge" style={{background: '#f1f5f9', color: '#475569'}}>
                  {player.team}
                </span>
              </div>
            </div>
          </div>
          <button className="modal__close" style={{alignSelf: 'flex-start'}} onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="modal__body">
          <h3 className="form-label" style={{marginBottom: '16px'}}>Estadísticas (Temporada Actual)</h3>
          <div className="player-detail__stats">
            <div className="player-detail__stat-box">
              <div className="player-detail__stat-label">Partidos Jugados</div>
              <div className="player-detail__stat-value">12</div>
            </div>
            <div className="player-detail__stat-box">
              <div className="player-detail__stat-label">Puntos Totales</div>
              <div className="player-detail__stat-value" style={{color: 'var(--color-primary)'}}>144</div>
            </div>
            <div className="player-detail__stat-box">
              <div className="player-detail__stat-label">Promedio (PPP)</div>
              <div className="player-detail__stat-value">12.0</div>
            </div>
          </div>

          <div>
            <h3 className="form-label" style={{marginBottom: '16px'}}>Últimos Partidos</h3>
            <ul className="team-detail__players-list" style={{gridTemplateColumns: '1fr'}}>
              <li className="team-detail__player-item" style={{justifyContent: 'space-between'}}>
                <span>vs Tigers</span>
                <span style={{fontWeight: 700}}>14 pts</span>
              </li>
              <li className="team-detail__player-item" style={{justifyContent: 'space-between'}}>
                <span>vs Lions</span>
                <span style={{fontWeight: 700}}>18 pts</span>
              </li>
              <li className="team-detail__player-item" style={{justifyContent: 'space-between'}}>
                <span>vs Eagles</span>
                <span style={{fontWeight: 700}}>9 pts</span>
              </li>
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

export default PlayerDetailModal
