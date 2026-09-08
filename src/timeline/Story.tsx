import './Story.css'
import { background } from '../config'
import { useLocale } from '../i18n/useLocale'
import { ui } from '../i18n/strings'

/** Background / "how I got here" block shown above the project timeline. */
export default function Story() {
  const { t } = useLocale()

  return (
    <section className="story" id="background">
      <p className="section-label">
        {t(ui.backgroundLabel)}
        <span className="bauhaus-dot" />
      </p>

      <div className="story__body">
        <h2 className="story__heading">{t(background.heading)}</h2>

        <div className="story__prose">
          {t(background.paragraphs).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <dl className="story__stats">
        {background.stats.map((stat) => (
          <div className="story__stat" key={stat.value}>
            <dt className="story__stat-label">{t(stat.label)}</dt>
            <dd className="story__stat-value">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
