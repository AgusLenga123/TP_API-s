const DeletePlayerModal = ({ isOpen, onClose, onConfirm, player }) => {
  if (!isOpen || !player) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{maxWidth: '400px', textAlign: 'center'}}>
        <div className="modal__body" style={{paddingTop: '32px'}}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            fontSize: '32px'
          }}>
            ⚠️
          </div>
          <h2 className="modal__title" style={{marginBottom: '8px'}}>Eliminar Jugador</h2>
          <p style={{color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.5'}}>
            ¿Seguro que deseas eliminar al jugador <strong>{player.firstName} {player.lastName}</strong>?<br/>
            Esta acción no se puede deshacer.
          </p>
        </div>
        <div className="modal__footer" style={{justifyContent: 'center', background: 'transparent', borderTop: 'none', paddingBottom: '32px'}}>
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button type="button" className="btn btn-primary" style={{background: '#ef4444', borderColor: '#ef4444'}} onClick={() => onConfirm(player.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePlayerModal
