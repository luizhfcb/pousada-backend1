import axios from 'axios'

import { getAuthToken } from './auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function getApiErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.erro || fallbackMessage
}
