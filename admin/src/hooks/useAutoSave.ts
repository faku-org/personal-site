/**
 * /admin/src/hooks/useAutoSave.ts
 * Debounced auto-save hook (1500ms delay).
 * Tracks save status: idle | saving | saved | error.
 *
 * Dependencies: react, ../api/client, ../types
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { api } from '../api/client'
import type { UpdateDraftDTO } from '../types'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useAutoSave(
  draftId: string | null,
  dto: UpdateDraftDTO,
  enabled: boolean,
) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dtoRef = useRef(dto)
  dtoRef.current = dto

  // Serialized DTO for stable dependency comparison
  const dtoKey = JSON.stringify(dto)

  useEffect(() => {
    if (!enabled || !draftId) {
      return
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving')
      try {
        await api.drafts.autoSave(draftId, dtoRef.current)
        setSaveStatus('saved')
      } catch {
        setSaveStatus('error')
      }
    }, 1500)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftId, dtoKey, enabled])

  const triggerSave = useCallback(async () => {
    if (!draftId) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setSaveStatus('saving')
    try {
      await api.drafts.autoSave(draftId, dtoRef.current)
      setSaveStatus('saved')
    } catch {
      setSaveStatus('error')
    }
  }, [draftId])

  return { saveStatus, triggerSave }
}
