# Verkenning stap 1 – Referenties analyseren (26 okt 2026)

Alle zeven sites zijn echt bekeken in de browser (1024×768, twee ook op 375×812). Per site is gemeten: lettertypes, kleuren, paginalengte, techniek (framework, scroll-library, canvas/video) en wat er gebeurt bij laden, scrollen, hoveren en paginawissels. Screenshots staan lokaal in `screenshots/referenties/` (niet in git).

---

## 1. Belle Duffner – belleduffner.com
*Wat jij noemde: simpele flow voor recruiters + persoonlijkheid via doodles; sterke diagrammen in cases.*

| | |
|---|---|
| **Structuur** | Gecentreerde nav (Work · Craft · logo · About · Resume). Hero = één zin + knop + beschikbaarheid. Daarna meteen 6 grote cases in twee kolommen, een Craft-teaser, footer. Kort: ±5.900px. |
| **Typografie** | Serif *Exposure* (met contrast) voor de hero-zin en titels, *Apercu* 18px voor tekst. Warm wit `#FFFEFC`, bruine tekst `rgb(45,26,10)`. Geen hoofdletters: zacht en persoonlijk. |
| **Werk tonen** | Groot mockupbeeld, titel = uitkomstzin ("Building collegiate golfers' futures"), eronder "klant • type jaar". In de case: 3 resultaatcijfers, onderzoek, een **procesdiagram** (flowchart met ruiten en kaartjes), How-Might-We, lo-fi → mid-fi → final, voor/na. |
| **Beweging** | Rustig: kaarten faden in bij scroll, eigen cursor. Niets dat de inhoud tegenhoudt. |
| **Signatuurmoment** | Handgetekende doodles rond de hero, handgeschreven logo. Belangrijk: de doodles komen **terug in de cases** (zelfspot-tekening "I had no idea how to play golf"). Persoonlijkheid is één laag bovenop een heel gewone structuur. |

**Principe:** de structuur is saai op een goede manier; persoonlijkheid zit in één eigen beeldtaal die overal terugkomt, ook in het verhaal.

## 2. Aziz Khaldi – azizkhaldi.com
*Wat jij noemde: (scroll-)animaties, simpele sterke hero met 3D-object, tijdlijn-cv, secties die cool overlopen.*

| | |
|---|---|
| **Structuur** | Hero (naam klein, rol groot) → donkere sectie met gebogen bovenrand → intro die woord voor woord oplicht → about met foto → diensten → projecten → tijdlijn → marquee → footer met lokale tijd. Lang: ±14.000px. |
| **Typografie** | Eén familie, *Cabinet Grotesk*, groot maar licht (400). Kleine labels in hoofdletters met spatiëring. Lichtgrijs `#E7E7E7`, bijna zwart, limoengroen accent. |
| **Werk tonen** | 4 projecten als device-mockups in twee kolommen met een label; weinig uitleg op de homepage. |
| **Beweging** | Smooth scroll (Lenis). Woord-voor-woord reveal. Secties schuiven met een curve over elkaar (licht → donker). Tijdlijn: een verticale lijn vult zich terwijl je scrollt, een dikke groene SVG-lijn tekent zichzelf in, items komen links/rechts binnen. |
| **Signatuurmoment** | Het glazen object in de hero. **Ontdekking: dat is geen realtime 3D maar een loopende video** (`glassyObj.mp4`). Goedkoop, snel en toch veel karakter. |
| **Wat misgaat** | Tellers "YEARS OF EXPERIENCE 0+" bleven in mijn test op 0 staan. Tekst is in losse woorden/letters geknipt voor de animatie; voorgelezen wordt het "I'mAziz—aFullStackDeveloper…" (slecht voor schermlezers). De hero-tekst zelf ("Full-stack Developer, UI & UX Designer") is generiek. |

**Principe:** één consequent bewegingssysteem (lijnen die vullen, curves die overlappen) maakt van losse secties één doorlopend verhaal.

## 3. Heron AI – heronaiapp.com (door Bearplus)
*Wat jij noemde: stijl gebaseerd op een oude architectuurtekening; beelden die eerst getekend zijn en bij scrollen kleur en vorm krijgen; geen standaard hero.*

| | |
|---|---|
| **Structuur** | Laadscherm "100%" met een opstartlijst (`001 INITIALIZE CORE SYSTEM … 010 START EXECUTION`). Hero = een vel bouwtekening: lijntekening van een gebouw, oranje scanlijn, rechtsonder een **titelblok zoals op een echte bouwtekening** (TYPE / FOUNDED / FOCUS / LOCATION). De echte kop ("An AI agent that works inside your design tools") komt pas na de eerste scroll. Probleemkaarten [01]–[04] met isometrische lijntekeningen, een vastgepinde scrollsectie, een klikbare demo ("[CLICK ON VIOLATION]"). |
| **Typografie** | BT Grotesk 700 in hoofdletters, mono-labels. (Kleuren al gemeten voor versie J.) |
| **Werk/product tonen** | Beelden beginnen als lijntekening en worden bij scrollen een "render": textuur, bomen, een oranje cirkel. Het beeld vertelt wat het product doet: van tekening naar gebouw. |
| **Beweging** | Webflow + GSAP ScrollTrigger + SplitText + Lenis. Alles hangt aan scroll. |
| **Signatuurmoment** | Tekening → render. |

**Principe (de belangrijkste les van deze stap):** de stijl komt **uit het domein van de klant**. Software voor architecten ziet eruit als een architectentekening. Versie J heeft Herons *uiterlijk* overgenomen, maar niet dit *principe*: jouw domein is niet architectuur.

## 4. Shopify Editions Winter '26 – "The Renaissance Edition"
*Wat jij noemde: cool-factor in animaties en interacties, vooral de loader die SVG-lijnen inlaadt die blijven staan in de hero.*

| | |
|---|---|
| **Structuur** | Constructielijnen (rechthoeken in gulden-snede-verhouding, cirkelbogen, diagonalen) tekenen zich in op zwart. Eén rechthoek wordt het titelkader "The Ren//ssance Edition"; daarin verschijnt een puntenwolk (borstbeeld). Daarna een kleurrijk "schilderij" en per productgebied een hoofdstuk. Heel lang (±46.000px), maar een **vaste inhoudsopgave links** (Sidekick, Agentic, Online… met Romeinse cijfers) houdt het navigeerbaar. |
| **Typografie** | *Neue Montreal* bold voor koppen, een sierlijke serif-italic voor sfeerregels, papieren scheurranden als overgang. |
| **Beweging** | 300+ SVG-lijnen, canvas, 12 video's. |
| **Signatuurmoment** | De loader is geen wachtscherm maar **het begin van de compositie**: wat geladen wordt, blijft staan als raster en kader. Eén concept (Renaissance) stuurt beeld, typografie en zelfs de nummering. |

**Principe:** een laadmoment dat iets opbouwt en blijft staan voelt als vakmanschap; een laadmoment dat verdwijnt voelt als wachten.
**Opvallend voor jou:** constructielijnen + puntenwolk ligt heel dicht bij jouw deeltjesveld.

## 5. Kigo Studio – kigo.studio
*Wat jij noemde: Japanse tekeningen verwerkt terwijl de stijl één geheel blijft; rustig kleurenpalet.*

| | |
|---|---|
| **Structuur** | Hero: inkttekening van een kale tak die tijdens het laden **opbloeit** tot bloesem, berg op de achtergrond, kop "MAKE YOUR WEBSITE *cool*" waarbij het laatste woord wisselt (cool / profitable / automatic). Klanten, diensten, werk, team. |
| **Typografie** | Eigen *Kigo Display* (smal, vet, hoofdletters, zeer strak: −0.065em), een *italic* variant voor het wisselwoord, een penseelfont, Poppins voor tekst. Gebroken wit, inktzwart, karmijnrood `rgb(214,40,40)`, roze, gedempte bruin/groentinten voor tekst. |
| **Werk tonen** | Kaarten in verspringende kolommen: foto, "KLANT: PROJECT", één zin, drie tags, een rood stempel (押, hanko) per kaart. Een draak kronkelt tussen de kaarten door. |
| **Signatuurmoment** | De illustratie is de lijm: ze loopt door de secties heen, ook tussen het werk. Eén bron (Japanse inkt) heel consequent. |
| **Let op** | Overal percentages ("+20% faster", "+23% leads") zonder bron. Precies wat wij niet doen. |

**Principe:** één beeldbron, strikt toegepast (stempel als markering, inkt als overgang), maakt rijke illustraties rustig in plaats van druk.

## 6. Carter Ogunsola – carterogunsola.com/studio
*Wat jij noemde: animaties bij het wisselen van pagina; cursor die de achtergrond laat vervormen.*

| | |
|---|---|
| **Structuur** | Laadteller (78 → 100), dan valt een 3D-badge aan een keycord naar beneden en slingert na. Bovenin een statusbalk in mono: lokale tijd, FPS, aantal bezoekers online, LCP, uptime. **Live cursors van andere bezoekers** met namen, meldingen "Someone joined · 84 online", ⌘K-menu, thema-schakelaar. Home = één project tegelijk (N°01 / 17). |
| **Typografie** | *Oracle* (sans) + *PP Neue Montreal Mono*. Donker `#1E1E1E`. |
| **Beweging** | Paginawissel = een golvende, papierachtige vlak (WebGL) dat over het scherm trekt. 6 schermvullende canvassen tegelijk. Beelden hebben gebogen randen (lensvervorming) die meebewegen met de muis; in stilstaande screenshots lastig vast te leggen. |
| **Signatuurmoment** | De site voelt als een levend systeem (live data, andere bezoekers). |
| **Risico** | Op de homepage staat nauwelijks wie hij is of wat hij doet; 17 projecten één voor één doorklikken past niet bij een recruiter met twee minuten. Zwaar voor de browser. |

**Principe:** overgangen tussen pagina's zijn een kans om continuïteit te tonen in plaats van een witte flits; en de site zelf als technisch bewijsstuk (statusbalk met LCP/FPS).

## 7. Mike Wilcock – mikewilcockdesign.com
*Wat jij noemde: de cursor die verandert (bijv. naar "View" bij projecten) en de projectshowcase.*

| | |
|---|---|
| **Structuur** | Mono-regel "(PORTFOLIO / ©2026) · CREATIVE DEVELOPER · MANCHESTER, UK", naam enorm, één zin over wat hij doet, "↓ SCROLL, GENTLY" en "SEE THE WORK →". Marquee met diensten. |
| **Typografie** | *Archivo* (smal, vet) voor de naam, **Geist Mono** voor labels (zelfde als versie J). Bijna zwart `#111010`, warm wit `#EDEAE4`, periwinkle-accent. |
| **Werk tonen** | "SELECTED WORK (04)" met een **(PAUSE MOTION)-knop**. Lijst van 4 grote rijen: nummer, naam, jaar, type, "VIEW PROJECT →". Rechts een vast kader met een groot nummer en teller (02 / 04) + voortgangsbalk. Daarna een horizontale strook "(UP CLOSE) DRAG OR SCROLL" met mobiele en detail-shots. |
| **Beweging / cursor** | Op een projectrij: titel wordt accentkleur, de cursor wordt een grote schijf met "VIEW", en een gekantelde preview van het project volgt de muis. |
| **Signatuurmoment** | De cursor als label dat zegt wat een klik doet. |
| **Mobiel** | Geen cursor op touch, dus het signatuurmoment valt weg. In mijn test stond na 5 s alleen de knop in beeld, de naam nog niet. |

**Principe:** een lijst is de snelste manier om werk te scannen; de cursor-preview geeft hem toch beeld en karakter.

---

## Gemene deler: wat jij mooi vindt

1. **Eén idee stuurt de hele vormtaal.** Heron = bouwtekening, Kigo = Japanse inkt, Shopify = Renaissance, Belle = doodles. De stijl volgt uit een concept, niet uit losse decoratie.
2. **Iets wordt gemaakt terwijl je kijkt.** Vijf van de zeven: Heron (lijn → render), Shopify (constructielijnen → beeld), Kigo (kale tak → bloesem), Aziz (lijn tekent zichzelf in), Carter (badge valt, papier trekt over). Dit is het sterkste patroon in jouw keuze.
3. **Continuïteit in plaats van losse blokken.** Wat laadt blijft staan (Shopify), illustratie loopt door secties (Kigo), secties schuiven in elkaar (Aziz), pagina's gaan in elkaar over (Carter).
4. **Interactie die iets betekent.** De cursor zegt "View" (Mike), vervormt het beeld (Carter). Niet alleen versiering.
5. **Daaronder een simpele structuur met een nummersysteem.** Eén zin → werk. Mono-labels, nummering en tellers (Mike 02 / 04, Heron [01], Shopify I–XI).
6. **Rustige basis + één accentkleur.** Heron oranje, Kigo rood, Mike periwinkle, Aziz limoen.

## Wat daarvan past bij jouw doel en doelgroep

**Past sterk**
- **"Van schets naar werkend product" als transformatie.** Patroon 2 is letterlijk jouw verhaal: *researches, designs and builds, from real problem to live product.* Als we Herons principe (stijl uit het domein) op jóu toepassen, is jouw domein: notities → schets → wireframe → UI → code → live. Dat is een eigen idee in plaats van een geleende stijl.
- **Belles flow en cases**: één zin, meteen werk, uitkomst als titel; onderzoek zichtbaar maken met diagrammen. Dat is precies waar bedrijven op selecteren (zichtbare beslissingen, onderzoek).
- **Mikes werklijst met cursor-preview**: vier cases zijn in één oogopslag te scannen, met toch karakter. Plus een pauzeknop voor beweging.
- **Een opbouwmoment dat blijft staan** (Shopify), mits het binnen ±1 seconde klaar is en de tekst nooit blokkeert.

**Past niet, of alleen met maat**
- Eén project tegelijk / 17 projecten (Carter): te traag voor een scan van twee minuten.
- Heel lange pagina's (Aziz 14.000px, Shopify 46.000px) zonder snelle weg naar het werk.
- Animaties die de eerste inhoud vertragen. Belle en Mike toonden op mobiel na 3–5 s nog een (bijna) leeg eerste scherm.
- Tekst in losse letters zonder toegankelijke tekst (Aziz, Carter); tellers die op 0 blijven staan.
- Ongefundeerde cijfers (Kigo). Bij ons alleen echte of `[ ]`-placeholders.
- **Effecten die alleen met een muis bestaan.** Het signatuurmoment moet ook op een telefoon werken; de cursor is een extraatje voor desktop.

## Voorzet voor stap 2
Jouw deeltjesveld draagt het idee "van probleem naar live" al in zich (wolk → bol → kubus → lagen → ring), maar het blijft abstract: een recruiter ziet stipjes, geen werk en geen vakmanschap. De referenties laten zien dat de transformatie het sterkst is als ze **iets herkenbaars** opbouwt (een gebouw, een bloesem, een borstbeeld). Dat nemen we mee in de critique.
