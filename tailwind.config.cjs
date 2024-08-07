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
        hover_bg: "#E5E5E5",
        dark: "#3e3e3e",
        white_opacity: "rgba(255,255,255,0.8)",
        black_opacity: "rgba(0,0,0,0.4)",
        td_red: "rgb(226, 0, 34, 0.1)",
        danger: "#ff0101",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      sm: "400px",
      md: "600px",
      lg: "750px",
    },
  },
  plugins: [require("daisyui")],
};
