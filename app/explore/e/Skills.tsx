"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "./content";
import styles from "./e.module.css";
import { SkillVisual } from "./SkillVisual";

/**
 * Golden hour. On a wide screen the row is pinned and vertical scroll slides the
 * skills through one pool of light; the skill in the light is the active one.
 * On a phone the list stays vertical and the light falls on the skill in the
 * middle of the screen. Without JS or with reduced motion: a plain, fully lit list.
 */
export function Skills() {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [mode, setMode] = useState<"static" | "pinned" | "list">("static");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const wide = window.matchMedia("(min-width: 48em)");
    const update = () => setMode(!motion.matches ? "static" : wide.matches ? "pinned" : "list");
    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  // Pinned: the row starts with the first skill in the light and ends with the last
  useEffect(() => {
    const o = outer.current;
    const s = stage.current;
    const t = track.current;
    if (mode !== "pinned" || !o || !s || !t) return;

    // Scrolling moves the row faster than the page, so six skills cost about two screens
    const pace = 0.55;
    let start = 0;
    let distance = 0;
    let target = 0;
    let x = 0;
    let raf = 0;
    let inView = false;

    // Measured from the rendered boxes with the row at rest, so borders and padding can't skew it
    const measure = () => {
      const panel = t.firstElementChild as HTMLElement;
      const last = t.lastElementChild as HTMLElement;
      t.style.transform = "none";
      const stageBox = s.getBoundingClientRect();
      const first = panel.getBoundingClientRect();
      start = stageBox.left + stageBox.width / 2 - first.width / 2 - first.left;
      distance = last.getBoundingClientRect().left - first.left;
      o.style.height = `${window.innerHeight + distance * pace}px`;
      read();
      x = target;
      t.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    // Each skill rests in the light for a moment before the next one slides in
    const read = () => {
      const steps = skills.length - 1;
      const progress = distance ? Math.min(1, Math.max(0, -o.getBoundingClientRect().top / (distance * pace))) : 0;
      const i = Math.min(steps - 1, Math.floor(progress * steps));
      const g = Math.min(1, Math.max(0, (progress * steps - i - 0.2) / 0.6));
      const step = i + g * g * (3 - 2 * g);
      target = start - (step / steps) * distance;
      setActive(Math.round(step));
    };

    // A little lag on the row so wheel steps glide instead of jump
    const frame = () => {
      x += (target - x) * 0.18;
      if (Math.abs(target - x) < 0.3) x = target;
      t.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      raf = x === target ? 0 : requestAnimationFrame(frame);
    };

    const onScroll = () => {
      if (!inView) return;
      read();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const seen = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) onScroll();
    });

    // Re-measure whenever the cards change size (fonts, CSS, viewport)
    const sized = new ResizeObserver(() => measure());
    sized.observe(t);
    measure();
    seen.observe(o);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      seen.disconnect();
      sized.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      o.style.height = "";
      t.style.transform = "";
    };
  }, [mode]);

  // Phone: the skill crossing the middle of the screen is the one in the light
  useEffect(() => {
    const t = track.current;
    if (mode !== "list" || !t) return;
    const items = Array.from(t.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(items.indexOf(e.target));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [mode]);

  const count = String(skills.length).padStart(2, "0");

  return (
    <section
      ref={outer}
      className={styles.skills}
      data-zone="golden"
      data-pinned={mode === "pinned" || undefined}
      data-live={mode !== "static" || undefined}
      aria-labelledby="e-skills"
    >
      <div ref={stage} className={styles.skillsStage}>
        <h2 id="e-skills" className={styles.skillsTitle}>
          From the first interview to the last line of code.
        </h2>
        <ol ref={track} className={styles.skillsTrack}>
          {skills.map((s, i) => (
            <li key={s.title} className={styles.skill} data-active={i === active || undefined}>
              <div className={styles.skillFigure}>
                <span className={styles.skillNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SkillVisual index={i} className={styles.skillVisual} />
              </div>
              <div className={styles.skillBody}>
                <h3 className={styles.skillName}>{s.title}</h3>
                <p className={styles.skillText}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {mode === "pinned" && (
          <div className={styles.skillsProgress} aria-hidden="true">
            <span className={styles.skillsCount}>
              {String(active + 1).padStart(2, "0")} / {count}
            </span>
            <span className={styles.skillsBar}>
              <span style={{ transform: `scaleX(${(active + 1) / skills.length})` }} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
