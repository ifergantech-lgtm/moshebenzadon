// Shared SVG icons. Paths carry no fill/stroke attrs so the consuming CSS
// (fill or stroke + color) fully controls appearance per context.

export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
)

export const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/>
  </svg>
)

export const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
  </svg>
)

export const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.59V7h-2v6l4.7 2.85 1-1.64-3.7-2.62z"/>
  </svg>
)

/* spec icons — stroke driven */
export const BedIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M3 18v-5a2 2 0 012-2h14a2 2 0 012 2v5M3 18v-9M21 18v-2M3 12h18M7 11V9a1 1 0 011-1h3v3" />
  </svg>
)
export const BathIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4 12V6a2 2 0 012-2 2 2 0 012 2M4 12h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2zM6 18l-1 2m13-2l1 2M9 7h.01" />
  </svg>
)
export const AreaIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4 4h16v16H4zM4 9h3M4 14h3M17 4v3M14 4v3" />
  </svg>
)

/* service icons — stroke driven */
export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <circle cx="11" cy="11" r="6" /><path d="M20 20l-3.5-3.5" />
  </svg>
)
export const ChatIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4 5h16v11H9l-4 3v-3H4z" /><path d="M8 9h8M8 12h5" />
  </svg>
)
export const DealIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4 14l3-3 4 4M13 7l4-3 3 4-7 7-3-1" /><path d="M3 21l4-1 2-2" />
  </svg>
)
export const DocIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M6 3h8l4 4v14H6zM14 3v4h4" /><path d="M9 12h6M9 15h6M9 9h2" />
  </svg>
)
export const PenIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M14 4l6 6M4 20l1-4L16 5l3 3L8 19l-4 1z" />
  </svg>
)
export const KeyIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <circle cx="8" cy="8" r="4" /><path d="M11 11l8 8M16 16l2-2M18 18l2-2" />
  </svg>
)

/* sales point icons */
export const TagIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M3 12l9-9 8 8-9 9-8-8zM7.5 7.5h.01" />
  </svg>
)
export const ScaleIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M12 3v18M7 21h10M5 7h14M5 7l-2.5 5h5zM19 7l-2.5 5h5z" />
  </svg>
)
export const ShieldIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" />
  </svg>
)

export const UserIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
)

/* bottom-nav icons — stroke driven */
export const HomeIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-5h4v5" />
  </svg>
)
export const BuildingIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M5 21V5a1 1 0 011-1h7a1 1 0 011 1v16M14 21V10h4a1 1 0 011 1v10M8 8h3M8 12h3M8 16h3M3 21h18" />
  </svg>
)

// Personal monogram for Moshe — an elegant gold "M" in a dark bordered square.
export const BrandMark = (p) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...p}>
    <defs>
      <linearGradient id="mbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f0d999" />
        <stop offset="1" stopColor="#c79a4e" />
      </linearGradient>
    </defs>
    <rect x="1.1" y="1.1" width="61.8" height="61.8" rx="15" fill="#0e1014" stroke="rgba(216,180,106,.5)" strokeWidth="1.2" />
    <path d="M17 45 V21 L32 37.5 L47 21 V45" fill="none" stroke="url(#mbg)" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="50" r="1.5" fill="#d8b46a" />
  </svg>
)
