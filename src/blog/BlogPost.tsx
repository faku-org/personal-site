/**
 * /src/blog/BlogPost.tsx
 * Individual blog post page — renders markdown with frontmatter metadata,
 * navigation links, and series badge.
 *
 * Dependencies: react-router-dom, marked, ../blog/blogLoader
 */

import { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { getAllPosts, getPostBySlug } from './blogLoader'
import './BlogPost.css'

// Configure marked for GitHub-flavored Markdown
marked.use({ gfm: true, breaks: true })

/* ─── Helpers ─── */

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/* ─── Component ─── */

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined
  const posts = getAllPosts()

  // Find prev/next posts (chronological order, posts are sorted date desc)
  const { prev, next } = useMemo(() => {
    if (!post) return { prev: undefined, next: undefined }
    const idx = posts.findIndex((p) => p.slug === post.slug)
    return {
      next: idx > 0 ? posts[idx - 1] : undefined,         // newer post
      prev: idx < posts.length - 1 ? posts[idx + 1] : undefined, // older post
    }
  }, [post, posts])

  // Render markdown to HTML
  const htmlContent = useMemo(() => {
    if (!post) return ''
    return marked.parse(post.content) as string
  }, [post])

  // SEO: update document title
  useEffect(() => {
    if (post) {
      document.title = post.seoTitle ?? post.title
    } else {
      document.title = 'Post Not Found'
    }
    return () => {
      document.title = 'Facundo Presa — Portfolio'
    }
  }, [post])

  /* ─── 404 State ─── */
  if (!post) {
    return (
      <section className="blog-post blog-post--404">
        <Link to="/blog" className="blog-post__back">← Back to Blog</Link>
        <div className="blog-post__404-content">
          <h1 className="blog-post__404-title">404</h1>
          <p className="blog-post__404-text">
            This post doesn't exist. Maybe it was moved, or perhaps it never was.
          </p>
          <Link to="/blog" className="blog-post__404-link">
            Browse all posts →
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="blog-post">
      <Link to="/blog" className="blog-post__back">← Back to Blog</Link>

      {/* ─── Cover ─── */}
      {post.cover && (
        <div className="blog-post__cover">
          <img src={post.cover} alt="" />
        </div>
      )}

      {/* ─── Header ─── */}
      <header className="blog-post__header">
        <h1 className="blog-post__title">{post.title}</h1>
        <div className="blog-post__meta">
          <span className="blog-post__author">{post.author}</span>
          <span className="blog-post__dot">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="blog-post__dot">·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="blog-post__tags">
          {post.tags.map((t) => (
            <span key={t} className="tag-pill tag-pill--small">{t}</span>
          ))}
        </div>
        {post.series && (
          <span className="blog-post__series-badge">
            Part of series: {post.series}
          </span>
        )}
      </header>

      {/* ─── Markdown Body ─── */}
      {/* Content is author-controlled (stored in repo), safe for dangerouslySetInnerHTML */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* ─── Prev / Next Navigation ─── */}
      <nav className="blog-post__nav" aria-label="Post navigation">
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className="blog-post__nav-link blog-post__nav-link--prev">
            <span className="blog-post__nav-dir">← Prev Post</span>
            <span className="blog-post__nav-title">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/blog/${next.slug}`} className="blog-post__nav-link blog-post__nav-link--next">
            <span className="blog-post__nav-dir">Next Post →</span>
            <span className="blog-post__nav-title">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
