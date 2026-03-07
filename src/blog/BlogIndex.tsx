/**
 * /src/blog/BlogIndex.tsx
 * Blog listing page — shows all posts as glass-morphism cards
 * with search, tag filtering, date filtering, and series filtering.
 *
 * Dependencies: react-router-dom, ../blog/blogLoader
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getAllTags } from './blogLoader'
import type { BlogPost } from './blogLoader'
import './BlogIndex.css'

/* ─── Date Filter Options ─── */

const DATE_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last year', value: '1y' },
] as const

type DateFilterValue = (typeof DATE_FILTERS)[number]['value']

function isWithinDateRange(postDate: string, filter: DateFilterValue): boolean {
  if (filter === 'all') return true
  const now = Date.now()
  const date = new Date(postDate).getTime()
  const ms: Record<string, number> = {
    '30d': 30 * 86_400_000,
    '6m': 182 * 86_400_000,
    '1y': 365 * 86_400_000,
  }
  return now - date <= ms[filter]
}

/* ─── Helpers ─── */

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

/* ─── Component ─── */

export default function BlogIndex() {
  const posts = getAllPosts()
  const allTags = getAllTags()

  // All unique series names
  const allSeries = useMemo(() => {
    const set = new Set<string>()
    for (const p of posts) {
      if (p.series) set.add(p.series)
    }
    return Array.from(set).sort()
  }, [posts])

  const [search, setSearch] = useState('')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [dateFilter, setDateFilter] = useState<DateFilterValue>('all')
  const [seriesFilter, setSeriesFilter] = useState('')

  /* ─── Toggle a tag ─── */
  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  /* ─── Filtered posts ─── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return posts.filter((p: BlogPost) => {
      // Search: title, description, tags
      if (q) {
        const haystack = [
          p.title,
          p.description,
          ...p.tags,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      // Tag filter (AND logic)
      for (const tag of activeTags) {
        if (!p.tags.includes(tag)) return false
      }
      // Date filter
      if (!isWithinDateRange(p.date, dateFilter)) return false
      // Series filter
      if (seriesFilter && p.series !== seriesFilter) return false
      return true
    })
  }, [posts, search, activeTags, dateFilter, seriesFilter])

  return (
    <section className="blog-index">
      <header className="blog-index__header">
        <h1 className="blog-index__title">Blog</h1>
        <p className="blog-index__subtitle">Thoughts on tech, design, and building things.</p>
      </header>

      {/* ─── Filters ─── */}
      <div className="blog-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search blog posts"
        />

        <div className="blog-filters__row">
          <select
            className="blog-filters__select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilterValue)}
            aria-label="Filter by date"
          >
            {DATE_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          {allSeries.length > 0 && (
            <select
              className="blog-filters__select"
              value={seriesFilter}
              onChange={(e) => setSeriesFilter(e.target.value)}
              aria-label="Filter by series"
            >
              <option value="">All series</option>
              {allSeries.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Tag pills */}
        <div className="blog-filters__tags" role="group" aria-label="Filter by tag">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-pill ${activeTags.has(tag) ? 'tag-pill--active' : ''}`}
              onClick={() => toggleTag(tag)}
              aria-pressed={activeTags.has(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Post Cards ─── */}
      {filtered.length === 0 ? (
        <div className="blog-empty">
          <p className="blog-empty__icon">📭</p>
          <p className="blog-empty__text">No posts match your filters. Try broadening your search!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {post.cover && (
                <div className="blog-card__cover">
                  <img src={post.cover} alt="" loading="lazy" />
                </div>
              )}
              <div className="blog-card__body">
                <h2 className="blog-card__title">{post.title}</h2>
                <div className="blog-card__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="blog-card__dot">·</span>
                  <span>{post.readingTime}</span>
                </div>
                <p className="blog-card__desc">{truncate(post.description, 120)}</p>
                <div className="blog-card__tags">
                  {post.tags.map((t) => (
                    <span key={t} className="tag-pill tag-pill--small">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
