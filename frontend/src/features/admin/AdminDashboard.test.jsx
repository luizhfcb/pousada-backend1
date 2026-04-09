import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { AdminDashboard } from './AdminDashboard'

describe('AdminDashboard', () => {
  it('shows a cleaner hero without backend wording', () => {
    render(
      <AdminDashboard
        error=""
        loading={false}
        onCreateBadge={vi.fn()}
        onCreateReservation={vi.fn()}
        onCreateRoom={vi.fn()}
        onCreateService={vi.fn()}
        onDeleteReservation={vi.fn()}
        onDeleteRoom={vi.fn()}
        onLogout={vi.fn()}
        onUpdateReservation={vi.fn()}
        onUpdateRoom={vi.fn()}
        reservations={[]}
        rooms={[]}
        services={[]}
        users={[]}
      />,
    )

    expect(
      screen.getByRole('heading', { name: /painel administrativo/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sair/i }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/tudo aqui já conversa com o backend/i)).toBeNull()
  })
})
