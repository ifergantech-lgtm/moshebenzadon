import { Suspense, lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { useContent, useWa } from '../content.jsx'
import { WhatsAppIcon, ArrowIcon } from './icons.jsx'

const HeroCanvas = lazy(() => import('./HeroCanvas.jsx'))

export default function Hero() {
  const { t } = useI18n()
  const { settings } = useContent()
  const { link } = useWa()
  const [enable3d, setEnable3d] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width:720px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnable3d(mq.matches && !rm.matches)
    update()
    mq.addEventListener('change', update)
    rm.addEventListener('change', update)
    return () => { mq.removeEventListener('change', update); rm.removeEventListener('change', update) }
  }, [])

  const min = Number(settings.priceMin || 6000).toLocaleString()
  const max = Number(settings.priceMax || 25000).toLocaleString()

  return (
    <section className="hero" id="home">
      <div className="hero__media">
        <img className="hero__img" src="/images/jerusalem-dome-rock.jpg" alt="The Old City of Jerusalem lit up at night, seen from the Mount of Olives" fetchpriority="high" />
      </div>
      {enable3d && (
        <div className="hero__canvas">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}
      <div className="hero__grad" />

      <div className="hero__content">
        <div className="hero__eyebrow eyebrow reveal">{t('hero.eyebrow')}</div>
        <h1 className="hero__title reveal d1">
          {t('hero.title1')}<br /><em>{t('hero.title2')}</em>
        </h1>
        <div className="hero__sub-wrap reveal d2">
          <p className="hero__sub">{t('hero.sub')}</p>
        </div>
        <div className="hero__cta reveal d3">
          <a className="btn btn-gold" href={link} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> {t('hero.ctaPrimary')}
          </a>
          <Link className="btn btn-ghost" to="/rentals">
            {t('hero.ctaSecondary')} <ArrowIcon style={{ width: 16, height: 16 }} />
          </Link>
        </div>
        <div className="hero__meta reveal d4">
          <span className="price-pill"><b>₪{min}&nbsp;–&nbsp;₪{max}</b> <span>{t('hero.priceLabel')}</span></span>
          <span className="hero__note">{t('hero.metaNote')}</span>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>{t('hero.scroll')}</span>
        <i />
      </div>
    </section>
  )
}
