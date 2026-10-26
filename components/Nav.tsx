import { links } from "@/content/site";
import { Cross } from "./Cross";
import { LogoMark } from "./Logo";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <header className={styles.header}>
      <nav aria-label="Main" className={styles.nav}>
        <a href="#work" aria-current="page" className={`${styles.link} ${styles.current}`}>
          <span aria-hidden="true" className={styles.dot} />
          Work
        </a>
        {/* Hidden on small screens: the hero button already leads to contact */}
        <a href="#contact" className={`${styles.link} ${styles.contact}`}>
          Contact
        </a>
        <a href="#top" aria-label="Djamiel, home" className={styles.logo}>
          <LogoMark />
          DJAMIEL
        </a>
        <a href={links.about} className={styles.link}>
          About
        </a>
        <a href={links.resume} className={styles.link}>
          Resume <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <Cross corner="bottom-left" />
      <Cross corner="bottom-right" />
    </header>
  );
}
