import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ChevronRight, ChevronLeft, Check, Loader, Copy, CheckCircle } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import coinImg from '../assets/coin.png'
import './SubmitCoupon.css'

const API = import.meta.env.VITE_API_URL + '/api/general'
const steps = ['Enter Coupon', 'Payment', 'Review & Submit']

export default function SubmitCoupon() {
  const [step, setStep] = useState(0)
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [validating, setValidating] = useState(false)
  const [validateError, setValidateError] = useState('')
  const [card, setCard] = useState({ nameOnCard: '', number: '' })
  const [paymentDone, setPaymentDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [newCodes, setNewCodes] = useState([])
  const [copied, setCopied] = useState({})
  const navigate = useNavigate()

  const handleValidate = async () => {
    if (!code.trim()) return
    setValidating(true)
    setValidateError('')
    try {
      const res = await fetch(`${API}/validate-coupon?code=${encodeURIComponent(code.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStep(1)
    } catch (err) {
      setValidateError(err.message)
    }
    setValidating(false)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(`${API}/submit-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setNewCodes(data.newCodes)
    } catch (err) {
      setSubmitError(err.message)
    }
    setSubmitting(false)
  }

  const copyCode = (c) => {
    navigator.clipboard.writeText(c)
    setCopied(prev => ({ ...prev, [c]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [c]: false })), 2000)
  }

  // Show generated codes result
  if (newCodes.length > 0) {
    return (
      <main>
        <div className="page-header">
          <h1>Submit Coupon</h1>
          <p><TypeAnimation sequence={['Submit an existing coupon code for verification and redemption.', 4000]} speed={55} repeat={Infinity} /></p>
        </div>
        <section className="section">
          <div className="page-wrapper">
            <div className="form-card" style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#27ae60,#2ecc71)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={36} color="#fff" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 6 }}>3 New Coupons Generated!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
                Your original coupon <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{code}</span> has been marked inactive.
              </p>
              <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
                {newCodes.map(c => (
                  <div key={c} style={{ background: 'var(--bg)', boxShadow: 'var(--shadow-in)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--navy)', fontSize: 16, letterSpacing: 2 }}>{c}</span>
                    <button className="neu-btn" onClick={() => copyCode(c)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', fontSize: 13 }}>
                      {copied[c] ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                    </button>
                  </div>
                ))}
              </div>
              <button className="neu-btn neu-btn-primary" onClick={() => navigate('/thank-you')}>Finish</button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <div className="page-header">
        <h1>Submit Coupon</h1>
        <p><TypeAnimation sequence={['Submit an existing coupon code for verification and redemption.', 4000]} speed={55} repeat={Infinity} /></p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="form-card">
            <StepIndicator steps={steps} current={step} />

            {/* Step 0 — Enter coupon code */}
            {step === 0 && (
              <>
                <div className="form-title">Enter Coupon Code</div>
                <div className="form-subtitle">Enter your active FCFC coupon code to proceed.</div>
                <div className="form-group">
                  <label className="form-label">Coupon Code</label>
                  <input
                    className="neu-input"
                    placeholder="e.g. FCFC-AEC17D1A"
                    value={code}
                    onChange={e => { setCode(e.target.value.toUpperCase()); setValidateError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleValidate()}
                    style={{ fontFamily: 'monospace', letterSpacing: 3, fontWeight: 700, fontSize: 18, textAlign: 'center' }}
                  />
                  {validateError && <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 8 }}>{validateError}</div>}
                </div>
              </>
            )}

            {/* Step 1 — Payment */}
            {step === 1 && (
              <>
                <div className="form-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={coinImg} alt="payment" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  Payment — $10
                </div>
                <div className="form-subtitle">A one-time $10 fee is required to generate 3 new coupons.</div>
                <div className="form-group">
                  <label className="form-label">Name on Card</label>
                  <input className="neu-input" placeholder="Name on card" value={card.nameOnCard} onChange={e => setCard(c => ({ ...c, nameOnCard: e.target.value }))} disabled={paymentDone} />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="neu-input" placeholder="4242 4242 4242 4242" value={card.number} onChange={e => setCard(c => ({ ...c, number: e.target.value }))} disabled={paymentDone} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email (for records)</label>
                  <input className="neu-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={paymentDone} />
                </div>
                {!paymentDone
                  ? <button className="neu-btn neu-btn-primary" onClick={() => { if (card.nameOnCard && card.number) setPaymentDone(true) }} disabled={!card.nameOnCard || !card.number}>
                      Pay $10 & Continue
                    </button>
                  : <div style={{ color: '#27ae60', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={16} /> Payment of $10 successful
                    </div>
                }
              </>
            )}

            {/* Step 2 — Review */}
            {step === 2 && (
              <>
                <div className="form-title">Review & Submit</div>
                <div className="form-subtitle">Confirm details. Submitting will deactivate your coupon and generate 3 new ones.</div>
                <div className="submit-review-card">
                  <div className="submit-review-row">
                    <span className="submit-review-label">Coupon Code</span>
                    <span className="submit-review-value mono">{code}</span>
                  </div>
                  <div className="submit-review-row">
                    <span className="submit-review-label">Email</span>
                    <span className="submit-review-value">{email || '—'}</span>
                  </div>
                  <div className="submit-review-row">
                    <span className="submit-review-label">Payment</span>
                    <span className="submit-review-value submit-review-paid"><Check size={14} /> $10 Completed</span>
                  </div>
                  <div className="submit-review-row submit-review-highlight">
                    <span className="submit-review-label">New Coupons</span>
                    <span className="submit-review-value submit-review-badge">3 will be generated</span>
                  </div>
                </div>
                <div className="submit-review-warning">
                  ⚠️ Once submitted, <strong>{code}</strong> will be permanently deactivated.
                </div>
                {submitError && <div className="submit-error">{submitError}</div>}
              </>
            )}

            {/* Navigation */}
            <div className="form-nav">
              {step > 0
                ? <button className="neu-btn" onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ChevronLeft size={16} /> Back
                  </button>
                : <div />
              }
              {step === 0 && (
                <button className="neu-btn neu-btn-primary" onClick={handleValidate} disabled={validating || !code.trim()} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {validating ? <><Loader size={14} className="adm-spin" /> Validating…</> : <>Next <ChevronRight size={16} /></>}
                </button>
              )}
              {step === 1 && (
                <button className="neu-btn neu-btn-primary" onClick={() => setStep(2)} disabled={!paymentDone} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Next <ChevronRight size={16} />
                </button>
              )}
              {step === 2 && (
                <button className="neu-btn neu-btn-primary" onClick={handleSubmit} disabled={submitting} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {submitting ? <><Loader size={14} className="adm-spin" /> Submitting…</> : <><Send size={15} /> Generate Coupons</>}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
