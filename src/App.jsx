import { useEffect } from 'react'
import { useI18n } from './i18n.jsx'
import { useReveal } from './hooks/useReveal.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Listings from './components/Listings.jsx'
import Sales from './components/Sales.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

export default function App() {
  const { lang } = useI18n()
  // Re-scan reveal targets whenever language changes (text re-renders, same nodes).
  useReveal([lang])

  // Deep-link support: jump straight to a section when the page loads with a hash.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === '#home') return
    const jump = () => {
      const el = document.querySelector(hash)
      if (!el) return
      const prev = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      el.scrollIntoView({ block: 'start' })
      document.documentElement.style.scrollBehavior = prev
    }
    requestAnimationFrame(jump)
    window.addEventListener('load', jump, { once: true })
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Listings />
        <Sales />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
