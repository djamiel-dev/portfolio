import type { Metadata } from "next";
import Image from "next/image";
import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { Scramble } from "@/components/home/Skills";
import styles from "./about.module.css";

// Grey panes stand in for photos until they arrive; text in [brackets] is a placeholder.

export const metadata: Metadata = {
  title: "About – Djamiel Saou",
};

const principles = [
  {
    title: "Test early, with real people",
    text: "I put a clickable prototype in front of users before anything is final, and change course on what I see, not on what I assumed.",
  },
  {
    title: "Design it, then build it",
    text: "I build what I design myself, so nothing gets lost between the design and the live product.",
  },
  {
    title: "AI for range, my judgement for the choice",
    text: "I use AI to explore more directions and test sooner, but the decisions are mine, and I can explain and test the code it writes.",
  },
  {
    title: "Finish with a system",
    text: "A definition of done, a checklist before every release and automated checks for accessibility and speed, so the last 10% gets the same care as the first.",
  },
];

// Expanding cards: one open, the rest narrow strips. A card with an image shows it; the rest
// keep a note on which photo goes there. `focus` and `focusSm` are the object-position that keeps the faces in view
// in the open card on a wide screen and in the photo above the text on a phone.
type Hobby = {
  title: string;
  text: string;
  photo: string;
  image?: string;
  alt?: string;
  focus?: string;
  focusSm?: string;
};

const hobbies: Hobby[] = [
  {
    title: "Powerlifting",
    text: "I’m building towards the 2027 national championships.",
    photo: "(Photo: me on the platform, mid-lift)",
    image: "/images/about/powerlifting.jpg",
    alt: "Djamiel smiling under a loaded barbell in a squat rack, ready to squat",
    focus: "50% 15%",
    focusSm: "50% 15%",
  },
  {
    title: "Coaching",
    text: "Bringing out the best version of each person, working around their own obstacles and challenges.",
    photo: "(Photo: me coaching a client)",
    image: "/images/about/coaching.jpg",
    alt: "Djamiel and a lifter he coaches, both flexing, at a powerlifting meet",
    focus: "50% 60%",
    focusSm: "50% 37%",
  },
  {
    title: "Cooking",
    text: "Beating the average Western diet every day, with better flavours.",
    photo: "(Photo: something I cooked)",
    image: "/images/about/cooking.jpg",
    alt: "A plate of spiced chicken with chilli, rice and a fresh carrot and cucumber salad",
    focus: "50% 55%",
    focusSm: "50% 55%",
  },
  {
    title: "Travel",
    text: "I’m adventurous, so I’d rather try something new than go back to what I know.",
    photo: "(Photo: a place I visited)",
    image: "/images/about/travel-2.jpg",
    alt: "Djamiel pulling a surprised face in front of the Colosseum in Rome",
    focus: "50% 20%",
    focusSm: "50% 24%",
  },
  {
    title: "Gaming",
    text: "Less than I used to, but I’ve recently started sim racing.",
    photo: "(Photo: my sim racing setup)",
    image: "/images/about/gaming.jpg",
    alt: "Djamiel's sim racing rig with a steering wheel, and his ginger cat sitting in the seat",
    focus: "60% 50%",
    focusSm: "50% 40%",
  },
  {
    title: "Keyboards",
    text: "I build custom mechanical keyboards, picking and putting together every part myself.",
    photo: "(Photo: one of my keyboards)",
    image: "/images/about/keyboards.jpg",
    alt: "Hands typing on a custom mechanical keyboard with a green case and colourful keycaps",
    focus: "50% 100%",
    focusSm: "50% 61%",
  },
  {
    title: "Still curious",
    text: "I turned my hobby into my work, and I still go looking for inspiration in my own time.",
    photo: "(Photo: a side experiment on my screen)",
    image: "/images/about/curious.jpg",
    alt: "Djamiel at his desk at home with a headset on, working across two monitors",
    focus: "50% 30%",
    focusSm: "50% 10%",
  },
];

const facts = [
  { label: "Based in", value: "Tilburg, NL" },
  { label: "Education", value: "Bachelor’s in ICT & Media, graduated with the highest grade in my class" },
  { label: "Now", value: "Creative Product Developer at Boxplosive" },
  { label: "Coaching", value: "Powerlifting coach since 2022" },
  { label: "Languages", value: "Dutch, English" },
];

export default function About() {
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
          <a href="/#ai">
            <span>How I use AI</span>
          </a>
          <a href={links.about} aria-current="page">
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
          <a href="/#ai">How I use AI</a>
          <a href={links.about} aria-current="page">
            About
          </a>
          <a href={links.resume}>Resume</a>
          <a href={links.email}>Contact me</a>
        </Menu>
      </header>

      <main id="main">
        <div className={styles.page}>
          <section className={styles.intro} aria-labelledby="about-title">
            <div className={styles.introText}>
              <p className={styles.eyebrow}>About me</p>
              <h1 id="about-title" className={styles.title}>
                I don’t wait to be handed a task.
              </h1>
              <p className={styles.lead}>
                I take ownership of the problem and of what users really need, and help work out the steps it takes to
                find the right solution.
              </p>
            </div>
            <div className={styles.photo} data-tall>
              <Image
                src="/images/about/restaurant.jpg"
                alt="Djamiel smiling at a table in a colourful Japanese restaurant"
                fill
                sizes="(max-width: 48em) 100vw, 34vw"
                priority
                className={styles.portrait}
              />
            </div>
          </section>

          <section className={`${styles.section} ${styles.work}`} aria-labelledby="about-work">
            <h2 id="about-work" className={styles.heading}>
              <Scramble text="How I work" />
            </h2>
            <ol className={styles.principles}>
              {principles.map((p, i) => (
                <li key={p.title}>
                  <span className={styles.num}>0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.split} aria-labelledby="about-person">
            <div className={styles.photo}>
              <Image
                src="/images/about/terrace.jpg"
                alt="Djamiel smiling in a wicker chair on a sunny terrace"
                fill
                sizes="(max-width: 48em) 100vw, 50vw"
                className={styles.terrace}
              />
            </div>
            <div>
              <h2 id="about-person" className={styles.heading}>
                <Scramble text="What I’m like to work with" />
              </h2>
              <p className={styles.lead}>
                I think along by default. I’m fairly outgoing, I get on with almost everyone, and I’m honest, sometimes a
                little too honest. [In a team, that means you hear early when I think something won’t work, and why.]
              </p>
              <p className={styles.body}>
                Part of that comes from four years as a powerlifting coach, where my job is to get the best out of my
                clients. [It taught me to listen before I advise, give feedback people can act on, and keep them going
                when progress is slow.]
              </p>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="about-hobbies">
            <h2 id="about-hobbies" className={styles.heading}>
              <Scramble text="Outside work" />
            </h2>
            <ul className={styles.cards}>
              {hobbies.map((h) => (
                <li key={h.title} className={styles.card} tabIndex={0}>
                  {h.image ? (
                    <span
                      className={styles.cardPhoto}
                      data-image=""
                      style={{ "--crop": h.focus, "--crop-sm": h.focusSm } as React.CSSProperties}
                    >
                      <Image
                        src={h.image}
                        alt={h.alt ?? ""}
                        fill
                        sizes="(max-width: 48em) 100vw, 50vw"
                      />
                    </span>
                  ) : (
                    <span className={styles.cardPhoto}>{h.photo}</span>
                  )}
                  {/* Only for the eye, so a closed card still says what it is */}
                  <span className={styles.cardLabel} aria-hidden="true">
                    {h.title}
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{h.title}</span>
                    <span className={styles.cardText}>{h.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="about-facts">
            <h2 id="about-facts" className="visually-hidden">
              Facts
            </h2>
            <dl className={styles.facts}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.closer} aria-labelledby="about-closer">
            <h2 id="about-closer" className={home.closingTitle}>
              <Scramble text="Think I’d fit your team?" />
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
