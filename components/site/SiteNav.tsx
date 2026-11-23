import { links } from "@/content/site";
import home from "@/components/home/home.module.css";
import { Menu } from "@/components/home/Menu";
import { NavName } from "@/components/home/NameHandoff";

type Page = "home" | "projects" | "ai" | "about";
type Item = { href: string; label: string; current?: "page"; newTab?: boolean };

// The resume is a pdf: it opens in its own tab, so the site stays where it was
const newTab = { target: "_blank", rel: "noopener" };

/**
 * The bar at the top of every page, with the skip link before it. On the homepage the name is empty until the
 * greeting hands it over (NavName) and Projects jumps to the work below; on every other page the name is there
 * and links home. The page you are on keeps its line (aria-current); on a case page that is Projects.
 */
export function SiteNav({ page }: { page?: Page }) {
  const onHome = page === "home";
  const work = onHome ? "#work" : "/#work";
  const current = (p: Page) => (page === p ? ("page" as const) : undefined);
  const items: Item[] = [
    { href: work, label: "Projects", current: current("projects") },
    { href: links.ai, label: "How I use AI", current: current("ai") },
    { href: links.about, label: "About", current: current("about") },
    { href: links.resume, label: "Resume", newTab: true },
    { href: links.email, label: "Contact me" },
  ];

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={home.top} data-bar={onHome || undefined}>
        {onHome ? (
          <NavName className={home.home} />
        ) : (
          <a href="/" className={home.home} data-shown="">
            Djamiel Saou
          </a>
        )}
        <nav aria-label="Main" className={home.nav}>
          {items.map((i) => (
            <a key={i.label} href={i.href} aria-current={i.current} {...(i.newTab ? newTab : {})}>
              <span>{i.label}</span>
            </a>
          ))}
        </nav>
        <Menu className={home.menu} summaryClassName={home.menuButton} panelClassName={home.menuPanel}>
          {items.map((i) => (
            <a key={i.label} href={i.href} aria-current={i.current} {...(i.newTab ? newTab : {})}>
              {i.label}
            </a>
          ))}
        </Menu>
      </header>
    </>
  );
}
