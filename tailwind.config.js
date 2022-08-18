/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7ECDE',
        secondary: '#9ED2C6',
        primaryDark: '#E9DAC1',
        secondaryDark: '#54BAB9',
        dark: '#2C3333',
        'black-100': 'rgba(0,0,0,0.1)',
        'black-200': 'rgba(0,0,0,0.2)',
        'black-300': 'rgba(0,0,0,0.3)',
      },
      minWidth: {
        fitCostume: '7.5rem',
      },
      minHeight: {
        fitCostume: '2.5rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
