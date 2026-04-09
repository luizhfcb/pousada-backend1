import { Navigate, Outlet } from 'react-router-dom'

import { clearAuthToken, isAdminAuthenticated, isAuthenticated } from '../lib/auth'

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  if (!isAdminAuthenticated()) {
    clearAuthToken()
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
