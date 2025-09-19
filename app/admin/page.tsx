"use client"
import { useState, useEffect } from 'react'
import { api, ApiError } from '../../src/lib/api'

type Payment = {
  _id: string
  amount: number
  currency: string
  recipient?: {
    name?: string
    bank?: string
    account?: string
    swiftCode?: string
  }
  payeeAccount: string
  swiftCode: string
  status: 'pending' | 'verified' | 'submitted'
  createdAt: string
  userId: string
  customerId?: {
    username: string
    fullName: string
  }
}

export default function AdminPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState<string | null>(null)

  useEffect(() => {
    fetchPendingPayments()
  }, [])

  async function fetchPendingPayments() {
    try {
      setLoading(true)
      setError('')
      const response = await api.get<{ success: boolean; payments: Payment[] }>('/admin/payments')
      if (response.data?.success) setPayments(response.data.payments || [])
      else setPayments([])
    } catch (err: any) {
      const apiError = err as ApiError
      setPayments([])
      setError(apiError.response?.data?.error?.message || err?.message || 'Failed to fetch payments')
    } finally {
      setLoading(false)
    }
  }

  async function verifyPayment(paymentId: string) {
    try {
      const response = await api.post<{ success: boolean; payment: Payment }>(`/admin/verify/${paymentId}`)
      if (response.data?.success) setPayments(prev => prev.map(p => p._id === paymentId ? { ...p, status: 'verified' } : p))
    } catch (err: any) {
      const apiError = err as ApiError
      setError(apiError.response?.data?.error?.message || err?.message || 'Failed to verify payment')
    }
  }

  async function submitToSWIFT(paymentId: string) {
    try {
      setSubmitting(paymentId)
      const response = await api.post<{ success: boolean; payment: Payment }>(`/admin/submit/${paymentId}`)
      if (response.data?.success) setPayments(prev => prev.map(p => p._id === paymentId ? { ...p, status: 'submitted' } : p))
    } catch (err: any) {
      const apiError = err as ApiError
      setError(apiError.response?.data?.error?.message || err?.message || 'Failed to submit to SWIFT')
    } finally {
      setSubmitting(null)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center p-8">Loading admin dashboard…</div>

  return (
    <div className="min-h-screen bg-gray-900 font-inter p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-xl p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100 text-lg">International Payment Management System</p>
            </div>
          </div>
        </div>

        {error && <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 mb-8">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Payments</p>
                <p className="text-3xl font-bold text-white mt-2">{payments?.length || 0}</p>
                <p className="text-gray-500 text-sm mt-1">All transactions</p>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-3"><svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg></div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Pending Review</p>
                <p className="text-3xl font-bold text-white mt-2">{payments?.filter(p => p?.status === 'pending').length || 0}</p>
                <p className="text-gray-500 text-sm mt-1">Awaiting verification</p>
              </div>
              <div className="bg-yellow-500/20 rounded-lg p-3"><svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg></div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Verified</p>
                <p className="text-3xl font-bold text-white mt-2">{payments?.filter(p => p?.status === 'verified').length || 0}</p>
                <p className="text-gray-500 text-sm mt-1">Ready for submission</p>
              </div>
              <div className="bg-green-500/20 rounded-lg p-3"><svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Submitted</p>
                <p className="text-3xl font-bold text-white mt-2">{payments?.filter(p => p?.status === 'submitted').length || 0}</p>
                <p className="text-gray-500 text-sm mt-1">Sent to SWIFT</p>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-3"><svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-3">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">Recipient</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">Bank Details</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {payments && payments.length > 0 ? payments.map((payment, index) => {
                  if (!payment || !payment._id) return null
                  return (
                    <tr key={payment._id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition-colors duration-200`}>
                      <td className="py-4 px-6 text-sm text-gray-300">{new Date(payment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td className="py-4 px-6"><div className="text-lg font-semibold text-white font-mono">{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: payment.currency }).format(payment.amount)}</div></td>
                      <td className="py-4 px-6"><div><div className="text-sm font-medium text-white">{payment.customerId?.fullName || 'Unknown Customer'}</div><div className="text-xs text-gray-400">@{payment.customerId?.username || 'unknown'}</div></div></td>
                      <td className="py-4 px-6"><div><div className="text-sm font-medium text-white">{payment.recipient?.name || 'Unknown Recipient'}</div><div className="text-xs text-gray-400 font-mono">{payment.recipient?.account || payment.payeeAccount || 'N/A'}</div></div></td>
                      <td className="py-4 px-6"><div><div className="text-sm font-medium text-white">{payment.recipient?.bank || 'Unknown Bank'}</div><div className="text-xs text-gray-400 font-mono">SWIFT: {payment.recipient?.swiftCode || payment.swiftCode || 'N/A'}</div></div></td>
                      <td className="py-4 px-6">{payment.status}</td>
                      <td className="py-4 px-6"><div className="flex space-x-3">{payment.status === 'pending' && <button onClick={() => verifyPayment(payment._id)} className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700">Verify</button>}{payment.status === 'verified' && <button onClick={() => submitToSWIFT(payment._id)} disabled={submitting === payment._id} className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700">{submitting === payment._id ? 'Submitting...' : 'Submit to SWIFT'}</button>}{payment.status === 'submitted' && <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-green-100 text-green-800">Completed</span>}</div></td>
                    </tr>
                  )
                }) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-3"><svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg><span>Admin Workflow Instructions</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center space-x-3 mb-3"><div className="bg-yellow-500/20 rounded-lg p-2"><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg></div><h4 className="font-medium text-yellow-400">Pending Review</h4></div>
              <p className="text-gray-300 text-sm leading-relaxed">Review payment details carefully, verify recipient information, and ensure compliance with international banking regulations.</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center space-x-3 mb-3"><div className="bg-green-500/20 rounded-lg p-2"><svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><h4 className="font-medium text-green-400">Verified & Ready</h4></div>
              <p className="text-gray-300 text-sm leading-relaxed">Payment has been thoroughly verified and approved. Ready for immediate submission to the SWIFT network.</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center space-x-3 mb-3"><div className="bg-purple-500/20 rounded-lg p-2"><svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg></div><h4 className="font-medium text-purple-400">Submitted to SWIFT</h4></div>
              <p className="text-gray-300 text-sm leading-relaxed">Payment has been successfully submitted to the SWIFT network and is being processed by the banking system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
