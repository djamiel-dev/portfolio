import type { CSSProperties } from "react";
import type { Case } from "@/content/cases";
import styles from "./CaseCard.module.css";

type Props = { item: Case; style?: CSSProperties };

export function CaseCard({ item, style }: Props) {
  const { media } = item;
  return (
    <a href={item.href} className={styles.card} style={style}>
      <div className={styles.frame}>
        <div className={styles.bar}>
          <span>{item.label}</span>
          <span className={styles.num}>[{item.num}]</span>
        </div>
        <div
          className={`${styles.media} ${media.tone === "dark" ? styles.dark : ""}`}
          style={{ aspectRatio: media.aspect }}
        >
          <span className={styles.caption}>{media.caption}</span>
          {media.badge && (
            <span aria-hidden="true" className={styles.badge}>
              {media.badge}
            </span>
          )}
          {media.marker && <span aria-hidden="true" className={styles.marker} />}
        </div>
      </div>
      <div className={styles.footer}>
        <h3 className={styles.title}>{item.outcome}</h3>
        <p className={styles.meta}>{item.meta}</p>
      </div>
    </a>
  );
}
