import { useState } from 'react'
import { api, ApiError } from '../lib/api'
import Input from './ui/Input'
import Button from './ui/Button'
import Card from './ui/Card'

interface PaymentFormProps {
  onSuccess: () => void
}

export default function PaymentForm({ onSuccess }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    payeeAccount: '',
    swiftCode: '',
    recipientName: '',
    recipientBank: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post<{ success: boolean; payment: any }>('/payments', {
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        payeeAccount: formData.payeeAccount,
        swiftCode: formData.swiftCode,
        recipient: {
          name: formData.recipientName,
          bank: formData.recipientBank,
        },
      })

      if (response.data.success) {
        onSuccess()
        setFormData({
          amount: '',
          currency: 'USD',
          payeeAccount: '',
          swiftCode: '',
          recipientName: '',
          recipientBank: ''
        })
      }
    } catch (err: any) {
      const apiError = err as ApiError
      setError(apiError.response?.data?.error?.message || 'Payment creation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center text-white">💸</div>
        <h3 className="text-lg font-semibold text-white">Create New Payment</h3>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-900 border border-red-700 text-red-200">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required min={0.01} step={0.01} />
          <div>
            <label className="text-sm text-neutral-400">Currency</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="w-full mt-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-white">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Recipient Name" name="recipientName" value={formData.recipientName} onChange={handleChange} required />
          <Input label="Recipient Bank" name="recipientBank" value={formData.recipientBank} onChange={handleChange} required />
        </div>

        <Input label="Payee Account" name="payeeAccount" value={formData.payeeAccount} onChange={handleChange} required />

        <Input label="SWIFT/BIC Code" name="swiftCode" value={formData.swiftCode} onChange={handleChange} required />

        <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? 'Processing...' : 'Create Payment'}</Button>
      </form>
    </Card>
  )
}
