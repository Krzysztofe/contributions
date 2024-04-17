/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        accent: "#2569F4",
        primary_dark: "#CCDDFF",
        primary: "#E0EAFF",
        grey_light: "#FAFAFA",
        dark: "#3e3e3e",
      },
   
    },
    screens: {
      sm: "400px",
      md: "600px",
    },
  },
  plugins: [require("daisyui"),

],
};
