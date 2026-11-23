# Case 01 – Incentive portal: inhoud (stand 17 nov 2026, na het inkorten)

Werkdocument en overdracht voor de volgende stap: **de pagina scherp inkorten en het design naar een hoger niveau tillen**. De inhoud staat; dit document zegt wat er staat, waarom, en wat niet mag.

Toestemming (14 nov): screens met het JobRewards-logo en de naam JobRewards mogen getoond worden. Geen namen van testers, experts of collega's.

## Opbouw van de pagina (`app/work/incentive-portal/`)
| Sectie | Inhoud | Beeld |
|---|---|---|
| Intro | Kernzin "A rewards portal team leads use without training." + Problem / What I did / Result | – |
| Hero | Belonen → medewerkers kiezen → bevestiging | 3 telefoons (`reward`, `pick-employees`, `confirmation`) |
| Feiten | Rol (ook naam en logo bedacht), team, context, stack | – |
| Problem | JobRewards nieuw, geen plek voor teamleiders om te belonen; eerste klanten tellen het zwaarst; deadline = livegang eerste klant (één alinea) | – |
| Process | Rondes van feedback; eerst de opdracht versmald (webshop, automatische punten, badges voor later) | Rondes: Exploring (AI-schetsen → eerste Figma-ontwerp, `first-design`), Phone-first (`round-brief`), Two expert reviews (`round-experts`) |
| Decision 1 | Snel voor wat vaak gebeurt, handmatig voor wat niet; reden bij de beloning | Beloningsscherm met 3 pins |
| Decision 2 | A/B-test beloning-eerst vs. persoon-eerst; beide flows hadden hun moment → beloning-eerst hoofdroute, ook belonen vanuit de medewerkerslijst. Daarna "What else the test changed": statistieken, menu, medewerkerprofiel | `EaseChart`, `Dots`, 3 kaarten met uitsneden voor/na (`stats-`, `menu-`, `employee-before/after`) |
| Building it | Front-end in Next.js; backend developer bouwde de API's, samen bepaald wat nog nodig was, ik schreef op wat elke API moest sturen en teruggeven; eerst nepdata. AI in Cursor met een projectspec, één component per keer. Codereview door een developer, na het bouwen opnieuw getest (alleen kleine verfijningen) | Spec-fragment (echte regels) + bouwvolgorde, 3 punten in een rij |
| Result (nacht) | Klaar voor de livegang van de eerste klant; meer klanten volgden; alle klanten noemen het snel, makkelijk en intuïtief; teamleiders gebruiken het zonder training. Daarna: bleef doorbouwen (afdelingsfilter, langere teamlijsten, limiet op handmatige beloningen) | – |

Ongebruikte beelden in de map: `round-team-leads.png`.

## Inhoudsregels (keuzes van Djamiel)
- Geen "live since", launchdata, aantallen klanten of commit-aantallen.
- Niets over de back-office of dat klanten één systeem delen.
- Geen fouten of beginnersmomenten tonen (geen productiebugs, geen "first design was for the wrong screen", geen "what I'd do differently").
- Bij de codereview alleen dát er gereviewd werd, niet de punten zelf.
- Niet benoemen welke schermen gebouwd of alleen ontworpen zijn.
- Ik bouwde de API's niet; wel in overleg bepaald wat nodig was en beschreven wat ze moesten doen.
- "Client" = klantbedrijf; interne betrokkenen heten stakeholders. Testers waren teamleiders uit het veld (op de pagina: "seven team leads").
- Bevestigd door Djamiel, niet in de stukken: alle klanten noemen de live app snel, makkelijk en intuïtief; teamleiders krijgen geen training (alleen op verzoek, nog niet nodig geweest); er is na het bouwen met echte mensen getest.

## Bewust weggelaten
- De bevinding "belonen na de dienst" (alleen een inzicht, veranderde het ontwerp niet).
- De spanning tussen literatuur (snel erkennen) en de test.
- Kleinere ontwerpkeuzes uit feedback (profielfoto's eruit, "Mail CSV naar mij", reminder): waar, maar de lengte niet waard.
- De Europese richtlijn voor gelijke beloning.

## Ingekort op 17 nov
`Landscape`, `FlowAB`, `Tenants` en `Departments` zijn weg; de voor/na-paren zijn uitsneden; "After the first client" staat als alinea onder het resultaat. Zie stap 21 in `docs/beslissingen.md`.

## Bronnen
- Stagedocumenten: `~/Downloads/afstudeerstage/` (sprint 1–9). Vooral: requirementsinterview (sprint 1), "Eerste figma design" (sprint 2), "Mobile dashboard design" en sprintfeedback (sprint 3), expert reviews, "Iteratie na Expert Reviews" en "Usability Test - UI UX" (sprint 4), "API's voor Robbie" en "Keuze tech stack" (sprint 5), development-verslagen (sprint 6).
- Figma "selfserviceportal" (`ILJGHfa4CGKv4k40i8jQnt`): testprototype op pagina "testing iteratie 4 eerst beloning", eindontwerp op "development MVP".
- Antwoorden van Cursor over de code van de portal (14 nov, in de chat): spec-regels, afdelingen, aanroepen via de server, tenant uit de login.
- Testcijfers: gemiddeld gemak 4,4 (beloning-eerst) tegen 3,7; 5 van 7 kozen beloning-eerst. Het eigen testverslag noemt ten onrechte 4,6 en "4 van 7".
