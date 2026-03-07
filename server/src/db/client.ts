/**
 * /server/src/db/client.ts
 * SQLite singleton factory using bun:sqlite.
 * Creates the database file and parent directories if they don't exist.
 *
 * Dependencies: bun:sqlite, node:fs, node:path
 */

import { Database } from 'bun:sqlite'
import { mkdirSync } from 'fs'
import { dirname } from 'path'

export function createDatabase(dbPath: string): Database {
  mkdirSync(dirname(dbPath), { recursive: true })
  return new Database(dbPath, { create: true })
}
