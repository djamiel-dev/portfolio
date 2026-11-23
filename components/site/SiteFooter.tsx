import { links } from "@/content/site";
import home from "@/components/home/home.module.css";

/** The footer of every page: the name on the left, mail and phone on the right. */
export function SiteFooter() {
  return (
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
  );
}
