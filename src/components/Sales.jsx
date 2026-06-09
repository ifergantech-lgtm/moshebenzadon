import { useI18n } from '../i18n.jsx'
import { useWa } from '../content.jsx'
import { TagIcon, ScaleIcon, ShieldIcon, WhatsAppIcon } from './icons.jsx'

export default function Sales({ bare = false }) {
  const { t } = useI18n()
  const { waLink } = useWa()
  const points = [
    { Icon: TagIcon, h: t('sales.p1'), d: t('sales.p1d') },
    { Icon: ScaleIcon, h: t('sales.p2'), d: t('sales.p2d') },
    { Icon: ShieldIcon, h: t('sales.p3'), d: t('sales.p3d') },
  ]
  const msg = `${t('sales.cta')} — ${t('sales.eyebrow')}`

  return (
    <section className="section sales" id="sales">
      <div className="container">
        <div className="sales__grid">
          <div className="sales__media reveal">
            <img src="/images/jerusalem-street-door.jpg" alt="A doorway in a Jerusalem stone building" loading="lazy" />
          </div>
          <div className="sales__text">
            {!bare && <div className="eyebrow reveal">{t('sales.eyebrow')}</div>}
            {!bare && <h2 className="section-title reveal d1">{t('sales.title')}</h2>}
            <p className="section-sub reveal d2">{t('sales.sub')}</p>

            <div className="sales__points">
              {points.map((p, i) => (
                <div className={`point reveal d${i + 2}`} key={i}>
                  <div className="point__ic"><p.Icon /></div>
                  <div>
                    <h4>{p.h}</h4>
                    <p>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <a className="btn btn-gold sales__cta reveal" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {t('sales.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
