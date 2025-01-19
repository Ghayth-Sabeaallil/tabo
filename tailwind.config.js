/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Amiri: ["Amiri", "serif"],
        Kufi: ["Reem Kufi", "serif"],
      },
      colors: {
        header: "#4E342E",
        footer: "#4E342E",
        text: "#BA9503",
        buttom: "#4E342E",
        bg: "#d1b580",
        hoverBg: "#7e544a",
        dropDownBg: "#4E342E",
        card: "#6e4941",
      },
    },
  },
  variants: {},
  plugins: [],
};
