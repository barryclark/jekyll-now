/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: "#D946EF",
        hover: "#A21CAF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
