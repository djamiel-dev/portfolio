# Portfolio Djamiel – projectinstructies

Lees dit bij elke sessie. Werk in het Nederlands met mij; de site zelf is Engels.

> **Status van dit document:** dit is de huidige stand van zaken, geen eindtoestand. Het ontwerp (versie J) is een eerste prototype. We itereren kritisch richting een portfolio van hoog niveau: stel gerust ter discussie wat hieronder staat, maar wijzig stijl of opbouw pas na overleg.

## Doel
Persoonlijke portfoliosite voor Djamiel (22, Tilburg, HBO ICT & Media). Positionering: **product designer die zelf bouwt / design engineer**, met AI als rode draad (niet als kop). Doelgroep: productbedrijven en scale-ups in Brabant. De site is zelf bewijs van kunnen: gebouwd in Next.js, gehost op Vercel, code publiek op GitHub.

**Primair gebruik:** een link in een sollicitatiemail. De bezoeker is een recruiter of hiring manager die de site in een paar minuten scant en daarna hooguit 1–2 cases opent. Alles op de site moet die bezoeker dienen; wat daar niet aan bijdraagt mag weg.

Belangrijkste boodschap: niet "AI maakt mij sneller", maar "AI helpt mij een product van hogere kwaliteit te maken dat het probleem beter oplost".

## Stack
- Next.js (App Router) + TypeScript, Vercel, publieke GitHub-repo.
- Styling: CSS-variabelen als design tokens (zie hieronder). Geen UI-kit die de stijl overschrijft.
- Het deeltjesveld in de hero: canvas 2D, geen Three.js nodig.

## Bronnen in deze map
- `design/homepage.html` – **visuele referentie** van de gekozen homepage (versie J "Draftsman"). Startpunt om na te bouwen; open hem in de browser om te vergelijken.
- `docs/beslissingen.md` – logboek van ontwerpkeuzes (ook bron voor de making-of-case).
- `private/context-djamiel.md` – volledige persoonlijke context. **Staat in .gitignore, nooit committen of citeren op de site.** Bestaat alleen lokaal; op een ander device apart overzetten (niet via de publieke repo).
- Repo: https://github.com/djamiel-dev/portfolio (publiek). Commits met het GitHub-noreply-adres, nooit met het werkmailadres.

## Design tokens (afgeleid van heronaiapp.com, gemeten)
| Token | Waarde | Gebruik |
|---|---|---|
| `--paper` | `#F5F5EE` | achtergrond |
| `--ink` | `#282828` | primaire tekst, donkere vlakken, footer |
| `--ink-2` | `#414140` | secundair donker, lijnen in footer |
| `--muted` | `#626260` | kleine labels/meta (contrast ok op paper) |
| `--surface` | `#72726F` | grijze grote koptekst (alleen ≥24px) |
| `--line` | `#B3B3AF` | haarlijnen, kaders |
| `--disabled` | `#B4B4B0` | tekst op donker |
| `--brand` | `#FA3600` | accent: actieve woorden, markeringen, pijlvak. Nooit voor kleine tekst op paper (contrast) |
| `--placeholder` | `#ECECE4` | beeldvlakken zonder beeld |

Typografie:
- Koppen: **Inter Tight** 600/700, hoofdletters, letter-spacing −0.03em (vervanger voor Herons betaalde BT Grotesk).
- Labels/nav/meta: **Geist Mono** 400/500, hoofdletters, 11–12px.
- Body: Inter Tight 500.

Vormtaal: rechte hoeken, 1px lijnen, een raamwerk langs de pagina met `+` op kruispunten, kaarten met een mono-kopregel en `[01]`-nummering boven een gestippelde lijn, knoppen met een apart oranje pijlvak, kleine oranje vierkantjes als markering.

## Homepage-opbouw (Belle Duffner-layout, vastgelegd)
1. **Nav** gecentreerd: Work · Contact · [logo DJAMIEL] · About · Resume ↗.
2. **Hero** in een kader:
   - Deeltjesveld (≈1600 punten) dat morpht door 5 stappen: Problem (wolk) → Research (bol) → Design (kubus) → Build (3 lagen) → Live (ring). Draait langzaam, kantelt mee met de cursor, deeltjes wijken uit rond de cursor. Rechtsboven `[02] RESEARCH` + 5 voortgangsstreepjes.
   - Eén zin, hoofdletters, gecentreerd: "AI-native product designer who researches, designs and builds, from real problem to live product." Sleutelwoorden ink, verbindingswoorden grijs, en het woord van de actieve stap kleurt oranje mee met de animatie.
   - Eén knop "Let's talk" (geen beschikbaarheidslabel, geen "Hello! I'm…").
3. **Selected work**: twee verspringende kolommen (rechter kolom begint lager). Kaart = kader met mono-kopregel + beeld; eronder titel (uitkomstzin) links, meta (klant · type jaar) rechts. Volgorde: 01 Collaborative Strength, 02 Lash studio, 03 Incentive portal, 04 Making of this portfolio.
4. **Footer** (huidige versie bevalt nog niet; wordt herzien met het primaire gebruik in gedachten) donker met gebogen bovenrand: "LET'S BUILD SOMETHING THAT WORKS." (laatste woord oranje), zwevende schuine labels (Research, UX design, UI design, Front-end, AI workflows), twee tekstlinks, logo + drie kolommen (Connect, About).

Bewust NIET: Lab/Craft-sectie, "Hello! I'm Djamiel", "Open to new roles", rasterachtergrond, decoratieve lijntekeningen.

## Regels
- **Toegankelijkheid**: echte `<a>`/`<button>`, zichtbare focus, contrast ≥4.5:1 voor tekst <24px, touch targets ≥44px, `prefers-reduced-motion` respecteren (deeltjesveld staat dan stil), animatie pauzeren buiten beeld.
- **Mobiel**: zin + knop in één scherm, eerste casekaart net zichtbaar; nav mag niet over twee regels breken (bekend probleem in de referentie → oplossen, bv. compacte nav of menu).
- **Inhoud**: echte case-inhoud volgt pas als het design staat. Tot dan mag ik tijdelijke placeholdertekst verzinnen om het design uit te werken, maar altijd herkenbaar tussen `[ ]`, zodat er niets verzonnens live gaat. Geen verzonnen cijfers, citaten of resultaten buiten die haken.
- **Resume**: wordt een gehoste pdf (`/resume.pdf`) die in een nieuw tabblad opent; nu nog placeholder.
- **Geheimhouding**: geen werk, screens, cijfers of klantnamen uit het huidige dienstverband. De stagecase (Incentive portal) pas tonen na toestemming; bedrijfsnaam tot dan `[Company]`.
- **Kwaliteit** (bewust zichtbaar maken, zie making-of): definition of done per onderdeel, Lighthouse/axe-check, test op desktop + mobiel in de browser voordat iets af is.
- **Making-of loggen**: houd bij elke grotere stap kort bij in `docs/beslissingen.md` wat AI voorstelde, wat ik afkeurde of aanpaste, en hoeveel tijd het kostte.

## Skills
- Impeccable: gebruik voor critique en polish van layout/typografie/kleur. Respecteer de tokens hierboven; geen stijlwissel zonder overleg.
- Emil Kowalski (emil-design-eng): voor animaties, easing en hover/focus-states, pas als de layout staat.
- Taste: alleen om ideeën te verkennen; geen AI-gegenereerde beelden als projectbeeld.
- Gebruik ze één voor één en laat me voor/na zien (materiaal voor de making-of).
