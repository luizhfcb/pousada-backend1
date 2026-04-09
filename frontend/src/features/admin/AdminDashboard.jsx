import { BadgesManager } from './BadgesManager'
import { ReservationsManager } from './ReservationsManager'
import { RoomsManager } from './RoomsManager'
import { ServicesManager } from './ServicesManager'
import { StaffManager } from './StaffManager'

export function AdminDashboard({
  badges = [],
  error,
  loading,
  onCreateBadge,
  onCreateReservation,
  onCreateRoom,
  onCreateService,
  onCreateUser,
  onDeleteReservation,
  onDeleteRoom,
  onDeleteUser,
  onLogout,
  onUpdateReservation,
  onUpdateRoom,
  onUpdateUser,
  reservations,
  rooms,
  services,
  users = [],
}) {
  const summaryCards = [
    { label: 'Quartos', value: rooms.length },
    { label: 'Reservas', value: reservations.length },
    { label: 'Servicos', value: services.length },
    { label: 'Equipe', value: users.length },
  ]

  return (
    <>
      <section className="admin-hero" id="resumo">
        <div className="admin-hero-copy">
          <p className="eyebrow">Operacao central</p>
          <h2>Painel administrativo da pousada</h2>
          <p className="section-copy">Acompanhe os cadastros e organize a rotina da equipe.</p>
        </div>
        <div className="button-row admin-hero-actions">
          <button className="button button-ghost" onClick={onLogout} type="button">
            Sair
          </button>
        </div>
      </section>

      {error ? <p className="status-message status-error">{error}</p> : null}

      <section className="summary-grid">
        {summaryCards.map((card) => (
          <article className="summary-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <RoomsManager
        loading={loading}
        onCreate={onCreateRoom}
        onDelete={onDeleteRoom}
        onUpdate={onUpdateRoom}
        rooms={rooms}
      />

      <ReservationsManager
        loading={loading}
        onCreate={onCreateReservation}
        onDelete={onDeleteReservation}
        onUpdate={onUpdateReservation}
        reservations={reservations}
        rooms={rooms}
      />

      <ServicesManager
        loading={loading}
        onCreate={onCreateService}
        services={services}
        users={users}
      />

      <StaffManager
        loading={loading}
        onCreate={onCreateUser}
        onDelete={onDeleteUser}
        onUpdate={onUpdateUser}
        users={users}
      />

      <BadgesManager badges={badges} onCreate={onCreateBadge} users={users} />
    </>
  )
}
