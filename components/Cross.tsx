import styles from "./Cross.module.css";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/** The "+" that marks where frame lines cross. Parent must be position: relative. */
export function Cross({ corner }: { corner: Corner }) {
  return (
    <span aria-hidden="true" className={`${styles.cross} ${styles[corner]}`}>
      +
    </span>
  );
}
