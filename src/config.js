// Central business config — single source of truth.
export const BRAND = 'Classic Jerusalem Realty'
export const AGENT = 'Moshe Benzadon'

// Moshe's BUSINESS WhatsApp (the only number in use).
export const WHATSAPP_LINK = 'https://wa.me/message/CVXZWPQ54HCGL1'
export const WHATSAPP_NUMBER_DISPLAY = '+972 51-517-9928'
export const WHATSAPP_NUMBER_INTL = '972515179928'
export const EMAIL = '' // optional, add later if Moshe wants one shown

// Build a click-to-chat link with a pre-filled message (listing-specific CTAs).
export function waLink(message) {
  if (!message) return WHATSAPP_LINK
  return `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(message)}`
}
