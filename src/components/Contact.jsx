import { useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { useWa } from '../content.jsx'
import { WhatsAppIcon, PhoneIcon, ClockIcon, PinIcon } from './icons.jsx'

export default function Contact({ bare = false }) {
  const { t } = useI18n()
  const { link, waLink, numberDisplay, numberIntl } = useWa()
  const [name, setName] = useState('')
  const [need, setNeed] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const parts = [t('contact.prefill')]
    if (name.trim()) parts.push(`${t('contact.formName')}: ${name.trim()}`)
    if (need.trim()) parts.push(need.trim())
    window.open(waLink(parts.join(' — ')), '_blank', 'noopener')
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        {!bare && (
          <div className="section-head">
            <div className="eyebrow reveal">{t('contact.eyebrow')}</div>
            <h2 className="section-title reveal d1">{t('contact.title')}</h2>
            <p className="section-sub reveal d2">{t('contact.sub')}</p>
          </div>
        )}

        <div className="contact__grid">
          <div className="contact__panel reveal d1">
            <a className="btn btn-gold btn-block" href={link} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {t('contact.ctaPrimary')}
            </a>
            <div className="contact__info">
              <a className="cinfo" href={link} target="_blank" rel="noopener noreferrer">
                <span className="cinfo__ic"><WhatsAppIcon /></span>
                <span><b>WhatsApp</b><span>{numberDisplay}</span></span>
              </a>
              <a className="cinfo" href={`tel:+${numberIntl}`}>
                <span className="cinfo__ic"><PhoneIcon /></span>
                <span><b>{t('contact.call')}</b><span>{numberDisplay}</span></span>
              </a>
              <div className="cinfo">
                <span className="cinfo__ic"><ClockIcon /></span>
                <span><b>{t('contact.hours')}</b><span>Sun–Thu · Fri morning</span></span>
              </div>
              <div className="cinfo">
                <span className="cinfo__ic"><PinIcon /></span>
                <span><b>{t('contact.location')}</b><span>All Jerusalem neighborhoods</span></span>
              </div>
            </div>
          </div>

          <form className="contact__panel reveal d2" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="cname">{t('contact.formName')}</label>
              <input id="cname" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="cneed">{t('contact.formNeed')}</label>
              <textarea id="cneed" value={need} onChange={(e) => setNeed(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-gold btn-block">
              <WhatsAppIcon /> {t('contact.formSend')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
