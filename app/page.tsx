export default function Home() {
  return (
    <main style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "4rem var(--page-gutter)" }}>
      <p className="mono" style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
        [00] Setup
      </p>
      <h1
        style={{
          marginTop: "1rem",
          fontSize: "2.375rem",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
        }}
      >
        Djamiel – <span style={{ color: "var(--brand)" }}>homepage</span> coming in step 3
      </h1>
    </main>
  );
}
