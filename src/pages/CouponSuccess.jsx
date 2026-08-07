import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Copy, Check, Ticket, Home, Search } from 'lucide-react'

export default function CouponSuccess() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const code = state?.code
  const [copied, setCopied] = useState(false)

  if (!code) {
    navigate('/coupon/generate', { replace: true })
    return null
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main>
      <section className="section">
        <div className="page-wrapper">
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>

            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#27ae60,#2ecc71)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={40} color="#fff" />
            </div>

            <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
            <h1 style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 800, color: 'var(--navy)', marginBottom: 10 }}>
              Coupon Generated!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
              Your unique FCFC coupon code has been created and saved successfully.
            </p>

            {/* Code box */}
            <div style={{ background: 'var(--bg)', borderRadius: 16, boxShadow: 'var(--shadow-in)', padding: '24px 28px', marginBottom: 32, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--navy)', fontSize: 22, letterSpacing: 3 }}>
                {code}
              </span>
              <button className="neu-btn" onClick={copyCode} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px' }}>
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>

            {/* Details */}
            <div className="neu-card" style={{ maxWidth: 480, width: '100%', margin: '0 auto 36px', textAlign: 'left' }}>
              {[
                ['Status', <span style={{ color: '#27ae60', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14} /> Active</span>],
                ['Coupon Code', <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{code}</span>],
                ['Generated At', new Date().toLocaleString()],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
                  <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/" className="neu-btn neu-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '13px 28px' }}>
                <Home size={16} /> Back to Home
              </Link>
              <Link to="/coupon/generate" className="neu-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '13px 28px' }}>
                <Ticket size={16} /> New Coupon
              </Link>
              <Link to="/coupon/search" className="neu-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '13px 28px' }}>
                <Search size={16} /> Search Coupons
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
