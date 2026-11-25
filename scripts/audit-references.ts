import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const outDir = path.resolve(__dirname, "../docs/reference-screenshots");
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }

  // 1. Inspect JAIN University main website
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("Navigating to https://www.jainuniversity.ac.in/ ...");
  await page.goto("https://www.jainuniversity.ac.in/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3500);

  await page.screenshot({ path: path.join(outDir, "jain-desktop-1440-top.png") });
  await page.screenshot({ path: path.join(outDir, "jain-desktop-1440-full.png"), fullPage: true });

  const metrics1440 = await page.evaluate(() => {
    const header = document.querySelector("header") || document.querySelector("nav");
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");
    const body = document.body;
    const navLinks = Array.from(document.querySelectorAll("header a, nav a")).slice(0, 12);
    const bodyStyle = getComputedStyle(body);
    const h1Style = h1 ? getComputedStyle(h1) : null;
    const h2Style = h2 ? getComputedStyle(h2) : null;
    const headerRect = header ? header.getBoundingClientRect() : null;

    return {
      title: document.title,
      url: window.location.href,
      bodyBg: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      bodyFont: bodyStyle.fontFamily,
      bodyFontSize: bodyStyle.fontSize,
      headerHeight: headerRect ? Math.round(headerRect.height) : null,
      h1Text: h1?.textContent?.trim()?.slice(0, 100) || null,
      h1Font: h1Style?.fontFamily || null,
      h1FontSize: h1Style?.fontSize || null,
      h2Font: h2Style?.fontFamily || null,
      h2FontSize: h2Style?.fontSize || null,
      navFont: navLinks[0] ? getComputedStyle(navLinks[0]).fontFamily : null,
      navFontSize: navLinks[0] ? getComputedStyle(navLinks[0]).fontSize : null,
      navSample: navLinks.map((a) => a.textContent?.trim()).filter(Boolean),
      scrollHeight: document.body.scrollHeight,
    };
  });

  // 1920x1080 capture
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "jain-desktop-1920-top.png") });

  // 390x844 mobile capture
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("https://www.jainuniversity.ac.in/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await mobilePage.waitForTimeout(2500);
  await mobilePage.screenshot({ path: path.join(outDir, "jain-mobile-390-top.png") });
  await mobilePage.screenshot({ path: path.join(outDir, "jain-mobile-390-full.png"), fullPage: true });
  await mobileCtx.close();

  // 2. Check the 4 share.google links
  const shareLinks = [
    "https://share.google/0bJmTdBSof7PxOAch",
    "https://share.google/BFBi4V5KCAsjln7Xj",
    "https://share.google/mrJXhS8aoM6iLSu41",
    "https://share.google/8iNUBagNdqFXCZd7D",
  ];
  const shareResults: { url: string; finalUrl: string; title: string }[] = [];
  for (const url of shareLinks) {
    try {
      const p = await context.newPage();
      await p.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await p.waitForTimeout(1500);
      shareResults.push({ url, finalUrl: p.url(), title: await p.title() });
      await p.close();
    } catch (e) {
      shareResults.push({ url, finalUrl: "ERROR", title: String(e) });
    }
  }

  console.log("METRICS_1440:", JSON.stringify(metrics1440, null, 2));
  console.log("SHARE_RESULTS:", JSON.stringify(shareResults, null, 2));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
