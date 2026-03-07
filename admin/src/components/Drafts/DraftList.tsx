/**
 * /admin/src/components/Drafts/DraftList.tsx
 * Sidebar list of all drafts with create/delete modals.
 *
 * Dependencies: react, ./DraftCard, ../UI/Modal, ../UI/Button, ../UI/Input, ../../types
 */

import { useState } from 'react'
import DraftCard from './DraftCard'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import Input from '../UI/Input'
import type { Draft } from '../../types'
import './DraftList.css'

interface DraftListProps {
  drafts: Draft[]
  activeDraftId: string | null
  onSelect: (id: string) => void
  onCreate: (name: string) => void
  onDelete: (id: string) => void
}

export default function DraftList({
  drafts,
  activeDraftId,
  onSelect,
  onCreate,
  onDelete,
}: DraftListProps) {
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleCreate = () => {
    if (!newName.trim()) return
    onCreate(newName.trim())
    setNewName('')
    setShowCreate(false)
  }

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <aside className="draft-list">
      <div className="draft-list__header">
        <h2 className="draft-list__title">Drafts</h2>
        <Button size="sm" onClick={() => setShowCreate(true)}>+ New</Button>
      </div>

      <div className="draft-list__items">
        {drafts.map(d => (
          <DraftCard
            key={d.id}
            name={d.name}
            status={d.status}
            updatedAt={d.updatedAt}
            active={d.id === activeDraftId}
            onClick={() => onSelect(d.id)}
            onDelete={() => setDeleteId(d.id)}
          />
        ))}
        {drafts.length === 0 && (
          <p className="draft-list__empty">No drafts yet. Create one!</p>
        )}
      </div>

      {/* Create modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Draft">
        <Input
          label="Draft Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleCreate() }}
          placeholder="My new post…"
          autoFocus
        />
        <div className="draft-list__modal-actions">
          <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Draft">
        <p className="draft-list__confirm-text">
          Are you sure you want to delete this draft? This action cannot be undone.
        </p>
        <div className="draft-list__modal-actions">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </aside>
  )
}
