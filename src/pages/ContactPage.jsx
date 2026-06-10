import { useI18n } from '../i18n.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Contact from '../components/Contact.jsx'

export default function ContactPage() {
  const { t } = useI18n()
  return (
    <>
      <PageHeader
        eyebrow={t('contact.eyebrow')}
        title={t('pages.contact.title')}
        sub={t('pages.contact.sub')}
        image="/images/jerusalem-tower.jpg"
        crumb={t('nav.contact')}
      />
      <Contact bare />
    </>
  )
}
