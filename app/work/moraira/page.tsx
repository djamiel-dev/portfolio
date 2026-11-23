import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { CaseCursor } from "@/components/home/CaseCursor";
import { Scramble } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import about from "@/app/about/about.module.css";
import styles from "@/components/case/case.module.css";
import { Browser } from "@/components/case/Browser";
import { Lamp } from "@/components/case/Lamp";
import { NextCase } from "@/components/case/NextCase";
import { ScrollStage } from "@/components/case/ScrollStage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { HeroVideo } from "./HeroVideo";
import mo from "./mo.module.css";
import { DirectBar, ResultBar, YearStrip } from "./visuals";

// Case 04. Content first: the layout borrows the classes of cases 01 and 03 and gets its own design in a later step.
// Paid freelance work, no year. Everything may be shown, the phone number on the sign included.
// The story leads with the two goals the owner set, because both were met: the strategy (win the guests outside the
// school holidays) and the design decisions each answer one goal. Built by another developer in WordPress: say so
// plainly, without judging that build. The logo already existed: don't mention it. Testers unknown: no numbers.

export const metadata: Metadata = {
  title: "Moraira Dream Villas – Djamiel Saou",
};

// The 30-second version, for the recruiter who reads nothing else
const short = [
  {
    title: "Problem",
    text: "The villas filled up in the school holidays, mostly through Booking.com, and stood empty much of the rest of the year.",
  },
  {
    title: "What I did",
    text: "An audit of their website, then a new brand, a full website design and print for the villas, aimed at the guests who travel outside the holidays.",
  },
  {
    title: "Result",
    text: "Direct bookings went from about 20% to 70%, and the villas are much fuller outside the school holidays.",
  },
];

const facts = [
  { label: "Role", value: "Brand and web designer" },
  { label: "Team", value: "Just me, working with the owner. Another developer built it in WordPress." },
  { label: "Context", value: "Freelance, for a holiday rental company with a handful of villas on the Costa Blanca" },
  { label: "Tools", value: "Figma, with AI for exploring layouts, transcripts and copy" },
];

// The two goals, in the owner's order of priority
const goals = [
  {
    title: "More guests outside the school holidays",
    text: "Outside the school holidays, the villas stood empty much of the time.",
  },
  {
    title: "More bookings through their own website",
    text: "About 20% came in directly. The rest went through Booking.com, which takes a commission on every stay.",
  },
];

// What the audit turned up
const findings = [
  {
    title: "No clear next step",
    text: "The homepage had no obvious button to see the villas or get in touch.",
  },
  {
    title: "Everything said at once",
    text: "Long blocks of text with little space, hard to read and harder still on a phone.",
  },
  {
    title: "Small inconsistencies everywhere",
    text: "Spacing, fonts and colours changed from page to page. For a small company asking for trust, that adds up.",
  },
];

// How the project grew: what the owner asked for, then what it turned into (all from the text above it)
const scope = [
  { title: "Audit", text: "An honest review of their website" },
  { title: "Brand", text: "There was none yet beyond the website" },
  { title: "Website design", text: "A full design, homepage first" },
  { title: "Print", text: "A sign for each villa and business cards" },
];

// Decision 1: the guests to win, from the talks with the owner
const guests = [
  {
    title: "Couples over 30",
    text: "Without children, so not tied to the school holidays. They want a quiet base with a lot to do nearby.",
  },
  {
    title: "Long stays",
    text: "Retirees who rent for months in winter, for the sun, the sea and the mountains.",
  },
  {
    title: "Remote workers",
    text: "Fibre internet, so work can come along. The owner added this as a selling point during the brand work.",
  },
];

// The brand palette, as in the brand guide
const palette = [
  { name: "Terracotta", hex: "#9B4710" },
  { name: "Gold", hex: "#E69B26" },
  { name: "Sand", hex: "#FFF5E2" },
  { name: "Deep green", hex: "#2D6060" },
  { name: "Sage", hex: "#B0C7C9" },
];

// Decision 2: three reasons to book direct, each a crop of the homepage
const direct = [
  {
    label: "Trust up front",
    text: "Reviews and “Personal. Trusted. Local.” on the homepage, so a first visit to a small company feels safe.",
    src: "/images/cases/moraira/home-trust.webp",
    alt: "Personal. Trusted. Local.: two guest reviews, a line about fifteen years of helping guests discover Moraira, and three ticks for customer satisfaction, local team and secure bookings.",
    width: 1920,
    height: 1257,
  },
  {
    label: "Something a platform doesn’t offer",
    text: "Neighbouring villas for one group, at a discount, arranged directly. Shown on a map, so you see how close they are.",
    src: "/images/cases/moraira/home-combination.webp",
    alt: "Combination deals: for large groups, villas next to each other with a discount, and a Contact us for more button, beside an aerial photo with pins on the four villas.",
    width: 1920,
    height: 821,
  },
  {
    label: "One clear next step",
    text: "Orange marks the main action, like View Villas or Info & Reservations. Everything else is a white button or a plain link, so the eye knows where to go first.",
    src: "/images/cases/moraira/home-featured.webp",
    alt: "Featured villas on a deep green ground: two villas with a photo, three short selling points, icons for guests, bedrooms and bathrooms, and an orange Info & Reservations button each.",
    width: 1920,
    height: 2321,
  },
];

// How I worked: the way through the project, my part and then the build (all from the text of the section)
const flow = [
  { title: "Homepage first", text: "Where most choices for the whole site are made", mine: true },
  { title: "Presented", text: "The owner stayed closely involved", mine: true },
  { title: "The other pages", text: "Once approved, on the same rules", mine: true },
  { title: "Handed over", text: "The full design in Figma", mine: true },
  { title: "Built in WordPress", text: "By another developer", mine: false },
];

// Two layouts of the villa list, the same villa in each (Figma, page "moraira"). The version in between looked the
// same as the first at card level, so only the first and the one that came out on top are shown
const layouts = [
  {
    src: "/images/cases/moraira/villa-layout-1.webp",
    alt: "Layout 1: the photo on the left; on the right the name, four selling points, a row of icons for guests, bedrooms and bathrooms under them, and the button.",
    height: 590,
    won: false,
  },
  {
    src: "/images/cases/moraira/villa-layout-3.webp",
    alt: "Layout 3: the icons in a narrow strip right beside the photo, the name, selling points and button to the right.",
    height: 455,
    won: true,
  },
];

// How AI was used, in order of the project
const aiUses = ["Layouts to explore", "Transcripts of the talks", "Sharper copy", "Checks on the work"];

export default function Moraira() {
  return (
    <div className={home.root} data-e-root>
      <Sky />
      <SiteNav page="projects" />

      <main id="main">
        <div className={about.page} data-zone="day">
          <section className={`${about.intro} ${styles.intro}`} aria-labelledby="case-title">
            <div>
              <p className={about.label}>Case 04 · Moraira Dream Villas</p>
              <h1 id="case-title" className={about.title}>
                More guests outside the holidays, and 70% now book direct.
              </h1>
            </div>
            <ol className={about.short} aria-label="The short version">
              {short.map((s) => (
                <li key={s.title}>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* The hero of the homepage design, with the video I made for it playing behind the Figma layer */}
          <HeroVideo />
          <CaseCursor className={home.caseCursor} />

          <dl className={`${about.facts} ${styles.facts}`}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <section className={about.section} aria-labelledby="case-problem">
            <p className={about.label}>The problem</p>
            <h2 id="case-problem" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Full in the school holidays, quiet the rest of the year" />
            </h2>
            <p className={about.lead}>
              Moraira Dream Villas rents out a handful of villas in Moraira, a seaside village on the Costa Blanca. In the
              school holidays they fill up anyway, with families who mostly book through Booking.com. Outside them, the
              villas stood empty much of the time.
            </p>
            <p className={about.body}>The owner had two goals:</p>
            {/* Each goal with its own picture of the gap: the year with only the holidays lit, and the bookings
                with only a fifth direct. The same bar fills on Result. */}
            <ol className={mo.goals} aria-label="The owner’s two goals">
              {goals.map((g, i) => (
                <li key={g.title}>
                  <div className={mo.plate}>{i === 0 ? <YearStrip /> : <DirectBar value={20} />}</div>
                  <p className={`${about.label} ${mo.goalLabel}`}>Goal {i + 1}</p>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-audit">
            <p className={about.label}>Where it started</p>
            <h2 id="case-audit" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="An audit that turned into a redesign" />
            </h2>
            <p className={about.lead}>
              The owner first asked for something smaller: an honest review of their website. I checked it against
              usability principles, compared it with sites competing for the same guests, and presented what I found.
            </p>
            {/* The findings as numbered lines of one short report, not as three more cards */}
            <ol className={mo.report} aria-label="What the audit found">
              {findings.map((f, i) => (
                <li key={f.title}>
                  <span className={about.label} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ol>
            <p className={`${about.body} ${styles.outcome}`}>
              <strong>The owner asked me to fix it, not just name it.</strong> There was no brand yet beyond the website
              itself, so that came first: a brand, then a full website design, then print for the villas.
            </p>

            {/* The scope growing: what was asked for, and the three parts it turned into, sliding out of the audit
                one by one as the section scrolls through */}
            <div className={mo.scopeWrap}>
              <div className={mo.brackets} aria-hidden="true">
                <p className={`${about.label} ${mo.bracket} ${mo.asked}`}>Asked for</p>
                <p className={`${about.label} ${mo.bracket} ${mo.grew}`}>What it turned into</p>
              </div>
              <ol className={mo.scope} aria-label="How the project grew">
                {scope.map((s, i) => (
                  <li key={s.title} style={i > 0 ? ({ "--i": i - 1 } as CSSProperties) : undefined}>
                    <p className={`${about.label} ${mo.tag}`}>{i === 0 ? "Asked for" : "Then"}</p>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-village">
            <p className={about.label}>Decision 1</p>
            <h2 id="case-village" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Sell the village, not just the beach" />
            </h2>
            <p className={about.lead}>
              Sun, sea and beach bring in families in the summer holidays, and they come anyway. The guests to win travel
              outside the holidays, and they come for more than the beach: the food, the walking and cycling routes, the
              markets and the quiet.
            </p>
            {/* The guests to win switch on one by one: a lit line draws in over each */}
            <ul className={`${styles.findings} ${mo.guests}`} aria-label="The guests to win">
              {guests.map((g, i) => (
                <li key={g.title} style={{ "--i": i } as CSSProperties}>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </li>
              ))}
            </ul>

            <div className={styles.roomy}>
              <h3 className={styles.subheading}>A palette without sea blue</h3>
              {/* The palette from the brand guide as tall swatches, and a sixth place for the colour left out */}
              <ul className={mo.palette} aria-label="The brand palette, without sea blue">
                {palette.map((c, i) => (
                  <li key={c.hex} style={{ "--i": i } as CSSProperties}>
                    <span className={mo.swatch} style={{ background: c.hex }} aria-hidden="true" />
                    <p>{c.name}</p>
                    <p className={styles.small}>{c.hex}</p>
                  </li>
                ))}
                <li className={mo.left} style={{ "--i": palette.length } as CSSProperties}>
                  <span className={mo.swatch} aria-hidden="true">
                    <svg className={mo.strike} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="100" x2="100" y2="0" pathLength={1} />
                    </svg>
                  </span>
                  <p>Sea blue</p>
                  <p className={styles.small}>Left out</p>
                </li>
              </ul>
              <div className={mo.paletteText}>
                <p className={about.body}>
                  So I built the brand on what makes Moraira special outside the summer: the village, its food and its
                  character. That’s why the palette has no bright sea blue. It would fit the Mediterranean, but it pulls
                  straight back to the beach picture. Terracotta, sand and a deep green say warmth and calm instead,
                  with Quattrocento for a classic, elegant voice.
                </p>
                <p className={about.body}>
                  For the top of the homepage I made a video that shows the whole village, not one beach photo: the
                  beach, but also the market, the coast road and the terraces.
                </p>
                <p className={about.body}>
                  The owner found the first version a little too quiet and empty, so the gold got brighter and soft line
                  drawings gave the pages more life.
                </p>
              </div>
            </div>

            {/* Insider tips: the content side of the same decision. On desktop the whole page scrolls in a window
                beside the text; the homepage section with the same tips sits small under it */}
            <div className={styles.roomy}>
              <ScrollStage
                side="right"
                length={220}
                caption="The Insider tips page."
                visual={
                  <Browser>
                  <div className={styles.scrollyView} data-scroll-view>
                    <div className={styles.scrollyPage} data-scroll-page>
                      <Image
                        src="/images/cases/moraira/insider-tips.webp"
                        alt="Insider tips Moraira: your local guide to hidden spots, with tips on tapas bars, the most beautiful beaches and the Alicante wine route."
                        width={1920}
                        height={3444}
                        sizes="(max-width: 768px) 90vw, 720px"
                      />
                    </div>
                  </div>
                  </Browser>
                }
              >
                <h3 className={styles.subheading}>Insider tips</h3>
                <p className={about.body}>Tapas bars, beaches, the wine route: reasons to stay longer than a beach week.</p>
              </ScrollStage>
              <figure className={mo.outingsFigure}>
                <div className={mo.outings}>
                  <Image
                    src="/images/cases/moraira/home-outings.webp"
                    alt="Our favourite outings and restaurants: three cards on tapas, what to do in Moraira and the most beautiful beaches, each with a Read more button."
                    width={1920}
                    height={1461}
                    sizes="(max-width: 768px) 90vw, 560px"
                  />
                </div>
                <figcaption className={styles.small}>
                  On the homepage: the same tips, one scroll away from the villas.
                </figcaption>
              </figure>
            </div>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-direct">
            <p className={about.label}>Decision 2</p>
            <h2 id="case-direct" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Give guests a reason to book direct" />
            </h2>
            <p className={about.lead}>
              Booking.com wins on habit and convenience, and a small company can’t beat that. It can offer what a
              platform can’t: a personal welcome, local knowledge and deals that only the owner can make.
            </p>
            {/* The homepage scrolls in a window; the reason whose part of the page is in view lights up beside it.
                Still (phone, reduced motion, no JS): the three parts as one image, all reasons lit */}
            <div className={mo.directStage}>
              <ScrollStage
                side="right"
                length={260}
                caption="The homepage, from the reviews down to the featured villas."
                visual={
                  <Browser>
                  <div className={styles.scrollyView} data-scroll-view>
                    <div className={styles.scrollyPage} data-scroll-page>
                      {direct.map((d) => (
                        <div key={d.label} className={mo.part} data-scroll-mark>
                          <Image
                            src={d.src}
                            alt={d.alt}
                            width={d.width}
                            height={d.height}
                            sizes="(max-width: 768px) 90vw, 720px"
                          />
                          </div>
                      ))}
                    </div>
                  </div>
                  </Browser>
                }
              >
                <ol className={mo.reasons} aria-label="Three reasons to book direct">
                  {direct.map((d, i) => (
                    <li key={d.label} data-scroll-step>
                      <span className={about.label}>{String(i + 1).padStart(2, "0")}</span>
                      <h3>{d.label}</h3>
                      <p>{d.text}</p>
                    </li>
                  ))}
                </ol>
              </ScrollStage>
            </div>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-print">
            <p className={about.label}>Beyond the screen</p>
            <h2 id="case-print" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="The same brand at the gate as online" />
            </h2>
            <p className={about.lead}>
              I suggested a sign at each villa, so anyone walking past can scan its QR code and book on their own
              website, not on a platform. The owner liked the idea and let me design the signs, and business cards in
              the same look.
            </p>
            {/* The print as objects on a table: the sign, and the business card front and back. A line runs from the
                QR code on each to where both lead. On a phone: the objects stacked, the line's words as a caption */}
            <figure className={mo.desk}>
              <div className={mo.table}>
                <Image
                  className={mo.sign}
                  src="/images/cases/moraira/sign.webp"
                  alt="The villa sign: Holiday rental, Your mediterranean holiday home, the logo on a deep green band with a QR code, a phone number and the website."
                  width={3968}
                  height={2834}
                  sizes="(max-width: 768px) 100vw, 720px"
                />
                <Image
                  className={mo.cardFront}
                  src="/images/cases/moraira/card-front.webp"
                  alt="The front of the business card: the logo and Your mediterranean holiday home on white, with a large pale sun mark."
                  width={1927}
                  height={1247}
                  sizes="(max-width: 768px) 50vw, 400px"
                />
                <Image
                  className={mo.cardBack}
                  src="/images/cases/moraira/card-back.webp"
                  alt="The back of the business card in deep green: the logo, the website, email address and phone number, and a QR code."
                  width={1927}
                  height={1247}
                  sizes="(max-width: 768px) 50vw, 440px"
                />
                {/* From each QR code to the label: one straight line from the sign, one around the cards */}
                <svg className={mo.qrLines} viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 97 11.5 H 117" pathLength={1} />
                  <path d="M 134 93.5 H 156 V 11.5 H 151" pathLength={1} />
                </svg>
                <p className={mo.qrLabel}>
                  <span className={about.label}>Both QR codes lead to</span>
                  Their own website, not a platform
                </p>
              </div>
              <figcaption className={mo.deskCaption}>
                <p>
                  <span className={about.label}>The sign</span>
                  On every villa, for anyone walking past.
                </p>
                <p>
                  <span className={about.label}>The business card</span>
                  For the owner to hand out, with the same way in.
                </p>
              </figcaption>
            </figure>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-work">
            <p className={about.label}>How I worked</p>
            <h2 id="case-work" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="One homepage first, then the rest followed" />
            </h2>
            <p className={about.lead}>
              I designed the homepage first and presented it before anything else. The owner wanted to stay closely
              involved, and most choices for the whole site are made there: spacing, colour, how loud each button is.
              Once it was approved, the other pages followed the same rules.
            </p>

            {/* The way through the project as stops on one line: my part lit, the build by another developer unlit,
                as the handover on case 03 */}
            <div className={mo.flowWrap}>
              <div className={mo.flowBrackets} aria-hidden="true">
                <p className={`${about.label} ${mo.bracket}`}>My part</p>
                <p className={`${about.label} ${mo.bracket} ${mo.theirs}`}>Another developer</p>
              </div>
              <ol className={mo.flow} aria-label="How the project went, from the homepage to the build">
                {flow.map((f, i) => (
                  <li key={f.title} data-mine={f.mine || undefined} style={{ "--i": i } as CSSProperties}>
                    <span className={mo.stop} aria-hidden="true" />
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </li>
                ))}
              </ol>
              <p className={`${about.body} ${mo.flowNote}`}>
                My part ended with the design in Figma. Another developer built it in WordPress, and much of the design
                made it to the live site.
              </p>
            </div>

            <p className={`${about.body} ${mo.villaIntro}`}>
              Where I doubted between options, I let a few people compare them. The villa list went through a few
              layouts before one came out on top.
            </p>

            {/* Two layouts of the villa list, the same villa in each, from Figma. The one that came out on top is lit;
                scrolling in, the other steps back */}
            <figure className={mo.layouts}>
              <ol aria-label="Two layouts for the villa list">
                {layouts.map((l, i) => (
                  <li key={l.src} data-won={l.won || undefined} style={{ "--i": i } as CSSProperties}>
                    <div className={mo.layoutShot}>
                      <Image src={l.src} alt={l.alt} width={1640} height={l.height} sizes="(max-width: 768px) 100vw, 400px" />
                    </div>
                    <p className={about.label}>{l.won ? "Came out on top" : `Layout ${i + 1}`}</p>
                  </li>
                ))}
              </ol>
              <figcaption>
                <span className={about.label}>The villa list</span>
                Facts as icons beside the photo, a few short lines and one button, so four villas compare at a glance.
              </figcaption>
            </figure>

            {/* How AI was used: the story on the left, the four uses on the right, as on case 01 */}
            <div className={styles.aiBlock}>
              <div>
                <h3 className={styles.subheading}>AI to raise the bar, not to skip the work</h3>
                <p className={about.body}>
                  Before designing a few sections, I had AI generate quick prototypes to explore styles and layouts, then
                  designed my own in Figma. I transcribed the talks with the owner, so I worked from what they actually
                  said, not from my notes. And I used it to keep the copy short and sharp, and to keep checking the quality
                  of the work as I went.{" "}
                  <a href={links.ai} className={about.textLink}>
                    <span>How I use AI</span>
                  </a>
                </p>
              </div>
              {/* The four uses in the order of the project, switching on one after another */}
              <ol className={mo.aiRow} aria-label="Where AI helped">
                {aiUses.map((u, i) => (
                  <li key={u} style={{ "--i": i } as CSSProperties}>
                    <span className={about.label}>{String(i + 1).padStart(2, "0")}</span>
                    {u}
                  </li>
                ))}
              </ol>
            </div>

          </section>
        </div>

        {/* Result: the page turns to night and the lamp is on, as at the end of the homepage */}
        <div className={styles.night} data-zone="night">
          <section className={styles.result} aria-labelledby="case-result">
            <Lamp />
            <p className={about.label}>Result</p>
            <h2 id="case-result" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Both goals met" />
            </h2>
            <p className={about.lead}>
              Since the new brand and website, the two things the owner asked for have both happened.
            </p>
            {/* Both goals again, now met, in the light of the lamp. The bar from Problem fills from about 20% to 70% */}
            <ol className={mo.met} aria-label="Both goals, met">
              <li>
                <p className={`${about.label} ${mo.metLabel}`}>Goal 2 · Met</p>
                <h3 className="visually-hidden">70% direct</h3>
                <ResultBar from={20} to={70} />
                <p>of all bookings now come through their own website, up from about 20%.</p>
              </li>
              <li>
                <p className={`${about.label} ${mo.metLabel}`}>Goal 1 · Met</p>
                <h3>Much fuller</h3>
                <p>outside the school holidays, when the villas used to stand empty much of the time.</p>
              </li>
            </ol>
          </section>

          {/* The same preview as case 01 on the homepage; the link text already says where it goes */}
          <NextCase
            href="/work/incentive-portal"
            title="01 Incentive portal"
            image={{ src: "/images/cases/jobrewards.png", width: 2019, height: 2649 }}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
