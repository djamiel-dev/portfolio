"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";

// The greeting in the hero hands the name over to the nav: once the reader is about
// a fifth into the hero, the greeting types itself away and the nav types the full name.
// Scrolling back reverses it. Both sides read one small shared store.

const HELLO = "Hi,";
const INTRO = "I’m Djamiel";
const NAME = "Djamiel Saou";
const GREETING_LENGTH = HELLO.length + INTRO.length;

type State = { greeting: number; name: number; typing: "greeting" | "name" | null };

let state: State = { greeting: GREETING_LENGTH, name: 0, typing: null };
const listeners = new Set<() => void>();
const set = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const SERVER: State = { greeting: GREETING_LENGTH, name: 0, typing: null };
const useHandoff = () => useSyncExternalStore(subscribe, () => state, () => SERVER);

/** The small greeting at the top of the hero, with the photo between its two parts. */
export function HeroGreeting({ className, photoClassName, caretClassName }: { className: string; photoClassName: string; caretClassName: string }) {
  const { greeting, typing } = useHandoff();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let forward = false;
    let timer = 0;

    // One step at a time towards the goal, so a change of direction mid-way just turns around
    const step = () => {
      const { greeting: g, name: n } = state;
      if (forward && g > 0) return next({ greeting: g - 1, typing: "greeting" }, 30);
      if (forward && n < NAME.length) return next({ name: n + 1, typing: "name" }, 60);
      if (!forward && n > 0) return next({ name: n - 1, typing: "name" }, 30);
      if (!forward && g < GREETING_LENGTH) return next({ greeting: g + 1, typing: "greeting" }, 50);
      timer = 0;
      set({ typing: null });
    };
    const next = (s: Partial<State>, wait: number) => {
      set(s);
      timer = window.setTimeout(step, wait);
    };

    const onScroll = () => {
      const r = hero.getBoundingClientRect();
      const past = -r.top > r.height * 0.2;
      if (past === forward) return;
      forward = past;
      if (reduced) return set(past ? { greeting: 0, name: NAME.length } : { greeting: GREETING_LENGTH, name: 0 });
      if (!timer) step();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  const hello = HELLO.slice(0, Math.min(greeting, HELLO.length));
  const intro = INTRO.slice(0, Math.max(0, greeting - HELLO.length));
  const caret = typing === "greeting" && <span className={caretClassName} data-typing aria-hidden="true" />;

  return (
    <p className={className} data-greeting>
      <span className="visually-hidden">Hi, I&rsquo;m Djamiel</span>
      <span aria-hidden="true">
        {hello}
        {greeting <= HELLO.length && caret}
      </span>
      <span className={photoClassName}>
        {/* The name is right beside it, so the photo needs no text of its own */}
        <Image src="/images/djamiel.jpg" alt="" fill sizes="(max-width: 48em) 72px, 120px" priority />
      </span>
      <span aria-hidden="true">
        {intro}
        {greeting > HELLO.length && caret}
      </span>
    </p>
  );
}

/** The name slot in the nav: empty at the top of the page, typed in once the greeting has gone. */
export function NavName({ className, caretClassName }: { className: string; caretClassName: string }) {
  const { name, typing } = useHandoff();
  return (
    <a href="#main" className={className} data-shown={name > 0 || undefined} aria-label="Djamiel Saou, back to top">
      <span aria-hidden="true">{NAME.slice(0, name)}</span>
      <span className={caretClassName} data-typing={typing === "name" || undefined} aria-hidden="true" />
    </a>
  );
}
