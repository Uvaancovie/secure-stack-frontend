import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import {
  Send,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe2,
  ShieldCheck,
  Lock,
  Users,
  Clock,
  TrendingUp,
  Play,
  ChevronDown,
} from '../src/components/ui/icons'

import Button from '../src/components/ui/Button'
import Card from '../src/components/ui/Card'
import Badge from '../src/components/ui/Badge'
import ScrollToTop from '../src/components/ui/ScrollToTop'

export const metadata: Metadata = {
  title: 'Secure Stack — Enterprise International Payments Portal',
  description:
    'Transform your international payments with enterprise-grade security, SWIFT submission, human-in-the-loop verification, and bank-level compliance.',
}

export default function Home(): React.ReactElement {
  const features = [
    { icon: CheckCircle2, title: 'KYC/AML-friendly flows (extensible)', highlight: true },
    { icon: CheckCircle2, title: 'RBAC & secure cookies (HttpOnly, SameSite=Strict)' },
    { icon: CheckCircle2, title: 'CSP/helmet headers reduce XSS/clickjacking' },
    { icon: CheckCircle2, title: 'Real-time fraud detection & monitoring', highlight: true },
  ]

  const flowSteps = [
    { step: 1, title: 'Customer initiates', desc: 'Secure portal payment initiation', time: '< 2 min' },
    { step: 2, title: 'Agent review', desc: 'Queue → verify payee & SWIFT code', time: '5-10 min' },
    { step: 3, title: 'Admin oversight', desc: 'Roles, policies, audit trails', time: 'Real-time' },
    { step: 4, title: 'SWIFT submit', desc: 'Verified batch to SWIFT over mTLS', time: '< 1 min' },
  ]

  const stats = [
    { value: '$2.4B+', label: 'Processed annually', trend: '+25%' },
    { value: '99.99%', label: 'System uptime', trend: 'SLA' },
    { value: '50+', label: 'Financial institutions', trend: '+12 this year' },
    { value: '< 30s', label: 'Average processing', trend: '75% faster' },
  ]

  return (
    <main className="min-h-screen bg-base-100 text-black">
      <header className="container mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href={'/' as any} className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-focus text-black shadow">
              <Lock className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight">Secure Stack</span>
              <span className="text-xs text-gray-400">International payments, secured.</span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link href={'/demo' as any}>
              <Button variant="ghost" className="px-4 hidden md:inline-flex">
                <Play className="w-4 h-4 mr-2" />
                Demo
              </Button>
            </Link>
            <Link href={'/login' as any}>
              <Button variant="ghost" className="px-4">Login</Button>
            </Link>
            <Link href={'/register' as any}>
              <Button variant="secondary" className="px-4">Register</Button>
            </Link>
            <Link href={'/admin/login' as any}>
              <Button className="px-4 bg-gradient-to-r from-primary to-primary-focus">Admin</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge>Built for finance teams</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-4">Enterprise international payments, secure by design</h1>
            <p className="text-gray-400 mb-6 max-w-xl">Streamline SWIFT submissions, human-in-the-loop verification, and bank-grade controls — all in one auditable platform.</p>

            <div className="flex gap-4">
              <Link href={'/register' as any}>
                <Button className="bg-gradient-to-r from-primary to-primary-focus px-6 py-3">Get started</Button>
              </Link>
              <Link href={'/demo' as any}>
                <Button variant="ghost" className="px-6 py-3">Request demo</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{f.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-lg font-semibold">How it works</div>
                <div className="text-xs text-gray-400">Human review, audit trails, SWIFT-ready batches</div>
              </div>
            </div>

            <div className="space-y-3">
              {flowSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">{s.step}</div>
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-gray-400">{s.desc} • {s.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4">Proven Results</Badge>
          <h2 className="text-3xl font-bold mb-4">Trusted by enterprises worldwide</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our platform processes billions in transactions with 99.99% uptime</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="group">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="flex items-center justify-center gap-1 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-20 border-t border-base-300 bg-gradient-to-b from-base-100 to-base-200">
        <div className="container mx-auto max-w-6xl px-6 py-12 text-sm text-gray-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-focus text-black shadow">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <div className="font-extrabold">Secure Stack</div>
                <div className="text-xs text-gray-400">International payments, secured.</div>
              </div>
            </div>

            <div className="hidden md:flex gap-6">
              <Link href={'/features' as any}>Features</Link>
              <Link href={'/pricing' as any}>Pricing</Link>
              <Link href={'/security' as any}>Security</Link>
              <Link href={'/api' as any}>API</Link>
            </div>
          </div>

          <div className="border-t border-base-300 pt-6 text-center">© {new Date().getFullYear()} Secure Stack — All rights reserved.</div>
        </div>
      </footer>

      <ScrollToTop />
    </main>
  )
}
