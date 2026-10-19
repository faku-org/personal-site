/**
 * Build-time SEO / GEO / AEO plugin.
 *
 * The site is a client-rendered SPA, which means the HTML a crawler downloads
 * is an empty `<div id="root">`. Social scrapers and most AI crawlers do not run
 * JavaScript, so they would see nothing. This plugin fixes that at build time:
 *
 *  1. Fills the `<!--seo-head-->` / `<!--seo-body-->` placeholders in
 *     `index.html` with the home page's meta tags, JSON-LD and a static,
 *     content-bearing fallback inside `#root` (React replaces it on mount).
 *  2. Emits a prerendered `blog/index.html` and `blog/<slug>/index.html` per
 *     post, each with its own title, Open Graph tags, JSON-LD and article body.
 *  3. Emits `sitemap.xml` and `llms-full.txt`, both generated from the same
 *     sources as the site (`src/config.ts`, `posts/`).
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import matter from 'gray-matter'
import { Marked } from 'marked'
import type { Plugin } from 'vite'
import { background, orgs, projects, siteConfig, socialLinks } from '../src/config'
import {
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  absoluteUrl,
  pageUrl,
} from '../src/seo/site'

/* ─── Posts ─── */

interface Post {
  slug: string
  title: string
  description: string
  seoTitle: string
  seoDescription: string
  date: string
  tags: string[]
  cover?: string
  content: string
}

const markdown = new Marked({ gfm: true, breaks: true })

function isoDate(value: unknown): string {
  const d = value instanceof Date ? value : new Date(String(value))
  return Number.isNaN(d.getTime()) ? String(value) : d.toISOString().slice(0, 10)
}

/** Mirrors `src/blog/blogLoader.ts`: same required fields, same slug rule, same sort. */
function loadPosts(root: string): Post[] {
  const dir = join(root, 'posts')
  const files = readdirSync(dir, { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.md'))
  const posts: Post[] = []

  for (const file of files) {
    const { data, content } = matter(readFileSync(join(dir, file), 'utf8'))
    if (!data.title || !data.date || !data.tags || !data.author) continue

    const slug = file.split(/[\\/]/).pop()!.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-')
    const description = String(data.description ?? '')
    posts.push({
      slug,
      title: String(data.title),
      description,
      seoTitle: String(data.seoTitle ?? data.title),
      seoDescription: String(data.seoDescription ?? description),
      date: isoDate(data.date),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [String(data.tags)],
      cover: data.cover ? String(data.cover) : undefined,
      content,
    })
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

/* ─── Escaping ─── */

function esc(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/** JSON inside a `<script>` must not be able to close the tag. */
function jsonLd(graph: object[]): string {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

/* ─── Structured data ─── */

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: siteConfig.name,
  url: `${SITE_URL}/`,
  email: siteConfig.email,
  jobTitle: 'Founder, designer and developer',
  description: DEFAULT_DESCRIPTION,
  image: absoluteUrl(OG_IMAGE.path),
  address: { '@type': 'PostalAddress', addressCountry: 'UY' },
  nationality: { '@type': 'Country', name: 'Uruguay' },
  sameAs: socialLinks.map((s) => s.url),
  worksFor: { '@type': 'Organization', name: 'WeFaber', url: 'https://wefaber.net' },
  knowsAbout: ['Software engineering', 'Product design', 'TypeScript', 'React', 'Bun', 'Applied AI', 'Entrepreneurship'],
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  inLanguage: ['en', 'es'],
  publisher: { '@id': PERSON_ID },
}

/* ─── Pages ─── */

interface Page {
  path: string
  title: string
  description: string
  type: 'website' | 'article'
  image: string
  graph: object[]
  /** Inner HTML of `#root`. */
  body: string
  article?: { published: string; tags: string[] }
}

function renderHead(page: Page): string {
  const url = pageUrl(page.path)
  const t = esc(page.title)
  const d = esc(page.description)
  const img = esc(page.image)

  const lines = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />`,
    `<meta name="author" content="${esc(SITE_NAME)}" />`,
    `<meta name="theme-color" content="#F7FAFD" media="(prefers-color-scheme: light)" />`,
    `<meta name="theme-color" content="#0A0F14" media="(prefers-color-scheme: dark)" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:type" content="${OG_IMAGE.type}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="es_LA" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${TWITTER_HANDLE}" />`,
    `<meta name="twitter:creator" content="${TWITTER_HANDLE}" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<meta name="twitter:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
  ]

  if (page.article) {
    lines.push(`<meta property="article:published_time" content="${page.article.published}" />`)
    lines.push(`<meta property="article:author" content="${SITE_URL}/" />`)
    for (const tag of page.article.tags) lines.push(`<meta property="article:tag" content="${esc(tag)}" />`)
  }

  lines.push(jsonLd(page.graph))
  return lines.join('\n    ')
}

const HEAD_START = '<!--seo:head-->'
const HEAD_END = '<!--/seo:head-->'
const BODY_START = '<!--seo:body-->'
const BODY_END = '<!--/seo:body-->'

function between(html: string, start: string, end: string, replacement: string): string {
  const from = html.indexOf(start)
  const to = html.indexOf(end)
  if (from === -1 || to === -1) throw new Error(`[seo] marker ${start} not found in index.html`)
  return html.slice(0, from + start.length) + replacement + html.slice(to)
}

function applyPage(html: string, page: Page): string {
  const withHead = between(html, HEAD_START, HEAD_END, `\n    ${renderHead(page)}\n    `)
  return between(withHead, BODY_START, BODY_END, page.body)
}

/* ─── Page builders ─── */

const byStart = [...projects].sort((a, b) => a.started.localeCompare(b.started))

function homePage(posts: Post[]): Page {
  const projectItems = byStart
    .map(
      (p) =>
        `<li><a href="${esc(p.url)}">${esc(p.title)}</a> (${esc(p.started.slice(0, 4))}, ${p.status}) — ${esc(p.description.en)}</li>`,
    )
    .join('\n')

  const orgItems = orgs
    .map((o) => `<li><a href="${esc(o.url)}">${esc(o.name)}</a> — ${esc(o.purpose.en)}</li>`)
    .join('\n')

  const socials = socialLinks.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(' · ')

  const body = `
      <main data-prerender>
        <h1>${esc(siteConfig.name)}</h1>
        <p>${esc(siteConfig.tagline.en.replaceAll('|', '·'))}</p>
        <p>${esc(DEFAULT_DESCRIPTION)}</p>
        <h2>${esc(background.heading.en)}</h2>
        ${background.paragraphs.en.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
        <h2>Where the work lives</h2>
        <ul>${orgItems}</ul>
        <h2>Projects</h2>
        <ul>${projectItems}</ul>
        ${posts.length > 0 ? '<p><a href="/blog/">Blog</a></p>' : ''}
        <h2>Contact</h2>
        <p><a href="mailto:${esc(siteConfig.email)}">${esc(siteConfig.email)}</a></p>
        <p>${socials}</p>
      </main>
    `

  return {
    path: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: 'website',
    image: absoluteUrl(OG_IMAGE.path),
    graph: [website, person],
    body,
  }
}

function breadcrumbs(items: { name: string; path: string }[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  }
}

function blogIndexPage(posts: Post[]): Page {
  const description = BLOG_DESCRIPTION
  const list = posts
    .map(
      (p) =>
        `<li><a href="/blog/${p.slug}/">${esc(p.title)}</a> — <time datetime="${p.date}">${p.date}</time><br />${esc(p.description)}</li>`,
    )
    .join('\n')

  return {
    path: '/blog',
    title: BLOG_TITLE,
    description,
    type: 'website',
    image: absoluteUrl(OG_IMAGE.path),
    graph: [
      website,
      person,
      {
        '@type': 'Blog',
        '@id': `${pageUrl('/blog')}#blog`,
        url: pageUrl('/blog'),
        name: `${SITE_NAME} — Blog`,
        description,
        inLanguage: 'en',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: pageUrl(`/blog/${p.slug}`) })),
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
    ],
    body: `
      <main data-prerender>
        <h1>Blog</h1>
        <ul>${list}</ul>
        <p><a href="/">Home</a></p>
      </main>
    `,
  }
}

function postPage(post: Post): Page {
  const path = `/blog/${post.slug}`
  const image = absoluteUrl(post.cover ?? OG_IMAGE.path)

  return {
    path,
    title: post.seoTitle,
    description: post.seoDescription,
    type: 'article',
    image,
    article: { published: post.date, tags: post.tags },
    graph: [
      website,
      person,
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl(path)}#article`,
        mainEntityOfPage: pageUrl(path),
        headline: post.title,
        description: post.seoDescription,
        image,
        datePublished: post.date,
        dateModified: post.date,
        keywords: post.tags.join(', '),
        inLanguage: 'en',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path },
      ]),
    ],
    body: `
      <main data-prerender>
        <article>
          <p><a href="/blog/">Blog</a></p>
          <h1>${esc(post.title)}</h1>
          <p><time datetime="${post.date}">${post.date}</time></p>
          ${markdown.parse(post.content.replace(/^\s*# [^\r\n]*\r?\n/, ''), { async: false })}
        </article>
      </main>
    `,
  }
}

/* ─── Machine-readable files ─── */

function sitemap(posts: Post[]): string {
  const newest = posts[0]?.date
  const entries = [
    { loc: pageUrl('/'), lastmod: undefined, changefreq: 'monthly', priority: '1.0' },
    { loc: pageUrl('/blog'), lastmod: newest, changefreq: 'weekly', priority: '0.6' },
    ...posts.map((p) => ({
      loc: pageUrl(`/blog/${p.slug}`),
      lastmod: p.date,
      changefreq: 'yearly',
      priority: '0.5',
    })),
  ]

  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ''}    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** The whole portfolio as one plain-text document, for language models (llmstxt.org). */
function llmsFull(posts: Post[]): string {
  const out: string[] = [
    `# ${SITE_NAME} — full content`,
    '',
    `> ${DEFAULT_DESCRIPTION}`,
    '',
    `Source: ${SITE_URL}/ — generated at build time from the site's own content. Summary version: ${SITE_URL}/llms.txt`,
    '',
    `## ${background.heading.en}`,
    '',
    ...background.paragraphs.en.flatMap((p) => [p, '']),
    '## Contact',
    '',
    `- Email: ${siteConfig.email}`,
    ...socialLinks.map((s) => `- ${s.label}: ${s.url}`),
    '',
    '## Orgs',
    '',
    ...orgs.map((o) => `- **${o.name}** (${o.url}): ${o.purpose.en}`),
    '',
    '## Projects',
    '',
  ]

  for (const p of byStart) {
    out.push(`### ${p.title}`, '')
    out.push(`- URL: ${p.url}`)
    out.push(`- Started: ${p.started}`)
    out.push(`- Status: ${p.status}`)
    out.push(`- Role: ${p.role.en}`)
    out.push(`- Stack: ${p.stack.join(', ')}`)
    out.push(`- Tags: ${p.tags.join(', ')}`, '')
    out.push(p.description.en, '')
    out.push(...p.story.en.flatMap((para) => [para, '']))
    if (p.milestones.length > 0) {
      out.push('Milestones:', '')
      out.push(...p.milestones.map((m) => `- ${m.when} — ${m.title.en}: ${m.detail.en}`), '')
    }
  }

  if (posts.length > 0) {
    out.push('## Blog', '')
    for (const post of posts) {
      out.push(`### ${post.title}`, '', `URL: ${pageUrl(`/blog/${post.slug}`)}`, `Published: ${post.date}`, '', post.content.trim(), '')
    }
  }

  return out.join('\n')
}

/* ─── Plugin ─── */

export function seo(): Plugin {
  let posts: Post[] = []
  let root = process.cwd()

  return {
    name: 'personal-site:seo',

    configResolved(config) {
      root = resolve(config.root)
      posts = loadPosts(root)
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return applyPage(html, homePage(posts))
      },
    },

    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const index = bundle['index.html']
        if (index?.type !== 'asset') throw new Error('[seo] index.html missing from the bundle')
        const template = String(index.source)

        const emit = (fileName: string, source: string) => this.emitFile({ type: 'asset', fileName, source })

        emit('blog/index.html', applyPage(template, blogIndexPage(posts)))
        for (const post of posts) emit(`blog/${post.slug}/index.html`, applyPage(template, postPage(post)))
        emit('sitemap.xml', sitemap(posts))
        emit('llms-full.txt', llmsFull(posts))
      },
    },
  }
}
