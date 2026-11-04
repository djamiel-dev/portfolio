// Case content for the homepage. Text in [brackets] is a placeholder
// and must be replaced before going live.

export type CaseMedia = {
  aspect: "4 / 3" | "16 / 10";
  caption: string;
  tone?: "light" | "dark";
  badge?: string;
  marker?: boolean;
  image?: string;
  fit?: "cover" | "contain"; // cover: fills the width from the top (screenshot or pre-cropped laptop mockup); contain: cut-out mockup inset on a plain ground
};

export type Case = {
  num: string;
  label: string;
  href: string;
  outcome: string;
  meta: string;
  media: CaseMedia;
};

export const cases: Case[] = [
  {
    num: "01",
    label: "Incentive portal",
    href: "#case-1",
    outcome: "A rewards portal managers can use without training",
    meta: "[Company] · Internship [Year]",
    media: { aspect: "4 / 3", caption: "[Screens: rewards, points and undo]", image: "/images/cases/jobrewards.png", fit: "contain" },
  },
  {
    num: "02",
    label: "Collaborative Strength",
    href: "#case-2",
    outcome: "A website for my own powerlifting coaching",
    meta: "Own coaching business · [Year]",
    media: { aspect: "4 / 3", caption: "[Loop: live site on desktop and phone]", badge: "Live · Next.js", image: "/images/cases/powerlifting-laptop.png" },
  },
  {
    num: "03",
    label: "Stuurmen",
    href: "#case-3",
    outcome: "An inspiration tool clients use to prepare for a branding session",
    meta: "Stuurmen · [Project] [Year]",
    media: { aspect: "4 / 3", caption: "[Work overview with wishlist]", image: "/images/cases/stuurmen-laptop.png" },
  },
  {
    num: "04",
    label: "Moraira Dream Villas",
    href: "#case-4",
    outcome: "A website for renting holiday villas in Moraira",
    meta: "Moraira Dream Villas · [Project] [Year]",
    media: { aspect: "4 / 3", caption: "[Homepage and villa pages]", image: "/images/cases/moraira-laptop.png" },
  },
];
