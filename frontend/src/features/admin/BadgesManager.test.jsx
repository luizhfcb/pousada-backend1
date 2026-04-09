import { render, screen } from '@testing-library/react'

import { BadgesManager } from './BadgesManager'

describe('BadgesManager', () => {
  it('renders an issued badges list with employee information', () => {
    render(
      <BadgesManager
        badges={[
          {
            _id: 'badge-1',
            codigoRfid: 'RF-001',
            dataEmissao: '2026-04-09T00:00:00.000Z',
            usuario: {
              _id: 'user-1',
              nome: 'Ana',
              cargo: 'admin',
            },
          },
        ]}
        onCreate={async () => {}}
        users={[]}
      />,
    )

    expect(screen.getByText(/rf-001/i)).toBeInTheDocument()
    expect(screen.getByText(/ana/i)).toBeInTheDocument()
    expect(screen.getByText(/admin/i)).toBeInTheDocument()
  })
})
