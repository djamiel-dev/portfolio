# Portfolio Djamiel – projectinstructies

Lees dit bij elke sessie. Werk in het Nederlands met mij; de site zelf is Engels.

> **Status van dit document:** dit is de huidige stand van zaken, geen eindtoestand. Stel gerust ter discussie wat hieronder staat, maar wijzig stijl of opbouw op `main` pas na overleg.

## Huidige fase: section by section verfijnen (vanaf 1 nov 2026)
Concept E ("één dag licht") is gekozen en staat live als homepage. De verkenning is klaar. Nu volgt **per sectie de-sloppen en verfijnen**.

Werkwijze:
- kleine stappen, één onderwerp per stap (bijvoorbeeld alleen de hero, dan alleen het werkoverzicht);
- na elke stap stoppen en laten zien;
- geen nieuwe bestanden, scripts, dependencies of tools zonder het eerst te vragen;
- committen en pushen alleen op mijn verzoek.

### Stand van zaken (14 nov 2026) – lees dit eerst in een nieuwe chat
- **Live:** https://portfolio-kappa-gilt-e200sltsky.vercel.app/ (Vercel bouwt `main` bij elke push). De site staat bewust op `noindex`.
- **Branches:** `main` en `explore` wijzen naar dezelfde stand. Push naar beide met `git push origin explore && git push origin explore:main` en zet daarna lokaal `git branch -f main explore`. Niet uitchecken of mergen naar `main` zonder de lokale versies te controleren: een checkout kan genegeerde bestanden overschrijven of verwijderen.
- **Alleen lokaal, in `.gitignore`:** `app/explore/` (concepten A–D en overzicht), `components/explore/`, de oude homepage J (`components/Nav.*`, `Hero.*`, `ParticleField.tsx` enz.) en `app/page.module.css`. Ze staan nog wel in de git-geschiedenis.
- **Laatste stap (14 nov):** de casepagina Incentive portal (`/work/incentive-portal`, wireframe sinds 13 nov) heeft echte screens. Hero: drie MVP-screens (belonen → medewerkers kiezen → bevestiging); Decision 1: het beloningsscherm met pins op de drie onderdelen; de drie ontwerprondes: iteratie 3, het testprototype en iteratie 5. Alles in één iPhone-achtig CSS-frame (`Phone` in `visuals.tsx`). De bedrijfsnaam JobRewards staat op de casepagina.
- **Ook 13–14 nov (inhoud casepagina):** opbouw intro (kernzin + Problem / What I did / Result) → Problem → Process (drie rondes) → Decision 1 (snel en handmatig belonen) → Decision 2 (A/B-test: mijn aanname beloning-eerst, de expert reviews zeiden "test het"; grafiek per tester 4,4 vs 3,7, 5 van 7 kozen beloning-eerst, beide flows hadden hun moment, dus beloning-eerst is de hoofdroute en belonen kan ook vanuit de medewerkerslijst) → Building it (afscherming per teamleider, rollen en rechten, afdelingen alleen als de data ze heeft, eerst nepdata, API-aanroepen via de server) → AI (projectspec, één component per prompt) → Result in de nacht. Wireframe-commit `0a3da4a` staat live; alles daarna is nog niet gecommit.
- **Daarvoor (6 nov):** verhaalsectie (tijdlijn en afsluiter) ingevuld; alle tekst-animaties gebruiken één glyph-scramble uit `Skills.tsx` (`scramble`, `Letters`, `Scramble`).
- **Laatste meting (1 nov):** axe 0 op desktop en mobiel; Lighthouse desktop 100/100/100, mobiel Performance 96 (drie herhalingen; één uitschieter van 79 in de run daarvoor), Accessibility 100, Best Practices 100. SEO 63 komt door de `noindex`. Toetsenbord: 14 tabstops, focus overal zichtbaar.

### Open punten
- **Case-vlakken:** vier rustige grijzen achter de beelden; `WindowLight.tsx` wordt niet meer gebruikt en kan weg. De losse beelden `moraira.png`, `powerlifting.png` en `stuurmen.png` in `public/images/cases/` worden niet gebruikt en staan niet in git.
- **Incentive portal:** toestemming voor screens met het JobRewards-logo en voor de naam JobRewards op de casepagina (14 nov). Nog open: de kaart op de homepage (`content/cases.ts`) zegt nog `[Company] · Internship [Year]` (bewust zo gelaten); `docs/cases/incentive-portal.md` staat nog buiten git (toestemming is er; committen op mijn verzoek); `jobrewards.png` in case 01 op de homepage nalopen. De pagina heeft geen `[ ]`-placeholders meer (14 nov: "ready for the first client's launch" klopt; de regel over wie na het bouwen testte en de conclusie na "after the shift" geschrapt). Opgelost op 14 nov: ronde 2, de herhaalde screens (Process toont nu AI-schetsen → eerste ontwerp → telefoon-eerst → expert reviews; Decision 2 drie voor/na-paren van wat de test veranderde), het losse AI-blok (spec met echte regels staat nu in Building it), "Roles and permissions" geschrapt (de code dwingt rollen niet af, bron: Cursor-antwoorden 14 nov), nieuwe sectie "After the first client" met afdelingen. Statistieken en tips staan niet in het live menu: alleen als ontwerp tonen. `round-team-leads.png` wordt niet meer gebruikt. `docs/cases/incentive-portal.md` is op 14 nov bijgewerkt als overdracht voor het inkorten en het design (opbouw, inhoudsregels, wat bewust is weggelaten); `docs/cases/incentive-portal-wireframe.html` is de oude losse wireframe en kan weg.
- **Inhoudsregels casepagina Incentive portal (mijn keuzes, 13–14 nov):** geen "live since", launchdata of aantallen klanten (niet elke case staat live en sommige zijn ouder). Geen interne systeemarchitectuur van de werkgever noemen (details staan lokaal in `docs/cases/incentive-portal.md`): het probleem is simpelweg dat JobRewards nieuw was en een incentive portal miste; deadline = livegang van de eerste klant. Resultaat dat mag: meerdere klanten gebruiken het en elke klant die ik sprak noemt het snel, makkelijk en intuïtief. Testers waren teamleiders uit het veld, geen JobRewards-gebruikers; na het bouwen nog getest, alleen kleine verfijningen. Toon alle vijf menu-items (ook statistieken en tips), geen "five became three". Ik bouwde de API's niet. Geen framing die voor de hand liggende beginnersfouten toont (zoals "first design was for the wrong screen"). "Client" = klantbedrijf; interne betrokkenen heten stakeholders.
- **Stuurmen (case 03, 20 nov):** casepagina `/work/stuurmen` staat inhoudelijk, nog zonder eigen design (leent de klassen van `incentive-portal/case.module.css`). Beelden: Figma-pagina "stuurmen" (node `2087:302`) geëxporteerd als webp in `public/images/cases/stuurmen/`, plus de flowchart uit het adviesdocument. Bronnen: `~/Downloads/stuurmen documenten/` en `~/Downloads/Project_Proposal_djamiel-stuurmen-4.docx`. Inhoudsregels: alles mag getoond worden, geen namen (alleen rollen: twee eigenaren, Frank design en merkstrategie, Stijn development en de meeste sales), geen jaar, niet getest met klanten (nergens "tested" of "validated"), geen iteraties te tonen, niet bekend of de tool gebruikt wordt (nooit "clients use"). De front-end is gebouwd in Next.js zonder back-end; het idee voor een tool kwam deels uit schetsen van Stuurmen zelf, claim het concept dus niet als alleen het mijne. Geen AI-blok op deze case (20 nov op mijn verzoek weggehaald). Na te lopen: in het loginscherm staat het tikfoutje "possibility's" en mijn oude werkmailadres van Stuurmen.
- **Moraira Dream Villas (case 04, 23 nov):** casepagina `/work/moraira` staat en is vormgegeven (23 nov, stap 28–37 in `docs/beslissingen.md`): eigen stijlen in `mo.module.css` en `visuals.tsx`, leent daarnaast klassen van case 01–03 en `ScrollStage` van case 02; de hero opent alle zes pagina's fullscreen (`DesignViewer.tsx`). Beelden in `public/images/cases/moraira/` (`home-top.webp` en `villas.webp` worden niet meer gebruikt en staan niet in git). Nog open: op de Villa-pagina in de viewer staat "Available from 1 July 2025" (jaartal). Bronnen: `~/Downloads/moraira docs/` (advies, concurrentieanalyse, adviespresentatie, gesprek met de eigenaar, brandguide-onderbouwing, webdesigndocumentatie) en `~/Downloads/spaans nummer/` (bord bij de villa met QR, visitekaartje). Figma "selfserviceportal", pagina "moraira" (`2096:661`): de onderste rij is final (Home `2096:4409`, Villas `2096:4646`, Villa detail `2096:4945`, About `2096:5179`, Insider tips `2096:5290`, Contact `2096:5404`, brandbook `2096:5547` e.v.). Verhaallijn: audit → merk gebouwd op Moraira buiten de zomer (stellen 30+, gepensioneerden, remote workers; bewust geen blauw) → direct boeken makkelijker maken dan Booking.com (persoonlijk en lokaal, combideals alleen direct, één knop per sectie) → bord en visitekaartjes → overdracht → resultaat. Inhoudsregels: betaald freelancewerk, geen jaar; alles mag getoond en leesbaar blijven (ook het telefoonnummer op het bord) en de case mag live. Resultaat: directe boekingen van 21% (op de pagina "about 20%") naar 70%, en veel voller buiten de schoolvakanties; beide doelen gehaald. Gebouwd in WordPress door iemand anders nadat het budget op was: neutraal benoemen, geen kritiek. Het logo bestond al (licht verfijnd): niet benoemen of claimen. Wie de voorkeurstests deed is onbekend: geen testers noemen en niet "A/B test" noemen. In Figma staan alleen desktopschermen, dus niets over mobiel claimen. Laat PageSpeed, heuristiek-jargon en Double Diamond weg. AI mag als blok: AI-prototypes als inspiratie voor stijl en layout van sommige secties, transcripties van de gesprekken, de copy scherp houden en de kwaliteit van het project tussendoor toetsen. Vóór het exporteren de tikfouten in Figma fixen ("mediterranian" in de hero, "Secure boookings"; toestemming gegeven).
- **Opruimen:** de hero-laag heet nog `heroLight`, en `home.module.css` kan ongebruikte regels bevatten.
- **Inhoud:** alle case-inhoud is placeholder; de resume is nog placeholder. Mail en telefoon zijn echt (`content/site.ts`). In de tijdlijn nog na te lopen: "Lego on the floor" (door AI toegevoegd) en of "award-winning" controleerbaar is.
- **/design-system:** de mail-knop daar heeft nog de oude oranje stijl.
- **Tool-widgets:** echte desktop-pictogrammen als PNG in `public/tools/`; alles zonder app (methodes, frameworks) toont zijn naam in een tegel. De voorbeelden moet ik nog nalopen op wat ik echt gebruik.
- **Accentkleuren:** één oranje `#c04a00` (overdag, 4,31:1, alleen iconen en tekst vanaf 24px) met lichtere tint `#da9576` in de hero-animatie en `--lamp` `#ff9e5e` als licht in de nacht.
- **Scripts:** `npm run keyboard` crasht aan het eind op de canvas-check van J (gebruik alleen de focusregels); `explore-check` en `explore-sheet` testen routes die alleen lokaal bestaan; `screenshots` vergelijkt met versie J.
- **Niet getest:** echte telefoon (vooral het vastzetten van de pagina achter het mobiele menu in iOS Safari), Safari en Firefox, 5-secondentest met echte mensen. Sinds 1 nov zijn `npm run audit` en `npm run keyboard` niet opnieuw gedraaid; reduced motion is niet in de browser nagebootst.

## Doel
Persoonlijke portfoliosite voor Djamiel (22, Tilburg, HBO ICT & Media). Positionering: **product designer die zelf bouwt / design engineer**, met AI als rode draad (niet als kop). Doelgroep: productbedrijven en scale-ups in Brabant. De site is zelf bewijs van kunnen: gebouwd in Next.js, gehost op Vercel, code publiek op GitHub.

**Primair gebruik:** een link in een sollicitatiemail. De bezoeker is een recruiter of hiring manager die de site in een paar minuten scant en daarna hooguit 1–2 cases opent. Alles op de site moet die bezoeker dienen; wat daar niet aan bijdraagt mag weg.

Belangrijkste boodschap: niet "AI maakt mij sneller", maar "AI helpt mij een product van hogere kwaliteit te maken dat het probleem beter oplost".

## Stack
- Next.js (App Router) + TypeScript, Vercel, publieke GitHub-repo.
- CSS Modules met CSS-variabelen als tokens. Geen Tailwind, shadcn of UI-kit die de stijl overschrijft.
- Geen animatiebibliotheek: CSS, `requestAnimationFrame` en canvas 2D.

## Waar alles staat
- `app/page.tsx` – de homepage; `app/layout.tsx` – fonts en metadata.
- `components/home/` – onderdelen en `home.module.css`:
  - `glyph-swell.tsx` (hero-achtergrond), `NameHandoff.tsx` (begroeting en naam in de nav), `Menu.tsx`, `Sky.tsx` (dagdeel per sectie);
  - `Skills.tsx`, `SkillVisual.tsx`, `Story.tsx` (tijdlijn en afsluiter), `content.ts`.
- `content/explore.ts` + `cases.ts` – case-inhoud; `content/site.ts` – links.
- `app/work/incentive-portal/` – casepagina 01: `page.tsx`, `visuals.tsx` (diagrammen, grafieken en het telefoonframe `Phone`), `case.module.css`. Screens in `public/images/cases/incentive-portal/` (2x-exports van 480 breed, Nederlands zoals gebouwd).
  - Bron: Figma-bestand "selfserviceportal" (`ILJGHfa4CGKv4k40i8jQnt`), één pagina per iteratie; MVP-exports ook in `~/Downloads/afstudeerstage/incentive portal development mvp screens/` (let op: "Beloning bevestigen.png" en "…medwerkers lijst.png" zijn verwisseld). Stagedocumenten in `~/Downloads/afstudeerstage/` (o.a. `sprint 4/Iteratie na Expert Reviews.docx`, `Usability Test - UI UX.docx`).
  - Volgorde van het ontwerp: iteratie 1–3 (stakeholderfeedback en deskresearch) → expert review 1 op iteratie 3 → iteratie 4 → expert review 2 → prototype "testing iteratie 4 eerst beloning" (A/B-flows) → gebruikerstest met zeven teamleiders → iteratie 5 → afgestemd met stakeholders → "development MVP".
- `DESIGN.md` – het designsysteem van E; `/design-system` (`app/design-system/`) toont de tokens live; `PRODUCT.md` – productwaarheid.
- `docs/beslissingen.md` – logboek (ook bron voor de making-of); `docs/definition-of-done.md`; `docs/verkenning/` – analyses uit de verkenning.
- `private/context-djamiel.md` – persoonlijke context. **Staat in .gitignore, nooit committen of citeren op de site.** Bestaat alleen lokaal.
- Repo: https://github.com/djamiel-dev/portfolio (publiek). Commits met het GitHub-noreply-adres, nooit met het werkmailadres.

## Homepage-opbouw
1. **Nav**: vaste balk. Rechts Projects · How I use AI · About · Resume · Contact me, allemaal als gewone links (mobiel: schermvullend menu in het andere dagdeel, knop wordt een kruisje). Links leeg tot de naam verschijnt.
2. **Hero**: schermvullend met Glyph Swell. Kleine begroeting "Hi, [foto] I'm Djamiel" boven de grote positioneringszin met "product designer" in oranje. Geen knop, wel een scroll-hint. Na 20% van de hero flikkert de begroeting weg in glyphs en flikkert "Djamiel Saou" in de nav in (zelfde effect als de sectiekoppen).
3. **Work**: vier cases in twee kolommen, rechterkolom lager (zigzag 01–04).
4. **Skills**: zes kaarten die bij verticaal scrollen horizontaal door een lichtpoel schuiven; het actieve kaartje wordt lichter en toont een doorlopende rij tool-widgets. Op mobiel een verticale lijst.
5. **Tijdlijn**: vijf momenten langs een gloeidraad. Vanaf hier wordt de pagina donker.
6. **Afsluiter + footer**: de draad eindigt in een lamp boven de uitnodiging met mail-knop.

## Regels
- **Toegankelijkheid**: echte `<a>`/`<button>`, zichtbare focus, contrast ≥4.5:1 voor tekst <24px, touch targets ≥44px, `prefers-reduced-motion` respecteren (beweging staat dan stil, alles leesbaar), animatie pauzeren buiten beeld.
- **Mobiel**: werkt op 375px zonder horizontaal scrollen; de nav breekt niet over twee regels. De hero is ook op mobiel schermvullend (mijn keuze), met een scroll-hint.
- **Inhoud**: echte case-inhoud volgt pas als het design staat. Tot dan mag ik tijdelijke placeholdertekst verzinnen om het design uit te werken, maar altijd herkenbaar tussen `[ ]`, zodat er niets verzonnens live gaat. Geen verzonnen cijfers, citaten of resultaten buiten die haken.
- **Resume**: wordt een gehoste pdf (`/resume.pdf`) die in een nieuw tabblad opent; nu nog placeholder.
- **Toestemming**: alleen werk tonen waarvoor ik toestemming heb; geen screens, cijfers of klantnamen van werkgevers of hun klanten zonder akkoord. Voor de Incentive portal is er toestemming (14 nov): screens en de naam JobRewards mogen getoond worden; geen namen van testers, experts of collega's.
- **Kwaliteit** (bewust zichtbaar maken, zie making-of): definition of done (`docs/definition-of-done.md`), test op desktop + mobiel in de browser voordat iets af is. `npm run audit` (axe + Lighthouse) en `npm run keyboard` (focusregels) draaien tegen `npx next start -p 3100` met `SITE_URL=http://localhost:3100`, na `npm run build`.
- **Making-of loggen**: houd bij elke grotere stap kort bij in `docs/beslissingen.md` wat AI voorstelde, wat ik afkeurde of aanpaste, en hoeveel tijd het kostte.

## Skills (staan in `.claude/skills/`)
- **Impeccable**: critique, layout, typografie, kleur, polish en de detector (`impeccable detect`).
- **Emil Kowalski** (emil-design-eng): animaties, easing, hover- en focus-states.
- Gebruik ze één voor één en laat me voor/na zien (materiaal voor de making-of). Geen AI-gegenereerde beelden als projectbeeld.
