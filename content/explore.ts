// Shared content for the exploration routes (/explore/a, /b, /c).
// Text in [brackets] is a placeholder and must be replaced before going live.
import { cases } from "./cases";
import { links } from "./site";

export type Status = "live" | "planned" | "pending" | "building";

export const statusLabel: Record<Status, string> = {
  live: "Live",
  planned: "Planned",
  pending: "Pending",
  building: "In progress",
};

export type ExploreCase = {
  num: string;
  name: string;
  short: string; // fits a departure-board cell, max 18 characters
  outcome: string;
  type: string;
  year: string;
  status: Status;
  href: string;
  caption: string; // what the image or loop will show
  liveUrl?: string;
  notes: { problem: string; insight: string; decision: string };
  ai: string;
};

const extra: Record<string, Omit<ExploreCase, "num" | "name" | "outcome" | "href" | "caption">> = {
  "01": {
    short: "Coaching site",
    type: "Freelance · Next.js",
    year: "[Year]",
    status: "live",
    liveUrl: "https://colaborative.vercel.app/",
    notes: {
      problem: "[Coaches lose leads between Instagram and a contact form]",
      insight: "[Athletes want to see the coaching method before they book]",
      decision: "[Booking call as the single action on every page]",
    },
    ai: "[AI drafted three page structures; I kept one and rewrote the copy]",
  },
  "02": {
    short: "Lash studio",
    type: "Project · Design system",
    year: "[Year]",
    status: "planned",
    notes: {
      problem: "[Bookings run through WhatsApp back-and-forth]",
      insight: "[Clients want to see open slots before they ask]",
      decision: "[Booking flow first, portfolio second]",
    },
    ai: "[AI suggestion and what I changed]",
  },
  "03": {
    short: "Incentive portal",
    type: "Internship · Product",
    year: "[Year]",
    status: "pending",
    notes: {
      problem: "[Managers need to reward staff quickly]",
      insight: "[Undo matters more than speed]",
      decision: "[Every reward can be reversed]",
    },
    ai: "[AI suggestion and what I changed]",
  },
  "04": {
    short: "This portfolio",
    type: "Making of · AI workflow",
    year: "2026",
    status: "building",
    notes: {
      problem: "Version J looked good but was borrowed",
      insight: "Measure real references before designing",
      decision: "Explore three concepts as live routes",
    },
    ai: "AI guessed the reference colours; I made it measure the real CSS first",
  },
};

export const exploreCases: ExploreCase[] = cases.map((c) => ({
  num: c.num,
  name: c.label,
  outcome: c.outcome,
  href: c.href,
  caption: c.media.caption,
  ...extra[c.num],
}));

export const person = {
  name: "Djamiel",
  role: "Product designer who builds",
  line: "I research, design and build, from a real problem to a live product.",
  place: "Tilburg, NL",
};

export const contact = {
  email: "[email]",
  emailHref: links.email,
  resume: links.resume,
  linkedin: links.linkedin,
  github: links.github,
  call: links.call,
};

export const isPlaceholder = (text: string) => text.trim().startsWith("[");
