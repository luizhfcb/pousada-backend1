import { BadgesManager } from './BadgesManager'
import { ReservationsManager } from './ReservationsManager'
import { RoomsManager } from './RoomsManager'
import { ServicesManager } from './ServicesManager'

export function AdminDashboard({
  error,
  loading,
  onCreateBadge,
  onCreateReservation,
  onCreateRoom,
  onCreateService,
  onDeleteReservation,
  onDeleteRoom,
  onLogout,
  onUpdateReservation,
  onUpdateRoom,
  reservations,
  rooms,
  services,
  users,
}) {
  const summaryCards = [
    { label: 'Quartos', value: rooms.length },
    { label: 'Reservas', value: reservations.length },
    { label: 'Serviços', value: services.length },
    { label: 'Equipe', value: users.length },
  ]

  return (
    <>
      <section className="admin-hero" id="resumo">
        <div>
          <p className="eyebrow">Operação central</p>
          <h2>Painel administrativo da pousada</h2>
          <p className="section-copy">
            Tudo aqui já conversa com o backend: login JWT, CRUD de quartos e
            reservas, cadastro de serviços e emissão de crachás.
          </p>
        </div>
        <button className="button button-ghost" onClick={onLogout} type="button">
          Sair
        </button>
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

      <BadgesManager onCreate={onCreateBadge} users={users} />
    </>
  )
}
