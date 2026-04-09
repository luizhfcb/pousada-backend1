import { useMemo, useState } from 'react'

import {
  formatDate,
  getRoomTypeName,
  getStatusLabel,
} from '../../lib/format'

const initialReservationForm = {
  hospede: '',
  cpf: '',
  quarto: '',
  dataCheckIn: '',
  dataCheckOut: '',
  status: 'pendente',
}

export function ReservationsManager({
  loading,
  reservations,
  rooms,
  onCreate,
  onDelete,
  onUpdate,
}) {
  const [editingId, setEditingId] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialReservationForm)

  const roomOptions = useMemo(
    () =>
      rooms.map((room) => ({
        value: room._id,
        label: `${room.numero} · ${getRoomTypeName(room.tipo)}`,
      })),
    [rooms],
  )

  function resetForm() {
    setEditingId('')
    setFormData(initialReservationForm)
    setError('')
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      if (editingId) {
        await onUpdate(editingId, formData)
      } else {
        await onCreate(formData)
      }

      resetForm()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  function startEditing(reservation) {
    setEditingId(reservation._id)
    setFormData({
      hospede: reservation.hospede,
      cpf: reservation.cpf,
      quarto: reservation.quarto?._id || reservation.quarto,
      dataCheckIn: reservation.dataCheckIn?.slice(0, 10) || '',
      dataCheckOut: reservation.dataCheckOut?.slice(0, 10) || '',
      status: reservation.status,
    })
  }

  return (
    <section className="admin-section" id="reservas">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Reservas</p>
          <h2>Gestão de check-in, check-out e status</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Hóspede</span>
            <input
              name="hospede"
              onChange={handleChange}
              required
              value={formData.hospede}
            />
          </label>

          <label className="field">
            <span>CPF</span>
            <input
              name="cpf"
              onChange={handleChange}
              required
              value={formData.cpf}
            />
          </label>

          <label className="field">
            <span>Quarto</span>
            <select
              name="quarto"
              onChange={handleChange}
              required
              value={formData.quarto}
            >
              <option value="">Selecione um quarto</option>
              {roomOptions.map((room) => (
                <option key={room.value} value={room.value}>
                  {room.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Check-in</span>
            <input
              name="dataCheckIn"
              onChange={handleChange}
              required
              type="date"
              value={formData.dataCheckIn}
            />
          </label>

          <label className="field">
            <span>Check-out</span>
            <input
              name="dataCheckOut"
              onChange={handleChange}
              required
              type="date"
              value={formData.dataCheckOut}
            />
          </label>

          <label className="field">
            <span>Status</span>
            <select
              name="status"
              onChange={handleChange}
              value={formData.status}
            >
              <option value="pendente">Pendente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </label>

          {error ? <p className="status-message status-error">{error}</p> : null}

          <div className="button-row">
            <button className="button" disabled={submitting} type="submit">
              {submitting
                ? 'Salvando...'
                : editingId
                  ? 'Atualizar reserva'
                  : 'Criar reserva'}
            </button>

            {editingId ? (
              <button
                className="button button-ghost"
                onClick={resetForm}
                type="button"
              >
                Cancelar edição
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-list-card">
          {loading ? (
            <p className="status-message">Carregando reservas...</p>
          ) : null}

          {!loading &&
            reservations.map((reservation) => (
              <article className="admin-list-item" key={reservation._id}>
                <div>
                  <h3>{reservation.hospede}</h3>
                  <p>
                    {reservation.quarto?.numero || '-'} ·{' '}
                    {getStatusLabel(reservation.status)}
                  </p>
                  <p>
                    {formatDate(reservation.dataCheckIn)} até{' '}
                    {formatDate(reservation.dataCheckOut)}
                  </p>
                </div>
                <div className="button-row">
                  <button
                    className="button button-ghost"
                    onClick={() => startEditing(reservation)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="button button-danger"
                    onClick={() => onDelete(reservation._id)}
                    type="button"
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}
