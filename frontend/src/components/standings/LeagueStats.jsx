const LeagueStats = ({ standings }) => {
  if (standings.length === 0) return null

  // Calculate stats
  const bestOffense = [...standings].sort((a, b) => b.pointsFor - a.pointsFor)[0]
  const bestDifference = [...standings].sort((a, b) => b.difference - a.difference)[0]
  const bestDefense = [...standings].sort((a, b) => a.pointsAgainst - b.pointsAgainst)[0]
  
  const totalPoints = standings.reduce((sum, team) => sum + team.pointsFor, 0)
  const totalMatches = standings.reduce((sum, team) => sum + team.played, 0)
  const averagePoints = totalMatches > 0 ? (totalPoints / (totalMatches * 2)).toFixed(1) : 0 // *2 because each match has 2 teams

  return (
    <div className="league-stats">
      <div className="league-stats__card">
        <span className="league-stats__label">Mejor Ofensiva</span>
        <span className="league-stats__team">{bestOffense.team}</span>
        <span className="league-stats__value">{bestOffense.pointsFor} pts a favor</span>
      </div>
      <div className="league-stats__card" style={{background: 'linear-gradient(135deg, var(--color-success), #16a34a)'}}>
        <span className="league-stats__label">Mejor Diferencia</span>
        <span className="league-stats__team">{bestDifference.team}</span>
        <span className="league-stats__value">+{bestDifference.difference}</span>
      </div>
      <div className="league-stats__card" style={{background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))'}}>
        <span className="league-stats__label">Mejor Defensa</span>
        <span className="league-stats__team">{bestDefense.team}</span>
        <span className="league-stats__value">{bestDefense.pointsAgainst} pts en contra</span>
      </div>
      <div className="league-stats__card" style={{background: 'linear-gradient(135deg, #64748b, #475569)'}}>
        <span className="league-stats__label">Promedio Liga</span>
        <span className="league-stats__team">{averagePoints}</span>
        <span className="league-stats__value">pts por equipo/partido</span>
      </div>
    </div>
  )
}

export default LeagueStats
