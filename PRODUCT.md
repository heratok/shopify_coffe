# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Angular 19 (standalone components, lazy routes), TypeScript, Vite-based build, mock-data e-commerce backend (no real API), PayPal JS SDK integration, PWA service worker. Deployed via Vercel.

## Users

- **Mixed audience (confirmed):** a blend of specialty-coffee enthusiasts (single-origin buyers who care about origin, roast level, and tasting notes) and casual buyers (people who want good coffee without friction, value convenience and clear recommendations). The storefront must satisfy both without forcing either to work harder.
- Primary job: discover a coffee, understand why it is worth its price, and complete a purchase with confidence.

## Product Purpose

Brew Haven sells premium single-origin and blended coffees online. Success means a visitor lands, understands the product in seconds, trusts the quality claims, and completes checkout with minimal friction. The store is a premium coffee shop first — the shopping experience, curation, and guarantees are the product, not just the vehicle for beans.

## Positioning

A premium coffee storefront: curated selection, clear origin/roast/note storytelling, transparent guarantees, and a trustworthy checkout experience. The premium-store experience itself is the differentiator — not generic "artisan" platitudes, but a confident, well-crafted shopping experience that makes the catalog feel valuable.

## Operating Context

- E-commerce flow: browse (home, category, search) → product detail → add to cart → cart → login wall → checkout (PayPal) → success.
- Cart persists in localStorage across refresh.
- Auth is a mock login (any email + password ≥ 6 chars works); no real backend.
- Checkout is gated behind login via AuthGuard with returnUrl preservation.
- Dev command: `npm start` (ng serve on :4200).

## Capabilities and Constraints

- Catalog: 8 products, 4 categories (single-origin, blends, espresso, decaf) + featured flags; search and category filtering are now functional.
- Payments: PayPal only (SDK via @paypal/paypal-js); order numbers are derived mock values.
- Images: Pexels remote URLs (some were 404 and were replaced with verified-working IDs 312418 / 894695).
- No real backend: "confirmation email sent" is a promise the mock cannot honor — future work should label it as simulated or wire a real backend.
- Known gaps to fix later: newsletter uses native `alert()`; promo code "Apply" is dead; wishlist is local-only; quick view is a console-log stub; rating stars don't render half-stars on detail page; footer "since 2015" vs About "Est. 2018" contradiction.
- Accessibility: WCAG AA contrast still failing on accent `#c75b39` on white (4.2:1) and `#78716c` on dark (3.6:1); form inputs lack autocomplete attributes on auth pages; heading structure skips levels in places.

## Brand Commitments

- Name: Brew Haven.
- Direction: **Cupping Wheel** (user-selected, 2026-08-15) — the SCA flavor wheel as the identity system. Taste vocabulary drives the whole store: every product carries its flavor-wheel slice as its color identity, and the wheel itself is a navigational instrument. Own-world: warm latte-cream ground, espresso ink for chrome, saturated wheel hues (floral violet, fruity orange, roasty brown, spicy red, nutty amber, cocoa, sweet rose) as the product language, one distinct red for errors. Type: Bricolage Grotesque display + Work Sans body + JetBrains Mono for numerals/data (prices, weights, ratings). Primary CTA in espresso ink for AA contrast. First viewport: giant wheel navigator + featured product's lit slice; signature interaction: select a flavor-family segment to filter the collection by note.
- Language: **mixed (confirmed)** — key user-facing texts in Spanish, technical structure remains; exact copy scope resolved during the redesign.
- No real testimonials/customers/stats: "15K+ customers", "4.9 rating", "50+ varieties" are fabricated claims; future work must not invent new ones.

## Evidence on Hand

- Mock catalog: `src/assets/mock-data/products.ts` (8 products with origin, roast, notes, rating).
- Existing critique snapshot: `.impeccable/critique/2026-08-15T20-48-48Z__src-app.md` (score 21/40).
- No real customer imagery, press, or case studies; Pexels stock imagery only.

## Product Principles

1. Premium store, not generic artisan: the shopping experience must feel curated and confident.
2. Mixed audience: experts get depth (origin, notes, roast) without ceremony; casuals get clarity and speed.
3. Trust at the high-stakes moment: checkout and guarantees must reassure without friction.
4. Honest evidence: never fabricate claims the product cannot back.
5. Functional discovery: search, filters, and category navigation must always work before polish.

## Accessibility & Inclusion

- Target WCAG AA (4.5:1 text contrast minimum); accent colors currently fail and must be adjusted in the redesign.
