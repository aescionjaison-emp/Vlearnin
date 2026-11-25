import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const shotsDir = path.resolve(__dirname, "../docs/mcu-reference/screenshots");
fs.mkdirSync(shotsDir, { recursive: true });

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto("https://mountcarmeluniversity.edu.in/", { waitUntil: "networkidle", timeout: 35000 });
  await page.waitForTimeout(1500);

  // Close any popup modal so sections underneath are unobstructed
  await page.evaluate(() => {
    document.querySelectorAll(".dialog-close-button, .eicon-close, [aria-label='Close']").forEach((el) => {
      (el as HTMLElement).click();
    });
  });
  await page.waitForTimeout(500);

  // Inspect all sections and their animation types
  const sectionsReport = await page.evaluate(() => {
    const out: unknown[] = [];
    const containers = Array.from(document.querySelectorAll("main > div > div, .elementor > .e-con, section"));
    const flipBoxes = document.querySelectorAll(".elementor-flip-box").length;
    const swipers = Array.from(document.querySelectorAll(".swiper")).map((s) => ({
      cls: s.className,
      slides: s.querySelectorAll(".swiper-slide").length,
    }));
    const stickyHeaders = document.querySelectorAll(".elementor-sticky, header").length;
    const counters = Array.from(document.querySelectorAll(".elementor-counter-number")).map((c) => ({
      to: c.getAttribute("data-to-value"),
      duration: c.getAttribute("data-duration"),
    }));
    const animTypes: Record<string, number> = {};
    document.querySelectorAll("[data-settings]").forEach((el) => {
      try {
        const s = JSON.parse(el.getAttribute("data-settings") || "{}");
        const a = s._animation || s.animation;
        if (a) animTypes[a] = (animTypes[a] || 0) + 1;
      } catch {}
    });

    out.push({
      containerCount: containers.length,
      flipBoxes,
      swipers,
      stickyHeaders,
      counters,
      animTypes,
    });
    return out;
  });

  // Capture clean scrolled screenshots
  const totalH = await page.evaluate(() => document.body.scrollHeight);
  for (const frac of [0.18, 0.35, 0.55, 0.75]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(totalH * frac));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(shotsDir, `mcu-clean-${Math.round(frac * 100)}.png`) });
  }

  console.log("MCU_SECTIONS_REPORT:", JSON.stringify(sectionsReport, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
