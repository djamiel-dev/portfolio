"use client";

import { useEffect, useRef } from "react";

/**
 * "View case" next to the pointer while it is over a case card ([data-case]). It trails the pointer
 * a little so it feels attached rather than glued. Only with a mouse or trackpad; with reduced motion
 * it follows without the trail. Decorative: the card's own link already says where it goes.
 */
export function CaseCursor({ className }: { className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const e = el.current;
    if (!e || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let on = false;

    const frame = () => {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      if (still || Math.abs(tx - x) + Math.abs(ty - y) < 0.2) {
        x = tx;
        y = ty;
      }
      e.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = x === tx && y === ty ? 0 : requestAnimationFrame(frame);
    };

    // The card under the pointer, also after a scroll that moved a card under a pointer standing still
    const check = () => {
      const over = !!document.elementFromPoint(tx, ty)?.closest("[data-case]");
      if (over === on) return;
      on = over;
      if (on) {
        x = tx; // appear at the pointer, not slide in from where it was last
        y = ty;
        e.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      e.toggleAttribute("data-on", on);
    };

    const move = (ev: PointerEvent) => {
      tx = ev.clientX;
      ty = ev.clientY;
      check();
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const away = () => {
      on = false;
      e.removeAttribute("data-on");
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", away);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", away);
      window.removeEventListener("scroll", check);
    };
  }, []);

  return (
    <div ref={el} className={className} aria-hidden="true">
      <span>View case</span>
    </div>
  );
}
