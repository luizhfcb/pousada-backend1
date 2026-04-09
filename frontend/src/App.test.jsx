import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach } from 'vitest'

import App from './App'
import { clearAuthToken, setAuthToken } from './lib/auth'

describe('app routing', () => {
  afterEach(() => {
    clearAuthToken()
  })

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

  it('shows logged-in state on the public header when a token exists', () => {
    setAuthToken('jwt-demo-token')

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: /abrir painel/i }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /acesso da equipe/i })).toBeNull()
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

  it('keeps authenticated users inside the admin area', () => {
    setAuthToken('jwt-demo-token')

    render(
      <MemoryRouter initialEntries={['/admin/login']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /painel administrativo/i }),
    ).toBeInTheDocument()
  })
})
