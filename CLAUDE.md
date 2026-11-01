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

### Stand van zaken (1 nov 2026) – lees dit eerst in een nieuwe chat
- **Live:** https://portfolio-kappa-gilt-e200sltsky.vercel.app/ (Vercel bouwt `main` bij elke push). De site staat bewust op `noindex`.
- **Branches:** `main` en `explore` wijzen naar dezelfde stand. Push naar beide met `git push origin explore && git push origin explore:main` en zet daarna lokaal `git branch -f main explore`. Niet uitchecken of mergen naar `main` zonder de lokale versies te controleren: een checkout kan genegeerde bestanden overschrijven of verwijderen.
- **Alleen lokaal, in `.gitignore`:** `app/explore/` (concepten A–D en overzicht), `components/explore/`, de oude homepage J (`components/Nav.*`, `Hero.*`, `ParticleField.tsx` enz.) en `app/page.module.css`. Ze staan nog wel in de git-geschiedenis.
- **Laatste meting (1 nov):** axe 0 op desktop en mobiel; Lighthouse desktop 100/100/100, mobiel Performance 96 (drie herhalingen; één uitschieter van 79 in de run daarvoor), Accessibility 100, Best Practices 100. SEO 63 komt door de `noindex`. Toetsenbord: 14 tabstops, focus overal zichtbaar.

### Open punten
- **Case-vlakken:** effen tint tot de echte beelden er zijn; `WindowLight.tsx` wordt niet meer gebruikt en kan weg.
- **Opruimen:** de hero-laag heet nog `heroLight`, en `home.module.css` kan ongebruikte regels bevatten.
- **Inhoud:** alle case-inhoud is placeholder; de resume en links zijn nog placeholders.
- **Tool-widgets:** echte desktop-pictogrammen als PNG in `public/tools/`; alles zonder app (methodes, frameworks) toont zijn naam in een tegel. De voorbeelden moet ik nog nalopen op wat ik echt gebruik.
- **Accentkleuren:** één oranje `#c04a00` (overdag, 4,31:1, alleen iconen en tekst vanaf 24px) met lichtere tint `#da9576` in de hero-animatie en `--lamp` `#ff9e5e` als licht in de nacht.
- **Scripts:** `npm run keyboard` crasht aan het eind op de canvas-check van J (gebruik alleen de focusregels); `explore-check` en `explore-sheet` testen routes die alleen lokaal bestaan; `screenshots` vergelijkt met versie J.
- **Niet getest:** echte telefoon, Safari en Firefox, 5-secondentest met echte mensen.

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
- `DESIGN.md` – het designsysteem van E; `/design-system` (`app/design-system/`) toont de tokens live; `PRODUCT.md` – productwaarheid.
- `docs/beslissingen.md` – logboek (ook bron voor de making-of); `docs/definition-of-done.md`; `docs/verkenning/` – analyses uit de verkenning.
- `private/context-djamiel.md` – persoonlijke context. **Staat in .gitignore, nooit committen of citeren op de site.** Bestaat alleen lokaal.
- Repo: https://github.com/djamiel-dev/portfolio (publiek). Commits met het GitHub-noreply-adres, nooit met het werkmailadres.

## Homepage-opbouw
1. **Nav**: vaste balk. Rechts Work · How I use AI · About · Resume ↗ (mobiel: menu). Links leeg tot de naam wordt ingetypt. Geen Contact-link.
2. **Hero**: schermvullend met Glyph Swell. Kleine begroeting "Hi, [foto] I'm Djamiel" boven de grote positioneringszin met "product designer" in oranje. Geen knop, wel een scroll-hint. Na 20% van de hero typt de begroeting zichzelf weg en typt de nav "Djamiel Saou".
3. **Work**: vier cases in twee kolommen, rechterkolom lager (zigzag 01–04).
4. **Skills**: zes kaarten die bij verticaal scrollen horizontaal door een lichtpoel schuiven; het actieve kaartje wordt lichter en toont een doorlopende rij tool-widgets. Op mobiel een verticale lijst.
5. **Tijdlijn**: vijf momenten langs een gloeidraad. Vanaf hier wordt de pagina donker.
6. **Afsluiter + footer**: de draad eindigt in een lamp boven de uitnodiging met mail-knop.

## Regels
- **Toegankelijkheid**: echte `<a>`/`<button>`, zichtbare focus, contrast ≥4.5:1 voor tekst <24px, touch targets ≥44px, `prefers-reduced-motion` respecteren (beweging staat dan stil, alles leesbaar), animatie pauzeren buiten beeld.
- **Mobiel**: werkt op 375px zonder horizontaal scrollen; de nav breekt niet over twee regels. De hero is ook op mobiel schermvullend (mijn keuze), met een scroll-hint.
- **Inhoud**: echte case-inhoud volgt pas als het design staat. Tot dan mag ik tijdelijke placeholdertekst verzinnen om het design uit te werken, maar altijd herkenbaar tussen `[ ]`, zodat er niets verzonnens live gaat. Geen verzonnen cijfers, citaten of resultaten buiten die haken.
- **Resume**: wordt een gehoste pdf (`/resume.pdf`) die in een nieuw tabblad opent; nu nog placeholder.
- **Toestemming**: alleen werk tonen waarvoor ik toestemming heb; geen screens, cijfers of klantnamen van werkgevers of hun klanten zonder akkoord. De case Incentive portal pas tonen na toestemming; bedrijfsnaam tot dan `[Company]`.
- **Kwaliteit** (bewust zichtbaar maken, zie making-of): definition of done (`docs/definition-of-done.md`), test op desktop + mobiel in de browser voordat iets af is. `npm run audit` (axe + Lighthouse) en `npm run keyboard` (focusregels) draaien tegen `npx next start -p 3100` met `SITE_URL=http://localhost:3100`, na `npm run build`.
- **Making-of loggen**: houd bij elke grotere stap kort bij in `docs/beslissingen.md` wat AI voorstelde, wat ik afkeurde of aanpaste, en hoeveel tijd het kostte.

## Skills (staan in `.claude/skills/`)
- **Impeccable**: critique, layout, typografie, kleur, polish en de detector (`impeccable detect`).
- **Emil Kowalski** (emil-design-eng): animaties, easing, hover- en focus-states.
- Gebruik ze één voor één en laat me voor/na zien (materiaal voor de making-of). Geen AI-gegenereerde beelden als projectbeeld.
