/**
 * /admin/src/hooks/useDrafts.ts
 * Wraps all draft API operations with local state management.
 *
 * Dependencies: react, ../api/client, ../types
 */

import { useState, useCallback } from 'react'
import { api } from '../api/client'
import type { Draft, CreateDraftDTO } from '../types'

export function useDrafts() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDrafts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.drafts.list()
      setDrafts(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load drafts')
    } finally {
      setLoading(false)
    }
  }, [])

  const selectDraft = useCallback((id: string | null) => {
    setActiveDraftId(id)
  }, [])

  const createDraft = useCallback(async (dto: CreateDraftDTO): Promise<Draft> => {
    setError(null)
    const draft = await api.drafts.create(dto)
    setDrafts(prev => [draft, ...prev])
    setActiveDraftId(draft.id)
    return draft
  }, [])

  const deleteDraft = useCallback(async (id: string) => {
    setError(null)
    try {
      await api.drafts.delete(id)
      setDrafts(prev => prev.filter(d => d.id !== id))
      setActiveDraftId(prev => prev === id ? null : prev)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete draft')
    }
  }, [])

  const publishDraft = useCallback(async (id: string): Promise<{ slug: string }> => {
    setError(null)
    const result = await api.posts.publish(id)
    setDrafts(prev =>
      prev.map(d => d.id === id ? { ...d, status: 'published' as const } : d)
    )
    return result
  }, [])

  return {
    drafts,
    activeDraftId,
    loading,
    error,
    loadDrafts,
    selectDraft,
    createDraft,
    deleteDraft,
    publishDraft,
  }
}
