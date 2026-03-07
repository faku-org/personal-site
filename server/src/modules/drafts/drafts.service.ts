/**
 * /server/src/modules/drafts/drafts.service.ts
 * Business logic for draft CRUD and tag management.
 * Depends on DraftsRepository via constructor injection.
 *
 * Dependencies: ./drafts.repository, ../../shared/types
 */

import type { DraftsRepository } from './drafts.repository'
import type { Draft, CreateDraftDTO, UpdateDraftDTO } from '../../shared/types'

export class DraftsService {
  constructor(private repository: DraftsRepository) {}

  listDrafts(): Draft[] {
    return this.repository.findAll()
  }

  getDraft(id: string): Draft {
    const draft = this.repository.findById(id)
    if (!draft) throw new Error(`Draft not found: ${id}`)
    return draft
  }

  createDraft(dto: CreateDraftDTO): Draft {
    return this.repository.create(dto)
  }

  updateDraft(id: string, dto: UpdateDraftDTO): Draft {
    const draft = this.repository.update(id, dto)
    if (!draft) throw new Error(`Draft not found: ${id}`)
    return draft
  }

  deleteDraft(id: string): void {
    const deleted = this.repository.delete(id)
    if (!deleted) throw new Error(`Draft not found: ${id}`)
  }

  /** Semantic alias for update — separated for future rate-limiting */
  autoSaveDraft(id: string, dto: UpdateDraftDTO): Draft {
    const draft = this.repository.update(id, dto)
    if (!draft) throw new Error(`Draft not found: ${id}`)
    return draft
  }

  updateDraftStatus(id: string, status: Draft['status']): void {
    this.repository.updateStatus(id, status)
  }

  /* ─── Tags ─── */

  listTags(): string[] {
    return this.repository.findAllTags()
  }

  addTag(tag: string): void {
    this.repository.addTag(tag)
  }
}
