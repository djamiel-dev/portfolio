// Skills and timeline content for the homepage.
// Text in [brackets] is a placeholder and must be replaced before going live.

// The work is seen through one day: each pane is a little warmer than the last
// (morning, noon, afternoon, early evening). Plain ground until the real images exist.
export const caseGrounds: Record<string, string> = {
  "01": "#dde2e3",
  "02": "#e1e2dc",
  "03": "#e4ded4",
  "04": "#e2d4c2",
};

// Page ground, quiet grey marks, the lighter shade of --accent where a swell crests
export const heroGlyphs: [string, string, string] = ["#eeefeb", "#a3a6a3", "#da9576"];

// tools: what the card's carousel shows. Keep each list long enough to fill the card's width.
export type Skill = { title: string; text: string; tools: string[] };

// The apps' own desktop icons, in public/tools. Anything without an app shows its name.
export const toolIcons: Record<string, string> = {
  Figma: "/tools/figma.png",
  "DaVinci Resolve": "/tools/davinciresolve.png",
  "Claude Code": "/tools/claude.png",
};

export const skills: Skill[] = [
  {
    title: "Research & problem framing",
    text: "[How I find out what the real problem is and put it into words]",
    tools: ["ResearchRabbit", "User interviews", "Desk research", "Problem statements", "Jobs to be done"],
  },
  {
    title: "UI/UX & design systems",
    text: "[Flows and interfaces in Figma, with tokens and components that stay in sync with the code]",
    tools: ["Figma", "DaVinci Resolve", "Wireframes", "User flows", "Design tokens", "Component library"],
  },
  {
    title: "Prototyping & user testing",
    text: "[Clickable and coded prototypes, tested with real people early]",
    tools: ["Figma", "Clickable prototypes", "Coded prototypes", "5-second test", "A/B test", "Card sorting"],
  },
  {
    title: "Frontend development",
    text: "[Building what I design in Next.js, TypeScript and CSS]",
    tools: ["Next.js", "Tailwind CSS", "TypeScript", "CSS", "Accessibility"],
  },
  {
    title: "AI workflows",
    text: "[How I use AI to explore more and check my own work]",
    tools: ["Claude Code", "Concept exploration", "Code review", "Prompt design"],
  },
  {
    title: "Collaboration",
    text: "[How I work with developers, designers and stakeholders]",
    tools: ["Design critique", "Developer handoff", "Stakeholder updates", "Giving feedback"],
  },
];

export type Moment = { title: string; role: string; story: string; period: string };

export const moments: Moment[] = [
  {
    title: "Secondary school",
    role: "Computer science as a subject",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]",
  },
  {
    title: "HBO ICT & Media",
    role: "[Graduated with outstanding]",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]–[Year]",
  },
  {
    title: "Side projects",
    role: "Own projects and websites for others",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]–now",
  },
  {
    title: "Internship",
    role: "First real product work",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]",
  },
  {
    title: "First job",
    role: "Designer and front-end developer in a small team",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "2026",
  },
];
