import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'
export type FontSize = 'small' | 'medium' | 'large'
export type DefaultVariation = 'pendek' | 'panjang'

export interface PreferencesState {
  showArab: boolean
  showLatin: boolean
  showTerjemahan: boolean
  fontSize: FontSize
  defaultVariation: DefaultVariation
  theme: ThemePreference
}

type PreferencesAction =
  | { type: 'SET_SHOW_ARAB'; value: boolean }
  | { type: 'SET_SHOW_LATIN'; value: boolean }
  | { type: 'SET_SHOW_TERJEMAHAN'; value: boolean }
  | { type: 'SET_FONT_SIZE'; value: FontSize }
  | { type: 'SET_DEFAULT_VARIATION'; value: DefaultVariation }
  | { type: 'SET_THEME'; value: ThemePreference }

const DEFAULT_STATE: PreferencesState = {
  showArab: true,
  showLatin: true,
  showTerjemahan: true,
  fontSize: 'medium',
  defaultVariation: 'pendek',
  theme: 'system',
}

const STORAGE_KEY = 'bsapp.preferences.v1'

function reducer(state: PreferencesState, action: PreferencesAction): PreferencesState {
  switch (action.type) {
    case 'SET_SHOW_ARAB':
      return { ...state, showArab: action.value }
    case 'SET_SHOW_LATIN':
      return { ...state, showLatin: action.value }
    case 'SET_SHOW_TERJEMAHAN':
      return { ...state, showTerjemahan: action.value }
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.value }
    case 'SET_DEFAULT_VARIATION':
      return { ...state, defaultVariation: action.value }
    case 'SET_THEME':
      return { ...state, theme: action.value }
    default:
      return state
  }
}

function safeHydrate(): PreferencesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PreferencesState>
      return { ...DEFAULT_STATE, ...parsed }
    }
  } catch {
    // ignore
  }
  return DEFAULT_STATE
}

function getSystemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(theme: ThemePreference): void {
  const root = document.documentElement
  const effectiveDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark())
  if (effectiveDark) {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

interface PreferencesContextValue {
  state: PreferencesState
  dispatch: React.Dispatch<PreferencesAction>
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, safeHydrate)

  // Debounced persistence
  const firstRunRef = useRef(true)
  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false
      return
    }
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch {
        // ignore
      }
    }, 200)
    return () => clearTimeout(handle)
  }, [state])

  // Apply theme and listen to system changes when in 'system'
  useEffect(() => {
    applyTheme(state.theme)
    if (state.theme !== 'system' || typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => applyTheme('system')
    mq.addEventListener?.('change', listener)
    return () => mq.removeEventListener?.('change', listener)
  }, [state.theme])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider')
  return ctx
}


