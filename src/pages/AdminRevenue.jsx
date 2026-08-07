import { useEffect, useState, useCallback } from 'react'
import { RefreshCcw, DollarSign, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import AdminLayout from './AdminLayout'

const API = 'http://localhost:5000/api/admin'

export default function AdminRevenue() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetch(`${API}/transactions`).then(r => r.json())
      setTransactions(Array.isArray(data) ? data : [])
    } catch {
      setTransactions(JSON.parse(localStorage.getItem('transactions') || '[]'))
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const fmt = d => d ? new Date(d).toLocaleString() : '—'

  const filtered = transactions.filter(t =>
    !search ||
    t.email?.toLowerCase().includes(search.toLowerCase()) ||
    t.coupon?.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = transactions
    .filter(t => (t.status || '').toLowerCase() === 'completed')
    .reduce((a, t) => a + parseFloat((t.amount || '0').toString().replace(/[^0-9.]/g, '')), 0)

  const completed = transactions.filter(t => (t.status || '').toLowerCase() === 'completed').length
  const pending   = transactions.filter(t => (t.status || '').toLowerCase() === 'pending').length

  return (
    <AdminLayout title="Revenue" subtitle="Transaction history and revenue overview">
      <div className="adm-page-actions">
        <input className="neu-input adm-search" placeholder="Search by email or coupon…" value={search} onChange={e => setSearch(e.target.value)} />
        <button className="neu-btn adm-refresh-btn" onClick={fetchData} disabled={loading}>
          <RefreshCcw size={14} className={loading ? 'adm-spin' : ''} />
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      <div className="adm-stats-grid adm-stats-3">
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: 'rgba(39,174,96,0.12)' }}><DollarSign size={22} color="#27ae60" /></div>
          <div className="adm-stat-value">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="adm-stat-label">Total Revenue</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: 'rgba(74,144,217,0.12)' }}><CheckCircle size={22} color="#4A90D9" /></div>
          <div className="adm-stat-value">{completed}</div>
          <div className="adm-stat-label">Completed</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: 'rgba(230,126,34,0.12)' }}><Clock size={22} color="#e67e22" /></div>
          <div className="adm-stat-value">{pending}</div>
          <div className="adm-stat-label">Pending</div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">
          Transactions
          <span className="adm-count">{filtered.length}</span>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>#</th><th>Date</th><th>Email</th><th>Coupon</th><th>Type</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={7} className="adm-empty">No transactions found.</td></tr>
                : filtered.map((t, i) => (
                  <tr key={t.id || i}>
                    <td className="mono adm-muted">{filtered.length - i}</td>
                    <td>{fmt(t.created_at || t.date)}</td>
                    <td>{t.email || '—'}</td>
                    <td className="mono">{t.coupon || '—'}</td>
                    <td>
                      <span className={`adm-badge ${parseFloat(t.amount) === 20 ? 'badge-blue' : 'badge-green'}`}>
                      {parseFloat(t.amount) === 50 ? 'Generate' : parseFloat(t.amount) === 20 ? 'Renewal' : parseFloat(t.amount) === 10 ? 'Submit' : 'Other'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: '#27ae60' }}>{t.amount ? `$${t.amount}` : '—'}</td>
                    <td>
                      <span className={`adm-badge ${(t.status || '').toLowerCase() === 'completed' ? 'badge-green' : 'badge-gray'}`}>
                        {t.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
