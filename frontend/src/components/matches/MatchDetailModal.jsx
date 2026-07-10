const MatchDetailModal = ({ isOpen, onClose, match }) => {
  if (!isOpen || !match) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--large" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header" style={{borderBottom: 'none'}}>
          <span className={`matches-table__badge matches-table__badge--${match.status.toLowerCase()}`}>
            {match.status}
          </span>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="modal__body" style={{paddingTop: 0}}>
          <div className="match-detail__header-content">
            <div className="match-detail__versus-container">
              <div className="match-detail__team">{match.homeTeam}</div>
              <div className="match-detail__vs-badge">VS</div>
              <div className="match-detail__team">{match.awayTeam}</div>
            </div>
            {match.status === 'Finalizado' && match.resultado && (
              <div style={{fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: 'var(--space-2)'}}>
                {match.resultado.puntosLocal} - {match.resultado.puntosVisitante}
              </div>
            )}
          </div>

          <h3 className="form-label" style={{marginBottom: '16px'}}>Detalles del Encuentro</h3>
          <div className="match-detail__info-grid">
            <div className="match-detail__info-item">
              <span className="match-detail__info-label">Fecha</span>
              <span className="match-detail__info-value">📅 {new Date(match.date).toLocaleDateString('es-AR')}</span>
            </div>
            <div className="match-detail__info-item">
              <span className="match-detail__info-label">Hora</span>
              <span className="match-detail__info-value">⏱️ {match.time}</span>
            </div>
            <div className="match-detail__info-item" style={{gridColumn: 'span 2'}}>
              <span className="match-detail__info-label">Lugar</span>
              <span className="match-detail__info-value">📍 {match.location}</span>
            </div>
          </div>

        </div>
        
        <div className="modal__footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default MatchDetailModal
