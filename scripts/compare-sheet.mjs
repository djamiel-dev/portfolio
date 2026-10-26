// Combines the screenshots into side-by-side comparison sheets (reference | next).
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "screenshots");
const img = async (f) => `data:image/png;base64,${(await readFile(path.join(dir, f))).toString("base64")}`;

const sheets = [
  ["desktop-fold", 1440],
  ["mobile-full", 390],
  ["desktop-full", 1440],
];

const browser = await chromium.launch();
for (const [name, width] of sheets) {
  const [vp, kind] = name.split("-");
  const html = `<body style="margin:0;background:#ddd;font:600 14px/1 sans-serif;display:flex;gap:24px;padding:24px">
    ${await Promise.all(["reference", "next"].map(async (t) => `<figure style="margin:0"><figcaption style="padding:0 0 12px">${t === "next" ? "Next.js" : "Referentie (design/homepage.html)"}</figcaption><img style="display:block;width:${width}px;outline:1px solid #999" src="${await img(`${vp}-${t}-${kind}.png`)}"></figure>`)).then((x) => x.join(""))}
  </body>`;
  const page = await browser.newPage({ viewport: { width: width * 2 + 72, height: 600 } });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: path.join(dir, `compare-${name}.png`), fullPage: true });
  await page.close();
}
await browser.close();
console.log("done");
