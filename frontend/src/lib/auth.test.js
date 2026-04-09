import { afterEach, describe, expect, it } from 'vitest'

import {
  clearAuthToken,
  getAuthToken,
  isAuthenticated,
  setAuthToken,
} from './auth'

describe('auth storage helpers', () => {
  afterEach(() => {
    clearAuthToken()
  })

  it('stores and reads the auth token from localStorage', () => {
    setAuthToken('jwt-demo-token')

    expect(getAuthToken()).toBe('jwt-demo-token')
    expect(isAuthenticated()).toBe(true)
  })

  it('removes the token from storage', () => {
    setAuthToken('jwt-demo-token')

    clearAuthToken()

    expect(getAuthToken()).toBeNull()
    expect(isAuthenticated()).toBe(false)
  })
})
