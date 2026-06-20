import { useState, useEffect } from 'react'

const MatchFormModal = ({ isOpen, onClose, onSave, match, teamsList }) => {
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    location: '',
    status: 'Pendiente',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (match) {
      setFormData({
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        date: match.date,
        time: match.time,
        location: match.location,
        status: match.status,
      })
    } else {
      setFormData({
        homeTeam: '',
        awayTeam: '',
        date: '',
        time: '',
        location: '',
        status: 'Pendiente',
      })
    }
    setErrors({})
  }, [match, isOpen])

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!formData.homeTeam) newErrors.homeTeam = 'El equipo local es obligatorio'
    if (!formData.awayTeam) newErrors.awayTeam = 'El equipo visitante es obligatorio'
    if (formData.homeTeam && formData.awayTeam && formData.homeTeam === formData.awayTeam) {
      newErrors.awayTeam = 'El equipo visitante no puede ser el mismo que el local'
    }
    if (!formData.date) newErrors.date = 'La fecha es obligatoria'
    if (!formData.time) newErrors.time = 'La hora es obligatoria'
    if (!formData.location.trim()) newErrors.location = 'El lugar es obligatorio'
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
      ...match, // keep id if editing
      ...formData
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{match ? 'Editar Partido' : 'Nuevo Partido'}</h2>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Equipo Local</label>
                <select
                  className="form-select"
                  value={formData.homeTeam}
                  onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                >
                  <option value="">Seleccionar local...</option>
                  {teamsList.map((team, idx) => (
                    <option key={idx} value={team}>{team}</option>
                  ))}
                </select>
                {errors.homeTeam && <span className="form-error">{errors.homeTeam}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Equipo Visitante</label>
                <select
                  className="form-select"
                  value={formData.awayTeam}
                  onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                >
                  <option value="">Seleccionar visitante...</option>
                  {teamsList.map((team, idx) => (
                    <option key={idx} value={team}>{team}</option>
                  ))}
                </select>
                {errors.awayTeam && <span className="form-error">{errors.awayTeam}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                {errors.date && <span className="form-error">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
                {errors.time && <span className="form-error">{errors.time}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Lugar</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Estadio Central"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              {errors.location && <span className="form-error">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
          </div>
          <div className="modal__footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MatchFormModal
