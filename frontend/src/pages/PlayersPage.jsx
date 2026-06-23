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

// API integrated, no mock data needed

const PlayersPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [players, setPlayers] = useState([])
  const [teamsList, setTeamsList] = useState([])
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        const [jugadoresRes, equiposRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/jugadores`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/equipos`, { headers })
        ])
        if (!jugadoresRes.ok || !equiposRes.ok) throw new Error('Error al cargar datos')
        
        const jugadores = await jugadoresRes.json()
        const equipos = await equiposRes.json()

        setTeamsList(equipos.map(e => ({ id: e._id, name: e.nombre })))
        
        setPlayers(jugadores.map(p => ({
          id: p._id,
          firstName: p.nombre,
          lastName: p.apellido,
          category: p.categoria,
          team: p.equipo?.nombre || 'Sin Equipo',
          teamId: p.equipo?._id || '',
          status: 'Activo'
        })))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
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

  const handleSavePlayer = async (playerData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      const body = JSON.stringify({ 
        nombre: playerData.firstName, 
        apellido: playerData.lastName,
        categoria: playerData.category,
        equipo: playerData.teamId
      })
      
      if (selectedPlayer) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/jugadores/${playerData.id}`, {
          method: 'PUT', headers, body
        })
        if (!res.ok) throw new Error('Error al actualizar')
        const updated = await res.json()
        setPlayers(players.map(p => p.id === updated._id ? { 
          ...p, 
          firstName: updated.nombre, 
          lastName: updated.apellido, 
          category: updated.categoria,
          team: updated.equipo?.nombre || 'Sin Equipo',
          teamId: updated.equipo?._id || ''
        } : p))
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/jugadores`, {
          method: 'POST', headers, body
        })
        if (!res.ok) throw new Error('Error al crear')
        const created = await res.json()
        setPlayers([...players, { 
          id: created._id, 
          firstName: created.nombre, 
          lastName: created.apellido, 
          category: created.categoria,
          team: created.equipo?.nombre || teamsList.find(t => t.id === created.equipo)?.name || 'Sin Equipo',
          teamId: created.equipo?._id || created.equipo || '',
          status: 'Activo' 
        }])
      }
      setIsFormOpen(false)
      setSelectedPlayer(null)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleOpenDetail = (player) => {
    setSelectedPlayer(player)
    setIsDetailOpen(true)
  }

  const handleOpenDelete = (player) => {
    setSelectedPlayer(player)
    setIsDeleteOpen(true)
  }

  const handleDeletePlayer = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jugadores/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) throw new Error('Error al eliminar')
      setPlayers(players.filter(p => p.id !== id))
      setIsDeleteOpen(false)
      setSelectedPlayer(null)
    } catch (err) {
      alert(err.message)
    }
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
                teamsList={teamsList.map(t => t.name)}
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
        teamsList={teamsList}
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
