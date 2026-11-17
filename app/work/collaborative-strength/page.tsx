import type { Metadata } from "next";
import Image from "next/image";
import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { Scramble } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import about from "../../about/about.module.css";
import ai from "../../ai/ai.module.css";
import styles from "../incentive-portal/case.module.css";
import { Phone } from "../incentive-portal/visuals";
import cs from "./cs.module.css";

// Case 02. Same build-up as case 01: the short version and the site on top, then one section per thing I did.
// My own coaching business: I was the client, the designer and the developer.
// No year or timeline, and no "what I'd do differently" (Djamiel's choices, 17 Nov).
// The two coaches may be named; testers and the people who gave feedback stay anonymous.
// Screens are in Dutch, as the site was built.

export const metadata: Metadata = {
  title: "Collaborative Strength – Djamiel Saou",
};

// The 30-second version, for the recruiter who reads nothing else
const short = [
  {
    title: "Problem",
    text: "I coach powerlifting next to a full-time job. From the outside, nobody could see what coaching with me involves.",
  },
  {
    title: "What I did",
    text: "Two talks with experienced coaches, a funnel, rounds of design feedback and a test with six powerlifters. Then I built it.",
  },
  { title: "Result", text: "New clients came quickly, and better matches: the site tells people whether my coaching fits them." },
];

const facts = [
  { label: "Role", value: "Owner, designer and developer. I was my own client" },
  { label: "Context", value: "My own powerlifting coaching, next to a full-time job in ICT" },
  { label: "Research", value: "Two expert talks, five feedback sessions and a final review, a test with six powerlifters" },
  { label: "Built with", value: "Figma, Next.js, Tailwind CSS, Framer Motion" },
];

// The two talks and what came out of them
const talks = [
  {
    who: "Stijn Schoonhof",
    role: "Founder of Deliberate Strength",
    text: "Give people value before you ask for anything. And don’t niche down too early.",
  },
  {
    who: "Lorenzo Haarlo",
    role: "Gym owner, coach and national champion",
    text: "Clients pay for more than a plan: guidance, reflection, and attention to life outside the gym.",
  },
];

const funnel = [
  { stage: "Awareness", where: "Instagram", text: "Technique tips and thoughts on coaching, free to use." },
  { stage: "Consideration", where: "The website", text: "How I work, a free training plan and a blog." },
  { stage: "Decision", where: "A free intake call", text: "Booked from the menu, on every page." },
];

// What the feedback rounds changed, from the first Figma design to the final one
const feedback = [
  {
    title: "Booking moved into the menu",
    text: "Two reviewers found the button in the hero confusing. Book a call now sits top right, on every page.",
  },
  {
    title: "Written from the visitor’s side",
    text: "The page opens by asking what powerlifting means to you, instead of telling who I am.",
  },
  {
    title: "A free intake",
    text: "A final review made the call free and put what to expect below the form, so booking is one easy step.",
  },
];

// Translated from the test notes; testers stay anonymous
const quotes = [
  "You see straight away that you should book a call.",
  "It looks like the website of someone who really knows what they’re doing.",
];

export default function CollaborativeStrength() {
  return (
    <div className={home.root} data-e-root>
      <Sky />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={home.top}>
        <a href="/" className={home.home} data-shown="">
          Djamiel Saou
        </a>
        <nav aria-label="Main" className={home.nav}>
          <a href="/#work">
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
        <Menu className={home.menu} summaryClassName={home.menuButton} panelClassName={home.menuPanel}>
          <a href="/#work">Projects</a>
          <a href={links.ai}>How I use AI</a>
          <a href={links.about}>About</a>
          <a href={links.resume}>Resume</a>
          <a href={links.email}>Contact me</a>
        </Menu>
      </header>

      <main id="main">
        <div className={about.page} data-zone="day">
          <section className={`${about.intro} ${styles.intro}`} aria-labelledby="case-title">
            <div>
              <p className={about.eyebrow}>Case 02 · Collaborative Strength</p>
              <h1 id="case-title" className={about.title}>
                A coaching website that helps the right athletes say yes.
              </h1>
            </div>
            <ol className={ai.short} aria-label="The short version">
              {short.map((s) => (
                <li key={s.title}>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* The live homepage on desktop, with the phone version in front of it */}
          <div className={cs.hero}>
            <Browser
              src="/images/cases/collaborative-strength/hero-desktop.webp"
              alt="The live homepage: a video of a deadlift at a meet behind the headline Powerlifting coaching op individuele basis, with a Book a call button."
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 90vw, 860px"
            />
            <div className={cs.heroPhone}>
              <Phone
                src="/images/cases/collaborative-strength/hero-mobile.webp"
                alt="The same homepage on a phone."
                height={2077}
                screen="#2a2b2e"
                sizes="(max-width: 768px) 30vw, 220px"
              />
            </div>
          </div>

          <dl className={`${about.facts} ${styles.facts}`}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <section className={about.section} aria-labelledby="case-problem">
            <p className={about.eyebrow}>The problem</p>
            <h2 id="case-problem" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Nobody could see what coaching with me is" />
            </h2>
            <p className={about.lead}>
              From the outside, online coaching often looks the same: a training plan and feedback on technique, for €100
              or more a month. I was coached that way myself, and after a few months it started to feel repetitive. My coaching is built on
              working together, but nobody could see that until they asked me.
            </p>
            <p className={about.body}>
              So I wanted a site that explains it, for the people who might want coaching. It was also the chance to
              bring my two passions together: coaching, and designing and building for the web.
            </p>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-process">
            <p className={about.eyebrow}>The process</p>
            <h2 id="case-process" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Strategy first, the website second" />
            </h2>
            <p className={about.lead}>
              Before I designed anything, I asked whether growing my coaching was worth it, and how. Two experienced
              coaches helped me answer that.
            </p>
            <ul className={cs.talks}>
              {talks.map((t) => (
                <li key={t.who}>
                  <blockquote>
                    <p>{t.text}</p>
                  </blockquote>
                  <p className={cs.who}>
                    <strong>{t.who}</strong>
                    <span>{t.role}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className={`${about.body} ${cs.after}`}>
              That gave me my position: a coach who sets goals together with the athlete, keeps reflecting and adjusts
              along the way. And a funnel, where the website is the step between a post and a call.
            </p>
            <ol className={cs.funnel} aria-label="The funnel">
              {funnel.map((f) => (
                <li key={f.stage}>
                  <p className={styles.label}>{f.stage}</p>
                  <h3>{f.where}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-explain">
            <p className={about.eyebrow}>Decision 1</p>
            <h2 id="case-explain" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Explain, don’t sell, so people can choose for themselves" />
            </h2>
            <div className={styles.decision}>
              <div>
                <p className={about.lead}>
                  The site’s job isn’t to convince everyone. It shows how coaching with me works, so the right people
                  book a call and the rest can see it isn’t for them.
                </p>
                <p className={about.body}>
                  The homepage sums up the approach in four steps: ambition, approach, SBD (squat, bench, deadlift) and
                  reflect. The services page is a timeline, because that’s how an athlete goes through the coaching: from
                  a free intake to a weekly plan, feedback within 24 hours, video calls and meet day.
                </p>
              </div>
              {/* The services page is tall: the pane shows its top half */}
              <figure className={cs.tall}>
                <div className={cs.tallWindow}>
                  <Image
                    src="/images/cases/collaborative-strength/services.webp"
                    alt="Services page design: a vertical timeline with Gratis intake, Wekelijks schema, Reactie binnen 24 uur, Videocalls and Wedstrijdcoaching, each with a photo, such as a WhatsApp chat with technique feedback."
                    width={1000}
                    height={1843}
                    sizes="(max-width: 768px) 90vw, 460px"
                  />
                </div>
                <figcaption className={styles.small}>The services page as a timeline.</figcaption>
              </figure>
            </div>
            <figure className={cs.wide}>
              <Image
                src="/images/cases/collaborative-strength/approach.webp"
                alt="The four steps on the live homepage: A Ambitie, B Aanpak, C SBD, D Reflect, each between thin vertical lines."
                width={1440}
                height={520}
                sizes="(max-width: 768px) 100vw, 1100px"
              />
              <figcaption className={styles.small}>The approach in four steps, on the live homepage.</figcaption>
            </figure>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-feedback">
            <p className={about.eyebrow}>Decision 2</p>
            <h2 id="case-feedback" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Five rounds of feedback, one clearer first impression" />
            </h2>
            <p className={about.lead}>
              I asked five people with an eye for design and UX to pick the Figma design apart, then went over it once
              more in a final review. Most of what changed was about the first screen and the step to a call.
            </p>
            <div className={cs.compare}>
              <figure>
                <figcaption className={styles.label}>First design</figcaption>
                <div className={cs.compareWindow}>
                  <Image
                    src="/images/cases/collaborative-strength/figma-before.webp"
                    alt="First homepage design: a dark video hero with the button in the middle, then a large heading over a photo collage, the four steps further down."
                    width={800}
                    height={2334}
                    sizes="(max-width: 768px) 45vw, 520px"
                  />
                </div>
              </figure>
              <figure>
                <figcaption className={styles.label}>After feedback</figcaption>
                <div className={cs.compareWindow}>
                  <Image
                    src="/images/cases/collaborative-strength/figma-after.webp"
                    alt="Final homepage design: Book a call in the menu, then a question to the visitor and the four steps right after the hero, on a light wall texture."
                    width={800}
                    height={2447}
                    sizes="(max-width: 768px) 45vw, 520px"
                  />
                </div>
              </figure>
            </div>
            <ul className={styles.points}>
              {feedback.map((f) => (
                <li key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-build">
            <p className={about.eyebrow}>Building it</p>
            <h2 id="case-build" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Some design decisions only showed up in the browser" />
            </h2>
            <p className={about.lead}>
              I built the homepage first and properly, in Next.js with Tailwind and Framer Motion, before the other
              pages. The site had to convey a feeling, like a meet day: the video and the headline blend on purpose, while
              buttons and the key text stay clear.
            </p>
            <ul className={cs.details}>
              <li>
                <div className={cs.shots}>
                  <Shot src="nav-top" tag="Over the video" alt="The menu over the dark hero video: white links and a Book a call button." width={1640} height={180} />
                  <Shot src="nav-scrolled" tag="Over the page" alt="The menu over the light sections: frosted glass with dark links." width={1640} height={180} />
                </div>
                <h3>A menu that adapts</h3>
                <p>
                  In Figma the menu sat on the dark video. On the white sections below it disappeared, so as you scroll it
                  turns into frosted glass with dark text.
                </p>
              </li>
              <li>
                <div className={`${cs.shots} ${cs.shotsSide}`}>
                  <Shot src="button-rest" tag="At rest" alt="The Book a call button: a dark glass field with turquoise text and an arrow in a turquoise square." width={800} height={268} />
                  <Shot src="button-hover" tag="On hover" alt="The same button on hover: filled turquoise, white text, the corners closed in and the arrow turned flat." width={800} height={268} />
                </div>
                <h3>A button you can feel</h3>
                <p>
                  On hover the arrow turns flat, the corners close in and the button fills, so it feels clickable before
                  you click.
                </p>
              </li>
              <li>
                <h3>Depth while you scroll</h3>
                <p>
                  Photos move slower than the text, the lines between the four steps draw in, and the letters slide in
                  from the side. The parallax runs on Framer Motion’s scroll hooks, so it stays smooth.
                </p>
              </li>
            </ul>

            {/* How AI was used: the story on the left, the logo sketches on the right */}
            <div className={styles.aiBlock}>
              <div>
                <h3 className={styles.subheading}>AI as a mentor first, then for speed</h3>
                <p className={about.body}>
                  On the homepage I deliberately didn’t let AI write code I didn’t understand, because I wanted to learn
                  it myself. I asked it to explain instead, like why scroll hooks run smoother than moving elements on
                  every scroll event.
                </p>
                <p className={about.body}>
                  Once the homepage was done and I knew how it worked, AI helped me build the other pages much faster and
                  make site-wide improvements, like the layouts for phones.
                </p>
                <p className={about.body}>
                  The logo went the other way. AI drafts all felt generic, so I sketched my own: two slanted planes for
                  progress and direction.{" "}
                  <a href={links.ai} className={styles.textLink}>
                    <span>How I use AI</span>
                  </a>
                </p>
              </div>
              <figure className={cs.logo}>
                <Image
                  src="/images/cases/collaborative-strength/logo-sketches.webp"
                  alt="Logo sketches: CS in brackets and frames, a C and S split by a cross, and the final mark of two slanted planes next to CS."
                  width={1160}
                  height={505}
                  sizes="(max-width: 768px) 90vw, 560px"
                />
                <figcaption className={styles.small}>From CS in a frame to the final mark, top right.</figcaption>
              </figure>
            </div>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-test">
            <p className={about.eyebrow}>The test</p>
            <h2 id="case-test" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Six powerlifters, one clear next step" />
            </h2>
            <p className={about.lead}>
              I tested the homepage with six powerlifters aged 18 to 22, the people the site is for. They scrolled
              freely while I asked what they saw, who it was for and what they would do next.
            </p>
            <div className={cs.results}>
              <div className={styles.stat} data-tone="accent">
                <p className={styles.statNum}>
                  4.2<span className={styles.statOf}> of 5</span>
                </p>
                <p className={styles.statLabel}>Average answer to: how likely are you to use this site or book coaching?</p>
              </div>
              <div className={styles.stat}>
                <p className={styles.statNum}>
                  6<span className={styles.statOf}> of 6</span>
                </p>
                <p className={styles.statLabel}>could say what the site was for and who it was for</p>
              </div>
              <ul className={cs.quotes}>
                {quotes.map((q) => (
                  <li key={q}>
                    <blockquote>
                      <p>“{q}”</p>
                    </blockquote>
                  </li>
                ))}
                <li className={styles.small}>Testers, translated from Dutch.</li>
              </ul>
            </div>
            <p className={`${about.body} ${styles.outcome}`}>
              <strong>The site is one part of the choice, not all of it.</strong> One tester put it well: whether they’d
              book depends on the call itself and on following me for a while. That’s exactly its role: explain clearly,
              then hand over to a conversation.
            </p>
          </section>
        </div>

        {/* Result: the page turns to night and the lamp is on, as at the end of the homepage */}
        <div className={styles.night} data-zone="night">
          <section className={styles.result} aria-labelledby="case-result">
            <span className={styles.lamp} aria-hidden="true" />
            <p className={about.eyebrow}>Result</p>
            <h2 id="case-result" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Enough clients, and the right ones" />
            </h2>
            <p className={about.lead}>
              I shared the site with people who were curious about coaching with me. New clients came quickly, so
              quickly that I never needed to promote it further. I coach next to a full-time job, and I want to keep it
              fun, not turn it into a second job.
            </p>
            <p className={about.body}>
              The bigger win was the fit. Some people read how I work and saw it wasn’t what they were looking for. The
              others took the step to an intake because of it, and knew what they were signing up for. I never wanted to
              charge more; I wanted a fair fee and athletes I can really help.
            </p>
          </section>

          <a href="/#work" className={styles.next}>
            <span className={styles.nextText}>
              <span className={about.eyebrow}>Next case</span>
              <span className={styles.nextTitle}>
                <span>03 Stuurmen</span>
              </span>
            </span>
            {/* The same preview as case 03 on the homepage; the link text already says where it goes */}
            <Image
              className={styles.nextImage}
              src="/images/cases/stuurmen-laptop.png"
              alt=""
              width={1818}
              height={1824}
              sizes="(max-width: 768px) 60vw, 320px"
            />
          </a>
        </div>
      </main>

      <footer className={home.footer}>
        <div className={home.footerName}>
          <span className={home.footerMark}>Djamiel Saou</span>
          <small>© 2026 Djamiel Saou · Tilburg, NL</small>
        </div>
        <nav aria-label="Contact" className={home.footerNav}>
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

/* A plain browser window: a bar with three dots, then the page */
function Browser({ src, alt, width, height, sizes }: { src: string; alt: string; width: number; height: number; sizes: string }) {
  return (
    <div className={cs.browser}>
      <div className={cs.browserBar} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority />
    </div>
  );
}

/* One state of a detail from the live site, with its label above */
function Shot({ src, tag, alt, width, height }: { src: string; tag: string; alt: string; width: number; height: number }) {
  return (
    <figure className={cs.shot}>
      <figcaption className={styles.label}>{tag}</figcaption>
      <Image
        src={`/images/cases/collaborative-strength/${src}.webp`}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 90vw, 560px"
      />
    </figure>
  );
}
