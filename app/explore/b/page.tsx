import type { CSSProperties } from "react";
import { contact, exploreCases, isPlaceholder, person, statusLabel } from "@/content/explore";
import styles from "./b.module.css";

// Each case owns one sticky-note colour; AI notes always use their own.
const noteColour: Record<string, string> = {
  "01": "#ffe873",
  "02": "#ffc8da",
  "03": "#cdeeb6",
  "04": "#c4e1ff",
};

// Where each cluster hangs on the hero wall, and its tilt
const tilt = ["-1.5deg", "1.2deg", "0.8deg", "-1deg"];

// Scattered start positions for the notes before they gather
const scatter = [
  { fx: "-260%", fy: "40%", fr: "-9deg" },
  { fx: "-120%", fy: "-30%", fr: "7deg" },
  { fx: "-330%", fy: "-90%", fr: "11deg" },
  { fx: "-190%", fy: "-160%", fr: "-6deg" },
];

function Text({ children }: { children: string }) {
  return isPlaceholder(children) ? <span className={styles.tbd}>{children}</span> : <>{children}</>;
}

export default function ConceptB() {
  return (
    <div className={styles.root}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={styles.top}>
        <a href="#main" className={styles.tape}>
          {person.name}
        </a>
        <nav aria-label="Main" className={styles.nav}>
          <a href="#work">work</a>
          <a href="#about">about</a>
          <a href={contact.resume}>
            resume <span aria-hidden="true">↗</span>
          </a>
          <a href="#contact" className={styles.navContact}>
            contact
          </a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.wall} aria-labelledby="b-title">
          <div className={styles.sheet}>
            <h1 id="b-title" className={styles.title}>
              <span className={styles.name}>{person.name}</span>
              <span>{person.role}.</span>
            </h1>
            <p className={styles.line}>{person.line}</p>
            <p className={styles.place}>{person.place}</p>
            <p className={styles.actions}>
              <a href={contact.emailHref}>email me</a>
              <a href={contact.call}>book a call</a>
            </p>
          </div>

          <h2 id="work" className="visually-hidden">
            Selected work
          </h2>
          <ul className={styles.clusters}>
            {exploreCases.map((c, i) => (
              <li
                key={c.num}
                className={styles.cluster}
                style={{ "--tilt": tilt[i], "--note": noteColour[c.num] } as CSSProperties}
              >
                <a href={`#wall-${c.num}`} className={styles.clusterLink}>
                  <span className={styles.print}>
                    <span className={styles.mini} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className={styles.caption}>{c.caption}</span>
                  </span>
                  <span className={styles.clusterName}>{c.name}</span>
                  <span className={styles.clusterNote}>
                    <Text>{c.outcome}</Text>
                  </span>
                  <span className={styles.status} data-status={c.status}>
                    {statusLabel[c.status]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {exploreCases.map((c) => {
          const notes = [
            { label: "Problem", text: c.notes.problem },
            { label: "Insight", text: c.notes.insight },
            { label: "Decision", text: c.notes.decision },
            { label: "AI suggested → I decided", text: c.ai, ai: true },
          ];
          return (
            <article
              key={c.num}
              id={`wall-${c.num}`}
              className={styles.caseWall}
              aria-labelledby={`b-case-${c.num}`}
              style={{ "--note": noteColour[c.num] } as CSSProperties}
            >
              <header className={styles.caseHead}>
                <p className={styles.caseMeta}>
                  <span className={styles.status} data-status={c.status}>
                    {statusLabel[c.status]}
                  </span>
                  {c.type} · {c.year}
                </p>
                <h2 id={`b-case-${c.num}`} className={styles.caseTitle}>
                  {c.name}
                </h2>
                <p className={styles.caseOutcome}>
                  <Text>{c.outcome}</Text>
                </p>
                <p className={styles.caseLinks}>
                  <a href={c.href}>open the case</a>
                  {c.liveUrl && (
                    <a href={c.liveUrl} target="_blank" rel="noopener">
                      live site <span aria-hidden="true">↗</span>
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  )}
                </p>
              </header>

              <div className={styles.stage}>
                <figure className={styles.frame}>
                  <div className={styles.frameBar} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.screen} aria-hidden="true">
                    <span className={styles.blockHead} />
                    <span className={styles.blockHero} />
                    <span className={styles.blockA} />
                    <span className={styles.blockB} />
                    <span className={styles.blockC} />
                  </div>
                  <figcaption className={styles.caption}>{c.caption}</figcaption>
                </figure>

                <ul className={styles.notes} aria-label={`Notes for ${c.name}`}>
                  {notes.map((n, i) => (
                    <li
                      key={n.label}
                      className={n.ai ? `${styles.note} ${styles.noteAi}` : styles.note}
                      style={scatterStyle(i)}
                    >
                      <span className={styles.noteLabel}>{n.label}</span>
                      <span className={styles.noteText}>
                        <Text>{n.text}</Text>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}

        <section id="about" className={styles.about} aria-labelledby="b-about">
          <h2 id="b-about" className={styles.aboutTitle}>
            How the wall works
          </h2>
          <p>
            Every project starts as notes, interviews and sketches on a wall. AI helps me explore more of them; I decide which
            ones survive. What you see above is that wall, folded into the product.
          </p>
        </section>
      </main>

      <footer id="contact" className={styles.contact}>
        <h2 className={styles.contactTitle}>Let&apos;s talk</h2>
        <p className={styles.email}>
          <a href={contact.emailHref}>
            <Text>{contact.email}</Text>
          </a>
        </p>
        <ul className={styles.contactLinks}>
          <li>
            <a href={contact.call}>book a call</a>
          </li>
          <li>
            <a href={contact.resume}>
              resume <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={contact.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={contact.github}>GitHub</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

function scatterStyle(i: number) {
  const s = scatter[i];
  return { "--fx": s.fx, "--fy": s.fy, "--fr": s.fr, "--r": tilt[i] } as CSSProperties;
}
