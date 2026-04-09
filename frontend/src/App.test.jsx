import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach } from 'vitest'

import App from './App'
import { clearAuthToken, setAuthToken } from './lib/auth'

function createToken(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
  const body = btoa(JSON.stringify(payload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')

  return `${header}.${body}.assinatura`
}

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
        name: /descanso leve em um ambiente acolhedor para toda a fam\u00edlia/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /conhecer diferenciais/i }),
    ).toBeInTheDocument()
  })

  it('shows logged-in state on the public header when an admin token exists', () => {
    setAuthToken(createToken({ id: 'user-1', cargo: 'admin' }))

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
      screen.getByRole('heading', { name: /acessar \u00e1rea administrativa/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /voltar para a home/i }),
    ).toBeInTheDocument()
  })

  it('keeps authenticated admin users inside the admin area', () => {
    setAuthToken(createToken({ id: 'user-1', cargo: 'admin' }))

    render(
      <MemoryRouter initialEntries={['/admin/login']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /painel administrativo/i }),
    ).toBeInTheDocument()
  })

  it('redirects authenticated non-admin users away from the admin area', () => {
    setAuthToken(createToken({ id: 'user-2', cargo: 'limpeza' }))

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: /descanso leve em um ambiente acolhedor para toda a fam\u00edlia/i,
      }),
    ).toBeInTheDocument()
  })
})
