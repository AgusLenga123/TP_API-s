import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import MatchesStatsSummary from '../components/matches/MatchesStatsSummary'
import MatchesSearchBar from '../components/matches/MatchesSearchBar'
import MatchesTable from '../components/matches/MatchesTable'
import MatchCard from '../components/matches/MatchCard'
import MatchFormModal from '../components/matches/MatchFormModal'
import MatchDetailModal from '../components/matches/MatchDetailModal'
import DeleteMatchModal from '../components/matches/DeleteMatchModal'
import '../styles/dashboard.css'
import '../styles/matches.css'

// Initial mock data
const initialMatches = [
  { id: 1, homeTeam: "Hawks", awayTeam: "Tigers", date: "2026-06-22", time: "18:00", location: "Estadio Central", status: "Pendiente" },
  { id: 2, homeTeam: "Lions", awayTeam: "Eagles", date: "2026-06-23", time: "20:00", location: "Polideportivo Norte", status: "Pendiente" },
  { id: 3, homeTeam: "Tigers", awayTeam: "Lions", date: "2026-06-15", time: "19:30", location: "Estadio Central", status: "Finalizado" },
  { id: 4, homeTeam: "Eagles", awayTeam: "Hawks", date: "2026-06-18", time: "17:00", location: "Arena Sur", status: "Finalizado" },
]

const mockTeamsList = ["Hawks", "Tigers", "Lions", "Eagles"]

const MatchesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [teamFilter, setTeamFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('')
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  // Simulate initial data loading
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      // Sort matches by date ascending
      const sorted = [...initialMatches].sort((a, b) => new Date(a.date) - new Date(b.date))
      setMatches(sorted)
      setLoading(false)
    }
    fetchMatches()
  }, [])

  // Derived state: Filtered matches
  const filteredMatches = matches.filter((match) => {
    const searchString = `${match.homeTeam} ${match.awayTeam} ${match.location}`.toLowerCase()
    const matchesSearch = searchString.includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || match.status === statusFilter
    const matchesTeam = teamFilter === 'Todos' || match.homeTeam === teamFilter || match.awayTeam === teamFilter
    const matchesDate = !dateFilter || match.date === dateFilter
    
    return matchesSearch && matchesStatus && matchesTeam && matchesDate
  })

  // Derived state: Stats
  const pendingMatches = matches.filter(m => m.status === 'Pendiente').length
  const finishedMatches = matches.filter(m => m.status === 'Finalizado').length
  
  const upcomingMatches = matches.filter(m => m.status === 'Pendiente').sort((a, b) => new Date(a.date) - new Date(b.date))
  const nextMatchDate = upcomingMatches.length > 0 ? new Date(upcomingMatches[0].date).toLocaleDateString('es-AR') : null

  const stats = {
    totalMatches: matches.length,
    pendingMatches,
    finishedMatches,
    nextMatchDate
  }

  // Handlers
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)
  const closeSidebar = () => setSidebarOpen(false)

  const handleOpenForm = (match = null) => {
    setSelectedMatch(match)
    setIsFormOpen(true)
  }

  const handleSaveMatch = (matchData) => {
    let updatedMatches
    if (selectedMatch) {
      updatedMatches = matches.map(m => m.id === matchData.id ? matchData : m)
    } else {
      const newMatch = { ...matchData, id: Date.now() }
      updatedMatches = [...matches, newMatch]
    }
    // Resort by date
    setMatches(updatedMatches.sort((a, b) => new Date(a.date) - new Date(b.date)))
    setIsFormOpen(false)
    setSelectedMatch(null)
  }

  const handleOpenDetail = (match) => {
    setSelectedMatch(match)
    setIsDetailOpen(true)
  }

  const handleOpenDelete = (match) => {
    setSelectedMatch(match)
    setIsDeleteOpen(true)
  }

  const handleDeleteMatch = (id) => {
    setMatches(matches.filter(m => m.id !== id))
    setIsDeleteOpen(false)
    setSelectedMatch(null)
  }

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="dashboard__main">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="dashboard__content matches-page">
          <div className="matches-header">
            <div>
              <h1 className="matches-header__title">Gestión de Partidos</h1>
              <p className="matches-header__subtitle">Administrá el calendario y programación de encuentros.</p>
            </div>
            <button className="btn btn-primary" onClick={() => handleOpenForm()}>
              + Nuevo Partido
            </button>
          </div>

          {loading ? (
            <div className="teams-loading">
              <div className="matches-stats">
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
              </div>
              <div className="skeleton skeleton-row" style={{height: '60px', marginBottom: '24px'}}></div>
              <div className="skeleton skeleton-row" style={{height: '400px'}}></div>
            </div>
          ) : (
            <>
              <MatchesStatsSummary stats={stats} />
              
              <MatchesSearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                teamFilter={teamFilter}
                onTeamFilterChange={setTeamFilter}
                dateFilter={dateFilter}
                onDateFilterChange={setDateFilter}
                teamsList={mockTeamsList}
              />

              <MatchesTable 
                matches={filteredMatches} 
                onView={handleOpenDetail} 
                onEdit={handleOpenForm} 
                onDelete={handleOpenDelete} 
              />

              <div className="matches-cards">
                {filteredMatches.map(match => (
                  <MatchCard 
                    key={match.id} 
                    match={match} 
                    onView={handleOpenDetail} 
                    onEdit={handleOpenForm} 
                    onDelete={handleOpenDelete}
                  />
                ))}
                {filteredMatches.length === 0 && (
                   <div className="empty-state">
                     <span className="empty-state__icon">🏀</span>
                     <h3 className="empty-state__title">No hay partidos programados</h3>
                     <p className="empty-state__desc">Intenta ajustar tu búsqueda o crea un nuevo partido.</p>
                   </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <MatchFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveMatch} 
        match={selectedMatch}
        teamsList={mockTeamsList}
      />
      
      <MatchDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        match={selectedMatch} 
      />
      
      <DeleteMatchModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDeleteMatch} 
        match={selectedMatch} 
      />
    </div>
  )
}

export default MatchesPage
