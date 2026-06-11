import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { useReveal } from '../hooks/useReveal.js'
import Nav from './Nav.jsx'
import BottomNav from './BottomNav.jsx'
import Footer from './Footer.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const { lang } = useI18n()

  // Jump to top instantly on route change (bypass smooth scroll).
  useEffect(() => {
    const h = document.documentElement
    const prev = h.style.scrollBehavior
    h.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    h.style.scrollBehavior = prev
  }, [pathname])

  // Re-scan reveal targets on every page / language change.
  useReveal([pathname, lang])

  return (
    <>
      <Nav />
      <main className="page" key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BottomNav />
    </>
  )
}
