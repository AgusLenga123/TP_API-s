import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MatchesSearchBar from '../components/matches/MatchesSearchBar'
import MatchesTable from '../components/matches/MatchesTable'
import MatchCard from '../components/matches/MatchCard'
import MatchDetailModal from '../components/matches/MatchDetailModal'
import Navbar from '../components/Navbar'
import '../styles/matches.css'

const PublicMatchesPage = () => {
  const [matches, setMatches] = useState([])
  const [teamsList, setTeamsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [teamFilter, setTeamFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('')
  
  // Modal states
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  
  // Pagination state
  const [visibleCount, setVisibleCount] = useState(10)

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(10)
  }, [searchTerm, statusFilter, teamFilter, dateFilter])

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/partidos`)
        if (!response.ok) throw new Error('Error al cargar los partidos')
        const data = await response.json()
        
        const mappedData = data.map(m => ({
          id: m._id,
          homeTeam: m.equipoLocal.nombre,
          awayTeam: m.equipoVisitante.nombre,
          date: m.fecha.split('T')[0], // YYYY-MM-DD
          time: m.horario,
          location: m.lugar,
          status: m.finalizado ? 'Finalizado' : 'Pendiente',
          resultado: m.resultado
        }))
        
        mappedData.sort((a, b) => new Date(a.date) - new Date(b.date))
        setMatches(mappedData)
        
        // Extract unique teams for the filter dropdown
        const teams = new Set()
        mappedData.forEach(m => {
          teams.add(m.homeTeam)
          teams.add(m.awayTeam)
        })
        setTeamsList(Array.from(teams).sort())
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
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

  const visibleMatches = filteredMatches.slice(0, visibleCount)

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
      ) : error ? (
        <div className="empty-state">
          <span className="empty-state__icon">⚠️</span>
          <h3 className="empty-state__title">No se pudieron cargar los partidos</h3>
          <p className="empty-state__desc">{error}</p>
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
            teamsList={teamsList}
          />

          <MatchesTable 
            matches={visibleMatches} 
            onView={handleOpenDetail} 
          />

          <div className="matches-cards">
            {visibleMatches.map(match => (
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

          {visibleCount < filteredMatches.length && (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 'var(--space-6)'}}>
              <button 
                className="btn btn-outline" 
                onClick={() => setVisibleCount(prev => prev + 10)}
              >
                Cargar más partidos
              </button>
            </div>
          )}
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
