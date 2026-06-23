import { useState, useEffect } from 'react'

const PlayerFormModal = ({ isOpen, onClose, onSave, player, teamsList }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    category: '',
    teamId: '',
    status: 'Activo',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (player) {
      setFormData({
        firstName: player.firstName,
        lastName: player.lastName,
        category: player.category,
        teamId: player.teamId,
        status: player.status,
      })
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        category: '',
        teamId: '',
        status: 'Activo',
      })
    }
    setErrors({})
  }, [player, isOpen])

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio'
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio'
    if (!formData.category) newErrors.category = 'La categoría es obligatoria'
    if (!formData.teamId) newErrors.teamId = 'El equipo es obligatorio'
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
      ...player, // keep id if editing
      ...formData
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{player ? 'Editar Jugador' : 'Nuevo Jugador'}</h2>
          <button className="modal__close" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Lucas"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              {errors.firstName && <span className="form-error">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Pérez"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              {errors.lastName && <span className="form-error">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Seleccionar categoría...</option>
                <option value="Sub 15">Sub 15</option>
                <option value="Sub 17">Sub 17</option>
                <option value="Sub 19">Sub 19</option>
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Equipo</label>
              <select
                className="form-select"
                value={formData.teamId}
                onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
              >
                <option value="">Seleccionar equipo...</option>
                {teamsList.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              {errors.teamId && <span className="form-error">{errors.teamId}</span>}
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

export default PlayerFormModal
