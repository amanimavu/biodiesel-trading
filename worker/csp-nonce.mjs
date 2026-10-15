import handler from "./entry.mjs";

// Cloudflare's Bot Fight Mode (Free) enables JavaScript Detections that cannot be
// disabled and cannot be skipped. Its inline wrapper contains a per-response random
// token, so its SHA-256 differs on every request and can never be whitelisted as a
// CSP hash. A nonce is the only handle Cloudflare can honour: it reads the nonce out
// of our CSP response header and stamps it onto the scripts it injects.
//
// This wrapper therefore runs on every request, mints a nonce, and:
//   1. injects nonce="..." into every <script> we own
//   2. emits script-src with that nonce (no 'unsafe-inline', no build-time hashes)
//   3. hashes inline <style> blocks at request time so style-src stays strict too
//
// Requires assets.run_worker_first = true so this Worker sees static asset requests.

const HTML = "text/html";
const SCRIPT_TAG = /<script\b(?![^>]*\bnonce=)/gi;
const STYLE_BLOCK = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

const toBase64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));

async function sha256(text) {
    const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(text),
    );
    return `'sha256-${toBase64(digest)}'`;
}

function buildCsp(nonce, styleHashes) {
    const directives = [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "frame-src 'none'",
        "frame-ancestors 'none'",
        "img-src 'self' data:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://cloudflareinsights.com",
        "manifest-src 'self'",
        "upgrade-insecure-requests",
        // Nonce gates our own inline scripts. The Cloudflare Web Analytics beacon is
        // cross-origin; JavaScript Detections is same-origin under /cdn-cgi/ and gets
        // stamped with this same nonce by Cloudflare's edge.
        `script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`,
        "script-src-attr 'none'",
        // Hashes present, so 'unsafe-inline' would be ignored anyway.
        `style-src 'self' https://fonts.googleapis.com ${styleHashes.join(" ")}`,
        "style-src-attr 'unsafe-inline'",
    ];
    return directives.join("; ");
}

async function withCspNonce(request, env, ctx) {
    const response = await handler.fetch(request, env, ctx);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes(HTML) || !response.body) return response;

    const nonce = crypto.randomUUID().replace(/-/g, "");
    const html = await response.text();

    const styleHashes = [
        ...new Set(
            await Promise.all(
                [...html.matchAll(STYLE_BLOCK)].map(([, css]) => sha256(css)),
            ),
        ),
    ];

    const headers = new Headers(response.headers);
    headers.set("Content-Security-Policy", buildCsp(nonce, styleHashes));
    // The body changed, so any validator or length from the asset layer is stale.
    headers.delete("ETag");
    headers.delete("Content-Length");

    return new Response(html.replace(SCRIPT_TAG, `<script nonce="${nonce}"`), {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}

export default { fetch: withCspNonce };
