import type { Metadata } from "next";
import Link from "next/link";
import styles from "./index.module.css";

export const metadata: Metadata = {
  title: "Exploration – three directions",
};

const routes = [
  { href: "/explore/a", name: "A · Construction grid", note: "Close to version J. Particles build the name on a visible grid." },
  { href: "/explore/b", name: "B · Research wall", note: "Cases as pinned evidence that folds into the product." },
  { href: "/explore/c", name: "C · Departure board", note: "Cases as departures with an honest status." },
  { href: "/", name: "J · Current version", note: "The stable homepage on main." },
];

export default function ExploreIndex() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Exploration</h1>
      <ul className={styles.list}>
        {routes.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className={styles.link}>
              <span className={styles.name}>{r.name}</span>
              <span className={styles.note}>{r.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
