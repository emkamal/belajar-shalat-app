import { usePreferences } from '../state/PreferencesContext'

function ToggleRow({ label, checked, onChange, id }: {
  label: string
  checked: boolean
  id: string
  onChange: (value: boolean) => void
}) {
  return (
    <label htmlFor={id} className="row" style={{ alignItems: 'center' }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}

export default function ToggleGroup() {
  const { state, dispatch } = usePreferences()

  return (
    <div className="toggle-group" aria-label="Pengaturan tampilan bacaan">
      <div style={{ display: 'grid', gap: 8 }}>
        <ToggleRow
          id="toggle-arab"
          label="Tampilkan Arab"
          checked={state.showArab}
          onChange={(v) => dispatch({ type: 'SET_SHOW_ARAB', value: v })}
        />
        <ToggleRow
          id="toggle-latin"
          label="Tampilkan Latin"
          checked={state.showLatin}
          onChange={(v) => dispatch({ type: 'SET_SHOW_LATIN', value: v })}
        />
        <ToggleRow
          id="toggle-terjemahan"
          label="Tampilkan Terjemahan"
          checked={state.showTerjemahan}
          onChange={(v) => dispatch({ type: 'SET_SHOW_TERJEMAHAN', value: v })}
        />
      </div>
    </div>
  )
}


