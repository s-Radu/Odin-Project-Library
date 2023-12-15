/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js}"],
  purge: ["./**/*.{html,js}"],
  theme: {
    extend: {
      minHeight: {
        card: "700px",
      },
      fontFamily: {
        josefin: '"Josefin Sans", sans-serif',
        montserat: '"Montserrat", sans-serif',
        nunito: '"Nunito", sans-serif',
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(320px, 1fr))",
      },
      backgroundColor: ["before", "after"],
      display: ["before", "after"],
      content: ["before", "after"],
    },
  },
  plugins: [
    require("tailwindcss-pseudo-elements")(),
    function ({ addUtilities }) {
      addUtilities(
        {
          ".empty-content": {
            content: '""',
          },
          ".quote-content": {
            content: '"\\""',
          },
        },
        ["before", "after"]
      );
    },
  ],
};

//? npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
