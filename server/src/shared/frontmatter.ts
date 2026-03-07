/**
 * /server/src/shared/frontmatter.ts
 * Serializes a Draft object into a valid .md file string with YAML frontmatter.
 * Uses JSON.stringify for safe YAML string escaping.
 *
 * Dependencies: ../shared/types
 */

import type { Draft } from './types'

export function serializeFrontmatter(draft: Draft): string {
  const lines: string[] = ['---']

  lines.push(`title: ${JSON.stringify(draft.title)}`)
  lines.push(`date: "${new Date().toISOString().split('T')[0]}"`)
  lines.push(`author: ${JSON.stringify(draft.author)}`)
  lines.push(`tags: ${JSON.stringify(draft.tags)}`)
  lines.push(`description: ${JSON.stringify(draft.description)}`)

  if (draft.cover) {
    lines.push(`cover: ${JSON.stringify(draft.cover)}`)
  }
  if (draft.series) {
    lines.push(`series: ${JSON.stringify(draft.series)}`)
  }
  if (draft.seoTitle && draft.seoTitle !== draft.title) {
    lines.push(`seoTitle: ${JSON.stringify(draft.seoTitle)}`)
  }
  if (draft.seoDescription && draft.seoDescription !== draft.description) {
    lines.push(`seoDescription: ${JSON.stringify(draft.seoDescription)}`)
  }

  lines.push('---')
  lines.push('')
  lines.push(draft.content)

  return lines.join('\n')
}
