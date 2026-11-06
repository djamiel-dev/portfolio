"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Letters, scramble } from "./Skills";

// The greeting in the hero hands the name over to the nav: once the reader is about a fifth into
// the hero, the greeting flickers away into the hero's glyphs and the nav's name flickers in, the
// same load-in as the section headings. Scrolling back reverses it. Without JS the greeting stays
// and the nav stays empty; with reduced motion the swap happens without the flicker.

const HELLO = "Hi,";
const INTRO = "I’m Djamiel";
const NAME = "Djamiel Saou";

/** The small greeting at the top of the hero, with the photo between its two parts. */
export function HeroGreeting({ className, photoClassName }: { className: string; photoClassName: string }) {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const greeting = document.querySelector<HTMLElement>("[data-greeting]");
    const nav = document.querySelector<HTMLElement>("[data-nav-name]");
    if (!hero || !greeting || !nav) return;
    const letters = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>("[data-ch]"));
    const hello = letters(greeting);
    const name = letters(nav);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let forward = false;
    let cancel = () => {};

    // One side goes before the other comes, so the name is only ever in one place
    const run = () => {
      cancel();
      if (forward) {
        cancel = scramble(hello, false, () => {
          nav.dataset.shown = "";
          cancel = scramble(name, true);
        });
      } else {
        cancel = scramble(name, false, () => {
          delete nav.dataset.shown;
          cancel = scramble(hello, true);
        });
      }
    };

    const snap = () => {
      for (const c of forward ? hello : name) c.setAttribute("data-s", "");
      for (const c of forward ? name : hello) c.removeAttribute("data-s");
      nav.toggleAttribute("data-shown", forward);
    };

    const onScroll = () => {
      const r = hero.getBoundingClientRect();
      const past = -r.top > r.height * 0.2;
      if (past === forward) return;
      forward = past;
      if (reduced) snap();
      else run();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancel();
    };
  }, []);

  return (
    <p className={className} data-greeting>
      <span className="visually-hidden">Hi, I&rsquo;m Djamiel</span>
      <span aria-hidden="true">
        <Letters text={HELLO} />
      </span>
      <span className={photoClassName}>
        {/* The name is right beside it, so the photo needs no text of its own */}
        <Image src="/images/djamiel.jpg" alt="" fill sizes="(max-width: 48em) 72px, 120px" priority />
      </span>
      <span aria-hidden="true">
        <Letters text={INTRO} />
      </span>
    </p>
  );
}

/** The name slot in the nav: empty at the top of the page, flickers in once the greeting has gone. */
export function NavName({ className }: { className: string }) {
  return (
    <a href="#main" className={className} data-nav-name aria-label="Djamiel Saou, back to top">
      <span aria-hidden="true">
        <Letters text={NAME} hidden />
      </span>
    </a>
  );
}
