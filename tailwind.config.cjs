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
        white_opacity: "rgba(255,255,255,0.8)",
        black_opacity: "rgba(0,0,0,0.4)",
        // td_red: "rgba(254, 226, 226, 0.5)",
        td_red: "rgb(226, 0, 34, 0.1)",
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
