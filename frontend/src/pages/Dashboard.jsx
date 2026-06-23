import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import StatsCards from '../components/dashboard/StatsCards'
import QuickActions from '../components/dashboard/QuickActions'
import RecentActivity from '../components/dashboard/RecentActivity'
import '../styles/dashboard.css'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    teams: 0,
    players: 0,
    matchesScheduled: 0,
    matchesFinished: 0
  })
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        const [equiposRes, jugadoresRes, partidosRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/equipos`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/jugadores`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/partidos`, { headers })
        ])
        
        if (!equiposRes.ok || !jugadoresRes.ok || !partidosRes.ok) {
          throw new Error('Error al obtener datos del dashboard')
        }

        const equipos = await equiposRes.json()
        const jugadores = await jugadoresRes.json()
        const partidos = await partidosRes.json()

        setStats({
          teams: equipos.length,
          players: jugadores.length,
          matchesScheduled: partidos.filter(p => !p.finalizado).length,
          matchesFinished: partidos.filter(p => p.finalizado).length
        })

        // Derived recent activity
        const recentMatches = partidos.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 6)
        const recentActs = recentMatches.map((m, i) => {
          const isFinished = m.finalizado
          // Use nested equipo names if populated, else fallback
          const local = m.equipoLocal?.nombre || 'Local'
          const visit = m.equipoVisitante?.nombre || 'Visitante'
          const ptsL = m.resultado?.puntosLocal ?? 0
          const ptsV = m.resultado?.puntosVisitante ?? 0

          const text = isFinished 
            ? `Resultado cargado: <strong>${local} ${ptsL} - ${ptsV} ${visit}</strong>`
            : `Partido programado: <strong>${local} vs ${visit}</strong>`
            
          return {
            id: m._id || i,
            text,
            time: new Date(m.updatedAt || m.fecha).toLocaleDateString('es-AR'),
            color: isFinished ? 'blue' : 'orange'
          }
        })

        setActivities(recentActs)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard" id="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="dashboard__main">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="dashboard__content">
          {loading ? (
            <div style={{padding: '2rem', textAlign: 'center'}}>Cargando dashboard...</div>
          ) : (
            <>
              <StatsCards stats={stats} />
              <QuickActions />
              <RecentActivity activities={activities} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
