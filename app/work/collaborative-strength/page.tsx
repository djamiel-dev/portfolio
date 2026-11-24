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
import { Clip } from "@/components/case/Clip";
import { Compare } from "@/components/case/Compare";
import { Lamp } from "@/components/case/Lamp";
import { NextCase } from "@/components/case/NextCase";
import { ScrollStage } from "@/components/case/ScrollStage";
import { StatTile } from "@/components/case/StatTile";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
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
    text: "People looking for a coach don’t know what to expect, and every coach offers something different. So reaching out is a big step.",
  },
  {
    title: "What I did",
    text: "Two talks with experienced coaches, a funnel, rounds of design feedback and a test with six powerlifters. Then I built it.",
  },
  { title: "Result", text: "New clients came quickly, and better matches: the site tells people whether my coaching fits them." },
];

const facts = [
  { label: "Role", value: "Owner, designer and developer. I was my own client" },
  { label: "Context", value: "My own powerlifting coaching business" },
  { label: "Research", value: "Two expert talks, five feedback sessions and a final review, a test with six powerlifters" },
  { label: "Built with", value: "Figma, Next.js, Tailwind CSS, Framer Motion" },
];

// The two talks and what came out of them
const talks = [
  {
    who: "Stijn Schoonhof",
    role: "Founder of Deliberate Strength",
    photo: "/images/cases/collaborative-strength/stijn-schoonhof.webp",
    // where the face is in the square photo
    focus: "50% 45%",
    text: "Give people value before you ask for anything. And don’t niche down too early.",
  },
  {
    who: "Lorenzo Haarlo",
    role: "Gym owner, coach and national champion",
    photo: "/images/cases/collaborative-strength/lorenzo-haarlo-face.webp",
    focus: "50% 50%",
    text: "Clients pay for more than a plan: guidance, reflection, and attention to life outside the gym.",
  },
];

const funnel = [
  { stage: "Awareness", where: "Instagram", text: "Technique tips and thoughts on coaching, free to use." },
  // The step this case is about, lit as "on"
  { stage: "Consideration", where: "The website", text: "How I work, a free training plan and a blog.", lit: true },
  { stage: "Decision", where: "A free intake call", text: "Booked from the menu, on every page." },
];

// Two examples of what changed after feedback (not the only two)
const changes = [
  { title: "Booking in the menu", text: "Book a call now sits in the menu, on every page." },
  {
    title: "A question first",
    text: "The page opens with a question to the visitor, instead of an introduction of me.",
  },
];

// Building it, in order
const buildSteps = [
  { title: "By hand", text: "I typed most of the homepage myself, to really understand how everything fits together." },
  { title: "Improved with AI", text: "Then I improved it with AI, to learn from that as well." },
  {
    title: "Back to my AI workflow",
    text: "With that, I built the other pages. All in Next.js, Tailwind and Framer Motion.",
    ai: true,
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
      <SiteNav page="projects" />

      <main id="main">
        <div className={about.page} data-zone="day">
          <section className={`${about.intro} ${styles.intro}`} aria-labelledby="case-title">
            <div>
              <p className={about.label}>Case 02 · Collaborative Strength</p>
              <h1 id="case-title" className={about.title}>
                A coaching website that helps the right athletes say yes.
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

          {/* The live homepage full width, no device around it: a loop of scrolling through it and hovering
              its buttons, the top half only. The recording is the link to the live site, with "View website" at the pointer. */}
          <Clip
            className={cs.heroTour}
            src="/images/cases/collaborative-strength/hero-tour.mp4?v=3"
            poster="/images/cases/collaborative-strength/hero-tour.jpg?v=3"
            label="Scrolling through the live homepage: the deadlift video, the question to the visitor, the four steps, the photos and Focus zonder chaos, with each button lighting up on hover."
            width={1440}
            height={450}
            href="https://colaborative-strength-website.vercel.app/"
            linkText="View the live website"
          />
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
              <Scramble text="Not knowing what to expect, from either side" />
            </h2>
            {/* The two sides of the heading as two cards: the athlete's uncertainty, then what my coaching asks */}
            <ul className={cs.sides}>
              <li>
                <p className={about.label}>The athlete</p>
                <h3>Doesn’t know what to expect</h3>
                <p>
                  Most people looking for a coach don’t really know what they’re looking for, or what to expect. And
                  every coach offers something a little different. That makes reaching out a big step.
                </p>
              </li>
              <li>
                <p className={about.label}>My coaching</p>
                <h3>Made together, so it asks for input</h3>
                {/* The difference in two rows; the lit dot marks mine, as light means "on" on the homepage */}
                <dl className={cs.versus}>
                  <div>
                    <dt>Most plans</dt>
                    <dd>General, thought out only from the coach’s side.</dd>
                  </div>
                  <div data-on="">
                    <dt>Mine</dt>
                    <dd>Worked out with the athlete: what will work for them.</dd>
                  </div>
                </dl>
                <p>
                  That asks something of the athlete: they have to be willing to give that input. I’ve had athletes who
                  didn’t want that, and then it simply isn’t a good fit.
                </p>
              </li>
            </ul>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-process">
            <p className={about.label}>The process</p>
            <h2 id="case-process" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Strategy first, the website second" />
            </h2>
            <p className={about.lead}>
              Before I designed anything, I wanted to know how to grow my coaching the right way: who it’s for, and
              how they find me. I brainstormed it with two experienced coaches.
            </p>
            {/* The two talks as quotes: a large quote mark, the advice, then who said it with their photo */}
            <ul className={cs.talks}>
              {talks.map((t) => (
                <li key={t.who}>
                  <figure className={cs.quote}>
                    <span className={cs.quoteMark} aria-hidden="true">
                      “
                    </span>
                    <blockquote>
                      <p>{t.text}</p>
                    </blockquote>
                    <figcaption className={cs.who}>
                      {/* Decorative: the name is right next to it */}
                      <Image
                        className={cs.portrait}
                        src={t.photo}
                        alt=""
                        width={128}
                        height={128}
                        sizes="56px"
                        style={{ objectPosition: t.focus }}
                      />
                      <span>
                        <strong>{t.who}</strong>
                        <span>{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            {/* The bridge from the talks to the funnel, with an arrow down into it */}
            <p className={cs.shaped}>
              <span aria-hidden="true" />
              That shaped the funnel: the website is the step between a post and a call.
            </p>
            <ol className={cs.funnel} aria-label="The funnel">
              {funnel.map((f) => (
                <li key={f.stage} data-lit={f.lit || undefined}>
                  <p className={about.label}>{f.stage}</p>
                  <h3>{f.where}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-explain">
            {/* The heading and text on the right; on desktop the services page scrolls in a window beside it */}
            <ScrollStage
              caption="The services page as a timeline."
              visual={
                <Browser>
                <div className={styles.scrollyView} data-scroll-view>
                  <div className={styles.scrollyPage} data-scroll-page>
                    <Image
                      src="/images/cases/collaborative-strength/services-page.webp"
                      alt="Services page design: a vertical timeline with Gratis intake, Wekelijks schema, Reactie binnen 24 uur, Videocalls and Wedstrijdcoaching, each with a photo, such as a WhatsApp chat with technique feedback."
                      width={1000}
                      height={1843}
                      sizes="(max-width: 768px) 90vw, 720px"
                    />
                  </div>
                </div>
                </Browser>
              }
            >
              <p className={about.label}>Decision 1</p>
              <h2 id="case-explain" className={`${about.heading} ${styles.heading}`}>
                <Scramble text="Explain, don’t sell, so people can choose for themselves" />
              </h2>
              <p className={about.lead}>
                The site’s job isn’t to convince everyone. It shows how coaching with me works, so the right people
                book a call and the rest can see it isn’t for them.
              </p>
              <p className={about.body}>
                It also says up front what I expect: your input, on anything from training to how I coach. If that
                doesn’t appeal to you, you know before we’ve even talked.
              </p>
            </ScrollStage>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-feedback">
            {/* As Decision 1, mirrored: the text on the left, both whole homepage designs scrolling on the right,
                with a line to drag between them */}
            <ScrollStage
              side="right"
              length={320}
              caption="The homepage before and after feedback. Drag the line, or use the arrow keys."
              visual={
                <Compare
                  before={{
                    src: "/images/cases/collaborative-strength/homepage-first.webp",
                    alt: "First homepage design: a dark video hero without booking in the menu, then a large heading over a photo collage, the four steps further down and Focus zonder chaos.",
                    width: 1200,
                    height: 3499,
                  }}
                  after={{
                    src: "/images/cases/collaborative-strength/homepage-after.webp",
                    alt: "Homepage design after feedback: Book a call in the menu, right after the hero a question to the visitor and the four steps, then the photos and Focus zonder chaos.",
                    width: 1200,
                    height: 3670,
                  }}
                />
              }
            >
              <p className={about.label}>Decision 2</p>
              <h2 id="case-feedback" className={`${about.heading} ${styles.heading}`}>
                <Scramble text="Five rounds of feedback, one clearer first impression" />
              </h2>
              <p className={about.lead}>
                I asked five people with an eye for design and UX to pick the Figma design apart, then went over it
                once more in a final review.
              </p>
              <p className={about.body}>Two examples of what changed:</p>
              <ul className={cs.examples}>
                {changes.map((c) => (
                  <li key={c.title}>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </li>
                ))}
              </ul>
            </ScrollStage>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-build">
            <p className={about.label}>Building it</p>
            <h2 id="case-build" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="By hand first, then back to AI" />
            </h2>
            <p className={about.lead}>
              This was my own project, with no hard deadline, and coaching and building for the web in one. So besides
              using AI, I saw the chance to sharpen my raw coding skills again.
            </p>
            {/* The order I built it in, as three steps on one line */}
            <ol className={cs.steps} aria-label="How I built it">
              {buildSteps.map((s, i) => (
                <li key={s.title}>
                  <span className={styles.pinNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{s.title}</h3>
                  <p>
                    {s.text}
                    {s.ai && (
                      <>
                        {" "}
                        <a href={links.ai} className={about.textLink}>
                          <span>How I use AI</span>
                        </a>
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>
            {/* Screen recordings of the live site, 1440 wide at 60 fps */}
            <ul className={cs.details}>
              <li>
                <div className={cs.shots}>
                  <Clip
                    src="/images/cases/collaborative-strength/clip-menu.mp4?v=3"
                    poster="/images/cases/collaborative-strength/clip-menu.jpg?v=3"
                    label="Scrolling the live site: over the dark video the menu is see-through, over the light section below it turns into frosted glass, and back."
                    width={800}
                    height={400}
                  />
                </div>
                <h3>A menu that adapts</h3>
                <p>
                  In Figma the menu sat on the dark video. On the white sections below it disappeared, so as you scroll it
                  turns into frosted glass with dark text.
                </p>
              </li>
              <li>
                <div className={cs.shots}>
                  <Clip
                    src="/images/cases/collaborative-strength/clip-button.mp4?v=3"
                    poster="/images/cases/collaborative-strength/clip-button.jpg?v=3"
                    label="The pointer moves onto the Book a call button: it fills turquoise, the corners close in and the arrow turns flat, then it returns to rest."
                    width={720}
                    height={360}
                  />
                </div>
                <h3>A button you can feel</h3>
                <p>
                  On hover the arrow turns flat, the corners close in and the button fills, so it feels clickable before
                  you click.
                </p>
              </li>
              <li>
                <div className={cs.shots}>
                  <Clip
                    src="/images/cases/collaborative-strength/clip-steps.mp4?v=4"
                    poster="/images/cases/collaborative-strength/clip-steps.jpg?v=4"
                    label="Scrolling to the four steps on the live homepage: the vertical lines draw in, then A Ambitie, B Aanpak, C SBD and D Reflect fade and slide in."
                    width={1200}
                    height={600}
                  />
                </div>
                <h3>Four steps that unfold</h3>
                <p>
                  As you reach ambition, approach, SBD and reflect, the lines draw in, the text fades in and the letters
                  slide in from the side.
                </p>
              </li>
            </ul>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-test">
            <p className={about.label}>The test</p>
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
                {/* The average as five blocks, the last one a fifth full; the same place as the dots beside it */}
                <span className={cs.meter} aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <i
                      key={n}
                      data-full={n <= 4 || undefined}
                      style={{ "--fill": `${Math.round(Math.min(1, Math.max(0, 4.2 - (n - 1))) * 100)}%` } as CSSProperties}
                    />
                  ))}
                </span>
              </div>
              <StatTile of={6} lit={6} label="could say what the site was for and who it was for" />
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
            <Lamp />
            <p className={about.label}>Result</p>
            <h2 id="case-result" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Enough clients, and the right ones" />
            </h2>
            {/* The two halves of the heading as two cards, in the light of the lamp */}
            <ul className={cs.wins}>
              <li>
                <p className={about.label}>Enough clients</p>
                <h3>New clients came quickly</h3>
                <p>
                  I shared the site with people who were curious about coaching with me. Clients came so quickly that I
                  never needed to promote it further. I coach next to a full-time job, and I want to keep it fun, not
                  turn it into a second job.
                </p>
              </li>
              <li>
                <p className={about.label}>The right ones</p>
                <h3>The bigger win was the fit</h3>
                <p>
                  Some people read how I work and saw it wasn’t what they were looking for. The others took the step to
                  an intake because of it, and knew what they were signing up for.
                </p>
              </li>
            </ul>
          </section>

          {/* The main page of case 03, flat, without a device (as the next case on case 01); the link text already
              says where it goes */}
          <NextCase
            href="/work/stuurmen/"
            title="03 Stuurmen"
            image={{ src: "/images/cases/stuurmen/home-preview.webp", width: 1440, height: 900 }} flat
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
