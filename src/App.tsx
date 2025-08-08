import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import AppRoutes from './routes'
import { usePreferences } from './state/PreferencesContext'

function App() {
  const { state, dispatch } = usePreferences()

  const toggleTheme = () => {
    const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'system' : 'light'
    dispatch({ type: 'SET_THEME', value: next })
  }

  return (
    <>
      <header className="container" style={{ paddingTop: 24, paddingBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <h1 style={{ margin: 0, fontSize: 24 }}>BelajarShalatApp</h1>
          </Link>
          <button
            type="button"
            aria-label="Toggle theme"
            title={`Theme: ${state.theme}. Click to change`}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-muted)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
            }}
            onClick={toggleTheme}
          >
            Tema: {state.theme}
          </button>
        </div>
      </header>

      <Suspense fallback={<main className="container">Loading...</main>}>
        <AppRoutes />
      </Suspense>
    </>
  )
}

export default App
