import Image from "next/image";
import { cases } from "@/content/cases";
import { links } from "@/content/site";
import { CaseCursor } from "@/components/home/CaseCursor";
import { GlyphSwell } from "@/components/home/glyph-swell";
import styles from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { HeroGreeting, NavName } from "@/components/home/NameHandoff";
import { Scramble, Skills } from "@/components/home/Skills";
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
        <NavName className={styles.home} />
        <nav aria-label="Main" className={styles.nav}>
          <a href="#work">
            <span>Projects</span>
          </a>
          <a href={links.ai}>
            <span>How I use AI</span>
          </a>
          <a href={links.about}>
            <span>About</span>
          </a>
          <a href={links.resume}>
            <span>Resume</span>
          </a>
          <a href={links.email}>
            <span>Contact me</span>
          </a>
        </nav>
        <Menu className={styles.menu} summaryClassName={styles.menuButton} panelClassName={styles.menuPanel}>
          <a href="#work">Projects</a>
          <a href={links.ai}>How I use AI</a>
          <a href={links.about}>About</a>
          <a href={links.resume}>Resume</a>
          <a href={links.email}>Contact me</a>
        </Menu>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="e-title" data-zone="day" data-hero>
          <div className={styles.heroLight} aria-hidden="true">
            <GlyphSwell colors={heroGlyphs} cell={16} className={styles.glyphs} />
          </div>

          <div className={styles.heroBody}>
            <HeroGreeting className={styles.greeting} photoClassName={styles.photo} />
            <h1 id="e-title" className={styles.statement}>
              AI-native <mark className={styles.role}>product designer</mark> who researches, designs and builds, from real
              problems to live products.
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
              <Scramble text="Selected projects" />
            </h2>
            <p className={styles.workIntro}>Each case walks through the problem, the research and the decisions behind what I built.</p>
          </div>

          {cases.map((c) => (
            <article key={c.num} className={styles.case} data-case>
              <div className={styles.media} style={{ background: caseGrounds[c.num] }} data-fit={c.media.fit}>
                {c.media.image && (
                  <Image src={c.media.image} alt="" fill sizes="(max-width: 48em) 100vw, 50vw" />
                )}
              </div>
              <h3 className={styles.caseTitle}>
                <a href={c.href}>{c.outcome}</a>
              </h3>
            </article>
          ))}
          <CaseCursor className={styles.caseCursor} />
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
        <nav aria-label="Contact" className={styles.footerNav}>
          <a href={links.email}>
            <span>djamielsaou@gmail.com</span>
          </a>
          <a href={links.phone}>
            <span>06 83890250</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
