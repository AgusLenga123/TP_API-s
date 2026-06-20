import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
  { icon: '👥', label: 'Equipos', path: '/admin/equipos' },
  { icon: '🧑‍🤝‍🧑', label: 'Jugadores', path: '/admin/jugadores' },
  { icon: '📅', label: 'Partidos', path: '/admin/partidos' },
  { icon: '📊', label: 'Resultados', path: '/admin/resultados' },
]

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  return (
    <>
      {isOpen && (
        <div
          className={`sidebar__overlay ${isOpen ? 'sidebar__overlay--visible' : ''}`}
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} id="sidebar">
        <div className="sidebar__header">
          <Link to="/" className="sidebar__logo" id="sidebar-logo">
            <div className="sidebar__logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#F97316" stroke="#1E3A8A" strokeWidth="2"/>
                <path d="M20 2 Q20 20 20 38" stroke="#1E3A8A" strokeWidth="1.5" fill="none"/>
                <path d="M2 20 Q20 20 38 20" stroke="#1E3A8A" strokeWidth="1.5" fill="none"/>
                <path d="M6 8 Q20 14 34 8" stroke="#1E3A8A" strokeWidth="1.2" fill="none"/>
                <path d="M6 32 Q20 26 34 32" stroke="#1E3A8A" strokeWidth="1.2" fill="none"/>
              </svg>
            </div>
            <span className="sidebar__logo-text">Youth Basketball League</span>
          </Link>
        </div>

        <nav className="sidebar__nav">
          <span className="sidebar__nav-label">Menú Principal</span>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__link ${location.pathname === item.path ? 'sidebar__link--active' : ''}`}
              onClick={onClose}
              id={`sidebar-link-${item.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <span className="sidebar__nav-label">Sistema</span>
          <Link
            to="/dashboard/configuracion"
            className={`sidebar__link ${location.pathname === '/dashboard/configuracion' ? 'sidebar__link--active' : ''}`}
            onClick={onClose}
            id="sidebar-link-configuracion"
          >
            <span className="sidebar__link-icon">⚙️</span>
            Configuración
          </Link>
        </nav>

        <div className="sidebar__footer">
          <Link
            to="/login"
            className="sidebar__link sidebar__link--logout"
            id="sidebar-link-logout"
          >
            <span className="sidebar__link-icon">🚪</span>
            Cerrar Sesión
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
