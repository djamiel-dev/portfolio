// Compares the exploration routes against version J for the primary use:
// a recruiter who opens the link and scans for a few seconds.
// Usage: npm run build && npx next start -p 3100, then `npm run explore-check`.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.SITE_URL ?? "http://localhost:3100";
const routes = { J: "/", A: "/explore/a", B: "/explore/b", C: "/explore/c" };
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};
const outDir = path.join(process.cwd(), "screenshots", "explore");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const report = {};

// What a visitor can see in the first viewport: name, role, case links
function firstViewport() {
  const vh = innerHeight;
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && r.top < vh && r.bottom > 0 && cs.visibility !== "hidden" && Number(cs.opacity) > 0;
  };
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    const el = n.parentElement;
    // Visual check: aria-hidden tiles count, screen-reader-only text does not
    if (!n.textContent.trim() || !el || el.closest(".visually-hidden, script, style")) continue;
    if (visible(el)) textNodes.push(n.textContent.trim());
  }
  // Split-flap tiles are one letter per node, so also compare without spaces
  const seen = textNodes.join(" ").toLowerCase();
  const seenTight = textNodes.join("").toLowerCase();
  // Case links point at #case-*, #making-of or a wall section
  const caseLinks = [...document.querySelectorAll("a[href^='#case'], a[href='#making-of'], a[href^='#wall-']")];
  const unique = new Map();
  for (const a of caseLinks) {
    const r = a.getBoundingClientRect();
    const key = a.getAttribute("href");
    const full = r.top >= 0 && r.bottom <= vh;
    const partly = r.top < vh && r.bottom > 0;
    const prev = unique.get(key);
    unique.set(key, { top: Math.round(r.top + scrollY), full: full || prev?.full, partly: partly || prev?.partly });
  }
  const cases = [...unique.values()];
  return {
    nameVisible: /djamiel/.test(seen) || /djamiel/.test(seenTight) || [...document.querySelectorAll("canvas, svg")].some((el) => el.closest("h1") && visible(el)),
    roleVisible: /product designer/.test(seen) || /productdesigner/.test(seenTight),
    casesFullyVisible: cases.filter((c) => c.full).length,
    casesPartlyVisible: cases.filter((c) => c.partly).length,
    firstCaseTop: Math.min(...cases.map((c) => c.top)),
    pageHeight: document.documentElement.scrollHeight,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
  };
}

for (const [vpName, viewport] of Object.entries(viewports)) {
  for (const [name, route] of Object.entries(routes)) {
    const key = `${vpName}/${name}`;
    // Motion on: what a visitor sees after 1 s and after 5 s
    const ctx = await browser.newContext({ viewport, isMobile: viewport.isMobile, hasTouch: viewport.hasTouch, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const t0 = Date.now();
    await page.goto(base + route, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(Math.max(0, 1000 - (Date.now() - t0)));
    await page.screenshot({ path: path.join(outDir, `${vpName}-${name}-1s.png`) });
    await page.waitForTimeout(Math.max(0, 5000 - (Date.now() - t0)));
    await page.screenshot({ path: path.join(outDir, `${vpName}-${name}-5s.png`) });
    report[key] = { ...(await page.evaluate(firstViewport)), errors };
    await page.screenshot({ path: path.join(outDir, `${vpName}-${name}-full.png`), fullPage: true });
    await ctx.close();
  }
}

// Keyboard with reduced motion: how many Tab presses to the first case, and is every focus visible
for (const [name, route] of Object.entries(routes)) {
  const ctx = await browser.newContext({ viewport: viewports.desktop, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, `desktop-${name}-reduced.png`) });
  const stops = [];
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      // A and C stretch the link over its cell or row and draw the ring there
      const stretched = getComputedStyle(el, "::after").position === "absolute";
      const box = stretched ? el.closest("li, tr") ?? el : el;
      const rowRing = box !== el && getComputedStyle(box).outlineStyle !== "none";
      const r = box.getBoundingClientRect();
      return {
        href: el.getAttribute("href"),
        text: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 32),
        focusVisible: (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || !!rowRing,
        size: [Math.round(r.width), Math.round(r.height)],
        preview: document.querySelector("aside p")?.textContent ?? null,
      };
    });
    if (!info) break;
    stops.push(info);
  }
  const firstCase = stops.findIndex((s) => /^#(case|making-of|wall-)/.test(s.href ?? ""));
  const caseStops = stops.filter((s) => /^#(case|making-of)/.test(s.href ?? ""));
  report[`keyboard/${name}`] = {
    tabsToFirstCase: firstCase + 1,
    stops: stops.length,
    invisibleFocus: stops.filter((s) => !s.focusVisible).map((s) => s.text),
    smallTargets: stops.filter((s) => s.size[1] < 24).map((s) => `${s.text} ${s.size.join("×")}`),
    previewFollowsFocus: name === "C" ? new Set(caseStops.map((s) => s.preview)).size === caseStops.length : undefined,
  };
  await ctx.close();
}

await browser.close();
await writeFile(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
