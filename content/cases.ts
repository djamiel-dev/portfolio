// Case content for the homepage. Text in [brackets] is a placeholder
// and must be replaced before going live.

export type CaseMedia = {
  aspect: "4 / 3" | "16 / 10";
  caption: string;
  tone?: "light" | "dark";
  badge?: string;
  marker?: boolean;
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
    label: "Collaborative Strength",
    href: "#case-1",
    outcome: "[A coaching site that turns visitors into booked intake calls]",
    meta: "Powerlifting coach · Freelance [Year]",
    media: { aspect: "4 / 3", caption: "[Loop: live site on desktop and phone]", badge: "Live · Next.js" },
  },
  {
    num: "02",
    label: "Lash studio",
    href: "#case-2",
    outcome: "[Online booking that replaced back-and-forth over WhatsApp]",
    meta: "Lash studio · Project [Year]",
    media: { aspect: "16 / 10", caption: "[Loop: booking flow on phone]" },
  },
  {
    num: "03",
    label: "Incentive portal",
    href: "#case-3",
    outcome: "[A rewards portal managers can use without training]",
    meta: "[Company] · Internship [Year]",
    media: { aspect: "16 / 10", caption: "[Screens: rewards, points and undo]" },
  },
  {
    num: "04",
    label: "This portfolio",
    href: "#making-of",
    outcome: "How I designed and built this site with AI",
    meta: "Making of · 2026",
    media: { aspect: "4 / 3", caption: "[From sketch to Figma to code]", tone: "dark", marker: true },
  },
];
