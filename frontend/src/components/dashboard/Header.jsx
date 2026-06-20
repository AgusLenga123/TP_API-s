const Header = ({ onToggleSidebar }) => {
  return (
    <header className="dash-header" id="dash-header">
      <div className="dash-header__left">
        <button
          className="dash-header__hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          id="btn-toggle-sidebar"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M3 6h14M3 10h14M3 14h14" />
          </svg>
        </button>
        <div className="dash-header__info">
          <h1>Panel Administrativo</h1>
          <p>Gestioná toda la información de la liga desde un único lugar.</p>
        </div>
      </div>

      <div className="dash-header__right">
        <div>
          <div className="dash-header__user-name">Administrador</div>
          <div className="dash-header__user-role">Admin</div>
        </div>
        <div className="dash-header__avatar" id="dash-avatar">
          A
        </div>
      </div>
    </header>
  )
}

export default Header
