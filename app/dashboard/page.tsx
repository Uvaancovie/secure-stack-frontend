"use client"
import Card from '../../src/components/ui/Card'
import PaymentForm from '../../src/components/PaymentForm'
import { api } from '../../src/lib/api'
import { useEffect, useState } from 'react'

type Payment = {
  _id: string
  amount: number
  currency: string
  payeeAccount: string
  swiftCode: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPayments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchPayments() {
    try {
      const res = await api.get<{ success: boolean; payments: Payment[] }>('/payments')
      if (res.data?.success) setPayments(res.data.payments || [])
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch payments')
    } finally {
      setLoading(false)
    }
  }

  const formatStatus = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  if (loading) return (
    <div className="flex items-center justify-center p-16">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-neutral-800 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400">Loading payments…</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Payment Dashboard</h1>
        <p className="text-neutral-200 mt-1">Manage your international payments</p>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            <p className="text-neutral-400 text-sm">Create or manage payments</p>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium ${showForm ? 'bg-neutral-800 text-white' : 'bg-primary-600 text-white'}`}>
            <span className="text-lg">{showForm ? '✕' : '+'}</span>
            {showForm ? 'Cancel' : 'New Payment'}
          </button>
        </div>

        {error && <div className="mb-4 text-sm text-red-300 bg-red-900 p-3 rounded">{error}</div>}

        {showForm && (
          <div className="mt-4">
            <PaymentForm onSuccess={() => { setShowForm(false); fetchPayments() }} />
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Payment History</h2>
            <p className="text-neutral-400 text-sm">Recent transactions</p>
          </div>
          {payments.length > 0 && (
            <div className="px-3 py-1 bg-neutral-800 rounded text-sm text-neutral-400">{payments.length} payment{payments.length !== 1 ? 's' : ''}</div>
          )}
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center">💳</div>
            <h3 className="text-lg font-semibold text-white">No payments yet</h3>
            <p className="text-neutral-400 mt-2">Create your first payment using the button above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] divide-y divide-neutral-800">
              <thead>
                <tr className="bg-neutral-800">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase">Currency</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase">Payee</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase">SWIFT</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase">Created</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={p._id} className={`${i % 2 === 0 ? 'bg-neutral-900' : 'bg-neutral-800'} hover:bg-neutral-700`}>
                    <td className="py-3 px-4 text-sm text-neutral-300">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-mono text-white text-lg">{`$${p.amount.toLocaleString()}`}</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-neutral-800 rounded text-xs font-semibold">{p.currency}</span></td>
                    <td className="py-3 px-4 font-mono text-neutral-300">{p.payeeAccount}</td>
                    <td className="py-3 px-4 font-mono text-neutral-300">{p.swiftCode}</td>
                    <td className="py-3 px-4">{formatStatus(p.status)}</td>
                    <td className="py-3 px-4 text-neutral-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
