"use client";

import { useEffect, useRef } from "react";
import c from "./case.module.css";

/**
 * The lamp over the result of a case: the page has turned to night, and the lamp ignites as it comes into view,
 * with the flicker of the lamp at the end of the homepage, then its glow. Without JS and with reduced motion it is
 * simply on.
 */
export function Lamp() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.setAttribute("data-live", "");
    // On once it is a third of the way up the screen, so the reader sees it happen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-lit", "");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -33% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeAttribute("data-live");
      el.removeAttribute("data-lit");
    };
  }, []);

  return <span ref={ref} className={c.lamp} aria-hidden="true" />;
}
