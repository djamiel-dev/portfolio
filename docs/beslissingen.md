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

### Stap 5 – Kwaliteit
- **AI deed:** scripts voor axe + Lighthouse (`npm run audit`) en een toetsenbordtest (`npm run keyboard`). Eerste meting: axe 1 fout, Lighthouse mobiel Performance 88 / Accessibility 96 / Best Practices 96.
- **Opgelost:** label "[05] AI workflows" (donker op oranje, 3,9:1) → donker label met oranje rand en oranje vierkantje; ontbrekend favicon (404 in console); deeltjesveld start pas als de browser idle is (blokkeertijd mobiel 420 ms → binnen norm); footerlinks naar 44px. Daarna overal 100 en 0 axe-fouten.
- **Open, voor jou:** tabvolgorde kaarten (01, 03, 02, 04) en hover-contrast. Zie `docs/definition-of-done.md`.
- **Tijd:** ca. 20 min.

### Overgang naar verkenning (26 okt)
- **Besloten:** versie J is een vertrekpunt, geen eindbeeld. Volgende fase is verkenning richting award-niveau design, niet finetunen. Aanpak: eerst referenties verzamelen en meten, dan drie echt verschillende concepten als losse routes op een aparte branch, toetsen aan het primaire gebruik (recruiter via sollicitatiemail), dan kiezen.
- **Skills:** Impeccable en Emil Kowalski geïnstalleerd in het project. De installer zette Emil eerst in een map voor andere tools; handmatig naar `.claude/skills/` verplaatst.

## Verkenning (vanaf 26 okt)

### Stap 1 – Referenties analyseren
- **AI deed:** de zeven referenties (Belle Duffner, Aziz Khaldi, Heron, Shopify Editions, Kigo, Carter Ogunsola, Mike Wilcock) echt in de browser doorlopen en gemeten: fonts, kleuren, techniek, laad-, scroll-, hover- en paginawisselgedrag. Gemene deler: één idee stuurt de vormtaal, en "iets wordt gemaakt terwijl je kijkt" (5 van 7). Grootste les: Heron's stijl komt uit het domein van de klant; versie J nam het uiterlijk over, niet dat principe. Ontdekt: Aziz' 3D-object is een video; Belle en Mike tonen op mobiel na 3–5 s nog een (bijna) leeg eerste scherm. Volledige analyse: `docs/verkenning/01-referenties.md`.
- **Ik besliste:** akkoord met de analyse, zonder aanpassingen.
- **Tijd:** ca. 30 min.

### Stap 2 – Critique versie J (Impeccable)
- **AI deed:** critique met de Impeccable-skill: twee losse beoordelaars (ontwerpreview en automatische detector + browser) die elkaars werk niet zagen, daarna samengevoegd en kernclaims nagemeten in de code. Oordeel: uitwisselbaar; Heron-uiterlijk op Belle-skelet met Aziz-footer, alleen het deeltjesveld is eigen maar bouwt niets herkenbaars. Score 22/32 (acceptabel). Grootste punten: geleende beeldtaal, hero-animatie te traag en abstract (31,5 s per cyclus), geen werk boven de vouw, hover-contrast 3,4:1. Detector: 0 codefouten, 4 browsermeldingen (2 bewuste tokens, 2 echte tekstbreuken op mobiel). Volledig: `docs/verkenning/02-critique-versie-j.md`.
- **Ik besliste:** één concept mag dicht bij de huidige stijl blijven, twee moeten er ver vanaf staan; het deeltjesveld blijft in één concept (vergelijken); elk concept kiest een eigen manier om werk te tonen; de kleine fixes (hover-contrast, aria-current, regelafbrekingen) gaan mee in de nieuwe richting in plaats van apart op main.
- **Tijd:** ca. 15 min.

### Stap 3 – Drie concepten
- **AI deed:** productwaarheid vastgelegd in `PRODUCT.md` (alleen uit CLAUDE.md), zeven eigen richtingen gerangschikt en Impeccable's worp gedaan: zes "uitdagers" uit de catalogus afgewogen. Het Crouwel-raster won van de aangewezen richting (expositie), het vertrekbord was gelijkwaardig, vier andere zijn afgewezen maar leveren elk één regel (zeker vs. aangenomen, geen knopkaders, sporen blijven, eigen tint per case). Resultaat: A Bouwraster (dichtbij J, met deeltjesveld), B Onderzoeksmuur, C Vertrekbord, elk met een eigen manier om werk te tonen. Volledig: `docs/verkenning/03-concepten.md`.
- **Ik besliste:** akkoord met alle drie en met PRODUCT.md; alle drie bouwen als /explore/a, /b en /c.
- **Tijd:** ca. 25 min.

### Stap 4 – Drie concepten gebouwd
- **AI deed:** branch `explore` met `/explore` (overzicht) en `/explore/a`, `/b`, `/c`; gedeelde case-inhoud in `content/explore.ts` met eerlijke statussen (alleen case 01 is echt live). A: deeltjes vliegen in ±1,5 s in rastercellen en vormen de naam, alle vier de cases naast de zin. B: onderzoeksmuur waarin notities via CSS-scrollanimaties (zonder JavaScript) naar het product toe schuiven. C: vertrekbord dat bij binnenkomst klappert en daaronder een echte tabel blijft. Alle drie werken zonder JavaScript en bij reduced motion in hun eindtoestand.
- **Gevonden en opgelost tijdens het bouwen:** AI verzon eerst een AI-notitie voor de making-of die niet gebeurd was, vervangen door een echte uit dit logboek. A's animatie telde frames in plaats van tijd, waardoor hij op een trage telefoon of in een achtergrondtab bleef hangen; nu tijdgebaseerd. C's tegels braken op mobiel midden in een woord af; nu per woord.
- **Ik besliste:** [volgt na het bekijken]
- **Tijd:** ca. 50 min.

### Stap 5 – Toetsen
- **AI deed:** productiebuild getest met een nieuw script (`npm run explore-check`: screenshots na 1 en 5 s, eerste scherm meten, toetsenbord met reduced motion) en `npm run audit` per route, met J als nulmeting. Resultaat: A, B en C tonen alle vier de cases in het eerste scherm op desktop (J: geen), axe 0 overal, Lighthouse 97–100. Gevonden en opgelost: axe-fout in A (naam van caselinks), trage kop in B op mobiel (font preload), twee meetfouten in het eigen script. Volledig: `docs/verkenning/04-toetsing.md`.
- **Ik besliste:** [volgt na keuze in stap 6]
- **Tijd:** ca. 35 min.
