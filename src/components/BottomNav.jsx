import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Ticket, Info, Mail, ExternalLink, Image, Monitor } from 'lucide-react'
import './BottomNav.css'

const couponItems = [
  { label: 'About Coupon',    path: '/coupon/about' },
  { label: 'Generate Coupon', path: '/coupon/generate' },
  { label: 'Submit Coupon',   path: '/coupon/submit' },
  { label: 'Renew Coupon',    path: '/coupon/renew' },
  { label: 'Search Coupon',   path: '/coupon/search' },
]

const items = [
  { label: 'Home',    path: '/',               icon: <Home size={18} /> },
  { label: 'Coupon',  path: null,              icon: <Ticket size={18} /> },
  { label: 'Links',   path: '/links',          icon: <ExternalLink size={18} /> },
  { label: 'Gallery', path: '/gallery',        icon: <Image size={18} /> },
  { label: 'Slides',  path: '/presentations',  icon: <Monitor size={18} /> },
  { label: 'About',   path: '/about',          icon: <Info size={18} /> },
  { label: 'Contact', path: '/contact',        icon: <Mail size={18} /> },
]

export default function BottomNav() {
  const [couponOpen, setCouponOpen] = useState(false)

  return (
    <nav className="bottom-nav">
      {items.map(item =>
        item.label === 'Coupon' ? (
          <button key="coupon" className="bottom-nav-item" onClick={() => setCouponOpen(o => !o)}>
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ) : (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
            onClick={() => setCouponOpen(false)}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </NavLink>
        )
      )}

      {couponOpen && (
        <>
          <div className="coupon-backdrop" onClick={() => setCouponOpen(false)} />
          <div className="coupon-sheet">
            {couponItems.map(ci => (
              <NavLink key={ci.path} to={ci.path} className="sheet-item" onClick={() => setCouponOpen(false)}>
                <span style={{ fontWeight: 700 }}>{ci.label}</span>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}
