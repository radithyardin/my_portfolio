/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vt323: ["VT323", "sans-serif"],
        serif: ['"Libre Baskerville"', "Georgia", "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        cream: "#f5f2ed",
        dark: "#0a0908",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-down": "fadeDown 0.7s ease forwards",
        "pulse-dot": "pulseDot 2.5s ease-in-out infinite",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.75)" },
        },
        scrollLine: {
          "0%, 100%": { opacity: "0.4", transform: "scaleY(1)" },
          "50%": { opacity: "0.9", transform: "scaleY(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
