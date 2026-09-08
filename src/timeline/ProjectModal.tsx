import { useEffect, useRef } from 'react'
import './ProjectModal.css'
import { orgById } from '../config'
import type { Project } from '../config'
import { useLocale } from '../i18n/useLocale'
import { statusLabels, ui } from '../i18n/strings'
import { CloseIcon, ExternalIcon } from '../icons'

interface ProjectModalProps {
  /** `null` closes the dialog. */
  project: Project | null
  onClose: () => void
}

/**
 * Native `<dialog>` sheet with the long-form story and evolution of a project.
 * Focus trap, Esc and inert background come from `showModal()`; the backdrop
 * click and body scroll lock are handled here.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { t } = useLocale()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project && !dialog.open) {
      dialog.showModal()
      dialog.scrollTop = 0
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={project ? `modal-title-${project.id}` : undefined}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      {project && (
        <article className="modal__sheet">
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label={t(ui.modalClose)}
          >
            <CloseIcon />
          </button>

          <header className="modal__head">
            <p className="modal__eyebrow">
              <span>{project.started.slice(0, 4)}</span>
              <span className="modal__sep" aria-hidden="true" />
              <span>{t(statusLabels[project.status])}</span>
            </p>
            <h2 className="modal__title" id={`modal-title-${project.id}`}>
              {project.title}
            </h2>
            <p className="modal__lede">{t(project.description)}</p>
          </header>

          <dl className="modal__meta">
            <div className="modal__meta-row">
              <dt>{t(ui.modalRole)}</dt>
              <dd>{t(project.role)}</dd>
            </div>
            <div className="modal__meta-row">
              <dt>{t(ui.modalOrg)}</dt>
              <dd>
                <a
                  className="modal__org"
                  href={orgById[project.org].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {orgById[project.org].name}
                </a>
              </dd>
            </div>
            <div className="modal__meta-row">
              <dt>{t(ui.modalStack)}</dt>
              <dd>{project.stack.join(' · ')}</dd>
            </div>
            <div className="modal__meta-row">
              <dt>{t(ui.modalTags)}</dt>
              <dd className="modal__tags">
                {project.tags.map((tag) => (
                  <span className="modal__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <section className="modal__section">
            <h3 className="modal__section-title">{t(ui.modalBackground)}</h3>
            <div className="modal__prose">
              {t(project.story).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {project.milestones.length > 0 && (
            <section className="modal__section">
              <h3 className="modal__section-title">{t(ui.modalEvolution)}</h3>
              <ol className="modal__milestones">
                {project.milestones.map((milestone, index) => (
                  <li className="modal__milestone" key={`${milestone.when}-${index}`}>
                    <span className="modal__milestone-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="modal__milestone-body">
                      <p className="modal__milestone-when">{milestone.when}</p>
                      <h4 className="modal__milestone-title">{t(milestone.title)}</h4>
                      <p className="modal__milestone-detail">{t(milestone.detail)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <footer className="modal__foot">
            <a
              className="modal__cta"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(ui.modalVisit)(project.title)}
              <ExternalIcon />
            </a>

            {project.links?.map((link) => (
              <a
                className="modal__link"
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </footer>
        </article>
      )}
    </dialog>
  )
}
