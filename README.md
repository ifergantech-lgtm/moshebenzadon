# Classic Jerusalem Realty — Moshe Benzadon

Marketing website for **Moshe Benzadon**, a Jerusalem real‑estate agent specialising in
long‑term apartment rentals (and home sales). Built as a fast, fully‑responsive,
trilingual single‑page site with a cinematic animated hero.

## Highlights

- **Luxury dark & gold** design that matches the Classic Jerusalem Realty brand.
- **Trilingual**: English, **Hebrew (RTL)** and Spanish, with a language switcher (preference saved).
- **WOW hero**: night panorama of the Old City + a lazy‑loaded React Three Fiber golden‑dust layer
  with mouse parallax. Falls back to a static image on mobile and for `prefers-reduced-motion`.
- **Real listings** from Moshe's current availability (Baka, City Center, Nachlaot, …).
- **WhatsApp‑first**: every call‑to‑action opens his business WhatsApp, listing buttons pre‑fill a message.
- Fully responsive (desktop / tablet / mobile) with a mobile drawer nav.

## Tech

- React 18 + Vite
- React Three Fiber / three.js (hero 3D, code‑split & lazy‑loaded)
- Lightweight custom i18n (no heavy dependency), CSS design system

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Where to change things

| What | File |
|------|------|
| WhatsApp number / link, brand, agent name | `src/config.js` |
| All copy (EN / HE / ES) | `src/i18n.jsx` |
| Apartment listings | `src/data/listings.js` |
| Colours, fonts, layout | `src/index.css` (`:root` design tokens) |
| Hero 3D effect | `src/components/HeroCanvas.jsx` |

### Swapping in real photos

- **Moshe's headshot** → save as `public/images/moshe-portrait.jpg` (it appears automatically in the About section).
- **Listing photos** → replace the files referenced by each listing's `image` in `src/data/listings.js`
  (drop new files in `public/images/`).

## Deploy

Static site — deploys to **Vercel** with zero config (framework preset: Vite, build `npm run build`, output `dist`).
