/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          500: '#fedc3d',
        },
        gray: {
          500: '#2E2E35',
          700: '#312e38',
          950: '#202022',
        },
        orange: {
          500: '#FFBA00',
        },
      },
      fontFamily: {
        light: ['Roboto-Light'],
        normal: ['Roboto-Regular'],
        medium: ['Roboto-Medium'],
        bold: ['Roboto-Bold'],
      },
    },
  },
  plugins: [],
}
