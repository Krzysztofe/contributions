/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        accent: "#2569F4",
        accent_light: "#4683FF",
        primary_dark: "#CCDDFF",
        primary: "#E0EAFF",
        grey_primary: "#6E6E6E",
        grey_light: "#FAFAFA",
        dark: "#3e3e3e",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      sm: "400px",
      md: "600px",
      lg: "1000px",
    },
  },
  plugins: [require("daisyui")],
};
