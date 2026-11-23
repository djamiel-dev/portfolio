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

### Terugblik op de verkenning (28 okt)
- **Mijn oordeel:** we zijn te snel naar een compleet design gegaan en AI deed te veel tegelijk. In stap 4 bouwde AI drie volledige pagina's in één keer, en onderweg kwamen er veel procesbestanden bij (`PRODUCT.md`, `.impeccable/`, twee testscripts). Daardoor kon ik keuzes niet stap voor stap volgen of bijsturen.
- **Wat wel bruikbaar is:** de referentieanalyse, de critique van J (geleende stijl, werk niet boven de vouw, te trage hero) en de drie routes als vergelijkingsmateriaal.
- **Afspraak voor het vervolg:**
  - kleinere stappen, één onderdeel per keer;
  - na elke stap laten zien en wachten;
  - nieuwe bestanden of tools alleen na overleg.
- **Stap 6 (kiezen)** staat nog open en gaat verder in een nieuwe chat.
- **Making-of-materiaal:** dit is een goed voorbeeld van "AI met controle": het tempo van AI moet passen bij het tempo waarin ik kan beoordelen.

### Stap 6 – Nieuwe aanpak: Heron als systeem, eigen wireframe als basis (concept D)
- **AI deed:** de designlang-plugin opgezet en Heron gemeten. designlang kwam niet voorbij Herons loader, dus typeschaal en achtergrond zijn in de browser nagemeten; vastgelegd in `DESIGN.md`. Daarna mijn wireframe uit Claude Design sectie voor sectie gebouwd op `/explore/d` (nav + hero, werk, skills, tijdlijn, afsluiter + footer), met Impeccable en Heron als experimenteel stijlsysteem. Gradient ASCII van React Bits als hero-achtergrond, met twee gemarkeerde aanpassingen (opruimen in development, `flipY`).
- **Gevonden en opgelost tijdens het bouwen:** focusvolgorde van het werk volgde eerst de kolommen (01, 03, 02, 04); scrollpanelen lijnden niet uit met tekst en balk; de ASCII-achtergrond bleef in development wit door een verloren WebGL-context; de Skills-lijst kreeg op desktop onnodig focus.
- **Ik besliste:** na elke sectie bijgestuurd, onder meer: hero toch schermvullend, skills-panelen beginnen en eindigen in het midden en lijnen uit met tekst en balk, tijdlijn met maximaal twee momenten in beeld, pagina wordt donker vanaf de tijdlijn en blijft donker, ASCII-gloed van boven in plaats van onder.
- **Toetsing:** axe 0 op desktop en mobiel; Lighthouse desktop 100, mobiel 95–98 performance (versie J: 98 in dezelfde meting), SEO 60 door de bewuste `noindex`; toetsenbord 15 stappen, alle focus zichtbaar.
- **Tijd:** [invullen]

### Stap 7 – Vrij experiment: één dag licht (concept E)
- **Vraag:** maak van D iets op award-niveau, als losse route `/explore/e`, in één doorlopende run zonder tussentijdse checks. Opbouw en concept van D liggen vast; het designsysteem, de hero-achtergrond en het signatuurmoment zijn vrij.
- **AI deed:** zeven richtingen uit de wereld van de doelgroep opgesteld en Impeccable laten loten. Die koos nummer 4, **licht** (Eindhoven als Lichtstad), boven AI's eigen favoriet: een rode draad die door de pagina genaaid wordt. De pagina is nu één dag:
  - de hero in ochtendlicht door een raam (SVG, geen afbeelding);
  - het werk in daglicht, met per case een lichtstudie die later op de dag valt, als placeholder voor het beeld;
  - de skills in het gouden uur, waarbij de skill in het midden in een lichtpoel staat;
  - vanaf de tijdlijn nacht, met de lijn als gloeidraad die elk moment aanzet. De lijn eindigt in een hanglamp die de uitnodiging verlicht; de mailknop is het enige verlichte object.
  - Eén lettertype (Mona Sans), waarvan de breedte-as het werk van een tweede font doet. Geen nieuwe npm-dependencies.
- **Bewust anders dan D:** geen Heron-papier, mono-labels en oranje; geen ASCII-achtergrond; links veranderen bij hover niet meer van kleur (oud contrastprobleem) maar krijgen een lijn; de tijdlijn heeft vaste kanten (periode links, verhaal rechts); mobiel heeft een menu (`<details>`, werkt zonder JS) in plaats van een nav over twee regels.
- **Gevonden en opgelost tijdens het bouwen:**
  - gedimde skill-titels haalden 2,84:1 (axe);
  - amberkleurige jaartallen waren onleesbaar zodra de tijdlijn nog in daglicht stond;
  - de lamp werd op mobiel half afgesneden en de lichtpoel had harde randen;
  - na een aanpassing waren alle nav-links standaard onderstreept;
  - het foto-label paste niet op tablet en mobiel;
  - het skills-deel was ruim vier schermen lang en is ingekort tot ongeveer twee.
- **Toetsing:** axe 0 op desktop en mobiel; Lighthouse mobiel 98/100/100, desktop 100/100/100 (SEO 60 door de bewuste `noindex`); toetsenbord 15 stappen, alle focus zichtbaar; werkt zonder JS en met reduced motion (alles staat dan aan en stil). Impeccable-detector: 0 codemeldingen; in de browser alleen "veelgebruikt font" (bewuste keuze).
- **Afwijkingen van het Impeccable-proces:** geen subagents (critique in één context), geen comps, geen surface brief en geen nieuwe DESIGN.md, om binnen `app/explore/e/` te blijven.
- **Ik besliste:** E wordt de homepage, na de bijsturing in stap 8.
- **Tijd:** [invullen]

### Stap 8 – Bijsturen en E als homepage (29 okt – 1 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Hero-achtergrond | Raamlicht als SVG, onderdeel van het dag-idee | Vervangen door Glyph Swell, een component dat ik aandroeg. AI waarschuwde dat dit het lichtverhaal doorbreekt; ik vind de animatie super cool, dus hij blijft |
| Foto | Twee foto's geconverteerd en bijgesneden, GPS-locatie verwijderd. AI adviseerde de foto in Rome | Toch de eerste, rustige foto |
| Lamp en draad | Lichtpoel als apart vlak, draad boven de lampjes | Harde rand en lijn door de bolletjes gezien; laten oplossen |
| Skills-kaarten | Vlakken met "lichtinstrumenten" (lens, prisma) | Zag er echt slecht uit. Na een selectie van React Bits en 21st.dev zelf een voorbeeld gekozen: gestippelde kaarten met lijnicoontjes, zonder het raster, en smaller |
| Skills-accent | Warme gele gloed, daarna bijna wit | Te geel, daarna te wit. Nu 60% lichte tint. Bij de overgang naar de nacht moest de gloed weg |
| Tool-widgets | – | Mijn idee: doorlopende rij tools, alleen zichtbaar op het actieve kaartje. Onbekende tools blijven `[Tool]` |
| Skills-kop | Placeholder, groot | Zin door AI: "From the first interview to the last line of code." Kleiner en hoger |
| Hiërarchie hero | Grote begroeting, kleine functiezin | Omgedraaid: functiezin groot, begroeting klein, foto op de basislijn |
| Nav | Naam links, balk alleen bovenaan de pagina | Mijn idee: vaste, rustige balk en een typewriter die de naam overdraagt van hero naar nav |
| Accent | Amber band onder "product designer", rest grijs | Rest weer donker; eerst andere letters geprobeerd, uiteindelijk zelfde font in oranje |
| Publicatie | – | E op `/`, A–D en J alleen nog lokaal, live op Vercel |

- **Observatie van AI (nog te bevestigen door mij):** de onderdelen kwamen sneller goed wanneer ik een voorbeeld aanwees en precies zei wat wel en niet moest, dan wanneer AI zelf een concept bedacht.
- **Gevonden en opgelost:** startpositie van de skills-rij klopte niet meer na de nieuwe kaarten (door mij gezien, oorzaak `offsetLeft`); een Lighthouse-uitschieter van 79 op mobiel bleek bij drie herhalingen 96.
- **Toetsing (1 nov):** axe 0; Lighthouse desktop 100, mobiel Performance 96, Accessibility 100. Echte telefoon, Safari en Firefox nog niet getest.
- **Tijd:** [invullen]

### Stap 9 – Werk, skills en kleur verfijnen (1 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Case-kaarten | Raamlicht, statustags, jaartal, type en probleemzin | Alles weg: effen vlak met één zin. De rest komt op de casepagina |
| Gouden uur | Eigen warme kleuren voor Skills | Geen kleurwissel tot de tijdlijn |
| Oranje | Eerst bruin als accent, daarna `#c53b00` voor contrast | Bruin lelijk, `#c53b00` te rood. Eén oranje, `#c04a00`, in dezelfde kleurtoon als de animatie, om variatie en fouten te beperken |
| Nacht | Blauw-zwart met amber | Paste niet bij de dag. Warm bijna-zwart met hetzelfde oranje als licht; daarna nog iets minder groen |
| Designsysteem | – | Mijn verzoek: pagina `/design-system` die de echte tokens toont |
| Skills-indeling | Zes losse skills | Mijn indeling in fases; AI stelde de namen "problem framing" en "Collaboration" voor |
| Tool-rij | SVG-logo's uit Simple Icons | Echte desktop-pictogrammen, tekst-tegels in `--bg`, en sleepbaar met pak-animatie |
| Tijdlijn | Om en om links en rechts op mijn verzoek | Geprobeerd en voorlopig teruggedraaid |

- **Nog na te lopen door mij:** AI verzon de meeste tekst-tegels in de tool-rij (buiten `[ ]`), op mijn verzoek om voorbeelden.
- **Toetsing:** alleen in de browser op 1440px en 375px en met `npm run build`; `npm run audit` en `npm run keyboard` zijn niet opnieuw gedraaid. Slepen is gesimuleerd getest, niet met een vinger op een echte telefoon.
- **Tijd:** [invullen]

### Stap 10 – Het verhaal en de afsluiter invullen (6 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Inhoud | Context gelezen (product, privénotities, logboek) en gewezen op wat er niet mag: geen werk of cijfers van mijn werkgever, en geen sollicitatiesignaal | Per moment mijn eigen verhaal verteld; AI schreef het in het Engels uit en ik stuurde zin voor zin bij |
| Momenten | Vijf blokken van de placeholder | Jeugd (tekenen, Lego, Scratch, computerhulp aan huis), studie met side projects, Stuurmen als apart blok, afstuderen met het hoogste cijfer en AI-workshops, en nu fulltime product designer |
| Teksten | Meerdere versies per blok, met verzachte formuleringen (bijv. "strict standards" in plaats van "super streng") | Titels zelf korter gemaakt ("Award-winning agency", "Full-time product designer"); bij het laatste blok uit drie versies gekozen en aangevuld |
| Kop | "How I became a designer who builds" | "How I became a product designer", zodat de kop aansluit op het laatste moment |
| Jaartallen | Zes alternatieven; AI koos de fase per moment | Fase links. Mijn idee: één sticky label dat zich weg- en opnieuw typt bij elk moment |
| Afsluiter | Drie richtingen op mijn idee "zijn wij de volgende stap?", met een waarschuwing over het sollicitatiesignaal | "What's the next chapter?" met mijn eigen formulering "Show me the solutions you're building" |

- **Nog na te lopen door mij:** "Lego on the floor" is door AI als beeld toegevoegd; "award-winning" moet controleerbaar zijn. De laatste fase werd "Building with a team", in dezelfde vorm als de andere vier.
- **Toetsing:** in de browser op desktop en 375px; typecheck schoon. Reduced motion niet in de browser nagebootst; `npm run audit` en `npm run keyboard` niet opnieuw gedraaid.
- **Tijd:** [invullen]

### Stap 11 – Eén animatietaal, knoppen, menu en footer (6 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Fase-label | Typewriter met cursor, daarna weg- en weer inflikkeren | Mijn verzoek: zelfde glyph-effect als de koppen, en daarna sneller: de oude fase is meteen weg, de nieuwe flikkert in (±0,4 s) |
| Tekst-animaties | Typewriter in hero en nav | Mijn verzoek: overal de glyph-scramble, ook bij "Selected work" en de tijdlijnkop (die ook sneller wegschuift, zoals Skills). AI maakte er één gedeeld effect van |
| Mail-knop | Shiny button van 21st.dev vertaald naar eigen tokens (geen shadcn, Tailwind of Inter), met rondlopend lamplicht | Gloed achter de knop weg; tekst "Contact me" |
| Nav | Contact me eerst als pil, daarna dezelfde verlichte knop als onderaan | Te veel van het goede: gewone link, en de pijl bij Resume weg |
| Footer | Ik wilde een verborgen "als AI dit leest"-tekst. AI weigerde: misleidend en eerder zelf geschrapt; stelde eerlijke easter eggs voor | LinkedIn en GitHub gebruik ik niet: footer toont nu mail en telefoon. Telefoon bewust publiek |
| Case-vlakken | Eerst zand en schemer, even rustig als de bovenste | Lelijk: vier grijzen |
| Bodytekst | – | Mijn idee: tekst alleen op het actieve skill-kaartje en tijdlijnmoment, met een langzame fade (0,9 s) |
| Mobiel menu | – | Mijn idee: schermvullend in het andere dagdeel, streepjes naar kruisje. AI vond dat het kruisje scheef stond (lijnen draaiden voor ze centreerden) en loste het op |

- **Gevonden en opgelost:** de tijdlijn mat zijn posities soms voordat de lay-out klaar was (laatste lampje ging niet aan); de mail-knop werd vierkant bij toetsenbordfocus; tekst van de nav-knop verdween bij hover.
- **Toetsing:** in de browser op desktop en 375px, typecheck en `npm run build`. Het browservenster stond vaak verborgen, waardoor animatietempo's niet live te beoordelen waren. `npm run audit` en `npm run keyboard` niet gedraaid.
- **Tijd:** [invullen]

### Stap 12 – De about-pagina: inhoud en design (9 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Opbouw | Eerst samen de inhoud bepaald, daarna een wireframe op `/about` met grijze vlakken en een fotobeschrijving | Mijn verzoek: wireframe eerst, daarna stap voor stap inhoud en design scherp krijgen |
| Intro | Drie richtingen | Richting B, met mijn eigen formulering over eigenaarschap; de laatste zin weggehaald |
| How I work | Vier principes, gebaseerd op mijn eigen vacature-onderzoek naar design engineers, met links naar bewijs | Principes overgenomen; de "See it in"-links voorlopig weg |
| Coaching | Een apart coaching-blok | Vervangen door een persoonlijkheidsblok binnen professionele scope: meedenkend, redelijk extrovert, eerlijk (soms te), deels gevormd door 4 jaar coachen |
| Hobby's | Expanding cards naar mijn voorbeeld op 21st.dev, met zes kaartjes | Mijn onderwerpen en per kaart mijn eigen richting voor de zin; "Still curious" als laatste |
| Feiten | Met Collaborative Strength en tekst tussen haken | Collaborative Strength weg, haken eruit, coach sinds 2022 erbij |
| Afsluiter | "What I'm looking for" en een donkere afsluiter | Beide weg: een vraag of ik in het team pas, in daglicht |
| Design | Zeven stappen vanaf de wireframe: basis, intro, How I work, persoonlijkheid, hobby's, feiten en afsluiter, checks | Per stap goedgekeurd. Kaartjes recht en het open kaartje licht op zoals bij Skills, alleen CSS (geen extra component); feiten als rij met lijnen; afsluiter gecentreerd zoals op de homepage |

- **Nog na te lopen door mij:** de zinnen tussen `[ ]` in het persoonlijkheidsblok; of 2022 klopt als startjaar coaching (berekend, niet bevestigd); alle foto's ontbreken nog.
- **Open:** het mobiele menu markeert de huidige pagina niet; met echte foto's krijgen dichte kaartjes misschien een gedimde foto en tekst op foto's een scrim.
- **Toetsing:** in de browser op 1440px en 375px (geen horizontale scroll, geen consolefouten), met echte Tab-toetsen. `npm run audit` op `/about`: axe 0 op desktop en mobiel; Lighthouse desktop 100/100/100, mobiel Performance 99, Accessibility 100, Best Practices 100; SEO 60 alleen door `noindex`. `npm run keyboard` op `/about`: 16 tabstops, focus overal zichtbaar (crasht daarna op de canvas-check van J, bekend). Reduced motion nagebootst met Playwright: geen overgangen, alle koppen direct leesbaar.
- **Tijd:** [invullen]

### Stap 13 – How I use AI: inhoud en wireframe (10 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Onderzoek | Online gezocht waar recruiters op letten bij AI-gebruik: oordeel boven tools, laten zien waar je AI níet inzet en hoe je de output controleert; rode vlaggen zijn modewoorden en gladde output zonder zichtbare beslissingen. Gecombineerd met mijn eerdere onderzoek. Voorstel: bewijs in plaats van een essay, met een link naar de making-of | Making-of voorlopig geen case; de pagina per fase opbouwen, zoals de skills op de homepage |
| Opbouw | Wireframe op `/ai`: korte versie, per fase wat AI doet, wat ik doe en hoe ik het controleer, wat ik zelf in handen houd, drie momenten uit dit logboek waarop AI het fout had, links om het werk te controleren, afsluiter. De nav-link `#ai` wees nergens heen en gaat nu naar `/ai` | Akkoord |
| Fases | Mijn ingesproken uitleg per fase verdeeld over de drie kolommen en in het Engels uitgeschreven | Per fase mijn eigen werkwijze verteld |
| Frontend | "Pick components from 21st.dev or React Bits" | "Make use of component libraries such as 21st.dev or React Bits" |
| Collaboration | Weggelaten dat ik AI vraag wat iemand in een chat bedoelt: kan lezen als "begrijpt collega's niet zonder AI" | Twijfelde zelf al; weggelaten |
| Tools en voorbeelden | Per fase een regel met tools en een voorbeeld uit een project | Voor nu weg |

- **Nog na te lopen door mij:** de Engelse formulering van de fases en de drie momenten; "Writes most of the code" (eerlijk, maar daar wordt in gesprekken op doorgevraagd); white-label genoemd zonder bedrijfsnaam; Claude aangenomen als AI-tool bij research; de placeholders in "What I keep in my own hands", het teamblok en de afsluiter; de cellen zijn lang voor een recruiter die scant.
- **Toetsing:** in de browser op 1440px en 375px (geen horizontale scroll, geen consolefouten), typecheck en `npm run build`. `npm run audit` en `npm run keyboard` niet gedraaid. Live gezet in commit `64ddd6f`.
- **Tijd:** [invullen]

### Stap 14 – Paginaovergang: glyph-golf (11 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Richting | Drie opties: een glyph-golf vanaf de klik (met de glyph swell van de hero), een rustige variant waarin alleen de kop scramblet (View Transitions), of een overgang via het dagdeel van `Sky.tsx` | Glyph-golf |
| Bouw | `components/PageTransition.tsx` in de layout. Een canvas over de pagina: een ring vanaf de klik vult het scherm met het rustige glyph-veld, de pagina wisselt in de browser zelf (geen volledige lading), en een tweede ring vanaf hetzelfde punt haalt het veld weer weg. Naar Home valt het veld samen met de hero. In het donkere deel nachtkleuren met de lamp als accent | Akkoord. AI maakte het nieuwe bestand zonder het eerst te vragen; mijn keuze voor optie 1 was als akkoord opgevat |
| Fout | Eén leeg frame tussen dekken en onthullen liet de nieuwe pagina even zien | Opgelost: het eerste frame wordt meteen getekend |
| Verfijning (Emil) | Dekken met ease-in begon traag op het moment van de klik; toetsenbordnavigatie animeerde mee; de onthulling blokkeerde klikken op de nieuwe pagina | Beide ringen ease-out (300 ms dekken, 380 ms onthullen); met het toetsenbord geen golf; tijdens de onthulling is de pagina al klikbaar. Noodtimer (volledige lading na 4 s) start pas na de wissel; in een verborgen tabblad wordt de golf overgeslagen |

- **Niet van toepassing:** links naar een plek op dezelfde pagina, mail, telefoon, bestanden (resume-pdf), nieuwe tabbladen en klikken met Cmd/Ctrl. Met reduced motion navigeren links zoals altijd.
- **Toetsing:** in de browser op 1440px en 375px, met de animatieframes stap voor stap nagebootst (het browservenster stond verborgen). De dekking loopt op en af zonder flits; navigatie in beide richtingen en via het mobiele menu (menu dicht, scrollslot eraf, geen horizontale scroll); focus gaat naar de kop van de nieuwe pagina of naar de sectie bij `/#work`. Typecheck. Niet gezien op echte snelheid, niet op een echte telefoon; `npm run audit` en `npm run keyboard` niet gedraaid.
- **Tijd:** [invullen]

### Stap 15 – How I use AI: secties verfijnd (11–13 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Skills-titel | Meer ruimte onder "Where AI fits, skill by skill" | In drie stappen groter gemaakt, tot ongeveer 2× de oorspronkelijke afstand |
| Taste-sectie | Onderzoek op React Bits, 21st.dev, Awwwards en CSS Design Awards; vier richtingen: oplichtende zinnen, een zeef, gestapelde kaarten, tekst pas bij hover. De laatste afgeraden (geen hover op telefoons) | De zeef: twaalf glyph-tegels naast drie korte stappen; bij "Does it fit?" vallen er acht af, bij "Is it good enough?" blijft er één over die oranje oplicht |
| Verfijning zeef | Voller veld per tegel (5×5), uitdoven in een verspreide volgorde per groep | Akkoord. Mijn verzoeken: subtekst alleen bij de actieve stap, en de laatste tegel blijft bewegen |
| Teksten taste | Intro en stappen ongeveer gehalveerd | Akkoord |
| When AI got it wrong | Mijn vraag of de sectie waarde heeft. Advies: weinig voor de recruiter die scant, veel voor de hiring manager die bang is voor ongecontroleerde AI-output; wel inkorten. Op mijn verzoek om betere of verzonnen voorbeelden: niets verzonnen (regel van dit project, en het zou precies voorbeeld 3 zijn), wel twee echte uit dit logboek (vier stijlrichtingen die één layout bleken; een animatie die frames telde in plaats van tijd) | Akkoord; per moment de les als kop en één of twee zinnen |
| What I can bring | Eerst drie richtingen. B (uitklapkaarten zoals op About) en A (een draad met Design systems, Auto Layout en AI) gebouwd | Beide niet leuk genoeg; het Auto Layout-voorbeeld vond ik zwak en de sectie leek op die erboven. Mijn idee: vijf kaartjes in een grid, twee breed en drie smal, SaaS-stijl naar Supabase |
| Bento | Vijf kaartjes met eigen lijniconen en een klein beeld per kaartje dat bij hover zijn punt laat zien; een lampgloed volgt de cursor en de randen vangen het licht (naar Magic Bento en Spotlight Card op React Bits). Twee nieuwe punten uit wat al op de site staat: research en kwaliteitschecks | Punten kloppen. Design-system-kaartje te simpel: nu een component als redline-spec waarvan de verwijzingen naar tokens zich bij hover intekenen |
| Ruimte | De team-sectie stond te dicht op de momenten | 25% meer ruimte erboven |

- **Fout van AI:** de randgloed bleef eerst onzichtbaar omdat het kaartje zijn eigen rand wegknipte; gevonden bij het testen.
- **Werkwijze:** de dev-server crashte met Turbopack zonder melding op `/ai`; draait nu met `--webpack`. Oorzaak niet uitgezocht.
- **Nog na te lopen door mij:** de ingekorte teksten van de taste-stappen; "Testing caught it" bij het frames-voorbeeld (het logboek zegt niet wie het vond); de zinnen op de vijf kaartjes.
- **Toetsing:** in de browser op 1440px en 375px (geen horizontale scroll), typecheck. Hover-toestanden en randgloed gecontroleerd; de zeef deels via berekende stijlen omdat het browservenster verborgen stond. Reduced motion niet nagebootst; `npm run build`, `npm run audit` en `npm run keyboard` niet gedraaid. Live gezet in commit `0d172ca`.
- **Tijd:** [invullen]

### Stap 16 – Incentive portal: echte screens in mockups (14 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Toestemming | Vóór het verwerken gevraagd of de screens met JobRewards-logo getoond mogen worden (regel in dit bestand) | Ja; later ook de naam JobRewards op de casepagina. De kaart op de homepage blijft voorlopig `[Company] · Internship [Year]` |
| Mockup-aanpak | Drie opties: CSS-frame om de PNG, kale screens, of vaste mockup-PNG's renderen. CSS-frame aangeraden (geen nieuwe tools) | CSS-frame; screens blijven Nederlands |
| Hero | Belonen → medewerkers kiezen → bevestiging, middelste telefoon iets hoger | Akkoord |
| Fout van AI | Het verkeerde screen in het midden gezet: twee bestandsnamen in de export waren verwisseld. Gezien bij de controle in de browser | Opgelost |
| Frame, versie 1 | Dunne donkere rand zonder notch; de schermhoeken sneden de app-header af | Afgekeurd: "verder denken in logische fitment". Statusbalk in de app-kleur `#F8F8F8` zodat de hoeken niets wegnemen, en randen als een iPhone met zijknoppen en camera-eiland |
| Frame, versie 2 | Maten afgeleid van een iPhone-scherm van 393pt (statusbalk 54pt, eiland 126 × 37pt, hoeken ±55pt), alles in `cqw` zodat het op elke breedte klopt; metalen rand, zijknoppen, home-indicator. Bij de pop-up een grijze statusbalk, omdat de pop-up de app dimt. Pins in een eigen laag boven het scherm, in % van de export | Akkoord |
| Decision 1 | Het beloningsscherm met pins op snelle beloningen, handmatige punten en redenveld | Akkoord |
| Ontwerprondes | Na mijn vraag zelf in Figma gekeken (MCP) en in de stagedocumenten. Eerst gevraagd welke iteratie bij welke kaart hoort | Mijn uitleg van de volgorde gegeven en gevraagd om zelf het logischste te kiezen. Gekozen: iteratie 3, het testprototype na review 2, iteratie 5 (eerst de beloning, dan de mensen); per kaart één telefoon die uit de onderrand steekt. Het telefoonscherm van iteratie 2 bewust weggelaten (desktop-dashboard onder elkaar) |

- **Nog na te lopen door mij:** de tekst van ronde 2 ("illustrations", "a reason with every reward") tegen wat het screen en het document laten zien; ronde 3 lijkt op het middelste hero-screen; de Engelse alt-teksten.
- **Toetsing:** in de browser op desktop en 375px (geen horizontale scroll, geen consolefouten), typecheck. Niet op een echte telefoon; `npm run build`, `npm run audit` en `npm run keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 17 – Incentive portal: inhoud van de casepagina (13–14 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Wireframe | Eerst een losse lo-fi HTML-wireframe met per blok een visueel concept: voor/na-flow, tijdbalk op echte verhoudingen, filmstrip van iteraties, geannoteerd scherm, slope chart per tester, stippen voor kleine aantallen, dagbalk, menu-verschil, log-kaartjes met productiebugs | Richting goed, maar een losse pagina die niet in mijn stijl staat werkt niet: direct in de portfolio bouwen. Momenten die beginnersfouten tonen eruit ("first design was for the wrong screen", bugs zoals een redirect naar localhost) |
| Casepagina | `/work/incentive-portal` in de stijl van About en How I use AI, dag naar nacht bij het resultaat; case 01 op de homepage linkt ernaartoe | Akkoord, live gezet in `0a3da4a` |
| Inhoud (spraakmemo) | – | Geen "live since"; probleem herschreven; tijdlijn en menu-verschil eruit; testers waren teamleiders uit het veld, geen gebruikers; na het bouwen ook getest; rollen, rechten en afdelingen toegevoegd, met de schaalbaarheid als punt (de afdelingskeuze verschijnt alleen als de data afdelingen heeft); ik bouwde de API's niet |
| Review chronologie | Pagina naast mijn volgorde van iteraties gelegd en de bestanden nagelopen. Vier afwijkingen: rondes vereenvoudigd, "client" dubbelzinnig, de reden voor de A/B-test ontbrak, de uitkomst te smal ("for the two who think in people first"). In de bestanden komt het advies om de volgorde te testen alleen uit expert review 2 | Rondes mogen vereenvoudigd blijven; de andere drie aangepast. Uitkomst: beide flows hadden hun moment (twee kozen persoon-eerst, twee anderen noemden momenten), dus beloning-eerst is de hoofdroute en belonen kan ook vanuit de medewerkerslijst |
| Architectuur | – | Geen interne systeemarchitectuur van de werkgever noemen. Het diagram in Building it toont nu alleen wat een teamleider ziet (eigen team, andere teams afgeschermd) |

- **Fout van AI:** in de eerste versie stond "4 of 7" als citaat tussen aanhalingstekens en "two taps" zonder haken; beide nog vóór publicatie gecorrigeerd. Mijn eigen testverslag bleek fouten te hebben (gemiddelde 4,6 i.p.v. 4,4; "4 van 7" terwijl er vijf namen staan); de pagina gebruikt de herberekende cijfers.
- **Werkwijze:** de lokale build met Turbopack crasht (exit 132); `next build --webpack` lukt.
- **Nog na te lopen door mij:** zie de placeholders onder "Open punten" in `CLAUDE.md`.
- **Toetsing:** in de browser op 1440px en 375px (geen horizontale scroll, geen consolefouten), typecheck en `next build --webpack`. `npm run audit` en `npm run keyboard` niet gedraaid. Wijzigingen na `0a3da4a` niet gecommit.
- **Tijd:** [invullen]

### Stap 18 – Incentive portal: feiten rechtgezet en wat onderzoek echt veranderde (14 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Feitencheck | Pagina naast de stagedocumenten gelegd. Drie fouten: het redenveld zat al in iteratie 3 (dus niet "added after an expert review"), ronde 2 noemde illustraties en een reden die niet op het screen staan, één tester was geen teamleider | Callout en ronde 2 aangepast; testers heten voor het gemak "seven team leads"; de tester die zo'n app niet zou gebruiken telt mee bij "na de dienst" (6 en 1) |
| Rondes | Opgemerkt dat ronde 2 en 3 vrijwel de hero-screens herhalen. Figma (MCP) per pagina vergeleken: testprototype naast development MVP | Process toont nu: AI-schetsen → eerste Figma-ontwerp (iteratie 1) → telefoon-eerst (iteratie 3) → twee expert reviews. Het screen van iteratie 5 eruit |
| Wat de test veranderde | Drie voor/na-paren die in de testnotities terug te vinden zijn: statistieken (getallen in de staven, kopjes), menu (Geschiedenis → Logboek, beloningenlijst weg, ander icoon), medewerkerprofiel (toevoegen en verwijderen weg, fraude). Eigen eerdere claim geschrapt: het bevestigingsscherm zat al in het testprototype | Akkoord; staat in Decision 2 onder "What else the test changed" |
| Cursor | Prompt met 15 vragen voor de code van de portal | Antwoorden geplakt; gebruikt als bron voor de volgende stappen |

- **Fout van AI:** ik noemde het bevestigingsscherm eerst een gevolg van de test; Figma liet zien dat het er al was.
- **Toetsing:** in de browser op desktop en 375px (geen horizontale scroll, geen consolefouten). Niet gecommit.
- **Tijd:** [invullen]

### Stap 19 – Incentive portal: Building it, AI per stap, na de eerste klant (14 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| AI-blok | – | Geen apart blok: AI uitleggen bij de stap waar het speelde. AI-prototypes staan bij Exploring, de spec bij Building it |
| Spec | Echte regels uit `PROJECT_SPEC.md` (via Cursor) in plaats van de placeholder; de door AI bedachte stap "Checked against the spec" vervangen door de bouwvolgorde uit de spec zelf (UI → logica → backend) | Akkoord |
| Rollen | Cursor liet zien dat de rollen niet worden afgedwongen in de portal; kaart "Roles and permissions" geschrapt. Nieuwe kaarten: één app voor elke klant, alleen je eigen team, aanroepen via de server | Akkoord |
| Afdelingen | – | Niet als schaalbaarheidspunt, maar als voorbeeld van "de case was niet voorbij bij de eerste klant". Eigen sectie, met één regel over kleinere wijzigingen daarna |

- **Toetsing:** in de browser op desktop en 375px (geen horizontale scroll, geen consolefouten), typecheck. Niet gecommit.
- **Tijd:** [invullen]

### Stap 20 – Incentive portal: kritische ronde op de inhoud (14 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Vraag | Ik vroeg of dingen ook beter konden lijken dan ze zijn | AI weigerde te overdrijven en zocht in de rest van de stagedocumenten naar ware punten die onderbelicht waren |
| Toegevoegd | Naam en logo zelf bedacht; eerste klanten tellen het zwaarst; opdracht eerst versmald (webshop, automatische punten, badges voor later); API's in overleg met de backend developer beschreven; code gereviewd; teamleiders gebruiken het zonder training | Akkoord. Bij de review alleen dát het gebeurde, niet de punten |
| Geschrapt | Het blok "after the shift" (alleen een inzicht), de firewall-fix | Akkoord |
| Afgewezen | "What I'd do differently", kleinere ontwerpkeuzes, de Europese richtlijn, onderscheid gebouwd/ontworpen | Geen fouten tonen; kleinere punten zijn de lengte niet waard |
| Overdracht | `docs/cases/incentive-portal.md` herschreven als overzicht voor het inkorten en het design in een nieuwe chat | Akkoord |

- **Toetsing:** in de browser (geen consolefouten), typecheck. Niet gecommit.
- **Tijd:** [invullen]

### Stap 21 – Incentive portal: de casepagina ingekort voor wie scant (17 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Uitgangspunt | Een recruiter leest de korte versie, de koppen en de beelden, en duikt hooguit in één beslissing. Wat moet blijven: probleem, rol, proces, twee beslissingen met onderbouwing, dat ik het zelf bouwde (met AI) en het resultaat. Wat weg kan: diagrammen die de tekst herhalen en hele telefoons voor één detail | [nog te beoordelen] |
| Problem | Twee alinea's en het `Landscape`-diagram werden één alinea | [ ] |
| Process | De versmalde opdracht en de feedbackrondes in één alinea; de drie rondes bleven | [ ] |
| Decision 2 | `FlowAB` weg (de grafiek noemt beide volgordes al), tekst over de testers samengevoegd. "What else the test changed": zes telefoons vervangen door drie kaarten met alleen het stukje dat veranderde (staven, menu-items, knoppen), getest boven, na de test onder | [ ] |
| Building it | `Tenants`-diagram weg; de drie punten in één rij onder de spec | [ ] |
| After the first client | Geen eigen sectie meer: één alinea onder het resultaat. `Departments`-diagram weg | [ ] |

- **Effect:** op 1024px van ca. 9.600 naar 7.650px hoog, van 1.178 naar ca. 950 woorden. Decision 2 van 2.700 naar 1.830px.
- **Toetsing:** in de browser op 1024px en 375px (geen horizontale scroll, geen consolefouten), typecheck. `npm run build`, `npm run audit` en `npm run keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 22 – Incentive portal: layout per sectie en een Emil-ronde (17 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Problem | – | Tekst rechts, links de medewerkersapp van JobRewards (nieuw beeld `employee-app.webp`) op het grijze vlak |
| Decision 1 | – | Context toegevoegd: eerst een dashboard vol opties, na afstemming met stakeholders zo min mogelijk tikken, omdat JobRewards wint op eenvoud en snelheid. Scherm met pins rechts van de tekst |
| Decision 2 | Kop "I tested my own assumption" | Herschreven: stakeholders en twee expert reviews losten veel op, de route bleef open, dus testen met teamleiders; geen eigen voorkeur noemen. Uitkomst in vier stappen herschreven. Figma-testprototype (`test-prototype.webp`) naast de tekst, klikbaar op volle grootte |
| Resultaten | Na inspiratie bij 21st.dev (stat-bento's) en React Bits (CountUp): grafiek als grote tegel, twee tegels met een groot getal dat optelt als het in beeld komt | Akkoord |
| Voor/na-kaarten | Eerst te groot en te ver ingezoomd, daarna gestapeld te hoog | Volle breedte, getest en na de test naast elkaar in staande uitsneden; kop "A few other things the test changed" |
| Building it | Twee blokken: samenwerking + drie punten naast het case-01-beeld van de homepage, en een apart AI-blok met de spec | Akkoord |
| Emil-ronde | Koppen over de volle breedte met tekst en beeld bovenaan uitgelijnd; één grijs; grijs vlak bij Problem; prototype op volle grootte; kortere hover; CountUp | Akkoord, grijs wordt `#dce2e3`. Meer ruimte tussen de middelste secties. Laptop-preview bij "Next case" past niet: later een gewoon schermvullend beeld |

- **Toetsing:** in de browser op 1440px en 375px (geen horizontale scroll, geen consolefouten), typecheck. In de mobiele emulatie van de ingebouwde browser liepen geen animatieframes, dus CountUp is alleen op desktop gezien. `npm run build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 23 – Collaborative Strength: inhoud doorgenomen en eerste versie van de casepagina (17 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Inhoud | Zes onderzoeksdocumenten, de live site en Figma doorgenomen; acht vragen gesteld (resultaat, tijdlijn, invalshoek, "oud" design, namen, beeld, de 4,2, AI) | Resultaat mag eerlijk: snel genoeg klanten, bewust niet verder gepromoot naast fulltime werk, betere matches. Geen jaartal of tijdlijn. Niets over "oud" of wat ik anders zou doen: tekst over video is bewust (gevoel), knoppen en kerntekst zijn duidelijk. Stijn Schoonhof en Lorenzo Haarlo mogen genoemd worden, beelden mogen. Testers niet als bekenden neerzetten |
| Invalshoek | "Ik was mijn eigen klant": strategie vóór pixels, uitleggen in plaats van verkopen | Akkoord |
| 4,2 | Voorstel: de letterlijke testvraag noemen ("use this site or book coaching") in plaats van "hielp hun overweging", omdat dat iets anders zegt dan gevraagd | [ ] |
| AI | Uit het ontwikkelverslag: AI als mentor; logo-voorstellen van AI te generiek | Aangevuld: homepage bewust niet blindelings met AI (eigen ontwikkeling), daarna de andere pagina's en globale verbeteringen (media queries) sneller met AI |
| Pagina | `/work/collaborative-strength` in de vorm van case 01: intro + korte versie, live site in browser- en telefoonframe, feiten, Problem, Process (twee gesprekken + funnel), Decision 1 (uitleggen: vier stappen + tijdlijn), Decision 2 (Figma vóór/na feedback + drie wijzigingen), Building it (navbar en knop vóór/na uit de live site, AI-blok met logoschetsen), The test (4,2 en 6 van 6, twee vertaalde citaten), Result in de nacht. Hergebruikt `case.module.css` en `Phone` van case 01, plus `cs.module.css` | [nog te beoordelen] |

- **Beelden:** `public/images/cases/collaborative-strength/` (11 WebP's, ca. 520 KB): live screenshots met Playwright, Figma-exports via de Figma-koppeling. Het logobeeld is uitgesneden zonder de woordmerken, omdat daar "STRENTH" staat.
- **Gekoppeld:** de homepagekaart (`content/cases.ts`, `[Year]` weg) en "Next case" op case 01 linken naar de nieuwe pagina.
- **Toetsing:** typecheck; in Playwright op 1440px en 390px (geen horizontale scroll), geen consolefouten. `npm run build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 24 – Collaborative Strength: Emil-kritiek, Problem in twee kaarten, opnames van de live site (19 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Kritiek | Emil-ronde over de hele pagina, de live site en Figma: te veel tekstblokken en alles staat stil terwijl de case over interactie gaat. Voorstellen per sectie: Problem in twee kanten, funnel gekoppeld aan de gesprekken, meescrollend browserframe bij Decision 1, vergelijkingsslider bij Decision 2, Building it als drie stappen, echte opnames in plaats van foto's, StatTile bij de test, Result in twee kaarten | Eerst Problem, daarna de opnames |
| Problem | Twee kaarten (The athlete / My coaching) met een vergelijking "Most plans" tegenover "Mine", lampje aan bij mijn manier; idee uit de Geen/Wel-kaartjes in Figma | [nog te beoordelen] |
| Opnames | Ik vroeg om agent-browser van Vercel (`record`). Drie opnames van de live site op 1440×900, 60 fps: menu (bijgesneden tot de navigatie), knop-hover (met cursor), A–D-stappen (opnieuw opgenomen, eerst te snel gescrold). Als mp4 met stilstaand beeld in `Clip.tsx`: speelt zonder geluid in een lus zolang hij in beeld is, pauzeknop van 44px, met reduced motion stil tot je op play drukt | Akkoord om ze op de pagina te zetten |

- **Beelden:** `clip-menu`, `clip-button`, `clip-steps` (.mp4 + .jpg, samen ca. 2,5 MB). De oude stills `nav-top`, `nav-scrolled`, `button-rest`, `button-hover` en `approach` worden niet meer gebruikt.
- **Toetsing:** typecheck; ingebouwde browser op 1440px (spelen, pauzeren, buiten beeld pauzeren, titels op één lijn) en agent-browser met reduced motion en op 375px (geen horizontale scroll). `npm run build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 25 – Collaborative Strength: de rest van de Emil-kritiek verwerkt (19 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Decision 2 | Vergelijkingsslider (`Compare.tsx`) op de bovenkant van het eerste en het laatste homepage-ontwerp, rechtstreeks uit Figma geëxporteerd (`slider-before/after.webp`, 1440×1200). Twee pins op het ontwerp na feedback, met dezelfde genummerde callouts als case 01. Slepen of pijltjestoetsen; bij de eerste keer in beeld schuift de lijn één keer kort heen en weer (niet met reduced motion) | [nog te beoordelen] |
| Decision 1 | `ServicesScroll.tsx`: het browserframe blijft staan terwijl de dienstenpagina erin meescrolt; de vijf diensten (posities gemeten in Figma) lichten ernaast één voor één op. Op mobiel, met reduced motion en zonder JS de hele pagina als beeld en alle diensten aan | [nog te beoordelen] |
| Building it | Drie genummerde stappen op een lijn: met de hand → verbeterd met AI → terug naar mijn AI-workflow | [nog te beoordelen] |
| Process | De losse zin wordt de overgang naar de funnel, met een rond pijltje omlaag; "The website" licht op als de stap waar de case over gaat. Bewust niet gedaan: elk citaat aan een funnelstap koppelen, omdat dat iets beweert wat niet bevestigd is | [nog te beoordelen] |
| The test | `StatTile` van case 01 voor 6 van 6; 4,2 als vijf blokjes waarvan het laatste voor een vijfde gevuld | [nog te beoordelen] |
| Result | Twee kaarten (Enough clients / The right ones), met het licht van de lamp op de bovenrand | [nog te beoordelen] |

- **Niet meer gebruikt:** `figma-before.webp`, `figma-after.webp` en de vijf oude stills uit stap 24.
- **Toetsing:** typecheck en `npm run build` (compileert; de build meldt een bekende kwetsbaarheid in de geïnstalleerde Next.js-versie). Op 1440px in de ingebouwde browser en agent-browser; met agent-browser ook reduced motion en 375px (geen horizontale scroll). `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 26 – Collaborative Strength: hero als schermvullende rondgang over de live site (19 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Hero | Ik wilde geen browser- of telefoonmockup (die past bij case 01, die alleen voor telefoon is), maar het scherm zelf. Opname met agent-browser op 1440×900, 60 fps: hover op de hero-knop, vloeiend scrollen (requestAnimationFrame) langs de vraag, A–D, Diensten, de foto's, Over mij en de footer, en terug naar boven zodat de lus aansluit. 30 s, 47–60 unieke frames per seconde tijdens het scrollen, 5,7 MB | Akkoord |
| Link | "Visit the live site" weg; de video zelf is de link. Bij hover dimt hij en komt "View website" naast de pointer, met `CaseCursor` van de homepage (label nu via `data-cursor`). Op touch staat "View website ↗" in de hoek. Pauzeknop staat buiten de link | Akkoord |

- **Niet meer gebruikt:** `hero-desktop.webp`, `hero-mobile.webp`.
- **Toetsing:** typecheck; agent-browser op 1440px (speelt, hover-label "View website", homepage nog "View case") en 375px met reduced motion (staat stil, geen horizontale scroll). Echte touch niet getest. Niet gecommit.
- **Tijd:** [invullen]
- **Bijgesteld (19 nov):** de hero is half zo hoog en bovenaan uitgelijnd (menu in beeld). Ik vond dat de opname stopte en weer verder ging; opnieuw opgenomen als één doorlopende, langzame scroll van 24 s (sinus-easing, alleen stil bij de hero), met de pointer stil zodat Diensten en Over mij oplichten als ze eronder door schuiven. Alleen de bovenste helft bewaard (1440×450), laatste 0,8 s vloeit over in het begin: 26 s, bijna overal 60 unieke frames per seconde, 3,3 MB.
- **Bijgesteld (19 nov), Decision 1 en 2:** bij Decision 1 staan de kop en de tekst rechts, het venster is hoger, de dienstenlijst met oplichten is weg ("dat zien mensen zelf") en het bijschrift noemt Figma niet meer. Decision 2 volgt dezelfde opzet gespiegeld: tekst links, rechts de slider, die nu beide hele homepage-ontwerpen laat meescrollen (`design-first/after.webp`, uit Figma). Pins en nummers weg; de twee wijzigingen heten nu "Two examples of what changed". Beide gebruiken `ScrollStage.tsx` (vervangt `ServicesScroll.tsx`). `slider-before/after.webp` worden niet meer gebruikt.
- **Bijgewerkt (19 nov), typfout "STRENTH":** ik heb de typfout op de live site en in Figma verbeterd en de site uitgebreid (pop-up gratis schema, echte blogposts). De vier opnames (hero-rondgang, menu, knop, A–D) zijn opnieuw gemaakt op dezelfde manier; de stappen nu vanaf hoger op de pagina, zodat het uitvouwen in beeld is. `design-first`, `design-after` en `services` opnieuw uit Figma geëxporteerd. Nog open: in `powerlifting-laptop.png` (homepagekaart en "Next case" op case 01) staat nog "powerlifing".

### Stap 27 – Moraira Dream Villas: casepagina, alleen inhoud (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Context | Alle documenten in `~/Downloads/moraira docs/`, het drukwerk in `~/Downloads/spaans nummer/` en de Figma-pagina "moraira" gelezen. Voorstel: het verhaal draait om één strategische keuze (de gasten buiten de schoolvakanties winnen, geen zeeblauw in het palet) en elke ontwerpkeuze hangt aan een van de twee doelen van de eigenaar | Akkoord. Aangevuld: 21% direct vooraf (op de pagina "about 20%"), betaald freelancewerk zonder jaar, logo bestond al, alles mag getoond worden, testers onbekend, AI voor inspiratie, transcripties, copy en kwaliteitscontrole |
| Opbouw | Intro (kernzin met 70%) → Problem (twee doelen) → Where it started (audit) → Decision 1 (sell the village) → Decision 2 (reasons to book direct) → Beyond the screen (bord en visitekaartje) → How I worked (homepage eerst, AI, overdracht) → Result (both goals met) | [nog te beoordelen] |
| Kritisch op claims | Zelf teruggedraaid: "every section ends in one orange button" (klopt niet), "the old site said it all in paragraphs" (de audit prees juist de villapagina's), "empty in spring, autumn and winter" (in de winter huren gepensioneerden maanden), "A/B test" en aantallen testers. QR-code op bord en kaart uitgelezen: leidt naar de eigen site | [nog te beoordelen] |
| Figma | Tikfouten verbeterd ("mediterranian", "boookings", ook "beautifull"); de hero-kop paste daarna niet meer op twee regels, het tekstvak is breder gemaakt (1149 → 1300) | [nog te beoordelen] |

- **Beelden:** `public/images/cases/moraira/` (homepage in stukken, villalijst, insider tips, bord, visitekaartje voor- en achterkant), uit Figma en de drukbestanden. `card-front.webp` staat er ook, maar wordt nog niet gebruikt.
- **Ook aangepast:** de homepagekaart linkt naar `/work/moraira` ("Moraira Dream Villas · Freelance") en "Next case" op Stuurmen linkt ernaartoe.
- **Toetsing:** typecheck; ingebouwde browser op desktop en 375px (geen horizontale scroll, alle beelden laden, geen consolefouten). Vormgeving en animatie bewust nog niet gedaan. `npm run build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]
- **Bijgewerkt (23 nov), hero met video:** ik had destijds een video gemaakt als achtergrond voor de hero, maar kreeg die niet in Figma. Nu staat het ontwerp in twee lagen op de pagina: de video (bijgesneden tot de hero, 1440 breed, zonder geluid, 3,4 MB, `hero.mp4` + `hero.jpg`) en daarover de Figma-export zonder foto (`hero-layer.webp`). Doorzichtig gemaakt door de hero één keer op zwart en één keer op wit te exporteren en de transparantie daaruit te berekenen; de donkere laag van 50% uit Figma blijft zo intact. Figma is daarna teruggezet. `HeroVideo.tsx`: speelt in een lus zolang hij in beeld is, pauzeknop van 44px, met reduced motion stil tot je op play drukt. In Decision 1 een zin dat de video het hele dorp laat zien, niet één strandfoto. `home-top.webp` wordt niet meer gebruikt. Getest in de ingebouwde browser: speelt, pauzeert en hervat, geen consolefouten.

### Stap 28 – Moraira Dream Villas: kritiek als recruiter en Problem vormgegeven (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Kritiek | Als scannende recruiter: na Problem drie rijen tekstkolommen achter elkaar (doelen, bevindingen, gasten) zonder beeld, daar haakt de lezer af. "Where it started" is de saaiste sectie. Verder: de draad "elke keuze hangt aan een doel" is onzichtbaar, "geen zeeblauw" staat begraven in een alinea, Result is te klein voor de payoff, "about 20%" staat in lopende tekst, de uitsneden in Decision 2 zijn te klein, het bord is afgesneden op "Holiday renta", "three layouts" wordt beloofd maar er is er één te zien | [nog te beoordelen] |
| Problem | Elk doel een eigen beeld op een grijze plaat, met het label "Goal 1/2" (zodat de decisions er later naar kunnen verwijzen). Doel 1: een jaar als 52 weken waarin alleen de gebruikelijke schoolvakanties oplichten (kerst, Pasen, zomer, herfst; schematisch, uit de kalender, geen boekingsdata). Doel 2: één balk met ongeveer 20% direct, de rest Booking.com, bewust stil: dezelfde balk vult zich in Result tot 70% | Akkoord met het voorstel ("Ja, bouw het"); algemene vakantiekalender zonder getallen |
| Beweging (Emil) | De vakanties gaan één keer aan als de strip in beeld komt, met de flikkering van de lampjes op de homepage (420 ms). De eerste versie liet de vakanties 140 ms na elkaar aangaan; na de Emil-review gaat het per vakantie 100 ms na elkaar, en binnen een vakantie gaan de weken 25 ms na elkaar aan, zodat de zomer van links naar rechts aanspringt. Met reduced motion of zonder JS staan de vakanties meteen aan | [nog te beoordelen] |

- **Bestanden:** `app/work/moraira/visuals.tsx` (`YearStrip`, `DirectBar`) en `mo.module.css`, het eigen stijlbestand van deze case. De tekst is niet veranderd.
- **Toetsing:** typecheck; ingebouwde browser op desktop en 375px (geen horizontale scroll, geen consolefouten, strip gaat aan bij in beeld komen). Reduced motion niet nagebootst in de browser, alleen in de code nagelopen. `build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 29 – Moraira Dream Villas: Where it started vormgegeven (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Bevindingen | Niet nog een rij van drie kaarten, maar één kort rapport: genummerde regels (01–03) met de bevinding links en de toelichting rechts, tussen dunne lijnen. Tekst ongewijzigd. Op een telefoon staat de toelichting onder de bevinding | [nog te beoordelen] |
| Visueel moment | De kop zegt "an audit that turned into a redesign", dus het beeld laat de opdracht groeien: vier vlakken op een rij onder twee haken, "Asked for" (de audit, donker) en "What it turned into" (brand, website design, print). Bij het scrollen schuiven de drie nieuwe vlakken één voor één uit de audit (scroll-driven, met clip-path). Zonder ondersteuning of met reduced motion staan ze er gewoon. De korte regels op de vlakken komen uit de bestaande tekst. Op een telefoon twee bij twee, de haken vallen weg en "Asked for" / "Then" staat op de vlakken zelf | [nog te beoordelen] |
| Beweging (Emil) | Gekoppeld aan het scrollen, dus lineair (geen easing op een scroll-tijdlijn); alleen clip-path, translate en opacity; de tweede haak fadet mee met het eerste nieuwe vlak | [nog te beoordelen] |

- **Toetsing:** typecheck; ingebouwde browser op desktop en 375px (geen horizontale scroll, geen consolefouten, de vlakken schuiven in bij scrollen). `build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 30 – Moraira Dream Villas: Decision 1 vormgegeven (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Gasten | De drie gasten houden hun kolommen, maar gaan "aan": bij het scrollen trekt over elke gast een oranje lijn, één voor één (scroll-driven, standaard staan ze aan) | [nog te beoordelen] |
| Palet | Het visuele moment van de sectie: het palet als hoge stalen zoals in een brandguide, met een zesde plek voor zeeblauw. Bij het scrollen komen de vijf kleuren één voor één op; zeeblauw komt vol binnen als een echte optie, loopt dan leeg en wordt doorgestreept ("Sea blue / Left out"). Daaronder de drie alinea's in twee kolommen (tekst ongewijzigd). Op een telefoon drie bij twee | [nog te beoordelen] |
| Insider tips | De Insider tips-pagina scrolt in een browservenster naast de tekst (ScrollStage uit case 02, hergebruikt, geen nieuw bestand). De homepage-uitsnede met dezelfde tips staat er klein onder, met het bijschrift "On the homepage: the same tips, one scroll away from the villas." (de twee oude bijschriften samengevoegd) | [nog te beoordelen] |
| Fouten onderweg | Stalen eerst onzichtbaar (inline span zonder `display: block`); de doorstreping eerst als gedraaide lijn, die naast de staal uitkwam, en daarna als SVG met non-scaling stroke, wat stippels gaf. Nu een SVG-lijn van hoek tot hoek | — |

- **Toetsing:** typecheck; ingebouwde browser op desktop en 375px (geen horizontale scroll, geen consolefouten). `build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 31 – Moraira Dream Villas: Decision 2 vormgegeven (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Opbouw | Kop en lead blijven boven; daaronder scrolt de homepage (vertrouwen → combideals → featured villas, de drie bestaande uitsneden onder elkaar) in een browservenster, met de drie redenen ernaast. De reden waarvan het stuk in het midden van het venster staat licht op (oranje lijn, volle kleur); de andere zijn gedimd. Op een telefoon, met reduced motion of zonder JS staan alle drie aan en staat de homepage als één beeld. Tekst ongewijzigd, wel genummerd 01–03 zoals het rapport | [nog te beoordelen] |
| Kaart | Bij de combideals gaan op de vier villa's op de kaart lampjes aan, kort na elkaar met de flikkering van de homepage, zodra de kaart in beeld is, en ze blijven daarna aan. De lampjes liggen over de bestaande pins (geen nieuwe export uit Figma) | [nog te beoordelen] |
| Hergebruik | `ScrollStage` (case 02) heeft er een optie bij: delen van de pagina (`data-scroll-mark`) en stappen in de tekst (`data-scroll-step`) krijgen `data-active`. Zonder die attributen verandert er niets; case 02 gecontroleerd. Op laptopbreedte (tot 1280px) krijgt de tekstkolom hier meer ruimte (2 : 3), anders paste de lijst niet in het scherm | [nog te beoordelen] |
| Fouten onderweg | Het venster was even leeg tijdens het schuiven (lazy loading): de drie beelden laden nu meteen | — |

- **Toetsing:** typecheck; ingebouwde browser op desktop (1024) en 375px, geen horizontale scroll, geen consolefouten; Collaborative Strength laadt zonder fouten. Breed scherm (1440) niet bekeken. `build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 32 – Moraira Dream Villas: Beyond the screen vormgegeven (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Objecten | Bord en visitekaartje (voor- en achterkant; `card-front.webp` wordt nu gebruikt) als drukwerk op tafel: elk iets gedraaid, met een echte schaduw (contactschaduw en zachte schaduw van boven), de kaartjes overlappen het bord rechtsonder. Het bord is niet meer afgesneden. Op een telefoon het bord boven en de twee kaartzijden naast elkaar | [nog te beoordelen] |
| Lijnen | Vanaf de QR-code op het bord en die op de achterkant van het kaartje loopt een oranje lijn naar één label: "Both QR codes lead to / Their own website, not a platform" (uit de lead). Op een telefoon geen lijnen, het label als tekst onder de objecten. De bijschriften van bord en kaart staan eronder, tekst ongewijzigd | [nog te beoordelen] |
| Beweging | Scrollend worden de drie objecten één voor één neergelegd (van iets boven en groter naar hun plek), daarna lopen de lijnen naar het label. Standaard: alles ligt er en de lijnen staan | [nog te beoordelen] |
| Fout onderweg | De `animation`-shorthand zette de eigen `animation-range` per object terug, waardoor alles even half doorzichtig bleef; de ranges staan nu met hogere specificiteit. De andere scroll-animaties van deze case nagelopen: daar staan shorthand en range in één regel, dus geen last van | — |

- **Toetsing:** typecheck; ingebouwde browser op desktop (1024) en 375px, geen horizontale scroll, geen consolefouten. `build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 33 – Moraira Dream Villas: How I worked vormgegeven (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Route | De werkwijze als vijf haltes op één lijn onder twee haken: "My part" (homepage first → presented → the other pages → handed over, oranje lampjes en een doorgetrokken lijn) en "Another developer" (built in WordPress, open stip, gestippelde lijn = de overdracht), zoals de overdracht bij Stuurmen. De korte regels komen uit de tekst van de sectie; het losse overdrachtsblok is nu de zin onder de route (tekst ongewijzigd). Scrollend loopt de lijn van halte naar halte en flikkeren de lampjes aan. Op een telefoon verticaal | [nog te beoordelen] |
| AI | De vier toepassingen als vier tegels (twee bij twee) naast de tekst, genummerd in de volgorde van het project; over elke tegel trekt na elkaar een oranje lijn | [nog te beoordelen] |
| Drie layouts | Voorstel was de drie villakaart-varianten uit Figma (groepen 2096:4865, 4896, 4912, 4928). Bij het openen bleken dat de foto's met de verticale icoonstrook van de vier villa's in de definitieve layout te zijn. Daarna de pagina doorzocht: drie versies van de villalijst (2096:1099, 2096:1304, 2096:3620; de laatste is de basis van de definitieve 2096:4646). Van elke versie dezelfde villa uitgesneden (Luces del Mar; bij Maravilla Solar waren in versie 3 de punten leeg) als `villa-layout-1/2/3.webp`. Op de pagina drie naast elkaar, de winnaar met een oranje ring en "Came out on top"; bij het inscrollen stappen de andere twee terug. Versie 1 en 2 lijken op kaartniveau bijna gelijk. `villas.webp` (de hele lijst) wordt niet meer gebruikt | Bevestigd: dit zijn de drie layouts |

- **Toetsing:** typecheck; ingebouwde browser op desktop (1024) en 375px, geen horizontale scroll. Niet gecommit.
- **Tijd:** [invullen]

### Stap 34 – Moraira Dream Villas: Result vormgegeven (23 nov)
| Onderdeel | Wat AI voorstelde of bouwde | Wat ik besliste |
|---|---|---|
| Doelen gehaald | De twee doelen uit Problem komen terug als twee kaarten in het licht van de lamp, met "Goal 2 · Met" en "Goal 1 · Met". Direct boeken gaat voor, want daar hoort het getal bij (breder) | [nog te beoordelen] |
| 20% → 70% | Dezelfde balk als in Problem, nu in lamplicht: zodra hij in beeld komt, vult hij van ongeveer 20% naar 70% en telt het grote getal mee (1,4 s, sterke ease-out, requestAnimationFrame). Een dun streepje blijft op 20% staan ("Was about 20%"). Met reduced motion of zonder JS staat er meteen 70%. Het getal is verborgen voor schermlezers, de balk zegt het in één zin; de kop "70% direct" staat er onzichtbaar bij. Tekst eronder ongewijzigd | [nog te beoordelen] |
| Jaarstrip terug | Bewust niet gedaan: er is geen data over welke weken nu voller zijn, dus een strip met "meer weken aan" zou een verzonnen grafiek zijn. "Much fuller" blijft tekst | [nog te beoordelen] |

- **Toetsing:** typecheck; ingebouwde browser op desktop (1024) en 375px, geen horizontale scroll, geen consolefouten, de teller eindigt op 70%. Reduced motion niet in de browser nagebootst. `build`, `audit` en `keyboard` niet gedraaid. Niet gecommit.
- **Tijd:** [invullen]

### Stap 35 – Moraira Dream Villas: checks over de hele case (23 nov)
- **Build:** geslaagd. Next.js stopte de build twee keer met een melding over een bekende kwetsbaarheid in de geïnstalleerde versie (16.4.3); bij opnieuw draaien ging hij door. Niet geüpgraded.
- **Audit (eerste ronde):** axe desktop 1 fout: de gedimde redenen in Decision 2 (opacity 0,45) haalden het contrast niet (2,2–2,9:1). Opgelost: wachtende redenen worden `--muted` (≥ 4,5:1) in plaats van doorzichtig, en zolang er nog geen reden actief is, staan ze alle drie aan. Ook de `loading="eager"` op de beelden in het venster teruggedraaid (concurreerde met de LCP op mobiel).
- **Audit (na de fix):** axe desktop 0, mobiel 0. Lighthouse desktop 100/100/100/100, mobiel Performance 91 (LCP 3,5 s; het LCP-element is de h1 van de case, dus tekst en geen beeld), Accessibility 100, Best Practices 100. SEO 63 door de `noindex`. Eén meting, niet herhaald.
- **Keyboard:** 12 tabstops, focus overal zichtbaar, alles 44px hoog behalve de tekstlink "How I use AI" in de lopende tekst. De canvascheck aan het eind hoort bij versie J en zegt hier niets.
- **Reduced motion (Playwright):** jaarstrip direct aan, ScrollStage staat stil, teller staat op 70%, zeeblauw in de eindstand, geen lopende animaties, video gepauzeerd.
- **Niet getest:** 1440px in de browser bekeken (alleen via de audit), Safari, Firefox, echte telefoon.

### Stap 36 – Moraira Dream Villas: feedback op de vormgeving (23 nov)
| Onderdeel | Mijn feedback | Wat AI aanpaste |
|---|---|---|
| Kaart (Decision 2) | De lampjes met flikkering over de pins zijn dubbelop | Weggehaald (pins-data, overlay en CSS); de kaart staat er zoals in het ontwerp |
| Beyond the screen | Lead kort houden, maar uitleggen dat het bord bij de villa's mijn voorstel was en dat ik ze daarom mocht maken | Nieuwe lead: "I suggested a sign at each villa, so anyone walking past can scan its QR code and book on their own website, not on a platform. The owner liked the idea and let me design the signs, and business cards in the same look." |
| How I worked | Layout 1 en 2 zijn exact hetzelfde: toon alleen layout 1 en de winnaar | Twee naast elkaar (layout 1 en "Came out on top"); `villa-layout-2.webp` verwijderd. In de zin erboven "three layouts" → "a few layouts", zodat tekst en beeld kloppen |

- **Toetsing:** typecheck; ingebouwde browser op desktop, geen consolefouten. Niet gecommit.

### Stap 37 – Moraira Dream Villas: de hero opent alle pagina's van het ontwerp (23 nov)
| Onderdeel | Wat ik vroeg | Wat AI bouwde |
|---|---|---|
| Hover | Bij de video "View designs" bij de muis, zoals "View website" bij de andere cases | De hele hero is een knop met `data-cursor="View designs"` (CaseCursor) en dezelfde hover als het flowchart bij Stuurmen: iets donkerder en een fractie ingezoomd. De pauzeknop staat ernaast, niet erin. De beschrijving van de hero staat voor schermlezers in een verborgen alinea, de knop heet "View all pages of the website design" |
| Viewer | Alle Figma-pagina's fullscreen, links-rechts doorklikken als carrousel, en scrollen | `DesignViewer.tsx`: een modale `<dialog>` in de nachtkleuren met de zes definitieve pagina's (Home, Villas, Villa, About Moraira, Insider tips, Contact; Figma 2096:4409, 4646, 4945, 5179, 5290, 5404, als webp van 1440 breed in `public/images/cases/moraira/pages/`). Eén pagina per scherm, die op zichzelf scrolt; vorige/volgende met knoppen van 44px, pijltjestoetsen, swipe of trackpad (scroll-snap). Bovenaan de paginanaam en "2 / 6". Escape of het kruisje sluit, de focus gaat terug naar de hero, de pagina erachter scrolt niet mee. Beelden laden pas bij openen. Met reduced motion geen inzoom en geen soepel schuiven |

- **Let op:** op de Villa-pagina staat "Available from 1 July 2025" en een kalender van juni 2025. Dat is een jaartal in het ontwerp; niet aangepast in Figma (alleen tikfouten mocht ik zelf oplossen). Het brandbook staat niet in de viewer.
- **Toetsing:** typecheck; ingebouwde browser op desktop (hover, klik, pijltje, scrollen, knoppen, Escape, focus terug) en 375px. Niet gecommit.
- **Bijgewerkt (23 nov), hover:** de eerste hover schaalde het hele frame buiten de knop uit, waardoor de donkere laag en de rand niet meer klopten. Nu precies als de hero van case 02: de knop knipt af (`overflow: hidden`), alleen de inhoud leunt vanaf de bovenkant 3% naar voren en de donkere laag ligt er strak overheen. Op touchscreens staat "View designs" als label linksboven, zoals "View website" bij case 02. Met reduced motion geen zoom.
