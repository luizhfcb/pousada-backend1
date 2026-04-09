import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminDashboard } from '../features/admin/AdminDashboard'
import { api, getApiErrorMessage } from '../lib/api'
import { clearAuthToken } from '../lib/auth'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [reservations, setReservations] = useState([])
  const [services, setServices] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleLogout = useCallback(() => {
    clearAuthToken()
    navigate('/admin/login', { replace: true })
  }, [navigate])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const [roomsResponse, reservationsResponse, servicesResponse, usersResponse] =
        await Promise.all([
          api.get('/api/quartos'),
          api.get('/api/reservas'),
          api.get('/api/servicos'),
          api.get('/api/auth/usuarios'),
        ])

      setRooms(roomsResponse.data)
      setReservations(reservationsResponse.data)
      setServices(servicesResponse.data)
      setUsers(usersResponse.data)
      setError('')
    } catch (loadError) {
      if (loadError?.response?.status === 401) {
        handleLogout()
        return
      }

      setError(
        getApiErrorMessage(loadError, 'Não foi possível carregar o painel.'),
      )
    } finally {
      setLoading(false)
    }
  }, [handleLogout])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function wrapAction(request, fallbackMessage) {
    try {
      await request()
      await loadData()
    } catch (actionError) {
      if (actionError?.response?.status === 401) {
        handleLogout()
        return
      }

      throw new Error(getApiErrorMessage(actionError, fallbackMessage))
    }
  }

  return (
    <AdminDashboard
      error={error}
      loading={loading}
      onCreateBadge={(payload) =>
        wrapAction(
          () => api.post('/api/crachas', payload),
          'Não foi possível emitir o crachá.',
        )
      }
      onCreateReservation={(payload) =>
        wrapAction(
          () => api.post('/api/reservas', payload),
          'Não foi possível criar a reserva.',
        )
      }
      onCreateRoom={(payload) =>
        wrapAction(
          () => api.post('/api/quartos', payload),
          'Não foi possível cadastrar o quarto.',
        )
      }
      onCreateService={(payload) =>
        wrapAction(
          () => api.post('/api/servicos', payload),
          'Não foi possível cadastrar o serviço.',
        )
      }
      onDeleteReservation={(id) =>
        wrapAction(
          () => api.delete(`/api/reservas/${id}`),
          'Não foi possível excluir a reserva.',
        )
      }
      onDeleteRoom={(id) =>
        wrapAction(
          () => api.delete(`/api/quartos/${id}`),
          'Não foi possível excluir o quarto.',
        )
      }
      onLogout={handleLogout}
      onUpdateReservation={(id, payload) =>
        wrapAction(
          () => api.put(`/api/reservas/${id}`, payload),
          'Não foi possível atualizar a reserva.',
        )
      }
      onUpdateRoom={(id, payload) =>
        wrapAction(
          () => api.put(`/api/quartos/${id}`, payload),
          'Não foi possível atualizar o quarto.',
        )
      }
      reservations={reservations}
      rooms={rooms}
      services={services}
      users={users}
    />
  )
}
