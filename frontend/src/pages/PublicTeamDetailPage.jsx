import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/dashboard.css'
import '../styles/teams.css'
import '../styles/matches.css'
import '../styles/players.css'
import '../styles/standings.css'
import '../styles/teamDetail.css'

const PublicTeamDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [teamData, setTeamData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/equipos/${id}`)
        if (!response.ok) {
          if (response.status === 404) throw new Error('Equipo no encontrado.')
          throw new Error('Error al cargar la información del equipo.')
        }
        const data = await response.json()
        setTeamData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchTeam()
  }, [id])

  const goBack = () => {
    navigate(-1) // or '/equipos'
  }

  if (error) {
    return (
      <div style={{minHeight: '100vh', background: 'var(--color-bg)'}}>
        <Navbar />
        <div style={{paddingTop: '60px'}}>
          <div className="standings-page" style={{padding: 'var(--space-6) max(var(--space-6), calc((100% - 1200px) / 2))'}}>
            <button className="btn btn-outline" onClick={goBack} style={{ padding: '6px 12px', fontSize: '14px', marginBottom: '24px' }}>
              &larr; Volver a Equipos
            </button>
            <div className="empty-state">
              <span className="empty-state__icon">⚠️</span>
              <h3 className="empty-state__title">Oops...</h3>
              <p className="empty-state__desc">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading || !teamData) {
    return (
      <div style={{minHeight: '100vh', background: 'var(--color-bg)'}}>
        <Navbar />
        <div style={{paddingTop: '60px'}}>
          <div className="standings-page" style={{padding: 'var(--space-6) max(var(--space-6), calc((100% - 1200px) / 2))'}}>
            <div className="teams-loading">
              <div className="skeleton skeleton-row" style={{height: '60px', marginBottom: '24px', width: '30%'}}></div>
              <div className="team-detail__stats" style={{marginBottom: '32px'}}>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
                <div className="skeleton skeleton-row" style={{height: '90px'}}></div>
              </div>
              <div className="skeleton skeleton-row" style={{height: '400px'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { equipo, partidos } = teamData
  const { estadisticas, jugadores } = equipo

  const diferencia = estadisticas.tantosAFavor - estadisticas.tantosEnContra

  const partidosJugados = partidos.filter(p => p.finalizado)
  const partidosPendientes = partidos.filter(p => !p.finalizado)

  // Helper to determine W/D/L for the team
  const getMatchResult = (partido) => {
    if (!partido.finalizado || !partido.resultado) return null
    const isLocal = partido.equipoLocal.nombre === equipo.nombre
    const ptsTeam = isLocal ? partido.resultado.puntosLocal : partido.resultado.puntosVisitante
    const ptsRival = isLocal ? partido.resultado.puntosVisitante : partido.resultado.puntosLocal
    
    if (ptsTeam > ptsRival) return 'ganado'
    if (ptsTeam < ptsRival) return 'perdido'
    return 'empate'
  }

  return (
    <div style={{minHeight: '100vh', background: 'var(--color-bg)'}}>
      <Navbar />
      <div style={{paddingTop: '60px'}}>
        <div className="standings-page" style={{padding: 'var(--space-6) max(var(--space-6), calc((100% - 1200px) / 2))'}}>
          
          {/* Header */}
          <div className="standings-header" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <button className="btn btn-outline" onClick={goBack} style={{ padding: '6px 12px', fontSize: '14px' }}>
              &larr; Volver a Equipos
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '24px', fontWeight: 800, flexShrink: 0
              }}>
                {equipo.nombre.charAt(0)}
              </div>
              <div>
                <h1 className="standings-header__title" style={{ marginBottom: '8px' }}>{equipo.nombre}</h1>
                <span className="teams-table__badge teams-table__badge--active">Activo</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="detail-stats-grid">
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Entrenador</span>
              <span className="detail-stats-box__value" style={{fontSize: 'var(--font-size-lg)'}}>{equipo.entrenador || 'N/A'}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Jugadores</span>
              <span className="detail-stats-box__value">{jugadores ? jugadores.length : 0}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Partidos Jugados (PJ)</span>
              <span className="detail-stats-box__value">{estadisticas.partidosJugados}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Ganados / Perdidos</span>
              <span className="detail-stats-box__value">
                <span style={{color: 'var(--color-success)'}}>{estadisticas.partidosGanados}</span>
                <span style={{color: 'var(--color-text-secondary)', margin: '0 4px'}}>-</span>
                <span style={{color: '#ef4444'}}>{estadisticas.partidosPerdidos}</span>
              </span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Puntos Liga</span>
              <span className="detail-stats-box__value" style={{color: 'var(--color-primary)'}}>{estadisticas.puntos}</span>
            </div>
            <div className="detail-stats-box">
              <span className="detail-stats-box__label">Diferencia Tantos</span>
              <span className="detail-stats-box__value" style={{color: diferencia > 0 ? 'var(--color-success)' : '#ef4444'}}>
                {diferencia > 0 ? `+${diferencia}` : diferencia}
              </span>
            </div>
          </div>

          {/* Jugadores List */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            <h3 className="form-label" style={{marginBottom: '16px', fontSize: 'var(--font-size-lg)', color: 'var(--color-text)'}}>Jugadores</h3>
            {!jugadores || jugadores.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state__icon">⛹️</span>
                <h3 className="empty-state__title">Sin jugadores</h3>
                <p className="empty-state__desc">Este equipo no tiene jugadores registrados.</p>
              </div>
            ) : (
              <ul className="team-detail__players-list">
                {jugadores.map(j => (
                  <li key={j._id} className="team-detail__player-item">
                    <span>{j.nombre} {j.apellido}</span>
                    <span className="players-table__badge--category" style={{
                      padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--color-secondary-dark)'
                    }}>
                      {j.categoria}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Partidos Jugados */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            <h3 className="form-label" style={{marginBottom: '16px', fontSize: 'var(--font-size-lg)', color: 'var(--color-text)'}}>Partidos Jugados</h3>
            {partidosJugados.length === 0 ? (
              <div className="empty-state" style={{padding: 'var(--space-4)'}}>
                <p className="empty-state__desc">No hay partidos finalizados.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="team-detail-matches-table-container matches-table-container">
                  <table className="matches-table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Rival</th>
                        <th>Lugar</th>
                        <th>Resultado</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partidosJugados.map(p => {
                        const isLocal = p.equipoLocal.nombre === equipo.nombre
                        const rival = isLocal ? p.equipoVisitante.nombre : p.equipoLocal.nombre
                        const resType = getMatchResult(p)
                        const resLabel = resType === 'ganado' ? 'G' : resType === 'perdido' ? 'P' : 'E'
                        
                        return (
                          <tr key={p._id}>
                            <td>{new Date(p.fecha).toLocaleDateString('es-AR')}</td>
                            <td><span className="matches-table__teams">{rival} <span className="matches-table__vs" style={{fontSize: '10px'}}>{isLocal ? '(L)' : '(V)'}</span></span></td>
                            <td>{p.lugar}</td>
                            <td>
                              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <strong>{p.resultado.puntosLocal} - {p.resultado.puntosVisitante}</strong>
                                <span className={`team-result-badge team-result-badge--${resType}`}>{resLabel}</span>
                              </div>
                            </td>
                            <td><span className="matches-table__badge matches-table__badge--finalizado">Finalizado</span></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="team-detail-matches-cards">
                  {partidosJugados.map(p => {
                    const isLocal = p.equipoLocal.nombre === equipo.nombre
                    const rival = isLocal ? p.equipoVisitante.nombre : p.equipoLocal.nombre
                    const resType = getMatchResult(p)
                    const resLabel = resType === 'ganado' ? 'Ganado' : resType === 'perdido' ? 'Perdido' : 'Empate'
                    
                    return (
                      <div key={p._id} className="team-match-card">
                        <div className="team-match-card__header">
                          <span className="team-match-card__rival">vs {rival} {isLocal ? '(L)' : '(V)'}</span>
                          <span className={`team-result-badge team-result-badge--${resType}`}>{resLabel}</span>
                        </div>
                        <div className="team-match-card__info">
                          <span className="team-match-card__info-row">📅 {new Date(p.fecha).toLocaleDateString('es-AR')}</span>
                          <span className="team-match-card__info-row">📍 {p.lugar}</span>
                          <span className="team-match-card__info-row" style={{marginTop: '4px'}}>
                            <strong>Resultado: {p.resultado.puntosLocal} - {p.resultado.puntosVisitante}</strong>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Próximos Partidos */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            <h3 className="form-label" style={{marginBottom: '16px', fontSize: 'var(--font-size-lg)', color: 'var(--color-text)'}}>Próximos Partidos</h3>
            {partidosPendientes.length === 0 ? (
              <div className="empty-state" style={{padding: 'var(--space-4)'}}>
                <p className="empty-state__desc">No hay partidos pendientes programados.</p>
              </div>
            ) : (
              <div className="team-detail-matches-cards" style={{display: 'grid'}}>
                {partidosPendientes.map(p => {
                  const isLocal = p.equipoLocal.nombre === equipo.nombre
                  const rival = isLocal ? p.equipoVisitante.nombre : p.equipoLocal.nombre
                  
                  return (
                    <div key={p._id} className="team-match-card">
                      <div className="team-match-card__header">
                        <span className="team-match-card__rival">vs {rival} {isLocal ? '(L)' : '(V)'}</span>
                        <span className="matches-table__badge matches-table__badge--pendiente">Pendiente</span>
                      </div>
                      <div className="team-match-card__info">
                        <span className="team-match-card__info-row">📅 {new Date(p.fecha).toLocaleDateString('es-AR')}</span>
                        <span className="team-match-card__info-row">⏱️ {p.horario}</span>
                        <span className="team-match-card__info-row">📍 {p.lugar}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default PublicTeamDetailPage
