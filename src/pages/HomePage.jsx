import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import Listings from '../components/Listings.jsx'
import Services from '../components/Services.jsx'
import HomeExplore from '../components/HomeExplore.jsx'
import ContactBand from '../components/ContactBand.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Listings variant="featured" limit={3} />
      <Services preview />
      <HomeExplore />
      <ContactBand />
    </>
  )
}
