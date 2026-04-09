import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import { RoomsShowcase } from './RoomsShowcase'

vi.mock('../../lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}))

import { api } from '../../lib/api'

describe('RoomsShowcase', () => {
  it('renders rooms returned by the API', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          _id: '1',
          numero: '101',
          tipo: 'suite',
          precoDiaria: 350,
          disponivel: true,
        },
      ],
    })

    render(<RoomsShowcase />)

    expect(screen.getByText(/carregando acomodações/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/suíte serra 101/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/r\$ 350\/noite/i)).toBeInTheDocument()
  })

  it('shows a friendly error message when the request fails', async () => {
    api.get.mockRejectedValueOnce(new Error('network error'))

    render(<RoomsShowcase />)

    await waitFor(() => {
      expect(
        screen.getByText(/não foi possível carregar os quartos agora/i),
      ).toBeInTheDocument()
    })
  })
})
