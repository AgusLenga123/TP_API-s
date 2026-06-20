import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import StatsSummary from '../components/teams/StatsSummary'
import SearchBar from '../components/teams/SearchBar'
import TeamsTable from '../components/teams/TeamsTable'
import TeamCard from '../components/teams/TeamCard'
import TeamFormModal from '../components/teams/TeamFormModal'
import TeamDetailModal from '../components/teams/TeamDetailModal'
import DeleteTeamModal from '../components/teams/DeleteTeamModal'
import '../styles/dashboard.css'
import '../styles/teams.css'

// Initial mock data
const initialTeams = [
  { id: 1, name: "Hawks", coach: "John Smith", players: 12, status: "Activo" },
  { id: 2, name: "Tigers", coach: "Michael Brown", players: 11, status: "Activo" },
  { id: 3, name: "Lions", coach: "David Wilson", players: 13, status: "Activo" },
  { id: 4, name: "Eagles", coach: "Robert Davis", players: 12, status: "Inactivo" },
]

const TeamsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('Todos') // Todos, Activo, Inactivo
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)

  // Simulate initial data loading
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      setTeams(initialTeams)
      setLoading(false)
    }
    fetchTeams()
  }, [])

  // Derived state: Filtered teams
  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          team.coach.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'Todos' || team.status === filter
    return matchesSearch && matchesFilter
  })

  // Derived state: Stats
  const stats = {
    totalTeams: teams.length,
    totalPlayers: teams.reduce((acc, team) => acc + team.players, 0),
    totalCoaches: new Set(teams.map(t => t.coach)).size
  }

  // Handlers
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)
  const closeSidebar = () => setSidebarOpen(false)

  const handleOpenForm = (team = null) => {
    setSelectedTeam(team)
    setIsFormOpen(true)
  }

  const handleSaveTeam = (teamData) => {
    if (selectedTeam) {
      // Edit existing
      setTeams(teams.map(t => t.id === teamData.id ? teamData : t))
    } else {
      // Create new
      const newTeam = { ...teamData, id: Date.now() }
      setTeams([...teams, newTeam])
    }
    setIsFormOpen(false)
    setSelectedTeam(null)
  }

  const handleOpenDetail = (team) => {
    setSelectedTeam(team)
    setIsDetailOpen(true)
  }

  const handleOpenDelete = (team) => {
    setSelectedTeam(team)
    setIsDeleteOpen(true)
  }

  const handleDeleteTeam = (id) => {
    setTeams(teams.filter(t => t.id !== id))
    setIsDeleteOpen(false)
    setSelectedTeam(null)
  }

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="dashboard__main">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="dashboard__content teams-page">
          <div className="teams-header">
            <div>
              <h1 className="teams-header__title">Gestión de Equipos</h1>
              <p className="teams-header__subtitle">Administrá los equipos participantes de la liga.</p>
            </div>
            <button className="btn btn-primary" onClick={() => handleOpenForm()}>
              + Nuevo Equipo
            </button>
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
              <StatsSummary stats={stats} />
              
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
                filter={filter}
                onFilterChange={setFilter}
              />

              <TeamsTable 
                teams={filteredTeams} 
                onView={handleOpenDetail} 
                onEdit={handleOpenForm} 
                onDelete={handleOpenDelete} 
              />

              <div className="teams-cards">
                {filteredTeams.map(team => (
                  <TeamCard 
                    key={team.id} 
                    team={team} 
                    onView={handleOpenDetail} 
                    onEdit={handleOpenForm} 
                    onDelete={handleOpenDelete}
                  />
                ))}
                {filteredTeams.length === 0 && (
                   <div className="empty-state">
                     <span className="empty-state__icon">🏀</span>
                     <h3 className="empty-state__title">No se encontraron equipos</h3>
                     <p className="empty-state__desc">Intenta ajustar tu búsqueda o filtros.</p>
                   </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <TeamFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveTeam} 
        team={selectedTeam} 
      />
      
      <TeamDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        team={selectedTeam} 
      />
      
      <DeleteTeamModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDeleteTeam} 
        team={selectedTeam} 
      />
    </div>
  )
}

export default TeamsPage
