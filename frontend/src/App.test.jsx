import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from './App'

describe('app routing', () => {
  it('shows the public landing page on root', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: /descanso leve em um ambiente acolhedor para toda a família/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /conhecer diferenciais/i }),
    ).toBeInTheDocument()
  })

  it('redirects unauthenticated users to admin login', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /acessar área administrativa/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /voltar para a home/i }),
    ).toBeInTheDocument()
  })
})
