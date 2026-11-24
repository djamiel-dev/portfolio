import type { Metadata } from "next";
import Image from "next/image";
import { links } from "@/content/site";
import { CaseCursor } from "@/components/home/CaseCursor";
import home from "@/components/home/home.module.css";
import { Scramble } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import about from "@/app/about/about.module.css";
import base from "@/components/case/case.module.css";
import { Lamp } from "@/components/case/Lamp";
import { NextCase } from "@/components/case/NextCase";
import { StatTile } from "@/components/case/StatTile";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import styles from "./case.module.css";
import { HeroScreens, type Screen } from "./HeroScreens";
import { StepLights } from "./StepLights";
import { Changes, EaseChart, Phone, Rounds } from "./visuals";

// Case 01. Written for someone who scans: the short version and the screens on top, then one section per
// thing I did (process, two decisions, building it), each a heading that says the point.
// The company name and the screens may be shown (permission given).
// No "live since" or launch dates: not every case on the site is live, and this one is not new.

export const metadata: Metadata = {
  title: "Incentive portal – Djamiel Saou",
};

// The 30-second version, for the recruiter who reads nothing else
const short = [
  { title: "Problem", text: "JobRewards had an app for employees, but no place for team leads to reward them." },
  { title: "What I did", text: "Research, design rounds, two expert reviews and a test with seven team leads. Then I built the front-end." },
  { title: "Result", text: "Several client companies use it. Every client I’ve asked calls it fast and easy to use." },
];

const facts = [
  { label: "Role", value: "Product designer and front-end developer. I also came up with the name and the logo" },
  { label: "Team", value: "A product owner, and a backend developer who built the APIs" },
  { label: "Context", value: "Graduation project, which I kept building on after" },
  { label: "Built with", value: "Figma, Next.js, Microsoft Entra, Azure" },
];

// The reward flow in three steps. The screens are the real designs, in Dutch as they were built.
const heroScreens: Screen[] = [
  {
    name: "Reward",
    src: "/images/cases/incentive-portal/reward.webp",
    alt: "Reward screen: the points left this month, four quick rewards and a manual reward with a reason field.",
  },
  {
    name: "Pick employees",
    src: "/images/cases/incentive-portal/pick-employees.webp",
    alt: "Picking employees for the quick reward Great teamwork, with search, select all and each person’s points.",
  },
  {
    name: "Confirmation",
    src: "/images/cases/incentive-portal/confirmation.webp",
    alt: "Confirmation: three employees rewarded with 10 points each, 30 points used in total.",
    // the pop-up dims the app, so the status bar dims with it
    screen: "#7c7c7c",
  },
];

// Every screen of the MVP design, as the hero opens them: the reward flow first, then the rest of the portal in the
// order of the menu. From the Figma page "development MVP", 2x exports. Statistics and tips are in the design, not in
// the live menu: this is the design, so they are shown here.
const mvpScreens: Screen[] = [
  ...heroScreens,
  {
    name: "Menu",
    src: "/images/cases/incentive-portal/mvp-menu.webp",
    alt: "The menu: give rewards, employee overview, statistics, logbook and tips for rewarding, and log out.",
  },
  {
    name: "Employee overview",
    src: "/images/cases/incentive-portal/mvp-employees.webp",
    alt: "Employee overview: search and sort, with each person’s current points and when they were last rewarded.",
    height: 1874,
  },
  {
    name: "One employee",
    src: "/images/cases/incentive-portal/mvp-employee.webp",
    alt: "One employee: current points, last reward, points earned in total, number of rewards, email and phone, and a button to reward them.",
    height: 1874,
  },
  {
    name: "Reward one employee",
    src: "/images/cases/incentive-portal/mvp-reward-one.webp",
    alt: "Rewarding from the employee overview: a push message, quick rewards, manual points and a reason.",
  },
  {
    name: "Statistics",
    src: "/images/cases/incentive-portal/mvp-stats.webp",
    alt: "Statistics: average points per employee, totals per month and year, a CSV report by mail, points per quarter and a leaderboard.",
    height: 2758,
    scroll: true,
  },
  {
    name: "Logbook",
    src: "/images/cases/incentive-portal/mvp-logbook.webp",
    alt: "The logbook: every reward handed out, with its points and how long ago.",
  },
  {
    name: "Logbook entry",
    src: "/images/cases/incentive-portal/mvp-logbook-entry.webp",
    alt: "One reward in the logbook: the reward, the message that came with it and who received it.",
  },
];

const callouts = [
  // pin: the middle of the area on reward.png, from the top of the screenshot
  { title: "Quick rewards", text: "Templates for what happens often, like great teamwork.", pin: "48.7%" },
  { title: "Manual points", text: "So the small things that don’t fit a template still get seen.", pin: "70.8%" },
  { title: "A reason with the reward", text: "So the employee knows what the points are for.", pin: "79.8%" },
];

const building = [
  {
    title: "One app for every client",
    text: "The company comes from the Microsoft login, so every client company uses the same app.",
  },
  { title: "Only your own team", text: "The portal asks the API for the team of whoever is logged in, and nothing more." },
  { title: "Calls run on the server", text: "The browser only talks to the portal’s own server. Login tokens stay there." },
];

export default function IncentivePortal() {
  return (
    <div className={home.root} data-e-root>
      <Sky />
      <SiteNav page="projects" />

      <main id="main">
        <div className={about.page} data-zone="day">
          {/* Intro: the statement on the left, the short version on the right, as on How I use AI */}
          <section className={`${about.intro} ${base.intro}`} aria-labelledby="case-title">
            <div>
              <p className={about.label}>Case 01 · Incentive portal</p>
              <h1 id="case-title" className={about.title}>
                A rewards portal team leads use without training.
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

          <HeroScreens screens={heroScreens} all={mvpScreens} />
          <CaseCursor className={home.caseCursor} />

          <dl className={`${about.facts} ${base.facts}`}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* The employee app that was already there on the left, the missing piece on the right */}
          <section className={`${about.section} ${styles.problem}`} aria-labelledby="case-problem">
            <div className={styles.problemFrame}>
              <Image
                className={styles.problemImage}
                src="/images/cases/incentive-portal/employee-app.webp"
                alt="The JobRewards employee app: your points, a savings goal and rewards for team and sales achievements."
                width={1137}
                height={2000}
                sizes="(max-width: 768px) 70vw, 360px"
              />
            </div>
            <div>
              <p className={about.label}>The problem</p>
              <h2 id="case-problem" className={`${about.heading} ${base.heading}`}>
                <Scramble text="An app for employees, but no place for team leads" />
              </h2>
              <p className={about.lead}>
                JobRewards was new: a white-label app that lets employers reward their staff. But team leads had no way
                yet to hand out those rewards, so I was asked to make the missing incentive portal. The deadline was the
                first client’s launch, and for a new product, the first clients matter most.
              </p>
            </div>
          </section>

          <section className={`${about.section} ${base.roomy}`} aria-labelledby="case-process">
            <p className={about.label}>The process</p>
            <h2 id="case-process" className={`${about.heading} ${base.heading}`}>
              <Scramble text="Designed and tested before the first line of code" />
            </h2>
            <p className={about.lead}>
              First I narrowed the brief to the one task that matters: rewarding. A webshop, automatic points and badges
              were left for later. Then the design went through rounds of feedback from stakeholders, two UX experts and
              seven team leads.
            </p>
            <Rounds />
          </section>

          <section className={`${about.section} ${base.roomy}`} aria-labelledby="case-quick">
            <p className={about.label}>Decision 1</p>
            <h2 id="case-quick" className={`${about.heading} ${base.heading}`}>
              <Scramble text="Quick for what happens often, manual for what doesn’t" />
            </h2>
            {/* The story and what each part is for on the left, the screen with the same numbers on the right */}
            <StepLights className={styles.decision}>
              <div>
                <p className={about.lead}>
                  My first design was a dashboard: a bento grid full of options, so a team lead could do almost anything.
                  Aligning with the stakeholders made the goal clear. JobRewards wanted to win its first clients by being
                  simpler and faster than the competition, not by having more features.
                </p>
                <p className={about.body}>
                  So I redesigned around that: as few taps and choices as possible between a team lead and a reward for
                  the behaviour they want to see.
                </p>
                <ol className={styles.callouts}>
                  {callouts.map((c, i) => (
                    <li key={c.title} data-step={i}>
                      <span className={base.pinNum} aria-hidden="true">
                        {i + 1}
                      </span>
                      <div>
                        <h3>{c.title}</h3>
                        <p>{c.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={styles.anatomy}>
                <Phone
                  src="/images/cases/incentive-portal/reward.webp"
                  alt="The reward screen: quick rewards at the top, manual points below, then a field for the reason."
                  sizes="(max-width: 768px) 70vw, 280px"
                >
                  {callouts.map((c, i) => (
                    <span key={c.title} className={base.pin} style={{ top: c.pin }} data-step={i} aria-hidden="true">
                      {i + 1}
                    </span>
                  ))}
                </Phone>
              </div>
            </StepLights>
          </section>

          <section className={`${about.section} ${base.roomy}`} aria-labelledby="case-test">

            <p className={about.label}>Decision 2</p>
            <h2 id="case-test" className={`${about.heading} ${base.heading}`}>
              <Scramble text="Reward first or person first? I let team leads decide" />
            </h2>
            <div className={styles.testIntro}>
              <div>
                <p className={about.lead}>
                  Stakeholder feedback and two expert reviews settled a lot. What was left were questions only users could
                  answer, and the biggest was the route: does a team lead start from the reward, or from the person? It was
                  on the table in both expert reviews, and neither settled it.
                </p>
                <p className={about.body}>
                  So seven team leads from retail, fast food, logistics, IT and high-tech tried both routes in one prototype.
                  The same test answered the smaller open questions too.
                </p>
              </div>
              {/* The Figma prototype the team leads clicked through: both routes wired up */}
              <figure className={styles.prototype}>
                <div className={styles.prototypeScroll} tabIndex={0} role="group" aria-label="Test prototype, scrolls sideways">
                  <Image
                    src="/images/cases/incentive-portal/test-prototype-flows.webp"
                    alt="The test prototype in Figma: two rows of screens, flow 1 and flow 2, with blue prototype links from the menu through rewarding to the confirmation, the employee list, statistics and history."
                    width={2000}
                    height={1009}
                    sizes="(max-width: 768px) 720px, 640px"
                  />
                </div>
                <figcaption className={base.small}>
                  The test prototype in Figma: both routes wired up, from the menu to the confirmation.
                </figcaption>
              </figure>
            </div>
            <div className={styles.results}>
              <EaseChart />
              <div className={styles.votes}>
                <StatTile of={7} lit={5} label="testers preferred reward first" tone="accent" />
                <StatTile of={7} lit={7} label="could use it without explanation" />
              </div>
            </div>
            <p className={`${base.small} ${styles.note}`}>Seven team leads, tested on the prototype, not the live product.</p>
            <p className={`${about.body} ${base.outcome}`}>
              <strong>Reward first became the main route.</strong> Five of seven preferred it, and on average it scored
              easier. But person first had its place too: two testers preferred it, and two others named moments they
              would use it. So the portal has both. Rewarding starts from the reward, and from the employee list you can
              reward someone directly.
            </p>

            <div className={styles.aside}>
              <h3 className={base.subheading}>A few other things the test changed</h3>
              <Changes />
            </div>
          </section>

          <section className={`${about.section} ${base.roomy}`} aria-labelledby="case-build">
            <p className={about.label}>Building it</p>
            <h2 id="case-build" className={`${about.heading} ${base.heading}`}>
              <Scramble text="From Figma to a working app, one component at a time" />
            </h2>
            {/* Who built what, with the result on the right: the same image as case 01 on the homepage */}
            <div className={styles.decision}>
              <div>
                <p className={about.lead}>
                  I built the front-end in Next.js; a backend developer built the APIs. Together we worked out what the
                  portal still needed, and I wrote down what each API had to send and return. Until they were ready, the
                  app ran on mock data, so it could already be demoed and tested.
                </p>
                <ul className={styles.points}>
                  {building.map((b) => (
                    <li key={b.title}>
                      <h3>{b.title}</h3>
                      <p>{b.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.buildImage}>
                <Image
                  src="/images/cases/jobrewards.webp"
                  alt="Two phones with the built portal: the reward screen and picking employees for a quick reward."
                  width={1600}
                  height={2099}
                  sizes="(max-width: 768px) 80vw, 420px"
                />
              </div>
            </div>

            {/* How AI was used: the story on the left, the spec it ran on on the right */}
            <div className={base.aiBlock}>
              <div>
                <h3 className={base.subheading}>Built with AI, held together by a spec</h3>
                <p className={about.body}>
                  I built it with AI in Cursor. Big prompts gave code that didn’t fit together, so I first wrote a project
                  spec: the stack, where code goes, and in which order to build. Then I asked for one component at a time.
                  The app still runs on that structure.
                </p>
                <p className={about.body}>
                  A developer on the team reviewed my code, and after building I tested the portal with people again. It
                  only needed small refinements.{" "}
                  <a href={links.ai} className={about.textLink}>
                    <span>How I use AI</span>
                  </a>
                </p>
              </div>
              <div className={styles.spec}>
                <pre className={styles.specFile}>
                  <span>PROJECT_SPEC.md</span>
                  {"\n"}UI components must be presentational.{"\n"}Business logic must live in hooks + /lib
                  {"\n\n"}/components/atoms{"\n"}/components/molecules{"\n"}/hooks{"\n"}/lib
                </pre>
                <ol className={styles.specSteps} aria-label="The build order in the spec">
                  <li>UI from Figma</li>
                  <li>Interaction and logic</li>
                  <li>The backend, last</li>
                </ol>
              </div>
            </div>
          </section>
        </div>

        {/* Result: the page turns to night and the lamp is on, as at the end of the homepage */}
        <div className={base.night} data-zone="night">
          <section className={base.result} aria-labelledby="case-result">
            <Lamp />
            <p className={about.label}>Result</p>
            <h2 id="case-result" className={`${about.heading} ${base.heading}`}>
              <Scramble text="In use at several client companies" />
            </h2>
            <p className={about.lead}>The portal was ready for the first client’s launch, and more clients followed.</p>
            {/* What the clients say and what came after, as two cards in the light of the lamp, as the results of
                cases 02, 03 and 04 */}
            <ul className={styles.outcome}>
              <li>
                <p className={about.label}>Every client so far</p>
                <h3>Fast, easy and intuitive</h3>
                <p>
                  I’ve interviewed every client so far, and they all call the portal fast, easy and intuitive to use.
                  Team leads start using it without any training.
                </p>
              </li>
              <li>
                <p className={about.label}>After the first launch</p>
                <h3>New clients, new needs</h3>
                <p>
                  So I kept building on it: a department filter for clients that organise their teams that way, longer
                  team lists, and a limit on manual rewards.
                </p>
              </li>
            </ul>
          </section>

          {/* The homepage of case 02, flat, without a device; the link text already says where it goes */}
          <NextCase
            href="/work/collaborative-strength/"
            title="02 Collaborative Strength"
            image={{ src: "/images/cases/collaborative-strength/home-preview.webp", width: 1440, height: 900 }} flat
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
