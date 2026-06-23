import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './StandingsPreview.css'

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

const StandingsPreview = () => {
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clasificacion`)
        if (!response.ok) throw new Error('Error al cargar la clasificación')
        const data = await response.json()
        // Mostrar solo el Top 4 en la preview
        setStandings(data.slice(0, 4))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStandings()
  }, [])

  return (
    <section className="standings section reveal" id="clasificacion">
      <div className="container">
        <h2 className="section-title">Clasificación General</h2>
        
        <div className="standings__table-wrapper">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando clasificación...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</div>
          ) : (
            <table className="standings__table" id="standings-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Equipo</th>
                <th>Pts</th>
                <th>PJ</th>
                <th>G</th>
                <th>E</th>
                <th>P</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.equipoId} className={row.posicion === 1 ? 'standings__row--leader' : ''}>
                  <td>
                    <span className={`standings__pos standings__pos--${row.posicion}`}>
                      {row.posicion}
                    </span>
                  </td>
                  <td>
                    <div className="standings__team">
                      <div 
                        className="standings__team-badge" 
                        style={{ background: getTeamColor(row.nombre) }}
                      >
                        {row.nombre.charAt(0)}
                      </div>
                      <span className="standings__team-name">{row.nombre}</span>
                    </div>
                  </td>
                  <td><strong>{row.puntos}</strong></td>
                  <td>{row.partidosJugados}</td>
                  <td className="standings__wins">{row.partidosGanados}</td>
                  <td>{row.partidosEmpatados}</td>
                  <td className="standings__losses">{row.partidosPerdidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        <div className="standings__action">
          <Link to="/clasificacion" className="btn btn-primary" id="btn-clasificacion-completa">Ver Clasificación Completa</Link>
        </div>
      </div>
    </section>
  )
}

export default StandingsPreview
