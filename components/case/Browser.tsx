import type { ReactNode } from "react";
import c from "./case.module.css";

/** A plain browser window around a page of a design: three dots in the bar, the page below. */
export function Browser({ children }: { children: ReactNode }) {
  return (
    <div className={c.browser}>
      <div className={c.browserBar} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {children}
    </div>
  );
}
