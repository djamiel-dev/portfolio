"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ai.module.css";

/**
 * What I can bring to a team, as five cards: two wide ones on top, three below.
 *
 * - The lamp follows the pointer over the whole grid: a soft pool of light on the card under it,
 *   and the edges of the cards nearby catch it too (after Magic Bento and Spotlight Card on React Bits).
 * - Each card has a small picture that shows what it does when you hover it.
 * - Only with a fine pointer. On a touch screen, without JS and with reduced motion every picture
 *   simply shows its finished state, and nothing follows the pointer.
 */

const icons: Record<string, ReactNode> = {
  system: (
    <>
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    </>
  ),
  prototype: <path d="M6 4l12 6.5-5.2 1.3L10 17z" />,
  setup: (
    <>
      <path d="M7 3.5h7l4 4v13H7z" />
      <path d="M14 3.5v4h4M10 12h5M10 15.5h5" />
    </>
  ),
  research: (
    <>
      <path d="M4.5 5.5h15v10h-8l-4 3.5v-3.5h-3z" />
      <path d="M8 9.5h8M8 12h5" />
    </>
  ),
  checks: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.9" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg className={styles.bIcon} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

// A component as a spec sheet: a small card with its parts called out by token, as a design system
// documents it for AI. On hover the card lights up and the callouts draw in, one after the other.
function SystemVisual() {
  const tag = (label: string, i: number) => (
    <span className={styles.vTag} style={{ "--i": i } as React.CSSProperties}>
      {label}
    </span>
  );
  return (
    <div className={`${styles.bVis} ${styles.vSystem}`} aria-hidden="true">
      <div className={styles.vSpec}>
        <span className={styles.vPad}>24</span>
        <div className={styles.vRow}>
          <span className={styles.vBulb} />
          {tag("--lamp", 0)}
        </div>
        <div className={styles.vRow}>
          <span className={styles.vTitle} />
          {tag("--fg · 540", 1)}
        </div>
        <div className={`${styles.vRow} ${styles.vCopy}`}>
          <span />
          <span />
          {tag("--fg-2", 2)}
        </div>
        <div className={styles.vRow}>
          <span className={styles.vPill}>Contact me</span>
          {tag("radius 999", 3)}
        </div>
        <span className={styles.vEdge}>{tag("--line · 1px", 4)}</span>
      </div>
    </div>
  );
}

function PrototypeVisual() {
  return (
    <div className={`${styles.bVis} ${styles.vPrototype}`} aria-hidden="true">
      <div className={styles.vFrame}>
        <span className={styles.vDots} />
        <span className={styles.vBar} style={{ width: "58%" }} />
        <span className={styles.vBar} style={{ width: "80%" }} />
        <span className={styles.vBar} style={{ width: "44%" }} />
        <span className={styles.vButton}>Continue</span>
        <svg className={styles.vCursor} viewBox="0 0 24 24">
          <path d="M6 4l12 6.5-5.2 1.3L10 17z" />
        </svg>
      </div>
    </div>
  );
}

function SetupVisual() {
  const tools = ["Design", "Code", "Docs"];
  return (
    <div className={`${styles.bVis} ${styles.vSetup}`} aria-hidden="true">
      <div className={styles.vFile}>
        <span className={styles.vFileName}>team-context.md</span>
        <span>Tone: plain, direct</span>
        <span>Use tokens, not hex</span>
        <span>Check before shipping</span>
      </div>
      <ul className={styles.vTools}>
        {tools.map((t, i) => (
          <li key={t} style={{ "--i": i } as React.CSSProperties}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResearchVisual() {
  const lines = [92, 70, 84, 56, 88, 64];
  const key = [1, 4];
  return (
    <div className={`${styles.bVis} ${styles.vResearch}`} aria-hidden="true">
      {lines.map((w, i) => (
        <span
          key={i}
          className={styles.vLine}
          data-key={key.includes(i) ? "" : undefined}
          style={{ width: `${w}%`, "--i": key.indexOf(i) } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function ChecksVisual() {
  const checks = ["Accessibility", "Keyboard", "Speed", "Definition of done"];
  return (
    <ul className={`${styles.bVis} ${styles.vChecks}`} aria-hidden="true">
      {checks.map((c, i) => (
        <li key={c} style={{ "--i": i } as React.CSSProperties}>
          <svg viewBox="0 0 16 16">
            <rect x="1.5" y="1.5" width="13" height="13" />
            <path d="M4.5 8.3l2.3 2.3 4.7-5" />
          </svg>
          {c}
        </li>
      ))}
    </ul>
  );
}

type Card = { icon: string; title: string; lead: string; rest: string; visual: ReactNode; wide?: boolean };

const cards: Card[] = [
  {
    icon: "system",
    title: "A design system AI can build with",
    lead: "Tokens and components described",
    rest: " so AI builds on-brand, not just close to it.",
    visual: <SystemVisual />,
    wide: true,
  },
  {
    icon: "prototype",
    title: "Prototypes before anyone builds",
    lead: "Coded prototypes to test with users",
    rest: " before the team commits to building.",
    visual: <PrototypeVisual />,
    wide: true,
  },
  {
    icon: "setup",
    title: "A shared AI setup",
    lead: "One set of context and rules",
    rest: " that every AI tool in the team works from.",
    visual: <SetupVisual />,
  },
  {
    icon: "research",
    title: "Research into next steps",
    lead: "Interview transcripts turned into briefings",
    rest: ", so the team spends its time deciding.",
    visual: <ResearchVisual />,
  },
  {
    icon: "checks",
    title: "Quality checks built in",
    lead: "Automated checks and a definition of done",
    rest: ", so faster never means sloppier.",
    visual: <ChecksVisual />,
  },
];

export function TeamBento() {
  const grid = useRef<HTMLUListElement>(null);

  // With a fine pointer the cards answer to hover; every card learns where the pointer is, so the
  // light can catch the edges of its neighbours too
  useEffect(() => {
    const g = grid.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!g || !fine.matches) return;
    g.removeAttribute("data-static");
    const items = Array.from(g.children) as HTMLElement[];
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${x - r.left}px`);
        el.style.setProperty("--my", `${y - r.top}px`);
      }
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    g.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      g.removeEventListener("pointermove", move);
      g.setAttribute("data-static", "");
    };
  }, []);

  return (
    <ul ref={grid} className={styles.bento} data-static="">
      {cards.map((c) => (
        <li key={c.title} className={styles.bCard} data-wide={c.wide ? "" : undefined}>
          <div className={styles.bText}>
            <h3>
              <Icon name={c.icon} />
              {c.title}
            </h3>
            <p>
              <span>{c.lead}</span>
              {c.rest}
            </p>
          </div>
          {c.visual}
        </li>
      ))}
    </ul>
  );
}
