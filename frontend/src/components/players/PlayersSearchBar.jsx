const PlayersSearchBar = ({ searchTerm, onSearchChange, categoryFilter, onCategoryFilterChange, teamFilter, onTeamFilterChange, teamsList }) => {
  return (
    <div className="players-toolbar">
      <div className="players-search">
        <svg className="players-search__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="players-search__input"
          placeholder="Buscar jugador..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="players-filters">
        <button
          className={`players-filters__btn ${categoryFilter === 'Todos' ? 'players-filters__btn--active' : ''}`}
          onClick={() => onCategoryFilterChange('Todos')}
        >
          Todos
        </button>
        <button
          className={`players-filters__btn ${categoryFilter === 'Sub-13' ? 'players-filters__btn--active' : ''}`}
          onClick={() => onCategoryFilterChange('Sub-13')}
        >
          Sub-13
        </button>
        <button
          className={`players-filters__btn ${categoryFilter === 'Sub-15' ? 'players-filters__btn--active' : ''}`}
          onClick={() => onCategoryFilterChange('Sub-15')}
        >
          Sub-15
        </button>
        <button
          className={`players-filters__btn ${categoryFilter === 'Sub-17' ? 'players-filters__btn--active' : ''}`}
          onClick={() => onCategoryFilterChange('Sub-17')}
        >
          Sub-17
        </button>
        <button
          className={`players-filters__btn ${categoryFilter === 'Mayor' ? 'players-filters__btn--active' : ''}`}
          onClick={() => onCategoryFilterChange('Mayor')}
        >
          Mayor
        </button>

        <select 
          className="players-filters__select"
          value={teamFilter}
          onChange={(e) => onTeamFilterChange(e.target.value)}
        >
          <option value="Todos">Todos los Equipos</option>
          {teamsList.map((team, idx) => (
            <option key={idx} value={team}>{team}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default PlayersSearchBar
