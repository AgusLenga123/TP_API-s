import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import PlayersStatsSummary from '../components/players/PlayersStatsSummary'
import PlayersSearchBar from '../components/players/PlayersSearchBar'
import PlayersTable from '../components/players/PlayersTable'
import PlayerCard from '../components/players/PlayerCard'
import PlayerFormModal from '../components/players/PlayerFormModal'
import PlayerDetailModal from '../components/players/PlayerDetailModal'
import DeletePlayerModal from '../components/players/DeletePlayerModal'
import '../styles/dashboard.css'
import '../styles/players.css'

// Initial mock data
const initialPlayers = [
  { id: 1, firstName: "Lucas", lastName: "Pérez", category: "Sub 17", team: "Hawks", status: "Activo" },
  { id: 2, firstName: "Martín", lastName: "Gómez", category: "Sub 19", team: "Tigers", status: "Activo" },
  { id: 3, firstName: "Juan", lastName: "Silva", category: "Sub 15", team: "Lions", status: "Activo" },
  { id: 4, firstName: "Mateo", lastName: "Rodríguez", category: "Sub 17", team: "Eagles", status: "Inactivo" },
  { id: 5, firstName: "Tomás", lastName: "Martínez", category: "Sub 19", team: "Hawks", status: "Activo" },
  { id: 6, firstName: "Nicolás", lastName: "Fernández", category: "Sub 15", team: "Tigers", status: "Activo" },
]

const mockTeamsList = ["Hawks", "Tigers", "Lions", "Eagles"]

const PlayersPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Todos')
  const [teamFilter, setTeamFilter] = useState('Todos')
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  // Simulate initial data loading
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      setPlayers(initialPlayers)
      setLoading(false)
    }
    fetchPlayers()
  }, [])

  // Derived state: Filtered players
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = 
      player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      player.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'Todos' || player.category === categoryFilter
    const matchesTeam = teamFilter === 'Todos' || player.team === teamFilter
    
    return matchesSearch && matchesCategory && matchesTeam
  })

  // Derived state: Stats
  const activeCategories = new Set(players.filter(p => p.status === 'Activo').map(p => p.category)).size
  const teamsWithPlayers = new Set(players.map(p => p.team)).size

  const stats = {
    totalPlayers: players.length,
    activeCategories,
    teamsWithPlayers
  }

  // Handlers
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)
  const closeSidebar = () => setSidebarOpen(false)

  const handleOpenForm = (player = null) => {
    setSelectedPlayer(player)
    setIsFormOpen(true)
  }

  const handleSavePlayer = (playerData) => {
    if (selectedPlayer) {
      // Edit existing
      setPlayers(players.map(p => p.id === playerData.id ? playerData : p))
    } else {
      // Create new
      const newPlayer = { ...playerData, id: Date.now() }
      setPlayers([...players, newPlayer])
    }
    setIsFormOpen(false)
    setSelectedPlayer(null)
  }

  const handleOpenDetail = (player) => {
    setSelectedPlayer(player)
    setIsDetailOpen(true)
  }

  const handleOpenDelete = (player) => {
    setSelectedPlayer(player)
    setIsDeleteOpen(true)
  }

  const handleDeletePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id))
    setIsDeleteOpen(false)
    setSelectedPlayer(null)
  }

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="dashboard__main">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="dashboard__content players-page">
          <div className="players-header">
            <div>
              <h1 className="players-header__title">Gestión de Jugadores</h1>
              <p className="players-header__subtitle">Administrá los jugadores de todos los equipos.</p>
            </div>
            <button className="btn btn-primary" onClick={() => handleOpenForm()}>
              + Nuevo Jugador
            </button>
          </div>

          {loading ? (
            <div className="teams-loading">
              <div className="players-stats">
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
              </div>
              <div className="skeleton skeleton-row" style={{height: '60px', marginBottom: '24px'}}></div>
              <div className="skeleton skeleton-row" style={{height: '400px'}}></div>
            </div>
          ) : (
            <>
              <PlayersStatsSummary stats={stats} />
              
              <PlayersSearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
                teamFilter={teamFilter}
                onTeamFilterChange={setTeamFilter}
                teamsList={mockTeamsList}
              />

              <PlayersTable 
                players={filteredPlayers} 
                onView={handleOpenDetail} 
                onEdit={handleOpenForm} 
                onDelete={handleOpenDelete} 
              />

              <div className="players-cards">
                {filteredPlayers.map(player => (
                  <PlayerCard 
                    key={player.id} 
                    player={player} 
                    onView={handleOpenDetail} 
                    onEdit={handleOpenForm} 
                    onDelete={handleOpenDelete}
                  />
                ))}
                {filteredPlayers.length === 0 && (
                   <div className="empty-state">
                     <span className="empty-state__icon">🏀</span>
                     <h3 className="empty-state__title">No hay jugadores registrados</h3>
                     <p className="empty-state__desc">Intenta ajustar tu búsqueda o filtros.</p>
                   </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <PlayerFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSavePlayer} 
        player={selectedPlayer}
        teamsList={mockTeamsList}
      />
      
      <PlayerDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        player={selectedPlayer} 
      />
      
      <DeletePlayerModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDeletePlayer} 
        player={selectedPlayer} 
      />
    </div>
  )
}

export default PlayersPage
