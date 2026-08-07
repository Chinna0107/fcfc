import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket, ChevronRight, ChevronLeft, Copy, Check, Loader } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import coinImg from '../assets/coin.png'
import './GenerateCoupon.css'

const API = 'http://localhost:5000/api/general'
const steps = ['Your Details', 'Payment', 'Review & Generate']

export default function GenerateCoupon() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '' })
  const [card, setCard] = useState({ nameOnCard: '', number: '' })
  const [paymentDone, setPaymentDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.email.trim()
    if (step === 1) return paymentDone
    return true
  }

  const handlePayment = () => {
    if (!card.nameOnCard.trim() || !card.number.trim()) return
    setPaymentDone(true)
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/generate-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate coupon')
      setGeneratedCode(data.code)
      navigate('/coupon/success', { state: { code: data.code } })
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main>
      <div className="page-header">
        <h1>Generate Coupon</h1>
        <p>Create a new blockchain-verified coupon in 3 easy steps.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="form-card">
            <StepIndicator steps={steps} current={step} />

            {/* Step 0 — Details */}
            {step === 0 && (
              <>
                <div className="form-title">Your Information</div>
                <div className="form-subtitle">Enter your name and email to get started.</div>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="neu-input" placeholder="Enter your name" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="neu-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
              </>
            )}

            {/* Step 1 — Payment */}
            {step === 1 && (
              <>
                <div className="form-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={coinImg} alt="payment" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  Payment
                </div>
                <div className="form-subtitle">Complete payment to enable coupon generation.</div>
                <div className="form-group">
                  <label className="form-label">Name on Card</label>
                  <input className="neu-input" placeholder="Name on card" value={card.nameOnCard} onChange={e => setCard(c => ({ ...c, nameOnCard: e.target.value }))} disabled={paymentDone} />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="neu-input" placeholder="4242 4242 4242 4242" value={card.number} onChange={e => setCard(c => ({ ...c, number: e.target.value }))} disabled={paymentDone} />
                </div>
                {!paymentDone
                  ? <button className="neu-btn neu-btn-primary" onClick={handlePayment} disabled={!card.nameOnCard.trim() || !card.number.trim()}>
                      Pay & Continue
                    </button>
                  : <div style={{ color: '#27ae60', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={16} /> Payment successful
                    </div>
                }
              </>
            )}

            {/* Step 2 — Review */}
            {step === 2 && (
              <>
                <div className="form-title">Review & Generate</div>
                <div className="form-subtitle">Confirm your details before generating your coupon.</div>
                <div className="review-summary">
                  {[
                    ['Full Name', form.name],
                    ['Email', form.email],
                    ['Payment', 'Completed'],
                  ].map(([k, v]) => (
                    <div key={k} className="review-row">
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
                      <span style={{ color: 'var(--navy)', fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                </div>
                {error && <div style={{ color: '#e74c3c', fontSize: 13, marginBottom: 12 }}>{error}</div>}
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
              {step < steps.length - 1
                ? <button className="neu-btn neu-btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext()} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    Next <ChevronRight size={16} />
                  </button>
                : <button className="neu-btn neu-btn-primary" onClick={handleGenerate} disabled={loading || !!generatedCode} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {loading ? <><Loader size={15} className="spin" /> Generating…</> : <><Ticket size={15} /> Generate Coupon</>}
                  </button>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Generated Code */}
      {generatedCode && (
        <section className="section">
          <div className="page-wrapper">
            <div className="form-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy)', marginBottom: 6 }}>Coupon Generated!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Your unique FCFC coupon code is ready.</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--bg)', padding: '14px 20px', borderRadius: 12, boxShadow: 'var(--shadow-in)', marginBottom: 20 }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--navy)', fontSize: 20, letterSpacing: 2 }}>{generatedCode}</span>
                <button className="neu-btn" onClick={copyCode} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div>
                <button className="neu-btn neu-btn-primary" onClick={() => navigate('/thank-you')}>Finish</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
