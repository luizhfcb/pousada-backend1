import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { HashScrollToSection } from './HashScrollToSection'

describe('HashScrollToSection', () => {
  it('scrolls to the section that matches the current hash', () => {
    const scrollIntoView = vi.fn()

    const element = document.createElement('section')
    element.id = 'reservas'
    element.scrollIntoView = scrollIntoView
    document.body.appendChild(element)

    render(
      <MemoryRouter initialEntries={['/admin#reservas']}>
        <HashScrollToSection />
      </MemoryRouter>,
    )

    expect(scrollIntoView).toHaveBeenCalled()

    document.body.removeChild(element)
  })
})
