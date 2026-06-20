const MatchesSearchBar = ({ 
  searchTerm, onSearchChange, 
  statusFilter, onStatusFilterChange, 
  teamFilter, onTeamFilterChange, 
  dateFilter, onDateFilterChange,
  teamsList 
}) => {
  return (
    <div className="matches-toolbar">
      <div className="matches-search">
        <svg className="matches-search__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="matches-search__input"
          placeholder="Buscar partido..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="matches-filters">
        <button
          className={`matches-filters__btn ${statusFilter === 'Todos' ? 'matches-filters__btn--active' : ''}`}
          onClick={() => onStatusFilterChange('Todos')}
        >
          Todos
        </button>
        <button
          className={`matches-filters__btn ${statusFilter === 'Pendiente' ? 'matches-filters__btn--active' : ''}`}
          onClick={() => onStatusFilterChange('Pendiente')}
        >
          Pendientes
        </button>
        <button
          className={`matches-filters__btn ${statusFilter === 'Finalizado' ? 'matches-filters__btn--active' : ''}`}
          onClick={() => onStatusFilterChange('Finalizado')}
        >
          Finalizados
        </button>

        <select 
          className="matches-filters__select"
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
          className="matches-filters__date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default MatchesSearchBar
