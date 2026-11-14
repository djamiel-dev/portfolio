import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
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

/* Where the portal sits: the app that was already there, and the piece that was missing */
export function Landscape() {
  const parts = [
    { name: "Team lead", note: "Wants to reward their people" },
    { name: "Incentive Portal", note: "New: where team leads hand out rewards", lit: true },
    { name: "Employee app", note: "Already there: where staff receive them" },
  ];
  return (
    <figure className={styles.landscape}>
      <ol className={styles.flow}>
        {parts.map((p) => (
          <li key={p.name} className={styles.node} data-lit={p.lit || undefined} data-wide="">
            <strong>{p.name}</strong>
            <small>{p.note}</small>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* Grey ground with a phone rising from the bottom. shift moves the phone up (in % of its own height),
   so a part lower on the screen comes into view. */
function Pane({ shift, wide, children }: { shift?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div
      className={styles.pane}
      data-wide={wide || undefined}
      style={shift ? ({ "--shift": shift } as CSSProperties) : undefined}
    >
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

/* What the test changed besides the flow: the tested screen next to the screen after the test */
export function Changes() {
  const changes = [
    {
      title: "Numbers you can read",
      found: "Testers guessed at the bars: was it 200, or 199? And on a busy page, they didn’t know where to look.",
      change: "Every bar shows its number, and the page is split into clear sections.",
      before: { src: "/images/cases/incentive-portal/stats-before.png", height: 2622, alt: "Tested statistics screen: bars without numbers under the general figures." },
      after: { src: "/images/cases/incentive-portal/stats-after.png", height: 2758, alt: "After the test: the bars show their numbers, under the headings Specific data and Leaderboard." },
      shift: "-38%",
    },
    {
      title: "One name per task",
      found: "History and statistics kept getting mixed up, and one tester said the reward icon didn’t fit.",
      change: "History became Logbook, the separate reward list went, and rewarding got its own icon.",
      before: { src: "/images/cases/incentive-portal/menu-before.png", height: 1892, alt: "Tested menu with six items, including History and Reward list." },
      after: { src: "/images/cases/incentive-portal/menu-after.png", height: 1892, alt: "Menu after the test: five items, with Logbook instead of History and a gift icon for rewarding." },
      shift: "-16%",
    },
    {
      title: "Reward, don’t manage",
      found: "A team lead pointed out that adding and removing staff yourself invites fraud.",
      change: "Adding and removing people came out. Team leads reward their team; they don’t edit it.",
      before: { src: "/images/cases/incentive-portal/employee-before.png", height: 1874, alt: "Tested employee profile with buttons to add an employee and to remove this one." },
      after: { src: "/images/cases/incentive-portal/employee-after.png", height: 1874, alt: "Employee profile after the test: the details and a button to reward, nothing to add or remove." },
    },
  ];
  return (
    <ol className={styles.changes}>
      {changes.map((c) => (
        <li key={c.title}>
          {[c.before, c.after].map((s, i) => (
            <figure key={s.src} className={styles.change}>
              <Pane shift={c.shift}>
                <Phone src={s.src} alt={s.alt} height={s.height} sizes="(max-width: 768px) 45vw, 200px" />
              </Pane>
              <figcaption className={styles.label}>{i === 0 ? "Tested" : "After the test"}</figcaption>
            </figure>
          ))}
          <div className={styles.changeText}>
            <h4>{c.title}</h4>
            <p>{c.found}</p>
            <p>{c.change}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* Flow A and B differ in one step; that step is marked */
export function FlowAB() {
  const flows = [
    { name: "Flow A", steps: ["Pick a reward", "Pick people", "Confirm"], swap: 0 },
    { name: "Flow B", steps: ["Pick people", "Pick a reward", "Confirm"], swap: 1 },
  ];
  return (
    <div className={styles.flows}>
      {flows.map((f) => (
        <div key={f.name} className={styles.flowRow}>
          <span className={styles.label}>{f.name}</span>
          <ol className={styles.flow}>
            {f.steps.map((s, i) => (
              <li key={s} className={styles.node} data-lit={i === f.swap || undefined}>
                {s}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
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

/* Small counts as dots, not percentages: seven people is not a survey */
export function Dots({ of, lit, label, tone = "fg" }: { of: number; lit: number; label: string; tone?: "fg" | "accent" }) {
  return (
    <div className={styles.dotRow}>
      <p className={styles.label}>{label}</p>
      <span className={styles.dots} data-tone={tone} aria-hidden="true">
        {Array.from({ length: of }, (_, i) => (
          <i key={i} data-on={i < lit || undefined} />
        ))}
      </span>
      <p className={styles.dotCount}>
        {lit} of {of}
      </p>
    </div>
  );
}

/* What a team lead sees after logging in: their company, their team, and nothing else */
export function Tenants() {
  return (
    <figure className={styles.tenants}>
      <figcaption className={styles.label}>After the Microsoft login</figcaption>
      <div className={styles.company}>
        <span>Your company</span>
        <span className={styles.team} data-lit="">
          Your team
          <small>Everyone you can reward</small>
        </span>
        <span className={styles.team} data-hidden="">
          Other teams
          <small>Not visible to you</small>
        </span>
      </div>
    </figure>
  );
}

/* The same people picker for two team leads: the department choice only appears when the team lead has departments */
export function Departments() {
  const cases = [
    { api: "Team lead without departments", options: ["Everyone"] },
    { api: "Team lead with departments", options: ["Everyone", "Department A", "Department B"] },
  ];
  return (
    <figure className={styles.departments}>
      {cases.map((c) => (
        <div key={c.api} className={styles.picker}>
          <p className={styles.label}>{c.api}</p>
          <span className={styles.segments} aria-hidden="true">
            {c.options.map((o, i) => (
              <span key={o} data-on={i === 0 || undefined}>
                {o}
              </span>
            ))}
          </span>
        </div>
      ))}
      <figcaption className={styles.small}>Same screen, same code. The data decides what the team lead sees.</figcaption>
    </figure>
  );
}
