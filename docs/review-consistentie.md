# Review: consistentie van het design (23 nov 2026)

Kritische review van alle live pagina's (`/`, `/about`, `/ai`, de vier cases) op vorm, kleur, type, beweging en interactie, met mijn beslissingen per punt. Onderaan staan de werkpakketten met een kant-en-klare prompt per pakket, voor een nieuwe chat.

**Status:** pakketten 1a–8 uitgevoerd (23 nov, één sessie, stap 39–48 in `docs/beslissingen.md`); van 9 ligt alleen een voorbeeld klaar. Niet gecommit. Werk de status per pakket hier bij als het klaar is.

## Wat goed is en niet aangeraakt hoeft te worden
Dag/nacht-tokens, Mona Sans met dezelfde koppen, labels en lead op elke pagina, de glyph-scramble op elke h2, "licht = aan", warme resultaatkaarten in de nacht (02–04), de ingetekende lijn bij hover.

## Bevindingen en beslissingen

| # | Onderwerp | Bevinding (kort) | Beslissing |
|---|---|---|---|
| 1 | Grijzen | 4 grijzen op de homepagekaarten, `#dce2e3` ~30× hardcoded op de cases, `#dfe1e0` op About, `#d6dad9` achter de foto in de hero; bijna-wit in vier versies (`#f8f8f8`, `#f8f8f5`, `#f9f9f9`, `#f1f2f0`) | **Eens.** Eén token `--ground: #dce2e3` overal, ook homepagekaarten 02–04 en About; één `--ground-light` |
| 2 | Hoeken | 0, 1, 2, 3, 4, 6 en 10px door elkaar; grijze vlakken recht in 01/02 maar 4px in Moraira en Stuurmen | **Eens.** Regel: 0 voor alles wat "de site" is (vlakken, kaarten, foto's, datamarkeringen); `--r-screen: 4px` alleen voor een scherm van een product; browser en telefoon houden hun apparaatrondingen; pil alleen voor bediening; cirkel voor stippen |
| 3 | Schermtaal | Vier manieren om een product te tonen; next-case links verschillen (twee plat, twee 3D) | **Hero's en next-case blijven zoals ze zijn.** Case 01 houdt de telefoon-mockups, 02–04 hun huidige hero. Next-case niet aanpassen. Wel: schaduwen en hoeken consistent maken (zie 2 en 4) |
| 4 | Schaduwen | Zes verschillende schaduwen voor apparaten en schermen, terwijl DESIGN.md "geen schaduwen" zegt | **Eens.** `--shadow-device` voor fysieke dingen (telefoon, browser, bord en kaartjes op tafel); platte screenshots geen schaduw; uitzonderingen alleen voor de viewer (overlay) en de sleepknop van Compare (bediening). In DESIGN.md vastleggen |
| 5 | Typografie | ~8 varianten voor kleine titels (vooral in `mo.module.css`, `st.module.css`), 540/560 door elkaar, kleine tekst 0.8125/0.875/0.9375rem; `.label` en `.eyebrow` identiek | **Eens, versimpelen.** `--t-title` en `--t-subtitle`, 540 voor titels en 560 voor koppen, één kleine tekstmaat, één label-klasse |
| 6 | Globals | Heron-tokens in `app/globals.css` (oranje `a:hover`, oranje focus, `--paper`) lekken waar `.root` ontbreekt; nachttokens dubbel in `case.module.css`; geen eigen 404 | **Doen**, mits voor/na getest zodat er niets breekt. **404 in E-stijl, heel simpel** |
| 7 | Beweging | Zoom 700ms behalve next-case (250ms); zoom 1.05 vs 1.03; indrukken 0.97/0.94/0.96; halo 4px/18%, 5px/20%, 5px/18%; AI-pagina deels zonder easing; 03 en 04 gebruiken CSS scroll-timelines (in Firefox springen die naar de eindstand) | **Eens.** Motion-tokens |
| 8 | Gemiste kansen | 8.1 case 01 is de stilste pagina (Compare-slider, route door de rondes, pins één voor één). 8.2 telefoonscreens in de hero van 01 zijn niet te openen (DesignViewer zoals Moraira). 8.3 de lamp bij het resultaat staat stil op de cases. 8.4 next-case hover wijkt af van de homepagekaart. 8.5 "Projects" krijgt geen `aria-current` op de cases. 8.6 geen uitnodiging/mailknop op de cases | **Eens met 8.1–8.5.** **8.6: geen contact in de cases is prima**, niet doen. Let op bij 8.2 en 8.4: het beeld zelf blijft gelijk (zie 3), alleen het gedrag wordt toegevoegd |
| 9 | Structuur | Nav en footer 7× gekopieerd; Moraira importeert 7 stylesheets; de case-basis staat in de map van case 01 | **Eens.** Gedeelde componenten en een case-basisstylesheet (nieuwe bestanden: akkoord gegeven) |
| 10 | Klein | Hero van 03 op wit vlak van 4px; flowchart in 03 in felle originele kleuren; mailknop op `/design-system` nog oranje | Hero van 03 **blijft** (zie 3). Mailknop meenemen in pakket 8. Flowchart: optioneel pakket 9, alleen na een voorbeeld |

## Afgesproken regels (bron voor alle pakketten)

Tokens komen in `:root` in `app/globals.css` (de dag/nacht-tokens blijven via `.root` en `data-sky` wisselen).

| Token | Waarde | Gebruik |
|---|---|---|
| `--ground` | `#dce2e3` | elk grijs vlak achter beelden en panelen |
| `--ground-light` | één bijna-wit (kies uit de bestaande, bijv. `#f8f8f6`) | lichte kaart of vlak; een laadkleur die exact bij een export hoort mag blijven, met een opmerking |
| `--r-screen` | `4px` | scherm van een product (screenshot, export) |
| `--r-browser` | `10px` | het browserframe |
| `--shadow-device` | `0 1px 2px rgb(18 19 24 / 0.14), 0 24px 48px -16px rgb(18 19 24 / 0.32)` | telefoon, browser, fysieke objecten |
| `--t-title` | `clamp(1.25rem, 1.75vw, 1.6875rem)`, gewicht 540 | titel van kaart, ronde, moment |
| `--t-subtitle` | `clamp(1.125rem, 1.4vw, 1.3125rem)`, gewicht 540 | kleinere titel in lijsten en callouts |
| `--t-small` | `0.875rem` | kleine lopende tekst (nav en knoppen houden hun eigen maat) |
| `--dur-press` | `160ms` | indrukken |
| `--dur-line` | `320ms` | ingetekende lijn |
| `--dur-media` | `700ms` | beeld zoomt bij hover |
| `--zoom` | `1.03` | hover-zoom van beelden (homepagekaart: visueel checken of 1.03 genoeg is) |
| `--press` | `0.97` | schaal bij indrukken |
| `--halo` | `0 0 0 5px color-mix(in srgb, var(--glow) 18%, transparent)` | ring om een aan-stip |

Easing blijft `--ease-out` en `--ease-in-out` (DESIGN.md §5).

## Testprotocol (voor elk pakket)
1. **Voor:** start de dev-server (preview "dev" uit `.claude/launch.json`, poort 3001). Maak in de ingebouwde browser screenshots van alle routes die het pakket raakt, op 1440×900 en 375×812, en scroll de hele pagina door. Bewaar ze in de scratchpad van de chat, niet in de repo.
2. **Na:** dezelfde screenshots, naast elkaar vergelijken. Alleen de bedoelde verschillen mogen zichtbaar zijn. Geen consolefouten, geen horizontale scroll op 375px.
3. `npx tsc --noEmit`.
4. Bij pakket 1a, 1b en 8 ook: `npm run build`, `npx next start -p 3100` en dan `SITE_URL=http://localhost:3100 npm run audit` en `npm run keyboard` (de canvascheck aan het eind hoort bij versie J, negeren).
5. Raakt het pakket beweging: ook reduced motion nabootsen (beweging staat stil, alles leesbaar).
6. Meld eerlijk wat niet getest is.
7. Log het pakket als stap in `docs/beslissingen.md` (wat AI voorstelde, wat ik besliste, tijd `[invullen]`). Niet committen.

## Werkpakketten

Volgorde: **1a → 1b → 2 → 3 → 4 → 5 → 7 → 8**, na elkaar, omdat ze dezelfde CSS-bestanden raken. **6** (case 01) kan na 1b tegelijk met 2–5 in een eigen chat, mits die chat alleen de bestanden van case 01 en eigen nieuwe bestanden aanraakt. **9** is optioneel.

| Pakket | Onderwerp | Hangt af van | Status |
|---|---|---|---|
| 1a | Tokens naar globals, Heron eruit, 404 | – | klaar |
| 1b | Gedeelde componenten en case-basis | 1a | klaar |
| 2 | Grijzen | 1b | klaar |
| 3 | Hoeken en schaduwen | 2 | klaar |
| 4 | Typeschaal | 3 | klaar |
| 5 | Motion-tokens | 4 | klaar |
| 6 | Case 01: interacties | 1b | klaar |
| 7 | Lamp, next-case hover | 1b (na 5 voor de tokens) | klaar |
| 8 | DESIGN.md, CLAUDE.md, eindmeting | alles | klaar |
| 9 | Flowchart Stuurmen (optioneel) | – | voorbeeld klaar (`docs/cases/flowchart-voorbeeld.html`), pagina niet aangepast |

---

### Prompt pakket 1a – Tokens, globals en 404
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissing 6, "Afgesproken regels", "Testprotocol").
Doe pakket 1a:
1. Zet alle tokens uit "Afgesproken regels" in :root in app/globals.css. Verplaats ook de vaste E-tokens die nu in .root van components/home/home.module.css staan en niet per dagdeel wisselen (--accent, --lamp, --lamp-core, --ease-out, --ease-in-out, --gutter) naar :root; laat de wisselende kleurtokens (@property en .root/data-sky) waar ze zijn.
2. Haal de Heron-regels die live pagina's raken uit globals.css: a:hover in --brand, :focus-visible in --brand, body-achtergrond en -gewicht, .mono als niets live het gebruikt. Controleer met grep wat app/explore en de oude J-componenten (lokaal, in .gitignore) nog gebruiken; laat variabelen die alleen daar nodig zijn staan en meld dat.
3. Verwijder de dubbele nachttokens in app/work/incentive-portal/case.module.css als de nachtzone zonder JS er identiek uitziet; vervang het vangnet var(--ease-out, ease-out) in mo.module.css door var(--ease-out).
4. Maak app/not-found.tsx in E-stijl, heel simpel: dag, dezelfde nav en footer als About, één kop ("Page not found") met Scramble, één zin, en een tekstlink terug naar de homepage. Geen nieuwe beelden of animaties.
Gebruik de nieuwe tokens in dit pakket nog nergens anders; dat doen de volgende pakketten.
Volg het testprotocol, met build, audit en keyboard. Test ook de 404 op desktop en 375px. Zet de status van 1a in de review op "klaar" en stop dan.
```

### Prompt pakket 1b – Gedeelde componenten en case-basis
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissing 9 en 8.5, "Testprotocol"). Pakket 1a is klaar.
Doe pakket 1b, zonder dat er visueel iets verandert:
1. components/site/SiteNav.tsx: de nav die nu in elke pagina gekopieerd staat (inclusief Menu en NavName waar die gebruikt worden), met een prop voor de huidige pagina. Op /work/* krijgt "Projects" aria-current="page" (8.5).
2. components/site/SiteFooter.tsx: de footer.
3. components/case/: Lamp.tsx (de lamp bij het resultaat), NextCase.tsx (het next-case blok, met de beelden en teksten die er nu staan), Browser.tsx (het browserframe dat nu als cs.browser in 02 en 04 staat), en case.module.css als case-basis: verplaats de gedeelde regels uit app/work/incentive-portal/case.module.css hierheen; case-01-specifieke regels blijven in de map van case 01.
4. Vervang de kopieën in alle pagina's (/, /about, /ai, de vier cases, de 404) en ruim de cross-imports op: een case importeert de case-basis en zijn eigen stylesheet, niet die van andere cases. Wat twee cases echt delen (ScrollStage, StatTile, Compare) mag via components/case/.
De next-case beelden en de hero's blijven precies zoals ze nu zijn.
Volg het testprotocol met build, audit en keyboard: de voor- en na-screenshots moeten gelijk zijn, behalve de lijn onder "Projects" op de cases. Zet de status op "klaar" en stop.
```

### Prompt pakket 2 – Grijzen
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissing 1, "Afgesproken regels", "Testprotocol"). Pakketten 1a en 1b zijn klaar.
Doe pakket 2: vervang elk hardcoded grijs achter beelden en panelen door var(--ground), ook de homepagekaarten 02–04 (caseGrounds in components/home/content.ts), About (#dfe1e0) en de foto in de hero (#d6dad9). Vervang de bijna-witte vlakken door var(--ground-light), behalve een laadkleur die exact bij een export hoort (zoals de hero van Stuurmen, #f9f9f9): die blijft, met een korte opmerking. De browserbalk (#f1f2f0) is een apparaatdetail en mag blijven.
Werk /design-system bij zodat het één ground toont in plaats van vier.
Volg het testprotocol voor alle routes en /design-system. Zet de status op "klaar" en stop.
```

### Prompt pakket 3 – Hoeken en schaduwen
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissingen 2, 3 en 4, "Afgesproken regels", "Testprotocol"). Pakket 2 is klaar.
Doe pakket 3:
- Hoeken: 0 voor alles wat de site is (grijze vlakken, kaarten, foto's, datamarkeringen zoals .week, .bar en legenda in mo.module.css). Haal de 4px weg van de vlakken in Moraira (.plate, .scope > li, .outings, .aiRow li) en van het grijze vlak in Stuurmen (.crop, .toolScreen). var(--r-screen) voor een scherm van een product (nu 3, 4 of 6px: .desktop, .window, .clip video, .compareBox, .layoutShot, .table img, enz.). Foto's zijn geen scherm: .photo img in Stuurmen (de onderzoeksruimte) wordt 0. var(--r-browser) voor het browserframe. Pillen 999px, stippen 50%. .meter i (6px) en .sieveTile (3px): kies wat bij de regel past en noem het.
- Schaduwen: var(--shadow-device) voor de telefoon, het browserframe en fysieke objecten (bord en kaartjes in Moraira). Platte screenshots krijgen geen schaduw (.desktop in case 01, .toolScreen in Stuurmen). De viewer van Moraira en de sleepknop van Compare houden hun eigen schaduw, met een opmerking waarom.
- Hero's en next-case beelden blijven zoals ze zijn (beslissing 3); alleen een schaduw of hoek die daar afwijkt mag gelijkgetrokken worden.
Laat me voor/na zien van de plekken die zichtbaar veranderen. Volg het testprotocol. Zet de status op "klaar" en stop.
```

### Prompt pakket 4 – Typeschaal
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissing 5, "Afgesproken regels", "Testprotocol"). Pakket 3 is klaar.
Doe pakket 4: breng alle kleine titels (h3/h4 in kaarten, lijsten, callouts, routes) terug naar var(--t-title) of var(--t-subtitle), gewicht 540; koppen blijven 560. De afwijkers staan vooral in app/work/moraira/mo.module.css en app/work/stuurmen/st.module.css (bijv. clamp(1.0625rem, 1.3vw, 1.25rem), clamp(1.125rem, 1.5vw, 1.375rem)). Kleine lopende tekst wordt var(--t-small); nav, knoppen en tool-tegels houden hun eigen maat. Houd één label-klasse (.eyebrow of .label) en laat de andere verdwijnen.
Grote quotes (Collaborative Strength) en getallen (stat-tegels, 70%) zijn bewuste uitzonderingen: niet aanpassen, wel noemen.
Volg het testprotocol op 1440 en 375 (let op regelafbreking). Zet de status op "klaar" en stop.
```

### Prompt pakket 5 – Motion-tokens
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissing 7, "Afgesproken regels", "Testprotocol"). Pakket 4 is klaar.
Doe pakket 5: gebruik de motion-tokens overal waar hetzelfde gebaar zit: indrukken (var(--press), var(--dur-press)), ingetekende lijn (var(--dur-line)), beeld-zoom bij hover (var(--zoom), var(--dur-media)), de halo om aan-stippen (var(--halo)). Geef transities op de AI-pagina zonder easing var(--ease-out) of bewust ease voor kleurwissels, en noem welke.
Controleer de CSS scroll-timelines in Stuurmen en Moraira: in Firefox (geen animation-timeline) moet de eindstand netjes staan. Herschrijf ze niet naar JS; meld alleen wat er in Firefox mis zou gaan.
Volg het testprotocol, met reduced motion. Laat de hover-zoom van de homepagekaart voor/na zien (1.05 → 1.03) en laat mij kiezen. Zet de status op "klaar" en stop.
```

### Prompt pakket 6 – Case 01: interacties
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissingen 3 en 8.1–8.2, "Testprotocol"). Pakket 1b is klaar.
Werk alleen in app/work/incentive-portal/ en in nieuwe bestanden; pas gedeelde CSS niet aan zonder het eerst te vragen (andere chats werken daar mogelijk tegelijk aan). Doe het in deze volgorde en stop na elk punt om voor/na te laten zien:
1. "What the test changed": vervang de statische voor/na-crops door de Compare-slider uit Collaborative Strength (zelfde component, zelfde gedrag).
2. Process: de drie ontwerprondes krijgen een route die intekent tijdens het scrollen, zoals de route in Stuurmen en de flow in Moraira (zelfde lijn, stippen en halo).
3. Decision 1: de drie pins gaan één voor één aan met de bijbehorende callout, zoals [data-on] in Collaborative Strength en Stuurmen.
4. Hero: de drie MVP-screens zijn te openen in een fullscreen viewer zoals DesignViewer in Moraira, met de CaseCursor ("View screens"). De hero ziet er verder precies hetzelfde uit (beslissing 3).
Reduced motion: alles staat aan en stil. Volg het testprotocol, met audit en keyboard aan het eind. Zet de status op "klaar".
```

### Prompt pakket 7 – Lamp en next-case hover
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissingen 8.3 en 8.4, "Testprotocol"). Pakketten 1b en 5 zijn klaar.
Doe pakket 7:
1. De lamp bij het resultaat op de casepagina's (components/case/Lamp.tsx) ontsteekt zodra hij in beeld komt, met dezelfde flikkering als de lamp op de homepage (ignite, steps) en daarna de gloed. Met reduced motion en zonder JS staat hij meteen aan.
2. Next-case: dezelfde hover als de homepagekaart (beeld iets donkerder, zoom met var(--zoom) en var(--dur-media), "View case" bij de cursor via CaseCursor). Het beeld zelf verandert niet (beslissing 3). De lijn onder de titel blijft.
Volg het testprotocol op alle vier de cases, met reduced motion. Zet de status op "klaar" en stop.
```

### Prompt pakket 8 – Documentatie en eindmeting
```
Lees CLAUDE.md en docs/review-consistentie.md. Pakketten 1a t/m 7 zijn klaar (controleer de statussen).
Doe pakket 8:
1. Werk DESIGN.md bij: tokens (ground, radius, schaduw, type, motion), de vormregel, de schaduwregel met uitzonderingen, de schermtaal (hero's per case en next-case blijven zoals ze zijn), de gedeelde componenten in components/site en components/case. Haal "Nog niet beslist" weg wat nu beslist is.
2. Werk /design-system bij zodat het de nieuwe tokens toont, en geef de mailknop daar de huidige stijl.
3. Werk CLAUDE.md bij: "Waar alles staat", "Stand van zaken" en de open punten die hiermee opgelost zijn (WindowLight.tsx mag weg als het nergens meer gebruikt wordt; vraag het eerst).
4. Eindmeting: build, audit (desktop en mobiel) en keyboard; screenshots van alle routes op 1440 en 375. Noteer de cijfers in docs/beslissingen.md.
Zet de status op "klaar". Niet committen.
```

### Prompt pakket 9 – Flowchart Stuurmen (optioneel)
```
Lees CLAUDE.md en docs/review-consistentie.md (beslissing 10). De flowchart in /work/stuurmen (public/images/cases/stuurmen/flowchart-routes.webp, bron: het adviesdocument) heeft felle eigen kleuren. Maak één voorbeeld van een hertekende versie in het palet van de site (inkt, --line, --ground, oranje alleen voor de route van de tool), als HTML/SVG of in Figma, en laat het naast het origineel zien. Pas de pagina pas aan als ik het goedkeur.
```
