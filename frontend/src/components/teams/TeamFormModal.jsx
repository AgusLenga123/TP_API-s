import { useState, useEffect } from 'react'

const TeamFormModal = ({ isOpen, onClose, onSave, team }) => {
  const [formData, setFormData] = useState({
    name: '',
    coach: '',
    status: 'Activo',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        coach: team.coach,
        status: team.status,
      })
    } else {
      setFormData({
        name: '',
        coach: '',
        status: 'Activo',
      })
    }
    setErrors({})
  }, [team, isOpen])

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!formData.coach.trim()) newErrors.coach = 'El entrenador es obligatorio'
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
      ...team, // keep id if editing
      ...formData,
      players: team ? team.players : 0 // mock default players
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{team ? 'Editar Equipo' : 'Nuevo Equipo'}</h2>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            <div className="form-group">
              <label className="form-label">Nombre del Equipo</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Lakers"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Entrenador</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nombre del entrenador"
                value={formData.coach}
                onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
              />
              {errors.coach && <span className="form-error">{errors.coach}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
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

export default TeamFormModal
