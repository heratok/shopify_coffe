# DESIGN.md — Brew Haven (Cupping Wheel)

## Overview

Brew Haven is a premium single-origin coffee storefront whose identity is the **SCA flavor wheel**: tasting notes are color-coded vocabulary, every coffee is a slice of the wheel, and the wheel itself navigates the collection. The visitor reads coffee by taste — "Taste is the language" — and buying feels like cupping. The world refuses both the warm-cream-plus-serif artisan template and the near-black neon cliché.

## Colors

Latte-cream ground with espresso ink chrome; the wheel hues are the product language, never decoration.

- **Grounds**: `cream #faf6ef` (page), `cream-deep #f1e9dc` (panels), `cream-line #e4d9c8` (hairlines).
- **Ink**: `espresso #241a12` (text/chrome), `espresso-soft #3b2d22` (secondary), `espresso-muted #6b5a4d` (muted text ≥5.5:1 on cream).
- **Accent**: `#c8462c` (chips, highlights, lines — bold/large only on cream), `accent-dark #a8351f` (nav active text, ~6:1). Error `#b3261e` is distinct from accent.
- **Wheel hues** (product identity): floral `#8e7cc3`, fruity `#e69138`, sour `#d9a441`, green `#6a9a4e`, roasty `#6b4226`, spicy `#c8462c`, nutty `#b07a3e`, cocoa `#5c4033`, sweet `#d96c8f`.
- **Dark surface**: footer espresso-dark `#140e08` with cream text.

Color strategy: Committed — espresso and cream carry the chrome; wheel hues own entire regions of product identity (arcs, chips, filter states), not scattered accents.

## Typography

- **Display/headings**: Bricolage Grotesque (Google Fonts), weights 400–800, display ~`clamp(2.75rem, 6vw, 4.8rem)`, tracking −0.03em max.
- **Body**: Work Sans 400/500/600/700, 1rem, line-height 1.6, measure 65–75ch on reading surfaces (legal caps at 68ch).
- **Data**: JetBrains Mono, `tabular-nums`, for prices, weights, ratings, spec values, order numbers.
- No gradient text, no system display face, no kickers/eyebrows above headings — the heading carries its own weight.

## Layout

- Container max 1400px, section padding 96px (`--space-24`); spacing scale 4/8/16/24/40/64/96.
- Product grid: 1 col mobile → 2 @576 → 3 @992 → 4 @1400.
- Hero: split — copy left, flavor wheel right (~342–460px SVG, 9 segments); collapses to single column on mobile.
- Header: transparent over hero → solid cream on scroll; sticky; logo = wordmark + wheel-slice SVG mark.
- Footer: espresso-dark, wheel-hue gradient hairline (4px) as its top edge.

## Elevation & Depth

Warm-tinted shadows (`rgba(36,26,18,…)`): sm/md/lg/xl scale; cards lift `translateY(-8px)` on hover with `--shadow-xl`. Offset + blur always; no zero-offset colored halos. Focus ring: `2px accent`, offset 2.

## Shapes

- Cards 16px radius; small controls 8px; pills only for small controls (chips, dots); buttons md 8px.
- Wheel segments: annular sectors separated by cream hairlines, hub "BREW HAVEN" mono.
- No colored border-left >1px on cards/items (footer gradient strip is the one deliberate identity exception, top edge).

## Components

- **Flavor wheel navigator** (signature interaction): 9 family segments in wheel hues; featured product's dominant slice lit (full opacity + dot marker), others 35%; hover scale 1.05; click → `/products?wheel=<family>`; keyboard operable (role=button, Enter/Space, visible focus).
- **Product card**: white ground, 16px radius, 120° wheel-arc slice colored by dominant note family + roast label; price mono; Add-to-Cart espresso fill; actions + wishlist always visible on touch (`@media (hover: none), (pointer: coarse), (max-width: 767px)`).
- **Buttons**: primary espresso fill + cream; accent spicy red + white (bold); outline espresso border; hover lift + warm shadow. Min tap target 44px.
- **Chips**: note chips on detail use `--tag-hue` from the product's dominant family; cream-deep ground, espresso text.
- **Forms**: white ground, cream-line 1px border, accent focus ring; autocomplete attributes set on auth/contact.
- **Quantity selector**: 44×44px buttons, mono value.
- **Auth**: clean centered espresso-panel card on cream (no glass/floating-shapes).
- **Empty/loading states**: per-surface skeletons; empty cart/orders/0-products share one language with clear CTA.

## Do's and Don'ts

- Do map tasting notes to wheel hues consistently (same `getFamilyFromNote` mapping across home, cards, detail, filters).
- Do use JetBrains Mono for every number that matters (price, weight, rating, step numbers).
- Do keep the wheel as a working control — every family must have at least one product (sour, roasty covered).
- Don't use gradient text, glass-for-decoration, emoji icons, or colored border-left >1px on cards.
- Don't put kickers/eyebrows above headings; the heading carries its own weight.
- Don't reintroduce old-palette hexes (`#c75b39`, `#5d4037`, Playfair, Space Grotesk) — grep before styling.
- Don't claim payment methods checkout doesn't offer (PayPal only — one "Secure checkout via PayPal" line).
- Don't fabricate stats/testimonials; label illustrative values honestly.
