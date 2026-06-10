import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { SearchIcon, ChatIcon, DealIcon, DocIcon, PenIcon, ArrowIcon } from './icons.jsx'

const ICONS = [SearchIcon, ChatIcon, DealIcon, DocIcon, PenIcon]

export default function Services({ bare = false, preview = false }) {
  const { t } = useI18n()
  let items = t('services.items') || []
  if (preview) items = items.slice(0, 3)

  return (
    <section className="section services" id="services">
      <div className="container">
        {!bare && (
          <div className="section-head services__head">
            <div>
              <div className="eyebrow reveal">{t('services.eyebrow')}</div>
              <h2 className="section-title reveal d1">{t('services.title')}</h2>
              <p className="section-sub reveal d2">{t('services.sub')}</p>
            </div>
            {preview && (
              <Link className="link-arrow reveal d2" to="/services">{t('home.servicesAll')} <ArrowIcon /></Link>
            )}
          </div>
        )}

        <div className="steps">
          {items.map((it, i) => {
            const Icon = ICONS[i] || SearchIcon
            return (
              <div className={`step reveal d${(i % 3) + 1}`} key={i}>
                <div className="step__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="step__icon"><Icon /></div>
                <h3 className="step__t">{it.t}</h3>
                <p className="step__d">{it.d}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
