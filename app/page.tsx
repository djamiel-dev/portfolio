import Image from "next/image";
import { cases } from "@/content/cases";
import { links } from "@/content/site";
import { CaseCursor } from "@/components/home/CaseCursor";
import { GlyphSwell } from "@/components/home/glyph-swell";
import styles from "@/components/home/home.module.css";
import { HeroGreeting } from "@/components/home/NameHandoff";
import { Scramble, Skills } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import { Story } from "@/components/home/Story";
import { heroGlyphs } from "@/components/home/content";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

export default function Home() {
  return (
    <div className={styles.root} data-e-root>
      <Sky />
      <SiteNav page="home" />

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
              <div className={styles.media} data-fit={c.media.fit}>
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

      <SiteFooter />
    </div>
  );
}
