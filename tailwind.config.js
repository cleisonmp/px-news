/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      boxShadow: {
        outline: '0 0 0 1px',
      },
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      fontSize: {
        xxs: ['0.625rem'],
      },
      colors: {
        gray: {
          100: '#E1E1E6',
          300: '#C4C4CC',
          400: '#8D8D99',
          500: '#7C7C8A',
          600: '#323238',
          700: '#29292E',
          800: '#202024',
          900: '#121214',
        },
        green: {
          100: '#00B37E',
          500: '#00875F',
          900: '#015F43',
        },
        purple: {
          100: '#EBE5F9',
          500: '#8047F8',
          900: '#4B2995',
        },
        red: {
          100: '#F75A68',
          500: '#AB222E',
          900: '#7A1921',
        },
        yellow: {
          100: '#F1E9C9',
          500: '#DBAC2C',
          900: '#C47F17',
        },
      },
    },
  },
  plugins: [],
}
