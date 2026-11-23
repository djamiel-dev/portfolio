"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import c from "./case.module.css";

export type ViewerPage = { name: string; src: string; width: number; height: number; alt: string };

/*
 * All pages (or screens) of a design, full screen: one per slide, side by side. Each scrolls on its own; left and
 * right (buttons, arrow keys, a swipe or a trackpad) go to the next one. A native modal <dialog>: focus stays
 * inside, Escape closes, and focus returns to the button that opened it. The images only load once it opens.
 * Used by the heroes of case 01 (all MVP screens, each in a phone through `render`) and case 04 (the six pages of
 * the website).
 */
export function DesignViewer({
  open,
  onClose,
  pages,
  label,
  unit = "page",
  maxWidth = 1200,
  render,
}: {
  open: boolean;
  onClose: () => void;
  pages: ViewerPage[];
  label: string; // the dialog's name, such as "The website design, page by page"
  unit?: string; // what one slide is called on the buttons: "page", "screen"
  maxWidth?: number; // the widest an image is shown, in px
  render?: (index: number) => ReactNode; // draws a slide itself (such as a screen in a phone), centred in view
}) {
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

  // Where a button or arrow key is scrolling to, until it gets there: so pressing three times quickly goes three on,
  // not one (halfway through the scroll the page in view is still the old one)
  const heading = useRef<number | null>(null);

  // Which page is in view, from the track's own scroll position (so a swipe updates the counter too)
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const onScroll = () => {
      setIndex(Math.round(t.scrollLeft / t.clientWidth));
      const there = heading.current !== null && Math.abs(t.scrollLeft - heading.current * t.clientWidth) < 2;
      if (there) heading.current = null;
    };
    const onEnd = () => (heading.current = null);
    t.addEventListener("scroll", onScroll, { passive: true });
    t.addEventListener("scrollend", onEnd);
    return () => {
      t.removeEventListener("scroll", onScroll);
      t.removeEventListener("scrollend", onEnd);
    };
  }, [shown]);

  // One page on or back, from where it is heading (or else from the page in view)
  const go = useCallback((step: number) => {
    const t = track.current;
    if (!t) return;
    const from = heading.current ?? Math.round(t.scrollLeft / t.clientWidth);
    const i = Math.max(0, Math.min(pages.length - 1, from + step));
    heading.current = i;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({ left: i * t.clientWidth, behavior: still ? "auto" : "smooth" });
  }, [pages.length]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <dialog
      ref={dialog}
      className={c.viewer}
      aria-label={label}
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      onKeyDown={onKey}
    >
      <div className={c.viewerBar}>
        <p className={c.viewerTitle} aria-live="polite">
          <span>{pages[index]?.name}</span>
          <span className={c.viewerCount}>
            {index + 1} / {pages.length}
          </span>
        </p>
        <div className={c.viewerControls}>
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label={`Previous ${unit}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.5 6 8.5 12l6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === pages.length - 1}
            aria-label={`Next ${unit}`}
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

      <div ref={track} className={c.viewerTrack}>
        {shown &&
          pages.map((p, i) => (
            <section
              key={p.src}
              className={c.viewerSlide}
              data-fit={render ? "" : undefined}
              aria-roledescription="slide"
              aria-label={`${p.name}, ${i + 1} of ${pages.length}`}
              tabIndex={0}
            >
              {render ? (
                render(i)
              ) : (
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes={`(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`}
                  style={{ maxWidth }}
                  loading={i < 2 ? "eager" : "lazy"}
                />
              )}
            </section>
          ))}
      </div>
    </dialog>
  );
}
