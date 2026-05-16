/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#050505',
          800: '#0b0b0d',
          700: '#131316',
          500: '#1ED760',
          400: '#33d77a',
          accent: '#ff7a18',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(30, 215, 96, 0.18)',
      },
    },
  },
  plugins: [],
}

