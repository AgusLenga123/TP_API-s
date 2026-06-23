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

// API integrated, no mock data needed

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

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/equipos`)
        if (!res.ok) throw new Error('Error al cargar equipos')
        const data = await res.json()
        setTeams(data.map(t => ({
          id: t._id,
          name: t.nombre,
          coach: t.entrenador || 'N/A',
          players: t.jugadores ? t.jugadores.length : 0,
          status: 'Activo'
        })))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
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

  const handleSaveTeam = async (teamData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      const body = JSON.stringify({ nombre: teamData.name, entrenador: teamData.coach })
      
      if (selectedTeam) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/equipos/${teamData.id}`, {
          method: 'PUT', headers, body
        })
        if (!res.ok) throw new Error('Error al actualizar el equipo')
        const updated = await res.json()
        setTeams(teams.map(t => t.id === updated._id ? { ...t, name: updated.nombre, coach: updated.entrenador || 'N/A' } : t))
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/equipos`, {
          method: 'POST', headers, body
        })
        if (!res.ok) throw new Error('Error al crear el equipo')
        const created = await res.json()
        setTeams([...teams, { id: created._id, name: created.nombre, coach: created.entrenador || 'N/A', players: 0, status: 'Activo' }])
      }
      setIsFormOpen(false)
      setSelectedTeam(null)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleOpenDetail = (team) => {
    setSelectedTeam(team)
    setIsDetailOpen(true)
  }

  const handleOpenDelete = (team) => {
    setSelectedTeam(team)
    setIsDeleteOpen(true)
  }

  const handleDeleteTeam = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/equipos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) throw new Error('Error al eliminar el equipo')
      setTeams(teams.filter(t => t.id !== id))
      setIsDeleteOpen(false)
      setSelectedTeam(null)
    } catch (err) {
      alert(err.message)
    }
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
