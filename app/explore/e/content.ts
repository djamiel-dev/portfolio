// Content for /explore/e that D keeps inside its components.
// Text in [brackets] is a placeholder and must be replaced before going live.

export type Skill = { title: string; text: string };

export const skills: Skill[] = [
  { title: "Research & user testing", text: "[Interviews, usability tests and what I do with the findings]" },
  { title: "UI/UX design", text: "[Flows, wireframes and interface design in Figma]" },
  { title: "Frontend development", text: "[Building what I design in Next.js, TypeScript and CSS]" },
  { title: "Prototyping", text: "[Clickable and coded prototypes to test ideas early]" },
  { title: "AI workflows", text: "[How I use AI to explore more and check my own work]" },
  { title: "Design systems", text: "[Tokens and components that keep design and code in sync]" },
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
