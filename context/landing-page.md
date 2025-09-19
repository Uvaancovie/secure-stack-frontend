Alright, Mr Covie — here’s a polished, production-vibe landing page built with **Next.js (App Router) + Tailwind + shadcn/ui**, themed with **daisyUI** (black base, light-blue primary), plus a **tight context** to implement it cleanly.

---

# 1) `app/page.tsx` — professional landing (shadcn + daisyUI theme)

> Assumes you’ve installed shadcn/ui components `button`, `card`, `badge` and have daisyUI configured (steps in section 2).

```tsx
// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  LockKeyhole,
  Send,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Secure Stack — International Payments Portal",
  description:
    "Enterprise-grade international payments with SWIFT submission, human-in-the-loop verification, and transport-layer security by default.",
  openGraph: {
    title: "Secure Stack — International Payments Portal",
    description:
      "Enterprise-grade international payments with SWIFT submission, verification workflow, and TLS/mTLS by default.",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content antialiased">
      {/* Top banner */}
      <div className="w-full border-b border-base-300 bg-gradient-to-r from-primary/10 via-base-100 to-base-100">
        <div className="container mx-auto max-w-6xl px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-gray-300">
              TLS 1.3 • HSTS • OCSP Stapling • mTLS (internal)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/20 text-primary">SWIFT-ready</Badge>
            <Badge variant="secondary">ISO 20022</Badge>
          </div>
        </div>
      </div>

      {/* Header / Nav */}
      <header className="container mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-black shadow-lg">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight">
                Secure Stack
              </span>
              <span className="text-xs text-gray-400">
                International payments, secured.
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="px-4">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="px-4">Register</Button>
            </Link>
            <Link href="/admin/login">
              <Button className="px-4">Admin</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Enterprise-grade international payments
              <span className="block text-primary">secure by default</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              A composable portal for customers and bank teams: registration & login
              flows, human-in-the-loop verification, and **SWIFT submission** over
              hardened transport (TLS 1.3 / mTLS) with modern cryptographic best
              practices.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/register">
                <Button className="group">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Open dashboard</Button>
              </Link>
            </div>

            <ul className="mt-8 grid gap-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> KYC/AML-friendly
                flows (extensible)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> RBAC & secure cookies (HttpOnly, SameSite=Strict)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> CSP/helmet headers to reduce XSS/clickjacking
              </li>
            </ul>
          </div>

          {/* Right card (how it works) */}
          <Card className="bg-base-200/70 border-base-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                How Secure Stack works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>
                  <strong>Customer pays:</strong> Initiate payment in the portal.
                </li>
                <li>
                  <strong>Agent review:</strong> Queue → verify payee & SWIFT code.
                </li>
                <li>
                  <strong>Admin oversight:</strong> Roles, policies, audit trails.
                </li>
                <li>
                  <strong>SWIFT submit:</strong> Verified batch to SWIFT over mTLS.
                </li>
              </ol>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 rounded-md border border-base-300 bg-base-100/50 p-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>Bank-grade TLS</span>
                </div>
                <div className="flex items-center gap-2 rounded-md border border-base-300 bg-base-100/50 p-2">
                  <Globe2 className="h-4 w-4 text-primary" />
                  <span>SWIFT alignment</span>
                </div>
              </div>

              <p className="mt-6 text-xs text-gray-500">
                Built with Next.js App Router, Tailwind, <span className="text-primary">daisyUI</span> theme,
                and <span className="text-primary">shadcn/ui</span> primitives.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Agent Dashboard", desc: "Review & verify payments before submission." },
            { title: "SWIFT Submission", desc: "Batch submit verified payments securely." },
            { title: "Admin Portal", desc: "Manage operators, roles & policies." },
            { title: "Secure by Default", desc: "TLS 1.3, secure cookies, RBAC, CSP." },
          ].map((f) => (
            <Card key={f.title} className="bg-base-200/60 border-base-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-400">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-base-300">
        <div className="container mx-auto max-w-6xl px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Secure Stack — Built for international finance teams
        </div>
      </footer>
    </main>
  );
}
```

---

# 2) Context to implement (install & theme it right)

### 2.1 Tailwind + daisyUI

1. Install:

```bash
npm i -D tailwindcss postcss autoprefixer daisyui
npx tailwindcss init -p
```

2. **`tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="securestack"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        securestack: {
          "primary": "#3ABEFF",
          "primary-content": "#001018",
          "secondary": "#8AB4F8",
          "accent": "#22D3EE",
          "neutral": "#0F172A",
          "base-100": "#0B0B0B",  // black-ish background
          "base-200": "#111319",
          "base-300": "#1E2230",
          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
};
export default config;
```

3. **`app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: type & smoothing */
:root { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
```

4. Set theme on the root HTML (App Router):

**`app/layout.tsx`**

```tsx
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="securestack">
      <body>{children}</body>
    </html>
  );
}
```

---

### 2.2 shadcn/ui essentials

1. Install:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge
npm i lucide-react
```

2. Ensure **`tailwind.config.ts`** `content` paths include `components` and `app`, and that shadcn’s CSS vars are present (the CLI handles this). If you already use daisyUI, that’s fine — shadcn components are just Tailwind with nice API.

---

### 2.3 Link targets (so CTAs don’t 404)

* `/login`, `/register`, `/dashboard`, `/admin/login` pages should exist.
* If you build quickly, add placeholder routes (e.g., simple forms) and wire up your MERN endpoints later.

---

# 3) UX notes tailored to your brand (black + light blue)

* **Color system**: We’ve locked the **primary** to `#3ABEFF` and used daisyUI’s base tokens for black UI.
* **Density**: Cards are compact, typography tight, line-height balanced for a “fintech” look.
* **Trust cues**: Security banner (TLS/HSTS/mTLS), SWIFT/ISO badges, and a clear verification pipeline “how it works.”

---

# 4) Optional polish (quick wins)

* Add a small **animated gradient** under the hero title using Tailwind keyframes.
* Add a **testimonial strip** or **logos row** if you have partners.
* Add **Analytics** event tracking on the primary CTAs (Register, Admin).

---

Want me to also drop **`/login`, `/register`, and `/admin/login`** starter pages using shadcn forms (with field hints that match your ID/account regex) so you can click through end-to-end today?
