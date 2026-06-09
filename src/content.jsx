import { createContext, useContext, useEffect, useState } from 'react'

// Default/fallback content so the site always renders even if the fetch fails.
const FALLBACK = {
  settings: {
    brand: 'Classic Jerusalem Realty',
    agent: 'Moshe Benzadon',
    whatsappLink: 'https://wa.me/message/CVXZWPQ54HCGL1',
    whatsappNumberDisplay: '+972 51-517-9928',
    whatsappNumberIntl: '972515179928',
    priceMin: 6000,
    priceMax: 25000,
    about: { en: '', he: '', es: '' },
  },
  listings: [],
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetch(`/data/content.json?t=${Date.now()}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (alive) { setContent(d); setLoading(false) } })
      .catch(() => { if (alive) { setContent(FALLBACK); setLoading(false) } })
    return () => { alive = false }
  }, [])

  const settings = { ...FALLBACK.settings, ...(content?.settings || {}) }
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
