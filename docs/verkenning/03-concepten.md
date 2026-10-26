# Verkenning stap 3 – Drie concepten (26 okt 2026)

Opdracht van Djamiel na de critique: één concept mag dicht bij versie J blijven, twee moeten er ver vanaf staan; het deeltjesveld zit in één concept; elk concept toont het werk op een eigen manier; de kleine fixes uit de critique gaan mee in de nieuwe richting.

## Hoe deze drie gekozen zijn (Impeccable)
1. **Productwaarheid vastgelegd** in `PRODUCT.md` (alleen uit CLAUDE.md, niets privé).
2. **Zeven richtingen uit jouw wereld**, gerangschikt op hoe sterk ze bij recruiter en verhaal passen:
   1. onderzoeksmuur;
   2. montagehandleiding;
   3. technische tekening;
   4. releaselog;
   5. productdoos met specs;
   6. expositie;
   7. veldnotitieboek.
3. **Impeccable's worp** wees nr. 6 aan (expositie) als richting om tegen vast te houden. Zo wint niet automatisch de eerste ingeving.
4. **Zes "uitdagers" uit de catalogus van Impeccable** zijn tegen die richting afgewogen, op twee assen: herkent de doelgroep zich erin, en is het product (jij en je werk) helder?

| Uitdager | Oordeel | Wat we ervan meenemen |
|---|---|---|
| Wim Crouwel-rasterspecimen | **wint** (beide assen) | Wordt concept A: letters die cel voor cel op een zichtbaar raster ontstaan |
| Split-flap vertrekbord | **gelijkwaardig** (helderheid) | Wordt concept C |
| Herkomstlint (museum) | afgewezen | **Zeker vs. aangenomen:** wat bewezen is (live link, gemeten) staat vol; placeholders en claims staan in omlijning. Past bij de `[ ]`-regel en "AI met controle" |
| Windows Metro-tegels | afgewezen | **Geen knopkaders:** de tekst zelf is de interface |
| Ebru (marmerpapier) | afgewezen | **Sporen blijven:** wat de bezoeker al bekeken heeft, blijft zichtbaar gemarkeerd |
| Slapende stad | afgewezen | **Eigen tint per case** binnen één systeem |

De expositie (de aangewezen richting) verloor op beide assen van het Crouwel-raster: ze toont vooral af werk en leest als kunstopleiding, niet als productbedrijf. Mijn eigen nummer 1, de onderzoeksmuur, wordt concept B.

Impeccable wil normaal ook een keuzepagina met gegenereerde beelden. Die stap is vervangen door deze tekst en een wireframe-schets, omdat jij per stap in de chat beslist. Beeldgeneratie is hier niet beschikbaar, dus bouwen gebeurt rechtstreeks in code.

---

## A · Bouwraster (dichtbij versie J)
**Idee in één zin:** een ontwerper die in systemen denkt; alles op de pagina, tot je naam toe, wordt zichtbaar op één raster gebouwd.

- **Wereld:** het papier, de lijnen en de mono-labels van J blijven, maar de herkomst verandert. Niet Herons architectuurtekening, maar het Nederlandse modernistische raster (Crouwel) en het raster van een designsysteem. Dat is jouw vak, en het dicht meteen je Figma-/designsysteem-gat in het verhaal.
- **Werk tonen:** een **index van vier cellen** naast de zin, alle vier al in het eerste scherm.
  - Op desktop groeit een cel bij hover of focus; de cursor wordt "View" en er verschijnt een preview.
  - Op mobiel staan de cellen onder de zin, waarvan minstens de eerste volledig in beeld.
- **Signatuurmoment:** het deeltjesveld (jouw idee) valt in ±2 s in de cellen van het raster en **bouwt je naam** in monumentale rasterletters. Daarna blijft het staan.
  - De cursor duwt de deeltjes nog even uit hun cel, zoals nu.
  - De vijf stappen (Problem → Live) worden de rijlabels van het raster in plaats van een loop van 31 s.
- **Navigatie:** naam links, Work · About · Resume ↗ · Contact als tekst in de bovenste rasterrij, zonder knopkaders (meegenomen van Metro).
- **Typografie en kleur:**
  - Display = de rasterletters zelf, met een echte `h1` eronder voor schermlezers.
  - Tekst in Geist; Geist Mono alleen nog voor labels (de detector vond 62% mono te veel).
  - Paper, ink en één accent. De herkomst van de kleuren verschuift: niet meer Herons gemeten palet maar een eigen afleiding (bijvoorbeeld rasterblauw of signaaloranje), te bepalen bij het bouwen.
- **Wat de critique oplost:** naam + rol in de kop, werk boven de vouw, hover-contrast (tekst blijft ink), een animatie van 2 s die stopt en iets herkenbaars bouwt, en één betekenis voor `[01]`.
- **AI als bewijs:** de making-of-cel toont een stukje beslislog ("AI stelde voor / ik koos").
- **Risico's voor de recruiter:**
  - Blijft het dichtst bij J en bij veel "Swiss grid"-portfolio's, dus het kan lezen als typografie-oefening in plaats van productwerk.
  - Rasterletters zijn minder snel leesbaar dan gewone tekst; daarom staat de rol er altijd in gewone tekst onder.
  - Deeltjes in letters vragen zorg voor snelheid op mobiel.

## B · Onderzoeksmuur (ver weg)
**Idee in één zin:** je homepage is de muur van een designsprint: per case hangt het bewijs (onderzoek, keuzes, schermen) aan de muur, en bij scrollen klapt dat bewijs in tot het eindproduct.

- **Wereld:** een matte whiteboard-wand (koel wit, geen crème) met geprinte schermen, plaknotities, een polaroid en rood touw. Annotaties in je **eigen handschrift** (gescand), net zoals Belle haar eigen doodles gebruikt.
  - Elke case heeft zijn eigen notitiekleur (meegenomen van de slapende stad).
  - AI-notities krijgen een aparte kleur met "AI stelde voor → ik besloot".
- **Werk tonen:**
  - Eerste scherm: in het midden een vastgeprikt vel met je zin, eromheen vier clusters (één per case), elk met een groot scherm-beeld + drie notities (probleem, inzicht, keuze).
  - Klik opent de case.
  - Op mobiel wordt het een stapel vastgeprikte kaarten: eerst het vel, dan case 01.
- **Signatuurmoment:** scroll je naar een cluster, dan schuiven de notities en schetsen in elkaar en wordt het het **live product** (onderzoek → product, Herons tekening → render, maar dan met jouw eigen materiaal).
  - Bij reduced motion staat de eindtoestand er meteen, met de notities ernaast.
- **Navigatie:** naam op een strook labeltape linksboven; links rechtsboven als handgeschreven labels die gewone, leesbare links blijven.
- **Typografie en kleur:**
  - Een stevige grotesk met karakter voor geprinte koppen (bijvoorbeeld Bricolage Grotesque), je handschrift voor annotaties.
  - Whiteboardwit, zwarte stift, notitiegeel als hoofdaccent, rood alleen voor touw.
- **AI als bewijs:** het sterkste van de drie. De aparte AI-notities laten precies zien wat je afkeurde, wat werkgevers volgens je onderzoek willen zien.
- **Risico's voor de recruiter:**
  - Een collage kan rommelig worden en scannen vertragen; streng beperken tot drie notities per case.
  - Valt of staat met echt onderzoeksmateriaal (foto's, schetsen, notities), en dat bestaat deels nog niet.
  - "Plaknotitie-portfolio" is een bekend beeld (familiair); de kracht moet uit jouw echte materiaal komen.
  - Veel beelden, dus snelheid bewaken.

## C · Vertrekbord (ver weg)
**Idee in één zin:** je werk als een vertrekbord op het station: elke case is een vertrek met een eerlijke status, en het bord klappert bij binnenkomst in één tel in plaats.

- **Wereld:** matte zwarte flaps met witte letters in een stalen kader, één amber voor "in progress". Iedereen in Nederland kent dit bord; het staat voor "dingen die vertrekken", oftewel uitbrengen (shippen).
- **Werk tonen:** een **lijst van vier rijen**, de snelste vorm om te scannen (Mike).
  - Kolommen: jaar, case (uitkomstzin), type, status: **LIVE** / **IN ONTWIKKELING** / **BINNENKORT**. Dat is eerlijk: het wimperproject bestaat nog niet en de stagecase wacht op toestemming.
  - Hover of focus op een rij: de flaps klappen naar de uitkomstzin en rechts schuift een preview in.
  - Bekeken rijen krijgen "departed" (meegenomen van ebru).
  - Op mobiel valt het bord terug op twee kolommen (case + status).
- **Signatuurmoment:** bij laden klapperen alle letters in maximaal ±1 s op hun plek. Het bord is daarna gewoon een echte, voorleesbare tabel.
  - Bij reduced motion staat alles er meteen.
  - Bovenin een klok met de tijd in Tilburg en een kleine statusregel met de echte Lighthouse-score van de site (Carter, maar dan als bewijs van kwaliteit).
- **Navigatie:** de kopregel van het bord: naam, rol en daarachter Work · About · Resume · Contact als flap-cellen (wel echte links).
- **Typografie en kleur:** een smalle displayletter in hoofdletters (bijvoorbeeld Big Shoulders Display), mono voor tijden en codes. Donker, wit, één amber.
- **AI als bewijs:** de making-of is gewoon een vertrek ("This site, made with AI · LIVE"), met een changelog-rij eronder.
- **Risico's voor de recruiter:**
  - De metafoor (treinen) heeft niets met productdesign te maken en kan als gimmick lezen.
  - Hoofdletters in een smalle letter lezen slecht in langere zinnen, dus uitkomstzinnen kort houden.
  - Donker thema; letteranimaties moeten voor schermlezers een normale tabel blijven.
  - "BINNENKORT" bij de stagecase laat zien dat er iets nog niet af is: eerlijk, maar het moet goed voelen.

---

## Snel vergeleken
| | A Bouwraster | B Onderzoeksmuur | C Vertrekbord |
|---|---|---|---|
| Afstand tot J | dichtbij | ver | ver |
| Werk tonen | index van 4 cellen | muur met 4 clusters | lijst van 4 rijen |
| Werk in eerste scherm (desktop) | ja, alle vier | ja, deels | ja, alle vier |
| Signatuur | deeltjes bouwen je naam op het raster | notities klappen in tot product | bord klappert in plaats |
| 5-secondentest (verwacht) | sterk (naam + rol + werk) | goed (zin in het midden) | sterk (naam + lijst) |
| Grootste risico | te veilig, typo-oefening | rommel + materiaal ontbreekt | gimmick, metafoor past niet |
| Deeltjesveld | ja | nee | nee |
