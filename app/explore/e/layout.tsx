import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";

// One family for everything: the width axis does the work a second face would do
const mona = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-e", display: "swap" });

export const metadata: Metadata = {
  title: "Djamiel – product designer who builds (E)",
  description: "Exploration E: the page as one day of light, from daylight work to a filament that switches on the contact.",
};

export const viewport: Viewport = { themeColor: "#eeefeb" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={mona.variable}>{children}</div>;
}
