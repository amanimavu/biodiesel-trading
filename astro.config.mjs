// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

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

  security: {
      csp: {
          algorithm: "SHA-256",

          // Per-page directives. `frame-ancestors` lives in public/_headers instead,
          // because browsers ignore it when delivered via <meta http-equiv>.
          directives: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "form-action 'self'",
              "frame-src 'none'",
              "img-src 'self' data:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self'",
              "manifest-src 'self'",
              "upgrade-insecure-requests",
          ],

          styleDirective: {
              resources: [
                  { resource: "'self'", kind: "element" },
                  { resource: "https://fonts.googleapis.com", kind: "element" },
                  // Component `style="..."` attributes (image placeholders, --index).
                  { resource: "'unsafe-inline'", kind: "attribute" },
              ],
          },

          scriptDirective: {
              resources: ["'self'"],
          },
      },
  },

  integrations: [sitemap()],
});