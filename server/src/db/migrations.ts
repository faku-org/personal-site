/**
 * /server/src/db/migrations.ts
 * Auto-run schema definitions on server start.
 * Creates drafts and known_tags tables if they don't exist.
 *
 * Dependencies: bun:sqlite
 */

import type { Database } from 'bun:sqlite'

export function runMigrations(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS drafts (
      id              TEXT PRIMARY KEY,
      name            TEXT NOT NULL,
      title           TEXT NOT NULL DEFAULT '',
      content         TEXT NOT NULL DEFAULT '',
      author          TEXT NOT NULL DEFAULT 'Faku',
      tags            TEXT NOT NULL DEFAULT '[]',
      description     TEXT NOT NULL DEFAULT '',
      cover           TEXT,
      series          TEXT,
      seo_title       TEXT,
      seo_description TEXT,
      status          TEXT NOT NULL DEFAULT 'draft',
      created_at      TEXT NOT NULL,
      updated_at      TEXT NOT NULL
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS known_tags (
      tag TEXT PRIMARY KEY
    )
  `)
}
