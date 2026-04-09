import { useMemo, useState } from 'react'

import { formatDate } from '../../lib/format'

const initialBadgeForm = {
  codigoRfid: '',
  usuario: '',
}

export function BadgesManager({ badges = [], users = [], onCreate }) {
  const [formData, setFormData] = useState(initialBadgeForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const availableUsers = useMemo(() => {
    const usersWithBadge = new Set(
      badges.map((badge) => badge.usuario?._id).filter(Boolean),
    )

    return users.filter((user) => !usersWithBadge.has(user._id))
  }, [badges, users])

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
      setSuccess('Cracha emitido com sucesso.')
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
          <p className="eyebrow">Crachas</p>
          <h2>Emissao e consulta dos crachas da equipe</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Codigo RFID</span>
            <input
              name="codigoRfid"
              onChange={handleChange}
              required
              value={formData.codigoRfid}
            />
          </label>

          <label className="field">
            <span>Funcionario</span>
            <select
              name="usuario"
              onChange={handleChange}
              required
              value={formData.usuario}
            >
              <option value="">Selecione um usuario</option>
              {availableUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.nome} - {user.cargo}
                </option>
              ))}
            </select>
          </label>

          {error ? <p className="status-message status-error">{error}</p> : null}
          {success ? <p className="status-message status-success">{success}</p> : null}

          <button className="button" disabled={submitting} type="submit">
            {submitting ? 'Emitindo...' : 'Emitir cracha'}
          </button>
        </form>

        <div className="admin-list-card">
          {!badges.length ? (
            <p className="empty-state">Nenhum cracha emitido ate o momento.</p>
          ) : null}

          {badges.map((badge) => (
            <article className="admin-list-item" key={badge._id}>
              <div>
                <h3>{badge.usuario?.nome || 'Funcionario sem identificacao'}</h3>
                <p>{badge.usuario?.cargo || 'Cargo nao informado'}</p>
                <p>RFID: {badge.codigoRfid}</p>
                <p>Emitido em {formatDate(badge.dataEmissao)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
