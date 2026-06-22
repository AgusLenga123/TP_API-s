import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MatchesSearchBar from '../components/matches/MatchesSearchBar'
import MatchesTable from '../components/matches/MatchesTable'
import MatchCard from '../components/matches/MatchCard'
import MatchDetailModal from '../components/matches/MatchDetailModal'
import Navbar from '../components/Navbar'
import '../styles/matches.css'

// Mock data (8-10 matches)
const mockMatches = [
  { id: 1, homeTeam: "Hawks", awayTeam: "Tigers", date: "2026-06-22", time: "18:00", location: "Estadio Central", status: "Pendiente" },
  { id: 2, homeTeam: "Lions", awayTeam: "Eagles", date: "2026-06-23", time: "20:00", location: "Polideportivo Norte", status: "Pendiente" },
  { id: 3, homeTeam: "Tigers", awayTeam: "Lions", date: "2026-06-15", time: "19:30", location: "Estadio Central", status: "Finalizado" },
  { id: 4, homeTeam: "Eagles", awayTeam: "Hawks", date: "2026-06-18", time: "17:00", location: "Arena Sur", status: "Finalizado" },
  { id: 5, homeTeam: "Bears", awayTeam: "Wolves", date: "2026-06-25", time: "18:30", location: "Cancha Municipal", status: "Pendiente" },
  { id: 6, homeTeam: "Sharks", awayTeam: "Panthers", date: "2026-06-26", time: "19:00", location: "Centro Deportivo", status: "Pendiente" },
  { id: 7, homeTeam: "Wolves", awayTeam: "Sharks", date: "2026-06-10", time: "20:30", location: "Cancha Municipal", status: "Finalizado" },
  { id: 8, homeTeam: "Panthers", awayTeam: "Bears", date: "2026-06-12", time: "18:00", location: "Arena Sur", status: "Finalizado" },
  { id: 9, homeTeam: "Hawks", awayTeam: "Lions", date: "2026-06-30", time: "21:00", location: "Estadio Central", status: "Pendiente" },
]

const mockTeamsList = ["Hawks", "Tigers", "Lions", "Eagles", "Bears", "Wolves", "Sharks", "Panthers"]

const PublicMatchesPage = () => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [teamFilter, setTeamFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('')
  
  // Modal states
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  // Simulate initial data loading
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      // Sort matches by date ascending
      const sorted = [...mockMatches].sort((a, b) => new Date(a.date) - new Date(b.date))
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

  // Handlers
  const handleOpenDetail = (match) => {
    setSelectedMatch(match)
    setIsDetailOpen(true)
  }

  const content = (
    <div className="standings-page" style={{padding: 'var(--space-6) max(var(--space-6), calc((100% - 1200px) / 2))'}}>
      <div className="standings-header">
        <div>
          <h1 className="standings-header__title">Calendario de Partidos</h1>
          <p className="standings-header__subtitle">Conocé la programación y los resultados de la liga.</p>
        </div>
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
          />

          <div className="matches-cards">
            {filteredMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onView={handleOpenDetail} 
              />
            ))}
            {filteredMatches.length === 0 && (
               <div className="empty-state">
                 <span className="empty-state__icon">🏀</span>
                 <h3 className="empty-state__title">No se encontraron partidos</h3>
                 <p className="empty-state__desc">Intenta ajustar tu búsqueda.</p>
               </div>
            )}
          </div>
        </>
      )}

      {/* Detail Modal */}
      <MatchDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        match={selectedMatch} 
      />
    </div>
  )

  // Public Layout
  return (
    <div style={{minHeight: '100vh', background: 'var(--color-bg)'}}>
      <Navbar />
      <div style={{paddingTop: '60px'}}>
        {content}
      </div>
    </div>
  )
}

export default PublicMatchesPage
