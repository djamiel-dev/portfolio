import { cases } from "@/content/cases";
import { CaseCard } from "./CaseCard";
import { Cross } from "./Cross";
import styles from "./WorkGrid.module.css";

export function WorkGrid() {
  // Odd cases in the left column, even cases in the lower right column.
  // `order` keeps 01–04 in sequence once the columns collapse on mobile.
  const left = cases.filter((_, i) => i % 2 === 0);
  const right = cases.filter((_, i) => i % 2 === 1);
  const orderOf = (num: string) => ({ order: Number(num) });

  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <Cross corner="top-left" />
      <Cross corner="top-right" />
      <div className={`mono ${styles.head}`}>
        <h2 id="work-title" className={styles.heading}>
          Selected work
        </h2>
        <span className={styles.count}>[{String(cases.length).padStart(2, "0")}]</span>
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          {left.map((item) => (
            <CaseCard key={item.num} item={item} style={orderOf(item.num)} />
          ))}
        </div>
        <div className={`${styles.column} ${styles.offset}`}>
          {right.map((item) => (
            <CaseCard key={item.num} item={item} style={orderOf(item.num)} />
          ))}
        </div>
      </div>
    </section>
  );
}
