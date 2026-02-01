/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#DB4444",
        dark: "#000000",
        muted: "#7D8184",
        background: "#FFFFFF",
        border: "#E5E7EB",
      },
    },
  },
  spacing: {
    "safe-left": "var(--safe-margin-left)",
    "safe-right": "var(--safe-margin-right)",
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".border-e": {
          "border-inline-end-width": "1px",
        },
        ".border-s": {
          "border-inline-start-width": "1px",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
