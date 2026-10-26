# Verkenning stap 2 – Critique versie J (26 okt 2026)

Method: dual-agent (A: ontwerpreview · B: detector + browser), samengevoegd en op kernpunten nagemeten in de code.
Doel: versie J eerlijk toetsen aan de principes uit `01-referenties.md` en aan het primaire gebruik (recruiter via sollicitatiemail).

## Oordeel over eigenheid (begin hier)

**Uitwisselbaar. Een geleende huls met één moment dat half van jezelf is.**

- **Van Heron:** alle kleurtokens, grotesk in hoofdletters, Geist Mono-labels, `[01]`-nummering, `+` op de hoeken, 1px-kaders, de gestippelde lijn onder de kaartkop en de knop met apart oranje pijlvak.
- **Van Belle:** het hele skelet: gecentreerde nav met logo in het midden, één zin + één knop, verspringende tweekoloms grid, uitkomstzin als kaarttitel.
- **Van Aziz:** de donkere footer met gebogen bovenrand.
- **Van jezelf:** het deeltjesveld dat Problem → Live morpht, met het meekleurende woord in de zin. Dat is het enige echte idee op de pagina. Maar de vormen (wolk, bol, kubus, lagen, ring) zijn standaard generatieve tech-vormen die elke AI-startup zou kunnen gebruiken. Er wordt niets herkenbaars gebouwd.

Test: vervang "DJAMIEL" door de naam van een willekeurige AI-startup en de pagina werkt ongewijzigd. Het is precies de les uit stap 1: Herons uiterlijk is overgenomen, Herons principe (stijl komt uit het domein) niet.

**Automatische detector:** 0 bevindingen in de code. In de browser (B):
- desktop 2 meldingen: *overused-font* (Geist Mono = 62% van de tekst) en *cream-palette* (`#F5F5EE`);
- mobiel nog 2 meldingen: *unbalanced-heading* (titel kaart 04 breekt met een restje van 21%) en *straggler* ("call." alleen op de laatste regel van de footerzin).

De eerste twee zijn bewuste tokenkeuzes, dus technisch vals alarm. Ze bevestigen wel het oordeel hierboven: het palet en het mono-font zijn juist de geleende delen. De mobiele twee zijn echt (op te lossen met `text-wrap: balance/pretty`). De detector zag geen ontwerpproblemen die de review miste; de review zag veel wat geen detector kan zien.

## Score (Nielsen)

| # | Heuristiek | Score | Belangrijkste punt |
|---|---|---|---|
| 1 | Zichtbaarheid van status | 3 | Stap-label en voortgangsstreepjes zijn duidelijk; "Work" staat altijd als actief gemarkeerd, ook in de footer |
| 2 | Aansluiting bij de echte wereld | 3 | "AI-native" is jargon voor een recruiter; "[00] INDEX" betekent niets |
| 3 | Controle en vrijheid | 3 | Geen pauzeknop voor een animatie die 31,5 s doorloopt |
| 4 | Consistentie | 2 | `[0n]` heeft vijf betekenissen (index, stap, aantal, case, skill-label); contact heet op vier manieren anders |
| 5 | Foutpreventie | 3 | Statische pagina; placeholderlinks doen nu nog niets (ok voor nu) |
| 6 | Herkennen boven onthouden | 2 | Niets zegt dat een kaart klikbaar is behalve oranje tekst bij hover; de schuine footerlabels lijken knoppen maar doen niets |
| 7 | Flexibiliteit | n.v.t. | Eenmalige scanpagina |
| 8 | Esthetisch en minimaal | 3 | Rustig, maar op 1440×900 is ±85% van het eerste scherm lege canvas en is er geen werk te zien |
| 9 | Herstel na fouten | 3 | Niets om van te herstellen |
| 10 | Hulp | n.v.t. | Portfolio heeft geen hulp nodig |
| **Totaal** | | **22/32 (69%)** | **Acceptabel**, net onder Goed |

**Cognitieve belasting:** 3 van 8 checks falen (matig):
- **Eén focus:** een zin van 16 woorden lezen terwijl er elke 6,3 s een woord van kleur wisselt en deeltjes erboven bewegen.
- **Hiërarchie:** de zin is maximaal 38px in een kader van 44rem, en de naam staat alleen klein in de nav.
- **Weinig keuzes:** de footer heeft 8 links, waarvan 4 dubbel.

**Emotionele boog:**
- Je opent op ruis ("[01] PROBLEM", 4,6 s).
- Het hoogtepunt is de kubus na ±11 s, als de meeste recruiters al gescrold hebben.
- Het verhaal eindigt op de zwakste vorm (een platgedrukte ring).
- De pagina sluit af met een generieke bureau-afsluiter. Het einde is zwakker dan het begin.

## Wat werkt

1. **Het deeltjesveld is een echt verhaalmiddel.** De vijf stappen horen één-op-één bij de woorden in de zin. Technisch netjes: stilstaand bij reduced motion, pauzeert buiten beeld, start pas als de browser idle is. Dit is het zaadje van het goede idee.
2. **Gedisciplineerde basis.** Eén accent, strak lijnsysteem, zichtbare focus, skip-link, touch targets van 44px, juiste kopvolgorde.
3. **Mobiel volgt de briefing.** De nav staat op één regel, en zin + knop passen in het eerste scherm. Van de eerste kaart is net de kopregel zichtbaar (31px), de titel nog niet.

## Prioriteiten

**[P1] De beeldtaal is geleend, niet bedacht.**
- *Waarom:* de site moet zelf het bewijs van kunnen zijn, en een ontwerpdirecteur herkent de bronnen.
- *Oplossing:* haal de beeldtaal uit je eigen domein, het maken van een product (notitie → schets → wireframe → UI → code → live). Laat kader, nummering en overgangen allemaal die ene taal spreken.
- *Commando:* `shape`, daarna `bolder`.

**[P1] De hero-transformatie bouwt niets herkenbaars en duurt te lang.**
- *Wat:* 6,3 s per stap en 31,5 s per cyclus; de streepjes zijn decoratie en je kunt er niet op klikken.
- *Waarom:* in 5 seconden ziet een recruiter stipjes, geen vakmanschap.
- *Oplossing:* één opbouw van 2–4 s die eindigt in iets concreets en dan blijft staan (Shopify-principe). Bijvoorbeeld: deeltjes vormen de wireframe van case 01, die "rendert" tot het echte beeld en de eerste kaart wordt. Of laat scroll de stappen sturen.
- *Commando:* `overdrive`, daarna `animate`.

**[P1] Geen werk boven de vouw op desktop, en kaarten nodigen niet uit tot klikken.**
- *Wat:* de eerste kaart begint pas rond 930–1000px.
- *Hover:* alleen de tekst kleurt oranje, en dat haalt het contrast niet: 3,4:1 op paper, en de knoptekst 3,9:1 op ink (beide nagemeten). Het beeldvlak reageert niet.
- *Oplossing:* hero op desktop rond 65–70vh, of case 01 in de hero-compositie trekken. Laat het beeldvlak reageren (preview of verschuiving + "View case →"), tekst blijft ink. Op mobiel een equivalent zonder hover.
- *Commando:* `layout`, daarna `harden`.

**[P2] De kop spreekt de strategie tegen.**
- *Wat:* "AI-NATIVE PRODUCT DESIGNER" staat vooraan, terwijl AI de rode draad moet zijn, niet de kop. Je naam staat niet in de kop, en er is geen context (Tilburg, niveau).
- *Oplossing:* naam + rol in de kop; AI laten zien als bewijs (making-of, badges op cases).
- *Commando:* `clarify`.

**[P2] De footer dient het merk, niet de recruiter.**
- *Wat:* 8 links met dubbelingen, labels die op knoppen lijken, geen zichtbaar e-mailadres, en een generieke kop.
- *Oplossing:* een contactblad: e-mailadres als tekst met kopieerknop, Resume (pdf ↗), LinkedIn, GitHub, één regel context. De labels weghalen, of laten terugkomen als de stappen uit de hero, zodat het einde het begin echoot.
- *Commando:* `distill`.

## Rode vlaggen per persona

- **Recruiter, eerste bezoek:** "AI-native" wordt niet uitgelegd; "[00] INDEX" en "[01] PROBLEM" lezen als systeem-UI; kaarten zeggen niet dat ze klikbaar zijn; "Let's talk" leidt naar een footer zonder e-mailadres.
- **Mobiel:**
  - de kop beslaat 6 regels hoofdletters;
  - tot het deeltjesveld start is er een leeg vlak boven de zin;
  - er is geen tik-equivalent voor de hover op kaarten;
  - de footer is lang en dubbel.
- **Toegankelijkheid:**
  - Goed: focus, skip-link, reduced motion.
  - Mist: een pauzeknop.
  - Hover-contrast faalt.
  - De toegankelijke naam van een kaartlink plakt label + nummer + caption + titel + meta aan elkaar (lange aankondiging).
  - `aria-current="page"` op een anker binnen de pagina is semantisch onjuist.
- **Hiring manager bij een Brabantse scale-up:** ziet een abstracte stippenwolk en "AI-native", moet een heel scherm scrollen voor werk en vindt dan vier grijze vlakken. Er is geen signaal van niveau, context (student of freelance?) of locatie. Wie wil reageren, vindt geen e-mailadres.

## Kleine observaties
- Nummersysteem overbelast. De referenties gebruiken één teller met één betekenis (Mike 02/04, Shopify I–XI).
- "Selected work [04]": het aantal zegt niets bij vier items.
- De verspringing van 9rem laat bovenin de rechterkolom een gat.
- In de onderste footerrij staat het logo uiterst links en staan de kolommen uiterst rechts, met niets ertussen.
- De grijze verbindingswoorden laten de zin lezen als twee zinnen.
- Eerste frame van het deeltjesveld kon na een resize kort een verticale streep zijn (nog te controleren).
- Mobiel: kaart 04-titel en de footerzin breken lelijk (detector).

## Wat ontbreekt voor award-niveau (t.o.v. de referenties)
1. **Eén eigen concept dat alles stuurt** (Heron = tekening, Kigo = inkt, Shopify = Renaissance). J heeft geleende woordenschat.
2. **Een transformatie die eindigt in iets herkenbaars en blijft staan.** J eindigt abstract en loopt weg.
3. **Continuïteit:** een motief uit de hero dat doorloopt in de kaarten en terugkomt in de footer, plus overgangen naar cases. J bestaat uit drie losse blokken.
4. **Interactie met betekenis op het werk zelf:** cursor "View" + preview op desktop, en een equivalent moment bij tikken of scrollen op mobiel.
5. **Een eigen typografische stem:** een moment van schaal en contrast, zoals Mikes naam of Kigo's displayfont. Nu is het een vervanger van Herons font in Herons hoofdletters, met een kop die te klein is om de pagina te dragen.

## Vragen om over na te denken
- Wat als de hero geen proces *afbeeldt*, maar een van je echte producten *bouwt* waar de bezoeker bij is?
- Als Herons stijl uit architectentekeningen komt: waar tekent een product designer die codeert op? Een schetsboek, een Figma-frame, een terminal, een git-log?
- Wat als het werk een lijst is (Mike) in plaats van een grid, en alle vier de cases naast één zin in het eerste scherm passen?
- Hoe ziet de site eruit als "AI" in geen enkele kop staat, alleen in het bewijs?
