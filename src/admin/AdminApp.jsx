import { useState, useEffect } from 'react'
import './admin.css'
import SettingsPanel from './SettingsPanel.jsx'
import ListingsPanel from './ListingsPanel.jsx'
import { IconSave } from './AdminIcons.jsx'
import { supabase, dbToSettings, dbToListing, settingsToDb, listingToDb } from '../supabase.js'

// ────────────────────────────────────────────────────────────────
//  Defaults used when there is no settings row yet
// ────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  brand: 'Moshe',
  agent: 'Moshe',
  whatsappLink: 'https://wa.me/972515179928',
  whatsappNumberDisplay: '+972 51-517-9928',
  whatsappNumberIntl: '972515179928',
  priceMin: 6000,
  priceMax: 25000,
  about: { en: '', he: '', es: '' },
}

// ────────────────────────────────────────────────────────────────
//  Login Gate — Supabase email + password
// ────────────────────────────────────────────────────────────────
function LoginGate({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    // Phones love to add a trailing space (autocomplete/double-tap) or capitalise
    // the first letter — both make Supabase reject the login. Normalise first.
    const em = email.trim().toLowerCase()
    const pw = password.trim()
    if (!em || !pw) return
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({ email: em, password: pw })
    if (authError) {
      setError('Wrong email or password. Check there is no extra space.')
      setLoading(false)
      return
    }
    // onLogin will be triggered by onAuthStateChange in the parent
  }

  return (
    <div className="admin-root">
      <div className="admin-login">
        <div className="admin-login__box">
          <div className="admin-login__logo">Moshe</div>
          <div className="admin-login__sub">Admin Panel — Moshe</div>

          <form onSubmit={handleSubmit}>
            <label className="admin-login__label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="admin-login__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              placeholder="admin@example.com"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              inputMode="email"
            />
            <label className="admin-login__label" htmlFor="login-pw" style={{ marginTop: 12 }}>
              Password
            </label>
            <input
              id="login-pw"
              type="password"
              className="admin-login__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            <button type="submit" className="admin-login__btn" disabled={loading}>
              {loading ? 'Signing in…' : 'Enter Admin Panel'}
            </button>
          </form>

          {error && (
            <div className="admin-login__error">{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
//  Main Editor
// ────────────────────────────────────────────────────────────────
export default function AdminApp() {
  // Auth — initialise from session so there's no flash on reload
  const [authed, setAuthed] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  // Data
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [listings, setListings] = useState([])

  // UI state
  const [tab, setTab] = useState('listings') // 'settings' | 'listings'
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState(null) // { type:'success'|'error', text }

  // ── Bootstrap: check existing session, then subscribe to changes ──
  useEffect(() => {
    // Check for an existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(Boolean(session))
      setAuthChecked(true)
    })

    // React to login / logout events (including tab-close token expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session))
      setAuthChecked(true)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ── Load content from Supabase when authed ───────────────────
  useEffect(() => {
    if (!authed) return
    setLoading(true)

    Promise.all([
      supabase.from('settings').select('*').eq('id', 1).single(),
      supabase.from('listings').select('*').order('sort', { ascending: true }),
    ]).then(async ([settingsRes, listingsRes]) => {
      // Settings
      if (settingsRes.data) {
        const s = dbToSettings(settingsRes.data)
        setSettings({
          ...DEFAULT_SETTINGS,
          ...s,
          about: { ...DEFAULT_SETTINGS.about, ...s.about },
        })
      } else {
        setSettings({ ...DEFAULT_SETTINGS })
      }

      // Listings — if the DB is empty, start from the bundled starter set
      let rows = listingsRes.data ? listingsRes.data.map(dbToListing) : []
      if (rows.length === 0) {
        try {
          const cj = await fetch('/data/content.json?t=' + Date.now()).then((r) => (r.ok ? r.json() : null))
          if (cj && Array.isArray(cj.listings)) rows = cj.listings
        } catch (e) { /* ignore */ }
      }
      setListings(rows)
    }).finally(() => setLoading(false))
  }, [authed])

  // ── Logout ───────────────────────────────────────────────────
  async function handleLogout() {
    await supabase.auth.signOut()
    // onAuthStateChange will flip authed → false
  }

  // ── Save / Publish ───────────────────────────────────────────
  async function handleSave() {
    setSaving(true)
    setSaveMsg(null)

    try {
      // 1. Upsert settings
      const { error: settingsErr } = await supabase
        .from('settings')
        .upsert(settingsToDb(settings))

      if (settingsErr) throw settingsErr

      // 2a. Read existing listing ids
      const { data: existing, error: existingErr } = await supabase
        .from('listings')
        .select('id')

      if (existingErr) throw existingErr

      const existingIds = (existing || []).map(r => r.id)
      const currentIds = listings.map(l => l.id)
      const removedIds = existingIds.filter(id => !currentIds.includes(id))

      // 2b. Delete removed listings
      if (removedIds.length > 0) {
        const { error: deleteErr } = await supabase
          .from('listings')
          .delete()
          .in('id', removedIds)
        if (deleteErr) throw deleteErr
      }

      // 2c. Upsert current listings with updated sort order
      if (listings.length > 0) {
        const { error: upsertErr } = await supabase
          .from('listings')
          .upsert(listings.map((l, i) => listingToDb({ ...l, sort: i })))
        if (upsertErr) throw upsertErr
      }

      setSaveMsg({ type: 'success', text: 'Saved — your changes are live.' })
    } catch (err) {
      setSaveMsg({
        type: 'error',
        text: err?.message || 'Save failed. Please try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  // ── Waiting for initial auth check ──────────────────────────
  if (!authChecked) {
    return (
      <div className="admin-root">
        <div className="admin-loading">
          <div className="admin-loading__spinner" />
          <div>Loading…</div>
        </div>
      </div>
    )
  }

  // ── Not authed → login gate ──────────────────────────────────
  if (!authed) {
    return <LoginGate />
  }

  // ── Loading site data ────────────────────────────────────────
  if (loading) {
    return (
      <div className="admin-root">
        <div className="admin-loading">
          <div className="admin-loading__spinner" />
          <div>Loading site data…</div>
        </div>
      </div>
    )
  }

  // ── Editor ───────────────────────────────────────────────────
  return (
    <div className="admin-root">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="admin-header__brand">
            Moshe
            <span>Admin</span>
          </div>
          <div className="admin-header__right">
            <div className="admin-header__hint">
              Changes go live instantly after you press Save.
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="admin-header__viewlink"
            >
              View site →
            </a>
            <button className="admin-header__logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Editor main */}
      <main className="admin-main">
        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab${tab === 'listings' ? ' active' : ''}`}
            onClick={() => setTab('listings')}
          >
            Apartments
          </button>
          <button
            className={`admin-tab${tab === 'settings' ? ' active' : ''}`}
            onClick={() => setTab('settings')}
          >
            Site Settings
          </button>
        </div>

        {/* Panel content */}
        {tab === 'settings' && (
          <SettingsPanel
            settings={settings}
            onChange={setSettings}
          />
        )}

        {tab === 'listings' && (
          <ListingsPanel
            listings={listings}
            onChange={setListings}
          />
        )}
      </main>

      {/* Save bar */}
      <div className="admin-savebar">
        <div className="admin-savebar__inner">
          <div
            className={`admin-savebar__msg${saveMsg ? ' ' + saveMsg.type : ''}`}
          >
            {saveMsg
              ? saveMsg.text
              : 'Make your changes above, then press Save & Publish.'}
          </div>
          <button
            className="admin-save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="admin-spinner" />
                Saving…
              </>
            ) : (
              <>
                <IconSave />
                Save &amp; Publish
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
