import type { Metadata } from "next";
import { heroGlyphs, toolIcons } from "@/components/home/content";
import styles from "@/components/home/home.module.css";
import { Swatch, TokenText, TypeRow } from "./Live";
import about from "@/app/about/about.module.css";
import { links } from "@/content/site";
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
  ["--ground", "The one grey behind every image and panel"],
  ["--ground-light", "A lit card or light panel"],
];

const motion = [
  ["--ease-out", "Default easing, also for hover lines"],
  ["--ease-in-out", "Second easing curve"],
  ["--dur-press", "Pressing a button"],
  ["--press", "Scale while pressed"],
  ["--dur-line", "A line drawing in under a link"],
  ["--dur-media", "An image leaning in on hover"],
  ["--zoom", "How far it leans in"],
];

const shape = [
  ["--r-screen", "A screen of a product: a screenshot, an export, a recording"],
  ["--r-browser", "The browser frame"],
  ["--shadow-device", "Physical things only: phone, browser, sign and cards"],
  ["--halo", "The ring around a lit dot"],
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
            <h3 className={ds.panelTitle}>Hero glyphs</h3>
            <ul className={ds.plainChips}>
              {heroGlyphs.map((color, i) => (
                <li key={color}>
                  <div className={ds.chip} style={{ background: color }} />
                  <p className={ds.token}>{["Ground", "Marks", "Crest"][i]}</p>
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
            <TypeRow name="Title (--t-title, 540)">
              <p className={ds.title}>Test early, with real people</p>
            </TypeRow>
            <TypeRow name="Subtitle (--t-subtitle, 540)">
              <p className={ds.subtitle}>One name per task</p>
            </TypeRow>
            <TypeRow name="Small (--t-small)">
              <p className={ds.small}>The test prototype in Figma: both routes wired up.</p>
            </TypeRow>
            <TypeRow name="Label">
              <p className={about.label}>Case 01 · Incentive portal</p>
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
            <a href={links.email} className={`${styles.mail} ${ds.mailSample}`} data-lit="">
              <span>Contact me</span>
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </section>

        <section className={ds.section} aria-labelledby="ds-shape">
          <h2 id="ds-shape" className={ds.heading}>
            Shape and depth
          </h2>
          <p className={styles.workIntro}>
            Square for everything that is the site itself: grey grounds, cards, photos, data marks. A small rounding only
            for a screen of a product, devices keep their own corners, a pill only for controls, a circle for dots.
            Shadows only for physical things.
          </p>
          <div className={ds.shapes} aria-hidden="true">
            <div className={ds.groundSample}>
              <span className={ds.screenSample} />
            </div>
            <div className={ds.browserSample}>
              <span />
            </div>
            <span className={ds.haloSample} />
          </div>
          <ul className={ds.motion}>
            {shape.map(([token, use]) => (
              <li key={token}>
                <p className={ds.token}>{token}</p>
                <TokenText token={token} />
                <p className={ds.use}>{use}</p>
              </li>
            ))}
          </ul>
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
