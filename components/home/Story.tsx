"use client";

import { useEffect, useRef } from "react";
import { moments } from "./content";
import styles from "./home.module.css";
import { Letters, Scramble, scramble } from "./Skills";

/**
 * Night. One filament runs from the first moment down to a lamp above the
 * invitation. It glows as far as the reader has come; each moment switches on
 * when the light reaches it, and the lamp lights the invitation last.
 * On a wide screen one phase label rides along with the tip of the light; when
 * the light reaches the next moment it changes to the new phase, which flickers
 * in through the hero's glyphs like the headings.
 * Without JS or with reduced motion everything is lit and still, and each
 * moment shows its own phase.
 */
export function Story({ email }: { email: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const phase = useRef<HTMLSpanElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const l = line.current;
    const f = fill.current;
    const r = rail.current;
    const p = phase.current;
    const h = heading.current;
    if (!w || !l || !f || !r || !p || !h) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");

    let top = 0;
    let length = 0;
    let lit = 0;
    let target = 0;
    let raf = 0;
    let inView = false;
    let stops: { el: HTMLElement; at: number }[] = [];
    // Every phase sits in the label, stacked and hidden; the one the light has reached is shown
    const phases = Array.from(p.children).map((el) => Array.from(el.querySelectorAll<HTMLElement>("[data-ch]")));
    let showing = -1;
    let cancel = () => {};

    // The old phase is simply gone and the new one flickers in, a little quicker than the headings
    const say = (i: number) => {
      if (i === showing) return;
      showing = i;
      cancel();
      phases.forEach((letters, j) => j !== i && letters.forEach((c) => c.setAttribute("data-s", "")));
      cancel = i < 0 ? () => {} : scramble(phases[i], true, undefined, { step: 10, flicker: 220 });
    };

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
      // The label's rail runs from the first moment to the last; the lamp has no phase
      r.style.top = `${top}px`;
      r.style.height = `calc(${stops[moments.length - 1].at}px + var(--p) * 1.2)`;
      read();
      lit = target;
      paint();
    };

    // The light reaches a little below the middle of the screen
    const read = () => {
      const base = w.getBoundingClientRect().top;
      const reach = window.innerHeight * 0.62 - (base + top);
      target = Math.min(length, Math.max(-1, reach));
      // Like the Skills heading: once past the middle of the screen the heading rises out of
      // view faster than the page, tied to the scroll so nothing plays on its own
      const passed = window.innerHeight / 2 - (base + h.offsetTop + h.offsetHeight / 2);
      h.style.translate = `0 ${(-Math.max(0, passed) * 0.6).toFixed(2)}px`;
    };

    const paint = () => {
      f.style.transform = `scaleY(${length ? Math.max(0, lit) / length : 0})`;
      let reached = -1;
      stops.forEach((s, i) => {
        const on = lit >= s.at - 0.5;
        s.el.toggleAttribute("data-lit", on);
        if (on && i < moments.length) reached = i;
      });
      // Only the moment the light has just reached shows its story, so there is never much text at once
      stops.forEach((s, i) => s.el.toggleAttribute("data-active", i === reached));
      say(reached);
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

    // Re-measure whenever the story changes size (late fonts, text wrapping, viewport)
    const sized = new ResizeObserver(() => w.dataset.live !== undefined && measure());

    const start = () => {
      w.dataset.live = "";
      measure();
      seen.observe(w);
      sized.observe(w);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      cancel();
      showing = -1;
      phases.flat().forEach((c) => c.setAttribute("data-s", ""));
      seen.disconnect();
      sized.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      delete w.dataset.live;
      h.style.translate = "";
      for (const s of stops) {
        s.el.removeAttribute("data-lit");
        s.el.removeAttribute("data-active");
      }
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
        <h2 ref={heading} id="e-timeline" className={styles.timelineTitle}>
          <Scramble text="How I became a product designer" />
        </h2>
        <ol className={styles.moments}>
          {moments.map((m) => (
            <li key={m.title} className={styles.moment} data-stop>
              <p className={styles.momentPhase}>{m.phase}</p>
              <span className={styles.bulb} data-bulb aria-hidden="true" />
              <div className={styles.momentBody}>
                <h3 className={styles.momentTitle}>{m.title}</h3>
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
          What’s the next chapter?
        </h2>
        <p className={styles.closingText}>Maybe it’s yours. Show me the solutions you’re building, and let’s find out.</p>
        <a href={email} className={styles.mail}>
          <span>Contact me</span>
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      </section>

      {/* Each moment keeps its own phase for screen readers; this copy is only for the eye */}
      <span ref={rail} className={styles.phaseRail} aria-hidden="true">
        <span ref={phase} className={styles.phaseLabel}>
          {moments.map((m) => (
            <span key={m.phase}>
              <Letters text={m.phase} hidden />
            </span>
          ))}
        </span>
      </span>

      <span ref={line} className={styles.filament} aria-hidden="true">
        <span ref={fill} className={styles.filamentFill} />
      </span>
    </div>
  );
}
