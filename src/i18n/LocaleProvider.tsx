import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocaleContext } from './context'
import { defaultLocale, isLocale, type Locale } from './types'

const STORAGE_KEY = 'locale'

/** An explicit choice by the reader, or `null` while they are still following the browser. */
function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored !== null && isLocale(stored) ? stored : null
}

/** First of `navigator.languages` this site actually speaks. */
function browserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale

  const preferred = navigator.languages ?? [navigator.language]
  for (const tag of preferred) {
    const base = tag.split('-')[0]?.toLowerCase() ?? ''
    if (isLocale(base)) return base
  }
  return defaultLocale
}

/**
 * Follows the browser's language list until the reader picks a language, then
 * honours that choice. As with the theme, persisting on mount would pin the
 * first detected value forever, so storage is only written on an explicit
 * toggle.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<Locale | null>(readStoredLocale)
  const [detected, setDetected] = useState<Locale>(browserLocale)

  useEffect(() => {
    const onLanguageChange = () => setDetected(browserLocale())
    window.addEventListener('languagechange', onLanguageChange)
    return () => window.removeEventListener('languagechange', onLanguageChange)
  }, [])

  const locale = choice ?? detected

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next)
    setChoice(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }, [locale, setLocale])

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}
