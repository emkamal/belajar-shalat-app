import { lazy } from 'react'
import { RouteObject, useRoutes, Navigate } from 'react-router-dom'

const HomePage = lazy(() => import('../pages/HomePage'))
const SlidePage = lazy(() => import('../pages/SlidePage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))

function AppRoutes() {
  const routes: RouteObject[] = [
    { path: '/', element: <HomePage /> },
    { path: '/slides/:id', element: <SlidePage /> },
    { path: '/settings', element: <SettingsPage /> },
    // SPA fallback
    { path: '*', element: <Navigate to="/" replace /> },
  ]

  const element = useRoutes(routes)
  return element
}

export default AppRoutes


