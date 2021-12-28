module.exports = {
  purge: ["./Components/*.tsx", "./pages/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#e62272",
      },
      width: {
        '80vw': '80vw',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
