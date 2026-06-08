import { useI18n } from '../i18n.jsx'
import { WHATSAPP_LINK } from '../config.js'
import { WhatsAppIcon } from './icons.jsx'

export default function WhatsAppFloat() {
  const { t } = useI18n()
  return (
    <a className="wa-float" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label={t('waFloat')}>
      <WhatsAppIcon />
      <span className="wa-float__txt">{t('waFloat')}</span>
    </a>
  )
}
