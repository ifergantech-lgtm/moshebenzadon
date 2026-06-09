import { useI18n } from '../i18n.jsx'
import { useContent } from '../content.jsx'

export default function Stats() {
  const { t } = useI18n()
  const { settings } = useContent()
  const min = Math.round((Number(settings.priceMin) || 6000) / 1000)
  const max = Math.round((Number(settings.priceMax) || 25000) / 1000)
  const items = [
    { b: `₪${min}k–${max}k`, s: t('stats.range') },
    { b: '6+', s: t('stats.neighborhoods') },
    { b: '100%', s: t('stats.service') },
    { b: 'EN·HE·ES', s: t('stats.languages') },
  ]
  return (
    <section className="stats" aria-label="Highlights">
      <div className="container">
        <div className="stats__grid">
          {items.map((it, i) => (
            <div className="stat reveal" key={i}>
              <b>{it.b}</b>
              <span>{it.s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
