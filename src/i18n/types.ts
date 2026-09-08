// ─── Locales ───

export const locales = ['en', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** A value authored once per locale. */
export type L<T = string> = Readonly<Record<Locale, T>>

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Resolves a localized value, falling back to the default locale. */
export function pick<T>(value: L<T>, locale: Locale): T {
  return value[locale] ?? value[defaultLocale]
}

export const localeLabels: L = {
  en: 'EN',
  es: 'ES',
}
