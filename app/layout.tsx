import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Stack',
  description: 'International payments portal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="corporate">
      <body>{children}</body>
    </html>
  )
}
