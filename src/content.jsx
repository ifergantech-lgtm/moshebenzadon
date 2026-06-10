import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, dbToListing, dbToSettings } from './supabase.js'

// Default/fallback content so the site always renders even if the fetch fails.
const FALLBACK = {
  settings: {
    brand: 'Moshe',
    agent: 'Moshe',
    whatsappLink: 'https://wa.me/message/CVXZWPQ54HCGL1',
    whatsappNumberDisplay: '+972 51-517-9928',
    whatsappNumberIntl: '972515179928',
    priceMin: 6000,
    priceMax: 25000,
    about: {
      en: `Quick story: I was born in Venezuela and made aliyah as a teenager — and I pretty much fell for Jerusalem on day one.\nI caught the real-estate bug young, and now it's what I do full-time. I'll treat your apartment hunt like I'm finding a home for a friend (by the end, you usually are one) — straight answers, fast replies, and someone who actually knows the city block by block: which buildings get the good light, which streets stay quiet on Shabbat.\nRenting or buying, in English, Hebrew or Spanish — just message me and let's find your place.`,
      he: `סיפור קצר: נולדתי בוונצואלה ועליתי לארץ כנער — והתאהבתי בירושלים פחות או יותר מהיום הראשון.\nאת החיידק של הנדל"ן תפסתי צעיר, והיום זו העבודה שלי במשרה מלאה. אני מתייחס לחיפוש הדירה שלכם כאילו אני מוצא בית לחבר (ובסוף, בדרך כלל, אתם באמת נהיים חברים) — תשובות ישירות, מענה מהיר, ומישהו שבאמת מכיר את העיר בניין-בניין: איזה בניין מקבל אור טוב ואיזה רחוב נשאר שקט בשבת.\nלהשכרה או לקנייה, באנגלית, עברית או ספרדית — פשוט שלחו לי הודעה ונמצא את המקום שלכם.`,
      es: `Una historia rápida: nací en Venezuela e hice aliá siendo adolescente — y me enamoré de Jerusalén casi desde el primer día.\nMe picó el gusanillo del inmobiliario muy joven, y hoy me dedico a esto a tiempo completo. Vivo tu búsqueda de piso como si buscara casa para un amigo (y al final, normalmente lo eres) — respuestas claras, contestación rápida y alguien que conoce la ciudad calle por calle: qué edificios tienen mejor luz y qué calles quedan tranquilas en Shabat.\nAlquilar o comprar, en inglés, hebreo o español — escríbeme y encontremos tu lugar.`,
    },
  },
  listings: [],
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    async function load() {
      try {
        const [settingsRes, listingsRes] = await Promise.all([
          supabase.from('settings').select('*').eq('id', 1).single(),
          supabase.from('listings').select('*').order('sort', { ascending: true }),
        ])
        const settings = settingsRes.data ? dbToSettings(settingsRes.data) : FALLBACK.settings
        let listings = Array.isArray(listingsRes.data) ? listingsRes.data.map(dbToListing) : []
        // Until the database is seeded, fall back to the bundled starter listings.
        if (listings.length === 0) {
          try {
            const cj = await fetch('/data/content.json?t=' + Date.now()).then((r) => (r.ok ? r.json() : null))
            if (cj && Array.isArray(cj.listings)) listings = cj.listings
          } catch (e) { /* ignore */ }
        }
        if (!alive) return
        setContent({ settings, listings })
      } catch (e) {
        if (alive) setContent(FALLBACK)
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => { alive = false }
  }, [])

  const base = { ...FALLBACK.settings, ...(content?.settings || {}) }
  const cAbout = content?.settings?.about || {}
  const about = {
    en: (cAbout.en || '').trim() || FALLBACK.settings.about.en,
    he: (cAbout.he || '').trim() || FALLBACK.settings.about.he,
    es: (cAbout.es || '').trim() || FALLBACK.settings.about.es,
  }
  const settings = { ...base, about }
  const allListings = content?.listings || []
  const listings = allListings.filter((l) => l && l.active !== false)

  return (
    <ContentContext.Provider value={{ loading, settings, listings, allListings }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const c = useContext(ContentContext)
  if (!c) throw new Error('useContent must be used within ContentProvider')
  return c
}

// Convenience hook for WhatsApp links driven by editable settings.
export function useWa() {
  const { settings } = useContent()
  const intl = settings.whatsappNumberIntl
  return {
    link: settings.whatsappLink,
    numberDisplay: settings.whatsappNumberDisplay,
    numberIntl: intl,
    waLink: (msg) => (msg ? `https://wa.me/${intl}?text=${encodeURIComponent(msg)}` : settings.whatsappLink),
  }
}
