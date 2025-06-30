/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sandy-beige': '#F5F1E9',
        'dark-slate': '#2F4F4F',
        'ocean-blue': '#003366',
        'coral': '#FF6B6B',
        'soft-coral': '#FFE5E5',
        'light-ocean': '#E6F2FF',
        // Visit Malaysia 2026 Official Colors
        'vm2026': {
          'primary': '#2054A3',
          'red': '#EB2226',
          'teal': '#03B1A8',
          'yellow': '#FBBE14',
          'purple': '#66308D',
          'navy': '#213E7C',
          'green': '#8EC440',
          'dark-red': '#CA2029'
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        // VM2026 Official Fonts
        'din-bold': ['DIN Bold Italic 2014', 'sans-serif'],
        'filson': ['Filson', 'sans-serif'],
        'against': ['against Regular', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'vm2026-pulse': 'vm2026Pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        vm2026Pulse: {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(32, 84, 163, 0.4)' 
          },
          '50%': { 
            boxShadow: '0 0 0 20px rgba(32, 84, 163, 0)' 
          },
        },
      },
      backdropBlur: {
        '2xl': '40px',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      }
    },
  },
  plugins: [],
};