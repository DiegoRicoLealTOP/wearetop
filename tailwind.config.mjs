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
      backgroundImage: {
        "hero-img": "url('/images/hero.webp')",
        "dotted-overlay": "url('/images/gridtile.webp')",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".heading-1": {
          fontSize: "clamp(1.7rem, 3vw, 4rem)",
        },
        ".heading-2": {
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
        },
        ".heading-3": {
          fontSize: "clamp(1.225rem, 3vw, 1.15rem)",
        },
        ".dotted-overlay": {
          backgroundImage: "url('/images/gridtile.webp')",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
        },
      });
    },
  ],
};
