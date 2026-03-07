/**
 * /admin/src/types/index.ts
 * Shared frontend types — mirrors /server/src/shared/types.ts.
 */

export interface Draft {
  id: string
  name: string
  title: string
  content: string
  author: string
  tags: string[]
  description: string
  cover?: string
  series?: string
  seoTitle?: string
  seoDescription?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface CreateDraftDTO {
  name: string
  title?: string
  content?: string
}

export interface UpdateDraftDTO {
  name?: string
  title?: string
  content?: string
  author?: string
  tags?: string[]
  description?: string
  cover?: string
  series?: string
  seoTitle?: string
  seoDescription?: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
}
