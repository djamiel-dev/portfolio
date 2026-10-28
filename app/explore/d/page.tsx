import type { Metadata } from "next";
import { exploreCases } from "@/content/explore";
import { links } from "@/content/site";
import styles from "./d.module.css";
import { HeroBackground } from "./HeroBackground";
import { Skills } from "./Skills";
import { Timeline } from "./Timeline";
export const metadata: Metadata = {
  title: "Djamiel – product designer who builds (D)",
  description: "Exploration D: wireframe v2 in Heron style.",
};

export default function ConceptD() {
  return (
    <div className={styles.root} data-theme-root>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={styles.top}>
        <a href="#main" className={styles.home}>
          Djamiel Saou
        </a>
        <nav aria-label="Main" className={styles.nav}>
          <a href="#work">Work</a>
          <a href="#ai">How I use AI</a>
          <a href={links.about}>About</a>
          <a href={links.resume}>
            Resume <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="d-title">
          <HeroBackground />
          <h1 id="d-title" className={styles.greeting}>
            <span>Hi,</span>
            <span className={styles.photo} role="img" aria-label="[Photo of Djamiel]">
              <span aria-hidden="true">[Photo]</span>
            </span>
            <span>I&rsquo;m Djamiel</span>
          </h1>
          <p className={styles.line}>
            AI-native product designer who researches, designs and builds, from real problem to live product.
          </p>
          <a href="#work" className={styles.scroll}>
            <svg aria-hidden="true" width="12" height="16" viewBox="0 0 12 16" fill="none">
              <path d="M6 1v14M1 10l5 5 5-5" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            <span>Scroll to work</span>
          </a>
        </section>

        <section id="work" className={styles.work} aria-labelledby="d-work">
          <h2 id="d-work" className="visually-hidden">
            Selected work
          </h2>
          {exploreCases.map((c) => (
            <article key={c.num} className={styles.case}>
              <div className={styles.media}>
                <span>{c.caption}</span>
              </div>
              <div className={styles.caseHead}>
                <h3 className={styles.caseTitle}>
                  <a href={c.href}>{c.outcome}</a>
                </h3>
                <span className={styles.caseYear}>{c.year}</span>
              </div>
              <p className={styles.caseMeta}>
                {c.name} · {c.type}
              </p>
              <p className={styles.caseText}>{c.notes.problem}</p>
            </article>
          ))}
        </section>

        <Skills />

        <Timeline />

        <section id="contact" className={styles.closing} aria-labelledby="d-closing">
          <span className={styles.closingLine} aria-hidden="true" />
          <span className={styles.closingMarker} aria-hidden="true" />
          <h2 id="d-closing" className={styles.closingTitle}>
            [Next chapter: building it together]
          </h2>
          <p className={styles.closingText}>[One or two lines that invite the reader to get in touch]</p>
          <a href={links.email} className={styles.mail}>
            <span className={styles.mailLabel}>Email me</span>
            <span className={styles.mailArrow} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M4.5 3H11v6.5" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </span>
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerName}>
          <span className={styles.home}>Djamiel Saou</span>
          <small>© 2026 Djamiel Saou</small>
        </div>
        <nav aria-label="Elsewhere" className={styles.nav}>
          <a href={links.linkedin}>LinkedIn</a>
          <a href={links.github}>GitHub</a>
          <a href={links.resume}>
            Resume <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
