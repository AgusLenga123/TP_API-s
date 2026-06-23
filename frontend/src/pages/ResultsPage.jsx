import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import ResultsStatsSummary from '../components/results/ResultsStatsSummary'
import ResultsSearchBar from '../components/results/ResultsSearchBar'
import ResultsTable from '../components/results/ResultsTable'
import ResultCard from '../components/results/ResultCard'
import ResultFormModal from '../components/results/ResultFormModal'
import ResultDetailModal from '../components/results/ResultDetailModal'
import '../styles/dashboard.css'
import '../styles/results.css'

// API integrated, no mock data needed

const ResultsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [results, setResults] = useState([])
  const [teamsList, setTeamsList] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [teamFilter, setTeamFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('')
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        const [partidosRes, equiposRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/partidos`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/equipos`, { headers })
        ])
        if (!partidosRes.ok || !equiposRes.ok) throw new Error('Error al cargar datos')
        
        const partidos = await partidosRes.json()
        const equipos = await equiposRes.json()

        setTeamsList(equipos.map(e => ({ id: e._id, name: e.nombre })))
        
        const mappedData = partidos.map(m => ({
          id: m._id,
          homeTeam: m.equipoLocal?.nombre || 'Local',
          awayTeam: m.equipoVisitante?.nombre || 'Visitante',
          date: m.fecha.split('T')[0],
          time: m.horario,
          location: m.lugar,
          homeScore: m.resultado?.puntosLocal !== undefined ? m.resultado.puntosLocal : null,
          awayScore: m.resultado?.puntosVisitante !== undefined ? m.resultado.puntosVisitante : null,
          status: m.finalizado ? 'Finalizado' : 'Pendiente',
        }))
        
        setResults(mappedData.sort((a, b) => new Date(b.date) - new Date(a.date)))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Derived state: Filtered results
  const filteredResults = results.filter((result) => {
    const searchString = `${result.homeTeam} ${result.awayTeam}`.toLowerCase()
    const matchesSearch = searchString.includes(searchTerm.toLowerCase())
    
    // Convert filter logic to status matching
    let matchesStatus = true
    if (statusFilter === 'Con Resultado') matchesStatus = result.status === 'Finalizado'
    if (statusFilter === 'Sin Resultado') matchesStatus = result.status === 'Pendiente'

    const matchesTeam = teamFilter === 'Todos' || result.homeTeam === teamFilter || result.awayTeam === teamFilter
    const matchesDate = !dateFilter || result.date === dateFilter
    
    return matchesSearch && matchesStatus && matchesTeam && matchesDate
  })

  // Derived state: Stats
  const finishedMatches = results.filter(r => r.status === 'Finalizado').length
  const loadedResults = results.filter(r => r.homeScore !== null && r.awayScore !== null).length
  const pendingResults = results.filter(r => r.status === 'Pendiente').length
  
  const completedMatches = results.filter(r => r.status === 'Finalizado').sort((a, b) => new Date(b.date) - new Date(a.date))
  const lastResultDate = completedMatches.length > 0 ? new Date(completedMatches[0].date).toLocaleDateString('es-AR') : null

  const stats = {
    finishedMatches,
    loadedResults,
    pendingResults,
    lastResultDate
  }

  // Handlers
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)
  const closeSidebar = () => setSidebarOpen(false)

  const handleOpenForm = (result) => {
    setSelectedResult(result)
    setIsFormOpen(true)
  }

  const handleSaveResult = async (resultData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/partidos/${resultData.id}/resultado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          puntosLocal: resultData.homeScore,
          puntosVisitante: resultData.awayScore
        })
      })
      if (!res.ok) throw new Error('Error al cargar resultado')
      
      const updatedResults = results.map(r => r.id === resultData.id ? resultData : r)
      setResults(updatedResults.sort((a, b) => new Date(b.date) - new Date(a.date)))
      setIsFormOpen(false)
      setSelectedResult(null)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleOpenDetail = (result) => {
    setSelectedResult(result)
    setIsDetailOpen(true)
  }

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="dashboard__main">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="dashboard__content results-page">
          <div className="results-header">
            <div>
              <h1 className="results-header__title">Resultados</h1>
              <p className="results-header__subtitle">Gestioná los resultados de los partidos disputados.</p>
            </div>
          </div>

          {loading ? (
            <div className="teams-loading">
              <div className="results-stats">
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
              <ResultsStatsSummary stats={stats} />
              
              <ResultsSearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                teamFilter={teamFilter}
                onTeamFilterChange={setTeamFilter}
                dateFilter={dateFilter}
                onDateFilterChange={setDateFilter}
                teamsList={teamsList.map(t => t.name)}
              />

              <ResultsTable 
                results={filteredResults} 
                onView={handleOpenDetail} 
                onEdit={handleOpenForm} 
              />

              <div className="results-cards">
                {filteredResults.map(result => (
                  <ResultCard 
                    key={result.id} 
                    result={result} 
                    onView={handleOpenDetail} 
                    onEdit={handleOpenForm} 
                  />
                ))}
                {filteredResults.length === 0 && (
                   <div className="empty-state">
                     <span className="empty-state__icon">🏀</span>
                     <h3 className="empty-state__title">No hay partidos disponibles</h3>
                     <p className="empty-state__desc">Intenta ajustar tu búsqueda o filtros.</p>
                   </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <ResultFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveResult} 
        result={selectedResult}
      />
      
      <ResultDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        result={selectedResult} 
      />
    </div>
  )
}

export default ResultsPage
