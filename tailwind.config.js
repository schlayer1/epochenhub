/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          dark: '#0c0b10',
          darker: '#07060a',
          card: '#16151f',
          border: '#2a2640',
          gold: '#f59e0b',
          stone: '#78716c',
          egypt: '#d97706',
          greece: '#0284c7',
          rome: '#dc2626',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.7)',
        'pixel': '4px 4px 0px 0px rgba(0, 0, 0, 0.85)',
        'pixel-lg': '6px 6px 0px 0px rgba(0, 0, 0, 0.95)',
        'pixel-glow-gold': '0 0 15px rgba(245, 158, 11, 0.4)',
        'pixel-glow-egypt': '0 0 15px rgba(217, 119, 6, 0.4)',
        'pixel-glow-greece': '0 0 15px rgba(2, 132, 199, 0.4)',
        'pixel-glow-rome': '0 0 15px rgba(220, 38, 38, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
