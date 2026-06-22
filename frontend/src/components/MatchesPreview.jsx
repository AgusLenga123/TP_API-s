import { Link } from 'react-router-dom'
import './MatchesPreview.css'

const matches = [
  {
    id: 1,
    home: 'Hawks',
    homeColor: '#e74c3c',
    away: 'Tigers',
    awayColor: '#f39c12',
    date: '22/06',
    time: '18:00',
    venue: 'Estadio Central',
  },
  {
    id: 2,
    home: 'Lions',
    homeColor: '#27ae60',
    away: 'Eagles',
    awayColor: '#3498db',
    date: '24/06',
    time: '19:30',
    venue: 'Polideportivo Norte',
  },
  {
    id: 3,
    home: 'Wolves',
    homeColor: '#8e44ad',
    away: 'Bears',
    awayColor: '#2c3e50',
    date: '26/06',
    time: '17:00',
    venue: 'Cancha Municipal',
  },
]

const MatchesPreview = () => {
  return (
    <section className="matches section reveal" id="partidos">
      <div className="container">
        <h2 className="section-title">Próximos Partidos</h2>
        
        <div className="matches__grid">
          {matches.map((match) => (
            <div className="matches__card" key={match.id} id={`match-${match.id}`}>
              <div className="matches__card-header">
                <span className="matches__date">📅 {match.date}</span>
                <span className="matches__time">🕐 {match.time}</span>
              </div>
              
              <div className="matches__teams">
                <div className="matches__team">
                  <div className="matches__team-badge" style={{ background: match.homeColor }}>
                    {match.home.charAt(0)}
                  </div>
                  <span className="matches__team-name">{match.home}</span>
                </div>
                
                <div className="matches__vs">
                  <span>VS</span>
                </div>
                
                <div className="matches__team">
                  <div className="matches__team-badge" style={{ background: match.awayColor }}>
                    {match.away.charAt(0)}
                  </div>
                  <span className="matches__team-name">{match.away}</span>
                </div>
              </div>
              
              <div className="matches__venue">
                <span>📍 {match.venue}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="matches__action">
          <Link to="/partidos" className="btn btn-primary" id="btn-calendario-completo">Ver Calendario Completo</Link>
        </div>
      </div>
    </section>
  )
}

export default MatchesPreview
