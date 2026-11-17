"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./case.module.css";

// A bento tile: the count large, what it means small, and the people as dots.
// Small counts as dots, not percentages: seven people is not a survey.
// The first time the tile scrolls into view, the count rises from 0 and the dots light up with it.
// Without JS, before it is seen from above, and with reduced motion, it simply shows the final state.
export function StatTile({ of, lit, label, tone = "fg" }: { of: number; lit: number; label: string; tone?: "fg" | "accent" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(lit);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only count when the tile is still below the fold; a tile already passed stays as it is
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out: fast start, gentle landing
          setShown(Math.round(eased * lit));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [lit]);

  return (
    <div ref={ref} className={styles.stat} data-tone={tone}>
      {/* Screen readers get the final count, not the numbers on the way */}
      <p className={styles.statNum}>
        <span className="visually-hidden">
          {lit} of {of}
        </span>
        <span aria-hidden="true">{shown}</span>
        <span className={styles.statOf} aria-hidden="true">
          {" "}
          of {of}
        </span>
      </p>
      <p className={styles.statLabel}>{label}</p>
      <span className={styles.dots} aria-hidden="true">
        {Array.from({ length: of }, (_, i) => (
          <i key={i} data-on={i < shown || undefined} />
        ))}
      </span>
    </div>
  );
}
