import { useEffect, useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { BRAND, WHATSAPP_LINK } from '../config.js'
import { BrandMark, WhatsAppIcon } from './icons.jsx'

const SECTIONS = ['rentals', 'sales', 'services', 'about', 'contact']

export default function Nav() {
  const { t, lang, setLang, langs } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="brand" href="#home" aria-label={BRAND}>
          <BrandMark className="brand__mark" />
          <span>
            <span className="brand__name">{BRAND}</span><br />
            <span className="brand__sub">Real Estate · Jerusalem</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#home">{t('nav.home')}</a>
          {SECTIONS.map((s) => (
            <a key={s} href={`#${s}`}>{t(`nav.${s}`)}</a>
          ))}
        </nav>

        <div className="nav__right">
          <div className="lang" role="group" aria-label="Language">
            {langs.map((l, i) => (
              <span key={l.code} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && <i>/</i>}
                <button
                  className={lang === l.code ? 'active' : ''}
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  lang={l.code}
                >{l.label}</button>
              </span>
            ))}
          </div>
          <a className="wa-pill" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> {t('nav.cta')}
          </a>
          <button
            className={`nav__burger${open ? ' open' : ''}`}
            aria-label="Menu" aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div className={`drawer${open ? ' open' : ''}`}>
        <a href="#home" onClick={() => setOpen(false)}>{t('nav.home')}</a>
        {SECTIONS.map((s) => (
          <a key={s} href={`#${s}`} onClick={() => setOpen(false)}>{t(`nav.${s}`)}</a>
        ))}
        <div className="lang drawer__lang" style={{ marginTop: 22, fontSize: 15, gap: 14 }}>
          {langs.map((l, i) => (
            <span key={l.code} style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              {i > 0 && <i>/</i>}
              <button className={lang === l.code ? 'active' : ''} onClick={() => setLang(l.code)} lang={l.code}>{l.name}</button>
            </span>
          ))}
        </div>
        <a className="btn btn-gold drawer__cta" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          <WhatsAppIcon /> {t('nav.cta')}
        </a>
      </div>
    </header>
  )
}
