"use client";

import { useEffect, useRef } from "react";

export const STAGES = [
  { num: "01", name: "Problem" },
  { num: "02", name: "Research" },
  { num: "03", name: "Design" },
  { num: "04", name: "Build" },
  { num: "05", name: "Live" },
] as const;

const N = 1600;
const HOLD = 4600; // ms a shape stays still
const MORPH = 1700; // ms to morph into the next shape
const CYCLE = HOLD + MORPH;
const MOUSE_RADIUS = 95;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** One point cloud per stage, in unit space: cloud, sphere, cube, three plates, torus. */
function buildShapes(n: number): Float32Array[] {
  const TAU = Math.PI * 2;
  const r = Math.random;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cloud = new Float32Array(n * 3);
  const sphere = new Float32Array(n * 3);
  const cube = new Float32Array(n * 3);
  const stack = new Float32Array(n * 3);
  const torus = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    const j = i * 3;

    // Problem: loose cloud
    cloud[j] = (r() - 0.5) * 2.0;
    cloud[j + 1] = (r() - 0.5) * 1.1;
    cloud[j + 2] = (r() - 0.5) * 1.4;

    // Research: fibonacci sphere
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    sphere[j] = Math.cos(th) * rad;
    sphere[j + 1] = y;
    sphere[j + 2] = Math.sin(th) * rad;

    // Design: cube, two thirds of the points on its edges
    const s = 0.82;
    let p: [number, number, number];
    if (i % 3 !== 0) {
      const e = Math.floor(r() * 12);
      const axis = Math.floor(e / 4);
      const a = e & 1 ? s : -s;
      const b = e & 2 ? s : -s;
      const t = (r() * 2 - 1) * s;
      p = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
    } else {
      const f = Math.floor(r() * 6);
      const u = (r() * 2 - 1) * s;
      const v = (r() * 2 - 1) * s;
      const w = f & 1 ? s : -s;
      const ax = f >> 1;
      p = ax === 0 ? [w, u, v] : ax === 1 ? [u, w, v] : [u, v, w];
    }
    cube[j] = p[0];
    cube[j + 1] = p[1];
    cube[j + 2] = p[2];

    // Build: three stacked plates
    const half = 0.9;
    const plateY = ((i % 3) - 1) * 0.55;
    if (r() < 0.55) {
      const side = Math.floor(r() * 4);
      const t = (r() * 2 - 1) * half;
      stack[j] = side === 0 ? t : side === 1 ? half : side === 2 ? t : -half;
      stack[j + 2] = side === 0 ? -half : side === 1 ? t : side === 2 ? half : t;
    } else {
      stack[j] = (r() * 2 - 1) * half;
      stack[j + 2] = (r() * 2 - 1) * half;
    }
    stack[j + 1] = plateY + (r() - 0.5) * 0.04;

    // Live: torus
    const u2 = r() * TAU;
    const v2 = r() * TAU;
    const R = 0.78;
    const rr = 0.3;
    torus[j] = (R + rr * Math.cos(v2)) * Math.cos(u2);
    torus[j + 1] = rr * Math.sin(v2);
    torus[j + 2] = (R + rr * Math.cos(v2)) * Math.sin(u2);
  }

  return [cloud, sphere, cube, stack, torus];
}

type Props = {
  className?: string;
  onStageChange?: (stage: number) => void;
};

/**
 * Particle field that morphs through the five process stages.
 * Listens for the pointer on its parent element, pauses when off screen
 * and renders a single still frame when the user prefers reduced motion.
 */
export function ParticleField({ className, onStageChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onStageChangeRef = useRef(onStageChange);
  onStageChangeRef.current = onStageChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const css = getComputedStyle(canvas);
    const INK = css.getPropertyValue("--ink").trim() || "#282828";
    const BRAND = css.getPropertyValue("--brand").trim() || "#fa3600";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shapes = buildShapes(N);
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);

    let W = 0;
    let H = 0;
    let seeded = false;
    let mx = -9999;
    let my = -9999;
    let tiltX = 0;
    let tiltY = 0;
    let lastStage = -1;
    // Elapsed time only advances while the field is on screen
    let elapsed = 0;
    let last = 0;
    let raf = 0;
    let running = false;

    function setStage(s: number) {
      if (s === lastStage) return;
      lastStage = s;
      onStageChangeRef.current?.(s);
    }

    function draw(el: number) {
      if (!W || !ctx) return;
      const count = shapes.length;
      const cyc = el / CYCLE;
      const k = Math.floor(cyc) % count;
      const into = (cyc - Math.floor(cyc)) * CYCLE;
      const p = into < HOLD ? 0 : easeInOutCubic((into - HOLD) / MORPH);
      setStage(p > 0.5 ? (k + 1) % count : k);
      const A = shapes[k];
      const B = shapes[(k + 1) % count];

      const cx = W / 2;
      const cy = H * 0.34;
      const R = Math.min(W * 0.2, H * 0.16);
      const hasMouse = mx > -999;
      const tx = hasMouse ? ((mx - cx) / W) * 0.9 : 0;
      const ty = hasMouse ? ((my - cy) / H) * 0.6 : 0;
      tiltX += (ty - tiltX) * 0.04;
      tiltY += (tx - tiltY) * 0.04;
      const ay = el * 0.00016 + tiltY;
      const ax = -0.42 + tiltX;
      const cA = Math.cos(ay);
      const sA = Math.sin(ay);
      const cB = Math.cos(ax);
      const sB = Math.sin(ax);
      const mr2 = MOUSE_RADIUS * MOUSE_RADIUS;

      ctx.clearRect(0, 0, W, H);
      // Two passes so the orange accent points are drawn on top
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass === 0 ? INK : BRAND;
        for (let i = 0; i < N; i++) {
          const orange = i % 41 === 0;
          if ((pass === 1) !== orange) continue;
          const j = i * 3;
          const x = A[j] + (B[j] - A[j]) * p;
          const y = A[j + 1] + (B[j + 1] - A[j + 1]) * p;
          const z = A[j + 2] + (B[j + 2] - A[j + 2]) * p;
          const x1 = x * cA - z * sA;
          const z1 = x * sA + z * cA;
          const y2 = y * cB - z1 * sB;
          const z2 = y * sB + z1 * cB;
          const f = 3.4 / (3.4 + z2);
          const sx = cx + x1 * R * f;
          const sy = cy + y2 * R * f;

          if (reduce) {
            px[i] = sx;
            py[i] = sy;
          } else {
            vx[i] += (sx - px[i]) * 0.055;
            vy[i] += (sy - py[i]) * 0.055;
            if (hasMouse) {
              const dx = px[i] - mx;
              const dy = py[i] - my;
              const d2 = dx * dx + dy * dy;
              if (d2 < mr2 && d2 > 0.01) {
                const d = Math.sqrt(d2);
                const force = (1 - d / MOUSE_RADIUS) * 3.2;
                vx[i] += (dx / d) * force;
                vy[i] += (dy / d) * force;
              }
            }
            vx[i] *= 0.83;
            vy[i] *= 0.83;
            px[i] += vx[i];
            py[i] += vy[i];
          }

          const depth = Math.max(0, Math.min(1, (f - 0.72) / 0.62));
          ctx.globalAlpha = orange ? 1 : 0.18 + depth * 0.62;
          const size = orange ? 2.4 : 0.9 + depth * 1.1;
          ctx.fillRect(px[i] - size / 2, py[i] - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    }

    // Reduced motion: a still sphere (the "Research" stage)
    const drawStill = () => draw(HOLD * 0.5 + CYCLE);

    function loop(now: number) {
      // Clamp the step: the first frame can be stamped slightly before `last`,
      // and a long pause should not make the animation jump
      elapsed += Math.min(Math.max(now - last, 0), 50);
      last = now;
      draw(elapsed);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!seeded && W) {
        seeded = true;
        for (let i = 0; i < N; i++) {
          px[i] = Math.random() * W;
          py[i] = Math.random() * H * 0.7;
        }
      }
      if (reduce) drawStill();
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    }

    function onPointerLeave() {
      mx = -9999;
      my = -9999;
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibilityObserver.observe(canvas);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
