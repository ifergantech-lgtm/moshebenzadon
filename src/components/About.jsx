import { useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { BRAND, WHATSAPP_LINK } from '../config.js'
import { UserIcon, WhatsAppIcon } from './icons.jsx'

export default function About() {
  const { t } = useI18n()
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="portrait reveal">
            {/* Drop Moshe's headshot at /public/images/moshe-portrait.jpg and it appears automatically */}
            <img
              src="/images/moshe-portrait.jpg"
              alt={t('about.portraitAlt')}
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity .5s' }}
            />
            {!loaded && (
              <div className="portrait__ph">
                <UserIcon />
                <span>{t('about.portraitAlt')}</span>
              </div>
            )}
            <div className="portrait__tag">
              <b>Moshe Benzadon</b>
              <span>{BRAND}</span>
            </div>
          </div>

          <div className="about__body">
            <div className="eyebrow reveal">{t('about.eyebrow')}</div>
            <h2 className="section-title reveal d1">{t('about.title')}</h2>
            <p className="reveal d2">{t('about.p1')}</p>
            <p className="reveal d2">{t('about.p2')}</p>
            <p className="reveal d3">{t('about.p3')}</p>

            <div className="about__feats reveal d4">
              <div className="afeat"><b>{t('about.f1')}</b><span>{t('about.f1d')}</span></div>
              <div className="afeat"><b>{t('about.f2')}</b><span>{t('about.f2d')}</span></div>
              <div className="afeat"><b>{t('about.f3')}</b><span>{t('about.f3d')}</span></div>
            </div>

            <a className="btn btn-gold about__cta reveal" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {t('about.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
