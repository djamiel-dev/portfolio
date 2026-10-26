import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Kalam } from "next/font/google";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-b-print", display: "swap" });
// Stand-in for Djamiel's own scanned handwriting
const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-b-hand", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Djamiel – product designer who builds (B)",
  description: "Exploration B: research wall.",
};

export const viewport: Viewport = { themeColor: "#eceeec" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${bricolage.variable} ${kalam.variable}`}>{children}</div>;
}
