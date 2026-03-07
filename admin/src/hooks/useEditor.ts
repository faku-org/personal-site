/**
 * /admin/src/hooks/useEditor.ts
 * Editor state management hook.
 * Manages content, frontmatter, dirty state, and derived statistics.
 *
 * Dependencies: react, ../types
 */

import { useState, useMemo, useCallback } from 'react'
import type { Draft, UpdateDraftDTO } from '../types'

export function useEditor() {
  const [content, setContentState] = useState('')
  const [frontmatter, setFrontmatter] = useState<Partial<Draft>>({})
  const [isDirty, setIsDirty] = useState(false)

  const setContent = useCallback((value: string) => {
    setContentState(value)
    setIsDirty(true)
  }, [])

  const updateFrontmatter = useCallback((updates: Partial<Draft>) => {
    setFrontmatter(prev => ({ ...prev, ...updates }))
    setIsDirty(true)
  }, [])

  const loadDraft = useCallback((draft: Draft) => {
    setContentState(draft.content)
    setFrontmatter({
      title: draft.title,
      author: draft.author,
      tags: draft.tags,
      description: draft.description,
      cover: draft.cover,
      series: draft.series,
      seoTitle: draft.seoTitle,
      seoDescription: draft.seoDescription,
    })
    setIsDirty(false)
  }, [])

  const resetEditor = useCallback(() => {
    setContentState('')
    setFrontmatter({})
    setIsDirty(false)
  }, [])

  const { wordCount, readingTime } = useMemo(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0
    return {
      wordCount: words,
      readingTime: Math.max(1, Math.ceil(words / 200)),
    }
  }, [content])

  const charCount = content.length

  const getUpdateDTO = useCallback((): UpdateDraftDTO => ({
    content,
    title: frontmatter.title,
    author: frontmatter.author,
    tags: frontmatter.tags,
    description: frontmatter.description,
    cover: frontmatter.cover,
    series: frontmatter.series,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
  }), [content, frontmatter])

  return {
    content,
    frontmatter,
    isDirty,
    setContent,
    updateFrontmatter,
    loadDraft,
    resetEditor,
    wordCount,
    charCount,
    readingTime,
    getUpdateDTO,
  }
}
