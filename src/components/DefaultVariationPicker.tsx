import { usePreferences } from '../state/PreferencesContext'

export default function DefaultVariationPicker() {
  const { state, dispatch } = usePreferences()

  return (
    <div aria-label="Mode bacaan default" className="row">
      {(['pendek', 'panjang'] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          className={`btn btn-chip ${state.defaultVariation === mode ? '' : 'btn-outline'}`}
          onClick={() => dispatch({ type: 'SET_DEFAULT_VARIATION', value: mode })}
          title={`Pilih mode ${mode}`}
        >
          {mode === 'pendek' ? 'Pendek' : 'Panjang'}
        </button>
      ))}
    </div>
  )
}


