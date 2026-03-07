/**
 * /server/src/shared/slugify.ts
 * Converts a title string into a URL-safe slug.
 * Handles accented characters, collapses hyphens, strips non-alphanumeric.
 */

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
