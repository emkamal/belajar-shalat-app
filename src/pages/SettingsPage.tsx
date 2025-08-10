import { usePreferences } from '../state/PreferencesContext'
import FontSizePicker from '../components/FontSizePicker'
import DefaultVariationPicker from '../components/DefaultVariationPicker'
import ToggleGroup from '../components/ToggleGroup'

function SettingsPage() {
  const { state, dispatch } = usePreferences()
  return (
    <main>
      <div className="card section">
        <h2 className="no-top-margin">Pengaturan</h2>
        <div className="ornate-divider" />

        <section className="section">
          <h3 className="section-title">Tema</h3>
          <div className="ornate-divider" />
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
          <h3 className="section-title">Ukuran Font</h3>
          <div className="ornate-divider" />
          <FontSizePicker />
        </section>

        <section className="section">
          <h3 className="section-title">Tampilan Bacaan</h3>
          <div className="ornate-divider" />
          <ToggleGroup />
        </section>

        <section className="section">
          <h3 className="section-title">Mode Bacaan</h3>
          <div className="ornate-divider" />
          <DefaultVariationPicker />
        </section>
      </div>
    </main>
  )
}

export default SettingsPage


