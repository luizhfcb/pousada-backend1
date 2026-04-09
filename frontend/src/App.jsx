import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminLayout } from './layouts/AdminLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { HomePage } from './pages/HomePage'
import { RoomsPage } from './pages/RoomsPage'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<RoomsPage />} path="/quartos" />
      </Route>

      <Route element={<AdminLoginPage />} path="/admin/login" />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route element={<AdminDashboardPage />} path="/admin" />
        </Route>
      </Route>

      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}

export default App
