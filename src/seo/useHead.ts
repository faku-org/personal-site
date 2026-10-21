import { useEffect } from 'react'
import { OG_IMAGE, SITE_NAME, absoluteUrl, pageUrl } from './site'

export interface HeadMeta {
  title: string
  description: string
  /** Route path, e.g. `/blog/some-post`. Becomes the canonical and `og:url`. */
  path: string
  type?: 'website' | 'article'
  /** Path or absolute URL. Defaults to the site card. */
  image?: string
  noindex?: boolean
}

type Restore = () => void

function upsert(selector: string, create: () => HTMLElement, write: (el: HTMLElement) => void): Restore {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
    write(el)
    return () => el?.remove()
  }

  const target = el
  const snapshot = target.cloneNode() as HTMLElement
  write(target)
  return () => {
    for (const { name } of Array.from(target.attributes)) target.removeAttribute(name)
    for (const { name, value } of Array.from(snapshot.attributes)) target.setAttribute(name, value)
  }
}

function meta(attr: 'name' | 'property', key: string, content: string): Restore {
  return upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const el = document.createElement('meta')
      el.setAttribute(attr, key)
      return el
    },
    (el) => el.setAttribute('content', content),
  )
}

function canonical(href: string): Restore {
  return upsert(
    'link[rel="canonical"]',
    () => {
      const el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      return el
    },
    (el) => el.setAttribute('href', href),
  )
}

/**
 * Per-route head for client-side navigation. The first load is already
 * correct — the build prerenders each route — so this only matters when the
 * reader moves between routes inside the SPA. Every value it sets is restored
 * on unmount, which hands the head back to whatever the previous route had.
 */
export function useHead({ title, description, path, type = 'website', image, noindex = false }: HeadMeta) {
  useEffect(() => {
    const url = pageUrl(path)
    const img = absoluteUrl(image ?? OG_IMAGE.path)
    const previousTitle = document.title
    document.title = title

    const restores: Restore[] = [
      meta('name', 'description', description),
      canonical(url),
      meta('name', 'robots', noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1'),
      meta('property', 'og:type', type),
      meta('property', 'og:site_name', SITE_NAME),
      meta('property', 'og:title', title),
      meta('property', 'og:description', description),
      meta('property', 'og:url', url),
      meta('property', 'og:image', img),
      meta('name', 'twitter:title', title),
      meta('name', 'twitter:description', description),
      meta('name', 'twitter:image', img),
    ]

    return () => {
      document.title = previousTitle
      for (const restore of restores.reverse()) restore()
    }
  }, [title, description, path, type, image, noindex])
}
