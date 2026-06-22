import { useState } from 'react'
import { Link } from 'react-router-dom'
import TeamDetailModal from './teams/TeamDetailModal'
import './TeamsPreview.css'

const teams = [
  { id: 1, name: 'Hawks', coach: 'John Smith', players: 12, color: '#e74c3c', record: '8-2', status: 'Activo' },
  { id: 2, name: 'Tigers', coach: 'Maria García', players: 11, color: '#f39c12', record: '7-3', status: 'Activo' },
  { id: 3, name: 'Lions', coach: 'Carlos López', players: 13, color: '#27ae60', record: '6-4', status: 'Activo' },
  { id: 4, name: 'Eagles', coach: 'Ana Martínez', players: 12, color: '#3498db', record: '5-5', status: 'Activo' },
  { id: 5, name: 'Wolves', coach: 'Roberto Díaz', players: 11, color: '#8e44ad', record: '4-6', status: 'Activo' },
  { id: 6, name: 'Bears', coach: 'Laura Sánchez', players: 12, color: '#2c3e50', record: '3-7', status: 'Activo' },
]

const TeamsPreview = () => {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDetail = (team) => {
    setSelectedTeam(team)
    setIsModalOpen(true)
  }

  return (
    <section className="teams section reveal" id="equipos">
      <div className="container">
        <h2 className="section-title">Equipos Participantes</h2>
        
        <div className="teams__grid">
          {teams.map((team) => (
            <div className="teams__card" key={team.id} id={`team-${team.id}`} onClick={() => handleOpenDetail(team)} style={{ cursor: 'pointer' }}>
              <div className="teams__card-header" style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}dd)` }}>
                <div className="teams__badge">
                  {team.name.charAt(0)}
                </div>
                <span className="teams__record">{team.record}</span>
              </div>
              
              <div className="teams__card-body">
                <h3 className="teams__name">{team.name}</h3>
                <div className="teams__info">
                  <div className="teams__info-item">
                    <span className="teams__info-icon">👤</span>
                    <div>
                      <span className="teams__info-label">Entrenador</span>
                      <span className="teams__info-value">{team.coach}</span>
                    </div>
                  </div>
                  <div className="teams__info-item">
                    <span className="teams__info-icon">👥</span>
                    <div>
                      <span className="teams__info-label">Jugadores</span>
                      <span className="teams__info-value">{team.players} jugadores</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline teams__btn" id={`btn-team-${team.id}`} onClick={(e) => { e.stopPropagation(); handleOpenDetail(team); }}>
                  Ver Equipo
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="teams__action" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-8)' }}>
          <Link to="/equipos" className="btn btn-primary" id="btn-equipos-completo">Ver Todos los Equipos</Link>
        </div>
      </div>
      
      <TeamDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        team={selectedTeam} 
      />
    </section>
  )
}

export default TeamsPreview
