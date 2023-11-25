/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color2nd': 'rgb(61,41,66)',
        'colorPrimary':'e7b226'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

