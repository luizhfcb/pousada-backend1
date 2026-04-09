import { Link, NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/quartos', label: 'Quartos' },
]

export function PublicLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">P</span>
          <div>
            <strong>Pousada Serra Bela</strong>
            <span>Hospedagem familiar com conforto e tranquilidade</span>
          </div>
        </Link>

        <nav aria-label="Navegação principal" className="site-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                isActive ? 'site-link site-link-active' : 'site-link'
              }
              end={link.end}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
          <Link className="button button-ghost" to="/admin/login">
            Acesso da equipe
          </Link>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}
