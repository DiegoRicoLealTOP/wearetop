// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://new.wearetop.co",
  base: "/",
  integrations: [tailwind(), icon(), svelte()],
  redirects: {
    "/": "/higher-education",
  },
});
