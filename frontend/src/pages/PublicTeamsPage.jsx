import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/teams/SearchBar'
import Navbar from '../components/Navbar'
import '../styles/teams.css'
import '../components/TeamsPreview.css'

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

const PublicTeamsPage = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('Todos')
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/equipos`)
        if (!response.ok) throw new Error('Error al cargar los equipos')
        const data = await response.json()
        
        const mappedData = data.map(team => ({
          id: team._id,
          name: team.nombre,
          coach: team.entrenador || 'N/A',
          players: team.jugadores ? team.jugadores.length : 0,
          color: getTeamColor(team.nombre),
          record: `${team.estadisticas.partidosGanados}-${team.estadisticas.partidosPerdidos}`,
          status: 'Activo' // Or map from backend if available
        }))
        setTeams(mappedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          team.coach.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'Todos' || team.status === filter
    return matchesSearch && matchesFilter
  })

  const handleOpenDetail = (team) => {
    navigate(`/equipos/${team.id}`)
  }

  const content = (
    <div className="standings-page" style={{padding: 'var(--space-6) max(var(--space-6), calc((100% - 1200px) / 2))'}}>
      <div className="standings-header">
        <div>
          <h1 className="standings-header__title">Equipos Participantes</h1>
          <p className="standings-header__subtitle">Conocé a todos los equipos que forman parte de la liga.</p>
        </div>
      </div>

      {loading ? (
        <div className="teams-loading">
          <div className="teams-stats">
            <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
            <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
            <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
          </div>
          <div className="skeleton skeleton-row" style={{height: '60px', marginBottom: '24px'}}></div>
          <div className="skeleton skeleton-row" style={{height: '400px'}}></div>
        </div>
      ) : error ? (
        <div className="empty-state">
          <span className="empty-state__icon">⚠️</span>
          <h3 className="empty-state__title">No se pudieron cargar los equipos</h3>
          <p className="empty-state__desc">{error}</p>
        </div>
      ) : (
        <>
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
          />

          <div className="teams__grid" style={{ marginTop: 'var(--space-6)' }}>
            {filteredTeams.map((team) => (
              <div className="teams__card" key={team.id} id={`team-${team.id}`} onClick={() => handleOpenDetail(team)} style={{ cursor: 'pointer' }}>
                <div className="teams__card-header" style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}dd)` }}>
                  <div className="teams__badge">
                    {team.name.charAt(0)}
                  </div>
                  <span className="teams__record">{team.record}</span>
                </div>
                
                <div className="teams__card-body">
                  <h3 className="teams__name">{team.name}</h3>
                  <div className="teams__info">
                    <div className="teams__info-item">
                      <span className="teams__info-icon">👤</span>
                      <div>
                        <span className="teams__info-label">Entrenador</span>
                        <span className="teams__info-value">{team.coach}</span>
                      </div>
                    </div>
                    <div className="teams__info-item">
                      <span className="teams__info-icon">👥</span>
                      <div>
                        <span className="teams__info-label">Jugadores</span>
                        <span className="teams__info-value">{team.players} jugadores</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-outline teams__btn" id={`btn-team-${team.id}`} onClick={(e) => { e.stopPropagation(); handleOpenDetail(team); }}>
                    Ver Equipo
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTeams.length === 0 && (
             <div className="empty-state" style={{ marginTop: 'var(--space-6)' }}>
               <span className="empty-state__icon">🏀</span>
               <h3 className="empty-state__title">No se encontraron equipos</h3>
               <p className="empty-state__desc">Intenta ajustar tu búsqueda.</p>
             </div>
          )}
        </>
      )}

    </div>
  )

  return (
    <div style={{minHeight: '100vh', background: 'var(--color-bg)'}}>
      <Navbar />
      <div style={{paddingTop: '60px'}}>
        {content}
      </div>
    </div>
  )
}

export default PublicTeamsPage
