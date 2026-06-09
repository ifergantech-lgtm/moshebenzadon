import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'

export default function PageHeader({ eyebrow, title, sub, image, crumb }) {
  const { t } = useI18n()
  return (
    <header className="pagehead" style={{ '--ph-img': `url(${image})` }}>
      <div className="pagehead__bg" />
      <div className="pagehead__grad" />
      <div className="container pagehead__inner">
        <nav className="crumbs reveal" aria-label="Breadcrumb">
          <Link to="/">{t('nav.home')}</Link>
          <span aria-hidden="true">/</span>
          <span>{crumb || title}</span>
        </nav>
        {eyebrow && <div className="eyebrow reveal d1">{eyebrow}</div>}
        <h1 className="pagehead__title serif reveal d2">{title}</h1>
        {sub && <p className="pagehead__sub reveal d3">{sub}</p>}
      </div>
    </header>
  )
}
