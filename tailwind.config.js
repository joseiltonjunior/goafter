/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          500: '#e3342f',
        },
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
        blue: {
          500: '#38B6FF',
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
