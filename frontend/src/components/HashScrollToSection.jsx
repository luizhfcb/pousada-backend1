import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function HashScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const id = location.hash.replace('#', '')
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return null
}
