import { useI18n } from '../i18n.jsx'
import { listings } from '../data/listings.js'
import { waLink, WHATSAPP_LINK } from '../config.js'
import { PinIcon, BedIcon, BathIcon, AreaIcon, WhatsAppIcon, ArrowIcon } from './icons.jsx'

function Card({ l }) {
  const { t, lang } = useI18n()
  const name = l.name[lang] || l.name.en
  const area = l.area[lang] || l.area.en
  const note = l.note ? (l.note[lang] || l.note.en) : null
  const entryVal = l.entry === 'immediate' ? t('rentals.immediate') : l.entry
  const msg = `${t('contact.prefill')} — ${name}, ${area} (₪${l.price.toLocaleString()}/mo)`

  return (
    <article className="card reveal">
      <div className="card__media">
        <img src={l.image} alt={`${name}, ${area}`} loading="lazy" />
        {l.badge && <span className="card__badge">{t(`rentals.${l.badge}`)}</span>}
        <span className="card__price"><b>₪{l.price.toLocaleString()}</b><span>{t('rentals.perMonth')}</span></span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <div className="card__area"><PinIcon /> {area}</div>

        <div className="card__specs">
          {l.sqm && <span className="spec"><AreaIcon /> {l.sqm}&nbsp;m²</span>}
          {l.beds && <span className="spec"><BedIcon /> {l.beds}&nbsp;{t('rentals.bedrooms')}</span>}
          {l.baths && <span className="spec"><BathIcon /> {l.baths}&nbsp;{t('rentals.bathrooms')}</span>}
        </div>

        {note && <div className="card__note">{note}</div>}

        <div className="card__feats">
          {l.features.map((f) => (
            <span className="chip" key={f}>{t(`feat.${f}`)}</span>
          ))}
        </div>

        <div className="card__entry">
          {t('rentals.entry')}: <b>{entryVal}</b>
          {l.inclArnona && <> · {t('rentals.inclArnona')}</>}
        </div>

        <a className="btn btn-gold card__cta btn-block" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> {t('rentals.ask')}
        </a>
      </div>
    </article>
  )
}

export default function Listings() {
  const { t } = useI18n()
  return (
    <section className="section listings" id="rentals">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow reveal">{t('rentals.eyebrow')}</div>
          <h2 className="section-title reveal d1">{t('rentals.title')}</h2>
          <p className="section-sub reveal d2">{t('rentals.sub')}</p>
        </div>

        <div className="listings__grid">
          {listings.map((l) => <Card key={l.id} l={l} />)}
        </div>

        <div className="listings__foot reveal">
          <a className="btn btn-ghost" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            {t('rentals.viewAll')} <ArrowIcon style={{ width: 16, height: 16 }} />
          </a>
        </div>
      </div>
    </section>
  )
}
