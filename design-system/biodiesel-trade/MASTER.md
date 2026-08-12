# Biodiesel Feedstock Trading — Design System

Golden Tie subsidiary. Trades biodiesel feedstocks (UCO, POME, animal fats, glycerol) and related biofuel commodities.

**References**
- Content architecture: [biogratrading.com](https://www.biogratrading.com/) — physical trading company, nav = Who We Are / Sustainability / Products We Trade / Countries of Operation / Contact Us.
- UI/layout: [kineticuae.com](https://kineticuae.com/) — light warm palette, bold rounded sans headings, eyebrow-label + heading pairs, photo cards with dark scrim, oversized numeral process steps, beige feature capsules, dark footer.
- Brand accent: Gold, matched to the dominant color of the Golden Tie logo mark (see `src/components/Logo.astro`) rather than the per-subsidiary orange/yellow/amber convention — chosen for direct visual consistency between logo and site chrome.

**Non-negotiables**
- Light site. Body/section backgrounds stay cream/white/beige. Only the footer is dark — that's a standard anchor, not a "dark site."
- Gold is the accent, not the dominant field color. Use it for eyebrow labels, links, buttons, active nav state, icon strokes, thin rules. Large flat gold fields read cheap — avoid.
- The tokened accent gold (`#D6A400`) is deliberately darker/more saturated than the logo's lightest highlight tones (`#F9E322`, `#FBDC30`) — those don't hold contrast as text or button fills on a light background. Reserve the lighter logo golds for the logo mark itself; use `--color-accent` for UI.

---

## Color

```css
--color-bg:          #FBF8F0;  /* page background, pale gold tint (Figma gold ramp, ~90% white) */
--color-surface:     #FFFFFF;  /* cards, nav bar */
--color-surface-alt: #F3E9C7;  /* alternating section bg, muted gold tint — subtle, not a flat gold field */
--color-border:      #D9C98F;  /* hairlines, card borders — muted gold tone, grayed down from accent */

--color-ink:         #211C15;  /* headings, primary text — warm near-black */
--color-ink-soft:    #59544A;  /* body copy, secondary text */
--color-ink-faint:   #8A8478;  /* captions, metadata */

--color-accent:       #D6A400; /* primary accent — CTAs, links, eyebrow labels (darkened logo gold) */
--color-accent-dark:  #B08600; /* hover/active state */
--color-accent-tint:  #FBF0D2; /* pill/badge backgrounds, subtle highlight fields */

--color-green:        #6B8F71; /* secondary accent — sustainability/eco iconography only */

--color-footer-bg:   #1C1712;  /* footer only */
--color-footer-ink:  #F2EDE2;
--color-footer-line: #38322A;
```

Logo gold family (reference only — do not use for UI text/fills, contrast too low on light bg): `#F9E322`, `#F9BD11`, `#F5B900`, `#C98200`. These live in `Logo.astro`'s gradient text only.

Usage rules:
- Body text on `--color-bg`/`--color-surface-alt` is always `--color-ink` or `--color-ink-soft` — never accent gold (fails contrast, reads as a broken link).
- Accent-gold text on white needs weight (600+) or a deliberate underline to hold contrast at small sizes; prefer accent gold on buttons/badges over long inline runs.
- `--color-green` is reserved for sustainability iconography (feedstock sourcing, certifications) so it doesn't compete with gold as a second "brand" color.

## Typography

- **Headings** — Poppins, 600–800. Bold, rounded geometric sans carries the Kinetic-style confident headline look.
- **Body** — Inter, 400–500. Neutral, highly legible at small sizes for spec-heavy trading content (product tables, certifications).
- **Eyebrow labels** — Poppins 600, uppercase, `letter-spacing: 0.08em`, `--color-accent`, small (13–14px). Precedes every section heading: `OUR SERVICES` / `SUSTAINABILITY` / `PRODUCTS WE TRADE`.

```css
--font-heading: "Poppins", system-ui, sans-serif;
--font-body:    "Inter", system-ui, sans-serif;

--text-eyebrow: 0.875rem;
--text-body:    1rem;
--text-lg:      1.125rem;
--text-h3:      clamp(1.375rem, 1.1rem + 1vw, 1.75rem);
--text-h2:      clamp(2rem, 1.5rem + 2vw, 2.75rem);
--text-h1:      clamp(2.5rem, 1.7rem + 3.5vw, 4rem);
```

## Spacing & shape

8px base scale. Sections get generous vertical padding — this is a whitespace-forward layout, not a dense one.

```css
--space-1: 0.5rem;
--space-2: 1rem;
--space-3: 1.5rem;
--space-4: 2rem;
--space-6: 3rem;
--space-8: 4rem;
--space-12: 6rem;   /* section vertical padding, desktop */

--radius-sm: 8px;   /* buttons, form fields */
--radius-md: 16px;  /* cards */
--radius-lg: 24px;  /* photo cards, feature capsules */
--radius-pill: 999px; /* nav CTA, badges */
```

## Layout rhythm

Full-width vertical sections, alternating background to mark boundaries (no hairline borders between sections — the color shift *is* the boundary):

`bg` → `surface-alt` → `bg` → `surface-alt` → ... → `footer-bg`

Every content section follows the same header pattern:

```
[eyebrow label — accent gold, uppercase, tracked]
[H2 heading — ink, bold, Poppins]
[optional 1-2 line intro — ink-soft, body font, max-width ~40ch]
```

## Components

**Nav** — sticky, `--color-surface`, wordmark left, links center/right, one dropdown (Products We Trade → feedstock categories), pill-shaped accent-gold CTA button far right (`Contact` / `Get in Touch`). Active link underlined or colored accent gold, not both.

**Hero** — full-bleed photo (feedstock/industrial: tanker trucks, drums, refinery), dark gradient scrim bottom-up for text legibility, white H1 + supporting paragraph + accent-gold pill CTA button, left-aligned per Kinetic reference.

**Photo/service cards** — image fills card, dark gradient scrim at bottom third, white heading + arrow glyph + short description sit on the scrim. Grid of 3–4, equal width. Use for "What We Trade" categories (Biofuels / Feedstocks & By-Products / Feed & Technical Products).

**Numbered process steps** — oversized numeral (`--text-h1` scale, `--color-ink`, low-opacity or outline treatment), heading + short description beside/below, alternating with a photo. 3-column, for a Sourcing → Trading → Distribution flow.

**Icon feature grid** — 4-column, line icons (outline style, `--color-green` stroke for sustainability, `--color-accent` stroke for trading/logistics), bold heading + 1-line description. Use for certifications, countries of operation highlights, or feedstock-source types.

**Feature capsule** — rounded (`--radius-lg`) `--color-surface-alt` card, icon centered/left, bold label. Use for trust markers: "ISCC Certified," "40+ Countries," "Physical Trading Since 20XX."

**Client/partner logo strip** — grayscale or full-color logos, evenly spaced, on `--color-surface-alt`.

**FAQ accordion** — rows on `--color-surface-alt`, bold question, plus/minus toggle in a small square button (`--radius-sm`), expands to `--color-ink-soft` answer text.

**Footer** — `--color-footer-bg`, wordmark (reversed/light), 3–4 link columns (Company / Products / Sustainability / Contact), contact block with icon-prefixed address/phone/email, optional subtle diagonal decorative shape (low-opacity, matches Kinetic reference) — keep it structural, not textured.

## Content architecture (site map)

Modeled on Biogra's structure, adapted to Golden Tie's Biodiesel Feedstock Trader positioning:

1. **Hero** — one-line mission (physical trading of biodiesel feedstocks and biofuels), scale/reach claim, CTA.
2. **Who We Are** — company positioning: physical trading, long-term partner relationships, team expertise, Golden Tie parent mention.
3. **Products We Trade** — three groups as photo cards: *Biofuels* (UCOME, FAME, HVO blends), *Feedstocks & By-Products* (UCO, POME, animal fats, glycerol), *Feed & Technical Products* (fish oil, lecithin, fatty acids).
4. **Sustainability** — certifications (ISCC etc.), pillars: traceability, GHG reduction, responsible sourcing — icon feature grid.
5. **Countries of Operation** — reach claim + list/map.
6. **Contact** — form (name, company, email, phone, message) + physical address/direct contact, accent-gold CTA button.
7. **Footer** — nav recap, contact block, subsidiary/parent link back to Golden Tie.

Do not copy Biogra's or Kinetic's copy verbatim — this is a structural/visual reference only; all headline and body copy must be written fresh for Golden Tie's Biodiesel Feedstock Trader.
