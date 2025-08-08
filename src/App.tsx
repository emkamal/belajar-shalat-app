import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import AppRoutes from './routes'
import { usePreferences } from './state/PreferencesContext'

function App() {
  const { state, dispatch } = usePreferences()
  const [menuOpen, setMenuOpen] = useState(false)

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
            <button
              type="button"
              aria-label="Menu"
              title="Menu"
              className="btn btn-outline"
              onClick={() => setMenuOpen((v) => !v)}
            >
              ☰
            </button>
            {menuOpen && (
              <div className="menu__panel">
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Pengaturan</strong>
                </div>
                <div className="section">
                  <button
                    type="button"
                    className="btn btn-outline btn-chip"
                    onClick={toggleTheme}
                    title={`Theme: ${state.theme}`}
                  >
                    Tema: {state.theme}
                  </button>
                </div>
                <div className="section">
                  <button
                    type="button"
                    className="btn btn-outline btn-chip"
                    onClick={() => dispatch({ type: 'SET_SHOW_CONFIG', value: !state.showConfig })}
                    aria-expanded={state.showConfig}
                  >
                    {state.showConfig ? 'Sembunyikan pengaturan slide' : 'Tampilkan pengaturan slide'}
                  </button>
                </div>
              </div>
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
