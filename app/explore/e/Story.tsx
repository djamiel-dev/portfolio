"use client";

import { useEffect, useRef } from "react";
import { moments } from "./content";
import styles from "./e.module.css";

/**
 * Night. One filament runs from the first moment down to a lamp above the
 * invitation. It glows as far as the reader has come; each moment switches on
 * when the light reaches it, and the lamp lights the invitation last.
 * Without JS or with reduced motion everything is lit and still.
 */
export function Story({ email }: { email: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const l = line.current;
    const f = fill.current;
    if (!w || !l || !f) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");

    let top = 0;
    let length = 0;
    let lit = 0;
    let target = 0;
    let raf = 0;
    let inView = false;
    let stops: { el: HTMLElement; at: number }[] = [];

    // The filament starts at the first bulb and ends at the lamp
    const measure = () => {
      const base = w.getBoundingClientRect().top;
      const centre = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2 - base;
      };
      const bulbs = Array.from(w.querySelectorAll<HTMLElement>("[data-bulb]"));
      top = centre(bulbs[0]);
      length = centre(bulbs[bulbs.length - 1]) - top;
      l.style.top = `${top}px`;
      l.style.height = `${length}px`;
      stops = bulbs.map((b) => ({ el: b.closest<HTMLElement>("[data-stop]")!, at: centre(b) - top }));
      read();
      lit = target;
      paint();
    };

    // The light reaches a little below the middle of the screen
    const read = () => {
      const reach = window.innerHeight * 0.62 - (w.getBoundingClientRect().top + top);
      target = Math.min(length, Math.max(-1, reach));
    };

    const paint = () => {
      f.style.transform = `scaleY(${length ? Math.max(0, lit) / length : 0})`;
      for (const s of stops) s.el.toggleAttribute("data-lit", lit >= s.at - 0.5);
    };

    const frame = () => {
      lit += (target - lit) * 0.2;
      if (Math.abs(target - lit) < 0.5) lit = target;
      paint();
      raf = lit === target ? 0 : requestAnimationFrame(frame);
    };

    const onScroll = () => {
      if (!inView) return;
      read();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const seen = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "50% 0px" },
    );

    const start = () => {
      w.dataset.live = "";
      measure();
      seen.observe(w);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      seen.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      delete w.dataset.live;
      for (const s of stops) s.el.removeAttribute("data-lit");
    };

    const update = () => (motion.matches ? start() : stop());
    update();
    motion.addEventListener("change", update);
    // Fonts change line heights, and with them where the bulbs sit
    document.fonts?.ready.then(() => w.dataset.live !== undefined && measure());
    return () => {
      motion.removeEventListener("change", update);
      stop();
    };
  }, []);

  return (
    <div ref={wrap} className={styles.story}>
      <section id="about" className={styles.timeline} aria-labelledby="e-timeline">
        <h2 id="e-timeline" className={styles.timelineTitle}>
          [How I got here]
        </h2>
        <ol className={styles.moments}>
          {moments.map((m) => (
            <li key={m.title} className={styles.moment} data-stop>
              <p className={styles.momentPeriod}>{m.period}</p>
              <span className={styles.bulb} data-bulb aria-hidden="true" />
              <div className={styles.momentBody}>
                <h3 className={styles.momentTitle}>{m.title}</h3>
                <p className={styles.momentRole}>{m.role}</p>
                <p className={styles.momentStory}>{m.story}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className={styles.closing} aria-labelledby="e-closing" data-stop>
        <span className={styles.lampCord} aria-hidden="true" />
        <span className={styles.lampBulb} data-bulb aria-hidden="true" />
        <span className={styles.pool} aria-hidden="true" />
        <h2 id="e-closing" className={styles.closingTitle}>
          [Next chapter: building it together]
        </h2>
        <p className={styles.closingText}>[One or two lines that invite the reader to get in touch]</p>
        <a href={email} className={styles.mail}>
          <span>Email me</span>
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      </section>

      <span ref={line} className={styles.filament} aria-hidden="true">
        <span ref={fill} className={styles.filamentFill} />
      </span>
    </div>
  );
}
