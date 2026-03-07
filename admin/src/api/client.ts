/**
 * /admin/src/api/client.ts
 * Typed fetch wrapper for the Elysia API.
 * Base URL defaults to empty string (same-origin via Vite proxy in dev).
 *
 * Dependencies: ../types
 */

import type { Draft, CreateDraftDTO, UpdateDraftDTO, ApiResponse } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || ''

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body: ApiResponse<unknown> = await res.json().catch(() => ({ data: null, error: res.statusText }))
    throw new ApiError(res.status, body.error ?? res.statusText)
  }

  const json: ApiResponse<T> = await res.json()
  return json.data
}

export const api = {
  drafts: {
    list:     ()                                   => request<Draft[]>('/api/drafts'),
    get:      (id: string)                         => request<Draft>(`/api/drafts/${encodeURIComponent(id)}`),
    create:   (dto: CreateDraftDTO)                => request<Draft>('/api/drafts', { method: 'POST', body: JSON.stringify(dto) }),
    update:   (id: string, dto: UpdateDraftDTO)    => request<Draft>(`/api/drafts/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(dto) }),
    autoSave: (id: string, dto: UpdateDraftDTO)    => request<Draft>(`/api/drafts/${encodeURIComponent(id)}/autosave`, { method: 'PATCH', body: JSON.stringify(dto) }),
    delete:   (id: string)                         => request<void>(`/api/drafts/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  },
  posts: {
    publish: (draftId: string) => request<{ slug: string }>('/api/posts/publish', { method: 'POST', body: JSON.stringify({ draftId }) }),
    list:    ()                => request<string[]>('/api/posts'),
  },
  tags: {
    list:   ()             => request<string[]>('/api/tags'),
    create: (tag: string)  => request<void>('/api/tags', { method: 'POST', body: JSON.stringify({ tag }) }),
  },
}
