import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const outDir = path.resolve(__dirname, "../docs/mcu-reference/screenshots");
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }

  const errors: string[] = [];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "vlearnin-mcu-1440-top.png") });

  // Verify loaded fonts and computed typography
  const typoCheck = await page.evaluate(() => {
    const selectors: Record<string, string> = {
      h1: "h1",
      body: "body",
      counter: ".mc-counter",
      footerHeading: "footer h3",
      footerLink: "footer a",
    };
    const results: Record<string, unknown> = {};
    for (const [k, sel] of Object.entries(selectors)) {
      const el = document.querySelector(sel);
      if (!el) {
        results[k] = null;
        continue;
      }
      const s = getComputedStyle(el);
      results[k] = {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
      };
    }
    const loaded = Array.from(document.fonts)
      .filter((f) => f.status === "loaded")
      .map((f) => `${f.family}:${f.weight}`);
    return {
      loadedFonts: [...new Set(loaded)],
      ...results,
    };
  });

  // Slow scroll -> Fast scroll -> Reverse scroll
  const totalH = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= totalH; y += 800) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(120);
  }
  await page.screenshot({ path: path.join(outDir, "vlearnin-mcu-1440-footer.png") });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const visibilityAndOverflow = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
    invisibleSections: Array.from(document.querySelectorAll("section")).filter(
      (s) => parseFloat(getComputedStyle(s).opacity) === 0,
    ).length,
    brokenImgs: Array.from(document.querySelectorAll("img")).filter(
      (i) => i.complete && i.naturalWidth === 0,
    ).length,
  }));

  // Reduced motion check
  const rmCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const rmPage = await rmCtx.newPage();
  await rmPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await rmPage.screenshot({ path: path.join(outDir, "vlearnin-mcu-390-top.png") });
  const rmOverflow = await rmPage.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 2,
  );
  await rmCtx.close();

  console.log("TYPO_CHECK:", JSON.stringify(typoCheck, null, 2));
  console.log("VISIBILITY_AND_OVERFLOW:", JSON.stringify(visibilityAndOverflow));
  console.log("MOBILE_REDUCED_MOTION_OVERFLOW:", rmOverflow);
  console.log("JS_ERRORS:", errors);

  await browser.close();

  if (errors.length > 0 || visibilityAndOverflow.overflow || rmOverflow || visibilityAndOverflow.invisibleSections > 0 || visibilityAndOverflow.brokenImgs > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
