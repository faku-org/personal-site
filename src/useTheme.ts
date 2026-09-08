import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

/** An explicit choice by the reader, or `null` while they are still following the OS. */
function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(DARK_QUERY).matches
}

/**
 * Follows `prefers-color-scheme` until the reader picks a side, then honours
 * that choice. Persisting only happens on an explicit toggle: writing storage
 * on mount would freeze whatever the OS happened to prefer on the first visit,
 * and the site would never track the system again.
 */
export function useTheme() {
  const [choice, setChoice] = useState<Theme | null>(readStoredTheme)
  const [systemDark, setSystemDark] = useState(systemPrefersDark)

  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const dark = choice !== null ? choice === 'dark' : systemDark

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleTheme = useCallback(() => {
    const next: Theme = dark ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    setChoice(next)
  }, [dark])

  return [dark, toggleTheme] as const
}
