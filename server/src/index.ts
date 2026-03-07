/**
 * /server/src/index.ts
 * Entry point — composes the Elysia app with dependency injection.
 *
 * Initialization order:
 * 1. SQLite client (singleton)
 * 2. Run migrations
 * 3. Repositories → Services → Routers
 * 4. Mount routers + CORS
 * 5. Listen
 *
 * Dependencies: elysia, ./db/*, ./modules/*, ./middleware/*
 */

import { Elysia } from 'elysia'
import { resolve } from 'path'
import { createDatabase } from './db/client'
import { runMigrations } from './db/migrations'
import { DraftsRepository } from './modules/drafts/drafts.repository'
import { DraftsService } from './modules/drafts/drafts.service'
import { PostsService } from './modules/posts/posts.service'
import { createDraftsRouter } from './modules/drafts/drafts.router'
import { createPostsRouter } from './modules/posts/posts.router'
import { createCorsMiddleware } from './middleware/cors'

/* ─── Configuration ─── */

const PORT = Number(process.env.PORT) || 3001
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:5174'
const DB_PATH = resolve(import.meta.dir, '../data/blog.sqlite')
const POSTS_DIR = resolve(import.meta.dir, '../../posts')

/* ─── 1. Database ─── */

const db = createDatabase(DB_PATH)
runMigrations(db)

/* ─── 2. Dependency graph: Repo → Service → Router ─── */

const draftsRepo    = new DraftsRepository(db)
const draftsService = new DraftsService(draftsRepo)
const postsService  = new PostsService(draftsService, POSTS_DIR)

/* ─── 3. Compose Elysia app ─── */

new Elysia()
  .use(createCorsMiddleware(ADMIN_ORIGIN))
  .use(createDraftsRouter(draftsService))
  .use(createPostsRouter(postsService))
  .listen(PORT)

console.log(`[server] running on http://localhost:${PORT}`)
