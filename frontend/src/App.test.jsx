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
        name: /um cantinho familiar para viver dias leves e descansar em paz/i,
      }),
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
  })
})
