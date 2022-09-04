/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'app-green': '#D2E9D2'
      }
    },
    fontFamily: {
      'sans': ['Lexend Deca', 'Sans-serif']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
