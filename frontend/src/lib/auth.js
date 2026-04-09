const AUTH_TOKEN_KEY = 'pousada.auth.token'

export function getAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setAuthToken(token) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearAuthToken() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isAuthenticated() {
  return Boolean(getAuthToken())
}

function decodeTokenPayload(token) {
  if (!token) {
    return null
  }

  try {
    const [, payload] = token.split('.')

    if (!payload) {
      return null
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decodedPayload = window.atob(normalizedPayload)

    return JSON.parse(decodedPayload)
  } catch {
    return null
  }
}

export function getAuthRole() {
  return decodeTokenPayload(getAuthToken())?.cargo || null
}

export function isAdminAuthenticated() {
  return getAuthRole() === 'admin'
}
