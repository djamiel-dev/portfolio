import { ViewCursor } from "@/components/explore/ViewCursor";
import { contact, exploreCases, isPlaceholder, person, statusLabel } from "@/content/explore";
import { GridName } from "./GridName";
import { GridToggle } from "./GridToggle";
import styles from "./a.module.css";

const process = [
  { step: "Problem", text: "Start from what the business needs and what users actually need." },
  { step: "Research", text: "Talk to and test with the people who will use it." },
  { step: "Design", text: "Explore more directions with AI, then choose on evidence." },
  { step: "Build", text: "Build it myself in Next.js, with checks for accessibility and speed." },
  { step: "Live", text: "Ship it, watch how it is used, and keep improving." },
];

/** Placeholder text is shown in a dashed outline, so nothing invented reads as fact. */
function Text({ children }: { children: string }) {
  return isPlaceholder(children) ? <span className={styles.tbd}>{children}</span> : <>{children}</>;
}

export default function ConceptA() {
  return (
    <div className={styles.root} data-grid="on">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={styles.top}>
        <a href="#main" className={styles.home}>
          {person.name}
        </a>
        <nav aria-label="Main" className={styles.nav}>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href={contact.resume}>
            Resume <span aria-hidden="true">↗</span>
          </a>
          <a href="#contact" className={styles.navContact}>
            Contact
          </a>
        </nav>
        <GridToggle />
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="a-title">
          <div className={styles.intro}>
            <h1 id="a-title" className={styles.title}>
              <span className="visually-hidden">{person.name}, </span>
              <GridName word={person.name} />
              <span className={styles.role}>{person.role}.</span>
            </h1>
            <p className={styles.line}>
              {person.line} Based in {person.place.replace(", NL", "")}.
            </p>
            <p className={styles.actions}>
              <a href={contact.emailHref} className={styles.primary}>
                Email me
              </a>
              <a href={contact.call}>Book a call</a>
            </p>
          </div>

          <div id="work" className={styles.work}>
            <h2 className={styles.workTitle}>Selected work</h2>
            <ol className={styles.index}>
              {exploreCases.map((c) => (
                <li key={c.num} className={styles.cellItem}>
                  <a
                    href={c.href}
                    className={styles.cell}
                    data-cursor="View case"
                    aria-labelledby={`a-case-${c.num}`}
                    aria-describedby={`a-out-${c.num}`}
                  >
                    <span className={styles.thumb}>
                      <span className={styles.caption}>{c.caption}</span>
                    </span>
                    <span className={styles.cellMeta}>
                      <span data-status={c.status}>{statusLabel[c.status]}</span>
                      <span>{c.type}</span>
                    </span>
                    <span id={`a-case-${c.num}`} className={styles.cellTitle}>
                      {c.name}
                    </span>
                    <span id={`a-out-${c.num}`} className={styles.cellOutcome}>
                      <Text>{c.outcome}</Text>
                    </span>
                  </a>
                  {c.liveUrl && (
                    <a href={c.liveUrl} className={styles.liveLink} target="_blank" rel="noopener">
                      Live site <span aria-hidden="true">↗</span>
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className={styles.process} aria-labelledby="a-process">
          <h2 id="a-process" className={styles.processTitle}>
            How I work
          </h2>
          <ol className={styles.steps}>
            {process.map((p) => (
              <li key={p.step} className={styles.stepCell}>
                <h3 className={styles.stepName}>{p.step}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
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
            <a href={contact.call}>Book a call</a>
          </li>
          <li>
            <a href={contact.resume}>
              Resume <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={contact.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={contact.github}>GitHub</a>
          </li>
        </ul>
        <p className={styles.place}>{person.place}</p>
      </footer>

      <ViewCursor className={styles.cursor} visibleClassName={styles.cursorOn} />
    </div>
  );
}
