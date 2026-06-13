/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7c3aed',
          'purple-light': '#a855f7',
          'purple-dark': '#4c1d95',
          pink: '#ec4899',
          'pink-light': '#f472b6',
          'pink-dark': '#be185d',
        },
        dark: {
          bg: '#0d0617',
          surface: '#1a0a2e',
          card: '#120820',
          border: 'rgba(255,255,255,0.08)',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.3) 100%)',
        'dark-radial': 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
