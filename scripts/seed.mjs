// One-time seed: pushes the current listings + settings into Supabase.
// Usage:  node scripts/seed.mjs "moshe@email.com" "hispassword"
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const SUPABASE_URL = 'https://vfmwfduyithgdorzipce.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbXdmZHV5aXRoZ2RvcnppcGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDg3MDcsImV4cCI6MjA5NjY4NDcwN30.rkg_9tcchoeyI_hC3-lpbA5H68La7HBXWbYTNTZCFew'

const [, , email, password] = process.argv
if (!email || !password) {
  console.error('Usage: node scripts/seed.mjs "<email>" "<password>"')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const content = JSON.parse(readFileSync(new URL('../public/data/content.json', import.meta.url), 'utf8'))

function listingToDb(l, i) {
  return {
    id: l.id, name: l.name, area: l.area, price: l.price,
    sqm: l.sqm ?? null, beds: l.beds ?? null, baths: l.baths ?? null,
    entry: l.entry || 'immediate', incl_arnona: !!l.inclArnona,
    badge: l.badge || '', note: l.note || '', image: l.image || '',
    features: l.features || [], active: l.active !== false, sort: i,
  }
}

const s = content.settings
const settingsRow = {
  id: 1, brand: s.brand, agent: s.agent,
  whatsapp_link: s.whatsappLink, whatsapp_number_display: s.whatsappNumberDisplay,
  whatsapp_number_intl: s.whatsappNumberIntl, price_min: s.priceMin, price_max: s.priceMax,
  about_en: '', about_he: '', about_es: '',
}

const { error: authErr } = await supabase.auth.signInWithPassword({ email, password })
if (authErr) { console.error('AUTH FAILED:', authErr.message); process.exit(1) }
console.log('Logged in as', email)

const { error: sErr } = await supabase.from('settings').upsert(settingsRow)
console.log(sErr ? 'settings error: ' + sErr.message : 'settings seeded')

const rows = content.listings.map(listingToDb)
const { error: lErr } = await supabase.from('listings').upsert(rows)
console.log(lErr ? 'listings error: ' + lErr.message : `seeded ${rows.length} listings`)

process.exit(0)
