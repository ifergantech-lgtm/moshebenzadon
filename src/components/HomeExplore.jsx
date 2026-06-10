import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { ArrowIcon } from './icons.jsx'

export default function HomeExplore() {
  const { t } = useI18n()
  const cards = [
    { to: '/sales', img: '/images/jerusalem-skyline.jpg', eyebrow: t('sales.eyebrow'), title: t('sales.title'), text: t('home.salesText') },
    { to: '/about', img: '/images/jerusalem-mamilla.jpg', eyebrow: t('about.eyebrow'), title: t('home.aboutTitle'), text: t('home.aboutText') },
  ]
  return (
    <section className="section explore">
      <div className="container">
        <div className="explore__grid">
          {cards.map((c, i) => (
            <Link key={i} to={c.to} className={`exp-card reveal d${i + 1}`}>
              <div className="exp-card__media"><img src={c.img} alt="" loading="lazy" /></div>
              <div className="exp-card__body">
                <div className="eyebrow">{c.eyebrow}</div>
                <h3 className="serif">{c.title}</h3>
                <p>{c.text}</p>
                <span className="link-arrow">{t('common.learnMore')} <ArrowIcon /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
