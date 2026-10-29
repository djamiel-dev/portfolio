import type { Metadata, Viewport } from "next";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";

// One family for the page: the width axis does the work a second face would do
const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-e",
  display: "swap",
});

// Only for the glyph field behind the hero
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Djamiel – AI-native product designer",
  description:
    "AI-native product designer who researches, designs and builds, from real problem to live product.",
  // Hidden from search engines until launch: content is still placeholder
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#eeefeb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mona.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
