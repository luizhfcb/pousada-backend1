import { useState } from 'react'

const initialStaffForm = {
  nome: '',
  email: '',
  senha: '',
  cargo: 'recepcionista',
}

export function StaffManager({
  loading,
  onCreate,
  onDelete,
  onUpdate,
  users = [],
}) {
  const [editingId, setEditingId] = useState('')
  const [formData, setFormData] = useState(initialStaffForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function resetForm() {
    setEditingId('')
    setFormData(initialStaffForm)
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
        await onUpdate(editingId, {
          nome: formData.nome,
          email: formData.email,
          cargo: formData.cargo,
        })
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

  function startEditing(user) {
    setEditingId(user._id)
    setError('')
    setFormData({
      nome: user.nome,
      email: user.email,
      senha: '',
      cargo: user.cargo,
    })
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `Remover ${user.nome} da equipe? Essa acao tambem desvincula o cracha do funcionario.`,
    )

    if (!confirmed) {
      return
    }

    try {
      await onDelete(user._id)

      if (editingId === user._id) {
        resetForm()
      }
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <section className="admin-section" id="equipe">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Equipe</p>
          <h2>Adicione, atualize e acompanhe a equipe interna</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Nome</span>
            <input name="nome" onChange={handleChange} required value={formData.nome} />
          </label>

          <label className="field">
            <span>E-mail</span>
            <input
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={formData.email}
            />
          </label>

          {!editingId ? (
            <label className="field">
              <span>Senha provisoria</span>
              <input
                name="senha"
                minLength="6"
                onChange={handleChange}
                required
                type="password"
                value={formData.senha}
              />
            </label>
          ) : null}

          <label className="field">
            <span>Cargo</span>
            <select name="cargo" onChange={handleChange} value={formData.cargo}>
              <option value="admin">Admin</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="limpeza">Limpeza</option>
              <option value="manutencao">Manutencao</option>
            </select>
          </label>

          {error ? <p className="status-message status-error">{error}</p> : null}

          <div className="button-row">
            <button className="button" disabled={submitting} type="submit">
              {submitting
                ? editingId
                  ? 'Salvando...'
                  : 'Adicionando...'
                : editingId
                  ? 'Salvar alteracoes'
                  : 'Adicionar funcionario'}
            </button>

            {editingId ? (
              <button
                className="button button-ghost"
                onClick={resetForm}
                type="button"
              >
                Cancelar edicao
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-list-card">
          {loading ? <p className="status-message">Carregando equipe...</p> : null}

          {!loading && !users.length ? (
            <p className="empty-state">Nenhum funcionario cadastrado ate o momento.</p>
          ) : null}

          {!loading &&
            users.map((user) => (
              <article className="admin-list-item" key={user._id}>
                <div>
                  <h3>{user.nome}</h3>
                  <p>{user.email}</p>
                  <p>{user.cargo}</p>
                </div>

                <div className="button-row admin-inline-actions">
                  <button
                    className="button button-ghost"
                    onClick={() => startEditing(user)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="button button-danger"
                    onClick={() => handleDelete(user)}
                    type="button"
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}
