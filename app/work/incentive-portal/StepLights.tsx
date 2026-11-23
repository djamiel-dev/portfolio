"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Switches the numbered parts inside on one by one, the first time the block is well in view: every element with
 * data-step="i" (a pin on the screen and its callout) gets [data-on] in turn, like the lamps on the homepage
 * timeline. Until then the block carries [data-live] and the steps wait, dimmed. Without JS or with reduced motion
 * nothing waits: all steps are on from the start.
 */
export function StepLights({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const count = Math.max(0, ...steps.map((s) => Number(s.dataset.step))) + 1;
    el.setAttribute("data-live", "");
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        for (let i = 0; i < count; i++) {
          timers.push(
            window.setTimeout(() => {
              for (const s of steps) if (Number(s.dataset.step) === i) s.setAttribute("data-on", "");
            }, 250 + i * 650),
          );
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      el.removeAttribute("data-live");
      steps.forEach((s) => s.removeAttribute("data-on"));
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
