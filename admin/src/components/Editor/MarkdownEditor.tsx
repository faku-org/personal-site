/**
 * /admin/src/components/Editor/MarkdownEditor.tsx
 * Split-screen markdown editor with line numbers, toolbar,
 * live preview, draggable divider, tab-key support, and Ctrl+S.
 *
 * Dependencies: react, ./Toolbar, ./Preview, ./WordCounter
 */

import { useRef, useState, useCallback, useEffect, type CSSProperties } from 'react'
import Toolbar from './Toolbar'
import Preview from './Preview'
import WordCounter from './WordCounter'
import './MarkdownEditor.css'

interface MarkdownEditorProps {
  content: string
  onContentChange: (content: string) => void
  onSave: () => void
}

export default function MarkdownEditor({ content, onContentChange, onSave }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [splitRatio, setSplitRatio] = useState(50)
  const isDragging = useRef(false)

  /* ─── Tab key + Ctrl+S ─── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = e.currentTarget
      const { selectionStart, selectionEnd, value } = ta
      const newValue = value.slice(0, selectionStart) + '  ' + value.slice(selectionEnd)
      onContentChange(newValue)
      requestAnimationFrame(() => {
        ta.setSelectionRange(selectionStart + 2, selectionStart + 2)
      })
    }
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      onSave()
    }
  }

  /* ─── Sync gutter scroll with textarea ─── */
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  /* ─── Divider drag ─── */
  const handleDividerDown = useCallback(() => {
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const ratio = ((e.clientX - rect.left) / rect.width) * 100
      setSplitRatio(Math.min(80, Math.max(20, ratio)))
    }
    const handleUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
    return () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
    }
  }, [])

  const lineCount = content.split('\n').length

  return (
    <div className="markdown-editor">
      <Toolbar textareaRef={textareaRef} onContentChange={onContentChange} />

      <div
        className="markdown-editor__panels"
        ref={containerRef}
        style={{ '--split': `${splitRatio}%` } as CSSProperties}
      >
        {/* Write panel */}
        <div className="markdown-editor__write">
          <div className="markdown-editor__gutter" ref={gutterRef}>
            {Array.from({ length: lineCount }, (_, i) => (
              <span key={i + 1} className="markdown-editor__line-num">{i + 1}</span>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className="markdown-editor__textarea"
            value={content}
            onChange={e => onContentChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            spellCheck={false}
            placeholder="Write your markdown here…"
          />
        </div>

        {/* Draggable divider */}
        <div className="markdown-editor__divider" onPointerDown={handleDividerDown} />

        {/* Preview panel */}
        <div className="markdown-editor__preview-panel">
          <Preview content={content} />
        </div>
      </div>

      <WordCounter content={content} />
    </div>
  )
}
