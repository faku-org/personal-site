/**
 * /admin/src/components/Frontmatter/FrontmatterForm.tsx
 * Two-column metadata form mapping to UpdateDraftDTO fields.
 *
 * Dependencies: react, ../UI/Input, ./TagSelector, ../../types
 */

import Input from '../UI/Input'
import TagSelector from './TagSelector'
import type { Draft } from '../../types'
import './FrontmatterForm.css'

interface FrontmatterFormProps {
  frontmatter: Partial<Draft>
  onUpdate: (updates: Partial<Draft>) => void
}

export default function FrontmatterForm({ frontmatter, onUpdate }: FrontmatterFormProps) {
  return (
    <div className="frontmatter-form">
      <div className="frontmatter-form__grid">
        <Input
          label="Title"
          value={frontmatter.title ?? ''}
          onChange={e => onUpdate({ title: e.target.value })}
        />

        <div className="frontmatter-form__field">
          <label className="frontmatter-form__label" htmlFor="fm-desc">Description</label>
          <textarea
            id="fm-desc"
            className="frontmatter-form__textarea"
            value={frontmatter.description ?? ''}
            onChange={e => onUpdate({ description: e.target.value })}
            maxLength={160}
            rows={2}
            placeholder="Short summary for SEO and cards…"
          />
          <span className="frontmatter-form__char-count">
            {(frontmatter.description ?? '').length}/160
          </span>
        </div>

        <Input
          label="Author"
          value={frontmatter.author ?? 'Faku'}
          onChange={e => onUpdate({ author: e.target.value })}
        />

        <Input
          label="Cover URL"
          value={frontmatter.cover ?? ''}
          onChange={e => onUpdate({ cover: e.target.value })}
          placeholder="https://..."
        />

        <Input
          label="Series"
          value={frontmatter.series ?? ''}
          onChange={e => onUpdate({ series: e.target.value })}
        />

        <Input
          label="SEO Title"
          value={frontmatter.seoTitle ?? ''}
          onChange={e => onUpdate({ seoTitle: e.target.value })}
          placeholder="Defaults to title"
        />

        <Input
          label="SEO Description"
          value={frontmatter.seoDescription ?? ''}
          onChange={e => onUpdate({ seoDescription: e.target.value })}
          placeholder="Defaults to description"
        />

        <TagSelector
          selectedTags={frontmatter.tags ?? []}
          onTagsChange={tags => onUpdate({ tags })}
        />
      </div>
    </div>
  )
}
