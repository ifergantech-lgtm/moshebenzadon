import { useI18n } from '../i18n.jsx'
import { BRAND, AGENT, WHATSAPP_LINK, WHATSAPP_NUMBER_DISPLAY } from '../config.js'
import { BrandMark } from './icons.jsx'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="brand" href="#home">
              <BrandMark className="brand__mark" />
              <span>
                <span className="brand__name">{BRAND}</span><br />
                <span className="brand__sub">Real Estate · Jerusalem</span>
              </span>
            </a>
            <p>{t('footer.tagline')}</p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h5>{BRAND}</h5>
              <a href="#rentals">{t('footer.rentals')}</a>
              <a href="#sales">{t('footer.sales')}</a>
              <a href="#services">{t('footer.services')}</a>
              <a href="#about">{t('footer.about')}</a>
              <a href="#contact">{t('footer.contact')}</a>
            </div>
            <div className="footer__col">
              <h5>{AGENT}</h5>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{WHATSAPP_NUMBER_DISPLAY}</a>
              <a href="#contact">{t('contact.location')}</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {BRAND}. {t('footer.rights')}</span>
          <span>{t('footer.built')}</span>
        </div>
      </div>
    </footer>
  )
}
