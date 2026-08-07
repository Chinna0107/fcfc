import { useState, useEffect } from 'react'
import { Play, FileText } from 'lucide-react'
import './Presentations.css'

const STATIC = [
  { file_url: '/src/assets/hero-video.mp4',       file_type: 'video', title: 'FCFC Platform Overview',     description: 'A complete walkthrough of the Fortune Crowd Fund Coupon platform and how it works.' },
  { file_url: '/src/assets/coupon-arbitrage.mp4', file_type: 'video', title: 'Coupon Arbitrage Explained', description: 'Learn how coupon arbitrage multiplies value across the FCFC community.' },
  { file_url: '/src/assets/no-dollar-coupon.mp4', file_type: 'video', title: 'No Dollar Coupon Model',     description: 'Understand the no-dollar coupon model and its benefits for every member.' },
  { file_url: '/src/assets/faq-video.mp4',        file_type: 'video', title: 'Frequently Asked Questions', description: 'Video answers to the most common questions about FCFC coupons.' },
]

export default function Presentations() {
  const [items, setItems] = useState(STATIC)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/admin/presentations')
      .then(r => r.json())
      .then(data => setItems(prev => [
        ...(Array.isArray(data) ? data : []),
        ...STATIC,
      ]))
      .catch(() => {})
  }, [])

  return (
    <main>
      <div className="page-header">
        <h1>Presentations</h1>
        <p>Watch our official FCFC video presentations and learn how the platform works.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="pres-grid">
            {items.map((v, i) => (
              <div key={v.id ?? i} className="pres-card">
                <div className="pres-video-wrap">
                  {v.file_type === 'pdf'
                    ? <a href={v.file_url} target="_blank" rel="noreferrer" className="pres-pdf-link">
                        <FileText size={48} color="#e74c3c" />
                        <span>Open PDF</span>
                      </a>
                    : <video controls preload="metadata">
                        <source src={v.file_url} type="video/mp4" />
                      </video>
                  }
                  {v.file_type !== 'pdf' && <div className="pres-play-hint"><Play size={18} /> Click to play</div>}
                </div>
                <div className="pres-info">
                  <div className="pres-num">0{i + 1}</div>
                  <div>
                    <div className="pres-title">{v.title}</div>
                    <div className="pres-desc">{v.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
