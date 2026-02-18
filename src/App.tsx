import { useState, useEffect } from 'react'
import './App.css'
import { siteConfig, socialLinks, projects } from './config'

/* ─── Icons ─── */

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 8h14M9 2l6 6-6 6" />
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

/* ─── Icon Registry ─── */

const iconMap: Record<string, () => React.JSX.Element> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
  Instagram: InstagramIcon,
}

const socials = socialLinks.map((s) => ({
  ...s,
  icon: iconMap[s.label] ?? (() => null),
}))

/* ─── Theme Hook ─── */

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, () => setDark((d) => !d)] as const
}

/* ─── App ─── */

function SocialLinks({ className }: { className?: string }) {
  return (
    <nav className={className} aria-label="Social media links">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="socials__link"
          aria-label={s.label}
        >
          <s.icon />
        </a>
      ))}
    </nav>
  )
}

function App() {
  const [dark, toggleTheme] = useTheme()

  return (
    <div className="portfolio">
      {/* ── Theme Toggle ── */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* ── Hero ── */}
      <header className="hero">
        <div>
          <h1 className="hero__name">
            {siteConfig.name.split(' ').map((word, i) => (
              <span key={i}>{i > 0 && <br />}{word}</span>
            ))}
          </h1>
          <p className="hero__tagline">
            {siteConfig.tagline.split('|').map((segment, i, arr) => (
              <span key={i}>
                {segment.trim()}{i < arr.length - 1 && <>&ensp;|&ensp;</>}
              </span>
            ))}
          </p>
          <SocialLinks className="socials" />
        </div>
        <div className="hero__accent-block" aria-hidden="true" />
      </header>

      {/* ── Projects ── */}
      <section className="projects">
        <p className="section-label">Selected Projects<span className="bauhaus-dot" /></p>

        <div className="projects__grid">
          {projects.map((p) => (
            <a
              key={p.modifier}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card project-card--${p.modifier}`}
            >
              <div>
                <h2 className="project-card__title">{p.title}</h2>
                <p className="project-card__desc">{p.description}</p>
                <span className="project-card__arrow">
                  Visit <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Footer / Contact ── */}
      <footer className="footer">
        <div>
          <h2 className="footer__heading">
            Let's work
            <br />
            together<span className="bauhaus-dot" />
          </h2>
          <p className="footer__subtext">{siteConfig.footerSubtext}</p>
        </div>
        <div className="footer__right">
          <a className="footer__email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          <SocialLinks className="footer__socials" />
        </div>
      </footer>

      <p className="footer__bottom">&copy; {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  )
}

export default App
