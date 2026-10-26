# Ontwerpbeslissingen – homepage

Logboek van de designfase in Claude Design (24–25 okt 2026). Bron voor de making-of-case: wat AI voorstelde, wat ik afkeurde of aanpaste, en waarom.

## Ronde 1 – vier stijlrichtingen, zelfde structuur (24 okt)
Vraag: vier stijlen met dezelfde hero-zin en drie casekaarten.
AI maakte: A Swiss Studio, B Build Terminal, C Editorial Serif, D Bold Colour.
**Mijn oordeel:** alle vier op hetzelfde wireframe; ze verschillen alleen in kleur en lettertype, niet in concept. Afgekeurd als eindrichting.

## Ronde 2 – vier visuele concepten met eigen journey (24 okt)
Vraag: echt verschillende concepten, innovatief maar duidelijk; kijk naar award-winning portfolio's.
AI deed onderzoek (o.a. Lynn Fisher, Bruno Simon, Rauno Freiberg) en maakte:
- E Process Lens – werk tonen per fase (problem → live).
- F Shared Canvas – homepage als ontwerptool, met AI-commentaar per case.
- G Time Budget – bezoeker kiest 30 sec / 2 min / 10 min.
- H Case Index – donkere redactionele index met uitklapbare rijen.
**Meegenomen:** het idee om het proces (problem → research → design → build → live) zichtbaar te maken, uit E.

## Ronde 3 – Heron-stijl × Belle Duffner-layout (25 okt)
Vraag: design system van heronaiapp.com, concept en layout van belleduffner.com.
- **Versie I (Blueprint):** afgekeurd. AI had Heron niet echt bekeken en de kleuren gegokt (wit/zwart/rood); te simpel en afwijkend van Belle's layout.
- **Versie J (Draftsman):** AI las Herons echte CSS-variabelen en achtergrond uit in de browser en liep Belle's homepage sectie voor sectie door. Tokens: paper #F5F5EE, ink #282828, lijnen #B3B3AF, brand #FA3600, Geist Mono; BT Grotesk vervangen door Inter Tight.
  - **Les:** eerst echte bron meten, dan ontwerpen. Gokken leverde een generiek resultaat op.

## Verfijning versie J (25 okt)
| Stap | Wat AI voorstelde | Wat ik besliste |
|---|---|---|
| Hero-tekst | "Hello! I'm Djamiel," + hero-zin (Belle-patroon) | "Hello…" weg |
| Lab-sectie | Lab als vertaling van Belle's "Craft" | Lab volledig weg (pagina + nav); Contact in de nav op die plek |
| Hero-visual | Isometrische lijntekeningen, oranje cirkel, grondlijn met objecten, rasterachtergrond | Te veel en raster lelijk → alles weg |
| Nieuwe hero-visual | – | Mijn idee: partikel-morph die meebeweegt met de cursor. AI bouwde 1600 deeltjes die morphen door Problem → Research → Design → Build → Live |
| Tekst | Kop + kleinere subregel | Te prominent → kleiner; daarna als één zin met kleurgebruik. AI liet het woord van de actieve stap oranje meekleuren met de animatie |
| Beschikbaarheid | "Open to new roles · Brabant" naast de knop | Weg |
| Maat/positie | – | Partikelveld kleiner, wolk ("Problem") te groot → kleiner; tekst en knop hoger, mogen licht overlappen |

## Open punten
- Mobiele nav breekt over twee regels → oplossen in de bouw.
- Echte beelden en uitkomstzinnen per case (placeholders tussen [ ]).
- Stagecase pas na toestemming.
- Maand van beschikbaarheid niet meer nodig op de homepage.

## Bouwfase (Claude Code, vanaf 26 okt)

### Stap 0 – Context lezen
- **AI deed:** alle bronnen gelezen, samenvatting en 10 open vragen gesteld. Zag dat git op het werkmailadres stond (zou in de publieke repo terechtkomen) en een contrastprobleem in de footer.
- **Ik besliste:** regels in CLAUDE.md zijn de huidige stand, geen eindtoestand; primair gebruik = link in sollicitatiemail; tijdelijke placeholdertekst mag (tussen `[ ]`); resume wordt een gehoste pdf; footer gaat op de schop.

### Stap 1 – Plan
- **AI stelde voor:** App Router + TypeScript, CSS Modules + tokens als CSS-variabelen (geen Tailwind), fonts via `next/font`, case-data los in `content/cases.ts`, deeltjesveld als client component. Mobiele nav: logo links + Work · About · Resume, Contact weg (zit al in de hero-knop).
- **Ik besliste:** akkoord, inclusief de mobiele nav.

### Stap 2 – Opzetten
- **AI deed:** Next.js 16 handmatig opgezet (create-next-app weigert een niet-lege map), tokens in `app/globals.css`, fonts zelf gehost via `next/font`, build en fonts in de browser gecontroleerd. Git met het GitHub-noreply-adres i.p.v. het werkmailadres; `private/` gecontroleerd buiten de repo.
- **Tijd:** ca. 10 min.

### Stap 3 – Homepage bouwen
- **AI deed:** referentie omgezet naar componenten (Nav, Hero, ParticleField, WorkGrid, CaseCard, Footer, Cross, Logo) met CSS Modules; case-inhoud en links als data in `content/`. Deeltjesveld: zelfde logica, maar stopt echt buiten beeld (i.p.v. leeg doorlopen), tijd loopt niet door tijdens pauze, ruimt alles op bij unmount.
- **Afwijkingen van de referentie, bewust:** compacte mobiele nav (één regel); hero op mobiel lager zodat de eerste kaart net zichtbaar is; werkkolommen als grid (referentie brak tussen 900–1000px al naar één kolom met verkeerde verspringing); op mobiel kaarten in volgorde 01–04 (referentie: 01, 03, 02, 04); skip-link voor toetsenbordgebruikers. Placeholder-uitkomstzinnen verzonnen, tussen `[ ]`.
- **Bug gevonden bij testen:** eerste animatieframe kon een negatieve tijd geven → vorm-index buiten bereik → leeg veld. Opgelost en opnieuw gecontroleerd.
- **Tijd:** ca. 20 min.

### Stap 4 – Vergelijken
- **AI deed:** Playwright-script (`npm run screenshots`) dat referentie en Next.js-versie op 1440×900 en 390×844 vastlegt (met reduced motion, zodat het deeltjesveld stilstaat) en de positie van zes kernelementen meet. Plus vergelijkingsbladen naast elkaar.
- **Gevonden:** Next.js-versie was 96px smaller (referentie telt de zijmarge op bij de maximale breedte, mijn CSS trok hem eraf). Opgelost; desktop wijkt nu ≤2px af. Bonus: in de referentie is het deeltjesveld bij reduced motion leeg (het ene stilstaande beeld wordt gewist bij resize); in de Next.js-versie staat de bol er wel.
- **Bewust anders:** mobiele nav één regel, compactere hero, kaartvolgorde 01–04 (zie stap 3).
- **Tijd:** ca. 15 min.
