import { contact, exploreCases, isPlaceholder, person } from "@/content/explore";
import { Board } from "./Board";
import { ArrivalFlap, Clock, Flap } from "./flap";
import styles from "./c.module.css";

const stops = ["Problem", "Research", "Design", "Build", "Live"];

export default function ConceptC() {
  return (
    <div className={styles.root}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div id="c-board" className={styles.board}>
        <header className={styles.boardHead}>
          <h1 className={styles.title}>
            <Flap text={person.name} size="l" />
            <span className="visually-hidden">, </span>
            <Flap text={person.role} size="s" />
          </h1>
          <div className={styles.headSide}>
            <p className={styles.place}>
              {person.place.replace(", NL", "")} <Clock />
            </p>
            <nav aria-label="Main" className={styles.nav}>
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href={contact.resume}>
                Resume <span aria-hidden="true">↗</span>
              </a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>

        <main id="main">
          <h2 id="work" className="visually-hidden">
            Selected work
          </h2>
          <Board cases={exploreCases} />
        </main>
        <ArrivalFlap rootId="c-board" />
      </div>

      <section id="about" className={styles.about} aria-labelledby="c-about">
        <h2 id="c-about" className={styles.aboutTitle}>
          Every project calls at
        </h2>
        <ol className={styles.stops}>
          {stops.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className={styles.aboutText}>{person.line} AI helps me explore more routes; I decide which one ships.</p>
        <p className={styles.statusLine}>
          This page: <span className={styles.tbd}>[Lighthouse score]</span> · <span className={styles.tbd}>[axe result]</span>
        </p>
      </section>

      <footer id="contact" className={styles.contact}>
        <h2 className={styles.contactTitle}>Let&apos;s talk</h2>
        <p className={styles.email}>
          <a href={contact.emailHref}>
            {isPlaceholder(contact.email) ? <span className={styles.tbd}>{contact.email}</span> : contact.email}
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
      </footer>
    </div>
  );
}
