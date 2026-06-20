const ResultsTable = ({ results, onView, onEdit }) => {
  if (results.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">🏀</span>
        <h3 className="empty-state__title">No hay partidos disponibles</h3>
        <p className="empty-state__desc">Intenta ajustar tu búsqueda o filtros.</p>
      </div>
    )
  }

  return (
    <div className="results-table-container">
      <table className="results-table">
        <thead>
          <tr>
            <th>Local</th>
            <th>Visitante</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Resultado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td className="results-table__team">{result.homeTeam}</td>
              <td className="results-table__team">{result.awayTeam}</td>
              <td>{new Date(result.date).toLocaleDateString('es-AR')}</td>
              <td>
                <span className={`results-table__badge results-table__badge--${result.status.toLowerCase()}`}>
                  {result.status}
                </span>
              </td>
              <td>
                {result.status === 'Finalizado' ? (
                  <span className="results-table__score">
                    {result.homeScore} - {result.awayScore}
                  </span>
                ) : (
                  <span className="results-table__score--empty">-</span>
                )}
              </td>
              <td>
                <div className="results-table__actions">
                  <button className="results-table__action-btn" onClick={() => onView(result)} title="Ver detalle">
                    👁
                  </button>
                  {result.status === 'Pendiente' ? (
                    <button className="results-table__action-btn" onClick={() => onEdit(result)} title="Cargar Resultado">
                      🏀
                    </button>
                  ) : (
                    <button className="results-table__action-btn" onClick={() => onEdit(result)} title="Editar Resultado">
                      ✏
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResultsTable
