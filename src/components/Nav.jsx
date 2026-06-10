import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { useContent, useWa } from '../content.jsx'
import { BrandMark, WhatsAppIcon } from './icons.jsx'

const LINKS = [
  { to: '/rentals', key: 'rentals' },
  { to: '/sales', key: 'sales' },
  { to: '/about', key: 'about' },
  { to: '/contact', key: 'contact' },
]

export default function Nav() {
  const { t, lang, setLang, langs } = useI18n()
  const { settings } = useContent()
  const { link } = useWa()
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

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link className="brand" to="/" aria-label={settings.brand}>
          <BrandMark className="brand__mark" />
          <span>
            <span className="brand__name">{settings.brand}</span><br />
            <span className="brand__sub">Real Estate · Jerusalem</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/" end>{t('nav.home')}</NavLink>
          {LINKS.map((l) => <NavLink key={l.key} to={l.to}>{t(`nav.${l.key}`)}</NavLink>)}
        </nav>

        <div className="nav__right">
          <div className="lang" role="group" aria-label="Language">
            {langs.map((l, i) => (
              <span key={l.code} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && <i>/</i>}
                <button className={lang === l.code ? 'active' : ''} onClick={() => setLang(l.code)} aria-pressed={lang === l.code} lang={l.code}>{l.label}</button>
              </span>
            ))}
          </div>
          <a className="wa-pill" href={link} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> {t('nav.cta')}
          </a>
          <button className={`nav__burger${open ? ' open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div className={`drawer${open ? ' open' : ''}`}>
        <NavLink to="/" end onClick={close}>{t('nav.home')}</NavLink>
        {LINKS.map((l) => <NavLink key={l.key} to={l.to} onClick={close}>{t(`nav.${l.key}`)}</NavLink>)}
        <div className="lang drawer__lang" style={{ marginTop: 22, fontSize: 15, gap: 14 }}>
          {langs.map((l, i) => (
            <span key={l.code} style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              {i > 0 && <i>/</i>}
              <button className={lang === l.code ? 'active' : ''} onClick={() => setLang(l.code)} lang={l.code}>{l.name}</button>
            </span>
          ))}
        </div>
        <a className="btn btn-gold drawer__cta" href={link} target="_blank" rel="noopener noreferrer" onClick={close}>
          <WhatsAppIcon /> {t('nav.cta')}
        </a>
      </div>
    </header>
  )
}
