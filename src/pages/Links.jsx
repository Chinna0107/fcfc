import { useState, useEffect } from 'react'
import { ExternalLink, GitBranch, Share2, Globe, BookOpen, MessageCircle, Video, FileText, Users, Zap, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Links.css'

const featured = [
  { icon: <Globe size={28} />,       title: 'Official Website',   desc: 'The main FCFC hub — news, updates, and platform announcements.',         href: '#', color: '#4A90D9' },
  { icon: <BookOpen size={28} />,    title: 'Documentation',      desc: 'Full API reference, integration guides, and developer tutorials.',        href: '#', color: '#6C63FF' },
  { icon: <FileText size={28} />,    title: 'Whitepaper',         desc: 'The technical whitepaper behind the FCFC protocol and tokenomics.',       href: '#', color: '#27ae60' },
]

const community = [
  { icon: <MessageCircle size={24} />, title: 'Discord',   desc: 'Join 5,000+ builders and FCFC community members.',  href: '#', color: '#5865F2' },
  { icon: <Share2 size={24} />,        title: 'Twitter / X', desc: 'Follow for real-time announcements and tips.',      href: '#', color: '#1DA1F2' },
  { icon: <MessageCircle size={24} />, title: 'Telegram',  desc: 'Chat with the community and get instant support.',   href: '#', color: '#0088cc' },
  { icon: <Video size={24} />,         title: 'YouTube',   desc: 'Video tutorials, demos, and product walkthroughs.',  href: '#', color: '#FF0000' },
]

const developer = [
  { icon: <GitBranch size={24} />, title: 'GitHub',         desc: 'Open-source smart contracts, SDKs, and tools.',     href: '#', color: '#24292e' },
  { icon: <BookOpen size={24} />,  title: 'API Reference',  desc: 'Complete REST and Web3 API documentation.',         href: '#', color: '#6C63FF' },
  { icon: <FileText size={24} />,  title: 'Blog',           desc: 'In-depth articles on Web3, coupons, and DeFi.',     href: '#', color: '#e67e22' },
  { icon: <Globe size={24} />,     title: 'Status Page',    desc: 'Real-time platform uptime and incident reports.',   href: '#', color: '#27ae60' },
]

const stats = [
  { icon: <Users size={20} />, number: '38K+',  label: 'Community Members', color: '#4A90D9' },
  { icon: <Globe size={20} />, number: '150+',  label: 'Countries',         color: '#6C63FF' },
  { icon: <Star size={20} />,  number: '5K+',   label: 'Discord Members',   color: '#27ae60' },
  { icon: <Zap size={20} />,   number: '99.9%', label: 'Uptime',            color: '#e67e22' },
]

export default function Links() {
  const [dbLinks, setDbLinks] = useState([])

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/admin/links')
      .then(r => r.json())
      .then(data => setDbLinks(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])
  return (
    <main>
      <div className="page-header">
        <h1>Useful Links</h1>
        <p>Everything you need to connect with the FCFC ecosystem — all in one place.</p>
      </div>

      {/* Stats */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="page-wrapper">
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: `${s.color}15` }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="page-wrapper">
          <div className="links-section-header">
            <div className="workflow-eyebrow" style={{ marginBottom: 12 }}>
              <Star size={13} /> Featured
            </div>
            <h2 className="section-title">Essential Resources</h2>
            <p className="section-subtitle">The most important FCFC links to get you started.</p>
          </div>
          <div className="links-featured-grid">
            {featured.map(l => (
              <a key={l.title} href={l.href} target="_blank" rel="noopener noreferrer" className="link-featured-card">
                <div className="link-featured-top" style={{ background: `${l.color}12` }}>
                  <div className="link-icon" style={{ background: `${l.color}18`, margin: '0 0 0 0' }}>
                    <span style={{ color: l.color }}>{l.icon}</span>
                  </div>
                  <ExternalLink size={16} style={{ color: l.color, opacity: 0.6 }} />
                </div>
                <div className="link-featured-body">
                  <div className="link-featured-title">{l.title}</div>
                  <div className="link-featured-desc">{l.desc}</div>
                  <div className="link-featured-cta" style={{ color: l.color }}>
                    Visit <ArrowRight size={13} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Community + Developer side by side */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div className="links-two-col">

            {/* Community */}
            <div>
              <div className="links-section-header" style={{ textAlign: 'left' }}>
                <div className="workflow-eyebrow" style={{ marginBottom: 12 }}>
                  <Users size={13} /> Community
                </div>
                <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,28px)' }}>Join the Crowd</h2>
                <p className="section-subtitle" style={{ marginBottom: 28 }}>Connect with thousands of FCFC members worldwide.</p>
              </div>
              <div className="links-list">
                {community.map(l => (
                  <a key={l.title} href={l.href} target="_blank" rel="noopener noreferrer" className="link-list-item">
                    <div className="link-list-icon" style={{ background: `${l.color}15` }}>
                      <span style={{ color: l.color }}>{l.icon}</span>
                    </div>
                    <div className="link-list-info">
                      <div className="link-list-title">{l.title}</div>
                      <div className="link-list-desc">{l.desc}</div>
                    </div>
                    <ExternalLink size={15} style={{ color: l.color, flexShrink: 0, opacity: 0.7 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Developer */}
            <div>
              <div className="links-section-header" style={{ textAlign: 'left' }}>
                <div className="workflow-eyebrow" style={{ marginBottom: 12 }}>
                  <Zap size={13} /> Developer
                </div>
                <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,28px)' }}>Build on FCFC</h2>
                <p className="section-subtitle" style={{ marginBottom: 28 }}>Tools, docs, and resources for developers.</p>
              </div>
              <div className="links-list">
                {developer.map(l => (
                  <a key={l.title} href={l.href} target="_blank" rel="noopener noreferrer" className="link-list-item">
                    <div className="link-list-icon" style={{ background: `${l.color}15` }}>
                      <span style={{ color: l.color }}>{l.icon}</span>
                    </div>
                    <div className="link-list-info">
                      <div className="link-list-title">{l.title}</div>
                      <div className="link-list-desc">{l.desc}</div>
                    </div>
                    <ExternalLink size={15} style={{ color: l.color, flexShrink: 0, opacity: 0.7 }} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Admin-added Links */}
      {dbLinks.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="page-wrapper">
            <div className="links-section-header">
              <div className="workflow-eyebrow" style={{ marginBottom: 12 }}>
                <Star size={13} /> More Links
              </div>
              <h2 className="section-title">Additional Resources</h2>
            </div>
            <div className="links-list">
              {dbLinks.map(l => (
                <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="link-list-item">
                  <div className="link-list-icon" style={{ background: `${l.color || '#4A90D9'}15` }}>
                    <Globe size={20} style={{ color: l.color || '#4A90D9' }} />
                  </div>
                  <div className="link-list-info">
                    <div className="link-list-title">{l.title}</div>
                    {l.category && <div className="link-list-desc">{l.category}</div>}
                  </div>
                  <ExternalLink size={15} style={{ color: l.color || '#4A90D9', flexShrink: 0, opacity: 0.7 }} />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div className="links-cta-banner">
            <div className="links-cta-glow" />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                Ready to Start Your FCFC Journey?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 28, maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.7 }}>
                Generate your first Fortune Crowd Fund Coupon and join the growing crowd today.
              </p>
              <Link to="/coupon/generate" style={{ background: '#fff', color: 'var(--navy)', borderRadius: 12, padding: '13px 28px', fontWeight: 800, textDecoration: 'none', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Generate Coupon <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
