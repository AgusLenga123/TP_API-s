import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/teams/SearchBar'
import TeamDetailModal from '../components/teams/TeamDetailModal'
import Navbar from '../components/Navbar'
import '../styles/teams.css'
import '../components/TeamsPreview.css'

const mockTeams = [
  { id: 1, name: 'Hawks', coach: 'John Smith', players: 12, color: '#e74c3c', record: '8-2', status: 'Activo' },
  { id: 2, name: 'Tigers', coach: 'Maria García', players: 11, color: '#f39c12', record: '7-3', status: 'Activo' },
  { id: 3, name: 'Lions', coach: 'Carlos López', players: 13, color: '#27ae60', record: '6-4', status: 'Activo' },
  { id: 4, name: 'Eagles', coach: 'Ana Martínez', players: 12, color: '#3498db', record: '5-5', status: 'Activo' },
  { id: 5, name: 'Wolves', coach: 'Roberto Díaz', players: 11, color: '#8e44ad', record: '4-6', status: 'Activo' },
  { id: 6, name: 'Bears', coach: 'Laura Sánchez', players: 12, color: '#2c3e50', record: '3-7', status: 'Activo' },
]

const PublicTeamsPage = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('Todos')
  
  // Modal states
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      setTeams(mockTeams)
      setLoading(false)
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
    setSelectedTeam(team)
    setIsDetailOpen(true)
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

      <TeamDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        team={selectedTeam} 
      />
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
