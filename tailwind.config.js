/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-text": "#f6f7f9",
        "dark-bg": "#2f343c",
        hover: "#ff9980",
      },
      keyframes: {
        appear_right: {
          "0%": { opacity: "0", transform: "translateX(5px)" },
          "100%": { opacity: "1", transform: "translateX(0px)" },
        },
      },
      animation: {
        appear_right: "appear_right 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
