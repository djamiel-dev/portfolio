import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { links } from "@/content/site";
import { CaseCursor } from "@/components/home/CaseCursor";
import home from "@/components/home/home.module.css";
import { Scramble } from "@/components/home/Skills";
import { Sky } from "@/components/home/Sky";
import about from "@/app/about/about.module.css";
import styles from "@/components/case/case.module.css";
import { Lamp } from "@/components/case/Lamp";
import { NextCase } from "@/components/case/NextCase";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { GalleryLoop } from "./GalleryLoop";
import st from "./st.module.css";

// Case 03. Content first: the layout reuses case 01's classes and gets its own design in a later step.
// Stuurmen and the screens may be shown (permission given), people only by their role, no year.
// Not tested with real clients and no earlier rounds to show, so the page tells the research, the decisions and the
// handover. Never claim the tool is in use: what happened after the handover is unknown.

export const metadata: Metadata = {
  title: "Stuurmen – Djamiel Saou",
};

// The 30-second version, for the recruiter who reads nothing else
const short = [
  {
    title: "Problem",
    text: "The workshop where clients choose their brand assets went to showing and explaining past work, not to deciding.",
  },
  {
    title: "What I did",
    text: "Interviews, research into the sales process, a flowchart and the design. Then I built the front-end in Next.js.",
  },
  {
    title: "Result",
    text: "Stuurmen saw it as the solution and planned to build on it. I handed over the design, front-end and technical advice.",
  },
];

const facts = [
  { label: "Role", value: "Researcher, product designer and front-end developer" },
  { label: "Team", value: "Just me, guided by the two owners and a creative developer" },
  { label: "Context", value: "Internship at an award-winning branding agency in Eindhoven" },
  { label: "Built with", value: "Figma, Next.js, Framer Motion" },
];

// What the research turned up
const findings = [
  {
    title: "Clients don’t know what they don’t know",
    text: "Some thought Stuurmen only designed websites and didn’t build them, or only made concept mockups. Most missed work wasn’t a no: clients just never pictured the next step.",
  },
  {
    title: "The work existed, but nobody could see it",
    text: "Years of brand assets sat in project folders on a server. Showing a client three directions for a business card meant digging them up first.",
  },
  {
    title: "These clients buy on craft, not on a pitch",
    text: "Founders of ambitious, premium companies. They respond to quality and credibility, and push back on anything that feels like selling.",
  },
];

// Stuurmen's route with a client, and where the tool fits in
const journey = [
  { title: "First meeting" },
  { title: "Proposal and kick-off" },
  { title: "Strategy and brand design" },
  {
    title: "The brand-experience finder",
    text: "Sent by email, so the client can browse and choose in their own time.",
    tool: true,
  },
  { title: "Brand experience workshop" },
  { title: "Making the brand assets" },
];

// Decision 2: one wish, from the empty search to the list
const wishSteps = [
  {
    label: "Nothing found",
    text: "Not a dead end: we haven’t made this yet, but that doesn’t mean we can’t.",
    src: "/images/cases/stuurmen/wish-1-search.webp",
    alt: "An empty search: we have not yet made what you are looking for, but that doesn’t mean we can’t, with a button to add it to the wishlist.",
    width: 992,
    height: 744,
  },
  {
    label: "The wish",
    text: "A description, a category and an image of something similar.",
    src: "/images/cases/stuurmen/wish-2-form.webp",
    alt: "The wish form: a general description, a phone case with a loop that goes around your finger, and a category to pick.",
    width: 1020,
    height: 765,
  },
  {
    label: "On their list",
    text: "Next to the saved work, where Stuurmen sees it before the workshop.",
    src: "/images/cases/stuurmen/wish-3-list.webp",
    alt: "Your wishes on the client’s list: a phone case with a ring on the back, in the style of the company, with an Edit button.",
    width: 1244,
    height: 933,
  },
];

// Decision 3: the four categories of the main page, in Stuurmen's order
const categories = [
  {
    src: "/images/cases/stuurmen/category-web.webp",
    alt: "Web design and development: a website on a phone, a sound piece and a dark web page.",
  },
  {
    src: "/images/cases/stuurmen/category-print.webp",
    alt: "Print and packaging: a wine box, a Triple and Crown race car and a men’s skincare line.",
  },
  {
    src: "/images/cases/stuurmen/category-identity.webp",
    alt: "Corporate identity: a thank-you card, a team jacket and an enamel pin.",
  },
  {
    src: "/images/cases/stuurmen/category-environmental.webp",
    alt: "Environmental design: a conference stand, a Triple and Crown sign on a brick wall and an exhibition booth.",
  },
];

const building = [
  {
    title: "Their stack, so their team can run it",
    text: "Next.js, because Stuurmen builds in it. Framer Motion for the animations, which their developers already knew.",
  },
  {
    title: "New work without a developer",
    text: "I advised connecting it to Storyblok, the CMS Stuurmen already uses, so adding a project is content work, not code.",
  },
  {
    title: "Fast, because slow kills inspiration",
    text: "A gallery full of images has to load quickly. Server-side rendering and lazy loading were requirements from the start.",
  },
];

// What I wrote down for the back-end, for Stuurmen's developers to connect
const backend = ["Accounts by email", "Managing the work", "Lists that Stuurmen can see", "Wishes they can review and pick up"];

// The result: what I handed over
const handedOver = [
  { title: "The design", text: "Every screen in Figma, built from Stuurmen’s own design files." },
  { title: "The front-end", text: "In Next.js and Framer Motion, ready for the back-end and the CMS." },
  { title: "An advice document", text: "The research, every design decision and the technical requirements." },
];

export default function Stuurmen() {
  return (
    <div className={home.root} data-e-root>
      <Sky />
      <SiteNav page="projects" />

      <main id="main">
        <div className={about.page} data-zone="day">
          <section className={`${about.intro} ${styles.intro}`} aria-labelledby="case-title">
            <div>
              <p className={about.label}>Case 03 · Stuurmen</p>
              <h1 id="case-title" className={about.title}>
                Clients choose before the workshop, not during it.
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

          {/* The gallery the client browses: a whole category page, scrolling through in a loop */}
          <GalleryLoop
            src="/images/cases/stuurmen/gallery-print.webp"
            alt="The Print and packaging category of the brand-experience finder: a search field and a gallery of Stuurmen’s work, such as packaging, business cards, a Triple and Crown race car and truck, and a men’s skincare line."
            width={2400}
            height={3420}
          />

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
              <Scramble text="A workshop for deciding that turned into a presentation" />
            </h2>
            <p className={about.lead}>
              Stuurmen builds brands for premium companies, and every client follows the same route: strategy, brand
              design, then the brand experience. That’s everything the brand ends up on, from business cards and packaging
              to signage and the website. Which of those to make is decided in one workshop.
            </p>
            {/* The workshop in two rows: what it was meant for (lit, as light means "on" on the homepage),
                and where the time went instead */}
            <div className={st.workshop}>
              <p className={about.label}>The brand experience workshop</p>
              <dl className={st.split}>
                <div data-on="">
                  <dt>Meant for</dt>
                  <dd>
                    <span>Deciding what to make</span>
                  </dd>
                </div>
                <div>
                  <dt>Went to</dt>
                  <dd>
                    <span>Showing past work</span>
                    <span>Explaining it</span>
                    <span>Justifying it</span>
                  </dd>
                </div>
              </dl>
              <p className={st.workshopNote}>
                That workshop ran long. Clients came with a short list and little idea of what else was possible.
              </p>
            </div>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-research">
            <p className={about.label}>The research</p>
            <h2 id="case-research" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Not a lack of inspiration, but no place to see it" />
            </h2>
            {/* The research text on the left, a photo from Stuurmen beside it */}
            <div className={st.researchIntro}>
              <div>
                <p className={about.lead}>
                  The brief said clients lacked inspiration. So I interviewed both owners: one looks at the agency from development and
                  sales, the other from design and brand strategy. Then I mapped how a client moves through Stuurmen from first meeting to delivery. I also
                  looked at how other agencies show their work, and what makes inspiration tools work or fail.
                </p>
                <p className={about.body}>
                  The answer was more specific than the brief. Clients weren’t short on ideas: they had no way to see what
                  Stuurmen could make for them.
                </p>
              </div>
              <figure className={st.photo}>
                <Image
                  src="/images/cases/stuurmen/research-room.webp"
                  alt="A meeting room behind glass with a pink gradient of dots, two people seen only as silhouettes."
                  width={1600}
                  height={1068}
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </figure>
            </div>
            {/* Three findings side by side. What each changed in the tool comes later, in the decisions */}
            <ul className={styles.findings}>
              {findings.map((f) => (
                <li key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-moment">
            <p className={about.label}>The concept</p>
            <h2 id="case-moment" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="A tool for one moment: right before the workshop" />
            </h2>
            <p className={about.lead}>
              Not a public gallery, but a tool Stuurmen sends to a client once strategy and brand design are done. The
              client browses past work in their own time and saves what speaks to them. By the workshop, both sides know
              where to start.
            </p>
            {/* The route as stops along one line, like the filament on the homepage. Scrolling draws the line from
                stop to stop and the tool's stop lights up; without scroll-driven animation it is simply drawn and lit. */}
            <ol className={st.route} aria-label="Stuurmen’s route with a client">
              {journey.map((j, i) => (
                <li
                  key={j.title}
                  data-tool={j.tool ? "" : undefined}
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className={st.stop} aria-hidden="true" />
                  {j.tool && <p className={`${about.label} ${st.toolLabel}`}>The tool</p>}
                  <h3>{j.title}</h3>
                  {j.text && <p>{j.text}</p>}
                  {/* The tool itself, in the route: the top of the gallery, revealed as its lamp comes on */}
                  {j.tool && (
                    <div className={st.toolScreen}>
                      <Image
                        src="/images/cases/stuurmen/gallery-print.webp"
                        alt=""
                        width={2400}
                        height={3420}
                        sizes="(max-width: 768px) 90vw, 300px"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>

            {/* Every route through the tool, mapped before the screens were designed. The chart on the same grey as the
                other images (its white ground multiplies away); at this size it shows the shape. The chart itself is the
                link to the full size, with "View full flowchart" at the pointer, as the hero of case 02. */}
            <figure className={st.flow}>
              <figcaption className={st.flowText}>
                <p>Every route through the tool, mapped before the screens: browsing, saving, searching and wishing.</p>
              </figcaption>
              <a
                href="/images/cases/stuurmen/flowchart-routes.webp"
                target="_blank"
                rel="noopener noreferrer"
                className={st.flowChart}
                data-case
                data-cursor="View full flowchart"
              >
                <span className="visually-hidden">View the full flowchart (opens in a new tab)</span>
                <Image
                  src="/images/cases/stuurmen/flowchart-routes.webp"
                  alt="Flowchart of the tool: from logging in to the main page, then five routes: opening a product, saving from a hover, browsing a category and searching, adding a wish, and checking and editing the list of interests. A search without results leads to the wish form."
                  width={1880}
                  height={1640}
                  sizes="(max-width: 768px) 100vw, 760px"
                />
              </a>
            </figure>
            <CaseCursor className={home.caseCursor} />
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-list">
            <p className={about.label}>Decision 1</p>
            <h2 id="case-list" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="The client saves what they like, and Stuurmen sees it" />
            </h2>
            <p className={about.lead}>
              Looking alone doesn’t prepare anyone. So every piece of work can be added to a personal list: with one
              click on hover, or from the detail view, which says what it is and for which client it was made.
            </p>
            <p className={about.body}>
              Clients log in with their email, so the list is theirs and Stuurmen can see it without asking. Saving also
              makes clients weigh each piece: do I want this for my brand? That turns browsing into choosing.
            </p>

            {/* The decision as one move, in two crops: saving on the left, where it lands on the right */}
            <div className={st.pair}>
              <figure>
                <div className={st.crop}>
                  <Image
                    src="/images/cases/stuurmen/save-detail.webp"
                    alt="Detail view of product packaging for premium wine bottles, made for Impossible Drinks, with an Add to list button."
                    width={1710}
                    height={1425}
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
                <figcaption>
                  <span className={about.label}>Save</span>
                  From the detail view, or with one click on hover.
                </figcaption>
              </figure>
              <figure>
                <div className={st.crop}>
                  <Image
                    src="/images/cases/stuurmen/save-list.webp"
                    alt="Your list of interesting brand experiences: a conference stand and billboard designs, each with its category and a button to remove it."
                    width={1890}
                    height={1575}
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
                <figcaption>
                  <span className={about.label}>The list</span>
                  Theirs, ready for the workshop, and Stuurmen sees the same list.
                </figcaption>
              </figure>
            </div>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-wish">
            <p className={about.label}>Decision 2</p>
            <h2 id="case-wish" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="No result isn’t a dead end, it’s a wish" />
            </h2>
            <p className={about.lead}>
              Search has a risk: a client looks for something Stuurmen hasn’t made yet, finds nothing and concludes it
              can’t be done. That’s the opposite of what the tool is for.
            </p>
            <p className={about.body}>
              So an empty search says it plainly: we haven’t made this yet, but that doesn’t mean we can’t. The client can
              describe what they have in mind, pick a category and add an image of something similar. The wish lands on
              their list, next to the saved work. And Stuurmen learns what its clients are looking for.
            </p>

            {/* One wish from start to end, in three crops: the empty search, the form, and the wish on the list */}
            <ol className={st.steps} aria-label="From an empty search to a wish on the list">
              {wishSteps.map((w) => (
                <li key={w.label}>
                  <div className={`${st.crop} ${st.wide}`}>
                    <Image src={w.src} alt={w.alt} width={w.width} height={w.height} sizes="(max-width: 768px) 100vw, 440px" />
                  </div>
                  <p className={`${about.label} ${st.stepLabel}`}>{w.label}</p>
                  <p>{w.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-work">
            <p className={about.label}>Decision 3</p>
            <h2 id="case-work" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Show the work, not a price list" />
            </h2>
            <p className={about.lead}>
              Inspiration tools lose people the moment they start to feel like a shop. And Stuurmen’s clients push back on
              anything that feels like selling. So there are no prices: those belong in the conversation, where they can
              be tailored.
            </p>
            <p className={about.body}>
              The work is ordered the way Stuurmen sells it: web design and development, print and packaging, corporate
              identity and environmental design. Three pieces per category up front, the rest one click away, with search
              inside each category. The design follows Stuurmen’s own brand, built from their design files, so the tool
              feels like part of the agency.
            </p>

            {/* The main page, cut into its four categories: the order Stuurmen sells in, three pieces each, no prices */}
            <figure className={st.categories}>
              <ul>
                {categories.map((c) => (
                  <li key={c.src} className={`${st.crop} ${st.screen}`}>
                    <Image src={c.src} alt={c.alt} width={1600} height={900} sizes="(max-width: 768px) 100vw, 660px" />
                  </li>
                ))}
              </ul>
              <figcaption className={styles.small}>
                The main page, category by category: three pieces each, the rest one click away.
              </figcaption>
            </figure>
          </section>

          <section className={`${about.section} ${styles.roomy}`} aria-labelledby="case-build">
            <p className={about.label}>Building it</p>
            <h2 id="case-build" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="A front-end their developers could pick up" />
            </h2>
            <p className={about.lead}>
              I built the front-end in Next.js, so Stuurmen’s developers only had to connect the back-end and the CMS. I
              wrote down what that back-end needed.
            </p>

            {/* The handover in two columns: my part (lit, as light means "on") and what their team connects */}
            <div className={st.handover}>
              <section aria-labelledby="built-mine">
                <h3 id="built-mine" className={st.side} data-on="">
                  My part: the front-end and the advice
                </h3>
                <ul>
                  {building.map((b) => (
                    <li key={b.title}>
                      <h4>{b.title}</h4>
                      <p>{b.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="built-theirs">
                <h3 id="built-theirs" className={st.side}>
                  Their team’s part: the back-end
                </h3>
                <ul>
                  {backend.map((b) => (
                    <li key={b}>
                      <h4>{b}</h4>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </section>
        </div>

        {/* Result: the page turns to night and the lamp is on, as at the end of the homepage */}
        <div className={styles.night} data-zone="night">
          <section className={styles.result} aria-labelledby="case-result">
            <Lamp />
            <p className={about.label}>Result</p>
            <h2 id="case-result" className={`${about.heading} ${styles.heading}`}>
              <Scramble text="Handed over as the solution they were looking for" />
            </h2>
            <p className={about.lead}>
              Stuurmen saw the tool as the answer to their problem and planned to build on it. I handed over three things,
              so their team could finish it without me.
            </p>
            {/* What was handed over, in the light of the lamp, as the result cards of case 02 */}
            <ul className={st.handed}>
              {handedOver.map((h) => (
                <li key={h.title}>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* The same preview as case 04 on the homepage; the link text already says where it goes */}
          <NextCase
            href="/work/moraira/"
            title="04 Moraira Dream Villas"
            image={{ src: "/images/cases/moraira-laptop.webp", width: 1600, height: 1680 }}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
