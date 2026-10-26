// Puts the screenshots from explore-check side by side, one sheet per view.
// Usage: `npm run explore-check` first, then `node scripts/explore-sheet.mjs`.
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "screenshots", "explore");
const names = { J: "J · current", A: "A · Construction grid", B: "B · Research wall", C: "C · Departure board" };

const sheets = [
  { file: "sheet-desktop-1s.png", shots: "desktop-%-1s.png", cols: 2, width: 1440 },
  { file: "sheet-desktop-5s.png", shots: "desktop-%-5s.png", cols: 2, width: 1440 },
  { file: "sheet-mobile-1s.png", shots: "mobile-%-1s.png", cols: 4, width: 390 },
  { file: "sheet-mobile-5s.png", shots: "mobile-%-5s.png", cols: 4, width: 390 },
  { file: "sheet-desktop-reduced.png", shots: "desktop-%-reduced.png", cols: 2, width: 1440 },
];

const browser = await chromium.launch();
for (const sheet of sheets) {
  const cells = [];
  for (const [key, label] of Object.entries(names)) {
    const data = await readFile(path.join(dir, sheet.shots.replace("%", key)));
    cells.push(`<figure><figcaption>${label}</figcaption><img src="data:image/png;base64,${data.toString("base64")}"></figure>`);
  }
  const html = `<style>
    body { margin: 0; padding: 24px; background: #2a2a2a; font: 600 22px/1.2 system-ui, sans-serif; color: #fff; }
    main { display: grid; grid-template-columns: repeat(${sheet.cols}, ${sheet.width}px); gap: 24px; }
    figure { margin: 0; } figcaption { margin-bottom: 10px; }
    img { display: block; width: 100%; outline: 1px solid #555; }
  </style><main>${cells.join("")}</main>`;
  const page = await browser.newPage({ viewport: { width: sheet.cols * (sheet.width + 24) + 24, height: 600 }, deviceScaleFactor: 0.5 });
  await page.setContent(html);
  await page.screenshot({ path: path.join(dir, sheet.file), fullPage: true });
  await page.close();
  console.log(`wrote ${sheet.file}`);
}
await browser.close();
