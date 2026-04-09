import { afterEach, describe, expect, it } from 'vitest'

import {
  clearAuthToken,
  getAuthRole,
  getAuthToken,
  isAdminAuthenticated,
  isAuthenticated,
  setAuthToken,
} from './auth'

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

describe('auth storage helpers', () => {
  afterEach(() => {
    clearAuthToken()
  })

  it('stores and reads the auth token from localStorage', () => {
    setAuthToken(createToken({ id: 'user-1', cargo: 'admin' }))

    expect(getAuthToken()).toBeTruthy()
    expect(isAuthenticated()).toBe(true)
  })

  it('extracts the user role from the JWT payload', () => {
    setAuthToken(createToken({ id: 'user-1', cargo: 'admin' }))

    expect(getAuthRole()).toBe('admin')
    expect(isAdminAuthenticated()).toBe(true)
  })

  it('returns false for non-admin authenticated users', () => {
    setAuthToken(createToken({ id: 'user-2', cargo: 'limpeza' }))

    expect(isAuthenticated()).toBe(true)
    expect(isAdminAuthenticated()).toBe(false)
  })

  it('removes the token from storage', () => {
    setAuthToken(createToken({ id: 'user-1', cargo: 'admin' }))

    clearAuthToken()

    expect(getAuthToken()).toBeNull()
    expect(getAuthRole()).toBeNull()
    expect(isAuthenticated()).toBe(false)
  })
})
