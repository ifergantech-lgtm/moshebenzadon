import { useState } from 'react'
import ListingForm from './ListingForm.jsx'
import ConfirmDialog from './ConfirmDialog.jsx'
import { IconEdit, IconTrash, IconUp, IconDown, IconPlus } from './AdminIcons.jsx'

const FEATURE_LABELS = {
  furnished: 'Furnished', mamad: 'Safe room', parking: 'Parking',
  storage: 'Storage', elevator: 'Elevator', balcony: 'Balcony',
  balcony2: '2 balconies', sukkah: 'Sukkah', gym: 'Gym',
  security: 'Security', wifi: 'Wi-Fi', renovated: 'Renovated',
  ground: 'Ground floor', views: 'Views', garden: 'Garden', quiet: 'Quiet',
}

function formatPrice(p) {
  return '₪' + Number(p).toLocaleString()
}

export default function ListingsPanel({ listings, onChange }) {
  const [modal, setModal] = useState(null) // null | { mode:'add' } | { mode:'edit', listing }
  const [confirmDelete, setConfirmDelete] = useState(null) // listing id or null

  function handleEdit(listing) {
    setModal({ mode: 'edit', listing })
  }

  function handleAdd() {
    setModal({ mode: 'add' })
  }

  function handleFormSave(savedListing) {
    if (modal.mode === 'edit') {
      onChange(listings.map(l => l.id === savedListing.id ? savedListing : l))
    } else {
      onChange([...listings, savedListing])
    }
    setModal(null)
  }

  function handleDeleteConfirm(id) {
    onChange(listings.filter(l => l.id !== id))
    setConfirmDelete(null)
  }

  function toggleActive(id) {
    onChange(listings.map(l => l.id === id ? { ...l, active: !l.active } : l))
  }

  function moveUp(idx) {
    if (idx === 0) return
    const next = [...listings]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  function moveDown(idx) {
    if (idx === listings.length - 1) return
    const next = [...listings]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChange(next)
  }

  const deleteTarget = confirmDelete ? listings.find(l => l.id === confirmDelete) : null

  return (
    <div>
      <div className="admin-listings-header">
        <h2>Apartments ({listings.length})</h2>
        <button className="admin-add-btn" onClick={handleAdd}>
          <IconPlus />
          Add apartment
        </button>
      </div>

      {listings.length === 0 && (
        <div className="a-empty">
          <svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="4" /><line x1="6" y1="18" x2="42" y2="18" /><line x1="6" y1="30" x2="42" y2="30" /><line x1="18" y1="6" x2="18" y2="42" /><line x1="30" y1="6" x2="30" y2="42" /></svg>
          <p>No apartments yet. Add your first listing.</p>
          <button className="admin-add-btn" onClick={handleAdd}>
            <IconPlus /> Add apartment
          </button>
        </div>
      )}

      {listings.map((listing, idx) => (
        <div
          key={listing.id}
          className={`listing-row${!listing.active ? ' inactive' : ''}`}
        >
          {/* Thumbnail */}
          <div className="listing-row__thumb">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.name}
                onError={e => { e.target.style.display = 'none' }}
              />
            ) : null}
          </div>

          {/* Info */}
          <div className="listing-row__info">
            <div className="listing-row__name">{listing.name || '(no name)'}</div>
            <div className="listing-row__meta">
              {listing.area && <span>{listing.area} &nbsp;·&nbsp; </span>}
              <b>{formatPrice(listing.price)}/mo</b>
              {listing.beds && <span> &nbsp;·&nbsp; {listing.beds} beds</span>}
              {listing.sqm && <span> &nbsp;·&nbsp; {listing.sqm}m²</span>}
              {!listing.active && (
                <span style={{ color: 'var(--a-muted2)', marginLeft: 6 }}>(hidden)</span>
              )}
            </div>
          </div>

          {/* Badge indicator */}
          {listing.badge === 'hotDeal' && (
            <div className="listing-row__badge">Hot deal</div>
          )}

          {/* Actions */}
          <div className="listing-row__actions">
            {/* Active toggle */}
            <label className="a-toggle" title={listing.active ? 'Visible — click to hide' : 'Hidden — click to show'}>
              <input
                type="checkbox"
                checked={listing.active}
                onChange={() => toggleActive(listing.id)}
              />
              <span className="a-toggle__track" />
            </label>

            {/* Move up */}
            <button
              className="a-icon-btn"
              onClick={() => moveUp(idx)}
              disabled={idx === 0}
              title="Move up"
              aria-label="Move up"
            >
              <IconUp />
            </button>

            {/* Move down */}
            <button
              className="a-icon-btn"
              onClick={() => moveDown(idx)}
              disabled={idx === listings.length - 1}
              title="Move down"
              aria-label="Move down"
            >
              <IconDown />
            </button>

            {/* Edit */}
            <button
              className="a-icon-btn"
              onClick={() => handleEdit(listing)}
              title="Edit"
              aria-label="Edit"
            >
              <IconEdit />
            </button>

            {/* Delete */}
            <button
              className="a-icon-btn danger"
              onClick={() => setConfirmDelete(listing.id)}
              title="Delete"
              aria-label="Delete"
            >
              <IconTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Form modal */}
      {modal && (
        <ListingForm
          listing={modal.mode === 'edit' ? modal.listing : null}
          onSave={handleFormSave}
          onClose={() => setModal(null)}
        />
      )}


      {/* Confirm delete */}
      {confirmDelete && deleteTarget && (
        <ConfirmDialog
          message={
            <>
              Delete <strong>"{deleteTarget.name}"</strong>? This cannot be undone — press Save to make it permanent.
            </>
          }
          confirmLabel="Delete"
          onConfirm={() => handleDeleteConfirm(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
