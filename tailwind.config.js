/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js}"],
  purge: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: '"Josefin Sans", sans-serif',
        montserat: '"Montserrat", sans-serif',
        nunito: '"Nunito", sans-serif',
      },
    },
  },
  plugins: [],
};

//? npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
