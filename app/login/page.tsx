"use client"
import Card from '../../src/components/ui/Card'
import Input from '../../src/components/ui/Input'
import Button from '../../src/components/ui/Button'
import { api } from '../../src/lib/api'
import { useState } from 'react'
import Link from 'next/link'

interface LoginProps {
}

export default function LoginPage() {
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
      const payload = response.data as any
      if (payload?.success) {
        // navigate to dashboard client-side
        window.location.href = '/dashboard'
      } else {
        setError(payload?.message || 'Invalid credentials')
      }
    } catch (error: any) {
      setError(error?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-xl bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">S</div>
          <h1 className="mt-4 text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-neutral-400">Sign in to your Secure Stack account</p>
        </div>

        <Card>
          {error && <div className="mb-4 text-sm text-red-300 bg-red-900 p-3 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Username" name="username" value={formData.username} onChange={handleChange} required />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
          </form>

          <div className="mt-4 border-t border-neutral-800 pt-4 text-center text-sm text-neutral-400">
            <p>
              New to Secure Stack? <a href="/register" className="text-primary-400 font-medium">Create an account</a>
            </p>
            <p className="mt-2">
              Bank Administrator? <a href="/admin/login" className="text-primary-400 font-medium">Admin Login</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
