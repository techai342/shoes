
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: '#3b82f6',
          dark: '#020617',
          gray: '#0f172a'
        }
      },
      fontFamily: {
        street: ['Syncopate', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float-3d': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
