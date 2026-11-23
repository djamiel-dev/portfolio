"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./case.module.css";

// A section that holds still while you scroll through it: the text on one side, a window on the other in
// which a whole page scrolls past. The visual marks its window with [data-scroll-view] and what scrolls
// in it with [data-scroll-page]; several pages scroll together, each over its own length.
// Optionally, parts of the page ([data-scroll-mark]) can each have a step in the text ([data-scroll-step], same
// order): the step whose part has reached the middle of the window gets [data-active], and so does that part.
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
    const marks = el ? [...el.querySelectorAll<HTMLElement>("[data-scroll-mark]")] : [];
    const steps = el ? [...el.querySelectorAll<HTMLElement>("[data-scroll-step]")] : [];
    const activate = (index: number) => {
      [marks, steps].forEach((list) =>
        list.forEach((item, i) => item.toggleAttribute("data-active", i === index)),
      );
    };
    if (!on || !el || !view) {
      pages.forEach((p) => (p.style.transform = ""));
      activate(-1);
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
      if (marks.length) {
        const middle = view.getBoundingClientRect().top + shown / 2;
        let index = 0;
        marks.forEach((m, i) => {
          if (m.getBoundingClientRect().top <= middle) index = i;
        });
        activate(index);
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
      className={styles.scrolly}
      data-on={on || undefined}
      data-side={side}
      style={on ? { height: `${length}vh` } : undefined}
    >
      <div className={styles.scrollyStick}>
        <div className={styles.scrollyText}>{children}</div>
        <figure className={styles.scrollyFigure}>
          {visual}
          <figcaption className={styles.small}>{caption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
