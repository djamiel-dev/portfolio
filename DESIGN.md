# DESIGN.md – Eén dag licht

Het designsysteem van de homepage (concept E). Beschrijft wat nu gebouwd is; de waarden staan in `components/home/home.module.css`, en `/design-system` toont ze live. Het vorige systeem (Heron) staat in de git-geschiedenis.

## 1. Idee
De pagina is één dag: werk en skills in daglicht, het verhaal in de nacht. Licht betekent "aan": wat live of actief is, licht op. Eén signatuurmoment: de gloeidraad langs de tijdlijn, die eindigt in een hanglamp boven de uitnodiging. De rest blijft rustig.

## 2. Kleur
`Sky.tsx` zet het dagdeel op de root (`data-sky`), op basis van de sectie die het midden van het scherm kruist. De tokens gaan in 1100ms over. Zonder JS kleurt elke zone zichzelf.

| Token | Dag | Nacht | Gebruik |
|---|---|---|---|
| `--bg` | `#eeefeb` | `#151412` | achtergrond, ook de nav |
| `--fg` | `#121318` | `#eeefeb` | hoofdtekst |
| `--fg-2` | `#45484f` | `#b9bab3` | lopende tekst |
| `--muted` | `#5b5e65` | `#979890` | labels en meta |
| `--dim` | `#7d8086` | `#6b6c64` | gedimd, alleen tekst vanaf 24px |
| `--line` | `#c9cbc7` | `#2e2d2a` | lijnen |
| `--glow` | `--accent` | `--lamp` | "aan"-iconen; tekst alleen 's nachts |
| `--focus` | `#121318` | `--lamp` | focusring |

Vaste kleuren:
- `--lamp` `#ff9e5e` en `--lamp-core` `#fff3e9`: gloeidraad, lampjes en het licht op de mail-knop (een warm donkere pil `#1c1814` met `--fg` als tekst). Hetzelfde oranje als overdag, maar dan als licht.
- `--accent` `#c04a00`: het enige oranje, voor "product designer" en het accent overdag. 4,31:1 op de dagachtergrond, dus alleen voor iconen en tekst vanaf 24px.
- Glyph Swell: `#eeefeb`, `#a3a6a3`, `#da9576` (lichtere tint van hetzelfde oranje, kleurtoon vrijwel gelijk).
- Case-vlakken: vier rustige grijzen met net wat variatie: `#dde2e3`, `#e1e2dc`, `#dfe1e0`, `#e2e2df`.

## 3. Typografie
Eén familie: **Mona Sans** (variabel). De breedte-as vervangt een tweede font. Geist Mono wordt alleen geladen voor de tekens in Glyph Swell.

| Rol | Grootte | Gewicht | Overig |
|---|---|---|---|
| Hero-zin | `clamp(2rem, 5vw, 5.25rem)` | 540 | breedte 104%, regel 1.02, spatiëring −0.035em |
| Afsluiter | `clamp(2.5rem, 6.6vw, 6.75rem)` | 560 | regel 0.96, −0.04em |
| Sectiekop | `clamp(2rem, 3.8vw, 3.5rem)` | 560 | regel 1, −0.035em |
| Skills-kop | `clamp(1.5rem, 2.4vw, 2.25rem)` | 560 | bewust rustiger, de kaarten dragen de sectie |
| Moment-titel | `clamp(1.75rem, 3vw, 2.75rem)` | 560 | −0.035em |
| Fase (tijdlijn) | `clamp(1.125rem, 1.7vw, 1.5rem)` | 500 | breedte 112%, `--glow` zodra het licht er is |
| Skill-titel | `clamp(1.5rem, 2.1vw, 2rem)` | 540 | −0.03em |
| Case-titel | `clamp(1.25rem, 1.75vw, 1.6875rem)` | 540 | −0.02em |
| Begroeting | `clamp(1.125rem, 1.6vw, 1.5rem)` | 520 | foto staat op de basislijn |
| Body | 1rem | 430 | regel 1.5 |
| Label | 0.75rem | 600 | breedte 125%, hoofdletters, +0.06em, tabulaire cijfers |

## 4. Vorm
- Beeldvlakken en kaarten: rechte hoeken, 1px lijnen. Skills-kaarten delen gestippelde randen.
- Pil-vorm alleen voor bediening: Menu en Contact me onderaan.
- Iconen: eigen SVG, 24px-raster, lijndikte 1.25, ronde hoeken.
- Geen schaduwen als decoratie. Gloed is alleen voor echt licht: draad, lampjes, lamp.

## 5. Beweging
- Easing: `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)`; `--ease-in-out` `cubic-bezier(0.77, 0, 0.175, 1)`.
- Hover: links veranderen niet van kleur; er schuift een lijn in (320ms). Hover-effecten alleen op apparaten met een fijne aanwijzer.
- Skills: elke kaart blijft even in het licht staan; de rij beweegt licht vertraagd mee. Alleen de kaart in het licht toont zijn zin; die faden in en uit.
- Tool-rij: sleepbaar in beide richtingen. De gepakte tegel komt iets naar voren, de buren wijken, en de rij helt mee met de snelheid; na loslaten glijdt hij uit naar zijn eigen tempo.
- Tijdlijn: de draad volgt het scrollen tot 62% van de schermhoogte; lampjes gaan aan met een korte flikkering. Alleen het moment dat het licht net bereikt heeft toont zijn verhaal (fade); de andere houden hun titel. Links staat de fase van elk moment (geen jaartallen). Op desktop rijdt één fase-label mee met de punt van het licht en wisselt naar de nieuwe fase zodra het volgende lampje aangaat: de oude is meteen weg, de nieuwe flikkert in (zelfde glyph-effect als de koppen, iets sneller); op mobiel, met reduced motion en zonder JS staat de fase vast bij elk moment.
- Mail-knop: zodra de lamp aan is, loopt er licht rond over de rand (3s per rondje), met stippen en een draaiende gloed erachter. Bij hover en focus wordt het licht breder en gloeit de knop van onderen. Naar de Shiny button van 21st.dev, in de kleuren van de lamp. Met reduced motion staat het licht stil bovenaan.
- Naam: na 20% van de hero flikkert de begroeting weg in de tekens van Glyph Swell en flikkert de naam in de nav op dezelfde manier in, net als de koppen van Skills en de tijdlijn; omkeerbaar. Met reduced motion wisselt het zonder flikkering.
- Mobiel menu: schermvullend in het andere dagdeel (overdag donker, 's nachts licht), met grote links onder elkaar die kort na elkaar invallen. De twee streepjes van de knop draaien naar een kruisje en "Menu" wordt "Close"; de pagina erachter scrolt niet mee.
- Reduced motion: alles staat aan en stil. Zonder JS: alles leesbaar en aan.
- Animaties pauzeren buiten beeld.

## 6. Nog niet beslist
- Eén beeldtaal voor hero (tekens) en case-vlakken (raamlicht).
- De rol van oranje naast amber.
- Echte case-beelden.
