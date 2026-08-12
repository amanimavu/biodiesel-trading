// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    adapter: cloudflare(),
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Montserrat",
            cssVariable: "--font-montserrat",
        },
    ],
});
