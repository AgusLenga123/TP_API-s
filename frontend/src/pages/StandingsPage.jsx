import { useState, useEffect } from 'react'
import StandingsSummary from '../components/standings/StandingsSummary'
import TopTeams from '../components/standings/TopTeams'
import StandingsSearchBar from '../components/standings/StandingsSearchBar'
import StandingsTable from '../components/standings/StandingsTable'
import StandingsCard from '../components/standings/StandingsCard'
import TeamStandingDetailModal from '../components/standings/TeamStandingDetailModal'
import LeagueStats from '../components/standings/LeagueStats'
import Navbar from '../components/Navbar'
import '../styles/dashboard.css'
import '../styles/standings.css'

// Initial mock data
const initialStandings = [
  { position: 1, team: "Hawks", points: 18, played: 8, wins: 6, draws: 0, losses: 2, pointsFor: 620, pointsAgainst: 560, difference: 60 },
  { position: 2, team: "Tigers", points: 16, played: 8, wins: 5, draws: 1, losses: 2, pointsFor: 590, pointsAgainst: 540, difference: 50 },
  { position: 3, team: "Lions", points: 15, played: 8, wins: 5, draws: 0, losses: 3, pointsFor: 580, pointsAgainst: 560, difference: 20 },
  { position: 4, team: "Eagles", points: 12, played: 8, wins: 4, draws: 0, losses: 4, pointsFor: 540, pointsAgainst: 550, difference: -10 },
  { position: 5, team: "Bears", points: 10, played: 8, wins: 3, draws: 1, losses: 4, pointsFor: 510, pointsAgainst: 530, difference: -20 },
  { position: 6, team: "Wolves", points: 9, played: 8, wins: 3, draws: 0, losses: 5, pointsFor: 490, pointsAgainst: 540, difference: -50 },
  { position: 7, team: "Sharks", points: 6, played: 8, wins: 2, draws: 0, losses: 6, pointsFor: 460, pointsAgainst: 570, difference: -110 },
  { position: 8, team: "Panthers", points: 3, played: 8, wins: 1, draws: 0, losses: 7, pointsFor: 440, pointsAgainst: 590, difference: -150 },
]

const StandingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('Todos')
  
  // Modal state
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      // Sort to ensure correct positioning
      const sorted = [...initialStandings].sort((a, b) => b.points - a.points || b.difference - a.difference)
      // Re-assign positions just in case
      sorted.forEach((team, index) => { team.position = index + 1 })
      setStandings(sorted)
      setLoading(false)
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
    setSelectedTeam(team)
    setIsDetailOpen(true)
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

      {/* Detail Modal */}
      <TeamStandingDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        team={selectedTeam} 
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

export default StandingsPage
