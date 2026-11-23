# DESIGN.md – Eén dag licht

Het designsysteem van de site (concept E). Beschrijft wat nu gebouwd is. De vaste tokens staan in `:root` in `app/globals.css`, de kleuren die per dagdeel wisselen in `.root` in `components/home/home.module.css`; `/design-system` toont ze live. Het vorige systeem (Heron) staat in de git-geschiedenis; alleen de lokale verkenningen gebruiken zijn variabelen nog.

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
- `--ground` `#dce2e3`: het ene grijs achter elk beeld en paneel, ook de homepagekaarten, About en de foto in de hero.
- `--ground-light` `#f8f8f6`: een lichte kaart of een licht vlak. Een laadkleur die exact bij een export hoort blijft staan, met een opmerking (`#f8f8f8` achter de schermen van case 01, `#f9f9f9` achter de hero van Stuurmen). De browserbalk `#f1f2f0` is een apparaatdetail.

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
| Titel (`--t-title`) | `clamp(1.25rem, 1.75vw, 1.6875rem)` | 540 | titel van een kaart, ronde of moment |
| Kleinere titel (`--t-subtitle`) | `clamp(1.125rem, 1.4vw, 1.3125rem)` | 540 | titel in een lijst of callout |
| Klein (`--t-small`) | 0.875rem | 430 | bijschriften en kleine lopende tekst; nav, knoppen en tool-tegels houden hun eigen maat |
| Begroeting | `clamp(1.125rem, 1.6vw, 1.5rem)` | 520 | foto staat op de basislijn |
| Body | 1rem | 430 | regel 1.5 |
| Label | 0.75rem | 600 | breedte 125%, hoofdletters, +0.06em, tabulaire cijfers; één klasse, `.label` in `app/about/about.module.css` |

Koppen zijn 560, titels 540. Bewuste uitzonderingen: de grote quotes (Collaborative Strength), de getallen (stat-tegels, 70%), de stappen van de zeef op de AI-pagina, de labels in grafieken en de viewer.

## 4. Vorm en diepte
- **Hoeken.** 0 voor alles wat "de site" is: grijze vlakken, kaarten, foto's, datamarkeringen (weken, balken, legenda's, de meter in 02). `--r-screen` (4px) alleen voor een scherm van een product (screenshot, export, opname). `--r-browser` (10px) voor het browserframe; de telefoon en tool-iconen houden hun eigen apparaatrondingen, net als het bord en de kaartjes in Moraira (3px). Pil alleen voor bediening (Menu, Contact me, labels bij de cursor), cirkel voor stippen.
- **Schaduwen.** Geen schaduwen als decoratie. `--shadow-device` alleen voor fysieke dingen: telefoon, browserframe, bord en kaartjes op tafel. Platte screenshots krijgen geen schaduw. Twee uitzonderingen, met een opmerking in de code: de viewer (een overlay in het donker) en de sleepknop van Compare (bediening).
- **Gloed** is alleen voor echt licht: draad, lampjes, lamp, aan-stippen (`--halo`, 5px ring op 18% van `--glow`).
- Skills-kaarten delen gestippelde randen. Iconen: eigen SVG, 24px-raster, lijndikte 1.25, ronde hoeken.

## 5. Beweging
- Easing: `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)`; `--ease-in-out` `cubic-bezier(0.77, 0, 0.175, 1)`. Kleurwissels mogen gewoon `ease`.
- Tokens voor wat overal hetzelfde gebaar is: indrukken `scale(var(--press))` (0.97) in `--dur-press` (160ms); een ingetekende lijn in `--dur-line` (320ms); een beeld dat bij hover iets donkerder wordt en naar voren leunt met `--zoom` (1.03) in `--dur-media` (700ms), met "View case", "View website", "View designs" of "View screens" bij de cursor (CaseCursor).
- Hover: links veranderen niet van kleur; er schuift een lijn in. Hover-effecten alleen op apparaten met een fijne aanwijzer.
- Skills: elke kaart blijft even in het licht staan; de rij beweegt licht vertraagd mee. Alleen de kaart in het licht toont zijn zin; die faden in en uit.
- Tool-rij: sleepbaar in beide richtingen. De gepakte tegel komt iets naar voren, de buren wijken, en de rij helt mee met de snelheid; na loslaten glijdt hij uit naar zijn eigen tempo.
- Tijdlijn: de draad volgt het scrollen tot 62% van de schermhoogte; lampjes gaan aan met een korte flikkering. Alleen het moment dat het licht net bereikt heeft toont zijn verhaal (fade); de andere houden hun titel. Links staat de fase van elk moment (geen jaartallen). Op desktop rijdt één fase-label mee met de punt van het licht en wisselt naar de nieuwe fase zodra het volgende lampje aangaat: de oude is meteen weg, de nieuwe flikkert in (zelfde glyph-effect als de koppen, iets sneller); op mobiel, met reduced motion en zonder JS staat de fase vast bij elk moment.
- Mail-knop: zodra de lamp aan is, loopt er licht rond over de rand (3s per rondje), met stippen en een draaiende gloed erachter. Bij hover en focus wordt het licht breder en gloeit de knop van onderen. Naar de Shiny button van 21st.dev, in de kleuren van de lamp. Met reduced motion staat het licht stil bovenaan.
- Naam: na 20% van de hero flikkert de begroeting weg in de tekens van Glyph Swell en flikkert de naam in de nav op dezelfde manier in, net als de koppen van Skills en de tijdlijn; omkeerbaar. Met reduced motion wisselt het zonder flikkering.
- Mobiel menu: schermvullend in het andere dagdeel (overdag donker, 's nachts licht), met grote links onder elkaar die kort na elkaar invallen. De twee streepjes van de knop draaien naar een kruisje en "Menu" wordt "Close"; de pagina erachter scrolt niet mee.
- Cases: routes en lijnen tekenen in tijdens het scrollen (CSS scroll-timelines; in browsers zonder `animation-timeline`, zoals Firefox, staan ze meteen in de eindstand), stippen gaan aan met de flikkering van de lampjes, en de lamp bij het resultaat ontsteekt zodra hij in beeld komt.
- Reduced motion: alles staat aan en stil. Zonder JS: alles leesbaar en aan.
- Animaties pauzeren buiten beeld.

## 6. Schermtaal van de cases
Elke case toont zijn product op zijn eigen manier, en dat blijft zo (beslissing 23 nov): case 01 drie telefoons, 02 een opname van de live site, 03 de galerij in een breed venster, 04 de hero met video. De next-case beelden blijven zoals ze zijn (twee plat, twee als apparaat). Gelijk zijn wel de hoeken, schaduwen en het gedrag: de hero's van 01, 02 en 04 en elke next-case reageren op hover zoals een homepagekaart, en de hero's van 01 en 04 openen het ontwerp fullscreen.

## 7. Gedeelde onderdelen
- `components/site/`: `SiteNav` (met skip-link en `aria-current`; op de cases is dat Projects) en `SiteFooter`.
- `components/case/`: `case.module.css` (de case-basis), `Lamp`, `NextCase`, `Browser`, `ScrollStage`, `Compare`, `Clip`, `StatTile`, `DesignViewer`.
- `app/about/about.module.css` is de paginabasis van About, AI, de cases en de 404 (pagina, secties, koppen, lead, label, de korte versie, tekstlink).
- Een case importeert de case-basis, de paginabasis en zijn eigen stylesheet, nooit die van een andere case.

## 8. Nog niet beslist
- De rol van oranje naast amber.
- Echte case-beelden.
- De flowchart van Stuurmen in het palet van de site (er ligt een voorbeeld, zie `docs/beslissingen.md`).
