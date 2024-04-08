/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      sm: "400px",
      md: "600px"
    },
  },
  plugins: [],
};
