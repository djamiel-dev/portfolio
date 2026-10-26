# Product

<!-- impeccable:product-schema 1 -->

Source: confirmed facts from CLAUDE.md and the owner's answers during exploration (26 Oct 2026). Nothing here comes from private notes.

## Platform

web

## Users
Primary: a recruiter or hiring manager at a product company or scale-up in Brabant (NL), who opens the site from a link in a job application email. They scan for a few minutes, decide whether this person is worth an interview, and open at most one or two cases. Often on desktop at work; sometimes on a phone.

## Product Purpose
Personal portfolio of Djamiel (22, Tilburg, HBO ICT & Media). It must make clear within seconds who he is and what he does, and get the visitor to real work fast. Success: the visitor opens a case and then makes contact or asks for an interview.

## Positioning
Product designer who builds his own work (design engineer): researches, designs and builds, from a real problem to a live product. AI is the undercurrent, not the headline. The message is not "AI makes me faster" but "AI helps me make a higher-quality product that solves the problem better". The site itself is proof: built in Next.js, hosted on Vercel, code public on GitHub, with a documented making-of.

## Operating Context
Visitors arrive cold from an email, compare several candidates, and have little time. They look for: real, traceable (live) work with a clear own share; visible decisions and trade-offs; research and tested prototypes; self-built work as a differentiator; AI use with control; quality and finishing.

## Capabilities and Constraints
- Stack: Next.js App Router + TypeScript, CSS variables as tokens, no UI kit overriding the style. Canvas 2D is fine; heavy WebGL must earn its place.
- Homepage structure: one positioning statement, then the cases. Nav targets: Work, About, Resume (PDF in a new tab), Contact.
- Cases in order: 01 Collaborative Strength (powerlifting coach site, live), 02 Lash studio (to be made), 03 Incentive portal (internship, only after permission; company shown as `[Company]` until then), 04 Making of this portfolio.
- Real case content follows after the design is settled. Until then placeholder text is allowed only between `[ ]`.
- Undecided: final case images, outcomes, résumé PDF, contact links.

## Brand Commitments
- Site language English.
- No "Hello! I'm…", no "Open to new roles", no Lab/Craft section.
- No AI-generated images as project imagery.

## Evidence on Hand
- Collaborative Strength is live: https://colaborative.vercel.app/
- Decision log of the design process: `docs/beslissingen.md` (source for the making-of case).
- No testimonials, metrics, client quotes or results exist yet. Never invent them outside `[ ]` placeholders. No employer work, screens, numbers or client names without permission.

## Product Principles
1. Serve the two-minute scan: who, what, and the first case must be obvious without effort.
2. Show, don't claim: process, decisions and built work over adjectives.
3. AI as evidence in the work, never as a slogan.
4. Quality is visible: accessibility, speed and finish are part of the pitch.
5. One unforgettable moment plus a very clear structure.

## Accessibility & Inclusion
WCAG 2.2 AA: real links/buttons, visible focus, contrast ≥4.5:1 for text under 24px, touch targets ≥44px, `prefers-reduced-motion` respected (motion still or off), animation paused off-screen. Mobile: statement + action in the first screen, first case just visible. `npm run audit` (axe + Lighthouse) must stay green.
