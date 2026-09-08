import './Orgs.css'
import { orgs } from '../config'
import { useLocale } from '../i18n/useLocale'
import { ui } from '../i18n/strings'
import { ArrowIcon } from '../icons'

/** The umbrellas the projects are organised under. */
export default function Orgs() {
  const { t } = useLocale()

  return (
    <section className="orgs" id="orgs">
      <p className="section-label">
        {t(ui.orgsLabel)}
        <span className="bauhaus-dot" />
      </p>

      <div className="orgs__intro">
        <h2 className="orgs__heading">{t(ui.orgsHeading)(orgs.length)}</h2>
        <p className="orgs__blurb">{t(ui.orgsBlurb)}</p>
      </div>

      <ul className="orgs__list">
        {orgs.map((org) => (
          <li className="orgs__item" key={org.id}>
            <a
              className="orgs__link"
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={`orgs__name orgs__name--${org.id}`}>{org.name}</span>
              <span className="orgs__purpose">{t(org.purpose)}</span>
              <span className="orgs__arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
