/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/images/bg1.jpg')",

      },
      colors: {
        'customGrey' : '#292a2c',
        'customYellow' : '#dcba7b',
        'customBlue' : '#5b79ad',
        'customGrey1' : '#515255',
      },
      fontFamily: {
        'inter' : ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'font-weight': 400,
      }
    },
  },
  plugins: [],
}
