/**
 * /server/src/modules/drafts/drafts.repository.ts
 * Pure data-access layer for drafts and known_tags tables.
 * No business logic — only SQL operations with parameterized queries.
 *
 * Dependencies: bun:sqlite, nanoid, ../../shared/types
 */

import type { Database } from 'bun:sqlite'
import { nanoid } from 'nanoid'
import type { Draft, CreateDraftDTO, UpdateDraftDTO } from '../../shared/types'

/** Row shape returned by SQLite (snake_case columns) */
interface DraftRow {
  id: string
  name: string
  title: string
  content: string
  author: string
  tags: string
  description: string
  cover: string | null
  series: string | null
  seo_title: string | null
  seo_description: string | null
  status: string
  created_at: string
  updated_at: string
}

/** Map a SQLite row to the application Draft interface */
function toDraft(row: DraftRow): Draft {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    content: row.content,
    author: row.author,
    tags: JSON.parse(row.tags) as string[],
    description: row.description,
    cover: row.cover ?? undefined,
    series: row.series ?? undefined,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    status: row.status as Draft['status'],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export class DraftsRepository {
  constructor(private db: Database) {}

  findAll(): Draft[] {
    const rows = this.db.prepare(
      'SELECT * FROM drafts ORDER BY updated_at DESC'
    ).all() as DraftRow[]
    return rows.map(toDraft)
  }

  findById(id: string): Draft | null {
    const row = this.db.prepare(
      'SELECT * FROM drafts WHERE id = ?'
    ).get(id) as DraftRow | null
    return row ? toDraft(row) : null
  }

  create(dto: CreateDraftDTO): Draft {
    const id = nanoid()
    const now = new Date().toISOString()
    this.db.prepare(`
      INSERT INTO drafts (id, name, title, content, author, tags, description, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'Faku', '[]', '', 'draft', ?, ?)
    `).run(id, dto.name, dto.title ?? '', dto.content ?? '', now, now)
    return this.findById(id)!
  }

  update(id: string, dto: UpdateDraftDTO): Draft | null {
    const existing = this.findById(id)
    if (!existing) return null

    const now = new Date().toISOString()

    // Build SET clause — field names are hardcoded literals (safe from injection)
    const setClauses: string[] = []
    const values: string[] = []

    if (dto.name !== undefined)           { setClauses.push('name = ?');            values.push(dto.name) }
    if (dto.title !== undefined)          { setClauses.push('title = ?');           values.push(dto.title) }
    if (dto.content !== undefined)        { setClauses.push('content = ?');         values.push(dto.content) }
    if (dto.author !== undefined)         { setClauses.push('author = ?');          values.push(dto.author) }
    if (dto.tags !== undefined)           { setClauses.push('tags = ?');            values.push(JSON.stringify(dto.tags)) }
    if (dto.description !== undefined)    { setClauses.push('description = ?');     values.push(dto.description) }
    if (dto.cover !== undefined)          { setClauses.push('cover = ?');           values.push(dto.cover) }
    if (dto.series !== undefined)         { setClauses.push('series = ?');          values.push(dto.series) }
    if (dto.seoTitle !== undefined)       { setClauses.push('seo_title = ?');       values.push(dto.seoTitle) }
    if (dto.seoDescription !== undefined) { setClauses.push('seo_description = ?'); values.push(dto.seoDescription) }

    setClauses.push('updated_at = ?')
    values.push(now)
    values.push(id) // WHERE clause parameter

    this.db.prepare(
      `UPDATE drafts SET ${setClauses.join(', ')} WHERE id = ?`
    ).run(...values)

    return this.findById(id)
  }

  updateStatus(id: string, status: Draft['status']): void {
    const now = new Date().toISOString()
    this.db.prepare(
      'UPDATE drafts SET status = ?, updated_at = ? WHERE id = ?'
    ).run(status, now, id)
  }

  delete(id: string): boolean {
    const existing = this.findById(id)
    if (!existing) return false
    this.db.prepare('DELETE FROM drafts WHERE id = ?').run(id)
    return true
  }

  /* ─── Known Tags ─── */

  findAllTags(): string[] {
    const rows = this.db.prepare(
      'SELECT tag FROM known_tags ORDER BY tag'
    ).all() as { tag: string }[]
    return rows.map(r => r.tag)
  }

  addTag(tag: string): void {
    this.db.prepare(
      'INSERT OR IGNORE INTO known_tags (tag) VALUES (?)'
    ).run(tag)
  }
}
