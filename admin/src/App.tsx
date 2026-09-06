/**
 * /admin/src/App.tsx
 * Main CMS layout — header, sidebar, editor, collapsible frontmatter panel.
 * Orchestrates all hooks and components.
 *
 * Dependencies: react, all hooks, all components
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import DraftList from './components/Drafts/DraftList'
import MarkdownEditor from './components/Editor/MarkdownEditor'
import FrontmatterForm from './components/Frontmatter/FrontmatterForm'
import Modal from './components/UI/Modal'
import Button from './components/UI/Button'
import { useEditor } from './hooks/useEditor'
import { useDrafts } from './hooks/useDrafts'
import { useAutoSave } from './hooks/useAutoSave'
import type { SaveStatus } from './hooks/useAutoSave'
import { api } from './api/client'
import './App.css'

/* ─── Save status badge labels ─── */
const STATUS_LABELS: Record<SaveStatus, string> = {
  idle: '',
  saving: 'Saving…',
  saved: 'Saved',
  error: 'Save failed',
}

export default function App() {
  const editor = useEditor()
  const drafts = useDrafts()
  const [publishModal, setPublishModal] = useState(false)
  const [publishErrors, setPublishErrors] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ─── Auto-save ─── */
  const updateDTO = useMemo(() => editor.getUpdateDTO(), [editor.getUpdateDTO])
  const { saveStatus, triggerSave } = useAutoSave(
    drafts.activeDraftId,
    updateDTO,
    editor.isDirty,
  )

  /* ─── Load drafts on mount ─── */
  useEffect(() => { drafts.loadDrafts() }, [drafts.loadDrafts])

  /* ─── Load selected draft ─── */
  useEffect(() => {
    if (!drafts.activeDraftId) return
    api.drafts.get(drafts.activeDraftId)
      .then(draft => editor.loadDraft(draft))
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drafts.activeDraftId])

  /* ─── Handlers ─── */

  const handleCreateDraft = useCallback(async (name: string) => {
    try {
      await drafts.createDraft({ name })
    } catch {
      /* error state handled in useDrafts */
    }
  }, [drafts])

  const handleDeleteDraft = useCallback(async (id: string) => {
    await drafts.deleteDraft(id)
    if (drafts.activeDraftId === id) editor.resetEditor()
  }, [drafts, editor])

  const handleSelectDraft = useCallback((id: string) => {
    drafts.selectDraft(id)
    setSidebarOpen(false)
  }, [drafts])

  /* ─── Publish flow ─── */

  const openPublishModal = () => {
    const errors: string[] = []
    if (!editor.frontmatter.title?.trim()) errors.push('Title is required')
    if (!editor.frontmatter.tags?.length) errors.push('At least one tag is required')
    if (!editor.frontmatter.description?.trim()) errors.push('Description is required')
    setPublishErrors(errors)
    setPublishModal(true)
  }

  const confirmPublish = async () => {
    if (!drafts.activeDraftId || publishErrors.length > 0) return
    try {
      const result = await drafts.publishDraft(drafts.activeDraftId)
      setPublishModal(false)
      setToast(`Published! Slug: ${result.slug}`)
      setTimeout(() => setToast(null), 5000)
    } catch (e) {
      setPublishErrors([e instanceof Error ? e.message : 'Publish failed'])
    }
  }

  /* ─── Slug preview ─── */
  const slugPreview = (editor.frontmatter.title ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return (
    <div className="admin-layout">
      {/* ─── Header ─── */}
      <header className="admin-header">
        <div className="admin-header__left">
          <button
            className="admin-header__menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <span className="admin-header__brand">
            facupresa.com <span className="admin-header__sep">/</span> admin
          </span>
        </div>

        <div className="admin-header__right">
          {saveStatus !== 'idle' && (
            <span className={`admin-header__status admin-header__status--${saveStatus}`}>
              {STATUS_LABELS[saveStatus]}
            </span>
          )}
          {toast && <span className="admin-header__toast">{toast}</span>}
          <Button
            size="sm"
            disabled={!drafts.activeDraftId}
            onClick={openPublishModal}
          >
            Publish
          </Button>
        </div>
      </header>

      {/* ─── Content area ─── */}
      <div className="admin-content">
        {/* Sidebar */}
        <div className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
          <DraftList
            drafts={drafts.drafts}
            activeDraftId={drafts.activeDraftId}
            onSelect={handleSelectDraft}
            onCreate={handleCreateDraft}
            onDelete={handleDeleteDraft}
          />
        </div>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Editor */}
        <main className="admin-editor">
          {drafts.activeDraftId ? (
            <MarkdownEditor
              content={editor.content}
              onContentChange={editor.setContent}
              onSave={triggerSave}
            />
          ) : (
            <div className="admin-editor__empty">
              <div className="admin-editor__empty-card">
                <p className="admin-editor__empty-icon">📝</p>
                <p className="admin-editor__empty-text">
                  Select a draft or create a new one to start writing.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* ─── Right column: Metadata panel ─── */}
        <aside className="admin-frontmatter">
          <div className="admin-frontmatter__header">
            <span className="admin-frontmatter__title">Metadata</span>
          </div>
          {drafts.activeDraftId ? (
            <FrontmatterForm
              frontmatter={editor.frontmatter}
              onUpdate={editor.updateFrontmatter}
            />
          ) : (
            <div className="admin-frontmatter__empty">
              <p>Select a draft to edit metadata.</p>
            </div>
          )}
        </aside>
      </div>

      {/* ─── Error display ─── */}
      {drafts.error && (
        <div className="admin-error">{drafts.error}</div>
      )}

      {/* ─── Publish Modal ─── */}
      <Modal open={publishModal} onClose={() => setPublishModal(false)} title="Publish Post">
        {publishErrors.length > 0 ? (
          <div className="admin-publish__errors">
            <p className="admin-publish__error-title">Cannot publish:</p>
            <ul>
              {publishErrors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        ) : (
          <div className="admin-publish__preview">
            <p><strong>Title:</strong> {editor.frontmatter.title}</p>
            <p><strong>Slug:</strong> {slugPreview || '—'}</p>
            <p><strong>Tags:</strong> {editor.frontmatter.tags?.join(', ') || '—'}</p>
            <p><strong>Reading time:</strong> {editor.readingTime} min</p>
          </div>
        )}
        <div className="admin-publish__actions">
          <Button variant="ghost" onClick={() => setPublishModal(false)}>Cancel</Button>
          <Button disabled={publishErrors.length > 0} onClick={confirmPublish}>
            Confirm Publish
          </Button>
        </div>
      </Modal>
    </div>
  )
}
