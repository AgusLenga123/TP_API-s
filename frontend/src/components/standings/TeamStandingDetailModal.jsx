const TeamStandingDetailModal = ({ isOpen, onClose, team }) => {
  if (!isOpen || !team) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header" style={{borderBottom: 'none'}}>
          <span className={`standings-table__pos ${team.position <= 3 ? `standings-table__pos--${team.position}` : ''}`}>
            {team.position}
          </span>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="modal__body" style={{paddingTop: 0}}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>
              {team.team}
            </h2>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
              {team.points} Puntos
            </div>
          </div>

          <div className="detail-stats-grid">
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Partidos</span>
              <span className="detail-stats-box__value">{team.played}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Ganados</span>
              <span className="detail-stats-box__value detail-stats-box__value--success">{team.wins}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Perdidos</span>
              <span className="detail-stats-box__value" style={{color: '#ef4444'}}>{team.losses}</span>
            </div>
            
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Pts Favor</span>
              <span className="detail-stats-box__value">{team.pointsFor}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Pts Contra</span>
              <span className="detail-stats-box__value">{team.pointsAgainst}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Diferencia</span>
              <span className="detail-stats-box__value" style={{color: team.difference > 0 ? 'var(--color-success)' : '#ef4444'}}>
                {team.difference > 0 ? `+${team.difference}` : team.difference}
              </span>
            </div>
          </div>

          <div>
            <h3 className="form-label" style={{marginBottom: '16px'}}>Últimos Resultados</h3>
            <ul className="team-detail__players-list" style={{gridTemplateColumns: '1fr'}}>
              <li className="team-detail__player-item" style={{justifyContent: 'space-between', padding: '8px 12px'}}>
                <span>vs Eagles</span>
                <span style={{fontWeight: 700, color: 'var(--color-success)'}}>Ganado (75-70)</span>
              </li>
              <li className="team-detail__player-item" style={{justifyContent: 'space-between', padding: '8px 12px'}}>
                <span>vs Lions</span>
                <span style={{fontWeight: 700, color: 'var(--color-success)'}}>Ganado (82-68)</span>
              </li>
              <li className="team-detail__player-item" style={{justifyContent: 'space-between', padding: '8px 12px'}}>
                <span>vs Tigers</span>
                <span style={{fontWeight: 700, color: '#ef4444'}}>Perdido (65-72)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="modal__footer">
          <button type="button" className="btn btn-primary" onClick={onClose} style={{width: '100%'}}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default TeamStandingDetailModal
