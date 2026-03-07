/**
 * /admin/src/components/Editor/WordCounter.tsx
 * Live word count, character count, and reading time display.
 * Debounced at 300ms for performance.
 *
 * Dependencies: react
 */

import { useState, useEffect } from 'react'
import './WordCounter.css'

interface WordCounterProps {
  content: string
}

interface Stats {
  words: number
  chars: number
  readingTime: number
}

export default function WordCounter({ content }: WordCounterProps) {
  const [stats, setStats] = useState<Stats>({ words: 0, chars: 0, readingTime: 1 })

  useEffect(() => {
    const timer = setTimeout(() => {
      const words = content.trim() ? content.trim().split(/\s+/).length : 0
      setStats({
        words,
        chars: content.length,
        readingTime: Math.max(1, Math.ceil(words / 200)),
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [content])

  return (
    <div className="word-counter">
      <span className="word-counter__stat">{stats.words} words</span>
      <span className="word-counter__sep">·</span>
      <span className="word-counter__stat">{stats.chars} chars</span>
      <span className="word-counter__sep">·</span>
      <span className="word-counter__stat">{stats.readingTime} min read</span>
    </div>
  )
}
