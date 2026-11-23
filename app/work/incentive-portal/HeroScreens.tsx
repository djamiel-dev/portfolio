"use client";

import { useState } from "react";
import c from "@/components/case/case.module.css";
import { DesignViewer } from "@/components/case/DesignViewer";
import styles from "./case.module.css";
import { Phone } from "./visuals";

export type Screen = { name: string; src: string; alt: string; height?: number; screen?: string; scroll?: boolean };

/**
 * The three screens of the reward flow in their phones, as the way into the design: the whole hero is a button with
 * "View screens" at the pointer (CaseCursor), and a click opens every screen of the MVP full screen, each in a phone,
 * as the hero of case 04. On hover the hero leans in as the other heroes do (a little darker, 3% closer).
 */
export function HeroScreens({ screens, all }: { screens: Screen[]; all: Screen[] }) {
  const [viewing, setViewing] = useState(false);

  return (
    <div className={styles.heroWrap}>
      {/* What the hero shows, for screen readers: the images inside the button have no alt of their own */}
      <p id="hero-screens" className="visually-hidden">
        The reward flow in three steps. {screens.map((s) => s.alt).join(" ")}
      </p>
      <button
        type="button"
        className={c.heroOpen}
        onClick={() => setViewing(true)}
        data-case
        data-cursor="View screens"
        aria-haspopup="dialog"
        aria-label={`View all ${all.length} screens of the design full screen`}
        aria-describedby="hero-screens"
      >
        <div className={styles.hero}>
          {screens.map((s) => (
            <Phone key={s.src} src={s.src} alt="" screen={s.screen} sizes="(max-width: 768px) 30vw, 240px" />
          ))}
        </div>
      </button>
      <DesignViewer
        open={viewing}
        onClose={() => setViewing(false)}
        pages={all.map((s) => ({ name: s.name, src: s.src, alt: s.alt, width: 960, height: s.height ?? 1892 }))}
        label="The MVP design, screen by screen"
        unit="screen"
        render={(i) => {
          const s = all[i];
          return (
            <div className={styles.viewerPhone}>
              <Phone
                src={s.src}
                alt={s.alt}
                height={s.height}
                screen={s.screen}
                scroll={s.scroll ? `${s.name}, scrolls` : undefined}
                sizes="380px"
              />
            </div>
          );
        }}
      />
    </div>
  );
}
