import { useState } from 'react'

const initialServiceForm = {
  nome: '',
  descricao: '',
  funcionariosAptos: [],
}

export function ServicesManager({ loading, services, users, onCreate }) {
  const [formData, setFormData] = useState(initialServiceForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function toggleUser(userId) {
    setFormData((current) => ({
      ...current,
      funcionariosAptos: current.funcionariosAptos.includes(userId)
        ? current.funcionariosAptos.filter((item) => item !== userId)
        : [...current.funcionariosAptos, userId],
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await onCreate(formData)
      setFormData(initialServiceForm)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="admin-section" id="servicos">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Serviços</p>
          <h2>Cadastre frentes de atendimento e equipe apta</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Nome do serviço</span>
            <input
              name="nome"
              onChange={handleChange}
              required
              value={formData.nome}
            />
          </label>

          <label className="field">
            <span>Descrição</span>
            <textarea
              name="descricao"
              onChange={handleChange}
              rows="4"
              value={formData.descricao}
            />
          </label>

          <fieldset className="checklist">
            <legend>Funcionários aptos</legend>
            {users.map((user) => (
              <label className="checkbox-field" key={user._id}>
                <input
                  checked={formData.funcionariosAptos.includes(user._id)}
                  onChange={() => toggleUser(user._id)}
                  type="checkbox"
                />
                <span>
                  {user.nome} · {user.cargo}
                </span>
              </label>
            ))}
          </fieldset>

          {error ? <p className="status-message status-error">{error}</p> : null}

          <button className="button" disabled={submitting} type="submit">
            {submitting ? 'Salvando...' : 'Cadastrar serviço'}
          </button>
        </form>

        <div className="admin-list-card">
          {loading ? (
            <p className="status-message">Carregando serviços...</p>
          ) : null}

          {!loading &&
            services.map((service) => (
              <article className="admin-list-item" key={service._id}>
                <div>
                  <h3>{service.nome}</h3>
                  <p>{service.descricao || 'Sem descrição cadastrada.'}</p>
                  <p>
                    Aptos:{' '}
                    {service.funcionariosAptos?.length
                      ? service.funcionariosAptos.map((user) => user.nome).join(', ')
                      : 'nenhum funcionário vinculado'}
                  </p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}
