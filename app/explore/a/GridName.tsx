"use client";

import { useEffect, useMemo, useRef } from "react";
import { layoutWord } from "./glyphs";
import styles from "./a.module.css";

const DUST = 260;
const FLIGHT = 750; // ms for a block to fly into its cell
const PUSH_RADIUS = 3.2; // in cells
const SPRING = 0.08;
const DAMPING = 0.78;

type Props = { word: string };

/**
 * The name, built from grid cells. Without JavaScript or with reduced motion
 * the SVG shows the finished letters. Otherwise a canvas lets particles fly
 * into their cells once, then the cells can be nudged by the pointer.
 */
export function GridName({ word }: Props) {
  const { cells, cols, rows } = useMemo(() => layoutWord(word), [word]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const INK = getComputedStyle(wrap).getPropertyValue("--a-ink").trim() || "#141414";
    const ACCENT = getComputedStyle(wrap).getPropertyValue("--a-blue").trim() || "#1f3fff";
    const n = cells.length;
    // Block state, in cell units
    const bx = new Float32Array(n);
    const by = new Float32Array(n);
    const vx = new Float32Array(n);
    const vy = new Float32Array(n);
    const grow = new Float32Array(n); // 0 = dot in flight, 1 = full cell
    const sx = new Float32Array(n); // start position
    const sy = new Float32Array(n);
    const landed = new Uint8Array(n);
    const delay = new Float32Array(n);
    const dx = new Float32Array(DUST);
    const dy = new Float32Array(DUST);
    const dvx = new Float32Array(DUST);
    const dvy = new Float32Array(DUST);

    for (let i = 0; i < n; i++) {
      bx[i] = sx[i] = (Math.random() * 1.4 - 0.2) * cols;
      by[i] = sy[i] = (Math.random() * 3 - 1) * rows;
      // Build left to right, like setting type
      delay[i] = (cells[i].x / cols) * 650 + Math.random() * 180;
    }
    for (let i = 0; i < DUST; i++) {
      dx[i] = Math.random() * cols;
      dy[i] = (Math.random() * 2 - 0.5) * rows;
      dvx[i] = (Math.random() - 0.5) * 0.03;
      dvy[i] = (Math.random() - 0.5) * 0.03;
    }

    let W = 0;
    let cs = 0;
    let raf = 0;
    let running = false;
    let start = 0;
    let mx = -99;
    let my = -99;
    let inView = true;

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas!.clientWidth;
      cs = W / cols;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(cs * rows * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now() - start);
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, cs * rows);
      const gap = Math.max(1, cs * 0.08);
      // Dust from the old particle field fades out while the letters form
      const dustAlpha = Math.max(0, 1 - t / 1800);
      if (dustAlpha > 0) {
        ctx!.fillStyle = INK;
        ctx!.globalAlpha = dustAlpha * 0.35;
        for (let i = 0; i < DUST; i++) ctx!.fillRect(dx[i] * cs, dy[i] * cs, 1.2, 1.2);
      }
      ctx!.globalAlpha = 1;
      for (let i = 0; i < n; i++) {
        const g = grow[i];
        const size = 2 + (cs - gap - 2) * g;
        const cx = (bx[i] + 0.5) * cs;
        const cy = (by[i] + 0.5) * cs;
        const off = Math.hypot(bx[i] - cells[i].x, by[i] - cells[i].y);
        // A block that is pushed out of its cell shows the accent colour
        ctx!.fillStyle = g > 0.99 && off > 0.35 ? ACCENT : INK;
        ctx!.fillRect(cx - size / 2, cy - size / 2, size, size);
      }
    }

    const easeOutExpo = (p: number) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));

    // The build is driven by time, not frames, so a slow phone finishes as fast
    // as a desktop; afterwards a spring lets the pointer nudge the cells
    function step(now: number) {
      const t = now - start;
      let moving = t < 1800;
      for (let i = 0; i < n; i++) {
        const p = (t - delay[i]) / FLIGHT;
        if (p < 1) {
          const e = easeOutExpo(Math.max(0, p));
          bx[i] = sx[i] + (cells[i].x - sx[i]) * e;
          by[i] = sy[i] + (cells[i].y - sy[i]) * e;
          grow[i] = Math.min(1, Math.max(0, (p - 0.55) / 0.45));
          moving = true;
          continue;
        }
        if (!landed[i]) {
          // A slow frame can skip past the end of the flight: land exactly
          landed[i] = 1;
          grow[i] = 1;
          bx[i] = cells[i].x;
          by[i] = cells[i].y;
        }
        let tx = cells[i].x;
        let ty = cells[i].y;
        if (mx > -50) {
          const ddx = tx - mx;
          const ddy = ty - my;
          const d = Math.hypot(ddx, ddy);
          if (d < PUSH_RADIUS && d > 0.001) {
            const f = (1 - d / PUSH_RADIUS) * 1.4;
            tx += (ddx / d) * f;
            ty += (ddy / d) * f;
          }
        }
        vx[i] = (vx[i] + (tx - bx[i]) * SPRING) * DAMPING;
        vy[i] = (vy[i] + (ty - by[i]) * SPRING) * DAMPING;
        bx[i] += vx[i];
        by[i] += vy[i];
        if (Math.abs(vx[i]) + Math.abs(vy[i]) > 0.002 || Math.abs(tx - bx[i]) + Math.abs(ty - by[i]) > 0.01) moving = true;
      }
      for (let i = 0; i < DUST; i++) {
        dx[i] += dvx[i];
        dy[i] += dvy[i];
      }
      draw(t);
      if (moving && inView) raf = requestAnimationFrame(step);
      else running = false;
    }

    function run() {
      if (running || !inView) return;
      running = true;
      raf = requestAnimationFrame(step);
    }

    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      mx = (e.clientX - r.left) / cs - 0.5;
      my = (e.clientY - r.top) / cs - 0.5;
      run();
    }

    function onLeave() {
      mx = -99;
      my = -99;
      run();
    }

    wrap.dataset.canvas = "on";
    start = performance.now();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) run();
    });
    io.observe(canvas);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    run();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [cells, cols, rows]);

  return (
    <div ref={wrapRef} className={styles.name} style={{ aspectRatio: `${cols} / ${rows}`, width: `calc(${cols} * var(--u))` }} aria-hidden="true">
      <svg className={styles.nameSvg} viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none">
        {cells.map((c) => (
          <rect key={`${c.x}-${c.y}`} x={c.x + 0.04} y={c.y + 0.04} width={0.92} height={0.92} />
        ))}
      </svg>
      <canvas ref={canvasRef} className={styles.nameCanvas} />
    </div>
  );
}
