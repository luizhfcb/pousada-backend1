import { useState } from 'react'

const initialBadgeForm = {
  codigoRfid: '',
  usuario: '',
}

export function BadgesManager({ users, onCreate }) {
  const [formData, setFormData] = useState(initialBadgeForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
    setSuccess('')

    try {
      await onCreate(formData)
      setFormData(initialBadgeForm)
      setSuccess('Crachá emitido com sucesso.')
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="admin-section" id="crachas">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Crachás</p>
          <h2>Emissão individual por funcionário</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Código RFID</span>
            <input
              name="codigoRfid"
              onChange={handleChange}
              required
              value={formData.codigoRfid}
            />
          </label>

          <label className="field">
            <span>Funcionário</span>
            <select
              name="usuario"
              onChange={handleChange}
              required
              value={formData.usuario}
            >
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.nome} · {user.cargo}
                </option>
              ))}
            </select>
          </label>

          {error ? <p className="status-message status-error">{error}</p> : null}
          {success ? <p className="status-message status-success">{success}</p> : null}

          <button className="button" disabled={submitting} type="submit">
            {submitting ? 'Emitindo...' : 'Emitir crachá'}
          </button>
        </form>

        <div className="admin-note-card">
          <h3>Observação de backend</h3>
          <p>
            A API atual permite apenas emitir um crachá por usuário. Se um
            funcionário já tiver crachá ativo, o backend responde com o bloqueio
            1:1 e a mensagem aparece aqui no formulário.
          </p>
        </div>
      </div>
    </section>
  )
}
