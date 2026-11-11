"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./ai.module.css";

export type SkillUse = { title: string; ai: string; me: string; check: string };

const cells = [
  { key: "ai", label: "What AI does" },
  { key: "me", label: "What I do" },
  { key: "check", label: "How I check it" },
] as const;

// Height of the sticky nav bar on a wide screen (home.module.css .top)
const BAR = 72;

/**
 * The skills as tabs along a filament: one is lit at a time and shows its three cells.
 *
 * - pinned: on a wide screen, with motion allowed and room for the whole block, the block stays in
 *   view while scrolling switches on one skill after another; after the last one the page moves on.
 * - tabs: as soon as someone picks a skill (click or keys) the scroll steering stops for good and the
 *   tabs work on their own. Also on a phone, with reduced motion, or on a screen too short to pin.
 * - static: without JS (and before hydration) every skill is shown in full, one after the other.
 */
export function SkillTabs({ skills, title }: { skills: SkillUse[]; title: ReactNode }) {
  const id = useId();
  const outer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const picked = useRef(false);
  // Where the block sat on screen when someone picked a skill, so unpinning doesn't move it
  const anchor = useRef<number | null>(null);
  const [mode, setMode] = useState<"static" | "pinned" | "tabs">("static");
  const [active, setActive] = useState(0);
  // The lit stretch of filament: from the lit bulb towards the next one, as far as the scroll has come
  const [segment, setSegment] = useState({ top: 0, height: 0 });

  // Choose the mode, and choose again when the screen or the motion setting changes. The block is
  // measured in its live layout (one panel at a time), so the first pass only switches to tabs.
  const live = mode !== "static";

  useEffect(() => {
    if (!live) {
      setMode("tabs");
      return;
    }
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const wide = window.matchMedia("(min-width: 48em)");
    const update = () => {
      const g = grid.current;
      const h = head.current;
      // Heading and block must fit together, since they start out side by side on the pinned stage
      const fits = !!g && !!h && h.offsetHeight + g.offsetHeight + 48 <= window.innerHeight - BAR - 48;
      setMode(!picked.current && motion.matches && wide.matches && fits ? "pinned" : "tabs");
    };
    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [live]);

  // Centre of a bulb, measured from the top of the list
  function centre(i: number) {
    const bulb = tabs.current[i]?.firstElementChild;
    const l = list.current;
    if (!bulb || !l) return 0;
    const b = bulb.getBoundingClientRect();
    return b.top + b.height / 2 - l.getBoundingClientRect().top;
  }

  // Pinned: the outer box is as tall as the scroll it takes to pass every skill once
  useEffect(() => {
    const o = outer.current;
    const st = stage.current;
    const h = head.current;
    const g = grid.current;
    if (mode !== "pinned" || !o || !st || !h || !g) return;
    const n = skills.length;
    let step = 0;
    let lead = 0;

    // The lit line runs from the first bulb through every skill passed, and on towards the next.
    // It eases after the scroll instead of jumping with each wheel step.
    let target = 0;
    let height = 0;
    let top = 0;
    let raf = 0;

    const frame = () => {
      height += (target - height) * 0.14;
      if (Math.abs(target - height) < 0.3) height = target;
      setSegment({ top, height });
      raf = height === target ? 0 : requestAnimationFrame(frame);
    };

    const read = () => {
      const pinned = BAR - o.getBoundingClientRect().top;
      // Over the first stretch (the lead) the heading slides up out of view and the block rises to
      // the middle, tied to the scroll as on the homepage; only then do the skills start to switch
      st.style.setProperty("--intro", Math.min(1, Math.max(0, pinned / lead)).toFixed(4));
      const scrolled = pinned - lead;
      const at = Math.min(n - 1, Math.max(0, scrolled / step));
      const i = Math.min(n - 1, Math.floor(at));
      setActive(i);
      // The bulb lights first; over the rest of its stretch the line runs on to the next bulb
      const run = Math.min(1, Math.max(0, (at - i - 0.25) / 0.75));
      top = centre(0);
      const lit = centre(i) - top;
      target = lit + (i < n - 1 ? (centre(i + 1) - centre(i)) * run : 0);
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const measure = () => {
      step = Math.round(window.innerHeight * 0.45);
      lead = Math.round(window.innerHeight * 0.35);
      o.style.height = `${window.innerHeight - BAR + lead + step * n}px`;
      // How far the block rises to be centred alone, and how far the heading goes to leave the stage
      st.style.setProperty("--lift", `${g.offsetTop - (st.clientHeight - g.offsetHeight) / 2}px`);
      st.style.setProperty("--out", `${h.offsetTop + h.offsetHeight + 24}px`);
      read();
    };

    measure();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", measure);
      o.style.height = "";
      st.style.removeProperty("--intro");
      st.style.removeProperty("--lift");
      st.style.removeProperty("--out");
    };
  }, [mode, skills.length]);

  // After unpinning, scroll by the difference so the block stays exactly where it was
  useLayoutEffect(() => {
    const g = grid.current;
    if (mode !== "tabs" || anchor.current === null || !g) return;
    const moved = g.getBoundingClientRect().top - anchor.current;
    anchor.current = null;
    if (moved) window.scrollTo({ top: window.scrollY + moved, behavior: "instant" });
  }, [mode]);

  // Picking a skill hands control to the visitor: no more steering by scroll
  function pick(i: number) {
    if (mode === "pinned" && grid.current) {
      anchor.current = grid.current.getBoundingClientRect().top;
      picked.current = true;
      setMode("tabs");
    }
    setActive(i);
    const top = centre(0);
    setSegment({ top, height: centre(i) - top });
  }

  // Arrow keys move along the list and switch on the skill they land on (WAI-ARIA tabs)
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = skills.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i === last ? 0 : i + 1)
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i === 0 ? last : i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    tabs.current[next]?.focus();
  }

  return (
    <div ref={outer} className={styles.skillTabs} data-live={live ? "" : undefined} data-mode={mode}>
      <div ref={stage} className={styles.stage}>
        <div ref={head} className={styles.stageTitle}>
          {title}
        </div>
        <div ref={grid} className={styles.tabGrid}>
          <div
            ref={list}
            role="tablist"
            aria-orientation="vertical"
            aria-label="Skills"
            className={styles.tablist}
            style={{ "--seg-top": `${segment.top}px`, "--seg-height": `${segment.height}px` } as React.CSSProperties}
          >
            {skills.map((s, i) => (
              <button
                key={s.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                data-lit={i === active ? "" : undefined}
                data-passed={i < active ? "" : undefined}
                onClick={() => pick(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.tabBulb} aria-hidden="true" />
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.panels}>
            {skills.map((s, i) => (
              <div
                key={s.title}
                role={live ? "tabpanel" : undefined}
                id={`${id}-panel-${i}`}
                aria-labelledby={live ? `${id}-tab-${i}` : undefined}
                tabIndex={live && i === active ? 0 : undefined}
                className={styles.panel}
                data-active={i === active ? "" : undefined}
              >
                <h3 className={styles.panelTitle}>{s.title}</h3>
                <dl className={styles.panelCells}>
                  {cells.map((c) => (
                    <div key={c.key}>
                      <dt>{c.label}</dt>
                      <dd>{s[c.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
