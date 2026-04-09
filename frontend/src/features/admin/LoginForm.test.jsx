import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('submits the credentials entered by the user', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()

    render(<LoginForm onSubmit={onSubmit} loading={false} error="" />)

    await user.type(screen.getByLabelText(/e-mail/i), 'admin@pousada.com')
    await user.type(screen.getByLabelText(/senha/i), '123456')
    await user.click(screen.getByRole('button', { name: /entrar no painel/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'admin@pousada.com',
      senha: '123456',
    })
  })
})
