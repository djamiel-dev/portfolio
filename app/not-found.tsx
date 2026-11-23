import type { Metadata } from "next";
import home from "@/components/home/home.module.css";
import { Scramble } from "@/components/home/Skills";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import about from "./about/about.module.css";

// A page that doesn't exist: daylight, the nav and footer of About, one line and the way back.

export const metadata: Metadata = {
  title: "Page not found – Djamiel Saou",
};

export default function NotFound() {
  return (
    <div className={home.root} data-sky="day">
      <SiteNav />

      <main id="main">
        <div className={about.page}>
          {/* In the middle of the page, as the closing question on About */}
          <section className={about.closer} aria-labelledby="lost-title">
            <h1 id="lost-title" className={home.closingTitle}>
              <Scramble text="Page not found" />
            </h1>
            <p className={home.closingText}>This page doesn’t exist, or it has moved.</p>
            <p className={home.closingText}>
              <a href="/" className={about.textLink}>
                <span>Back to the homepage</span>
              </a>
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
