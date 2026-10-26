import { links } from "@/content/site";
import { LogoMark } from "./Logo";
import styles from "./Footer.module.css";

const skills = ["Research", "UX design", "UI design", "Front-end", "AI workflows"];

export function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.headline}>
          <h2 className={styles.title}>
            Let&apos;s build something that <span className={styles.accent}>works.</span>
          </h2>
          <ul aria-label="What I do" className={styles.tags}>
            {skills.map((skill, i) => (
              <li key={skill} className={`${styles.tag} ${styles[`tag${i + 1}`]}`}>
                [{String(i + 1).padStart(2, "0")}] {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.intro}>
          <p>
            Good products are never built alone. Looking for a designer who also builds? Let&apos;s make the next
            one together.
          </p>
          <p>
            Reach me by <a href={links.email}>sending an email</a> or <a href={links.call}>booking a call</a>.
          </p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <LogoMark size={26} />
              DJAMIEL
            </span>
            <span className={styles.copy}>© 2026 Djamiel · Tilburg, NL</span>
          </div>
          <div className={styles.columns}>
            <nav aria-label="Connect" className={styles.column}>
              <span className={styles.columnTitle}>Connect</span>
              <a href={links.email}>Send an email</a>
              <a href={links.call}>Book a call</a>
              <a href={links.linkedin}>LinkedIn</a>
              <a href={links.github}>GitHub</a>
            </nav>
            <nav aria-label="About" className={styles.column}>
              <span className={styles.columnTitle}>About</span>
              <a href={links.about}>About</a>
              <a href={links.resume}>Resume</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
