// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    site: "https://biodiesel.goldentie.africa",
    adapter: cloudflare({
        imageService: "compile",
    }),
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Montserrat",
            cssVariable: "--font-montserrat",
        },
    ],
    image: {
        layout: "constrained",
        responsiveStyles: true,
    },
});
