"use client";

import { useEffect, useRef, useState } from "react";
import ds from "./design-system.module.css";

// Re-read once a second, so edits to the tokens show up here without a reload
function useLive<T>(read: (el: HTMLElement) => T) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<T | null>(null);
  const latest = useRef(read);
  latest.current = read;

  useEffect(() => {
    const update = () => {
      if (ref.current) setValue(latest.current(ref.current));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return [ref, value] as const;
}

const channels = (color: string) => (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);

const toHex = (color: string) =>
  `#${channels(color)
    .map((c) => Math.round(c).toString(16).padStart(2, "0"))
    .join("")}`;

const luminance = (color: string) => {
  const [r, g, b] = channels(color).map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const verdict = (ratio: number) => {
  if (ratio >= 4.5) return "All text";
  if (ratio >= 3) return "24px and up, icons";
  return "Decoration only";
};

export function Swatch({ token, use }: { token: string; use: string }) {
  const [ref, value] = useLive((el) => {
    const color = getComputedStyle(el).backgroundColor;
    const panel = el.closest("[data-panel]") ?? document.body;
    return { hex: toHex(color), ratio: contrast(color, getComputedStyle(panel).backgroundColor) };
  });

  return (
    <li className={ds.swatch}>
      <div ref={ref} className={ds.chip} style={{ background: `var(${token})` }} />
      <p className={ds.token}>{token}</p>
      <p className={ds.value}>{value?.hex ?? "–"}</p>
      <p className={ds.use}>{use}</p>
      {token !== "--bg" && value && (
        <p className={ds.value}>
          {value.ratio.toFixed(2)}:1 · {verdict(value.ratio)}
        </p>
      )}
    </li>
  );
}

export function TypeRow({ name, children }: { name: string; children: React.ReactNode }) {
  const [ref, value] = useLive((el) => {
    const s = getComputedStyle(el.firstElementChild ?? el);
    return `${parseFloat(s.fontSize).toFixed(1)}px · ${s.fontWeight} · line ${parseFloat(s.lineHeight).toFixed(1)}px`;
  });

  return (
    <li className={ds.typeRow}>
      <div className={ds.typeMeta}>
        <p className={ds.token}>{name}</p>
        <p className={ds.value}>{value ?? "–"}</p>
      </div>
      <div ref={ref} className={ds.typeSample}>
        {children}
      </div>
    </li>
  );
}

export function TokenText({ token }: { token: string }) {
  const [ref, value] = useLive((el) => getComputedStyle(el).getPropertyValue(token).trim());
  return (
    <div ref={ref} className={ds.value}>
      {value ?? "–"}
    </div>
  );
}
