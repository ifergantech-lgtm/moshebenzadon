import { NavLink } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'
import { HomeIcon, BuildingIcon, TagIcon, UserIcon, ChatIcon } from './icons.jsx'

// Mobile-only bottom tab bar (replaces the old hamburger drawer).
const TABS = [
  { to: '/', end: true, key: 'home', Icon: HomeIcon },
  { to: '/rentals', key: 'rentals', Icon: BuildingIcon },
  { to: '/sales', key: 'sales', Icon: TagIcon },
  { to: '/about', key: 'about', Icon: UserIcon },
  { to: '/contact', key: 'contact', Icon: ChatIcon },
]

export default function BottomNav() {
  const { t } = useI18n()
  return (
    <nav className="bottomnav" aria-label="Primary">
      {TABS.map(({ to, end, key, Icon }) => (
        <NavLink key={key} to={to} end={end} className="bottomnav__tab">
          <Icon className="bottomnav__icon" />
          <span>{t(`nav.${key}`)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
