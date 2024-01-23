import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://coderdojo.ai3.ro',
  integrations: [
    tailwind(),
    react({
      include: ["**/react/*"],
    }),
  ],
});
