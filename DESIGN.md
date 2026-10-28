# DESIGN.md – Heron design system (measured)

The visual system for the portfolio, taken from https://heronaiapp.com. Only measured values are listed here; anything not yet measured is listed as open at the bottom.

## 1. Source and method

Measured on 28 Oct 2026.

- **designlang 13.3.2** (`npx designlang https://heronaiapp.com`): colours, font families, flat material. Reliable, because these come from Heron's own CSS.
- **Browser measurement** (built-in browser, 1440×900, after the loader finished): type scale, background, muted text, line width. Computed styles via JavaScript.

What designlang got wrong, and why:
- Its headless browser never gets past Heron's loader (screenshot shows the line drawing at 60–74%), even with `--wait 9000`.
- Type sizes came out at 7.4px body / 41px h1: real values, but at the wrong viewport scale (see §2).
- Background came out as `#FFFFFF`: the paper is a texture image, not a colour.
- Colour dominance was measured on the loader; breakpoints came out as `[object Object]`.

## 2. Scale

```css
html { font-size: 0.578704vw; } /* 1rem = 10px at 1728px wide */
```

All sizes are in `rem`, so the whole page scales with the viewport width. At 1440px wide, 1rem = 8.33px.

## 3. Colour

| Role | Value | Used for |
|---|---|---|
| paper | `#F5F5EE` | page background: a tiled paper texture (PNG inside `bg.svg`) whose average colour is `#F5F5EE` |
| ink | `#282828` | primary text, dark surfaces |
| ink 72% | `rgba(40, 40, 40, .72)` | muted body text and labels (opacity, not a separate grey) |
| muted | `#626260` | small meta labels |
| surface | `#72726F` | neutral grey |
| line | `#B3B3AF` | hairlines; also grey display headings (40px) |
| disabled | `#B4B4B0` | `[01]` numbering, `[Scroll to continue]` |
| brand | `#FA3600` | active links ("Home", "Contact us"), markers, accents |

Brand orange is an accent: about 5% of the painted area on Heron.

## 4. Typography

Families: **BT Grotesk** (headings and body, paid) and **Geist Mono** (labels). For the portfolio, **Inter Tight** stands in for BT Grotesk, as in version J.

| Role | Font | Size rem → px @1728 | Weight | Line height | Letter spacing | Case |
|---|---|---|---|---|---|---|
| H1 | BT Grotesk | 5.6 → 56 | 700 | 1.0 | −0.02em | uppercase |
| H2 | BT Grotesk | 4.8 → 48 | 600 | 1.0 | −0.02em | uppercase |
| H3 (grey, `#B3B3AF`) | BT Grotesk | 4.0 → 40 | 600 | 1.0 | −0.02em | uppercase |
| Title | BT Grotesk | 3.2 / 2.8 → 32 / 28 | 600 | 1.0 | −0.02em | uppercase |
| Small heading | BT Grotesk | 2.4 → 24 | 700 | 1.1 | −0.02em | uppercase |
| Body | BT Grotesk | 1.6 → 16 | 400 / 500 | 1.3 | −0.02em | none |
| Mono label | Geist Mono | 1.4 → 14 | 500 | 1.4 | normal | uppercase |
| Mono small | Geist Mono | 1.2 → 12 | 500 | 1.3 | normal | uppercase |

## 5. Shape

- Square corners.
- Lines: `max(1px, .1rem)`. They grow slightly on wide screens but are never thinner than 1px.
- No shadows (flat material).
- `[01]`-style numbering set in mono.

## 6. Not yet measured

- Spacing scale and grid.
- Mobile: how the vw-based scale behaves on small screens.
- Motion and hover/focus states.

Fill these in only once they have been measured.
