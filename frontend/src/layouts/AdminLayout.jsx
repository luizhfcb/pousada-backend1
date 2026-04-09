import { Link, NavLink, Outlet } from 'react-router-dom'

import { HashScrollToSection } from '../components/HashScrollToSection'

const adminLinks = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'quartos', label: 'Quartos' },
  { id: 'reservas', label: 'Reservas' },
  { id: 'servicos', label: 'Servicos' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'crachas', label: 'Crachas' },
]

export function AdminLayout() {
  return (
    <div className="admin-shell">
      <HashScrollToSection />

      <aside className="admin-sidebar">
        <div className="admin-sidebar-card">
          <p className="eyebrow">Painel interno</p>
          <h1>Gestao da pousada</h1>
          <div className="button-row admin-sidebar-actions">
            <Link className="button button-ghost" to="/">
              Voltar para a home
            </Link>
          </div>
        </div>

        <nav aria-label="Secoes do painel" className="admin-nav">
          {adminLinks.map((item) => (
            <NavLink
              key={item.id}
              className="admin-nav-link"
              to={`/admin#${item.id}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
