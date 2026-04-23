/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:    '#6C5CE7',
        secondary:  '#00C2FF',
        accent:     '#00FFA3',
        bg:         '#0D1117',
        card:       '#161B22',
        'card-2':   '#1C2333',
        border:     '#30363D',
        text:       '#E6EDF3',
        muted:      '#8B949E',
        danger:     '#FF6B6B',
        warning:    '#FFD93D',
      },
      fontFamily: {
        sans:  ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-geist-mono)', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'glow':       'glow 2s ease-in-out infinite alternate',
        'slide-up':   'slideUp 0.3s ease-out',
        'fade-in':    'fadeIn 0.4s ease-out',
        'ping-slow':  'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        glow: {
          '0%':   { boxShadow: '0 0 5px #6C5CE740, 0 0 10px #6C5CE720' },
          '100%': { boxShadow: '0 0 20px #6C5CE780, 0 0 40px #6C5CE740' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          "linear-gradient(rgba(108,92,231,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.03) 1px, transparent 1px)",
        'gradient-radial':
          'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};
