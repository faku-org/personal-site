/**
 * /admin/src/components/UI/Input.tsx
 * Reusable label + input + error message component.
 * Glass style using design tokens.
 */

import type { InputHTMLAttributes } from 'react'
import './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`input-group ${error ? 'input-group--error' : ''} ${className}`.trim()}>
      {label && (
        <label className="input-group__label" htmlFor={inputId}>{label}</label>
      )}
      <input className="input-group__input" id={inputId} {...props} />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
}
