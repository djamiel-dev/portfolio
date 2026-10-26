// Accessibility (axe) and Lighthouse audit of a running build.
// Usage: npm run build && npx next start -p 3100, then `npm run audit`.
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { execFileSync } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const url = process.env.SITE_URL ?? "http://localhost:3100";
const outDir = path.join(process.cwd(), "screenshots", "audit");
await mkdir(outDir, { recursive: true });

// --- axe: WCAG 2.2 A/AA plus best practices, desktop and mobile ---
const browser = await chromium.launch();
let axeViolations = 0;
for (const [name, viewport] of Object.entries({ desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } })) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  axeViolations += violations.length;
  console.log(`\naxe ${name}: ${violations.length} violation(s)`);
  for (const v of violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
    for (const n of v.nodes.slice(0, 5)) console.log(`     - ${n.target.join(" ")}  ${n.failureSummary?.split("\n")[1]?.trim() ?? ""}`);
  }
  await context.close();
}
await browser.close();

// --- Lighthouse: mobile (default) and desktop preset ---
for (const preset of ["mobile", "desktop"]) {
  const file = path.join(outDir, `lighthouse-${preset}.json`);
  const args = [url, "--quiet", "--output=json", `--output-path=${file}`, "--chrome-flags=--headless=new"];
  if (preset === "desktop") args.push("--preset=desktop");
  execFileSync("npx", ["lighthouse", ...args], { stdio: "inherit" });
  const lhr = JSON.parse(await readFile(file, "utf8"));
  const scores = Object.values(lhr.categories).map((c) => `${c.title} ${Math.round(c.score * 100)}`).join(" · ");
  console.log(`\nLighthouse ${preset}: ${scores}`);
  const failing = Object.values(lhr.audits).filter(
    (a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "manual",
  );
  for (const a of failing) console.log(`  ${a.id}: ${a.title}${a.displayValue ? ` (${a.displayValue})` : ""}`);
}

process.exitCode = axeViolations ? 1 : 0;
