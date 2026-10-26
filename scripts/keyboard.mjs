// Tabs through the page and lists each focused element and whether its focus is visible.
// Also checks that reduced motion still draws the particle field.
import { chromium } from "playwright";

const url = process.env.SITE_URL ?? "http://localhost:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await page.goto(url, { waitUntil: "networkidle" });

for (let i = 0; i < 25; i++) {
  await page.keyboard.press("Tab");
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      text: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
      outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
      size: `${Math.round(r.width)}×${Math.round(r.height)}`,
    };
  });
  if (!info) break;
  console.log(`${String(i + 1).padStart(2)}. ${info.outline ? "focus ok " : "NO FOCUS "} ${info.size.padEnd(9)} ${info.text}`);
}

const painted = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
  let n = 0;
  for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
  return n;
});
console.log(`\nReduced motion: ${painted > 1000 ? "still field drawn" : "FIELD EMPTY"} (${painted} painted pixels)`);
await browser.close();
