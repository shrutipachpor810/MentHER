/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      colors: {
        mentherWhite: '#FDFDFD',
        mentherSage: '#D8E2DC',
        mentherPeach: '#FFE5D9',
        mentherLightPink: '#FFC8D4',
        mentherPink: '#F4ACB7',
        mentherMauve: '#9D8189',
        mentherSlate: '#42383B',
      },
    },
  },
}
