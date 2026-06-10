import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { useContent, useWa } from '../content.jsx'
import { BrandMark } from './icons.jsx'

export default function Footer() {
  const { t } = useI18n()
  const { settings } = useContent()
  const { link, numberDisplay } = useWa()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link className="brand" to="/">
              <BrandMark className="brand__mark" />
              <span>
                <span className="brand__name">{settings.brand}</span><br />
                <span className="brand__sub">Real Estate · Jerusalem</span>
              </span>
            </Link>
            <p>{t('footer.tagline')}</p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h5>{settings.brand}</h5>
              <Link to="/rentals">{t('footer.rentals')}</Link>
              <Link to="/sales">{t('footer.sales')}</Link>
              <Link to="/about">{t('footer.about')}</Link>
              <Link to="/contact">{t('footer.contact')}</Link>
            </div>
            <div className="footer__col">
              <h5>{settings.agent}</h5>
              <a href={link} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={link} target="_blank" rel="noopener noreferrer">{numberDisplay}</a>
              <Link to="/contact">{t('contact.location')}</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {settings.brand}. {t('footer.rights')}</span>
          <span>
            {t('footer.built')} · <Link to="/admin" className="footer__admin">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
