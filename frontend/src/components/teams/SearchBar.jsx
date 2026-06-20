const SearchBar = ({ searchTerm, onSearchChange, filter, onFilterChange }) => {
  return (
    <div className="teams-toolbar">
      <div className="teams-search">
        <svg className="teams-search__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="teams-search__input"
          placeholder="Buscar equipo..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="teams-filters">
        <button
          className={`teams-filters__btn ${filter === 'Todos' ? 'teams-filters__btn--active' : ''}`}
          onClick={() => onFilterChange('Todos')}
        >
          Todos
        </button>
        <button
          className={`teams-filters__btn ${filter === 'Activo' ? 'teams-filters__btn--active' : ''}`}
          onClick={() => onFilterChange('Activo')}
        >
          Activos
        </button>
        <button
          className={`teams-filters__btn ${filter === 'Inactivo' ? 'teams-filters__btn--active' : ''}`}
          onClick={() => onFilterChange('Inactivo')}
        >
          Inactivos
        </button>
      </div>
    </div>
  )
}

export default SearchBar
