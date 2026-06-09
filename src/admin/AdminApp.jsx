import { useState, useEffect, useRef } from 'react'
import './admin.css'
import SettingsPanel from './SettingsPanel.jsx'
import ListingsPanel from './ListingsPanel.jsx'
import { IconSave } from './AdminIcons.jsx'

// ────────────────────────────────────────────────────────────────
//  Defaults used when content.json is unavailable
// ────────────────────────────────────────────────────────────────
const DEFAULT_CONTENT = {
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

const SESSION_KEY = 'cjr_admin_pw'

// ────────────────────────────────────────────────────────────────
//  Login Gate
// ────────────────────────────────────────────────────────────────
function LoginGate({ onLogin, error }) {
  const [pw, setPw] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!pw.trim()) return
    sessionStorage.setItem(SESSION_KEY, pw)
    onLogin()
  }

  return (
    <div className="admin-root">
      <div className="admin-login">
        <div className="admin-login__box">
          <div className="admin-login__logo">Classic Jerusalem Realty</div>
          <div className="admin-login__sub">Admin Panel — Moshe Benzadon</div>

          <form onSubmit={handleSubmit}>
            <label className="admin-login__label" htmlFor="login-pw">
              Password
            </label>
            <input
              id="login-pw"
              type="password"
              className="admin-login__input"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoFocus
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
            <button type="submit" className="admin-login__btn">
              Enter Admin Panel
            </button>
          </form>

          {error && (
            <div className="admin-login__error">
              Wrong password — please try again.
            </div>
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
  // Auth
  const [authed, setAuthed] = useState(() => Boolean(sessionStorage.getItem(SESSION_KEY)))
  const [authError, setAuthError] = useState(false)

  // Data
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState(DEFAULT_CONTENT.settings)
  const [listings, setListings] = useState(DEFAULT_CONTENT.listings)

  // Newly uploaded images this session: { [imagePath]: dataUrl }
  const uploadedImages = useRef({})

  // UI state
  const [tab, setTab] = useState('listings') // 'settings' | 'listings'
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState(null) // { type:'success'|'error', text }

  // ── Load content on mount (or re-auth) ──────────────────────
  useEffect(() => {
    if (!authed) return
    setLoading(true)

    fetch('/data/content.json?t=' + Date.now())
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then(data => {
        const s = data.settings ?? {}
        const l = data.listings ?? []
        setSettings({
          ...DEFAULT_CONTENT.settings,
          ...s,
          about: { ...DEFAULT_CONTENT.settings.about, ...(s.about ?? {}) },
        })
        setListings(l)
      })
      .catch(() => {
        setSettings({ ...DEFAULT_CONTENT.settings })
        setListings([])
      })
      .finally(() => setLoading(false))
  }, [authed])

  // ── Login handler ────────────────────────────────────────────
  function handleLogin() {
    setAuthError(false)
    setAuthed(true)
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    setAuthError(false)
  }

  // ── Add uploaded image to session registry ───────────────────
  function handleAddImage(imagePath, dataUrl) {
    uploadedImages.current[imagePath] = dataUrl
  }

  // ── Save / Publish ───────────────────────────────────────────
  async function handleSave() {
    const password = sessionStorage.getItem(SESSION_KEY)
    if (!password) { handleLogout(); return }

    setSaving(true)
    setSaveMsg(null)

    // Build images array from registry
    const imagesArr = Object.entries(uploadedImages.current).map(([imgPath, dataUrl]) => {
      // listing.image is like /images/listings/foo.jpg
      // API expects path: public/images/listings/foo.jpg
      const path = 'public' + imgPath // /images/… → public/images/…
      return { path, dataBase64: dataUrl }
    })

    const body = {
      password,
      content: { settings, listings },
      images: imagesArr,
    }

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 401) {
        // Wrong password — clear session, go back to gate
        setSaving(false)
        sessionStorage.removeItem(SESSION_KEY)
        setAuthed(false)
        setAuthError(true)
        return
      }

      if (!res.ok) {
        let errText = 'Save failed. Please try again.'
        try { const j = await res.json(); errText = j.error || errText } catch {}
        setSaveMsg({ type: 'error', text: errText })
        setSaving(false)
        return
      }

      // Success — clear uploaded images (they are now saved)
      uploadedImages.current = {}
      setSaveMsg({ type: 'success', text: 'Saved! Your site will update in about a minute.' })
    } catch (err) {
      setSaveMsg({ type: 'error', text: 'Network error — please check your connection and try again.' })
    } finally {
      setSaving(false)
    }
  }

  // ── Render: not authed ───────────────────────────────────────
  if (!authed) {
    return (
      <LoginGate
        onLogin={handleLogin}
        error={authError}
      />
    )
  }

  // ── Render: loading ──────────────────────────────────────────
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

  // ── Render: editor ───────────────────────────────────────────
  return (
    <div className="admin-root">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="admin-header__brand">
            Classic Jerusalem Realty
            <span>Admin</span>
          </div>
          <div className="admin-header__right">
            <div className="admin-header__hint">
              Changes go live about a minute after you press Save.
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
            onAddImage={handleAddImage}
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
