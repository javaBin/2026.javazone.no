/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        glow: 'color-mix(in srgb, var(--glow-color) calc(<alpha-value> * 100%), transparent)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('glow', '.glow-capture .glow-overlay &')
    }),
  ],
}
