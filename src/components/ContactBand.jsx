import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { useWa } from '../content.jsx'
import { WhatsAppIcon, ArrowIcon } from './icons.jsx'

export default function ContactBand() {
  const { t } = useI18n()
  const { waLink } = useWa()
  return (
    <section className="cta-band">
      <div className="cta-band__glow" />
      <div className="container cta-band__inner">
        <div className="cta-band__text">
          <div className="eyebrow reveal">{t('contact.eyebrow')}</div>
          <h2 className="cta-band__title serif reveal d1">{t('contact.title')}</h2>
        </div>
        <div className="cta-band__actions reveal d2">
          <a className="btn btn-gold" href={waLink(t('contact.prefill'))} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> {t('contact.ctaPrimary')}
          </a>
          <Link className="btn btn-ghost" to="/contact">
            {t('nav.contact')} <ArrowIcon style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
