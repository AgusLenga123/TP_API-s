import { useState, useEffect } from 'react'

const ResultFormModal = ({ isOpen, onClose, onSave, result }) => {
  const [formData, setFormData] = useState({
    homeScore: '',
    awayScore: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (result && result.status === 'Finalizado') {
      setFormData({
        homeScore: result.homeScore.toString(),
        awayScore: result.awayScore.toString(),
      })
    } else {
      setFormData({
        homeScore: '',
        awayScore: '',
      })
    }
    setErrors({})
  }, [result, isOpen])

  if (!isOpen || !result) return null

  const validate = () => {
    const newErrors = {}
    if (formData.homeScore === '') {
      newErrors.homeScore = 'Obligatorio'
    } else if (isNaN(formData.homeScore) || Number(formData.homeScore) < 0) {
      newErrors.homeScore = 'Inválido'
    }
    
    if (formData.awayScore === '') {
      newErrors.awayScore = 'Obligatorio'
    } else if (isNaN(formData.awayScore) || Number(formData.awayScore) < 0) {
      newErrors.awayScore = 'Inválido'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSave({
      ...result,
      homeScore: Number(formData.homeScore),
      awayScore: Number(formData.awayScore),
      status: 'Finalizado' // Auto-update status when saving result
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Cargar Resultado</h2>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              <div>📅 {new Date(result.date).toLocaleDateString('es-AR')}</div>
              <div>📍 {result.location || 'Estadio Central'}</div>
            </div>

            <div className="score-inputs">
              <div className="score-input-group">
                <label className="score-input-label">{result.homeTeam}</label>
                <input
                  type="number"
                  min="0"
                  className="score-input"
                  value={formData.homeScore}
                  onChange={(e) => setFormData({ ...formData, homeScore: e.target.value })}
                  placeholder="0"
                />
                {errors.homeScore && <span className="form-error">{errors.homeScore}</span>}
              </div>
              
              <div className="score-vs">VS</div>
              
              <div className="score-input-group">
                <label className="score-input-label">{result.awayTeam}</label>
                <input
                  type="number"
                  min="0"
                  className="score-input"
                  value={formData.awayScore}
                  onChange={(e) => setFormData({ ...formData, awayScore: e.target.value })}
                  placeholder="0"
                />
                {errors.awayScore && <span className="form-error">{errors.awayScore}</span>}
              </div>
            </div>

          </div>
          <div className="modal__footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar Resultado</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResultFormModal
