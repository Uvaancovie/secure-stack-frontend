"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../../../src/lib/api'
import Link from 'next/link'

// A simplified, self-contained Admin Login page adapted from the original React app.
export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await api.post('/auth/login', formData)
      const payload = (response as any).data
      if (payload?.success && payload?.user?.role === 'admin') {
        // Redirect to admin root
        router.push('/admin')
      } else {
        setError('Invalid admin credentials or insufficient privileges')
      }
    } catch (err: any) {
      setError(err?.message || 'Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  // Minimal helper styles (keeps the original dark theme look without external CSS)
  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '3rem',
    padding: '0 1rem',
    fontSize: '1rem',
    backgroundColor: '#1F1F1F',
    color: '#F5F5F5',
    border: '1px solid #434343',
    borderRadius: 12,
    outline: 'none',
    boxSizing: 'border-box'
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 480, backgroundColor: '#1F1F1F', border: '1px solid #434343', borderRadius: 24, padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, backgroundColor: '#1890FF', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: 28 }}>
            🔐
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F5F5F5', margin: 0 }}>Admin Portal</h1>
          <p style={{ color: '#8C8C8C', marginTop: 6 }}>Secure Stack International Payments</p>
        </div>

        <div style={{ backgroundColor: '#2A1215', border: '1px solid #FF4D4F', borderRadius: 12, padding: 12, marginBottom: 16, display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🛡️</span>
          <div>
            <p style={{ color: '#FFA39E', margin: 0, fontWeight: 600 }}>Administrator Access Only</p>
            <p style={{ color: '#FF7875', margin: 0, fontSize: 12 }}>Unauthorized access is monitored and logged</p>
          </div>
        </div>

        {error && (
          <div style={{ padding: 12, borderRadius: 12, marginBottom: 12, backgroundColor: '#2A1215', border: '1px solid #FF4D4F', color: '#FFA39E' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="username" style={{ display: 'block', color: '#F5F5F5', marginBottom: 8, fontWeight: 600 }}>Administrator Username</label>
            <input id="username" name="username" value={formData.username} onChange={handleChange} required placeholder="Enter your admin username" style={inputStyle} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label htmlFor="password" style={{ display: 'block', color: '#F5F5F5', marginBottom: 8, fontWeight: 600 }}>Administrator Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="Enter your admin password" style={inputStyle} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', height: 56, borderRadius: 12, border: 'none', backgroundColor: loading ? '#0050B3' : '#1890FF', color: '#fff', fontWeight: 700 }}>
            {loading ? 'Authenticating…' : 'Access Admin Panel'}
          </button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #434343', textAlign: 'center' }}>
          <p style={{ color: '#8C8C8C', marginBottom: 8 }}>Need customer access? <Link href="/login" style={{ color: '#1890FF' }}>Customer Portal</Link></p>
          <div style={{ color: '#595959', fontSize: 12 }}>Secure • Encrypted • Monitored</div>
        </div>
      </div>
    </div>
  )
}
