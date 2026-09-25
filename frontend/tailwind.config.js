/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ihfcDark: '#2C1B18',
        ihfcRed: '#8B2117',
        ihfcOrange: '#E87D25',
        ihfcGold: '#F2A900',
        simpliBlue: '#0052CC'
      }
    },
  },
  plugins: [],
}
