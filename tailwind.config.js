/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F7F5FA',
          100: '#EEEAF5',
          200: '#DDD5EB',
          300: '#BBA7DC',
          400: '#9979CD',
          500: '#673AB7', // Main purple
          600: '#522E92',
          700: '#3E236E',
          800: '#291749',
          900: '#150C25',
        },
        secondary: {
          50: '#F6F4F7',
          100: '#EDE9EF',
          200: '#DBD3DF',
          300: '#B7A7BF',
          400: '#937A9F',
          500: '#2C1A47', // Dark purple
          600: '#231539',
          700: '#1A102B',
          800: '#110A1C',
          900: '#09050E',
        },
        accent: {
          500: '#FF4081',
        },
        success: {
          500: '#4CAF50',
        },
        error: {
          500: '#F44336',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'wave': 'wave 1.5s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};