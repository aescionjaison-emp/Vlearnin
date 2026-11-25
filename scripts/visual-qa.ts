import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const outDir = path.resolve(__dirname, "../docs/qa-screenshots");
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }

  const errors: string[] = [];
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx1440.newPage();
  page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));

  console.log("1. Testing homepage at 1440x900...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, "vlearnin-1440-top.png") });

  // Scroll down to trigger lazy images
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < totalHeight; y += 700) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "vlearnin-1440-full.png"), fullPage: true });

  const qa1440 = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 2;
    const imgs = Array.from(document.querySelectorAll("img"));
    const brokenImgs = imgs.filter((img) => img.complete && img.naturalWidth === 0).map((i) => i.src);
    const invisibleSections = Array.from(document.querySelectorAll("section")).filter(
      (s) => parseFloat(getComputedStyle(s).opacity) === 0,
    ).length;
    const bodyText = document.body.innerText;
    return {
      overflow,
      totalImgs: imgs.length,
      brokenImgs,
      invisibleSections,
      has3Domains:
        bodyText.includes("Artificial Intelligence & Business Intelligence") &&
        bodyText.includes("Corporate Finance & Capital Markets") &&
        bodyText.includes("Digital Marketing & Creative Media"),
      has4Combos:
        bodyText.includes("Smart Office & AI Starter") &&
        bodyText.includes("Business Analytics Pro Track") &&
        bodyText.includes("Corporate Finance & IB Master Track") &&
        bodyText.includes("Digital Creator & Growth Master Track"),
      has4Advantages:
        bodyText.includes("100% Practical Pedagogy") &&
        bodyText.includes("Small-Batch Mentorship") &&
        bodyText.includes("QR-Verified Credentials") &&
        bodyText.includes("Flexible Batch Timings"),
      scrollHeight: document.body.scrollHeight,
    };
  });

  // Mega menu screenshot
  await page.getByRole("button", { name: "Programmes", exact: true }).hover();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, "vlearnin-mega-menu.png") });

  // 1920x1080 capture
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.mouse.move(10, 10);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "vlearnin-1920-top.png") });

  // Courses page & Course detail modal test
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/courses", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, "vlearnin-courses-page.png") });

  await page.goto("http://localhost:3000/courses/data-visualization-power-bi", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.getByRole("button", { name: /Enroll \/ Enquire Now/i }).click();
  await page.waitForTimeout(300);
  const modalVisible = await page.getByRole("dialog").isVisible();
  await page.screenshot({ path: path.join(outDir, "vlearnin-course-detail-modal.png") });

  // Mobile 390x844
  const ctx390 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await ctx390.newPage();
  await mPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mPage.waitForTimeout(600);
  await mPage.screenshot({ path: path.join(outDir, "vlearnin-390-top.png") });
  await mPage.screenshot({ path: path.join(outDir, "vlearnin-390-full.png"), fullPage: true });
  const mobileOverflow = await mPage.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 2,
  );
  await ctx390.close();

  console.log("QA_1440:", JSON.stringify(qa1440, null, 2));
  console.log("MODAL_VISIBLE:", modalVisible);
  console.log("MOBILE_OVERFLOW:", mobileOverflow);
  console.log("JS_ERRORS:", errors);

  await browser.close();

  if (errors.length > 0 || qa1440.overflow || mobileOverflow || qa1440.invisibleSections > 0 || qa1440.brokenImgs.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
