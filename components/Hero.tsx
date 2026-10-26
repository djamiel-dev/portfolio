"use client";

import { useState } from "react";
import { ParticleField, STAGES } from "./ParticleField";
import styles from "./Hero.module.css";

export function Hero() {
  const [stage, setStage] = useState(0);

  // Key words light up in brand orange when their stage is active
  const word = (s: number, text: string) => (
    <span className={stage === s ? `${styles.key} ${styles.active}` : styles.key}>{text}</span>
  );

  return (
    <section aria-labelledby="hero-title" className={styles.section}>
      <div className={styles.stage}>
        <ParticleField className={styles.canvas} onStageChange={setStage} />

        <span aria-hidden="true" className={`mono ${styles.index}`}>
          [00] Index
        </span>
        <div aria-hidden="true" className={`mono ${styles.progress}`}>
          <span>
            [{STAGES[stage].num}] {STAGES[stage].name}
          </span>
          <div className={styles.bars}>
            {STAGES.map((s, i) => (
              <span
                key={s.num}
                className={`${styles.bar} ${i === stage ? styles.barActive : i < stage ? styles.barDone : ""}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.key}>AI-native product designer</span> who {word(1, "researches")},{" "}
            {word(2, "designs")} and {word(3, "builds")}, from {word(0, "real problem")} to{" "}
            {word(4, "live product")}.
          </h1>
          <div className={styles.actions}>
            <a href="#contact" className={styles.button}>
              <span className={styles.buttonLabel}>Let&apos;s talk</span>
              <span aria-hidden="true" className={styles.buttonArrow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
