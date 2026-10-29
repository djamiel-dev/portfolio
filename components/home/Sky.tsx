"use client";

import { useLayoutEffect } from "react";

/**
 * The time of day follows the reader: whichever zone crosses the middle of the
 * screen sets the sky (day, golden, night) on the page root. The colours
 * themselves transition in CSS. Also pauses the hero light once it is out of view.
 * Without JS each zone paints its own colours, so the page still turns dark.
 */
export function Sky() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-e-root]");
    if (!root) return;
    const zones = Array.from(root.querySelectorAll<HTMLElement>("[data-zone]"));
    const hero = root.querySelector<HTMLElement>("[data-hero]");

    // Set the first sky before paint, then allow transitions
    const middle = window.innerHeight / 2;
    const current = zones.find((z) => {
      const r = z.getBoundingClientRect();
      return r.top <= middle && r.bottom > middle;
    });
    root.dataset.sky = current?.dataset.zone ?? "day";
    const ready = requestAnimationFrame(() => requestAnimationFrame(() => (root.dataset.skyReady = "")));

    const line = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) root.dataset.sky = (e.target as HTMLElement).dataset.zone;
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    zones.forEach((z) => line.observe(z));

    const heroSeen = new IntersectionObserver(([e]) => root.toggleAttribute("data-hero-off", !e.isIntersecting));
    if (hero) heroSeen.observe(hero);

    return () => {
      cancelAnimationFrame(ready);
      line.disconnect();
      heroSeen.disconnect();
      delete root.dataset.sky;
      delete root.dataset.skyReady;
      root.removeAttribute("data-hero-off");
    };
  }, []);

  return null;
}
