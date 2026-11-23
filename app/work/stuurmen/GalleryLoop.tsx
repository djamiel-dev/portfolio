"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import cs from "../collaborative-strength/cs.module.css";
import st from "./st.module.css";

// The hero: one long screen of the gallery in a wide window, scrolling slowly down and back up, in a loop.
// The movement itself is a CSS animation; this only pauses it: off-screen, with reduced motion (it then waits
// at the top until someone presses play), and with the button in the corner, the same as the recording on case 02.
export function GalleryLoop({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // What the viewer chose; null until they press the button
  const [chosen, setChosen] = useState<"play" | "pause" | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(reduce.matches);
    const onChange = () => setStill(reduce.matches);
    reduce.addEventListener("change", onChange);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => {
      reduce.removeEventListener("change", onChange);
      observer.disconnect();
    };
  }, []);

  const wanted = chosen ?? (still ? "pause" : "play");
  const playing = visible && wanted === "play";

  return (
    <div className={`${cs.clip} ${st.loop}`}>
      <div ref={ref} className={st.loopView} data-playing={playing || undefined}>
        <Image className={st.loopPage} src={src} alt={alt} width={width} height={height} sizes="(max-width: 1440px) 100vw, 1440px" priority />
      </div>
      <button
        type="button"
        className={cs.clipButton}
        onClick={() => setChosen(wanted === "play" ? "pause" : "play")}
        aria-pressed={wanted === "play"}
      >
        <span className="visually-hidden">Scroll through the gallery</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {wanted === "play" ? <path d="M8.5 5.5v13M15.5 5.5v13" /> : <path d="M8 5.5v13l10.5-6.5z" />}
        </svg>
      </button>
    </div>
  );
}
