import { useMemo, useState } from 'react'

import { formatCurrency, getRoomTypeName } from '../../lib/format'

const initialRoomForm = {
  numero: '',
  tipo: 'simples',
  precoDiaria: '',
  disponivel: true,
}

export function RoomsManager({ loading, rooms, onCreate, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialRoomForm)

  const sortedRooms = useMemo(
    () => [...rooms].sort((a, b) => a.numero.localeCompare(b.numero)),
    [rooms],
  )

  function resetForm() {
    setEditingId('')
    setFormData(initialRoomForm)
    setError('')
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const payload = {
        ...formData,
        precoDiaria: Number(formData.precoDiaria),
      }

      if (editingId) {
        await onUpdate(editingId, payload)
      } else {
        await onCreate(payload)
      }

      resetForm()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  function startEditing(room) {
    setEditingId(room._id)
    setFormData({
      numero: room.numero,
      tipo: room.tipo,
      precoDiaria: String(room.precoDiaria),
      disponivel: room.disponivel,
    })
  }

  return (
    <section className="admin-section" id="quartos">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Quartos</p>
          <h2>Cadastre e atualize acomodações</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Número</span>
            <input
              name="numero"
              onChange={handleChange}
              required
              value={formData.numero}
            />
          </label>

          <label className="field">
            <span>Tipo</span>
            <select name="tipo" onChange={handleChange} value={formData.tipo}>
              <option value="simples">Simples</option>
              <option value="duplo">Duplo</option>
              <option value="suite">Suíte</option>
            </select>
          </label>

          <label className="field">
            <span>Preço da diária</span>
            <input
              min="0"
              name="precoDiaria"
              onChange={handleChange}
              required
              step="1"
              type="number"
              value={formData.precoDiaria}
            />
          </label>

          <label className="checkbox-field">
            <input
              checked={formData.disponivel}
              name="disponivel"
              onChange={handleChange}
              type="checkbox"
            />
            <span>Quarto disponível</span>
          </label>

          {error ? <p className="status-message status-error">{error}</p> : null}

          <div className="button-row">
            <button className="button" disabled={submitting} type="submit">
              {submitting
                ? 'Salvando...'
                : editingId
                  ? 'Atualizar quarto'
                  : 'Cadastrar quarto'}
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
          {loading ? <p className="status-message">Carregando quartos...</p> : null}

          {!loading &&
            sortedRooms.map((room) => (
              <article className="admin-list-item" key={room._id}>
                <div>
                  <h3>Quarto {room.numero}</h3>
                  <p>
                    {getRoomTypeName(room.tipo)} ·{' '}
                    {formatCurrency(room.precoDiaria)}
                  </p>
                </div>
                <div className="button-row">
                  <button
                    className="button button-ghost"
                    onClick={() => startEditing(room)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="button button-danger"
                    onClick={() => onDelete(room._id)}
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
