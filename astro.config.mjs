// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://wearetop.co",
  base: "/",
  integrations: [icon(), svelte(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

