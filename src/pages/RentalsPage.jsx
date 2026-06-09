import { useI18n } from '../i18n.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Listings from '../components/Listings.jsx'
import ContactBand from '../components/ContactBand.jsx'

export default function RentalsPage() {
  const { t } = useI18n()
  return (
    <>
      <PageHeader
        eyebrow={t('rentals.eyebrow')}
        title={t('pages.rentals.title')}
        sub={t('pages.rentals.sub')}
        image="/images/jerusalem-kotel-2.jpg"
        crumb={t('nav.rentals')}
      />
      <Listings variant="bare" />
      <ContactBand />
    </>
  )
}
