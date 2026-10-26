"use client";

import { useEffect, useRef, useState } from "react";
import type { ExploreCase } from "@/content/explore";
import { isPlaceholder, statusLabel } from "@/content/explore";
import { Flap, scramble } from "./flap";
import styles from "./c.module.css";

const VIEWED_KEY = "explore-c-viewed";

function readViewed(): string[] {
  try {
    return JSON.parse(localStorage.getItem(VIEWED_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** The departures table plus a preview of the row under the pointer or focus. */
export function Board({ cases }: { cases: ExploreCase[] }) {
  const [active, setActive] = useState(0);
  const [viewed, setViewed] = useState<string[]>([]);
  const rows = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => setViewed(readViewed()), []);

  function activate(i: number) {
    if (i === active) return;
    setActive(i);
    const status = rows.current[i]?.querySelectorAll<HTMLElement>(`.${styles.statusCell} [data-flap]`);
    if (status) scramble([...status], 420);
  }

  function markViewed(num: string) {
    const next = Array.from(new Set([...viewed, num]));
    setViewed(next);
    try {
      localStorage.setItem(VIEWED_KEY, JSON.stringify(next));
    } catch {
      // Storage can be blocked; the mark is only a convenience
    }
  }

  const current = cases[active];

  return (
    <div className={styles.boardBody}>
      <table className={styles.table}>
        <caption className="visually-hidden">Selected work: four projects with their status</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.colYear}>
              Year
            </th>
            <th scope="col">Project</th>
            <th scope="col" className={styles.colVia}>
              Via
            </th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr
              key={c.num}
              ref={(el) => {
                rows.current[i] = el;
              }}
              className={styles.row}
              data-active={i === active || undefined}
              data-viewed={viewed.includes(c.num) || undefined}
              onPointerEnter={() => activate(i)}
              onFocus={() => activate(i)}
            >
              <td className={`${styles.colYear} ${styles.mono}`}>{c.year}</td>
              <td>
                <a href={c.href} className={styles.rowLink} onClick={() => markViewed(c.num)}>
                  <Flap text={c.short} min={16} />
                </a>
                <p className={styles.outcome}>
                  {isPlaceholder(c.outcome) ? <span className={styles.tbd}>{c.outcome}</span> : c.outcome}
                </p>
              </td>
              <td className={`${styles.colVia} ${styles.via}`}>{c.type}</td>
              <td className={styles.statusCell} data-status={c.status}>
                <Flap text={statusLabel[c.status]} size="s" min={11} />
                {viewed.includes(c.num) && <span className={styles.viewed}>Viewed</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <aside className={styles.preview} aria-hidden="true">
        <div className={styles.previewScreen} data-status={current.status}>
          <span className={styles.previewCaption}>{current.caption}</span>
        </div>
        <p className={styles.previewName}>{current.name}</p>
        <p className={styles.previewText}>{current.outcome}</p>
      </aside>
    </div>
  );
}
