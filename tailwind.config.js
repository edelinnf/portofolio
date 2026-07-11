/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070B16',
          900: '#0A0F1F',
          800: '#0F172E',
          700: '#131B33',
        },
        teal: {
          accent: '#5EEAD4',
        },
        violet: {
          accent: '#A78BFA',
        },
        amber: {
          accent: '#FBBF24',
        },
        muted: '#8B96AC',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'ink-gradient':
          'radial-gradient(circle at 15% 0%, #131B33 0%, #0A0F1F 45%, #070B16 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
