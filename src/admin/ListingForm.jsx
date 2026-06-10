import { useState, useRef, useEffect } from 'react'
import { IconClose, IconImage, IconUpload } from './AdminIcons.jsx'
import { supabase, PHOTO_BUCKET } from '../supabase.js'

// Feature vocabulary
const FEATURES = [
  { id: 'furnished',  label: 'Furnished' },
  { id: 'mamad',      label: 'Safe room (Mamad)' },
  { id: 'parking',    label: 'Parking spot' },
  { id: 'storage',    label: 'Storage room' },
  { id: 'elevator',   label: 'Elevator' },
  { id: 'balcony',    label: 'Balcony' },
  { id: 'balcony2',   label: '2 balconies' },
  { id: 'sukkah',     label: 'Sukkah balcony' },
  { id: 'gym',        label: 'Gym in building' },
  { id: 'security',   label: '24/7 security' },
  { id: 'wifi',       label: 'Wi-Fi included' },
  { id: 'renovated',  label: 'Newly renovated' },
  { id: 'ground',     label: 'Ground floor' },
  { id: 'views',      label: 'Amazing views' },
  { id: 'garden',     label: 'Garden' },
  { id: 'quiet',      label: 'Quiet street' },
]

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6)
}

const EMPTY_LISTING = {
  name: '',
  area: '',
  price: '',
  sqm: '',
  beds: '',
  baths: '',
  entry: '',
  inclArnona: false,
  badge: '',
  note: '',
  image: '',
  features: [],
  active: true,
}

export default function ListingForm({ listing, onSave, onClose }) {
  const isEdit = Boolean(listing)
  const [form, setForm] = useState(() => {
    if (isEdit) {
      return {
        ...listing,
        price: listing.price ?? '',
        sqm: listing.sqm ?? '',
        beds: listing.beds ?? '',
        baths: listing.baths ?? '',
      }
    }
    return { ...EMPTY_LISTING }
  })

  // Image upload state
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadedFilename, setUploadedFilename] = useState(null)
  const [previewSrc, setPreviewSrc] = useState(() => {
    if (isEdit && listing.image) return listing.image
    return null
  })
  const fileInputRef = useRef(null)

  // Keep preview in sync when URL field is typed manually
  useEffect(() => {
    if (!uploading && form.image && !uploadedFilename) {
      setPreviewSrc(form.image)
    }
  }, [form.image, uploading, uploadedFilename])

  function set(key, val) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  function toggleFeature(id) {
    setForm(prev => {
      const has = prev.features.includes(id)
      return {
        ...prev,
        features: has ? prev.features.filter(f => f !== id) : [...prev.features, id],
      }
    })
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setUploading(true)

    // Derive listing id (use existing id when editing; generate when adding)
    const baseId = isEdit
      ? listing.id
      : (form.name ? slugify(form.name) + '-' + randomSuffix() : 'apt-' + randomSuffix())

    const ext = file.name.split('.').pop().toLowerCase() || 'jpg'
    const path = `${baseId}-${Date.now()}.${ext}`

    try {
      const { error: uploadErr } = await supabase.storage
        .from(PHOTO_BUCKET)
        .upload(path, file, { upsert: true, cacheControl: '3600' })

      if (uploadErr) throw uploadErr

      const url = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl

      setUploadedFilename(file.name)
      setPreviewSrc(url)
      set('image', url)
    } catch (err) {
      setUploadError(err?.message || 'Upload failed — please try again.')
    } finally {
      setUploading(false)
    }
  }

  function handleSave() {
    // Build final listing object
    const id = isEdit
      ? listing.id
      : (form.name ? slugify(form.name) + '-' + randomSuffix() : 'listing-' + randomSuffix())

    const saved = {
      ...form,
      id,
      price: Number(form.price) || 0,
      sqm: form.sqm !== '' && form.sqm !== null ? Number(form.sqm) : null,
      beds: form.beds !== '' && form.beds !== null ? Number(form.beds) : null,
      baths: form.baths !== '' && form.baths !== null ? Number(form.baths) : null,
    }

    onSave(saved)
  }

  return (
    <div className="admin-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="admin-modal">
        <div className="admin-modal__header">
          <div className="admin-modal__title">
            {isEdit ? 'Edit Apartment' : 'Add Apartment'}
          </div>
          <button className="admin-modal__close" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>

        <div className="admin-modal__body">
          {/* Basic info */}
          <div className="a-form-grid">
            <div className="a-field">
              <label htmlFor="lf-name">Apartment Name *</label>
              <input
                id="lf-name"
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="e.g. Haneviim Court"
              />
            </div>
            <div className="a-field">
              <label htmlFor="lf-area">Area / Neighbourhood *</label>
              <input
                id="lf-area"
                type="text"
                value={form.area}
                onChange={e => set('area', e.target.value)}
                placeholder="e.g. City Center"
              />
            </div>
            <div className="a-field">
              <label htmlFor="lf-price">Monthly Rent (₪) *</label>
              <input
                id="lf-price"
                type="number"
                min="0"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="e.g. 12000"
              />
            </div>
            <div className="a-field">
              <label htmlFor="lf-sqm">Size (m²) — optional</label>
              <input
                id="lf-sqm"
                type="number"
                min="0"
                value={form.sqm}
                onChange={e => set('sqm', e.target.value)}
                placeholder="e.g. 90"
              />
            </div>
            <div className="a-field">
              <label htmlFor="lf-beds">Bedrooms — optional</label>
              <input
                id="lf-beds"
                type="number"
                min="0"
                value={form.beds}
                onChange={e => set('beds', e.target.value)}
                placeholder="e.g. 3"
              />
            </div>
            <div className="a-field">
              <label htmlFor="lf-baths">Bathrooms — optional</label>
              <input
                id="lf-baths"
                type="number"
                min="0"
                value={form.baths}
                onChange={e => set('baths', e.target.value)}
                placeholder="e.g. 2"
              />
            </div>

            <div className="a-field a-field-full">
              <label htmlFor="lf-entry">Entry Date</label>
              <div className="a-entry-row">
                <input
                  id="lf-entry"
                  type="text"
                  value={form.entry}
                  onChange={e => set('entry', e.target.value)}
                  placeholder="immediate  or  01/08/2026"
                />
                <button
                  type="button"
                  className="a-immediate-btn"
                  onClick={() => set('entry', 'immediate')}
                >
                  Set to Immediate
                </button>
              </div>
              <div className="a-field-hint">Type "immediate" or a date like 01/08/2026</div>
            </div>

            <div className="a-field">
              <label htmlFor="lf-badge">Badge</label>
              <select
                id="lf-badge"
                value={form.badge}
                onChange={e => set('badge', e.target.value)}
              >
                <option value="">None</option>
                <option value="hotDeal">Hot deal</option>
              </select>
            </div>

            <div className="a-field" style={{ display: 'flex', alignItems: 'center', paddingTop: 28 }}>
              <div className="a-field-row">
                <input
                  id="lf-arnona"
                  type="checkbox"
                  checked={form.inclArnona}
                  onChange={e => set('inclArnona', e.target.checked)}
                />
                <label htmlFor="lf-arnona">Arnona (municipal tax) included</label>
              </div>
            </div>

            <div className="a-field a-field-full">
              <label htmlFor="lf-note">Short Note — optional</label>
              <input
                id="lf-note"
                type="text"
                value={form.note}
                onChange={e => set('note', e.target.value)}
                placeholder="e.g. Large balcony with amazing views"
              />
            </div>
          </div>

          {/* Image */}
          <div className="a-field">
            <label>Apartment Photo</label>
            <div className="a-img-area">
              <div className="a-img-preview">
                {previewSrc ? (
                  <img src={previewSrc} alt="Preview" />
                ) : (
                  <div style={{ padding: '8px', textAlign: 'center' }}>
                    <IconImage />
                    <div style={{ marginTop: 6, fontSize: 11 }}>No image</div>
                  </div>
                )}
              </div>
              <div className="a-img-inputs">
                <div style={{ fontSize: 12, color: 'var(--a-muted)', marginBottom: 4 }}>
                  Option 1 — Upload from your device:
                </div>
                <button
                  type="button"
                  className="a-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <IconUpload />
                  {uploading ? 'Uploading…' : 'Choose photo'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {uploading && (
                  <div style={{ fontSize: 12, color: 'var(--a-muted)', marginTop: 4 }}>
                    <span className="admin-spinner" style={{ display: 'inline-block', marginRight: 6 }} />
                    Uploading to storage…
                  </div>
                )}
                {!uploading && uploadedFilename && (
                  <div style={{ fontSize: 12, color: 'var(--a-gold)', marginTop: 4 }}>
                    ✓ {uploadedFilename}
                  </div>
                )}
                {uploadError && (
                  <div style={{ fontSize: 12, color: '#e57373', marginTop: 4 }}>
                    {uploadError}
                  </div>
                )}
                <div style={{ fontSize: 12, color: 'var(--a-muted)', marginTop: 8, marginBottom: 4 }}>
                  Option 2 — Paste image URL directly:
                </div>
                <input
                  type="text"
                  value={form.image}
                  onChange={e => {
                    set('image', e.target.value)
                    setUploadedFilename(null)
                    setPreviewSrc(e.target.value)
                  }}
                  placeholder="https://…"
                  style={{
                    background: 'var(--a-bg2)',
                    border: '1px solid var(--a-border-soft)',
                    borderRadius: 'var(--a-radius-sm)',
                    padding: '10px 14px',
                    color: 'var(--a-text)',
                    fontSize: 13,
                    fontFamily: 'var(--a-sans)',
                    width: '100%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="a-field">
            <label>Features &amp; Amenities</label>
            <div className="a-feat-grid">
              {FEATURES.map(f => {
                const checked = form.features.includes(f.id)
                return (
                  <div
                    key={f.id}
                    className={`a-feat-item${checked ? ' selected' : ''}`}
                    onClick={() => toggleFeature(f.id)}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFeature(f.id)}
                      onClick={e => e.stopPropagation()}
                    />
                    <span>{f.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Active */}
          <div className="a-divider" />
          <div className="a-field-row" style={{ gap: 12 }}>
            <label className="a-toggle">
              <input
                type="checkbox"
                checked={form.active}
                onChange={e => set('active', e.target.checked)}
              />
              <span className="a-toggle__track" />
            </label>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--a-cream)' }}>
                {form.active ? 'Visible on site' : 'Hidden from site'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--a-muted)' }}>
                Toggle to show or hide this listing
              </div>
            </div>
          </div>
        </div>

        <div className="admin-modal__footer">
          <button className="a-btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="a-btn-primary"
            onClick={handleSave}
            disabled={uploading}
          >
            {isEdit ? 'Save Changes' : 'Add Apartment'}
          </button>
        </div>
      </div>
    </div>
  )
}
