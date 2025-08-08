import { usePreferences } from '../state/PreferencesContext'

export default function FontSizePicker() {
  const { state, dispatch } = usePreferences()

  return (
    <div aria-label="Ukuran font" style={{ display: 'flex', gap: 8 }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => dispatch({ type: 'SET_FONT_SIZE', value: size })}
          style={{
            border: '1px solid var(--color-muted)',
            background: state.fontSize === size ? 'var(--color-accent)' : 'transparent',
            color: state.fontSize === size ? '#fff' : 'inherit',
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            textTransform: 'capitalize',
          }}
        >
          {size}
        </button>
      ))}
    </div>
  )
}


