 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        dark: {
          100: '#ccd6e0',
          200: '#99adc1',
          300: '#6684a2',
          400: '#335b83',
          500: '#003264',
          600: '#002850',
          700: '#001e3c',
          800: '#001428',
          900: '#000a14',
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-in forwards',
        'slideUp': 'slideUp 0.6s ease-out forwards',
        'slideDown': 'slideDown 0.6s ease-out forwards',
        'slideUpBig': 'slideUpBig 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scaleIn': 'scaleIn 0.35s ease-in-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'progress': 'progress 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUpBig: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(123, 58, 237, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(123, 58, 237, 0.8)' },
        },
        progress: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(123, 58, 237, 0.5)',
        'glow-lg': '0 0 30px rgba(123, 58, 237, 0.6)',
      },
    },
  },
  plugins: [],
}