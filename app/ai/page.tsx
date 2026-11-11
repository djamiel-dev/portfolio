import type { Metadata } from "next";
import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { Scramble } from "@/components/home/Skills";
import about from "../about/about.module.css";
import { SkillTabs } from "./SkillTabs";
import styles from "./ai.module.css";

// Wireframe: the layout is set, the content follows. Text in [brackets] is a placeholder.

export const metadata: Metadata = {
  title: "How I use AI – Djamiel Saou",
};

// The 30-second version, for the visitor who reads nothing else
const short = [
  { title: "Range", text: "AI lets me explore more directions and test sooner." },
  { title: "Judgement", text: "The decisions are mine, and I can explain and test the code it writes." },
  { title: "Checks", text: "Nothing goes live on AI’s word: every step is reviewed and tested." },
];

// The same skills as on the homepage, in no fixed order. AI itself runs through all of them.
const phases = [
  {
    title: "Research & problem framing",
    ai: "Finds research that actually fits my problem statement, so I spend my time reading instead of searching. It turns interview transcripts into briefings and next steps, and helps draft research questions and scenarios that make the problem concrete.",
    me: "I talk to stakeholders to understand what the business needs, and keep them involved as the picture changes. I set the problem statement and the research questions, and decide which sources matter.",
    check: "I read the key sources myself and form a rough view first. That view steers AI towards more research, or towards the conclusions it writes up.",
  },
  {
    title: "UI/UX & design systems",
    ai: "Widens the options before the style is set, with early directions from Claude Design or Figma AI. Through MCP it works in tools like Figma, component-based and with Auto Layout, so the design carries over cleanly into development.",
    me: "I start from a moodboard I put together myself, pull what a client’s style guide already fixes into both the AI project and the design file, and design the final UI in Figma or straight in code.",
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

// Where the ideas come from, and the two questions taste asks of anything AI makes
const taste = [
  {
    title: "The spark comes from outside",
    text: "Left to itself, AI drifts towards the average. My best starting points come from users, research and references I collect myself: award-winning sites, apps I admire, things I notice away from my desk. When I give AI a concrete example and say what to keep and what to drop, the result comes right much faster than when it invents the concept itself.",
  },
  {
    title: "Does it fit?",
    text: "The first question I ask of anything AI makes: does this fit the problem, the users and the brand? A polished answer to the wrong question is still wrong.",
  },
  {
    title: "Is it good enough?",
    text: "AI output often looks finished before it is. Seeing that gap, and knowing how to close it, takes taste, and I keep training mine by looking at a lot of good work.",
  },
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

export default function HowIUseAI() {
  return (
    <div className={home.root} data-sky="night">
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
            <SkillTabs
              skills={phases}
              title={
                <h2 id="ai-phases" className={about.heading}>
                  <Scramble text="Where AI fits, skill by skill" />
                </h2>
              }
            />
          </section>

          <section className={`${about.section} ${about.work}`} aria-labelledby="ai-taste">
            <div>
              <h2 id="ai-taste" className={about.heading}>
                <Scramble text="The more AI can make, the more taste matters" />
              </h2>
              <p className={about.lead}>
                AI can make almost anything I ask for, and fast. But it doesn’t know what’s worth making. Ideas start with
                people and the world outside the screen, and taste decides what survives.
              </p>
            </div>
            <ol className={about.principles}>
              {taste.map((t, i) => (
                <li key={t.title}>
                  <span className={about.num}>0{i + 1}</span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
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

          <section className={`${about.section} ${about.work}`} aria-labelledby="ai-team">
            <h2 id="ai-team" className={about.heading}>
              <Scramble text="What I can bring to a team" />
            </h2>
            <div>
              <p className={styles.teamLead}>
                Design systems and Auto Layout once changed how design teams work. AI is that shift now, and I can help a
                team make it: a shared setup the whole team’s AI tools work from, a design system AI can build with, and
                prototypes to test before anyone builds. Not to replace anyone’s craft, but to give everyone more room for it.
              </p>
            </div>
          </section>

          <section className={about.closer} aria-labelledby="ai-closer">
            <h2 id="ai-closer" className={home.closingTitle}>
              <Scramble text="Curious how I’d work in your team?" />
            </h2>
            <p className={home.closingText}>I’d love to hear what you’re working on. Send me a message and let’s talk.</p>
            <a href={links.email} className={home.mail} data-lit="">
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
