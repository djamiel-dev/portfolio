// One small line icon per skill: 24px grid, one stroke weight, round joins.

const icons: React.ReactNode[] = [
  // Research & user testing: a magnifier over a person
  <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21" />
    <circle cx="10.5" cy="9" r="1.75" />
    <path d="M7.5 13.5c.8-1.2 1.8-1.75 3-1.75s2.2.55 3 1.75" />
  </>,
  // UI/UX design: a screen layout
  <>
    <rect x="3" y="4" width="18" height="16" rx="1.5" />
    <path d="M3 9h18M9 9v11" />
  </>,
  // Frontend development: code brackets
  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />,
  // Prototyping: a pointer clicking
  <>
    <path d="M6 4l12.5 7-5.5 1.5L10.5 18z" />
    <path d="M13 12.5l4.5 4.5" />
  </>,
  // AI workflows: a spark with smaller sparks
  <>
    <path d="M10 3.5l1.6 4.4a3 3 0 001.8 1.8l4.4 1.6-4.4 1.6a3 3 0 00-1.8 1.8L10 19.1l-1.6-4.4a3 3 0 00-1.8-1.8L2.2 11.3l4.4-1.6a3 3 0 001.8-1.8z" />
    <path d="M19 3v4M17 5h4M19.5 16.5v3M18 18h3" />
  </>,
  // Design systems: stacked layers
  <>
    <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
    <path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" />
  </>,
];

export function SkillVisual({ index, className }: { index: number; className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[index]}
    </svg>
  );
}
