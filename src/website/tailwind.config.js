const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'brand': ['Bowhouse', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        wireshot: {
          'primary': '#f65a5b',
          'secondary': '#2db928',
          'warning': '#f98948',
          'error': '#FE654F',
          'success': '#A6D43A',
          'white': '#F4EDED',
        }
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 2s ease-in infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}