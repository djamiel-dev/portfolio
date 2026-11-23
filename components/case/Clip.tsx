"use client";

import { useEffect, useRef, useState } from "react";
import c from "./case.module.css";

// A short screen recording of the live site: muted, looping, and only playing while it is in view.
// The button pauses it for good, until pressed again. With reduced motion it waits on its still
// until someone presses play; without JS the still and the label simply stay.
// With href the recording itself is the link (with "View website" next to the pointer, as the cases on the
// homepage do); the pause button stays outside the link.
export function Clip({
  src,
  poster,
  label,
  width,
  height,
  href,
  linkText,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
  href?: string;
  linkText?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  // What the viewer chose; null until they press the button
  const chosen = useRef<"play" | "pause" | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) chosen.current = "pause";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && chosen.current !== "pause") video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      chosen.current = "play";
      video.play().catch(() => {});
    } else {
      chosen.current = "pause";
      video.pause();
    }
  };

  // Inside the link, the link text says what it is, so the video itself stays out of the way
  const video = (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={href ? undefined : label}
      aria-hidden={href ? true : undefined}
      onPlay={() => setPaused(false)}
      onPause={() => setPaused(true)}
    />
  );

  return (
    <div className={`${c.clip} ${className ?? ""}`}>
      {href ? (
        <a
          href={href}
          className={c.clipLink}
          target="_blank"
          rel="noopener noreferrer"
          data-case
          data-cursor="View website"
        >
          {video}
          <span className="visually-hidden">
            {linkText ?? label} (opens in a new tab)
          </span>
        </a>
      ) : (
        video
      )}
      <button type="button" className={c.clipButton} onClick={toggle} aria-pressed={!paused}>
        <span className="visually-hidden">Play recording</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {paused ? <path d="M8 5.5v13l10.5-6.5z" /> : <path d="M8.5 5.5v13M15.5 5.5v13" />}
        </svg>
      </button>
    </div>
  );
}
