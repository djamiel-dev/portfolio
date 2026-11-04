// Skills and timeline content for the homepage.
// Text in [brackets] is a placeholder and must be replaced before going live.

// The work is seen through one day: each pane is a little warmer than the last
// (morning, noon, afternoon, early evening). Plain ground until the real images exist.
export const caseGrounds: Record<string, string> = {
  "01": "#dde2e3",
  "02": "#e1e2dc",
  "03": "#e4ded4",
  "04": "#e3dbcf",
};

// Page ground, quiet grey marks, the lighter shade of --accent where a swell crests
export const heroGlyphs: [string, string, string] = ["#eeefeb", "#a3a6a3", "#da9576"];

// tools: what the card's carousel shows. Keep each list long enough to fill the card's width.
export type Skill = { title: string; text: string; tools: string[] };

// The apps' own desktop icons, in public/tools. Anything without an app shows its name.
// In each skill's tools, icons and names take turns where there are enough of both.
export const toolIcons: Record<string, string> = {
  Figma: "/tools/figma.png",
  "DaVinci Resolve": "/tools/davinciresolve.png",
  "Claude Code": "/tools/claude.png",
  ResearchRabbit: "/tools/researchrabbit.png",
  "Design Thinking": "/tools/designthinking.png",
  "Claude Design": "/tools/claudedesign.png",
};

export const skills: Skill[] = [
  {
    title: "Research & problem framing",
    text: "A problem well stated is a problem half solved.",
    tools: ["ResearchRabbit", "Double Diamond", "Research questions", "Design Thinking", "Desk research", "Problem statements", "Acceptance criteria"],
  },
  {
    title: "UI/UX & design systems",
    text: "Good looks can help a product, but they are never the reason it works.",
    tools: ["Figma", "Wireframes", "Claude Design", "User flows", "DaVinci Resolve", "Design tokens", "Component library"],
  },
  {
    title: "Prototyping & user testing",
    text: "An hour of testing beats a week of opinions.",
    tools: ["Figma", "Clickable prototypes", "Coded prototypes", "5-second test", "A/B test", "Card sorting"],
  },
  {
    title: "Frontend development",
    text: "A design isn’t finished until it runs.",
    tools: ["Next.js", "Tailwind CSS", "TypeScript", "CSS", "Accessibility"],
  },
  {
    title: "AI workflows",
    text: "AI helps me make a better product first, and get there faster second.",
    tools: ["Claude Code", "Concept exploration", "Code review", "Prompt design"],
  },
  {
    title: "Collaboration",
    text: "The best ideas rarely come from one person.",
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
