const StandingsTable = ({ standings, onView }) => {
  if (standings.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">🏆</span>
        <h3 className="empty-state__title">No hay datos de clasificación disponibles</h3>
        <p className="empty-state__desc">Intenta ajustar tu búsqueda o filtros.</p>
      </div>
    )
  }

  return (
    <div className="standings-table-container">
      <table className="standings-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Equipo</th>
            <th>Pts</th>
            <th>PJ</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>PF</th>
            <th>PC</th>
            <th>Dif</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team} onClick={() => onView(team)}>
              <td>
                <span className={`standings-table__pos ${team.position <= 3 ? `standings-table__pos--${team.position}` : ''}`}>
                  {team.position}
                </span>
              </td>
              <td className="standings-table__team">{team.team}</td>
              <td className="standings-table__points">{team.points}</td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.pointsFor}</td>
              <td>{team.pointsAgainst}</td>
              <td className={`standings-table__diff ${team.difference > 0 ? 'standings-table__diff--positive' : team.difference < 0 ? 'standings-table__diff--negative' : ''}`}>
                {team.difference > 0 ? `+${team.difference}` : team.difference}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StandingsTable
