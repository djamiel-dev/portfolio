# Definition of done – homepage

Een onderdeel is pas af als alles hieronder klopt. Automatische checks: `npm run build`, dan `npx next start -p 3100` en `npm run audit` + `npm run keyboard`; voor visuele vergelijking `npm run dev` en `npm run screenshots`.

## Automatisch
- [x] `npm run build` slaagt zonder TypeScript-fouten
- [x] axe (WCAG 2.2 AA + best practices): 0 fouten op desktop en mobiel
- [x] Lighthouse mobiel en desktop: 100 op Performance, Accessibility, Best Practices, SEO
- [x] Geen fouten in de browserconsole

## Toetsenbord en hulpmiddelen
- [x] Alles bereikbaar met Tab, elke focus zichtbaar (oranje rand)
- [x] Skip-link als eerste tabstop
- [x] Touch targets ≥44px (nav, knop, footerlinks)
- [x] Reduced motion: deeltjesveld staat stil en is zichtbaar
- [ ] Tabvolgorde van de kaarten is op desktop 01, 03, 02, 04 (kolom voor kolom) – beslissen in critique
- [ ] Hover-kleuren voldoen aan contrast (kaarttitel, knop en footerlinks worden oranje: 3,4–3,9:1) – oppakken in polish (Emil)

## Visueel
- [x] Desktop 1440×900 komt overeen met `design/homepage.html` (≤2px verschil)
- [x] Mobiel 390×844: nav op één regel, zin + knop + begin eerste kaart in beeld, geen horizontale scroll
- [ ] Getest op een echte telefoon (iOS Safari, Android Chrome)

## Inhoud
- [x] Placeholders staan tussen `[ ]`; niets verzonnens buiten de haken
- [ ] Echte links (e-mail, call, LinkedIn, resume) en case-inhoud – na het design
- [ ] Spellingscheck van alle Engelse tekst
