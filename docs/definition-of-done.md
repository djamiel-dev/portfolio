# Definition of done – homepage

Een onderdeel is pas af als alles hieronder klopt. Afvinken geldt voor de meting van 1 nov 2026 (concept E); opnieuw controleren na elke grotere wijziging.

Automatische checks: `npm run build`, dan `npx next start -p 3100`, en met `SITE_URL=http://localhost:3100` draaien: `npm run audit` en `npm run keyboard` (alleen de focusregels; het script crasht daarna op de oude canvas-check van versie J).

## Automatisch
- [x] `npm run typecheck` en `npm run build` slagen
- [x] axe (WCAG 2.2 AA + best practices): 0 fouten op desktop en mobiel
- [x] Lighthouse mobiel Performance ≥95 (96, drie herhalingen; eerder één uitschieter van 79), desktop 100
- [x] Lighthouse Accessibility en Best Practices 100; SEO 63 door de bewuste `noindex`
- [x] Impeccable-detector op de code: 0 meldingen

## Toetsenbord en hulpmiddelen
- [x] Alles bereikbaar met Tab, elke focus zichtbaar; tabvolgorde cases 01, 02, 03, 04
- [x] Skip-link als eerste tabstop
- [x] Touch targets ≥44px (de caselink is lager, maar de hele kaart is klikbaar)
- [x] Hover verlaagt het contrast niet: links krijgen een lijn in plaats van een andere kleur
- [ ] Reduced motion en zonder JS opnieuw controleren: laatst bekeken vóór de nieuwe hero, de skills-kaarten en de tool-rij

## Visueel
- [x] Desktop 1440×900 en mobiel 375×812 bekeken, geen horizontale scroll
- [ ] Getest op een echte telefoon (iOS Safari, Android Chrome)
- [ ] Getest in Safari en Firefox op desktop
- [ ] 5-secondentest met echte mensen

## Inhoud
- [x] Placeholders staan tussen `[ ]`; niets verzonnens buiten de haken
- [ ] Echte links (e-mail, LinkedIn, resume) en case-inhoud
- [ ] `[Tool]`-vakjes in de skills invullen
- [ ] Spellingscheck van alle Engelse tekst
- [ ] Bij lancering: `robots: { index: false }` uit `app/layout.tsx` halen (nu verborgen voor zoekmachines)
