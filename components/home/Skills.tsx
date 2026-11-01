"use client";

import { useEffect, useRef, useState } from "react";
import { skills, toolIcons } from "./content";
import styles from "./home.module.css";
import { SkillVisual } from "./SkillVisual";

/**
 * On a wide screen the row is pinned and vertical scroll slides the
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
      data-zone="day"
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
              <ToolReel tools={s.tools} running={mode === "static" || i === active} drift={mode !== "static"} />
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

/**
 * A slow, endless row of the tools behind a skill. It only shows and moves on the
 * active card, and can be grabbed and thrown in either direction; once let go it
 * eases back to its own pace. The second copy exists to make the loop seamless and
 * is hidden from assistive tech, which reads the first copy as a plain list.
 * With reduced motion the row stands still until it is dragged, and doesn't coast.
 */
function ToolReel({ tools, running, drift }: { tools: string[]; running: boolean; drift: boolean }) {
  const reel = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, v: 0 }); // survives the card going in and out of the light

  useEffect(() => {
    const r = reel.current;
    const t = track.current;
    if (!running || !r || !t) return;
    const row = t.firstElementChild as HTMLElement;
    const m = pos.current;
    let width = row.getBoundingClientRect().width;
    let raf = 0;
    let prev = 0;
    let seen = false;
    let pointer: number | null = null;
    let lastX = 0;
    let lastT = 0;
    let held: Element | null = null;

    const frame = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;
      const pace = drift ? -width / 22 : 0;
      if (pointer === null) {
        m.v += (pace - m.v) * (1 - Math.exp(-dt / 450));
        m.x += (m.v * dt) / 1000;
      } else {
        m.v *= Math.exp(-dt / 120);
      }
      if (width) m.x = ((m.x % width) + width) % width - width;
      t.style.transform = `translate3d(${m.x.toFixed(2)}px, 0, 0)`;
      const lean = pointer === null ? m.v - pace : m.v;
      t.style.setProperty("--lean", `${Math.max(-7, Math.min(7, lean / 160)).toFixed(2)}deg`);
      raf = drift || pointer !== null || Math.abs(m.v) > 1 ? requestAnimationFrame(frame) : 0;
    };
    const start = () => {
      if (raf || !seen) return;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const down = (e: PointerEvent) => {
      if (e.button !== 0 || pointer !== null) return;
      pointer = e.pointerId;
      r.setPointerCapture(pointer);
      lastX = e.clientX;
      lastT = e.timeStamp;
      m.v = 0;
      held = (e.target as Element).closest("li");
      held?.setAttribute("data-held", "");
      r.setAttribute("data-grabbing", "");
      start();
    };
    const move = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      const dx = e.clientX - lastX;
      const dt = Math.max(e.timeStamp - lastT, 1);
      m.x += dx;
      m.v = m.v * 0.6 + ((dx / dt) * 1000) * 0.4;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };
    const up = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = null;
      if (e.timeStamp - lastT > 100) m.v = 0; // held still before letting go: no throw
      if (!drift) m.v = 0;
      held?.removeAttribute("data-held");
      held = null;
      r.removeAttribute("data-grabbing");
      start();
    };

    const sized = new ResizeObserver(() => (width = row.getBoundingClientRect().width));
    sized.observe(row);
    const visible = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      if (seen) start();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    visible.observe(r);
    r.addEventListener("pointerdown", down);
    r.addEventListener("pointermove", move);
    r.addEventListener("pointerup", up);
    r.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      sized.disconnect();
      visible.disconnect();
      r.removeEventListener("pointerdown", down);
      r.removeEventListener("pointermove", move);
      r.removeEventListener("pointerup", up);
      r.removeEventListener("pointercancel", up);
      held?.removeAttribute("data-held");
      r.removeAttribute("data-grabbing");
    };
  }, [running, drift]);

  const row = (copy: boolean) => (
    <ul className={styles.toolRow} aria-hidden={copy || undefined}>
      {tools.map((t, i) => (
        <li key={i} className={styles.tool} data-icon={toolIcons[t] ? "" : undefined}>
          {toolIcons[t] ? <img src={toolIcons[t]} alt={t} width={92} height={92} draggable={false} /> : t}
        </li>
      ))}
    </ul>
  );
  return (
    <div ref={reel} className={styles.toolReel} aria-label="Tools">
      <div ref={track} className={styles.toolTrack}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
