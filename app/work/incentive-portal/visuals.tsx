import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./case.module.css";

// An iPhone-like frame: side buttons, a camera island over a status bar in the app's own background,
// and a home indicator. The export starts below the status bar, so it fits without being cut off.
// Exports are 2x of a 480-wide Figma frame. Pins (children) are placed in % of the export itself.
export function Phone({
  src,
  alt,
  sizes,
  height = 1892,
  screen = "#f8f8f8",
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  height?: number;
  screen?: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.device}>
      <div className={styles.frame}>
        <div className={styles.screen} style={{ backgroundColor: screen }}>
          <Image src={src} alt={alt} width={960} height={height} sizes={sizes} />
        </div>
        {children && <div className={styles.pins}>{children}</div>}
      </div>
    </div>
  );
}

// Diagrams and charts for the Incentive portal case. Plain SVG and CSS, drawn from the research
// documents; nothing here moves. Colours come from the page tokens through the CSS classes.

/* Grey ground with a phone rising from the bottom, so you see the top of each screen */
function Pane({ wide, children }: { wide?: boolean; children: ReactNode }) {
  return (
    <div className={styles.pane} data-wide={wide || undefined}>
      {children}
    </div>
  );
}

/* Design rounds before the test, each labelled with what shaped it */
export function Rounds() {
  const rounds = [
    // Iteration 1, made after the rough AI prototypes
    {
      num: "Exploring",
      by: "From AI sketches to a first design",
      text: "Rough AI prototypes in Lovable, Bolt and Stitch gave stakeholders something to react to. What they wanted became my first design in Figma.",
      src: "/images/cases/incentive-portal/first-design.png",
      width: 1920,
      height: 1080,
      alt: "First Figma design: a desktop dashboard with a welcome card, the monthly points budget, rewards to manage and recent rewards.",
      wide: true,
    },
    // Iteration 3, the version that went into the first expert review
    {
      num: "Stakeholders and desk research",
      by: "Phone-first",
      text: "The app opens on rewarding, the one task that matters.",
      src: "/images/cases/incentive-portal/round-brief.png",
      height: 2580,
      alt: "Phone design: the monthly budget at the top, then quick rewards and a heavy orange button to hand out points.",
    },
    // The prototype after the second expert review, the one the team leads tested
    {
      num: "Two expert reviews",
      by: "Calmer and more human",
      text: "Calmer colours, a warmer welcome card, and an optional personal message with each reward.",
      src: "/images/cases/incentive-portal/round-experts.png",
      height: 2050,
      alt: "After the expert reviews: a welcoming purple card with the points left, and calmer reward tiles.",
    },
  ];
  return (
    <ol className={styles.rounds}>
      {rounds.map((r) => (
        <li key={r.num}>
          <Pane wide={r.wide}>
            {r.wide ? (
              <Image
                className={styles.desktop}
                src={r.src}
                alt={r.alt}
                width={r.width}
                height={r.height}
                sizes="(max-width: 768px) 90vw, 360px"
              />
            ) : (
              <Phone src={r.src} alt={r.alt} height={r.height} sizes="(max-width: 768px) 60vw, 240px" />
            )}
          </Pane>
          <p className={styles.label}>{r.num}</p>
          <h3>{r.by}</h3>
          <p>{r.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* Only the part of a screen that changed, without a phone around it. x, y and w are pixels in the
   960-wide export; every crop is 4:5, so the height is w × 1.25. Margins in % follow the box's width. */
function Crop({ src, alt, x, y, w, height, tag }: { src: string; alt: string; x: number; y: number; w: number; height: number; tag: string }) {
  return (
    <figure className={styles.crop}>
      <figcaption className={styles.label}>{tag}</figcaption>
      <div className={styles.window}>
        <Image
          src={src}
          alt={alt}
          width={960}
          height={height}
          sizes={`(max-width: 768px) ${Math.round((960 / w) * 45)}vw, ${Math.round((960 / w) * 220)}px`}
          style={{ width: `${(960 / w) * 100}%`, marginLeft: `${(-x / w) * 100}%`, marginTop: `${(-y / w) * 100}%` }}
        />
      </div>
    </figure>
  );
}

/* What the test changed besides the flow: one detail per screen, tested on the left, after the test on the right */
export function Changes() {
  const changes = [
    {
      title: "Numbers you can read",
      found: "Testers guessed at the bars: was it 200, or 199?",
      change: "Every bar now shows its number, and the page has clear sections.",
      crop: { x: 100, w: 620, before: 1060, after: 1150 },
      before: { src: "/images/cases/incentive-portal/stats-before.png", height: 2622, alt: "Tested statistics chart: bars without numbers." },
      after: { src: "/images/cases/incentive-portal/stats-after.png", height: 2758, alt: "After the test: each bar shows its number." },
    },
    {
      title: "One name per task",
      found: "History and statistics kept getting mixed up.",
      change: "History became Logbook, and the separate reward list went.",
      crop: { x: 30, w: 900, before: 600, after: 600 },
      before: { src: "/images/cases/incentive-portal/menu-before.png", height: 1892, alt: "Tested menu: Statistics, History, Reward list, Tips for rewarding." },
      after: { src: "/images/cases/incentive-portal/menu-after.png", height: 1892, alt: "Menu after the test: Statistics, Logbook, Tips for rewarding." },
    },
    {
      title: "Reward, don’t manage",
      found: "A team lead warned that adding and removing staff yourself invites fraud.",
      change: "Team leads now reward their team; they don’t edit it.",
      crop: { x: 0, w: 960, before: 170, after: 170 },
      before: { src: "/images/cases/incentive-portal/employee-before.png", height: 1874, alt: "Tested employee profile with an Add employee button and a Remove link." },
      after: { src: "/images/cases/incentive-portal/employee-after.png", height: 1874, alt: "Employee profile after the test, without add or remove." },
    },
  ];
  return (
    <ul className={styles.changes}>
      {changes.map((c) => (
        <li key={c.title}>
          <div className={styles.pair}>
            <Crop {...c.before} x={c.crop.x} y={c.crop.before} w={c.crop.w} tag="Tested" />
            <Crop {...c.after} x={c.crop.x} y={c.crop.after} w={c.crop.w} tag="After the test" />
          </div>
          <h4>{c.title}</h4>
          <p>{c.found}</p>
          <p>{c.change}</p>
        </li>
      ))}
    </ul>
  );
}

// Ease of rewarding per tester, flow A then B (1 = hard, 5 = easy), and which flow they preferred.
// Source: usability test, sprint 4. Testers are anonymous here.
const scores: { a: number; b: number; pref: "A" | "B" }[] = [
  { a: 5, b: 5, pref: "A" },
  { a: 2.5, b: 5, pref: "B" },
  { a: 5, b: 2, pref: "A" },
  { a: 4, b: 4, pref: "B" },
  { a: 5, b: 3, pref: "A" },
  { a: 4, b: 3, pref: "A" },
  { a: 5, b: 4, pref: "A" },
];
const avg = (k: "a" | "b") => scores.reduce((n, s) => n + s[k], 0) / scores.length;

/* Slope chart: one line per tester from flow A to flow B, the average on top */
export function EaseChart() {
  const y = (v: number) => 20 + (5 - v) * 42; // 5 → 20, 1 → 188
  const xa = 96;
  const xb = 264;
  const a = avg("a");
  const b = avg("b");
  return (
    <figure className={styles.chart}>
      <figcaption>
        <span className={styles.chartTitle}>How easy was rewarding?</span>
        <span className={styles.chartSub}>One line per tester. 1 is hard, 5 is easy.</span>
      </figcaption>
      <svg
        viewBox="0 0 360 236"
        role="img"
        aria-label={`Average ease ${a.toFixed(1)} out of 5 for flow A, reward first, and ${b.toFixed(1)} for flow B, person first. Five of seven testers scored A higher or equal and preferred it.`}
      >
        {[5, 4, 3, 2, 1].map((v) => (
          <g key={v}>
            <line className={styles.grid} x1={xa - 28} x2={xb + 28} y1={y(v)} y2={y(v)} />
            <text className={styles.tick} x={xa - 40} y={y(v) + 4} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        {scores.map((s, i) => (
          <line
            key={i}
            className={s.pref === "A" ? styles.tester : styles.testerB}
            x1={xa}
            x2={xb}
            y1={y(s.a)}
            y2={y(s.b)}
          />
        ))}
        <line className={styles.average} x1={xa} x2={xb} y1={y(a)} y2={y(b)} />
        <circle className={styles.averageDot} cx={xa} cy={y(a)} r="5" />
        <circle className={styles.averageDot} cx={xb} cy={y(b)} r="5" />
        <text className={styles.averageText} x={xa - 10} y={y(a) - 8} textAnchor="end">
          {a.toFixed(1)}
        </text>
        <text className={styles.averageText} x={xb + 10} y={y(b) + 5}>
          {b.toFixed(1)}
        </text>
        <text className={styles.axis} x={xa} y={214} textAnchor="middle">
          Flow A
        </text>
        <text className={styles.axisSub} x={xa} y={230} textAnchor="middle">
          reward first
        </text>
        <text className={styles.axis} x={xb} y={214} textAnchor="middle">
          Flow B
        </text>
        <text className={styles.axisSub} x={xb} y={230} textAnchor="middle">
          person first
        </text>
      </svg>
      <ul className={styles.legend} aria-hidden="true">
        <li data-kind="a">Preferred A</li>
        <li data-kind="b">Preferred B</li>
        <li data-kind="avg">Average</li>
      </ul>
    </figure>
  );
}
