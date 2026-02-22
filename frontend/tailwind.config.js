/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ IMPORTANT
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
      },
    },
  },
  plugins: [],
};
