import { useEffect, useState } from 'react'

import { api } from '../../lib/api'
import {
  buildRoomTitle,
  formatCurrency,
  getRoomTypeName,
} from '../../lib/format'

export function RoomsShowcase({ compact = false }) {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadRooms() {
      try {
        const response = await api.get('/api/quartos')

        if (active) {
          setRooms(response.data)
          setError('')
        }
      } catch {
        if (active) {
          setError('Não foi possível carregar os quartos agora.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadRooms()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section section-rooms" id="quartos">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Acomodações</p>
          <h2>Quartos preparados para noites tranquilas e estadias confortáveis</h2>
        </div>
        {!compact ? (
          <p className="section-copy">
            Escolha entre opções aconchegantes para casais, famílias e hóspedes
            que buscam sossego em um ambiente acolhedor.
          </p>
        ) : null}
      </div>

      {loading ? <p className="status-message">Carregando acomodações...</p> : null}
      {!loading && error ? (
        <p className="status-message status-error">{error}</p>
      ) : null}

      {!loading && !error ? (
        <div className="room-grid">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <article className="room-card" key={room._id}>
                <span
                  className={
                    room.disponivel ? 'pill pill-success' : 'pill pill-muted'
                  }
                >
                  {room.disponivel ? 'Disponível' : 'Indisponível'}
                </span>
                <h3>{buildRoomTitle(room)}</h3>
                <p className="room-type">{getRoomTypeName(room.tipo)}</p>
                <strong className="room-price">
                  {formatCurrency(room.precoDiaria)}/noite
                </strong>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h3>Nossas acomodações estarão disponíveis em breve</h3>
              <p>
                Em instantes você poderá conhecer melhor os quartos e escolher
                o espaço ideal para a sua estadia.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  )
}
