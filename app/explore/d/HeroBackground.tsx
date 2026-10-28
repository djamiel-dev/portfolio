"use client";

import dynamic from "next/dynamic";
import styles from "./d.module.css";

// Loaded after the first paint so the WebGL code stays off the critical path
const GradientASCII = dynamic(() => import("./GradientASCII"), { ssr: false });

/** Quiet ASCII glow behind the hero; masked away behind the text so it never competes with it. */
export function HeroBackground() {
  return (
    <div className={styles.heroBg} aria-hidden="true">
      <GradientASCII
        lightMode
        shape="rise"
        flipY
        colors={["#ecece4", "#b3b3af", "#72726f", "#fa3600"]}
        cellSize={16}
        density={0.7}
        glyphOpacity={0.6}
        gradientOpacity={0.35}
        glow={0}
        grain={0.04}
        flicker={0.15}
        speed={0.6}
        scale={1.2}
        clickEffect="none"
        intro={false}
        dpr={1.5}
      />
    </div>
  );
}
