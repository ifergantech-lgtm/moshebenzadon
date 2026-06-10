import { Suspense, lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { useWa } from '../content.jsx'
import { WhatsAppIcon, ArrowIcon } from './icons.jsx'

const HeroCanvas = lazy(() => import('./HeroCanvas.jsx'))

// Lightweight CSS star/light field for phones (where the WebGL canvas stays off
// to save battery + data). Fixed positions so it renders identically every paint.
const SPARKS = [
  { x: 7, y: 20, s: 3, d: 0 }, { x: 16, y: 52, s: 2, d: 1.1 }, { x: 23, y: 31, s: 2, d: 2.3 },
  { x: 31, y: 67, s: 3, d: 0.6 }, { x: 39, y: 18, s: 2, d: 1.7 }, { x: 47, y: 44, s: 2, d: 3.0 },
  { x: 54, y: 27, s: 3, d: 0.3 }, { x: 61, y: 60, s: 2, d: 2.0 }, { x: 68, y: 22, s: 2, d: 1.4 },
  { x: 74, y: 48, s: 3, d: 2.7 }, { x: 81, y: 33, s: 2, d: 0.9 }, { x: 88, y: 58, s: 2, d: 1.9 },
  { x: 92, y: 25, s: 3, d: 3.3 }, { x: 12, y: 73, s: 2, d: 2.5 }, { x: 43, y: 75, s: 2, d: 0.5 },
  { x: 84, y: 72, s: 3, d: 1.5 },
]

export default function Hero() {
  const { t } = useI18n()
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

  return (
    <section className="hero" id="home">
      <div className="hero__media">
        <img className="hero__img" src="/images/jerusalem-dome-rock.jpg" alt="The Old City of Jerusalem lit up at night, seen across the valley" fetchpriority="high" />
      </div>
      {enable3d && (
        <div className="hero__canvas">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}
      <div className="hero__grad" />
      <div className="hero__sparks" aria-hidden="true">
        {SPARKS.map((p, i) => (
          <span key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }} />
        ))}
      </div>

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
