"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./d.module.css";

type Skill = { title: string; text: string; icon: React.ReactNode };

// 24px line icons, one stroke weight
const icon = (d: React.ReactNode) => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
    {d}
  </svg>
);

const skills: Skill[] = [
  {
    title: "Research & user testing",
    text: "[Interviews, usability tests and what I do with the findings]",
    icon: icon(<><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5.5 5.5" /></>),
  },
  {
    title: "UI/UX design",
    text: "[Flows, wireframes and interface design in Figma]",
    icon: icon(<><rect x="3.5" y="4.5" width="17" height="15" /><path d="M3.5 9h17M9 9v10.5" /></>),
  },
  {
    title: "Frontend development",
    text: "[Building what I design in Next.js, TypeScript and CSS]",
    icon: icon(<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" />),
  },
  {
    title: "Prototyping",
    text: "[Clickable and coded prototypes to test ideas early]",
    icon: icon(<path d="M6 3.5l12 8.5-5.5 1.5L10 19z" />),
  },
  {
    title: "AI workflows",
    text: "[How I use AI to explore more and check my own work]",
    icon: icon(<><rect x="3.5" y="3.5" width="6" height="6" /><rect x="14.5" y="14.5" width="6" height="6" /><path d="M9.5 6.5h5.5v8" /></>),
  },
  {
    title: "Design systems",
    text: "[Tokens and components that keep design and code in sync]",
    icon: icon(<><rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><rect x="13.5" y="13.5" width="7" height="7" /></>),
  },
];

/**
 * Pinned on desktop: vertical scroll moves the panels sideways, then the page carries on.
 * Without JS, with reduced motion or on a phone, the panels are a plain grid or row.
 */
export function Skills() {
  const outer = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [pinned, setPinned] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const pin = window.matchMedia("(min-width: 48em) and (prefers-reduced-motion: no-preference)");
    const phone = window.matchMedia("(max-width: 47.99em)");
    const update = () => {
      setPinned(pin.matches);
      setNarrow(phone.matches);
    };
    update();
    pin.addEventListener("change", update);
    phone.addEventListener("change", update);
    return () => {
      pin.removeEventListener("change", update);
      phone.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const o = outer.current;
    const v = viewport.current;
    const t = track.current;
    if (!pinned || !o || !v || !t) return;

    let start = 0;
    let distance = 0;

    // The row starts with the middle of the first panel at the centre of the screen
    // and ends with the middle of the last panel there.
    const measure = () => {
      const panel = t.firstElementChild as HTMLElement;
      start = v.clientWidth / 2 - t.offsetLeft - panel.offsetWidth / 2;
      distance = t.scrollWidth - panel.offsetWidth;
      o.style.height = `${window.innerHeight + distance}px`;
      render();
    };

    const render = () => {
      const progress = distance ? Math.min(1, Math.max(0, -o.getBoundingClientRect().top / distance)) : 0;
      t.style.transform = `translate3d(${start - progress * distance}px, 0, 0)`;
      setActive(Math.round(progress * (skills.length - 1)) + 1);
    };

    measure();
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", render);
      window.removeEventListener("resize", measure);
      o.style.height = "";
      t.style.transform = "";
    };
  }, [pinned]);

  const count = String(skills.length).padStart(2, "0");

  return (
    <section ref={outer} className={styles.skills} data-pinned={pinned || undefined} aria-labelledby="d-skills">
      <div ref={viewport} className={styles.skillsSticky}>
        <h2 id="d-skills" className={styles.skillsIntro}>
          [What I can do, in one sentence]
        </h2>
        <ol ref={track} className={styles.skillsTrack} tabIndex={narrow ? 0 : undefined} aria-label="Skills">
          {skills.map((s, i) => (
            <li key={s.title} className={styles.skill}>
              <span className={styles.skillNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.skillIcon}>{s.icon}</span>
              <h3 className={styles.skillTitle}>{s.title}</h3>
              <p className={styles.skillText}>{s.text}</p>
            </li>
          ))}
        </ol>
        {pinned && (
          <div className={styles.skillsProgress} aria-hidden="true">
            <span className={styles.skillsBar}>
              <span style={{ transform: `scaleX(${active / skills.length})` }} />
            </span>
            <span>
              {String(active).padStart(2, "0")} / {count}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
