// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import cspNonce from "./integrations/csp-nonce.mjs";

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

  // No `security.csp` here on purpose. Astro can only emit a <meta> policy with
  // build-time hashes, and Cloudflare JavaScript Detections is not supported with a
  // nonce in a <meta> tag. Two policies also intersect, so a meta policy would block
  // the per-request nonce that worker/csp-nonce.mjs injects. The Worker below is the
  // single source of truth for the CSP.
  security: {
      csp: false,
  },

  integrations: [sitemap(), cspNonce()],
});