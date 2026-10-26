# Verkenning stap 5 – Toetsing (26 okt 2026)

Getest op een productiebuild (`npm run build`, `npx next start -p 3100`). Versie J (`/`) is meegenomen als nulmeting.
Scripts:
- `npm run explore-check`: screenshots na 1 s en 5 s, meting van het eerste scherm, toetsenbordtest met reduced motion;
- `node scripts/explore-sheet.mjs`: vergelijkingsbladen;
- `npm run audit`: axe + Lighthouse, per route via `SITE_URL`.

Screenshots staan lokaal in `screenshots/explore/` (niet in git).

## 1. Wie ben ik, wat doe ik (binnen 5 seconden)

Gemeten in het eerste scherm na 5 s.

| | Naam zichtbaar | Rol zichtbaar | Opmerking |
|---|---|---|---|
| J | alleen klein in de nav | ja ("AI-native…") | de animatie staat na 5 s nog op "Problem" (een wolk) |
| A | ja, groot | ja | na 1 s is de naam nog half gebouwd, na 2 s klaar |
| B | ja, klein in handschrift + labeltape | ja, groot | de zin is het grootste element |
| C | ja, groot | ja, maar in gespatieerde tegels | de rol leest trager, vooral op mobiel |

Dit is een meting, geen mensentest. De echte 5-secondentest doe je met 2–3 mensen die de vergelijkingsbladen kort zien en daarna vertellen wat ze onthouden.

## 2. Is het eerste werk snel te vinden?

| | Desktop: cases in eerste scherm | Mobiel: cases in eerste scherm | Tabs tot eerste case | Paginahoogte desktop |
|---|---|---|---|---|
| J | 0 (eerste kaart op 962 px) | 0 volledig, 1 net | 8 | 3.223 px |
| A | 4 | 2 volledig, 4 deels | 10 | 1.436 px |
| B | 4 | 4 (kleine printjes) | 9 | 3.784 px |
| C | 4 | 3 volledig, 4 deels | 6 | 1.454 px |

## 3. Mobiel (390×844)
- **Geen horizontale scroll** op alle vier de routes.
- **A:** naam, rol, knop en twee cases zichtbaar.
- **B:** het vel en vier kleine printjes.
- **C:** naam, rol, klok, nav en drie rijen. De tegels breken per woord af (opgelost in stap 4), maar de rol in tegels leest moeizaam.

## 4. Audit (axe + Lighthouse)

| | axe desktop/mobiel | Lighthouse mobiel P/A/BP | Lighthouse desktop P/A/BP |
|---|---|---|---|
| J | 0 / 0 | 98 / 100 / 100 | 100 / 100 / 100 |
| A | 0 / 0 (na fix) | 98 / 100 / 100 | 100 / 100 / 100 |
| B | 0 / 0 | 97 / 100 / 100 (na fix) | 100 / 100 / 100 |
| C | 0 / 0 | 98 / 100 / 100 | 100 / 100 / 100 |

- **SEO 60 overal, ook bij J:** komt door de bewuste `noindex` tot de lancering. Geen fout.
- **J mobiel nu 98 i.p.v. de eerdere 100:** valt binnen de normale schommeling van Lighthouse, met dezelfde aandachtspunten (render-blocking CSS, ongebruikte JS).
- **Toetsenbord:** focus overal zichtbaar, geen klikvlakken onder 24 px in de verkenningsroutes. In C wisselt de preview mee met de toetsenbordfocus.
- **Reduced motion:** A toont meteen de letters, B toont de notities op hun plek, C klappert niet. Gecontroleerd met screenshots.

### Gevonden en opgelost in deze stap
- **A, axe "label-content-name-mismatch":** de voorgelezen naam van een caselink was alleen de titel, terwijl de link meer zichtbare tekst bevatte. Nu zit de link op de titel en strekt hij zich uit over de hele cel; de focusring staat op de cel.
- **B, LCP 2,8 s op mobiel (96):** de kop wachtte op vijf lettertypes. Het handschriftfont wordt niet meer vooraf geladen; nu 2,6 s (97).
  - Het restant komt doordat de hoofdlayout de fonts van J op élke pagina meestuurt. Op te ruimen zodra een richting gekozen is.
- **Eigen testscript:** twee meetfouten (losse tegelletters, uitgerekte links) gecorrigeerd voordat de cijfers hierboven zijn genoteerd.

## 5. Wat de screenshots laten zien (oordeel)
- **A** is het snelst te scannen. Naam, rol en werk staan in één blik; het meest "product designer met systeem". Risico blijft: het oogt als typografie-oefening, en de cases zijn nu nog grijze vlakjes.
- **B** heeft de meeste persoonlijkheid en laat als enige het proces en AI-gebruik zien. Op desktop domineren de gekleurde printjes, waardoor de cases meer opvallen dan de uitkomsten. Valt of staat met echt materiaal.
- **C** heeft het sterkste signatuurmoment (klapperen) en de eerlijkste werklijst. De gespatieerde tegeltekst leest het traagst, vooral de rol en de statussen op mobiel.
- **J** laat in de eerste 5 seconden geen werk zien en opent op een wolk.

Geen van de drie heeft nog echte beelden. De vergelijking gaat over structuur, beweging en karakter, niet over afwerking.
