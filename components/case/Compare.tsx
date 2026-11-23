"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import about from "@/app/about/about.module.css";
import styles from "./case.module.css";

// Before and after on top of each other: drag the line, or use the arrow keys, to see one or the other.
// The first design lies underneath; the design after feedback is clipped from the left. The box is a
// window ([data-scroll-view]) and both designs are pages in it ([data-scroll-page]), so in a ScrollStage
// they scroll through together, each over its own length.
// Position updates go straight to the two elements that move, without a React render per frame.
// Without JS the line simply stays in the middle. The first time it comes into view, the line nudges
// once to show that it moves (not with reduced motion).
// With a crop, the box shows only one part of both screens (a window of w pixels wide from x, at its own y on
// each export, in the given ratio), as the detail crops on case 01.

type Shot = { src: string; alt: string; width: number; height: number };
type Crop = { x: number; w: number; yBefore: number; yAfter: number; ratio: number }; // ratio: height / width

export function Compare({
  before,
  after,
  labels = { before: "First design", after: "After feedback" },
  name = "Compare the first design with the design after feedback",
  crop,
}: {
  before: Shot;
  after: Shot;
  labels?: { before: string; after: string };
  name?: string; // the slider's accessible name
  crop?: Crop;
}) {
  const valueText = (p: number) =>
    `${Math.round(p)}% ${labels.before.toLowerCase()}, ${100 - Math.round(p)}% ${labels.after.toLowerCase()}`;
  // In % of the box's width, so the crop holds at every size
  const place = (y: number) =>
    crop && {
      width: `${(before.width / crop.w) * 100}%`,
      maxWidth: "none",
      marginLeft: `${(-crop.x / crop.w) * 100}%`,
      marginTop: `${(-y / crop.w) * 100}%`,
    };
  const sizes = crop
    ? `(max-width: 768px) ${Math.round((before.width / crop.w) * 92)}vw, ${Math.round((before.width / crop.w) * 420)}px`
    : "(max-width: 768px) 92vw, 720px";
  const box = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const set = (pos: number) => {
    const p = Math.min(100, Math.max(0, pos));
    if (top.current) top.current.style.clipPath = `inset(0 0 0 ${p}%)`;
    if (handle.current) handle.current.style.left = `${p}%`;
    if (input.current) {
      input.current.value = String(Math.round(p));
      input.current.setAttribute("aria-valuetext", valueText(p));
    }
  };

  // A drag anywhere on the image moves the line; vertical swipes still scroll the page (touch-action)
  const fromPointer = (e: React.PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (r) set(((e.clientX - r.left) / r.width) * 100);
  };

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // 50 → 38 → 50, eased in and out: a hint, not a show
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1100);
          const wave = Math.sin(t * Math.PI);
          set(50 - 12 * wave * wave);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={box}
      className={styles.compareBox}
      style={crop && { aspectRatio: `1 / ${crop.ratio}`, maxHeight: "none" }}
      data-scroll-view
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e);
      }}
    >
      <div className={styles.comparePage} data-scroll-page>
        <Image {...before} sizes={sizes} style={place(crop?.yBefore ?? 0) || undefined} draggable={false} />
      </div>
      <div ref={top} className={styles.compareTop} style={{ clipPath: "inset(0 0 0 50%)" }}>
        <div className={styles.comparePage} data-scroll-page>
          <Image {...after} sizes={sizes} style={place(crop?.yAfter ?? 0) || undefined} draggable={false} />
        </div>
      </div>
      <span className={`${styles.compareTag} ${about.label}`} data-side="before" aria-hidden="true">
        {labels.before}
      </span>
      <span className={`${styles.compareTag} ${about.label}`} data-side="after" aria-hidden="true">
        {labels.after}
      </span>
      <div ref={handle} className={styles.compareHandle} style={{ left: "50%" }} aria-hidden="true">
        <span>
          <svg viewBox="0 0 24 24">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
      {/* The keyboard and screen readers get a plain slider */}
      <input
        ref={input}
        className={styles.compareInput}
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label={name}
        aria-valuetext={valueText(50)}
        onChange={(e) => set(Number(e.currentTarget.value))}
      />
    </div>
  );
}
