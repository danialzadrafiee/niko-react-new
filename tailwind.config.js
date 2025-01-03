import daisyui from "daisyui"
import containerQueries from "@tailwindcss/container-queries"
import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kalameh", "sans-serif"],
      },
      colors: {
        primary: "#5A30A7",
        "primary-light": "#d6bbf7",
        "base-1": "#2D2D2D",
        "base-3": "F5F3FC",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5a30a7",
          secondary: "#0091f9",
          accent: "#00d0ff",
          neutral: "#091302",
          "base-100": "#ffffff",
          info: "#00abcd",
          "secondary-content": "#ffffff",
          "info-content": "#ffffff",
          "success-content": "#ffffff",
          success: "#00bc63",
          warning: "#FFD494",
          error: "#d91452",
        },
      },
    ],
  },
  plugins: [daisyui, containerQueries, animate],
}
