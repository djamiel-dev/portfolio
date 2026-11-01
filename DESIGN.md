# DESIGN.md – Eén dag licht

Het designsysteem van de homepage (concept E). Beschrijft wat nu gebouwd is; de waarden staan in `components/home/home.module.css`. Het vorige systeem (Heron) staat in de git-geschiedenis.

## 1. Idee
De pagina is één dag: werk in daglicht, skills in het gouden uur, het verhaal in de nacht. Licht betekent "aan": wat live of actief is, licht op. Eén signatuurmoment: de gloeidraad langs de tijdlijn, die eindigt in een hanglamp boven de uitnodiging. De rest blijft rustig.

## 2. Kleur
`Sky.tsx` zet het dagdeel op de root (`data-sky`), op basis van de sectie die het midden van het scherm kruist. De tokens gaan in 1100ms over. Zonder JS kleurt elke zone zichzelf.

| Token | Dag | Gouden uur | Nacht | Gebruik |
|---|---|---|---|---|
| `--bg` | `#eeefeb` | `#f1e9dc` | `#0b0e17` | achtergrond, ook de nav |
| `--fg` | `#121318` | `#17140f` | `#efebe3` | hoofdtekst |
| `--fg-2` | `#45484f` | `#4a4339` | `#b3b7c1` | lopende tekst |
| `--muted` | `#5b5e65` | `#5f574b` | `#9095a2` | labels en meta |
| `--dim` | `#7d8086` | `#857b6b` | `#5e6473` | gedimd, alleen tekst vanaf 24px |
| `--line` | `#c9cbc7` | `#d8cebd` | `#262b3a` | lijnen |
| `--glow` | `#8a5300` | `#8a5300` | `#ffb547` | "aan"-tekst en iconen |
| `--focus` | `#121318` | `#17140f` | `#ffb547` | focusring |

Vaste kleuren:
- `--lamp` `#ffb547` en `--lamp-core` `#fff3d9`: gloeidraad, lampjes, mail-knop (met tekst `#14110b`).
- `#e04400`: "product designer" in de hero. 3,6:1, dus alleen voor tekst vanaf 24px.
- Glyph Swell: `#eeefeb`, `#a3a6a3`, `#8a5300`.
- Case-vlakken: per case een eigen tint, van koel (`#dde2e3`) naar warm (`#e2d4c2`).

## 3. Typografie
Eén familie: **Mona Sans** (variabel). De breedte-as vervangt een tweede font. Geist Mono wordt alleen geladen voor de tekens in Glyph Swell.

| Rol | Grootte | Gewicht | Overig |
|---|---|---|---|
| Hero-zin | `clamp(2rem, 5vw, 5.25rem)` | 540 | breedte 104%, regel 1.02, spatiëring −0.035em |
| Afsluiter | `clamp(2.5rem, 6.6vw, 6.75rem)` | 560 | regel 0.96, −0.04em |
| Sectiekop | `clamp(2rem, 3.8vw, 3.5rem)` | 560 | regel 1, −0.035em |
| Skills-kop | `clamp(1.5rem, 2.4vw, 2.25rem)` | 560 | bewust rustiger, de kaarten dragen de sectie |
| Moment-titel | `clamp(1.75rem, 3vw, 2.75rem)` | 560 | −0.035em |
| Skill-titel | `clamp(1.5rem, 2.1vw, 2rem)` | 540 | −0.03em |
| Case-titel | `clamp(1.25rem, 1.75vw, 1.6875rem)` | 540 | −0.02em |
| Begroeting | `clamp(1.125rem, 1.6vw, 1.5rem)` | 520 | foto staat op de basislijn |
| Body | 1rem | 430 | regel 1.5 |
| Label | 0.75rem | 600 | breedte 125%, hoofdletters, +0.06em, tabulaire cijfers |

## 4. Vorm
- Beeldvlakken en kaarten: rechte hoeken, 1px lijnen. Skills-kaarten delen gestippelde randen.
- Pil-vorm alleen voor bediening: Menu en Email me.
- Iconen: eigen SVG, 24px-raster, lijndikte 1.25, ronde hoeken.
- Geen schaduwen als decoratie. Gloed is alleen voor echt licht: draad, lampjes, lamp.

## 5. Beweging
- Easing: `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)`; `--ease-in-out` `cubic-bezier(0.77, 0, 0.175, 1)`.
- Hover: links veranderen niet van kleur; er schuift een lijn in (320ms). Hover-effecten alleen op apparaten met een fijne aanwijzer.
- Skills: elke kaart blijft even in het licht staan; de rij beweegt licht vertraagd mee.
- Tijdlijn: de draad volgt het scrollen tot 62% van de schermhoogte; lampjes gaan aan met een korte flikkering.
- Naam: typewriter tussen hero en nav, omkeerbaar.
- Reduced motion: alles staat aan en stil. Zonder JS: alles leesbaar en aan.
- Animaties pauzeren buiten beeld.

## 6. Nog niet beslist
- Eén beeldtaal voor hero (tekens) en case-vlakken (raamlicht).
- De rol van oranje naast amber.
- Echte logo's in de tool-widgets en echte case-beelden.
