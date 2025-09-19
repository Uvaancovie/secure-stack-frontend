"use client"
import Card from '../../src/components/ui/Card'
import Input from '../../src/components/ui/Input'
import Button from '../../src/components/ui/Button'
import { api } from '../../src/lib/api'
import { useState } from 'react'

function isValidSouthAfricanID(id: string) {
  // SA ID must be 13 digits: YYMMDDSSSSCAZ
  // - YYMMDD: birth date
  // - SSSS: sequence
  // - C: citizenship (0 SA, 1 other)
  // - A: usually 8/9 (race prior standard) - not validated strictly here
  // - Z: checksum (Luhn)
  if (!/^[0-9]{13}$/.test(id)) return false
  const yy = id.slice(0, 2)
  const mm = id.slice(2, 4)
  const dd = id.slice(4, 6)
  // Validate date (allow 1900-2099 window)
  const year = Number(yy)
  const month = Number(mm)
  const day = Number(dd)
  // Heuristic: try both 19xx and 20xx where reasonable
  const candidates = [1900 + year, 2000 + year]
  let validDate = false
  for (const y of candidates) {
    const d = new Date(y, month - 1, day)
    if (d.getFullYear() === y && d.getMonth() + 1 === month && d.getDate() === day) {
      validDate = true
      break
    }
  }
  if (!validDate) return false

  // Luhn checksum for the last digit
  const digits = id.split('').map((d) => Number(d))
  let sum = 0
  for (let i = 0; i < 12; i++) {
    let val = digits[i]
    if (i % 2 === 0) {
      sum += val
    } else {
      let dbl = val * 2
      if (dbl > 9) dbl = Math.floor(dbl / 10) + (dbl % 10)
      sum += dbl
    }
  }
  const check = (10 - (sum % 10)) % 10
  return check === digits[12]
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({ fullName: '', idNumber: '', accountNumber: '', username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [idError, setIdError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    if (!isValidSouthAfricanID(formData.idNumber)) {
      setError('ID Number is not a valid South African ID')
      setLoading(false)
      return
    }

    // Normalize account number (strip spaces) and validate digits-only 8-16 chars
    const normalizedAccount = formData.accountNumber.replace(/\s+/g, '')
    if (!/^[0-9]{8,16}$/.test(normalizedAccount)) {
      setError('Account Number must be 8-16 digits (numbers only)')
      setLoading(false)
      return
    }

    try {
      const { confirmPassword, ...registrationData } = formData
      // Use normalized account number (no spaces) when sending to the server
      registrationData.accountNumber = normalizedAccount
      const response = await api.post('/auth/register', registrationData)
      const payload = response.data as any
      if (payload?.success) {
        setSuccess('Registration successful! You can now log in with your credentials.')
        setFormData({ fullName: '', idNumber: '', accountNumber: '', username: '', password: '', confirmPassword: '' })
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      } else {
        setError(payload?.message || 'Registration failed')
      }
    } catch (error: any) {
      setError(error?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">S</div>
          <h1 className="mt-4 text-2xl font-bold text-white">Create Account</h1>
          <p className="text-neutral-400">Join Secure Stack for international payments</p>
        </div>

        {error && <div className="mb-4 text-sm text-red-300 bg-red-900 p-3 rounded">{error}</div>}
        {success && <div className="mb-4 text-sm text-green-300 bg-green-900 p-3 rounded">{success}</div>}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required minLength={2} maxLength={120} />
            <Input label="South African ID Number" id="idNumber" name="idNumber" value={formData.idNumber} onChange={(e)=>{ setIdError(''); handleChange(e)}} required pattern="^[0-9]{13}$" />
            {idError && <div className="text-sm text-red-300">{idError}</div>}
            <Input label="Account Number" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required pattern="^[0-9]{8,16}$" inputMode="numeric" />
            <Input label="Username" id="username" name="username" value={formData.username} onChange={handleChange} required minLength={3} maxLength={50} />
            <Input label="Password" id="password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={8} />
            <Input label="Confirm Password" id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />

            <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</Button>
          </form>

          <div className="mt-4 text-center text-sm text-neutral-400">
            Already have an account? <a href="/login" className="text-primary-400 font-medium">Sign in here</a>
          </div>
        </Card>
      </div>
    </div>
  )
}
