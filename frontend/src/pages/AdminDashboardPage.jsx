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
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleLogout = useCallback(() => {
    clearAuthToken()
    navigate('/admin/login', { replace: true })
  }, [navigate])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const [
        roomsResponse,
        reservationsResponse,
        servicesResponse,
        usersResponse,
        badgesResponse,
      ] = await Promise.all([
        api.get('/api/quartos'),
        api.get('/api/reservas'),
        api.get('/api/servicos'),
        api.get('/api/auth/usuarios'),
        api.get('/api/crachas'),
      ])

      setRooms(roomsResponse.data)
      setReservations(reservationsResponse.data)
      setServices(servicesResponse.data)
      setUsers(usersResponse.data)
      setBadges(badgesResponse.data)
      setError('')
    } catch (loadError) {
      if (loadError?.response?.status === 401) {
        handleLogout()
        return
      }

      setError(getApiErrorMessage(loadError, 'Nao foi possivel carregar o painel.'))
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
      badges={badges}
      error={error}
      loading={loading}
      onCreateBadge={(payload) =>
        wrapAction(
          () => api.post('/api/crachas', payload),
          'Nao foi possivel emitir o cracha.',
        )
      }
      onCreateReservation={(payload) =>
        wrapAction(
          () => api.post('/api/reservas', payload),
          'Nao foi possivel criar a reserva.',
        )
      }
      onCreateRoom={(payload) =>
        wrapAction(
          () => api.post('/api/quartos', payload),
          'Nao foi possivel cadastrar o quarto.',
        )
      }
      onCreateService={(payload) =>
        wrapAction(
          () => api.post('/api/servicos', payload),
          'Nao foi possivel cadastrar o servico.',
        )
      }
      onCreateUser={(payload) =>
        wrapAction(
          () => api.post('/api/auth/usuarios', payload),
          'Nao foi possivel adicionar o funcionario.',
        )
      }
      onDeleteReservation={(id) =>
        wrapAction(
          () => api.delete(`/api/reservas/${id}`),
          'Nao foi possivel excluir a reserva.',
        )
      }
      onDeleteRoom={(id) =>
        wrapAction(
          () => api.delete(`/api/quartos/${id}`),
          'Nao foi possivel excluir o quarto.',
        )
      }
      onDeleteUser={(id) =>
        wrapAction(
          () => api.delete(`/api/auth/usuarios/${id}`),
          'Nao foi possivel remover o funcionario.',
        )
      }
      onLogout={handleLogout}
      onUpdateReservation={(id, payload) =>
        wrapAction(
          () => api.put(`/api/reservas/${id}`, payload),
          'Nao foi possivel atualizar a reserva.',
        )
      }
      onUpdateRoom={(id, payload) =>
        wrapAction(
          () => api.put(`/api/quartos/${id}`, payload),
          'Nao foi possivel atualizar o quarto.',
        )
      }
      onUpdateUser={(id, payload) =>
        wrapAction(
          () => api.put(`/api/auth/usuarios/${id}`, payload),
          'Nao foi possivel atualizar o funcionario.',
        )
      }
      reservations={reservations}
      rooms={rooms}
      services={services}
      users={users}
    />
  )
}
