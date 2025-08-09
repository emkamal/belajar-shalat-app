import { usePreferences } from '../state/PreferencesContext'
import FontSizePicker from '../components/FontSizePicker'
import DefaultVariationPicker from '../components/DefaultVariationPicker'

function SettingsPage() {
  const { state, dispatch } = usePreferences()
  return (
    <main>
      <div className="card section">
        <h2 style={{ marginTop: 0 }}>Pengaturan</h2>

        <section className="section">
          <h3 style={{ margin: 0, fontSize: 18 }}>Tema</h3>
          <div className="row section">
            {(['light', 'dark', 'system'] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={`btn btn-chip ${state.theme === t ? '' : 'btn-outline'}`}
                onClick={() => dispatch({ type: 'SET_THEME', value: t })}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <h3 style={{ margin: 0, fontSize: 18 }}>Ukuran Font</h3>
          <FontSizePicker />
        </section>

        <section className="section">
          <h3 style={{ margin: 0, fontSize: 18 }}>Mode Bacaan</h3>
          <DefaultVariationPicker />
        </section>
      </div>
    </main>
  )
}

export default SettingsPage


