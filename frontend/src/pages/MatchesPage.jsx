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

// API integrated, no mock data needed

const MatchesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [matches, setMatches] = useState([])
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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

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
          homeTeamId: m.equipoLocal?._id || '',
          awayTeam: m.equipoVisitante?.nombre || 'Visitante',
          awayTeamId: m.equipoVisitante?._id || '',
          date: m.fecha.split('T')[0],
          time: m.horario,
          location: m.lugar,
          status: m.finalizado ? 'Finalizado' : 'Pendiente',
        }))
        
        setMatches(mappedData.sort((a, b) => new Date(a.date) - new Date(b.date)))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
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

  const handleSaveMatch = async (matchData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      const body = JSON.stringify({
        equipoLocal: matchData.homeTeamId,
        equipoVisitante: matchData.awayTeamId,
        fecha: matchData.date,
        horario: matchData.time,
        lugar: matchData.location,
        finalizado: matchData.status === 'Finalizado'
      })

      if (selectedMatch) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/partidos/${matchData.id}`, {
          method: 'PUT', headers, body
        })
        if (!res.ok) throw new Error('Error al actualizar el partido')
        const updated = await res.json()
        
        const updatedMatches = matches.map(m => m.id === updated._id ? {
          ...m,
          homeTeam: updated.equipoLocal?.nombre || teamsList.find(t => t.id === updated.equipoLocal)?.name || 'Local',
          homeTeamId: updated.equipoLocal?._id || updated.equipoLocal || '',
          awayTeam: updated.equipoVisitante?.nombre || teamsList.find(t => t.id === updated.equipoVisitante)?.name || 'Visitante',
          awayTeamId: updated.equipoVisitante?._id || updated.equipoVisitante || '',
          date: updated.fecha.split('T')[0],
          time: updated.horario,
          location: updated.lugar,
          status: updated.finalizado ? 'Finalizado' : 'Pendiente'
        } : m)
        setMatches(updatedMatches.sort((a, b) => new Date(a.date) - new Date(b.date)))
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/partidos`, {
          method: 'POST', headers, body
        })
        if (!res.ok) throw new Error('Error al crear el partido')
        const created = await res.json()
        
        const newMatch = {
          id: created._id,
          homeTeam: created.equipoLocal?.nombre || teamsList.find(t => t.id === created.equipoLocal)?.name || 'Local',
          homeTeamId: created.equipoLocal?._id || created.equipoLocal || '',
          awayTeam: created.equipoVisitante?.nombre || teamsList.find(t => t.id === created.equipoVisitante)?.name || 'Visitante',
          awayTeamId: created.equipoVisitante?._id || created.equipoVisitante || '',
          date: created.fecha.split('T')[0],
          time: created.horario,
          location: created.lugar,
          status: created.finalizado ? 'Finalizado' : 'Pendiente'
        }
        setMatches([...matches, newMatch].sort((a, b) => new Date(a.date) - new Date(b.date)))
      }
      setIsFormOpen(false)
      setSelectedMatch(null)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleOpenDetail = (match) => {
    setSelectedMatch(match)
    setIsDetailOpen(true)
  }

  const handleOpenDelete = (match) => {
    setSelectedMatch(match)
    setIsDeleteOpen(true)
  }

  const handleDeleteMatch = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/partidos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) throw new Error('Error al eliminar')
      setMatches(matches.filter(m => m.id !== id))
      setIsDeleteOpen(false)
      setSelectedMatch(null)
    } catch (err) {
      alert(err.message)
    }
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
                teamsList={teamsList.map(t => t.name)}
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
        teamsList={teamsList}
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
