import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  // daisyui adds its own top-level config; TypeScript's Tailwind types don't include it
  // so cast to unknown to avoid a type error while keeping the runtime config.
  daisyui: {
    themes: ['corporate', 'dark'],
    darkTheme: 'dark',
  },
}

export default config as unknown as Config



