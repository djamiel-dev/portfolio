import type { Metadata } from "next";
import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { Scramble } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import about from "../../about/about.module.css";
import ai from "../../ai/ai.module.css";
import styles from "./case.module.css";
import { Changes, Departments, Dots, EaseChart, FlowAB, Landscape, Phone, Rounds, Tenants } from "./visuals";

// Case 01. Wireframe: the layout and the visuals are set, the content still needs checking.
// Text in [brackets] is a placeholder. The company name and the screens may be shown (permission given).
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
const heroScreens = [
  {
    src: "/images/cases/incentive-portal/reward.png",
    alt: "Reward screen: the points left this month, four quick rewards and a manual reward with a reason field.",
  },
  {
    src: "/images/cases/incentive-portal/pick-employees.png",
    alt: "Picking employees for the quick reward Great teamwork, with search, select all and each person’s points.",
  },
  {
    src: "/images/cases/incentive-portal/confirmation.png",
    alt: "Confirmation: three employees rewarded with 10 points each, 30 points used in total.",
    // the pop-up dims the app, so the status bar dims with it
    screen: "#7c7c7c",
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
            {heroScreens.map((s) => (
              <Phone key={s.src} {...s} sizes="(max-width: 768px) 30vw, 240px" />
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
              JobRewards was new: a white-label app that lets employers reward their staff. But there was no way yet for
              team leads to actually hand out those rewards. JobRewards was missing an incentive portal, and I was going
              to make it.
            </p>
            <p className={about.body}>
              For a new product, the first clients matter most. My deadline was simple: the launch of the first client.
            </p>
            <Landscape />
          </section>

          <section className={about.section} aria-labelledby="case-process">
            <p className={about.eyebrow}>The process</p>
            <h2 id="case-process" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Designed and tested before the first line of code" />
            </h2>
            <p className={about.lead}>
              Before I built anything, the design went through rounds of feedback: stakeholders at JobRewards, two UX
              experts, and then a test with seven team leads. Each round changed something.
            </p>
            <p className={about.body}>
              It started with narrowing the brief. Interviews with the product owner and user stories brought it back to
              the one task that matters: rewarding. A webshop, automatic points from HR systems and badges were left for
              later.
            </p>
            <Rounds />
          </section>

          <section className={about.section} aria-labelledby="case-quick">
            <p className={about.eyebrow}>Decision 1</p>
            <h2 id="case-quick" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Quick for what happens often, manual for what doesn’t" />
            </h2>
            <div className={styles.anatomy}>
              <Phone
                src="/images/cases/incentive-portal/reward.png"
                alt="The reward screen: quick rewards at the top, manual points below, then a field for the reason."
                sizes="(max-width: 768px) 70vw, 260px"
              >
                {callouts.map((c, i) => (
                  <span key={c.title} className={styles.pin} style={{ top: c.pin }} aria-hidden="true">
                    {i + 1}
                  </span>
                ))}
              </Phone>
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
              <Scramble text="Reward first or person first? I tested my own assumption" />
            </h2>
            <p className={about.lead}>
              I assumed team leads think from the reward first: what do I want to hand out? The expert reviews told me to
              test that with users, because both orders had strong arguments. So I built one prototype with two flows
              that differ in a single step.
            </p>
            <p className={about.body}>
              Seven team leads tried both: not JobRewards users, but people leading teams in retail, fast food, logistics,
              IT and high-tech.
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
              <strong>Reward-first won, but both flows had their moment.</strong> Two testers preferred person-first,
              and two more named times they’d want it. So reward-first is the main route, and you can also reward someone
              straight from the employee list.
            </p>

            <div className={styles.aside}>
              <p className={about.eyebrow}>What else the test changed</p>
              <h3 className={styles.subheading}>Watching people use it showed more than the flow</h3>
              <Changes />
            </div>

          </section>

          <section className={about.section} aria-labelledby="case-build">
            <p className={about.eyebrow}>Building it</p>
            <h2 id="case-build" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="From Figma to a working app, one component at a time" />
            </h2>
            <p className={about.lead}>
              I built the front-end in Next.js; a backend developer built the APIs. Some of those APIs already existed,
              others didn’t yet. Together we worked out what the portal still needed, and I wrote down what each one had
              to send and return. Until they were ready, the flow ran on mock data, so it could already be demoed and
              tested.
            </p>
            <p className={about.body}>
              I built it with AI in Cursor. Big prompts gave code that didn’t fit together, so I first wrote a project
              spec: the stack, where code goes, and in which order to build. Then I asked for one component at a time.
              The app still runs on that structure.
            </p>
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
            <p className={`${about.body} ${styles.after}`}>
              A developer on the team reviewed my code, and after building I tested the portal with people again. It
              only needed small refinements.{" "}
              <a href={links.ai} className={styles.textLink}>
                <span>How I use AI</span>
              </a>
            </p>
          </section>

          <section className={about.section} aria-labelledby="case-later">
            <p className={about.eyebrow}>After the first client</p>
            <h2 id="case-later" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="The project didn’t end at the first launch" />
            </h2>
            <p className={about.lead}>
              New clients brought new needs, so I kept working on it. Departments are one example: some clients organise
              their teams in departments, so wherever you pick people, a team lead can now show everyone or one of their
              departments.
            </p>
            <Departments />
            <p className={about.body}>
              Smaller changes followed too, such as longer team lists and a limit on manual rewards.
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
              The portal was ready for the first client’s launch. More clients followed, and I’ve interviewed every one
              so far: they all call the portal fast, easy and intuitive to use. Team leads start using it without any
              training.
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
