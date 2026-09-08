import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocaleContext } from './context'
import { defaultLocale, isLocale, type Locale } from './types'

const STORAGE_KEY = 'locale'

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && isLocale(stored)) return stored

  const preferred = navigator.languages ?? [navigator.language]
  for (const tag of preferred) {
    const base = tag.split('-')[0]?.toLowerCase() ?? ''
    if (isLocale(base)) return base
  }
  return defaultLocale
}

/** Holds the active locale, persists it, and keeps `<html lang>` in sync. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale)
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === 'en' ? 'es' : 'en'))
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, toggleLocale],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}
