"use client";

import { useEffect, useRef } from "react";

type Props = { className: string; visibleClassName: string };

/**
 * A label that follows a fine pointer over elements with `data-cursor`
 * and shows that attribute's text ("View case"). Touch and keyboard users
 * never need it: the links carry their own visible text and focus state.
 */
export function ViewCursor({ className, visibleClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = 0;
    let y = 0;
    let raf = 0;
    const place = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = 0;
    };

    function onMove(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        el!.textContent = target.dataset.cursor ?? "";
        el!.classList.add(visibleClassName);
      } else {
        el!.classList.remove(visibleClassName);
      }
      if (!raf) raf = requestAnimationFrame(place);
    }

    function onLeave() {
      el!.classList.remove(visibleClassName);
    }

    document.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [visibleClassName]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
