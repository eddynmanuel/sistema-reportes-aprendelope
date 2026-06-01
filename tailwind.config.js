/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple:      '#34155E',
          'purple-dk': '#270e47',
          'purple-lt': '#4a2080',
          orange:      '#EE531F',
          'orange-dk': '#d84616',
          yellow:      '#F9A825',
        },
        success:  '#10B981',
        danger:   '#EF4444',
        warning:  '#F59E0B',
        info:     '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fade-up 0.4s ease both',
        'fade-in':    'fade-in 0.3s ease both',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'fill-bar':   'fill-bar 1s ease-out both',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'fill-bar': {
          from: { width: '0%' },
        },
      },
      boxShadow: {
        'card':  '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.06)',
        'elevated': '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};