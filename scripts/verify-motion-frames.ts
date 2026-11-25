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
  await page.waitForTimeout(700);

  // 1. Hero transition check
  await page.getByRole("button", { name: "Next campaign banner" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, "frame-hero-mid.png") });
  await page.waitForTimeout(450);
  await page.screenshot({ path: path.join(outDir, "frame-hero-end.png") });

  // 2. 3D FlipCard check (hover/click)
  const flipCard = page.locator(".mc-flip-perspective").first();
  await flipCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const beforeFlip = await flipCard.locator(".mc-flip-inner").evaluate((el) => getComputedStyle(el).transform);
  await flipCard.click();
  await page.waitForTimeout(650);
  const afterFlip = await flipCard.locator(".mc-flip-inner").evaluate((el) => getComputedStyle(el).transform);
  await page.screenshot({ path: path.join(outDir, "frame-flipcard-flipped.png") });

  // 3. Scrubbed Placement Pathway progress bar check (forward + reverse scroll)
  const bar = page.locator(".pathway-progress-bar");
  await bar.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const barMidTransform = await bar.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy(0, 350));
  await page.waitForTimeout(400);
  const barAfterTransform = await bar.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy(0, -500));
  await page.waitForTimeout(400);
  const barReverseTransform = await bar.evaluate((el) => getComputedStyle(el).transform);

  // 4. Dev motion-lab should be 404 in production
  const labRes = await page.goto("http://localhost:3000/dev/motion-lab");
  const labStatusInProd = labRes?.status();

  console.log("MOTION_FRAME_VERIFICATION:", JSON.stringify({
    flipCardChanged: beforeFlip !== afterFlip,
    beforeFlip,
    afterFlip,
    barMidTransform,
    barAfterTransform,
    barReverseTransform,
    labStatusInProd,
    jsErrors: errors,
  }, null, 2));

  await browser.close();
  if (errors.length > 0 || beforeFlip === afterFlip) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
