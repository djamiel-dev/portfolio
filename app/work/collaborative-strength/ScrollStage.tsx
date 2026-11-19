"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../incentive-portal/case.module.css";
import cs from "./cs.module.css";

// A section that holds still while you scroll through it: the text on one side, a window on the other in
// which a whole page scrolls past. The visual marks its window with [data-scroll-view] and what scrolls
// in it with [data-scroll-page]; several pages scroll together, each over its own length.
// Only on wide screens with motion allowed. Otherwise (phone, reduced motion, no JS) nothing moves and
// the section is laid out as a normal text and image.

export function ScrollStage({
  visual,
  caption,
  side = "left",
  length = 240,
  children,
}: {
  visual: ReactNode;
  caption: string;
  side?: "left" | "right";
  length?: number; // how long the section is while it moves, in vh
  children: ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 48em) and (min-height: 40em)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOn(wide.matches && !still.matches);
    update();
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const view = el?.querySelector<HTMLElement>("[data-scroll-view]");
    const pages = el ? [...el.querySelectorAll<HTMLElement>("[data-scroll-page]")] : [];
    if (!on || !el || !view) {
      pages.forEach((p) => (p.style.transform = ""));
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      const shown = view.clientHeight;
      // Straight onto the elements that move, without a React render per frame
      for (const page of pages) {
        const y = p * Math.max(0, page.offsetHeight - shown);
        page.style.transform = `translate3d(0, ${-y}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [on]);

  return (
    <div
      ref={wrap}
      className={cs.scrolly}
      data-on={on || undefined}
      data-side={side}
      style={on ? { height: `${length}vh` } : undefined}
    >
      <div className={cs.scrollyStick}>
        <div className={cs.scrollyText}>{children}</div>
        <figure className={cs.scrollyFigure}>
          {visual}
          <figcaption className={styles.small}>{caption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
