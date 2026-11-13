import styles from "./case.module.css";

// Diagrams and charts for the Incentive portal case. Plain SVG and CSS, drawn from the research
// documents; nothing here moves. Colours come from the page tokens through the CSS classes.

/* Where the portal sits: the pieces that were already there, and the one that was missing */
export function Landscape() {
  const parts = [
    { name: "Team lead", note: "Wants to reward their people" },
    { name: "Incentive Portal", note: "New: one company, one team at a time", lit: true },
    { name: "Back-office", note: "Already there, shared by every client" },
    { name: "Employee app", note: "Already there, white-label" },
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

/* Design rounds, each labelled with what shaped it */
export function Rounds() {
  const rounds = [
    { num: "The brief", by: "Phone-first", text: "The app opens on rewarding, the one task that matters.", note: "[Figma: first phone screens]" },
    { num: "Two expert reviews", by: "Calmer and more human", text: "Quieter colours, illustrations, and a reason with every reward.", note: "[Figma: after the expert reviews]" },
    { num: "Seven team leads", by: "Reward-first", text: "The flow most of them preferred, now the main route.", note: "[Figma: final screens]" },
  ];
  return (
    <ol className={styles.rounds}>
      {rounds.map((r) => (
        <li key={r.num}>
          <div className={styles.pane}>{r.note}</div>
          <p className={styles.label}>{r.num}</p>
          <h3>{r.by}</h3>
          <p>{r.text}</p>
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

/* When team leads would reward: the dots sit after the shift */
export function ShiftBar() {
  return (
    <figure className={styles.shift}>
      <div className={styles.shiftDay} aria-hidden="true">
        <span className={styles.shiftBlock}>Shift</span>
        <span className={styles.shiftSpot}>
          <i />
        </span>
        <span className={styles.shiftAfter}>
          {Array.from({ length: 5 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
      </div>
      <figcaption className={styles.shiftLegend}>
        <span data-kind="after">5 after the shift</span>
        <span data-kind="spot">1 on the spot</span>
        <span>1 wouldn’t use an app like this</span>
      </figcaption>
    </figure>
  );
}

/* One portal, many companies, and a team lead sees only their own team */
export function Tenants() {
  return (
    <figure className={styles.tenants} aria-label="One portal holds every client company; a team lead only sees their own team">
      <p className={styles.label}>One portal</p>
      <div className={styles.companies}>
        {["Company A", "Company B"].map((c, i) => (
          <div key={c} className={styles.company}>
            <span>{c}</span>
            <span className={styles.team} data-lit={i === 0 || undefined}>
              {i === 0 ? "Your team" : "Team"}
            </span>
            <span className={styles.team}>Team</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

/* The same people picker, fed by two clients: the department choice only appears when the API sends departments */
export function Departments() {
  const cases = [
    { api: "API sends no departments", options: ["Everyone"] },
    { api: "API sends departments", options: ["Everyone", "Department A", "Department B"] },
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
