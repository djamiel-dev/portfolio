"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import c from "@/components/case/case.module.css";
import { DesignViewer } from "@/components/case/DesignViewer";

// The hero of the homepage design with the video I made for it. Figma couldn't hold the video, so the design comes
// in two layers: the video, and on top of it the Figma export without the photo (menu, the 50% dark layer, heading,
// text and buttons; made transparent by exporting on black and on white). Positions are in % of the 1920 × 960 hero.
// Muted, looping, only playing in view; with reduced motion it waits on its first frame until someone presses play.
// Inline styles for now: the case gets its own design in a later step.
const frame: CSSProperties = { position: "relative", aspectRatio: "1920 / 960", overflow: "hidden", borderRadius: "var(--r-screen)", background: "#2a2b2e" };
const videoBox: CSSProperties = { position: "absolute", left: 0, top: "9.375%", width: "100%", height: "90.625%", objectFit: "cover" };
const layer: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };

// The six pages of the final design, as exported from Figma (page "moraira", bottom row), 1440 wide
const designPages = [
  { name: "Home", src: "/images/cases/moraira/pages/home.webp", height: 6219 },
  { name: "Villas", src: "/images/cases/moraira/pages/villas.webp", height: 2910 },
  { name: "Villa", src: "/images/cases/moraira/pages/villa.webp", height: 5316 },
  { name: "About Moraira", src: "/images/cases/moraira/pages/about.webp", height: 3203 },
  { name: "Insider tips", src: "/images/cases/moraira/pages/insider-tips.webp", height: 2583 },
  { name: "Contact", src: "/images/cases/moraira/pages/contact.webp", height: 2205 },
].map((p) => ({ ...p, width: 1440, alt: `The ${p.name} page of the website design, from top to bottom.` }));

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [viewing, setViewing] = useState(false);
  // What the viewer chose; null until they press the button
  const chosen = useRef<"play" | "pause" | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) chosen.current = "pause";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && chosen.current !== "pause") video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      chosen.current = "play";
      video.play().catch(() => {});
    } else {
      chosen.current = "pause";
      video.pause();
    }
  };

  return (
    <div className={c.clip} style={{ marginTop: "clamp(48px, 6vw, 96px)" }}>
      {/* What the hero shows, for screen readers: the image inside the button has no alt of its own */}
      <p id="hero-design" className="visually-hidden">
        The hero of the new homepage: Your mediterranean holiday home, with View Villas and Contact Us buttons, over a video of Moraira: the beach, the market, the coast road and a terrace in the village.
      </p>
      {/* The hero is the way into the whole design: "View designs" at the pointer (CaseCursor), and a click opens all
          pages full screen. The pause button sits beside it, not inside it */}
      <button
        type="button"
        className={c.heroOpen}
        onClick={() => setViewing(true)}
        data-case
        data-cursor="View designs"
        aria-haspopup="dialog"
        aria-label="View all pages of the website design"
        aria-describedby="hero-design"
      >
        <div style={frame}>
          <video
            ref={ref}
            src="/images/cases/moraira/hero.mp4"
            poster="/images/cases/moraira/hero.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            style={videoBox}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
          />
          <Image
            src="/images/cases/moraira/hero-layer.webp"
            alt=""
            width={1920}
            height={960}
            sizes="(max-width: 1440px) 100vw, 1440px"
            style={layer}
            priority
          />
        </div>
      </button>
      <button type="button" className={c.clipButton} onClick={toggle} aria-pressed={!paused}>
        <span className="visually-hidden">Play the hero video</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {paused ? <path d="M8 5.5v13l10.5-6.5z" /> : <path d="M8.5 5.5v13M15.5 5.5v13" />}
        </svg>
      </button>
      <DesignViewer
        open={viewing}
        onClose={() => setViewing(false)}
        pages={designPages}
        label="The website design, page by page"
      />
    </div>
  );
}
