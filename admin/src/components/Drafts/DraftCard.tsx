/**
 * /admin/src/components/Drafts/DraftCard.tsx
 * Individual draft item showing name, status badge, relative time, delete button.
 *
 * Dependencies: react
 */

import './DraftCard.css'

interface DraftCardProps {
  name: string
  status: 'draft' | 'published'
  updatedAt: string
  active: boolean
  onClick: () => void
  onDelete: () => void
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

export default function DraftCard({ name, status, updatedAt, active, onClick, onDelete }: DraftCardProps) {
  return (
    <div
      className={`draft-card ${active ? 'draft-card--active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onClick() }}
    >
      <div className="draft-card__info">
        <span className="draft-card__name">{name}</span>
        <span className={`draft-card__badge draft-card__badge--${status}`}>{status}</span>
      </div>
      <div className="draft-card__footer">
        <span className="draft-card__time">{relativeTime(updatedAt)}</span>
        <button
          className="draft-card__delete"
          onClick={e => { e.stopPropagation(); onDelete() }}
          aria-label="Delete draft"
        >
          ×
        </button>
      </div>
    </div>
  )
}
