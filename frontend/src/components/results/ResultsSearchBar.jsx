const ResultsSearchBar = ({ 
  searchTerm, onSearchChange, 
  statusFilter, onStatusFilterChange, 
  teamFilter, onTeamFilterChange, 
  dateFilter, onDateFilterChange,
  teamsList 
}) => {
  return (
    <div className="results-toolbar">
      <div className="results-search">
        <svg className="results-search__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="results-search__input"
          placeholder="Buscar partido..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="results-filters">
        <button
          className={`results-filters__btn ${statusFilter === 'Todos' ? 'results-filters__btn--active' : ''}`}
          onClick={() => onStatusFilterChange('Todos')}
        >
          Todos
        </button>
        <button
          className={`results-filters__btn ${statusFilter === 'Con Resultado' ? 'results-filters__btn--active' : ''}`}
          onClick={() => onStatusFilterChange('Con Resultado')}
        >
          Con Resultado
        </button>
        <button
          className={`results-filters__btn ${statusFilter === 'Sin Resultado' ? 'results-filters__btn--active' : ''}`}
          onClick={() => onStatusFilterChange('Sin Resultado')}
        >
          Sin Resultado
        </button>

        <select 
          className="results-filters__select"
          value={teamFilter}
          onChange={(e) => onTeamFilterChange(e.target.value)}
        >
          <option value="Todos">Cualquier Equipo</option>
          {teamsList.map((team, idx) => (
            <option key={idx} value={team}>{team}</option>
          ))}
        </select>

        <input 
          type="date" 
          className="results-filters__date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ResultsSearchBar
