import { useState, useEffect } from 'react'
import { X, ZoomIn } from 'lucide-react'
import couponImg from '../assets/coupon-sample.png'
import heroImg from '../assets/hero.png'
import ceoImg from '../assets/ceo.png'
import regImg from '../assets/reg.png'
import addressImg from '../assets/address.jpeg'
import locationsImg from '../assets/locations.jpeg'
import imageImg from '../assets/image.png'
import './Gallery.css'

const STATIC = [
  { src: couponImg,    caption: 'FCFC Coupon Sample' },
  { src: heroImg,      caption: 'FCFC Platform' },
  { src: ceoImg,       caption: 'Mr. James Knight — CEO' },
  { src: regImg,       caption: 'Registration' },
  { src: addressImg,   caption: 'Our Address' },
  { src: locationsImg, caption: 'Global Locations' },
  { src: imageImg,     caption: 'FCFC Community' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)
  const [dbPhotos, setDbPhotos] = useState([])

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/admin/gallery')
      .then(r => r.json())
      .then(data => setDbPhotos(Array.isArray(data) ? data.map(p => ({ src: p.image_url, caption: p.caption })) : []))
      .catch(() => {})
  }, [])

  const photos = [...dbPhotos, ...STATIC]

  return (
    <main>
      <div className="page-header">
        <h1>Gallery</h1>
        <p>A visual journey through the Fortune Crowd Fund Coupon ecosystem.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="gallery-grid">
            {photos.map((p, i) => (
              <div key={i} className="gallery-item" onClick={() => setActive(p)}>
                <img src={p.src} alt={p.caption} />
                <div className="gallery-overlay">
                  <ZoomIn size={24} color="#fff" />
                  <span>{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div className="gallery-lightbox" onClick={() => setActive(null)}>
          <button className="lightbox-close" onClick={() => setActive(null)}><X size={22} /></button>
          <img src={active.src} alt={active.caption} onClick={e => e.stopPropagation()} />
          <p>{active.caption}</p>
        </div>
      )}
    </main>
  )
}
