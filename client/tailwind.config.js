/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      logoBg: "#2F2F2F",
      main: "#282828",
      gold: "#FDC959",
      green: "#3AB454",
      txt1: "#FFFFFF",
      txt2: "#CECECE",
    },
    fontFamily: {
      logo: ["Zen Kurenaido", "sans-serif"],
      body: ["Amiri", "serif"],
      heading: ["Marcellus", "serif"],
      manrope: ["Manrope", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        features: "40% 30%",
      },
      boxShadow: {
        primary: "4px 4px 9px rgba(0,0,0, 0.25)",
      },
    },
  },
  plugins: [],
};
