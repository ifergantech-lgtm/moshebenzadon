import { useI18n } from '../i18n.jsx'
import { useWa } from '../content.jsx'
import { WhatsAppIcon } from './icons.jsx'

export default function WhatsAppFloat() {
  const { t } = useI18n()
  const { link } = useWa()
  return (
    <a className="wa-float" href={link} target="_blank" rel="noopener noreferrer" aria-label={t('waFloat')}>
      <WhatsAppIcon />
      <span className="wa-float__txt">{t('waFloat')}</span>
    </a>
  )
}
