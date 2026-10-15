## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content Security Policy

The CSP is emitted per-request by `worker/csp-nonce.mjs`, not by Astro. Three
invariants keep it working — break any one and Cloudflare's bot protection silently
stops working while the site still renders:

1. `assets.run_worker_first: true` in `wrangler.jsonc`. Without it the asset layer
   serves HTML directly and the Worker never runs, so no nonce is issued.
2. `security.csp: false` in `astro.config.mjs`. Astro can only write a `<meta>`
   policy with build-time hashes. Cloudflare JavaScript Detections is not supported
   with a nonce in a `<meta>` tag, and two policies intersect, so a meta policy would
   block the nonce. Do not re-enable it.
3. `integrations/csp-nonce.mjs` must stay **last** in `integrations`. The Cloudflare
   adapter writes `dist/server/wrangler.json` from its own `astro:build:done` hook
   and hardcodes `main` to `entry.mjs`; this integration runs after it and
   repoints `main` at the wrapper.

Why a nonce at all: the zone runs Bot Fight Mode on the Free plan, where JavaScript
Detections cannot be disabled and cannot be skipped. Its inline script carries a
per-response random token, so its SHA-256 changes on every request and can never be
whitelisted. Cloudflare reads the nonce out of the CSP **response header** and
stamps it onto the scripts it injects.

After changing CSP directives, verify with a real browser rather than assuming:

```
npm run build && npx wrangler dev --port 8799 -c dist/server/wrangler.json
```

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
