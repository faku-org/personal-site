/**
 * /server/src/modules/posts/posts.router.ts
 * Elysia plugin exposing publish and list-published endpoints.
 * Receives PostsService via factory function (dependency injection).
 *
 * Dependencies: elysia, ../posts/posts.service, ../../shared/types
 */

import { Elysia, t } from 'elysia'
import type { PostsService } from './posts.service'
import type { ApiResponse } from '../../shared/types'

export function createPostsRouter(service: PostsService) {
  return new Elysia({ prefix: '/api/posts' })

    .post('/publish', async ({ body, set }): Promise<ApiResponse<{ slug: string } | null>> => {
      try {
        const result = await service.publishDraft(body.draftId)
        return { data: { slug: result.slug } }
      } catch (e) {
        set.status = 400
        return { data: null, error: e instanceof Error ? e.message : 'Publish failed' }
      }
    }, {
      body: t.Object({ draftId: t.String() }),
    })

    .get('/', ({ set }): ApiResponse<string[]> => {
      try {
        return { data: service.listPublished() }
      } catch (e) {
        set.status = 500
        return { data: [], error: e instanceof Error ? e.message : 'Internal error' }
      }
    })
}
