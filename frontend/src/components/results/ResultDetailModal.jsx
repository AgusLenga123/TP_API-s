const ResultDetailModal = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null

  let winnerLabel = null
  let isDraw = false
  if (result.status === 'Finalizado') {
    if (result.homeScore > result.awayScore) winnerLabel = `Ganador: ${result.homeTeam}`
    else if (result.awayScore > result.homeScore) winnerLabel = `Ganador: ${result.awayTeam}`
    else isDraw = true
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--large" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header" style={{borderBottom: 'none'}}>
          <span className={`results-table__badge results-table__badge--${result.status.toLowerCase()}`}>
            {result.status}
          </span>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="modal__body" style={{paddingTop: 0}}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', width: '100%' }}>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text)', flex: 1, textAlign: 'right' }}>
                {result.homeTeam}
              </div>
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--color-secondary)' }}>
                VS
              </div>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text)', flex: 1, textAlign: 'left' }}>
                {result.awayTeam}
              </div>
            </div>
            
            {result.status === 'Finalizado' ? (
              <>
                <div style={{fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: 'var(--space-2)'}}>
                  {result.homeScore} - {result.awayScore}
                </div>
                {winnerLabel && <div className="result-detail__winner">🏆 {winnerLabel}</div>}
                {isDraw && <div className="result-detail__draw">🤝 Empate</div>}
              </>
            ) : (
              <div style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginTop: 'var(--space-4)'}}>
                Pendiente de Disputa
              </div>
            )}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', 
            background: 'var(--color-bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <span style={{fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700}}>Fecha</span>
              <span style={{fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)'}}>📅 {new Date(result.date).toLocaleDateString('es-AR')}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <span style={{fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700}}>Hora</span>
              <span style={{fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)'}}>⏱️ {result.time || '18:00'}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <span style={{fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700}}>Lugar</span>
              <span style={{fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)'}}>📍 {result.location || 'Estadio Central'}</span>
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

export default ResultDetailModal
