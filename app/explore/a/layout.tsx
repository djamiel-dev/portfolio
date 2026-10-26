import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-a-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-a-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Djamiel – product designer who builds (A)",
  description: "Exploration A: construction grid.",
};

export const viewport: Viewport = { themeColor: "#f6f6f4" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${geist.variable} ${geistMono.variable}`}>{children}</div>;
}
