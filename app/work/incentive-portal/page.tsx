import type { Metadata } from "next";
import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { Scramble } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import about from "../../about/about.module.css";
import ai from "../../ai/ai.module.css";
import styles from "./case.module.css";
import { Departments, Dots, EaseChart, FlowAB, Landscape, Rounds, ShiftBar, Tenants } from "./visuals";

// Case 01. Wireframe: the layout and the visuals are set, the content still needs checking.
// Text in [brackets] is a placeholder. No company name, screens or numbers until permission is given.
// No "live since" or launch dates: not every case on the site is live, and this one is not new.

export const metadata: Metadata = {
  title: "Incentive portal – Djamiel Saou",
};

// The 30-second version, for the recruiter who reads nothing else
const short = [
  { title: "Problem", text: "[Company] had an app for employees, but no place for team leads to reward them." },
  { title: "What I did", text: "Research, design rounds, two expert reviews and a test with seven team leads. Then I built the front-end." },
  { title: "Result", text: "Several client companies use it. Every client I’ve asked calls it fast and easy to use." },
];

const facts = [
  { label: "Role", value: "Product designer and front-end developer" },
  { label: "Team", value: "A product owner, and a backend developer who built the APIs" },
  { label: "Context", value: "Graduation project, which I kept building on after" },
  { label: "Built with", value: "Figma, Next.js, Microsoft Entra, Azure" },
];

const callouts = [
  { title: "Quick rewards", text: "Templates for what happens every week, like great teamwork." },
  { title: "Manual points", text: "So the small things that don’t fit a template still get seen." },
  { title: "A reason with every reward", text: "Added after an expert review, so people know what they’re rewarded for." },
];

const building = [
  { title: "Roles and permissions", text: "Added after the first launch, on the same structure." },
  { title: "Departments, when the data has them", text: "On any screen where you pick people, you can show everyone or one department." },
  { title: "Mock data first", text: "The whole flow ran on mock data, so it could be demoed and tested before the APIs existed." },
  { title: "Calls run on the server", text: "Login tokens never reach the browser." },
];

export default function IncentivePortal() {
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
          {/* Intro: the statement on the left, the short version on the right, as on How I use AI */}
          <section className={`${about.intro} ${styles.intro}`} aria-labelledby="case-title">
            <div>
              <p className={about.eyebrow}>Case 01 · Incentive portal</p>
              <h1 id="case-title" className={about.title}>
                A rewards portal team leads use without training.
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

          <div className={styles.hero}>
            {["[Reward screen with quick rewards]", "[Picking employees]", "[Confirmation]"].map((n) => (
              <div key={n} className={styles.phone}>
                {n}
              </div>
            ))}
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
              <Scramble text="An app for employees, but no place for team leads" />
            </h2>
            <p className={about.lead}>
              [Company] was new: a white-label app that lets employers reward their staff, running on the back-office the
              company already used. What was missing was a place for team leads to hand out rewards. The back-office holds
              every client together, so that couldn’t be it.
            </p>
            <p className={about.body}>My deadline was simple: the launch of the first client.</p>
            <Landscape />
          </section>

          <section className={about.section} aria-labelledby="case-process">
            <p className={about.eyebrow}>The process</p>
            <h2 id="case-process" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Designed and tested before the first line of code" />
            </h2>
            <p className={about.lead}>
              Before I built anything, the design went through rounds of feedback from the client, two UX experts and seven
              team leads. Each round changed something.
            </p>
            <Rounds />
          </section>

          <section className={about.section} aria-labelledby="case-quick">
            <p className={about.eyebrow}>Decision 1</p>
            <h2 id="case-quick" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Quick for what happens often, manual for what doesn’t" />
            </h2>
            <div className={styles.anatomy}>
              <div className={styles.phone}>
                {callouts.map((c, i) => (
                  <span key={c.title} className={styles.pin} style={{ top: `${30 + i * 20}%` }} aria-hidden="true">
                    {i + 1}
                  </span>
                ))}
                [Final reward screen]
              </div>
              <ol className={styles.callouts}>
                {callouts.map((c, i) => (
                  <li key={c.title}>
                    <span className={styles.pinNum} aria-hidden="true">
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
          </section>

          <section className={about.section} aria-labelledby="case-test">
            <p className={about.eyebrow}>Decision 2</p>
            <h2 id="case-test" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Reward first or person first? Seven team leads decided" />
            </h2>
            <p className={about.lead}>
              One prototype, two flows that differ in a single step. Seven people who lead or led a team tried both: not
              [Company] users, but team leads in retail, fast food, logistics, IT and high-tech.
            </p>
            <FlowAB />
            <div className={styles.results}>
              <EaseChart />
              <div className={styles.votes}>
                <Dots of={7} lit={5} label="Preferred reward first" tone="accent" />
                <Dots of={7} lit={7} label="Could use it without explanation" />
                <p className={styles.small}>Tested on the prototype, not the live product.</p>
              </div>
            </div>
            <p className={`${about.body} ${styles.outcome}`}>
              <strong>So reward-first became the main route.</strong> Person-first stayed too, from an employee’s
              profile, for the two who think in people first.
            </p>

            <div className={styles.aside}>
              <p className={about.eyebrow}>What I didn’t expect</p>
              <h3 className={styles.subheading}>Most team leads reward after the shift, not in the moment</h3>
              <ShiftBar />
              <p className={about.body}>
                After the shift they can look back on who earned what. [So the app is built for a calm round of rewards,
                not for speed between tasks.]
              </p>
            </div>
          </section>

          <section className={about.section} aria-labelledby="case-build">
            <p className={about.eyebrow}>Building it</p>
            <h2 id="case-build" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Built to grow with every new client" />
            </h2>
            <p className={about.lead}>
              The company comes from the Microsoft login. So one app serves every client, and each team lead only sees
              their own people. I set up the front-end to grow: new clients and new features fit in without starting over.
            </p>
            <div className={styles.build}>
              <Tenants />
              <ol className={styles.points}>
                {building.map((b) => (
                  <li key={b.title}>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <Departments />
            <p className={about.body}>
              After building, I tested the portal with people again. It only needed small refinements. [Who tested, in
              one line.]
            </p>
          </section>

          <section className={about.section} aria-labelledby="case-ai">
            <p className={about.eyebrow}>How I used AI</p>
            <h2 id="case-ai" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="A spec kept AI’s code consistent" />
            </h2>
            <p className={about.lead}>
              I wrote a project spec first, then asked for one component at a time. That code still runs in production.
            </p>
            <div className={styles.spec}>
              <pre className={styles.specFile}>
                <span>PROJECT_SPEC.md</span>
                {"\n"}[3–5 real lines: tokens, folder rules, naming]
              </pre>
              <ol className={styles.specSteps}>
                <li>One prompt</li>
                <li>One component</li>
                <li>Checked against the spec</li>
              </ol>
            </div>
            <p className={about.body}>
              Before any of that, AI prototypes in Lovable, Bolt and Stitch helped start the conversation with the client.
              The research set the direction.{" "}
              <a href={links.ai} className={styles.textLink}>
                <span>How I use AI</span>
              </a>
            </p>
          </section>
        </div>

        {/* Result: the page turns to night and the lamp is on, as at the end of the homepage */}
        <div className={styles.night} data-zone="night">
          <section className={styles.result} aria-labelledby="case-result">
            <span className={styles.lamp} aria-hidden="true" />
            <p className={about.eyebrow}>Result</p>
            <h2 id="case-result" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="In use at several client companies" />
            </h2>
            <p className={about.lead}>
              After the first client, more followed. I’ve interviewed every client so far: they all call
              the portal fast, easy and intuitive to use.
            </p>
          </section>

          <a href="/#work" className={styles.next}>
            <span className={about.eyebrow}>Next case</span>
            <span className={styles.nextTitle}>
              <span>02 Collaborative Strength</span>
            </span>
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
