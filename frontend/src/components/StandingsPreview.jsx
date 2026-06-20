import './StandingsPreview.css'

const standings = [
  { pos: 1, team: 'Hawks', pts: 24, pj: 10, g: 8, e: 0, p: 2 },
  { pos: 2, team: 'Tigers', pts: 21, pj: 10, g: 7, e: 0, p: 3 },
  { pos: 3, team: 'Lions', pts: 18, pj: 10, g: 6, e: 0, p: 4 },
  { pos: 4, team: 'Eagles', pts: 15, pj: 10, g: 5, e: 0, p: 5 },
]

const teamColors = {
  Hawks: '#e74c3c',
  Tigers: '#f39c12',
  Lions: '#27ae60',
  Eagles: '#3498db',
}

const StandingsPreview = () => {
  return (
    <section className="standings section reveal" id="clasificacion">
      <div className="container">
        <h2 className="section-title">Clasificación General</h2>
        
        <div className="standings__table-wrapper">
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
                <tr key={row.pos} className={row.pos === 1 ? 'standings__row--leader' : ''}>
                  <td>
                    <span className={`standings__pos standings__pos--${row.pos}`}>
                      {row.pos}
                    </span>
                  </td>
                  <td>
                    <div className="standings__team">
                      <div 
                        className="standings__team-badge" 
                        style={{ background: teamColors[row.team] }}
                      >
                        {row.team.charAt(0)}
                      </div>
                      <span className="standings__team-name">{row.team}</span>
                    </div>
                  </td>
                  <td><strong>{row.pts}</strong></td>
                  <td>{row.pj}</td>
                  <td className="standings__wins">{row.g}</td>
                  <td>{row.e}</td>
                  <td className="standings__losses">{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="standings__action">
          <a href="#" className="btn btn-primary" id="btn-clasificacion-completa">Ver Clasificación Completa</a>
        </div>
      </div>
    </section>
  )
}

export default StandingsPreview
