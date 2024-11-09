/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      colors: {
        cpurple: {
          DEFAULT: "#6208ad",
          100: "#7f4dee",
          200: "#8224e3",
        },
        czyan: {
          DEFAULT: "#37e5dc",
        },
        cmutted: {
          foreground: "#9a9a9c",
        },
        cpink: {
          DEFAULT: "#ce04d7",
        },
      },
    },
  },
  plugins: [],
};
