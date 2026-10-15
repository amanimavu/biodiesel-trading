import { copyFile, readFile, writeFile } from "node:fs/promises";

const WRAPPER = "csp-nonce.mjs";
const WRAPPER_SOURCE = new URL(`../worker/${WRAPPER}`, import.meta.url);

/**
 * @astrojs/cloudflare force-overwrites `main` in the generated dist/server/wrangler.json
 * with `entry.mjs`, so a custom Worker cannot be pointed at from wrangler.jsonc. This
 * copies the CSP nonce wrapper next to entry.mjs and repoints `main` at it.
 *
 * Must be listed after every other integration: the Cloudflare adapter writes
 * dist/server/wrangler.json from its own `astro:build:done` hook.
 */
export default function cspNonce() {
  return {
    name: "csp-nonce",
    hooks: {
      // `dir` is the client output dir; the server bundle sits beside it.
      "astro:build:done": async ({ dir }) => {
        const serverDir = new URL("../server/", dir);
        await copyFile(WRAPPER_SOURCE, new URL(WRAPPER, serverDir));

        const configPath = new URL("wrangler.json", serverDir);
        const config = JSON.parse(await readFile(configPath, "utf8"));
        if (config.main === WRAPPER) return;
        config.main = WRAPPER;
        await writeFile(configPath, JSON.stringify(config));
      },
    },
  };
}