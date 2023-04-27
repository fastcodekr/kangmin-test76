/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-donut': 'spin 1s linear infinite',
      },
    },
  },
  variants: {},
  plugins: [],
}
