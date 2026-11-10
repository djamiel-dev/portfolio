import type { Metadata } from "next";
import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { Scramble } from "@/components/home/Skills";
import about from "../about/about.module.css";
import styles from "./ai.module.css";

// Wireframe: the layout is set, the content follows. Text in [brackets] is a placeholder.

export const metadata: Metadata = {
  title: "How I use AI – Djamiel Saou",
};

// The 30-second version, for the visitor who reads nothing else
const short = [
  { title: "Range", text: "AI lets me explore more directions and test sooner." },
  { title: "Judgement", text: "The decisions are mine, and I can explain and test the code it writes." },
  { title: "Checks", text: "[Nothing goes live on AI’s word: every step is reviewed and tested.]" },
];

// The same phases as the skills on the homepage. AI itself runs through all of them.
const phases = [
  {
    title: "Research & problem framing",
    ai: "Finds research that actually fits my problem statement, so I spend my time reading instead of searching. It turns interview transcripts into briefings and next steps, and helps draft research questions and scenarios that make the problem concrete.",
    me: "I set the problem statement and the research questions, and decide which sources matter.",
    check: "I read the key sources myself and form a rough view first. That view steers AI towards more research, or towards the conclusions it writes up.",
  },
  {
    title: "UI/UX & design systems",
    ai: "Widens the options before the style is set: from a moodboard, I generate early directions with Claude Design or Figma AI.",
    me: "I build the moodboard, pull what a client’s style guide already fixes into both the AI project and the design file, and design the final UI in Figma or straight in code.",
    check: "I show the directions to the client or colleagues and test which one creates the feeling the research called for. Only then do I build the design system.",
  },
  {
    title: "Prototyping & user testing",
    ai: "Helps write interview questions and test scripts, turns test transcripts into conclusions and solution ideas, and builds coded prototypes with mocked data where a clickable Figma file would fall short.",
    me: "I decide what each test has to teach me, whether it’s an A/B test, a 5-second test or a usability test.",
    check: "Every question and conclusion goes back to the research questions I started with, or adjusted along the way.",
  },
  {
    title: "Frontend development",
    ai: "Writes most of the code, within constraints I define up front in the project, such as white-label rules. It suggests ways to build what I describe, and writes automated tests.",
    me: "I choose the stack and architecture that fit the problem and the users, make use of component libraries such as 21st.dev or React Bits, and step in on details like viewport units or media queries.",
    check: "I only choose one of AI’s suggestions once I understand it, and I ask it to question my plan. Playwright tests first, then I test it myself on top.",
  },
  {
    title: "Collaboration",
    ai: "Turns a choice between options, technical or visual, into a clear table of pros, cons and examples I can share. It also turns an idea in my head into a quick visual or proof of concept, so people see what I mean instead of reading about it.",
    me: "I make the choice and bring it to the team. When I review a colleague’s pull request, I first have AI explain what it does, then judge it myself.",
    check: "For my own pull requests, AI writes a summary of the goal and my reasoning, so reviewers can question the thinking, not just the code.",
  },
];

const ownHands = [
  { title: "[Talking to users]", text: "[Interviews and tests are where I learn what people really need, so I run them myself.]" },
  { title: "[The final choice]", text: "[AI gives me options; which one fits the problem and the business is my call.]" },
  { title: "[Client and company data]", text: "[Nothing confidential goes into an AI tool.]" },
  { title: "[The last check before release]", text: "[I review and test everything myself before it goes live.]" },
];

// Real moments from building this site, from the decision log
const moments = [
  {
    title: "It guessed instead of looking",
    ai: "Asked to work from a reference site’s design system, it guessed the colours without opening the site. The result looked generic.",
    me: "Rejected it, and had it measure the real values in the browser first.",
    lesson: "Measure the real source first, then design.",
  },
  {
    title: "It wrote something that never happened",
    ai: "It drafted a note about an AI decision for this site that never took place.",
    me: "Caught it and replaced it with a real entry from my decision log.",
    lesson: "Everything AI writes is a claim until I’ve checked it.",
  },
  {
    title: "It went faster than I could judge",
    ai: "It built three complete homepage concepts in one go.",
    me: "Stopped it: I could no longer follow or steer the choices.",
    lesson: "Small steps, and I review each one before the next.",
  },
];

const proof = [
  { label: "Design system", href: "/design-system", text: "The live tokens behind this site" },
  { label: "Source code", href: "https://github.com/djamiel-dev/portfolio", text: "The code of this site, public on GitHub" },
  {
    label: "Decision log",
    href: "https://github.com/djamiel-dev/portfolio/blob/main/docs/beslissingen.md",
    text: "[What AI suggested and what I decided, step by step (in Dutch)]",
  },
  { label: "Quality checks", text: "[Accessibility and speed checked with axe and Lighthouse before every release]" },
];

export default function HowIUseAI() {
  return (
    <div className={home.root} data-sky="day">
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
          <a href={links.ai} aria-current="page">
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
          <a href={links.ai} aria-current="page">
            How I use AI
          </a>
          <a href={links.about}>About</a>
          <a href={links.resume}>Resume</a>
          <a href={links.email}>Contact me</a>
        </Menu>
      </header>

      <main id="main">
        <div className={about.page}>
          <section className={`${about.intro} ${styles.intro}`} aria-labelledby="ai-title">
            <div>
              <p className={about.eyebrow}>How I use AI</p>
              <h1 id="ai-title" className={about.title}>
                I use AI to build better solutions, not just faster ones.
              </h1>
            </div>
            <ol className={styles.short} aria-label="The short version">
              {short.map((s) => (
                <li key={s.title}>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={about.section} aria-labelledby="ai-phases">
            <h2 id="ai-phases" className={about.heading}>
              <Scramble text="Where AI fits in each phase" />
            </h2>
            <ol className={styles.phases}>
              {phases.map((p, i) => (
                <li key={p.title}>
                  <span className={about.num}>0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <dl className={styles.cells}>
                    <div>
                      <dt>What AI does</dt>
                      <dd>{p.ai}</dd>
                    </div>
                    <div>
                      <dt>What I do</dt>
                      <dd>{p.me}</dd>
                    </div>
                    <div>
                      <dt>How I check it</dt>
                      <dd>{p.check}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>
          </section>

          <section className={`${about.section} ${about.work}`} aria-labelledby="ai-own">
            <h2 id="ai-own" className={about.heading}>
              <Scramble text="What I keep in my own hands" />
            </h2>
            <ol className={about.principles}>
              {ownHands.map((o, i) => (
                <li key={o.title}>
                  <span className={about.num}>0{i + 1}</span>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={about.section} aria-labelledby="ai-wrong">
            <h2 id="ai-wrong" className={about.heading}>
              <Scramble text="When AI got it wrong" />
            </h2>
            <p className={about.lead}>Three moments from building this site, and what each one changed in how I work.</p>
            <ol className={styles.moments}>
              {moments.map((m) => (
                <li key={m.title}>
                  <h3>{m.title}</h3>
                  <dl>
                    <div>
                      <dt>What AI did</dt>
                      <dd>{m.ai}</dd>
                    </div>
                    <div>
                      <dt>What I did</dt>
                      <dd>{m.me}</dd>
                    </div>
                    <div>
                      <dt>What changed</dt>
                      <dd>{m.lesson}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>
          </section>

          <section className={about.section} aria-labelledby="ai-proof">
            <h2 id="ai-proof" className={about.heading}>
              <Scramble text="Check it yourself" />
            </h2>
            <dl className={`${about.facts} ${styles.proof}`}>
              {proof.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>{p.href ? <a href={p.href}>{p.text}</a> : p.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${about.section} ${about.work}`} aria-labelledby="ai-team">
            <h2 id="ai-team" className={about.heading}>
              <Scramble text="[What I could bring to your team]" />
            </h2>
            <div>
              <p className={styles.teamLead}>
                [A few lines on the AI workflows I could set up in a team in my first months, kept modest and concrete.]
              </p>
            </div>
          </section>

          <section className={about.closer} aria-labelledby="ai-closer">
            <h2 id="ai-closer" className={home.closingTitle}>
              <Scramble text="[Curious how I’d work in your team?]" />
            </h2>
            <p className={home.closingText}>I’d love to hear what you’re working on. Send me a message and let’s talk.</p>
            <a href={links.email} className={home.mail} data-lit="light">
              <span>Contact me</span>
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </section>
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
