export default function SettingsPanel({ settings, onChange }) {
  function set(key, val) {
    onChange({ ...settings, [key]: val })
  }

  function setAbout(lang, val) {
    onChange({
      ...settings,
      about: { ...settings.about, [lang]: val },
    })
  }

  return (
    <div>
      {/* Brand & Agent */}
      <div className="admin-section">
        <div className="admin-section__title">Brand & Agent</div>
        <div className="admin-section__sub">Basic identity shown across the site.</div>
        <div className="a-form-grid">
          <div className="a-field">
            <label htmlFor="s-brand">Brand Name</label>
            <input
              id="s-brand"
              type="text"
              value={settings.brand}
              onChange={e => set('brand', e.target.value)}
              placeholder="Moshe"
            />
          </div>
          <div className="a-field">
            <label htmlFor="s-agent">Agent Name</label>
            <input
              id="s-agent"
              type="text"
              value={settings.agent}
              onChange={e => set('agent', e.target.value)}
              placeholder="Moshe"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="admin-section">
        <div className="admin-section__title">WhatsApp Contact</div>
        <div className="admin-section__sub">
          How visitors reach you. The link opens WhatsApp directly.
        </div>
        <div className="a-form-grid">
          <div className="a-field a-field-full">
            <label htmlFor="s-walink">WhatsApp Link</label>
            <input
              id="s-walink"
              type="text"
              value={settings.whatsappLink}
              onChange={e => set('whatsappLink', e.target.value)}
              placeholder="https://wa.me/message/CVXZWPQ54HCGL1"
            />
            <div className="a-field-hint">The direct link to your WhatsApp conversation (from wa.me)</div>
          </div>
          <div className="a-field">
            <label htmlFor="s-wanum">Number (display)</label>
            <input
              id="s-wanum"
              type="text"
              value={settings.whatsappNumberDisplay}
              onChange={e => set('whatsappNumberDisplay', e.target.value)}
              placeholder="+972 51-517-9928"
            />
            <div className="a-field-hint">Shown to visitors, e.g. +972 51-517-9928</div>
          </div>
          <div className="a-field">
            <label htmlFor="s-waintl">Number (international, no +)</label>
            <input
              id="s-waintl"
              type="text"
              value={settings.whatsappNumberIntl}
              onChange={e => set('whatsappNumberIntl', e.target.value)}
              placeholder="972515179928"
            />
            <div className="a-field-hint">Used for click-to-chat links, digits only, e.g. 972515179928</div>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="admin-section">
        <div className="admin-section__title">Rental Price Range</div>
        <div className="admin-section__sub">
          Shown on the hero section as "₪X,000 – ₪X,000 / mo".
        </div>
        <div className="a-form-grid">
          <div className="a-field">
            <label htmlFor="s-pmin">Minimum Price (₪)</label>
            <input
              id="s-pmin"
              type="number"
              min="0"
              value={settings.priceMin}
              onChange={e => set('priceMin', Number(e.target.value) || 0)}
              placeholder="6000"
            />
          </div>
          <div className="a-field">
            <label htmlFor="s-pmax">Maximum Price (₪)</label>
            <input
              id="s-pmax"
              type="number"
              min="0"
              value={settings.priceMax}
              onChange={e => set('priceMax', Number(e.target.value) || 0)}
              placeholder="25000"
            />
          </div>
        </div>
      </div>

      {/* About texts */}
      <div className="admin-section">
        <div className="admin-section__title">About Me — Three Languages</div>
        <div className="admin-section__sub">
          Your personal bio shown in the About section. Keep each version natural and warm.
        </div>

        <div className="a-field">
          <label htmlFor="s-about-en">English</label>
          <textarea
            id="s-about-en"
            rows={5}
            value={settings.about.en}
            onChange={e => setAbout('en', e.target.value)}
            placeholder="Write your bio in English…"
          />
        </div>

        <div className="a-field">
          <label htmlFor="s-about-he">עברית (Hebrew)</label>
          <textarea
            id="s-about-he"
            rows={5}
            className="a-textarea-he"
            value={settings.about.he}
            onChange={e => setAbout('he', e.target.value)}
            placeholder="כתוב את הביוגרפיה שלך בעברית…"
            dir="rtl"
          />
        </div>

        <div className="a-field">
          <label htmlFor="s-about-es">Español (Spanish)</label>
          <textarea
            id="s-about-es"
            rows={5}
            value={settings.about.es}
            onChange={e => setAbout('es', e.target.value)}
            placeholder="Escribe tu bio en español…"
          />
        </div>
      </div>
    </div>
  )
}
