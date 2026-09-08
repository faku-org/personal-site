import { useCallback, useEffect, useRef, useState } from 'react'
import './Timeline.css'
import { eras, orgById, projects } from '../config'
import type { Era, Project } from '../config'
import { useLocale } from '../i18n/useLocale'
import { statusLabels, ui } from '../i18n/strings'
import ProjectModal from './ProjectModal'

interface EraGroup {
  era: Era
  items: readonly Project[]
}

/** Projects grouped into their era, oldest first, with empty eras dropped. */
const eraGroups: readonly EraGroup[] = eras
  .map((era) => ({
    era,
    items: projects
      .filter((p) => p.era === era.id)
      .sort((a, b) => a.started.localeCompare(b.started)),
  }))
  .filter((group) => group.items.length > 0)

/** Adds `is-visible` to each observed node the first time it scrolls into view. */
function useRevealOnScroll() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const nodes = root.querySelectorAll<HTMLElement>('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return rootRef
}

function TimelineCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const { t } = useLocale()

  return (
    <li className="timeline__item" data-reveal>
      <span className="timeline__marker" aria-hidden="true" />

      <button
        type="button"
        className="timeline-card"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
      >
        <span className="timeline-card__head">
          <span className="timeline-card__year">{project.started.slice(0, 4)}</span>
          <span className={`timeline-card__status timeline-card__status--${project.status}`}>
            {t(statusLabels[project.status])}
          </span>
          <span className="timeline-card__org">{orgById[project.org].name}</span>
        </span>

        <span className="timeline-card__title">{project.title}</span>
        <span className="timeline-card__desc">{t(project.description)}</span>

        <span className="timeline-card__tags">
          {project.tags.map((tag) => (
            <span className="timeline-card__tag" key={tag}>
              {tag}
            </span>
          ))}
        </span>

        <span className="timeline-card__cta">
          {t(ui.cardCta)}
          <span className="timeline-card__cta-count">
            {t(ui.milestoneCount)(project.milestones.length)}
          </span>
        </span>
      </button>
    </li>
  )
}

/** Chronological project timeline, grouped into eras, with a modal per project. */
export default function Timeline() {
  const [active, setActive] = useState<Project | null>(null)
  const rootRef = useRevealOnScroll()
  const { t } = useLocale()

  const handleClose = useCallback(() => setActive(null), [])

  return (
    <section className="timeline" id="timeline" ref={rootRef}>
      <p className="section-label">
        {t(ui.timelineLabel)}
        <span className="bauhaus-dot" />
      </p>

      <ol className="timeline__eras">
        {eraGroups.map(({ era, items }) => (
          <li className={`timeline__era era--${era.id}`} key={era.id}>
            <header className="timeline__era-head" data-reveal>
              <p className="timeline__era-range">{era.range}</p>
              <h2 className="timeline__era-label">{t(era.label)}</h2>
              <p className="timeline__era-blurb">{t(era.blurb)}</p>
            </header>

            <ol className="timeline__items">
              {items.map((project) => (
                <TimelineCard key={project.id} project={project} onOpen={setActive} />
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <ProjectModal project={active} onClose={handleClose} />
    </section>
  )
}
