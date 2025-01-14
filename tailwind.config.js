/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Amiri: ["Amiri", "serif"],
        Kufi: ["Reem Kufi", "serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
