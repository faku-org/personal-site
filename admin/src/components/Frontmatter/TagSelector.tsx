/**
 * /admin/src/components/Frontmatter/TagSelector.tsx
 * Tag picker: fetches known tags, toggles selection, creates new tags.
 * Max 8 tags with visual warning.
 *
 * Dependencies: react, ../../api/client
 */

import { useState, useEffect } from 'react'
import { api } from '../../api/client'
import './TagSelector.css'

interface TagSelectorProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export default function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const [knownTags, setKnownTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    api.tags.list().then(setKnownTags).catch(() => {})
  }, [])

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      if (selectedTags.length >= 8) return
      onTagsChange([...selectedTags, tag])
    }
  }

  const addNewTag = async () => {
    const tag = newTag.trim().toLowerCase()
    if (!tag || knownTags.includes(tag)) return
    try {
      await api.tags.create(tag)
      setKnownTags(prev => [...prev, tag].sort())
      if (selectedTags.length < 8) {
        onTagsChange([...selectedTags, tag])
      }
      setNewTag('')
    } catch {
      /* tag creation failed silently */
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addNewTag()
    }
  }

  return (
    <div className="tag-selector">
      <label className="tag-selector__label">Tags</label>

      <div className="tag-selector__pills">
        {knownTags.map(tag => (
          <button
            key={tag}
            type="button"
            className={`tag-pill ${selectedTags.includes(tag) ? 'tag-pill--active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {selectedTags.length >= 8 && (
        <p className="tag-selector__warning">Maximum of 8 tags reached</p>
      )}

      <div className="tag-selector__add">
        <input
          type="text"
          className="tag-selector__input"
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new tag…"
        />
        <button type="button" className="tag-selector__add-btn" onClick={addNewTag}>
          Add
        </button>
      </div>
    </div>
  )
}
