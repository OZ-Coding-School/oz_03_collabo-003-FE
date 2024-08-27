/** @type {import('tailwindcss').Config} */
const rem0_10 = { ...Array.from(Array(11)).map((_, i) => `${i / 10}rem`) };
const rem0_100 = { ...Array.from(Array(101)).map((_, i) => `${i / 10}rem`) };
const rem0_2000 = { ...Array.from(Array(2001)).map((_, i) => `${i / 10}rem`) };

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      borderWidth: rem0_10,
      borderRadius: rem0_100,
      fontSize: rem0_100,
      lineHeight: rem0_100,
      minWidth: rem0_2000,
      minHeight: rem0_2000,
      spacing: rem0_2000,
    },
  },
  plugins: [],
};
