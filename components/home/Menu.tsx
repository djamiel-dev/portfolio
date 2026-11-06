"use client";

import { useEffect, useRef } from "react";

type Props = { className: string; summaryClassName: string; panelClassName: string; children: React.ReactNode };

/**
 * Phone navigation as a native <details>: it opens and closes without JS.
 * Open, it fills the screen in the other time of day, and the bars of the
 * button cross into an X. With JS it also closes on Escape and on a link,
 * and the page behind it does not scroll.
 */
export function Menu({ className, summaryClassName, panelClassName, children }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const close = (focus: boolean) => {
      if (!d.open) return;
      d.open = false;
      if (focus) d.querySelector("summary")?.focus();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const onDown = (e: PointerEvent) => !d.contains(e.target as Node) && close(false);
    const onClick = (e: MouseEvent) => (e.target as Element).closest("a") && close(false);
    // The menu fills the screen, so the page behind it holds still while it is open
    const onToggle = () => (document.documentElement.style.overflow = d.open ? "hidden" : "");
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    d.addEventListener("click", onClick);
    d.addEventListener("toggle", onToggle);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      d.removeEventListener("click", onClick);
      d.removeEventListener("toggle", onToggle);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <details ref={ref} className={className}>
      <summary className={summaryClassName}>
        <span data-closed>Menu</span>
        <span data-open>Close</span>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1.5 4.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M1.5 9.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </summary>
      <nav aria-label="Main" className={panelClassName}>
        {children}
      </nav>
    </details>
  );
}
