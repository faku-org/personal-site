/**
 * /server/src/modules/drafts/drafts.router.ts
 * Elysia plugin exposing draft CRUD and tag endpoints.
 * Receives DraftsService via factory function (dependency injection).
 *
 * Dependencies: elysia, ../drafts/drafts.service, ../../shared/types
 */

import { Elysia, t } from 'elysia'
import type { DraftsService } from './drafts.service'
import type { ApiResponse, Draft } from '../../shared/types'

const updateDraftSchema = t.Partial(
  t.Object({
    name: t.String(),
    title: t.String(),
    content: t.String(),
    author: t.String(),
    tags: t.Array(t.String()),
    description: t.String(),
    cover: t.String(),
    series: t.String(),
    seoTitle: t.String(),
    seoDescription: t.String(),
  })
)

export function createDraftsRouter(service: DraftsService) {
  return new Elysia({ prefix: '/api' })

    /* ─── Drafts CRUD ─── */

    .get('/drafts', ({ set }): ApiResponse<Draft[]> => {
      try {
        return { data: service.listDrafts() }
      } catch (e) {
        set.status = 500
        return { data: [], error: e instanceof Error ? e.message : 'Internal error' }
      }
    })

    .get('/drafts/:id', ({ params, set }): ApiResponse<Draft | null> => {
      try {
        return { data: service.getDraft(params.id) }
      } catch (e) {
        set.status = 404
        return { data: null, error: e instanceof Error ? e.message : 'Not found' }
      }
    })

    .post('/drafts', ({ body, set }): ApiResponse<Draft | null> => {
      try {
        const draft = service.createDraft(body)
        set.status = 201
        return { data: draft }
      } catch (e) {
        set.status = 400
        return { data: null, error: e instanceof Error ? e.message : 'Bad request' }
      }
    }, {
      body: t.Object({
        name: t.String(),
        title: t.Optional(t.String()),
        content: t.Optional(t.String()),
      }),
    })

    .patch('/drafts/:id', ({ params, body, set }): ApiResponse<Draft | null> => {
      try {
        return { data: service.updateDraft(params.id, body) }
      } catch (e) {
        set.status = 404
        return { data: null, error: e instanceof Error ? e.message : 'Not found' }
      }
    }, {
      body: updateDraftSchema,
    })

    .delete('/drafts/:id', ({ params, set }): ApiResponse<null> => {
      try {
        service.deleteDraft(params.id)
        return { data: null }
      } catch (e) {
        set.status = 404
        return { data: null, error: e instanceof Error ? e.message : 'Not found' }
      }
    })

    .patch('/drafts/:id/autosave', ({ params, body, set }): ApiResponse<Draft | null> => {
      try {
        return { data: service.autoSaveDraft(params.id, body) }
      } catch (e) {
        set.status = 404
        return { data: null, error: e instanceof Error ? e.message : 'Not found' }
      }
    }, {
      body: updateDraftSchema,
    })

    /* ─── Tags ─── */

    .get('/tags', ({ set }): ApiResponse<string[]> => {
      try {
        return { data: service.listTags() }
      } catch (e) {
        set.status = 500
        return { data: [], error: e instanceof Error ? e.message : 'Internal error' }
      }
    })

    .post('/tags', ({ body, set }): ApiResponse<null> => {
      try {
        service.addTag(body.tag)
        set.status = 201
        return { data: null }
      } catch (e) {
        set.status = 400
        return { data: null, error: e instanceof Error ? e.message : 'Bad request' }
      }
    }, {
      body: t.Object({ tag: t.String() }),
    })
}
