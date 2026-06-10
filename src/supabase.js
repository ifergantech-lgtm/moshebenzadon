import { createClient } from '@supabase/supabase-js'

// Public project URL + anon key. The anon key is SAFE to ship in the client —
// it only allows what the Row Level Security policies allow (public read,
// authenticated write). Real protection is the RLS policies + admin login.
const SUPABASE_URL = 'https://vfmwfduyithgdorzipce.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbXdmZHV5aXRoZ2RvcnppcGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDg3MDcsImV4cCI6MjA5NjY4NDcwN30.rkg_9tcchoeyI_hC3-lpbA5H68La7HBXWbYTNTZCFew'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
})

export const PHOTO_BUCKET = 'apartments'

// ---- shape mapping: DB (snake_case) <-> app (camelCase) ----
export function dbToListing(r) {
  return {
    id: r.id,
    name: r.name || '',
    area: r.area || '',
    price: Number(r.price) || 0,
    sqm: r.sqm,
    beds: r.beds,
    baths: r.baths,
    entry: r.entry || 'immediate',
    inclArnona: !!r.incl_arnona,
    badge: r.badge || '',
    note: r.note || '',
    image: r.image || '',
    features: Array.isArray(r.features) ? r.features : [],
    active: r.active !== false,
    sort: r.sort ?? 0,
  }
}

export function listingToDb(l) {
  return {
    id: l.id,
    name: l.name || '',
    area: l.area || '',
    price: Number(l.price) || 0,
    sqm: l.sqm === '' || l.sqm == null ? null : Number(l.sqm),
    beds: l.beds === '' || l.beds == null ? null : Number(l.beds),
    baths: l.baths === '' || l.baths == null ? null : Number(l.baths),
    entry: l.entry || 'immediate',
    incl_arnona: !!l.inclArnona,
    badge: l.badge || '',
    note: l.note || '',
    image: l.image || '',
    features: l.features || [],
    active: l.active !== false,
    sort: l.sort ?? 0,
  }
}

export function dbToSettings(r) {
  return {
    brand: r.brand || 'Moshe',
    agent: r.agent || 'Moshe',
    whatsappLink: r.whatsapp_link || '',
    whatsappNumberDisplay: r.whatsapp_number_display || '',
    whatsappNumberIntl: r.whatsapp_number_intl || '',
    priceMin: r.price_min ?? 6000,
    priceMax: r.price_max ?? 25000,
    about: { en: r.about_en || '', he: r.about_he || '', es: r.about_es || '' },
  }
}

export function settingsToDb(s) {
  return {
    id: 1,
    brand: s.brand || 'Moshe',
    agent: s.agent || 'Moshe',
    whatsapp_link: s.whatsappLink || '',
    whatsapp_number_display: s.whatsappNumberDisplay || '',
    whatsapp_number_intl: s.whatsappNumberIntl || '',
    price_min: Number(s.priceMin) || 0,
    price_max: Number(s.priceMax) || 0,
    about_en: s.about?.en || '',
    about_he: s.about?.he || '',
    about_es: s.about?.es || '',
  }
}
