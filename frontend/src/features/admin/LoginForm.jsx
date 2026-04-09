import { useState } from 'react'

export function LoginForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form className="admin-form login-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>E-mail</span>
        <input
          name="email"
          onChange={handleChange}
          placeholder="admin@pousada.com"
          type="email"
          value={formData.email}
        />
      </label>

      <label className="field">
        <span>Senha</span>
        <input
          name="senha"
          onChange={handleChange}
          placeholder="Digite sua senha"
          type="password"
          value={formData.senha}
        />
      </label>

      {error ? <p className="status-message status-error">{error}</p> : null}

      <button className="button" disabled={loading} type="submit">
        {loading ? 'Entrando...' : 'Entrar no painel'}
      </button>
    </form>
  )
}
