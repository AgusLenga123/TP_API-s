const StandingsSearchBar = ({ searchTerm, onSearchChange, filter, onFilterChange }) => {
  return (
    <div className="standings-toolbar">
      <div className="standings-search">
        <svg className="standings-search__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="standings-search__input"
          placeholder="Buscar equipo..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="standings-filters">
        <button
          className={`standings-filters__btn ${filter === 'Todos' ? 'standings-filters__btn--active' : ''}`}
          onClick={() => onFilterChange('Todos')}
        >
          Todos
        </button>
        <button
          className={`standings-filters__btn ${filter === 'Top 3' ? 'standings-filters__btn--active' : ''}`}
          onClick={() => onFilterChange('Top 3')}
        >
          Top 3
        </button>
        <button
          className={`standings-filters__btn ${filter === 'Mitad Superior' ? 'standings-filters__btn--active' : ''}`}
          onClick={() => onFilterChange('Mitad Superior')}
        >
          Mitad Superior
        </button>
        <button
          className={`standings-filters__btn ${filter === 'Mitad Inferior' ? 'standings-filters__btn--active' : ''}`}
          onClick={() => onFilterChange('Mitad Inferior')}
        >
          Mitad Inferior
        </button>
      </div>
    </div>
  )
}

export default StandingsSearchBar
