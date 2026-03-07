/**
 * /server/src/modules/posts/posts.service.ts
 * Handles publishing drafts to /posts as .md files.
 * Depends on DraftsService and a postsDir path (injected).
 *
 * Dependencies: ../drafts/drafts.service, ../../shared/slugify, ../../shared/frontmatter
 */

import { readdirSync } from 'fs'
import { resolve } from 'path'
import type { DraftsService } from '../drafts/drafts.service'
import { slugify } from '../../shared/slugify'
import { serializeFrontmatter } from '../../shared/frontmatter'

export class PostsService {
  constructor(
    private draftsService: DraftsService,
    private postsDir: string,
  ) {}

  async publishDraft(draftId: string): Promise<{ slug: string; filePath: string }> {
    const draft = this.draftsService.getDraft(draftId)

    // Validate required fields
    const errors: string[] = []
    if (!draft.title.trim())       errors.push('title is required')
    if (!draft.author.trim())      errors.push('author is required')
    if (!draft.tags.length)        errors.push('at least one tag is required')
    if (!draft.description.trim()) errors.push('description is required')
    if (errors.length > 0) {
      throw new Error(`Cannot publish: ${errors.join(', ')}`)
    }

    const slug = slugify(draft.title)
    const filePath = resolve(this.postsDir, `${slug}.md`)
    const fileContent = serializeFrontmatter(draft)

    await Bun.write(filePath, fileContent)

    this.draftsService.updateDraftStatus(draftId, 'published')

    return { slug, filePath }
  }

  listPublished(): string[] {
    try {
      return readdirSync(this.postsDir)
        .filter(f => f.endsWith('.md'))
        .sort()
    } catch {
      return []
    }
  }
}
