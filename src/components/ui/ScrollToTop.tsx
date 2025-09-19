"use client"

import React from 'react'
import { ChevronDown } from './icons'

export default function ScrollToTop(): React.ReactElement {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 p-3 bg-primary text-black rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
      aria-label="Scroll to top"
    >
      <ChevronDown className="w-5 h-5 rotate-180" />
    </button>
  )
}
