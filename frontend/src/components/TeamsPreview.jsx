import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './TeamsPreview.css'

const getTeamColor = (teamName) => {
  const colors = {
    Hawks: '#e74c3c',
    Tigers: '#f39c12',
    Lions: '#27ae60',
    Eagles: '#3498db',
    Bears: '#2c3e50',
    Wolves: '#8e44ad',
    Sharks: '#16a085',
    Panthers: '#2c3e50',
  }
  return colors[teamName] || '#1E3A8A' // default color
}

const TeamsPreview = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/equipos`)
        if (!response.ok) throw new Error('Error al cargar los equipos')
        const data = await response.json()
        setTeams(data.slice(0, 6)) // Show first 6 teams
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  const handleOpenDetail = (teamId) => {
    navigate(`/equipos/${teamId}`)
  }

  return (
    <section className="teams section reveal" id="equipos">
      <div className="container">
        <h2 className="section-title">Equipos Participantes</h2>
        
        <div className="teams__grid">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>Cargando equipos...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444', gridColumn: '1 / -1' }}>{error}</div>
          ) : teams.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>No hay equipos registrados.</div>
          ) : (
            teams.map((team) => (
            <div className="teams__card" key={team._id} id={`team-${team._id}`} onClick={() => handleOpenDetail(team._id)} style={{ cursor: 'pointer' }}>
              <div className="teams__card-header" style={{ background: `linear-gradient(135deg, ${getTeamColor(team.nombre)}, ${getTeamColor(team.nombre)}dd)` }}>
                <div className="teams__badge">
                  {team.nombre.charAt(0)}
                </div>
                <span className="teams__record">{team.estadisticas.partidosGanados}-{team.estadisticas.partidosPerdidos}</span>
              </div>
              
              <div className="teams__card-body">
                <h3 className="teams__name">{team.nombre}</h3>
                <div className="teams__info">
                  <div className="teams__info-item">
                    <span className="teams__info-icon">👤</span>
                    <div>
                      <span className="teams__info-label">Entrenador</span>
                      <span className="teams__info-value">{team.entrenador || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="teams__info-item">
                    <span className="teams__info-icon">👥</span>
                    <div>
                      <span className="teams__info-label">Jugadores</span>
                      <span className="teams__info-value">{team.jugadores ? team.jugadores.length : 0} jugadores</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline teams__btn" id={`btn-team-${team._id}`} onClick={(e) => { e.stopPropagation(); handleOpenDetail(team._id); }}>
                  Ver Equipo
                </button>
              </div>
            </div>
          )))}
        </div>
        
        <div className="teams__action" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-8)' }}>
          <Link to="/equipos" className="btn btn-primary" id="btn-equipos-completo">Ver Todos los Equipos</Link>
        </div>
      </div>
    </section>
  )
}

export default TeamsPreview
