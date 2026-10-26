# Startprompt voor Claude Code

Plak dit als eerste bericht nadat je `claude` hebt gestart in deze map (en de skills hebt geïnstalleerd, zie onderaan).

---

Hoi! We gaan mijn portfolio bouwen. Lees eerst `CLAUDE.md`, `docs/beslissingen.md` en `private/context-djamiel.md`, en open `design/homepage.html` (de goedgekeurde homepage, versie J) in de browser om te zien hoe hij eruitziet en beweegt.

Doel van deze sessie: alleen de **homepage** neerzetten in Next.js, pixel-getrouw aan `design/homepage.html`. Nog geen casepagina's.

Werk in deze stappen en stop na elke stap kort voor mijn akkoord:

1. **Plan** – stel de projectstructuur voor (App Router, TypeScript), welke componenten je maakt (Nav, Hero, ParticleField, CaseCard, WorkGrid, Footer) en hoe je de design tokens uit `CLAUDE.md` vastlegt als CSS-variabelen. Fonts via `next/font` (Inter Tight, Geist Mono).
2. **Opzetten** – maak het Next.js-project, zet de tokens en fonts neer, initialiseer git met een nette eerste commit. Zorg dat `private/` in .gitignore staat.
3. **Bouwen** – bouw de homepage na. Het deeltjesveld wordt een client component met dezelfde logica als in de referentie (5 vormen, cursor-interactie, actieve woord oranje in de hero-zin, reduced motion, pauze buiten beeld, cleanup bij unmount).
4. **Vergelijken** – start de dev-server, maak met Playwright screenshots op 1440×900 en 390×844 van zowel `design/homepage.html` als de Next.js-versie, en laat me de verschillen zien. Los de mobiele nav op (die breekt in de referentie over twee regels).
5. **Kwaliteit** – draai een toegankelijkheids- en Lighthouse-check, los op wat je vindt, en geef me een korte definition-of-done-checklist voor de homepage.
6. **Critique** – gebruik de Impeccable-skill voor een critique op layout, typografie en kleur. Pas nog niets aan; laat me eerst de punten zien en ik kies.

Regels:
- Houd je strikt aan de tokens en opbouw in `CLAUDE.md`; geen eigen stijlwijzigingen zonder te vragen.
- Placeholders tussen [ ] laten staan; verzin geen inhoud.
- Log na elke stap in `docs/beslissingen.md` (sectie "Bouwfase") in 2–3 regels: wat je voorstelde, wat ik besliste, en hoe lang de stap duurde. Dat is materiaal voor mijn making-of-case.
- Leg uit wat je doet in gewone taal, zodat ik het later zelf kan uitleggen in een sollicitatiegesprek.

Begin met stap 1.

---

## Eenmalig vooraf (in de terminal, in deze map)

```bash
# Impeccable – critique en polish (eerst deze)
npx -y skills add pbakaus/impeccable --agent claude-code

# Emil Kowalski – animaties en interacties (pas in de polish-fase gebruiken)
npx skills add https://github.com/emilkowalski/skills --skill emil-design-eng

# Taste – optioneel, alleen om ideeën te verkennen
npx -y skills add leonxlnx/taste-skill --agent claude-code
```

Check bij Impeccable de README van github.com/pbakaus/impeccable voor het actuele commando. Start Claude Code opnieuw na het installeren.

Tip: gebruik de skills één voor één. Na de homepage: "Gebruik nu de skill van Emil Kowalski om de hover-states, focus-states en de animatie van het deeltjesveld te verfijnen. Laat me voor/na zien."
