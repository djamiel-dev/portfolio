import { exploreCases, statusLabel } from "@/content/explore";
import { links } from "@/content/site";
import { GlyphSwell } from "@/components/home/glyph-swell";
import styles from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { HeroGreeting, NavName } from "@/components/home/NameHandoff";
import { Skills } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import { Story } from "@/components/home/Story";
import { WindowLight, type Window } from "@/components/home/WindowLight";

// The work is seen through one day: each pane catches the light a little later
// (morning, noon, afternoon, early evening). Pure form until the real images exist.
const studies: Record<string, { ground: string; light: string; window: Window }> = {
  "01": { ground: "#dde2e3", light: "#f6f8f7", window: { x: 214, y: -24, w: 150, h: 252, shear: 92, cols: 2, rows: 2, bar: 12 } },
  "02": { ground: "#e1e2dc", light: "#f8f7f1", window: { x: 128, y: -18, w: 168, h: 214, shear: 18, cols: 2, rows: 3, bar: 10 } },
  "03": { ground: "#e4ded4", light: "#f8f0e3", window: { x: 34, y: -16, w: 156, h: 262, shear: -118, cols: 2, rows: 2, bar: 12 } },
  "04": { ground: "#e2d4c2", light: "#f9e7cc", window: { x: -30, y: 70, w: 290, h: 168, shear: -230, cols: 3, rows: 2, bar: 14 } },
};

// Page ground, quiet grey marks, dark amber where a swell crests
const heroGlyphs: [string, string, string] = ["#eeefeb", "#a3a6a3", "#8a5300"];

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

          {exploreCases.map((c) => {
            const study = studies[c.num];
            return (
              <article key={c.num} className={styles.case} id={c.num === "04" ? "ai" : undefined}>
                <div className={styles.media} style={{ background: study.ground }}>
                  <WindowLight
                    id={`e-study-${c.num}`}
                    className={styles.mediaLight}
                    width={400}
                    height={300}
                    window={study.window}
                    blur={7}
                    light={study.light}
                    lightOpacity={0.9}
                  />
                  <span className={styles.status} data-status={c.status}>
                    <span className={styles.lamp} aria-hidden="true" />
                    {statusLabel[c.status]}
                  </span>
                  <span className={styles.caption}>{c.caption}</span>
                </div>
                <div className={styles.caseHead}>
                  <h3 className={styles.caseTitle}>
                    <a href={c.href}>{c.outcome}</a>
                  </h3>
                  <span className={styles.caseYear}>{c.year}</span>
                </div>
                <p className={styles.caseMeta}>
                  <span className={styles.caseNum}>{c.num}</span> {c.name} · {c.type}
                </p>
                <p className={styles.caseText}>{c.notes.problem}</p>
              </article>
            );
          })}
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
