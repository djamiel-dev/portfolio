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
