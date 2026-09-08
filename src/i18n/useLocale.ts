import { useContext } from 'react'
import { LocaleContext, type LocaleContextValue } from './context'
import { pick, type L } from './types'

/** Reads the active locale and returns a `t()` bound to it. */
export function useLocale(): LocaleContextValue & { t: <T>(value: L<T>) => T } {
  const ctx = useContext(LocaleContext)
  return { ...ctx, t: (value) => pick(value, ctx.locale) }
}
