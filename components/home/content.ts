// Skills and timeline content for the homepage.
// Text in [brackets] is a placeholder and must be replaced before going live.

// Four quiet greys, each a touch different, so the panes read as a set and the work does the talking.
export const caseGrounds: Record<string, string> = {
  "01": "#dde2e3",
  "02": "#e1e2dc",
  "03": "#dfe1e0",
  "04": "#e2e2df",
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
  "Claude Code": "/tools/claudecode-square.png",
  "Claude Skills": "/tools/claudeskills-tint.png",
  ComfyUI: "/tools/comfyui-square.png",
  Higgsfield: "/tools/higgsfield-square.png",
  Obsidian: "/tools/obsidian-square.png",
  Cursor: "/tools/cursor-square.png",
  Git: "/tools/git-square.svg",
  "Pull requests": "/tools/pullrequests.svg",
  "Microsoft Teams": "/tools/teams-square.svg",
  Slack: "/tools/slack-square.png",
  ClickUp: "/tools/clickup-square.png",
  GitHub: "/tools/github-square.png",
  ResearchRabbit: "/tools/researchrabbit.png",
  "Design Thinking": "/tools/designthinking.png",
  "Claude Design": "/tools/claudedesign.png",
  Affinity: "/tools/affinity.png",
  "Double Diamond": "/tools/doublediamond.svg",
  "Acceptance criteria": "/tools/acceptancecriteria.svg",
  "Problem statements": "/tools/problemstatements.svg",
  "Desk research": "/tools/deskresearch.svg",
  "Clickable prototypes": "/tools/clickableprototypes.png",
  "User testing": "/tools/usertesting-square.png",
  "5-second test": "/tools/fivesecondtest.svg",
  "A/B test": "/tools/abtest.svg",
  "Google Analytics": "/tools/googleanalytics-square.svg",
  "Next.js": "/tools/nextjs-square.png",
  TypeScript: "/tools/typescript.png",
  "Tailwind CSS": "/tools/tailwind-square.png",
  "HTML, CSS and JavaScript": "/tools/htmlcssjs.svg",
  "Three.js": "/tools/threejs-square.svg",
  Spline: "/tools/spline-square.png",
  Playwright: "/tools/playwright-square.png",
  "VS Code": "/tools/vscode-square.svg",
  Azure: "/tools/azure-square.svg",
  MCP: "/tools/mcp-square.png",
  Wireframes: "/tools/wireframes.png",
  "User flows": "/tools/userflows.png",
  "Design tokens and component library": "/tools/designsystem-square.png",
};

// Icons drawn twice as wide as they are tall, instead of an app's square
export const wideToolIcons = new Set(["Double Diamond", "Clickable prototypes", "A/B test", "Wireframes", "User flows"]);

export const skills: Skill[] = [
  {
    title: "Research & problem framing",
    text: "A problem well stated is a problem half solved.",
    tools: ["ResearchRabbit", "Double Diamond", "Design Thinking", "Desk research", "Problem statements", "Acceptance criteria"],
  },
  {
    title: "UI/UX & design systems",
    text: "Good looks can help a product, but they are never the reason it works.",
    tools: ["Figma", "Wireframes", "Claude Design", "User flows", "DaVinci Resolve", "Design tokens and component library", "Affinity"],
  },
  {
    title: "Prototyping & user testing",
    text: "An hour of testing beats a week of opinions.",
    tools: ["Figma", "Clickable prototypes", "User testing", "5-second test", "A/B test", "Google Analytics"],
  },
  {
    title: "Frontend development",
    text: "A design isn’t finished until it runs.",
    tools: ["Next.js", "TypeScript", "VS Code", "Tailwind CSS", "HTML, CSS and JavaScript", "Three.js", "Spline", "Azure"],
  },
  {
    title: "AI workflows",
    text: "AI helps me make a better product first, and get there faster second.",
    tools: ["Claude Code", "MCP", "Claude Skills", "Cursor", "ComfyUI", "Higgsfield", "Obsidian", "Playwright"],
  },
  {
    title: "Collaboration",
    text: "The best ideas rarely come from one person.",
    tools: ["Git", "GitHub", "Pull requests", "Microsoft Teams", "Slack", "ClickUp"],
  },
];

// phase sits beside the filament. On a wide screen one label rides along with the light and retypes itself at each moment.
export type Moment = { title: string; phase: string; story: string };

export const moments: Moment[] = [
  {
    title: "Where it started",
    phase: "Still exploring",
    story:
      "I grew up drawing and building: art on paper, Lego on the floor and small games in Scratch. For a while, my side job was helping people at home with their computer problems. When I took computer science in secondary school, I knew I wanted to go into ICT.",
  },
  {
    title: "Bachelor’s in ICT",
    phase: "Finding my passion",
    story:
      "I chose Media Design as my specialisation, because thinking about the user and solving a real problem interested me most. Here I found out how much you can build with ICT, and that’s where my passion grew. Throughout my studies I came up with side projects and took on work for people I knew, to gain extra experience.",
  },
  {
    title: "Award-winning agency",
    phase: "Raising the bar",
    story:
      "My first internship, and a special one. Stuurmen builds websites and brands at the highest level, and that’s no accident: they work hard and keep strict standards, for me too. I fell flat more than once, still finished with a good result, and learned what working at a high level really takes.",
  },
  {
    title: "Graduating with the highest grade",
    phase: "Sharpening my tools",
    story:
      "Towards the end of my studies, AI became a more and more relevant skill for me. I put a lot of effort into learning to work with it well, and gave workshops about it at my school. I finished my internship at Boxplosive and my studies together, both successfully, with the highest grade in my class.",
  },
  {
    title: "Full-time product designer",
    phase: "Building with a team",
    story:
      "Boxplosive was very happy with the results of my internship assignment, so we chose to keep working together. What started as an internship and a side job grew into a full-time role, where I work on every step, from concepting and design to front-end, testing and improvements. I get a lot of responsibility, and it pushes me to grow.",
  },
];
