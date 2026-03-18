/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        arkhe: {
          dark: '#000000',
          light: '#E8E8E8',
          muted: '#666666',
          border: '#222222',
          card: '#111111'
        }
      },
      letterSpacing: {
        widest: '0.3em',
      }
    },
  },
  plugins: [],
}
