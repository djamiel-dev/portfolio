// Screenshots of the design reference and the Next.js build, side by side.
// Usage: npm run dev (in another terminal), then `npm run screenshots`.
// Reduced motion is on so the particle field shows the same still sphere in both.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "screenshots");
const targets = {
  reference: pathToFileURL(path.join(root, "design/homepage.html")).href,
  next: process.env.SITE_URL ?? "http://localhost:3000",
};
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};
// Elements measured in both versions to spot layout differences
const probes = {
  nav: "header nav",
  heroTitle: "h1",
  heroButton: "h1 + div a",
  workHeading: "#work h2",
  firstCard: "#work a",
  footerTitle: "footer h2",
  pageHeight: "body",
};

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const report = {};

for (const [vpName, viewport] of Object.entries(viewports)) {
  for (const [name, url] of Object.entries(targets)) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce", deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, `${vpName}-${name}-fold.png`) });
    await page.screenshot({ path: path.join(outDir, `${vpName}-${name}-full.png`), fullPage: true });

    report[`${vpName}/${name}`] = await page.evaluate((probes) => {
      const out = {};
      for (const [key, sel] of Object.entries(probes)) {
        const el = document.querySelector(sel);
        if (!el) { out[key] = null; continue; }
        const r = el.getBoundingClientRect();
        out[key] = { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) };
      }
      out.scrollWidth = document.documentElement.scrollWidth;
      return out;
    }, probes);
    await page.close();
  }
}

await browser.close();
await writeFile(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));

// Print differences per probe (next minus reference)
for (const vp of Object.keys(viewports)) {
  const ref = report[`${vp}/reference`];
  const nxt = report[`${vp}/next`];
  console.log(`\n${vp}`);
  for (const key of Object.keys(ref)) {
    const a = ref[key], b = nxt[key];
    if (typeof a === "number") { console.log(`  ${key.padEnd(12)} ref ${a}  next ${b}`); continue; }
    if (!a || !b) { console.log(`  ${key.padEnd(12)} missing in ${a ? "next" : "reference"}`); continue; }
    const d = ["x", "y", "w", "h"].map((k) => `${k}${b[k] - a[k] >= 0 ? "+" : ""}${b[k] - a[k]}`).join(" ");
    console.log(`  ${key.padEnd(12)} ${d}`);
  }
}
