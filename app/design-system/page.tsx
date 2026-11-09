import type { Metadata } from "next";
import { caseGrounds, heroGlyphs, toolIcons } from "@/components/home/content";
import styles from "@/components/home/home.module.css";
import { Swatch, TokenText, TypeRow } from "./Live";
import ds from "./design-system.module.css";

export const metadata: Metadata = { title: "Design system – Djamiel" };

const skyTokens = [
  ["--bg", "Background, also the nav"],
  ["--fg", "Main text"],
  ["--fg-2", "Running text"],
  ["--muted", "Labels and meta"],
  ["--dim", "Dimmed text"],
  ["--line", "Lines"],
  ["--glow", "Lit text and icons"],
  ["--focus", "Focus ring"],
];

const fixedTokens = [
  ["--accent", "“product designer” and the daytime accent"],
  ["--lamp", "Filament, bulbs, mail button"],
  ["--lamp-core", "Core of the light"],
];

const motion = [
  ["--ease-out", "Default easing, also for hover lines"],
  ["--ease-in-out", "Second easing curve"],
];

export default function DesignSystem() {
  return (
    <div className={styles.root}>
      <main className={ds.page}>
        <header className={ds.head}>
          <h1 className={styles.workTitle}>Design system</h1>
          <p className={styles.workIntro}>
            One day of light. Everything here uses the real tokens and classes of the homepage, so it follows every change.
          </p>
        </header>

        <section className={ds.section} aria-labelledby="ds-colour">
          <h2 id="ds-colour" className={ds.heading}>
            Colour
          </h2>

          <div className={ds.panel} data-panel>
            <h3 className={ds.panelTitle}>Day: hero, work, skills</h3>
            <ul className={ds.swatches}>
              {skyTokens.map(([token, use]) => (
                <Swatch key={token} token={token} use={use} />
              ))}
            </ul>
          </div>

          <div className={`${ds.panel} ${styles.night}`} data-panel>
            <h3 className={ds.panelTitle}>Night: timeline, closing, footer</h3>
            <ul className={ds.swatches}>
              {skyTokens.map(([token, use]) => (
                <Swatch key={token} token={token} use={use} />
              ))}
            </ul>
          </div>

          <div className={ds.panel} data-panel>
            <h3 className={ds.panelTitle}>Fixed, on the day ground</h3>
            <ul className={ds.swatches}>
              {fixedTokens.map(([token, use]) => (
                <Swatch key={token} token={token} use={use} />
              ))}
            </ul>
          </div>

          <div className={ds.panel}>
            <h3 className={ds.panelTitle}>Hero glyphs and case panes</h3>
            <ul className={ds.plainChips}>
              {heroGlyphs.map((color, i) => (
                <li key={color}>
                  <div className={ds.chip} style={{ background: color }} />
                  <p className={ds.token}>{["Ground", "Marks", "Crest"][i]}</p>
                  <p className={ds.value}>{color}</p>
                </li>
              ))}
              {Object.entries(caseGrounds).map(([num, color]) => (
                <li key={num}>
                  <div className={ds.chip} style={{ background: color }} />
                  <p className={ds.token}>Case {num}</p>
                  <p className={ds.value}>{color}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={ds.section} aria-labelledby="ds-type">
          <h2 id="ds-type" className={ds.heading}>
            Type
          </h2>
          <ul className={ds.typeList}>
            <TypeRow name="Hero statement">
              <p className={styles.statement}>
                AI-native <mark className={styles.role}>product designer</mark> who builds.
              </p>
            </TypeRow>
            <TypeRow name="Section heading">
              <p className={styles.workTitle}>Selected projects</p>
            </TypeRow>
            <TypeRow name="Skills heading">
              <p className={styles.skillsTitle}>From the first interview to the last line of code.</p>
            </TypeRow>
            <TypeRow name="Skill title">
              <p className={styles.skillName}>Frontend development</p>
            </TypeRow>
            <TypeRow name="Case title">
              <p className={styles.caseTitle}>How I designed and built this site with AI</p>
            </TypeRow>
            <TypeRow name="Body">
              <p>Running text is set in Mona Sans at a calm size and weight.</p>
            </TypeRow>
            <TypeRow name="Label">
              <p className={styles.place}>Tilburg, NL</p>
            </TypeRow>
          </ul>
          <div className={`${ds.panel} ${styles.night}`}>
            <ul className={ds.typeList}>
              <TypeRow name="Closing">
                <p className={styles.closingTitle}>Building it together</p>
              </TypeRow>
              <TypeRow name="Moment title">
                <p className={styles.momentTitle}>Secondary school</p>
              </TypeRow>
            </ul>
          </div>
        </section>

        <section className={ds.section} aria-labelledby="ds-parts">
          <h2 id="ds-parts" className={ds.heading}>
            Parts
          </h2>
          <div className={ds.parts}>
            <span className={styles.menuButton}>Menu</span>
            <span className={styles.tool} data-icon="">
              <img src={toolIcons.Figma} alt="Figma" width={92} height={92} />
            </span>
            <span className={styles.tool}>5-second test</span>
          </div>
          <div className={`${ds.panel} ${styles.night}`}>
            <span className={`${styles.mail} ${ds.mailLit}`}>Contact me</span>
          </div>
        </section>

        <section className={ds.section} aria-labelledby="ds-motion">
          <h2 id="ds-motion" className={ds.heading}>
            Motion
          </h2>
          <ul className={ds.motion}>
            {motion.map(([token, use]) => (
              <li key={token}>
                <p className={ds.token}>{token}</p>
                <TokenText token={token} />
                <p className={ds.use}>{use}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
