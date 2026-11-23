"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import mo from "./mo.module.css";

/*
 * Goal 1: a year as 52 weeks. Only the usual school-holiday weeks are lit (Christmas, Easter, summer, autumn):
 * those fill up anyway. Everything in between is the gap. Schematic, from the calendar, not booking data.
 * Each holiday switches on with the short flicker of the homepage lamps, left to right, once, when the strip comes
 * into view. Without JS or with reduced motion the holidays are simply lit.
 */
const holidays: [from: number, to: number][] = [
  [1, 1], // Christmas, the end of it
  [14, 15], // Easter
  [28, 35], // summer
  [43, 43], // autumn
  [52, 52], // Christmas
];

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function holidayOf(week: number) {
  return holidays.findIndex(([from, to]) => week >= from && week <= to);
}

export function YearStrip() {
  const ref = useRef<HTMLDivElement>(null);
  // "idle": lit, as without JS. "waiting": dark until in view. "lit": switching on.
  const [state, setState] = useState<"idle" | "waiting" | "lit">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already past it (a reload halfway down the page): leave it lit
    if (el.getBoundingClientRect().bottom < 0) return;
    setState("waiting");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("lit");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={mo.year} data-state={state}>
      <div
        className={mo.weeks}
        role="img"
        aria-label="A year as 52 weeks. Only the school holidays are lit: Christmas, Easter, the summer and a week in autumn. The rest of the year stays dark."
      >
        {Array.from({ length: 52 }, (_, i) => {
          const h = holidayOf(i + 1);
          return (
            <span
              key={i}
              className={mo.week}
              data-on={h >= 0 ? "" : undefined}
              // One holiday after another, left to right; within a holiday its weeks catch just after each other
              style={h >= 0 ? ({ "--d": `${h * 100 + (i + 1 - holidays[h][0]) * 25}ms` } as CSSProperties) : undefined}
            />
          );
        })}
      </div>
      <div className={mo.months} aria-hidden="true">
        {months.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
      <ul className={mo.legend} aria-hidden="true">
        <li data-on="">School holidays</li>
        <li>The rest of the year</li>
      </ul>
    </div>
  );
}

/*
 * Goal 2: all bookings as one bar, the direct share lit. Still here; on Result the same bar fills to 70%.
 */
export function DirectBar({ value }: { value: number }) {
  return (
    <div className={mo.direct}>
      <div
        className={mo.bar}
        role="img"
        aria-label={`About ${value}% of bookings came in directly through their own website, the rest through Booking.com.`}
        style={{ "--share": `${value}%` } as CSSProperties}
      >
        <span className={mo.fill} />
      </div>
      <div className={mo.barLabels} aria-hidden="true">
        <span>
          <strong>About {value}%</strong> direct
        </span>
        <span>Booking.com</span>
      </div>
    </div>
  );
}

/*
 * Result: the same bar as in Problem, now filling from about 20% to 70% once it comes into view, with the number
 * counting along. A small mark stays at 20%, so the jump stays visible. Without JS or with reduced motion: 70%
 * straight away. The number is hidden from screen readers; the label says it in one go.
 */
export function ResultBar({ from, to }: { from: number; to: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().bottom < 0) return;
    setValue(from);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Strong ease-out: quick at first, then settling on the number, as the lamp coming up to full
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(from + (to - from) * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [from, to]);

  return (
    <div ref={ref} className={mo.result}>
      <p className={mo.resultNumber} aria-hidden="true">
        {value}%<span> direct</span>
      </p>
      <div
        className={mo.bar}
        role="img"
        aria-label={`About ${to}% of bookings now come in directly through their own website, up from about ${from}%.`}
        style={{ "--share": `${value}%`, "--was": `${from}%` } as CSSProperties}
      >
        <span className={mo.fill} />
        <span className={mo.was} />
      </div>
      <div className={mo.barLabels} aria-hidden="true">
        <span>Was about {from}%</span>
        <span>Booking.com</span>
      </div>
    </div>
  );
}
