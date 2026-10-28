"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./d.module.css";

type Moment = { title: string; role: string; story: string; period: string };

const moments: Moment[] = [
  {
    title: "Secondary school",
    role: "Computer science as a subject",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]",
  },
  {
    title: "HBO ICT & Media",
    role: "[Graduated with outstanding]",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]–[Year]",
  },
  {
    title: "Side projects",
    role: "Own projects and websites for others",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]–now",
  },
  {
    title: "Internship",
    role: "First real product work",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "[Year]",
  },
  {
    title: "First job",
    role: "Designer and front-end developer in a small team",
    story: "[What I learned or what changed, in one or two sentences]",
    period: "2026",
  },
];

/**
 * A vertical line that fills as you scroll; each moment's marker lights up when the fill reaches it.
 * Without JS the line is shown full.
 */
export function Timeline() {
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(moments.length);

  useEffect(() => {
    const s = section.current;
    const l = list.current;
    const root = s?.closest<HTMLElement>("[data-theme-root]");
    if (!s || !l || !root) return;

    const render = () => {
      // Dark once the timeline reaches the middle of the screen, light again above it
      root.toggleAttribute("data-dark", s.getBoundingClientRect().top < window.innerHeight / 2);

      // The fill follows the middle of the screen
      const box = l.getBoundingClientRect();
      const fill = Math.min(1, Math.max(0, (window.innerHeight / 2 - box.top) / box.height));
      l.style.setProperty("--fill", String(fill));
      const markers = l.querySelectorAll<HTMLElement>("[data-marker]");
      let count = 0;
      markers.forEach((m) => {
        if (m.getBoundingClientRect().top < window.innerHeight / 2) count++;
      });
      setReached(count);
    };

    render();
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", render);
    return () => {
      window.removeEventListener("scroll", render);
      window.removeEventListener("resize", render);
      l.style.removeProperty("--fill");
      root.removeAttribute("data-dark");
    };
  }, []);

  return (
    <section ref={section} className={styles.timeline} aria-labelledby="d-timeline">
      <h2 id="d-timeline" className={styles.timelineTitle}>
        [How I got here]
      </h2>
      <ol ref={list} className={styles.moments}>
        {moments.map((m, i) => (
          <li key={m.title} className={styles.moment} data-side={i % 2 === 0 ? "right" : "left"}>
            <span className={styles.marker} data-marker data-reached={i < reached || undefined} aria-hidden="true" />
            <div className={styles.momentBody}>
              <h3 className={styles.momentTitle}>{m.title}</h3>
              <p className={styles.momentRole}>{m.role}</p>
              <p className={styles.momentStory}>{m.story}</p>
              <p className={styles.momentPeriod}>{m.period}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
