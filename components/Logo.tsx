type Props = { size?: number };

/** Isometric cube mark. Inherits colour from the surrounding text. */
export function LogoMark({ size = 22 }: Props) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 2l9 5v10l-9 5-9-5V7z" />
      <path d="M3 7l9 5 9-5" />
      <path d="M12 12v10" />
    </svg>
  );
}
