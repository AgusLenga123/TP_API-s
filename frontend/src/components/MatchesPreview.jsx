import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MatchesPreview.css'

const getTeamColor = (teamName) => {
  const colors = {
    Hawks: '#e74c3c',
    Tigers: '#f39c12',
    Lions: '#27ae60',
    Eagles: '#3498db',
    Bears: '#2c3e50',
    Wolves: '#8e44ad',
    Sharks: '#16a085',
    Panthers: '#2c3e50',
  }
  return colors[teamName] || '#1E3A8A' // default color
}

const MatchesPreview = () => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/partidos`)
        if (!response.ok) throw new Error('Error al cargar los partidos')
        const data = await response.json()
        
        // Filter pending matches and take only the next 3
        const pending = data.filter(m => !m.finalizado)
        // Sort by date/time ascending
        pending.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        
        setMatches(pending.slice(0, 3))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])
  return (
    <section className="matches section reveal" id="partidos">
      <div className="container">
        <h2 className="section-title">Próximos Partidos</h2>
        
        <div className="matches__grid">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>Cargando partidos...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444', gridColumn: '1 / -1' }}>{error}</div>
          ) : matches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>No hay partidos pendientes.</div>
          ) : (
            matches.map((match) => (
            <div className="matches__card" key={match._id} id={`match-${match._id}`}>
              <div className="matches__card-header">
                <span className="matches__date">📅 {new Date(match.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}</span>
                <span className="matches__time">🕐 {match.horario}</span>
              </div>
              
              <div className="matches__teams">
                <div className="matches__team">
                  <div className="matches__team-badge" style={{ background: getTeamColor(match.equipoLocal.nombre) }}>
                    {match.equipoLocal.nombre.charAt(0)}
                  </div>
                  <span className="matches__team-name">{match.equipoLocal.nombre}</span>
                </div>
                
                <div className="matches__vs">
                  <span>VS</span>
                </div>
                
                <div className="matches__team">
                  <div className="matches__team-badge" style={{ background: getTeamColor(match.equipoVisitante.nombre) }}>
                    {match.equipoVisitante.nombre.charAt(0)}
                  </div>
                  <span className="matches__team-name">{match.equipoVisitante.nombre}</span>
                </div>
              </div>
              
              <div className="matches__venue">
                <span>📍 {match.lugar}</span>
              </div>
            </div>
          )))}
        </div>

        <div className="matches__action">
          <Link to="/partidos" className="btn btn-primary" id="btn-calendario-completo">Ver Calendario Completo</Link>
        </div>
      </div>
    </section>
  )
}

export default MatchesPreview
