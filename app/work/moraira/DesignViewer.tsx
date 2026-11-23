"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import mo from "./mo.module.css";

// The six pages of the final design, as exported from Figma (page "moraira", bottom row), 1440 wide
export const designPages = [
  { name: "Home", src: "/images/cases/moraira/pages/home.webp", height: 6219 },
  { name: "Villas", src: "/images/cases/moraira/pages/villas.webp", height: 2910 },
  { name: "Villa", src: "/images/cases/moraira/pages/villa.webp", height: 5316 },
  { name: "About Moraira", src: "/images/cases/moraira/pages/about.webp", height: 3203 },
  { name: "Insider tips", src: "/images/cases/moraira/pages/insider-tips.webp", height: 2583 },
  { name: "Contact", src: "/images/cases/moraira/pages/contact.webp", height: 2205 },
];

/*
 * All pages of the design, full screen: one page per slide, side by side. Each page scrolls on its own; left and
 * right (buttons, arrow keys, a swipe or a trackpad) go to the next page. A native modal <dialog>: focus stays
 * inside, Escape closes, and focus returns to the button that opened it. The images only load once it opens.
 */
export function DesignViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      setShown(true);
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  // Which page is in view, from the track's own scroll position (so a swipe updates the counter too)
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const onScroll = () => setIndex(Math.round(t.scrollLeft / t.clientWidth));
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, [shown]);

  const go = useCallback((to: number) => {
    const t = track.current;
    if (!t) return;
    const i = Math.max(0, Math.min(designPages.length - 1, to));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({ left: i * t.clientWidth, behavior: still ? "auto" : "smooth" });
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  return (
    <dialog
      ref={dialog}
      className={mo.viewer}
      aria-label="The website design, page by page"
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      onKeyDown={onKey}
    >
      <div className={mo.viewerBar}>
        <p className={mo.viewerTitle} aria-live="polite">
          <span>{designPages[index]?.name}</span>
          <span className={mo.viewerCount}>
            {index + 1} / {designPages.length}
          </span>
        </p>
        <div className={mo.viewerControls}>
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous page">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.5 6 8.5 12l6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === designPages.length - 1}
            aria-label="Next page"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9.5 6 6 6-6 6" />
            </svg>
          </button>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={track} className={mo.viewerTrack}>
        {shown &&
          designPages.map((p, i) => (
            <section
              key={p.src}
              className={mo.viewerSlide}
              aria-roledescription="slide"
              aria-label={`${p.name}, ${i + 1} of ${designPages.length}`}
              tabIndex={0}
            >
              <Image
                src={p.src}
                alt={`The ${p.name} page of the website design, from top to bottom.`}
                width={1440}
                height={p.height}
                sizes="(max-width: 1440px) 100vw, 1200px"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </section>
          ))}
      </div>
    </dialog>
  );
}
