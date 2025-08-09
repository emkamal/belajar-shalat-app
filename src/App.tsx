import { Suspense } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AppRoutes from './routes'
import { usePreferences } from './state/PreferencesContext'

function App() {
  const { state } = usePreferences()
  const navigate = useNavigate()
  const location = useLocation()

  const toggleTheme = () => {
    const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'system' : 'light'
    dispatch({ type: 'SET_THEME', value: next })
  }

  return (
    <>
      <header className="container app-header">
        <div className="app-header__bar">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <h1 className="app-title">BelajarShalatApp</h1>
          </Link>
          <div className="menu">
            {location.pathname.startsWith('/settings') ? (
              <button
                type="button"
                aria-label="Kembali"
                title="Kembali"
                className="btn btn-outline"
                onClick={() => navigate(-1)}
              >
                ←
              </button>
            ) : (
              <button
                type="button"
                aria-label="Buka halaman pengaturan"
                title="Pengaturan"
                className="btn btn-outline"
                onClick={() => navigate('/settings')}
              >
                ⚙️
              </button>
            )}
          </div>
        </div>
      </header>

      <Suspense fallback={<main className="container">Loading...</main>}>
        <AppRoutes />
      </Suspense>
    </>
  )
}

export default App
