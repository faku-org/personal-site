/**
 * /admin/src/components/Editor/Preview.tsx
 * Live rendered Markdown preview using `marked`.
 * Applies .prose styles matching the blog's post view.
 *
 * Dependencies: react, marked
 */

import { useMemo } from 'react'
import { marked } from 'marked'
import './Preview.css'

marked.use({ gfm: true, breaks: true })

interface PreviewProps {
  content: string
}

export default function Preview({ content }: PreviewProps) {
  const html = useMemo(() => {
    if (!content.trim()) return ''
    return marked.parse(content) as string
  }, [content])

  if (!html) {
    return (
      <div className="preview preview--empty">
        <p className="preview__placeholder">Start writing to see the preview…</p>
      </div>
    )
  }

  /* Content is author-controlled markdown (stored in local DB), safe for innerHTML */
  return (
    <div className="preview">
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
