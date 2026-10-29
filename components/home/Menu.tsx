"use client";

import { useEffect, useRef } from "react";

type Props = { className: string; summaryClassName: string; panelClassName: string; children: React.ReactNode };

/**
 * Phone navigation as a native <details>: it opens and closes without JS.
 * With JS it also closes on Escape, on a link and on a tap outside.
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
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    d.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      d.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className={className}>
      <summary className={summaryClassName}>
        <span>Menu</span>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 4.5h12M1 9.5h12" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </summary>
      <nav aria-label="Main" className={panelClassName}>
        {children}
      </nav>
    </details>
  );
}
