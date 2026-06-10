import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { useContent, useWa } from '../content.jsx'
import { PinIcon, BedIcon, BathIcon, AreaIcon, WhatsAppIcon, ArrowIcon } from './icons.jsx'

function Card({ l }) {
  const { t } = useI18n()
  const { waLink } = useWa()
  const price = Number(l.price) || 0
  const entryVal = l.entry === 'immediate' ? t('rentals.immediate') : l.entry
  const msg = `${t('contact.prefill')} — ${l.name}, ${l.area} (₪${price.toLocaleString()}/mo)`

  return (
    <article className="card reveal">
      <div className="card__media">
        <img src={l.image} alt={`${l.name}, ${l.area}`} loading="lazy" />
        {l.badge ? <span className="card__badge">{t(`rentals.${l.badge}`)}</span> : null}
        <span className="card__price"><b>₪{price.toLocaleString()}</b><span>{t('rentals.perMonth')}</span></span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{l.name}</h3>
        <div className="card__area"><PinIcon /> {l.area}</div>

        <div className="card__specs">
          {l.sqm ? <span className="spec"><AreaIcon /> {l.sqm}&nbsp;m²</span> : null}
          {l.beds ? <span className="spec"><BedIcon /> {l.beds}&nbsp;{t('rentals.bedrooms')}</span> : null}
          {l.baths ? <span className="spec"><BathIcon /> {l.baths}&nbsp;{t('rentals.bathrooms')}</span> : null}
        </div>

        {l.note ? <div className="card__note">{l.note}</div> : null}

        {l.features && l.features.length > 0 && (
          <div className="card__feats">
            {l.features.map((f) => <span className="chip" key={f}>{t(`feat.${f}`)}</span>)}
          </div>
        )}

        <div className="card__entry">
          {t('rentals.entry')}: <b>{entryVal}</b>
          {l.inclArnona ? <> · {t('rentals.inclArnona')}</> : null}
        </div>

        <a className="btn btn-gold card__cta btn-block" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> {t('rentals.ask')}
        </a>
      </div>
    </article>
  )
}

export default function Listings({ variant = 'full', limit }) {
  const { t } = useI18n()
  const { link } = useWa()
  const { listings } = useContent()
  const bare = variant === 'bare'
  const featured = variant === 'featured'
  const items = limit ? listings.slice(0, limit) : listings

  // Mobile: the featured row becomes a swipeable carousel — these track the active card for the dots.
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const carousel = featured && items.length > 1
  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const frac = max > 0 ? Math.abs(el.scrollLeft) / max : 0
    setActive(Math.round(frac * (items.length - 1)))
  }
  const goTo = (i) => trackRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })

  return (
    <section className={`section listings${bare ? ' listings--bare' : ''}${featured ? ' listings--featured' : ''}`} id="rentals">
      <div className="container">
        {!bare && (
          <div className="section-head listings__head">
            <div>
              <div className="eyebrow reveal">{featured ? t('home.featuredEyebrow') : t('rentals.eyebrow')}</div>
              <h2 className="section-title reveal d1">{featured ? t('home.featuredTitle') : t('rentals.title')}</h2>
              <p className="section-sub reveal d2">{featured ? t('home.featuredSub') : t('rentals.sub')}</p>
            </div>
            {featured && (
              <Link className="link-arrow listings__viewall reveal d2" to="/rentals">
                {t('home.viewAllApts')} <ArrowIcon />
              </Link>
            )}
          </div>
        )}

        {items.length === 0 ? (
          <p className="listings__empty reveal">{t('home.noListings')}</p>
        ) : (
          <>
            <div className="listings__grid" ref={trackRef} onScroll={carousel ? onScroll : undefined}>
              {items.map((l) => <Card key={l.id} l={l} />)}
            </div>
            {carousel && (
              <div className="carousel-dots" role="tablist" aria-label="Apartments">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`cdot${i === active ? ' on' : ''}`}
                    aria-label={`${t('home.featuredTitle')} ${i + 1}`}
                    aria-selected={i === active}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {items.length > 0 && featured && (
          <div className="listings__foot reveal">
            <Link className="btn btn-ghost" to="/rentals">
              {t('home.viewAllApts')} <ArrowIcon style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
