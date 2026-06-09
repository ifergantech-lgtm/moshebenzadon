import { useI18n } from '../i18n.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Services from '../components/Services.jsx'
import ContactBand from '../components/ContactBand.jsx'

export default function ServicesPage() {
  const { t } = useI18n()
  return (
    <>
      <PageHeader
        eyebrow={t('services.eyebrow')}
        title={t('pages.services.title')}
        sub={t('pages.services.sub')}
        image="/images/jerusalem-night-alley.jpg"
        crumb={t('nav.services')}
      />
      <Services bare />
      <ContactBand />
    </>
  )
}
