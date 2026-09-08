import { Routes, Route } from 'react-router-dom'
import './App.css'
import { siteConfig, socialLinks } from './config'
import { useLocale } from './i18n/useLocale'
import { useTheme } from './useTheme'
import { ui } from './i18n/strings'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from './icons'
import Story from './timeline/Story'
import Orgs from './timeline/Orgs'
import Timeline from './timeline/Timeline'
import BlogIndex from './blog/BlogIndex'
import BlogPost from './blog/BlogPost'

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

/* ─── App ─── */

function SocialLinks({ className }: { className?: string }) {
  const { t } = useLocale()

  return (
    <nav className={className} aria-label={t(ui.socialNav)}>
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

function HomePage() {
  const { t } = useLocale()
  const [firstLine, secondLine] = t(ui.footerHeading)

  return (
    <>
      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero__meta">
          <span className="label">{t(ui.heroKicker)}</span>
          <span className="label">{t(ui.heroLocation)}</span>
        </div>

        <h1 className="hero__name">{siteConfig.name}</h1>

        <div className="hero__foot">
          <p className="hero__tagline">
            {t(siteConfig.tagline)
              .split('|')
              .map((segment, i, arr) => (
                <span key={segment}>
                  {segment.trim()}
                  {i < arr.length - 1 && (
                    <>
                      <span className="hero__tagline-sep">/</span>
                      {/* The segments carry no whitespace, so without an explicit
                          break opportunity the whole tagline is one unbreakable
                          run and overflows once the reader scales the type up. */}
                      <wbr />
                    </>
                  )}
                </span>
              ))}
          </p>
          <SocialLinks className="socials" />
        </div>
      </header>

      <Story />
      <Orgs />
      <Timeline />

      {/* ── Footer / Contact ── */}
      <footer className="footer">
        <div>
          <h2 className="footer__heading">
            {firstLine}
            <br />
            {secondLine}
          </h2>
          <p className="footer__subtext">{t(siteConfig.footerSubtext)}</p>
        </div>
        <div className="footer__right">
          <a className="footer__email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          <SocialLinks className="footer__socials" />
        </div>
      </footer>

      <p className="footer__bottom">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
    </>
  )
}

function App() {
  const [dark, toggleTheme] = useTheme()
  const { locale, toggleLocale, t } = useLocale()

  return (
    <div className="portfolio">
      <div className="controls">
        <button
          className="control control--locale"
          onClick={toggleLocale}
          aria-label={t(ui.languageToggle)}
        >
          {locale === 'en' ? 'ES' : 'EN'}
        </button>

        <button
          className="control"
          onClick={toggleTheme}
          aria-label={dark ? t(ui.themeToLight) : t(ui.themeToDark)}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </div>
  )
}

export default App
