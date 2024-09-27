/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

const sizes = {};

for (let i = 0; i < 500; i++) {
  sizes[i] = `${i / 4}rem`;
  sizes[`${i}.5`] = `${(i + 0.5) / 4}rem`;
}

export default {
  content: [
  ],
  theme: {
    extend: {
      spacing: sizes,
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.gray, // Dark mode Datepicker color
      }
    },
  },
  plugins: [],
}
