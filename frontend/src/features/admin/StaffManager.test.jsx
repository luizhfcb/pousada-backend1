import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { StaffManager } from './StaffManager'

describe('StaffManager', () => {
  it('submits a new employee with password and role', async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()

    render(
      <StaffManager
        loading={false}
        onCreate={onCreate}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
        users={[]}
      />,
    )

    await user.type(screen.getByLabelText(/nome/i), 'Paula')
    await user.type(screen.getByLabelText(/e-mail/i), 'paula@pousada.com')
    await user.type(screen.getByLabelText(/senha provisoria/i), '123456')
    await user.selectOptions(screen.getByLabelText(/cargo/i), 'limpeza')
    await user.click(screen.getByRole('button', { name: /adicionar funcionario/i }))

    expect(onCreate).toHaveBeenCalledWith({
      nome: 'Paula',
      email: 'paula@pousada.com',
      senha: '123456',
      cargo: 'limpeza',
    })
  })
})
