import { createContext } from 'react'
import { defaultLocale, type Locale } from './types'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  toggleLocale: () => {},
})
