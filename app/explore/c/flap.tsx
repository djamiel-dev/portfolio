"use client";

import { useEffect, useState } from "react";
import styles from "./c.module.css";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·-";

/**
 * Text as a row of split-flap tiles, wrapping between words only.
 * Empty tiles pad the row to `min` on wide screens. Screen readers get the plain text.
 */
export function Flap({ text, size = "m", min = 0 }: { text: string; size?: "s" | "m" | "l"; min?: number }) {
  const words = text.toUpperCase().split(" ");
  const pad = Math.max(0, min - text.length);
  return (
    <span className={`${styles.flap} ${styles[`flap_${size}`]}`}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" className={styles.tiles}>
        {words.map((word, w) => (
          <span key={w} className={styles.word}>
            {[...word].map((ch, i) => (
              <span key={i} className={styles.tile} data-flap={ch}>
                {ch}
              </span>
            ))}
            {w < words.length - 1 && <span className={styles.tile} />}
          </span>
        ))}
        {pad > 0 && (
          <span className={`${styles.word} ${styles.pad}`}>
            {Array.from({ length: pad }, (_, i) => (
              <span key={i} className={styles.tile} />
            ))}
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * Lets tiles cycle through random characters before they settle,
 * like a departure board updating. Total time stays under a second.
 */
export function scramble(tiles: HTMLElement[], maxMs = 900) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ends = tiles.map((_, i) => Math.min(maxMs, 220 + i * 14 + Math.random() * 260));
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const t = now - start;
    let busy = false;
    tiles.forEach((tile, i) => {
      const final = tile.dataset.flap;
      if (!final) return;
      if (t < ends[i]) {
        busy = true;
        tile.textContent = CHARSET[Math.floor(Math.random() * CHARSET.length)];
      } else if (tile.textContent !== final) {
        tile.textContent = final;
      }
    });
    if (busy) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/** Runs the arrival flap once for every tile inside the board. */
export function ArrivalFlap({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    return scramble([...root.querySelectorAll<HTMLElement>("[data-flap]")]);
  }, [rootId]);
  return null;
}

/** Local time in Tilburg, rendered on the client only. */
export function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  return <time className={styles.clock}>{time}</time>;
}
