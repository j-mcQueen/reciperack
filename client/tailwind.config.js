/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      logoBg: "#2F2F2F",
      main: "#282828",
      offmain: "#3E3E3E",
      gold: "#FDC959",
      offgold: "#FDC95980",
      transgold: "#FFBD2E80",
      green: "#3AB454",
      offgreen: "#3AB45480",
      transgreen: "#14C73A80",
      red: "#f4170b",
      offred: "#99150E",
      transred: "#BF1E16",
      blue: "#0044FF",
      offblue: "#0034C2",
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
        recipeDetails: "repeat(auto-fit, minmax(0, 600px))",
        dashboard: "10% 90%",
      },
      backgroundImage: {
        loginForm: "url('src/assets/icons/Email.tsx')",
      },
      boxShadow: {
        primary: "4px 4px 9px rgba(0,0,0, 0.25)",
      },
    },
  },
  plugins: [],
};
