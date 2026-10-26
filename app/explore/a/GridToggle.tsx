"use client";

import { useState } from "react";
import styles from "./a.module.css";

/** Shows or hides the construction grid behind the page. */
export function GridToggle() {
  const [on, setOn] = useState(true);

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = !on;
    setOn(next);
    e.currentTarget.closest<HTMLElement>("[data-grid]")?.setAttribute("data-grid", next ? "on" : "off");
  }

  return (
    <button type="button" className={styles.toggle} aria-pressed={on} onClick={toggle}>
      Grid
    </button>
  );
}
