import { exploreCases } from "@/content/explore";
import { links } from "@/content/site";
import { GlyphSwell } from "@/components/home/glyph-swell";
import styles from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { HeroGreeting, NavName } from "@/components/home/NameHandoff";
import { Skills } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import { Story } from "@/components/home/Story";
import { caseGrounds, heroGlyphs } from "@/components/home/content";

export default function Home() {
  return (
    <div className={styles.root} data-e-root>
      <Sky />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={styles.top} data-bar>
        <NavName className={styles.home} caretClassName={styles.caret} />
        <nav aria-label="Main" className={styles.nav}>
          <a href="#work">
            <span>Work</span>
          </a>
          <a href="#ai">
            <span>How I use AI</span>
          </a>
          <a href={links.about}>
            <span>About</span>
          </a>
          <a href={links.resume}>
            <span>Resume</span> <Arrow />
          </a>
        </nav>
        <Menu className={styles.menu} summaryClassName={styles.menuButton} panelClassName={styles.menuPanel}>
          <a href="#work">Work</a>
          <a href="#ai">How I use AI</a>
          <a href={links.about}>About</a>
          <a href={links.resume}>
            Resume <Arrow />
          </a>
        </Menu>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="e-title" data-zone="day" data-hero>
          <div className={styles.heroLight} aria-hidden="true">
            <GlyphSwell colors={heroGlyphs} cell={16} className={styles.glyphs} />
          </div>

          <div className={styles.heroBody}>
            <HeroGreeting className={styles.greeting} photoClassName={styles.photo} caretClassName={styles.caret} />
            <h1 id="e-title" className={styles.statement}>
              AI-native <mark className={styles.role}>product designer</mark> who researches, designs and builds, from real
              problem to live product.
            </h1>
          </div>

          <div className={styles.heroFoot}>
            <p className={styles.place}>Tilburg, NL</p>
            <a href="#work" className={styles.scroll}>
              <span>Scroll to work</span>
              <svg aria-hidden="true" width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M6 1v14M1.5 10.5L6 15l4.5-4.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </section>

        <section id="work" className={styles.work} aria-labelledby="e-work" data-zone="day">
          <div className={styles.workHead}>
            <h2 id="e-work" className={styles.workTitle}>
              Selected work
            </h2>
            <p className={styles.workIntro}>Four projects, from a live coaching site to the making of this portfolio.</p>
          </div>

          {exploreCases.map((c) => (
            <article key={c.num} className={styles.case} id={c.num === "04" ? "ai" : undefined}>
              <div className={styles.media} style={{ background: caseGrounds[c.num] }} />
              <h3 className={styles.caseTitle}>
                <a href={c.href}>{c.outcome}</a>
              </h3>
            </article>
          ))}
        </section>

        <Skills />

        <div className={styles.night} data-zone="night">
          <Story email={links.email} />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerName}>
          <span className={styles.footerMark}>Djamiel Saou</span>
          <small>© 2026 Djamiel Saou · Tilburg, NL</small>
        </div>
        <nav aria-label="Elsewhere" className={styles.footerNav}>
          <a href={links.linkedin}>
            <span>LinkedIn</span>
          </a>
          <a href={links.github}>
            <span>GitHub</span>
          </a>
          <a href={links.resume}>
            <span>Resume</span> <Arrow />
          </a>
        </nav>
      </footer>
    </div>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" className={styles.arrow} width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 8L8 2M3 2h5v5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
