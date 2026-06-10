import { useI18n } from '../i18n.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Sales from '../components/Sales.jsx'
import ContactBand from '../components/ContactBand.jsx'

export default function SalesPage() {
  const { t } = useI18n()
  return (
    <>
      <PageHeader
        eyebrow={t('sales.eyebrow')}
        title={t('pages.sales.title')}
        sub={t('pages.sales.sub')}
        image="/images/jerusalem-skyline.jpg"
        crumb={t('nav.sales')}
      />
      <Sales bare />
      <ContactBand />
    </>
  )
}
