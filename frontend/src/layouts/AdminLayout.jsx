import { NavLink, Outlet } from 'react-router-dom'

const adminLinks = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'quartos', label: 'Quartos' },
  { id: 'reservas', label: 'Reservas' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'crachas', label: 'Crachás' },
]

export function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-card">
          <p className="eyebrow">Painel interno</p>
          <h1>Gestão da pousada</h1>
          <p>
            Cadastre quartos, organize reservas, vincule serviços e emita
            crachás para a equipe.
          </p>
        </div>

        <nav aria-label="Seções do painel" className="admin-nav">
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
