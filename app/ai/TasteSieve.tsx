"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ai.module.css";

export type TasteStep = { title: string; text: string };

const RAMP = "·:-+=*#"; // the glyphs of the hero's Glyph Swell
const TILES = 12; // four by three
const SIDE = 5; // glyphs per row and column in a tile
// The tiles that pass the first question, and the one that passes the second
const FIT = [1, 4, 6, 11];
const KEEP = 6;
// When each tile goes dark, as a place in line: scattered over the grid instead of left to right.
// Fixed rather than random, so server and browser agree.
const ORDER = [3, 9, 0, 6, 10, 1, 8, 4, 11, 5, 2, 7];

// Each group that drops out together (eight at the first question, three at the second) counts
// from zero, so the first of them goes at once
function place(tile: number) {
  if (tile === KEEP) return 0;
  const group = Array.from({ length: TILES }, (_, i) => i).filter(
    (i) => i !== KEEP && FIT.includes(i) === FIT.includes(tile),
  );
  return group.sort((a, b) => ORDER[a] - ORDER[b]).indexOf(tile);
}

// One small glyph field per tile, each with its own rhythm, so every tile reads as another option
function field(tile: number, t: number) {
  const a = 0.7 + (tile % 4) * 0.35;
  const b = 0.9 + ((tile * 7) % 5) * 0.25;
  let out = "";
  for (let y = 0; y < SIDE; y++) {
    for (let x = 0; x < SIDE; x++) {
      const v = Math.sin(x * a + t * 1.3 + tile) + Math.cos(y * b - t * 0.9 + tile * 2.1);
      out += RAMP[Math.min(RAMP.length - 1, Math.floor(((v + 2) / 4) * RAMP.length))];
    }
    if (y < SIDE - 1) out += "\n";
  }
  return out;
}

function stateOf(tile: number, stage: number) {
  if (stage >= 2) return tile === KEEP ? "kept" : "out";
  if (stage === 1) return FIT.includes(tile) ? "live" : "out";
  return "live";
}

/**
 * Taste as a sieve. A grid of glyph tiles, every one a thing AI could make, stays in view beside the
 * steps. While the first step is in the middle of the screen every tile keeps changing; at "Does it
 * fit?" most of them go dark, at "Is it good enough?" one is left and lights up.
 *
 * The tiles only move while the grid is on screen, and not at all with reduced motion; the steps
 * still switch them, without transitions. The grid is decoration: the steps carry the meaning.
 */
export function TasteSieve({ head, steps }: { head: ReactNode; steps: TasteStep[] }) {
  const sieve = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLSpanElement | null)[]>([]);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  // Only once the steps can switch does the text of the others step back; without JS all is shown
  const [live, setLive] = useState(false);

  // The step in the middle band of the screen sets the stage
  useEffect(() => {
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = items.current.indexOf(e.target as HTMLLIElement);
          if (i >= 0) {
            stageRef.current = i;
            setStage(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && seen.observe(el));
    setLive(true);
    return () => seen.disconnect();
  }, [steps.length]);

  // The tiles still in play keep changing, the one that survives included, a few times a second, only while the grid is on screen
  useEffect(() => {
    const s = sieve.current;
    if (!s) return;
    const draw = (t: number, all = false) =>
      tiles.current.forEach((el, i) => {
        if (el && (all || stateOf(i, stageRef.current) !== "out")) el.textContent = field(i, t);
      });
    draw(0, true);
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    let raf = 0;
    let last = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      if (now - last > 140) {
        last = now;
        draw((now - t0) / 1000);
      }
      raf = requestAnimationFrame(frame);
    };
    const seen = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      raf = e.isIntersecting ? requestAnimationFrame(frame) : 0;
    });
    seen.observe(s);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.taste}>
      <div className={styles.tasteHead}>{head}</div>

      <div className={styles.sieveCol}>
        <div ref={sieve} className={styles.sieve} data-stage={stage} aria-hidden="true">
          {Array.from({ length: TILES }, (_, i) => (
            <span
              key={i}
              ref={(el) => {
                tiles.current[i] = el;
              }}
              className={styles.sieveTile}
              data-state={stateOf(i, stage)}
              style={{ "--i": place(i) } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <ol className={styles.tasteSteps} data-live={live ? "" : undefined}>
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-active={i === stage ? "" : undefined}
          >
            <span className={styles.tasteNum}>0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
