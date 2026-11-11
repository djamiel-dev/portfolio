"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { heroGlyphs } from "@/components/home/content";

/**
 * Page transition: the hero's glyph swell as a wave.
 * A click on a link to another page starts a ring at the pointer. Each cell the ring passes
 * flares through the glyph ramp and settles into the quiet field, until the screen is covered.
 * Then the route changes (a client-side navigation) and a second ring from the same point
 * clears the field again, cell by cell. Going home, the field it leaves behind is the hero's.
 *
 * Only for same-site page links: hashes on the same page, mail, phone, files, new tabs and
 * modified clicks keep their own behaviour. With reduced motion, links navigate as normal;
 * from the keyboard the page changes without a wave, and focus moves to the new page's heading.
 */

const RAMP = "·:-+=*#";
const CELL = 16;
const COVER = 300; // ms: answers the click, so short
const REVEAL = 380; // ms: the new page settles in a little slower
const NIGHT: [string, string, string] = ["#151412", "#4a4943", "#ff9e5e"];

type Wave = { x: number; y: number; colors: [string, string, string] };

// Both ease out: the ring leaves the pointer at once, so the click feels answered from the
// first frame. Quadratic rather than cubic, so the far corners don't trail.
const easeOut = (p: number) => 1 - (1 - p) ** 2;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLCanvasElement>(null);
  const pending = useRef<{
    path: string;
    hash: string;
    wave: Wave | null;
    covered: Promise<void>;
  } | null>(null);

  // Intercept clicks on page links
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e: MouseEvent) => {
      if (reduced.matches || pending.current) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // files such as resume.pdf

      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      // Enter on a link (detail 0): no wave, keyboard users get the page straight away
      if (e.detail === 0) {
        pending.current = {
          path: url.pathname,
          hash: url.hash,
          wave: null,
          covered: Promise.resolve(),
        };
        router.push(href);
        return;
      }
      const x = e.clientX,
        y = e.clientY;
      const night = document.querySelector("[data-sky]")?.getAttribute("data-sky") === "night";
      const wave: Wave = { x, y, colors: night ? NIGHT : heroGlyphs };
      router.prefetch(url.pathname);
      const covered = play(ref.current!, wave, "cover");
      pending.current = { path: url.pathname, hash: url.hash, wave, covered };
      covered.then(() => {
        router.push(href);
        // If the new page never arrives, fall back to a normal page load
        setTimeout(() => pending.current?.path === url.pathname && location.assign(url.href), 4000);
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  // The new page is in: clear the field and hand focus to the page
  useEffect(() => {
    const p = pending.current;
    if (!p || p.path !== pathname) return;
    let gone = false;
    // The new page is committed when this effect runs, so no need to wait for a frame
    p.covered.then(() => {
      if (gone) return;
      const target =
        (p.hash && document.getElementById(decodeURIComponent(p.hash.slice(1)))) ||
        document.querySelector<HTMLElement>("main h1") ||
        document.querySelector<HTMLElement>("main");
      if (target) {
        if (!target.hasAttribute("tabindex") && !target.matches("a,button,input,select,textarea")) target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
      const finish = () => {
        if (pending.current === p) pending.current = null;
      };
      if (p.wave) play(ref.current!, p.wave, "reveal").then(finish);
      else finish();
    });
    return () => {
      gone = true;
    };
  }, [pathname]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        pointerEvents: "none",
        display: "none",
      }}
    />
  );
}

/** Runs one ring across the screen. "cover" fills cells behind the front; "reveal" clears them. */
function play(canvas: HTMLCanvasElement, wave: Wave, mode: "cover" | "reveal"): Promise<void> {
  return new Promise((done) => {
    const ctx = canvas.getContext("2d");
    // A hidden tab gets no animation frames: skip the wave rather than hang on it
    if (!ctx || document.hidden) {
      canvas.style.display = "none";
      canvas.style.pointerEvents = "none";
      return done();
    }
    const dpr = Math.min(devicePixelRatio, 2);
    const W = innerWidth,
      H = innerHeight;
    // Resizing clears the canvas, so only when the size really changed
    if (canvas.width !== Math.round(W * dpr)) canvas.width = Math.round(W * dpr);
    if (canvas.height !== Math.round(H * dpr)) canvas.height = Math.round(H * dpr);
    canvas.style.display = "block";
    // While covering, no stray clicks; while revealing, the new page is already usable
    canvas.style.pointerEvents = mode === "cover" ? "auto" : "none";

    const [bg, ink, crest] = wave.colors;
    const coarse = !matchMedia("(hover: hover) and (pointer: fine)").matches;
    const size = coarse ? Math.round(CELL * 0.85) : CELL;
    const L = RAMP.length;
    const S = Math.ceil(size * dpr);
    const atlas = document.createElement("canvas");
    atlas.width = S * L;
    atlas.height = S * 2;
    const a = atlas.getContext("2d")!;
    a.textAlign = "center";
    a.textBaseline = "middle";
    a.font = `500 ${Math.round(size * 0.82 * dpr)}px "Geist Mono", ui-monospace, monospace`;
    [ink, crest].forEach((c, row) => {
      a.fillStyle = c;
      for (let i = 0; i < L; i++) a.fillText(RAMP[i], i * S + S / 2, row * S + S / 2 + dpr * 0.5);
    });

    // Same grid as the hero: centred, so a full-screen hero lines up with the field left behind
    const cols = Math.ceil(W / size) + 1,
      rows = Math.ceil(H / size) + 1;
    const ox = (W - (cols - 1) * size) / 2,
      oy = (H - (rows - 1) * size) / 2;
    const cx = (wave.x - ox) / size,
      cy = (wave.y - oy) / size;
    const far = Math.max(
      Math.hypot(cx, cy),
      Math.hypot(cols - cx, cy),
      Math.hypot(cx, rows - cy),
      Math.hypot(cols - cx, rows - cy),
    );
    const band = 3.5; // cells of glyphs ahead of and behind the front
    // From just before the pointer to just past the farthest corner, so no frame is spent off screen
    const reach = far + band * 2;
    const ms = mode === "cover" ? COVER : REVEAL;
    const t0 = performance.now();

    const frame = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const front = easeOut(p) * reach - band;
      const t = now / 1000;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bg;
      const half = (size * dpr) / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const d = Math.hypot(i - cx, j - cy);
          const solid = mode === "cover" ? d < front : d > front;
          const px = (ox + i * size) * dpr,
            py = (oy + j * size) * dpr;
          if (solid) {
            ctx.globalAlpha = 1;
            ctx.fillRect(
              Math.floor(px - half),
              Math.floor(py - half),
              Math.ceil(half * 2) + 1,
              Math.ceil(half * 2) + 1,
            );
          }
          // The front flares; behind it the field murmurs like the hero
          const flare = Math.exp(-((d - front) ** 2) / (band * 1.6));
          let v = flare * 1.15;
          if (solid) v += 0.06 + 0.05 * Math.sin(i * 0.37 + t * 0.6) * Math.sin(j * 0.29 - t * 0.45);
          if (v < 0.035) continue;
          const lv = Math.min(L - 1, Math.floor(v * L * 1.05));
          ctx.globalAlpha = Math.min(1, 0.2 + v * 1.15);
          ctx.drawImage(atlas, lv * S, (v > 0.8 ? 1 : 0) * S, S, S, px - S / 2, py - S / 2, S, S);
        }
      }
      ctx.globalAlpha = 1;
      if (p < 1) return requestAnimationFrame(frame);
      if (mode === "reveal") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
      }
      done();
    };
    // The first frame right away, so the covered screen never shows a blank frame in between
    frame(t0);
  });
}
