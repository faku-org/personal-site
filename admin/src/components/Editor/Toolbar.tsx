/**
 * /admin/src/components/Editor/Toolbar.tsx
 * Formatting toolbar that inserts/wraps Markdown syntax at cursor position.
 * Receives a ref to the textarea and a content setter.
 *
 * Dependencies: react
 */

import type { RefObject } from 'react'
import './Toolbar.css'

interface ToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onContentChange: (content: string) => void
}

/** Wrap selected text (or insert placeholder) with before/after markers */
function wrapSelection(
  ta: HTMLTextAreaElement,
  before: string,
  after: string,
  placeholder: string,
  onContentChange: (content: string) => void,
) {
  const { selectionStart, selectionEnd, value } = ta
  const selected = value.slice(selectionStart, selectionEnd) || placeholder
  const newValue = value.slice(0, selectionStart) + before + selected + after + value.slice(selectionEnd)
  onContentChange(newValue)

  const cursorStart = selectionStart + before.length
  const cursorEnd = cursorStart + selected.length
  requestAnimationFrame(() => {
    ta.focus()
    ta.setSelectionRange(cursorStart, cursorEnd)
  })
}

/** Insert a prefix at the beginning of the current line */
function prefixLine(
  ta: HTMLTextAreaElement,
  prefix: string,
  onContentChange: (content: string) => void,
) {
  const { selectionStart, value } = ta
  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
  const newValue = value.slice(0, lineStart) + prefix + value.slice(lineStart)
  onContentChange(newValue)

  const newPos = selectionStart + prefix.length
  requestAnimationFrame(() => {
    ta.focus()
    ta.setSelectionRange(newPos, newPos)
  })
}

export default function Toolbar({ textareaRef, onContentChange }: ToolbarProps) {
  const act = (fn: (ta: HTMLTextAreaElement) => void) => {
    if (textareaRef.current) fn(textareaRef.current)
  }

  return (
    <div className="toolbar" role="toolbar" aria-label="Formatting toolbar">
      <button className="toolbar__btn toolbar__btn--bold" title="Bold"
        onClick={() => act(ta => wrapSelection(ta, '**', '**', 'bold text', onContentChange))}>
        <b>B</b>
      </button>
      <button className="toolbar__btn toolbar__btn--italic" title="Italic"
        onClick={() => act(ta => wrapSelection(ta, '*', '*', 'italic text', onContentChange))}>
        <i>I</i>
      </button>

      <span className="toolbar__sep" />

      <button className="toolbar__btn" title="Heading 1"
        onClick={() => act(ta => prefixLine(ta, '# ', onContentChange))}>
        H1
      </button>
      <button className="toolbar__btn" title="Heading 2"
        onClick={() => act(ta => prefixLine(ta, '## ', onContentChange))}>
        H2
      </button>
      <button className="toolbar__btn" title="Heading 3"
        onClick={() => act(ta => prefixLine(ta, '### ', onContentChange))}>
        H3
      </button>

      <span className="toolbar__sep" />

      <button className="toolbar__btn" title="Inline code"
        onClick={() => act(ta => wrapSelection(ta, '`', '`', 'code', onContentChange))}>
        <code>&lt;/&gt;</code>
      </button>
      <button className="toolbar__btn" title="Code block"
        onClick={() => act(ta => wrapSelection(ta, '```\n', '\n```', 'code block', onContentChange))}>
        {'{ }'}
      </button>
      <button className="toolbar__btn" title="Blockquote"
        onClick={() => act(ta => prefixLine(ta, '> ', onContentChange))}>
        &ldquo;
      </button>

      <span className="toolbar__sep" />

      <button className="toolbar__btn" title="Link"
        onClick={() => act(ta => wrapSelection(ta, '[', '](url)', 'link text', onContentChange))}>
        🔗
      </button>
      <button className="toolbar__btn" title="Unordered list"
        onClick={() => act(ta => prefixLine(ta, '- ', onContentChange))}>
        •
      </button>
      <button className="toolbar__btn" title="Ordered list"
        onClick={() => act(ta => prefixLine(ta, '1. ', onContentChange))}>
        1.
      </button>
      <button className="toolbar__btn" title="Center"
        onClick={() => act(ta => wrapSelection(ta, '<div align="center">', '</div>', 'centered text', onContentChange))}>
        ⊡
      </button>
    </div>
  )
}
