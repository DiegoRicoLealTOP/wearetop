// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://new.wearetop.co",
  base: "/",
  integrations: [icon(), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
