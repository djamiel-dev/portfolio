import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Geist_Mono } from "next/font/google";

const shoulders = Big_Shoulders({ subsets: ["latin"], variable: "--font-c-board", display: "swap", adjustFontFallback: false });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-c-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Djamiel – product designer who builds (C)",
  description: "Exploration C: departure board.",
};

export const viewport: Viewport = { themeColor: "#0d0e0f" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${shoulders.variable} ${geistMono.variable}`}>{children}</div>;
}
