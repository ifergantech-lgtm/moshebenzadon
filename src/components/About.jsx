import { useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { useContent, useWa } from '../content.jsx'
import { UserIcon, WhatsAppIcon } from './icons.jsx'

export default function About({ bare = false }) {
  const { t, lang } = useI18n()
  const { settings } = useContent()
  const { link } = useWa()
  const [loaded, setLoaded] = useState(false)

  const aboutText = (settings.about && (settings.about[lang] || settings.about.en)) || ''
  const paras = aboutText.split('\n').map((s) => s.trim()).filter(Boolean)
  const fallback = [t('about.p1'), t('about.p2'), t('about.p3')]
  const body = paras.length ? paras : fallback

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="portrait reveal">
            {/* Drop Moshe's headshot at /public/images/moshe-portrait.jpg (or upload via /admin) */}
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
              <b>{settings.agent || 'Moshe Benzadon'}</b>
              <span>{settings.brand || 'Classic Jerusalem Realty'}</span>
            </div>
          </div>

          <div className="about__body">
            {!bare && <div className="eyebrow reveal">{t('about.eyebrow')}</div>}
            {!bare && <h2 className="section-title reveal d1">{t('about.title')}</h2>}
            {body.map((p, i) => (
              <p className={`reveal d${Math.min(i + 2, 4)}`} key={i}>{p}</p>
            ))}

            <div className="about__feats reveal d4">
              <div className="afeat"><b>{t('about.f1')}</b><span>{t('about.f1d')}</span></div>
              <div className="afeat"><b>{t('about.f2')}</b><span>{t('about.f2d')}</span></div>
              <div className="afeat"><b>{t('about.f3')}</b><span>{t('about.f3d')}</span></div>
            </div>

            <a className="btn btn-gold about__cta reveal" href={link} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {t('about.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
