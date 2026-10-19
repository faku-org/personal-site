// ─── Site-wide SEO constants ───
// Shared by the browser (`useHead`) and the build-time plugin
// (`vite-plugins/seo.ts`), so the prerendered HTML and the client-side head
// updates can never disagree about the canonical origin or the default card.

export const SITE_URL = 'https://facupresa.com'
export const SITE_NAME = 'Facundo Presa'

export const DEFAULT_TITLE = 'Facundo Presa — Entrepreneur, Designer & Developer'

/**
 * First sentence is a self-contained definition ("X is a Y from Z"): it is the
 * span answer engines lift verbatim, and what search snippets truncate to.
 */
export const DEFAULT_DESCRIPTION =
  'Facundo Presa is an entrepreneur, designer and developer from Uruguay. Founder of WeFaber, building products end to end with Bun, TypeScript and React.'

export const BLOG_TITLE = `Blog — ${SITE_NAME}`
export const BLOG_DESCRIPTION =
  'Thoughts on tech, design, and building things — writing by Facundo Presa on software architecture, engineering and shipping products.'

export const TWITTER_HANDLE = '@faku_sys'

export const OG_IMAGE = {
  path: '/og.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Facundo Presa — Entrepreneur, Design, Programming',
} as const

/**
 * Prerendered routes live at `<route>/index.html`, which a static server reaches
 * through a trailing-slash redirect, so the trailing slash is the canonical form.
 */
export function pageUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`
}

export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`
}
