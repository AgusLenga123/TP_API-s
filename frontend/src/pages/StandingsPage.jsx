import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StandingsSummary from '../components/standings/StandingsSummary'
import TopTeams from '../components/standings/TopTeams'
import StandingsSearchBar from '../components/standings/StandingsSearchBar'
import StandingsTable from '../components/standings/StandingsTable'
import StandingsCard from '../components/standings/StandingsCard'
import LeagueStats from '../components/standings/LeagueStats'
import Navbar from '../components/Navbar'
import '../styles/dashboard.css'
import '../styles/standings.css'



const StandingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clasificacion`)
        if (!response.ok) throw new Error('Error al cargar la clasificación')
        const data = await response.json()
        
        // Map API keys to the keys expected by the components
        const mappedData = data.map((t) => ({
          id: t.equipoId,
          position: t.posicion,
          team: t.nombre,
          points: t.puntos,
          played: t.partidosJugados,
          wins: t.partidosGanados,
          draws: t.partidosEmpatados,
          losses: t.partidosPerdidos,
          pointsFor: t.tantosAFavor,
          pointsAgainst: t.tantosEnContra,
          difference: t.diferenciaDeTantos
        }))

        // Ensure correct sorting just in case
        mappedData.sort((a, b) => b.points - a.points || b.difference - a.difference)
        mappedData.forEach((team, index) => { team.position = index + 1 })
        
        setStandings(mappedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStandings()
  }, [])

  // Derived state: Filtered standings
  const filteredStandings = standings.filter((team) => {
    const matchesSearch = team.team.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesFilter = true
    if (filter === 'Top 3') matchesFilter = team.position <= 3
    if (filter === 'Mitad Superior') matchesFilter = team.position <= Math.ceil(standings.length / 2)
    if (filter === 'Mitad Inferior') matchesFilter = team.position > Math.ceil(standings.length / 2)
    
    return matchesSearch && matchesFilter
  })

  // Top 3 Teams for Podium
  const top3 = standings.slice(0, 3)

  // Handlers

  const handleOpenDetail = (team) => {
    // team obj now has `id` from the mapped data
    navigate(`/equipos/${team.id}`)
  }

  const content = (
    <div className="standings-page" style={{padding: 'var(--space-6) max(var(--space-6), calc((100% - 1200px) / 2))'}}>
      <div className="standings-header">
        <div>
          <h1 className="standings-header__title">Clasificación General</h1>
          <p className="standings-header__subtitle">Seguí el rendimiento de todos los equipos durante la temporada.</p>
        </div>
      </div>

      {loading ? (
        <div className="teams-loading">
          <div className="standings-summary">
            <div className="skeleton skeleton-row" style={{height: '100px'}}></div>
            <div className="skeleton skeleton-row" style={{height: '100px'}}></div>
            <div className="skeleton skeleton-row" style={{height: '100px'}}></div>
            <div className="skeleton skeleton-row" style={{height: '100px'}}></div>
          </div>
          <div className="skeleton skeleton-row" style={{height: '250px', marginBottom: '24px'}}></div>
          <div className="skeleton skeleton-row" style={{height: '400px'}}></div>
        </div>
      ) : error ? (
        <div className="empty-state">
          <span className="empty-state__icon">⚠️</span>
          <h3 className="empty-state__title">No se pudo cargar la clasificación</h3>
          <p className="empty-state__desc">{error}</p>
        </div>
      ) : (
        <>
          <StandingsSummary 
            leaderName={standings[0]?.team || 'N/A'}
            totalTeams={standings.length}
            totalMatches={standings.reduce((sum, t) => sum + t.played, 0) / 2} // Division by 2 as each match involves 2 teams
          />
          
          <TopTeams top3={top3} />

          <StandingsSearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
          />

          <StandingsTable 
            standings={filteredStandings} 
            onView={handleOpenDetail} 
          />

          <div className="standings-cards">
            {filteredStandings.map(team => (
              <StandingsCard 
                key={team.team} 
                team={team} 
                onView={handleOpenDetail} 
              />
            ))}
            {filteredStandings.length === 0 && (
                <div className="empty-state">
                  <span className="empty-state__icon">🏆</span>
                  <h3 className="empty-state__title">No hay datos disponibles</h3>
                </div>
            )}
          </div>

          {standings.length > 0 && <LeagueStats standings={standings} />}
        </>
      )}

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

export default StandingsPage
