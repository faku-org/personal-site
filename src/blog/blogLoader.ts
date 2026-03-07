/**
 * /src/blog/blogLoader.ts
 * Central data layer for the blog system.
 * Reads all .md files from /posts at build time using Vite's import.meta.glob,
 * parses frontmatter with gray-matter, computes derived fields, and exports
 * a typed post list.
 *
 * Dependencies: gray-matter, buffer (polyfill)
 */

import { Buffer } from 'buffer'
import matter from 'gray-matter'

// Ensure Buffer is available globally for gray-matter
;(globalThis as Record<string, unknown>).Buffer =
  (globalThis as Record<string, unknown>).Buffer ?? Buffer

/* ─── Types ─── */

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  description: string
  cover?: string
  series?: string
  seoTitle?: string
  seoDescription?: string
  readingTime: string
  content: string
}

/* ─── Raw MD Loading ─── */

const modules = import.meta.glob('/posts/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

/* ─── Helpers ─── */

function computeReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min`
}

function slugFromPath(filePath: string): string {
  return filePath
    .split('/')
    .pop()!
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
}

/* ─── Parse & Build Posts ─── */

const posts: BlogPost[] = []

for (const [filePath, raw] of Object.entries(modules)) {
  const { data, content } = matter(raw)

  // Validate required fields
  const missing: string[] = []
  if (!data.title) missing.push('title')
  if (!data.date) missing.push('date')
  if (!data.tags) missing.push('tags')
  if (!data.author) missing.push('author')

  if (missing.length > 0) {
    console.warn(
      `[blog] Skipping "${filePath}": missing required fields: ${missing.join(', ')}`
    )
    continue
  }

  posts.push({
    slug: slugFromPath(filePath),
    title: data.title,
    date: data.date,
    author: data.author,
    tags: Array.isArray(data.tags) ? data.tags : [data.tags],
    description: data.description ?? '',
    cover: data.cover,
    series: data.series,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    readingTime: computeReadingTime(content),
    content,
  })
}

// Sort by date descending
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

/* ─── Public API ─── */

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}
