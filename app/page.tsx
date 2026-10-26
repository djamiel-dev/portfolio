import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { WorkGrid } from "@/components/WorkGrid";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="top" className={styles.shell}>
        <div className={styles.frame}>
          <Nav />
          <main id="main">
            <Hero />
            <WorkGrid />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
