import { useEffect, useState, useCallback } from 'react'
import { RefreshCcw } from 'lucide-react'
import AdminLayout from './AdminLayout'

const API = import.meta.env.VITE_API_URL + '/api/admin'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetch(`${API}/coupons`).then(r => r.json())
      setCoupons(Array.isArray(data) ? data : [])
    } catch {
      setCoupons(JSON.parse(localStorage.getItem('generatedCoupons') || '[]'))
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const fmt = d => d ? new Date(d).toLocaleString() : '—'

  const filtered = coupons.filter(c =>
    !search || c.code?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout title="Generated Coupons" subtitle="All FCFC coupons created on the platform">
      <div className="adm-page-actions">
        <input className="neu-input adm-search" placeholder="Search by code or email…" value={search} onChange={e => setSearch(e.target.value)} />
        <button className="neu-btn adm-refresh-btn" onClick={fetchData} disabled={loading}>
          <RefreshCcw size={14} className={loading ? 'adm-spin' : ''} />
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">
          Generated Coupons
          <span className="adm-count">{filtered.length}</span>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th><th>Code</th><th>Email</th><th>Status</th>
                <th>Submitted From</th><th>Verified At</th><th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={7} className="adm-empty">No coupons found.</td></tr>
                : filtered.map((c, i) => (
                  <tr key={c.id || i}>
                    <td className="mono adm-muted">{filtered.length - i}</td>
                    <td className="mono">{c.code}</td>
                    <td>{c.email || '—'}</td>
                    <td><span className={`adm-badge ${c.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{c.status || 'active'}</span></td>
                    <td className="mono">{c.submitted_from || c.submittedFrom || '—'}</td>
                    <td>{fmt(c.verified_at || c.verifiedAt)}</td>
                    <td>{fmt(c.created_at || c.createdAt)}</td>
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
