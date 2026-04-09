import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from '../features/admin/LoginForm'
import { api, getApiErrorMessage } from '../lib/api'
import { setAuthToken } from '../lib/auth'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(credentials) {
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/api/auth/login', credentials)
      setAuthToken(response.data.token)
      navigate('/admin', { replace: true })
    } catch (loginError) {
      setError(getApiErrorMessage(loginError, 'Não foi possível fazer login.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <p className="eyebrow">Equipe interna</p>
        <h1>Acessar área administrativa</h1>
        <p>
          Faça login para gerenciar quartos, reservas, serviços e crachás da
          pousada.
        </p>

        <LoginForm error={error} loading={loading} onSubmit={handleLogin} />
      </div>
    </section>
  )
}
