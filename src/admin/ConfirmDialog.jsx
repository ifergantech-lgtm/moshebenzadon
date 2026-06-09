import { IconClose } from './AdminIcons.jsx'

export default function ConfirmDialog({ message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <div
      className="admin-modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="admin-modal" style={{ maxWidth: 400 }}>
        <div className="admin-modal__header">
          <div className="admin-modal__title">Confirm</div>
          <button className="admin-modal__close" onClick={onCancel} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="admin-modal__body">
          <div className="admin-confirm">
            <p>{message}</p>
          </div>
        </div>
        <div className="admin-modal__footer">
          <button className="a-btn-secondary" onClick={onCancel}>Cancel</button>
          <button
            className="a-btn-primary"
            style={{
              background: 'linear-gradient(180deg, #e57373, #c0392b)',
              boxShadow: '0 6px 20px rgba(192,57,43,0.3)',
            }}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
