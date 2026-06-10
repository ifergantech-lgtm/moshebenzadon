import { useI18n } from '../i18n.jsx'
import PageHeader from '../components/PageHeader.jsx'
import About from '../components/About.jsx'
import Services from '../components/Services.jsx'
import ContactBand from '../components/ContactBand.jsx'

export default function AboutPage() {
  const { t } = useI18n()
  return (
    <>
      <PageHeader
        eyebrow={t('about.eyebrow')}
        title={t('pages.about.title')}
        sub={t('pages.about.sub')}
        image="/images/jerusalem-mamilla.jpg"
        crumb={t('nav.about')}
      />
      <About bare />
      <Services bare />
      <ContactBand />
    </>
  )
}
