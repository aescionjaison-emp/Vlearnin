import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const outDir = path.resolve(__dirname, "../docs/reference-screenshots/mountcarmel");
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  console.log("Opening https://mountcarmeluniversity.edu.in/ ...");
  await page.goto("https://mountcarmeluniversity.edu.in/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: path.join(outDir, "mc-1440-top.png") });

  // Scroll slowly through page to observe scroll animations and capture full page
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(200);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "mc-1440-full.png"), fullPage: true });

  const audit = await page.evaluate(() => {
    const els: Record<string, Element | null> = {
      h1: document.querySelector("h1"),
      h2: document.querySelector("h2"),
      h3: document.querySelector("h3"),
      h4: document.querySelector("h4"),
      body: document.body,
      p: document.querySelector("main p, section p"),
      navLink: document.querySelector("header nav a, nav a"),
      button: document.querySelector("a.btn, button, .hero a"),
      footerLink: document.querySelector("footer a"),
    };
    const styles: Record<string, unknown> = {};
    for (const [key, el] of Object.entries(els)) {
      if (!el) {
        styles[key] = null;
        continue;
      }
      const s = getComputedStyle(el);
      styles[key] = {
        tag: el.tagName,
        text: el.textContent?.trim().slice(0, 60),
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        textTransform: s.textTransform,
        transition: s.transition,
      };
    }

    const googleFontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis"]')).map(
      (l) => (l as HTMLLinkElement).href,
    );
    const loadedFonts = Array.from(document.fonts).map((f) => `${f.family} (${f.weight}, ${f.status})`);
    const scripts = Array.from(document.querySelectorAll("script[src]"))
      .map((s) => (s as HTMLScriptElement).src)
      .filter((src) => /gsap|aos|lenis|swiper|framer|motion|animate|scroll/i.test(src));

    const animatedEls = Array.from(document.querySelectorAll("[data-aos], [class*='wow'], [class*='animate'], [class*='swiper']")).slice(0, 15).map((el) => ({
      tag: el.tagName,
      cls: el.className.toString().slice(0, 80),
      aos: el.getAttribute("data-aos"),
      aosDuration: el.getAttribute("data-aos-duration"),
      aosEasing: el.getAttribute("data-aos-easing"),
    }));

    return {
      googleFontLinks,
      loadedFonts: [...new Set(loadedFonts)],
      animationScripts: scripts,
      animatedSample: animatedEls,
      ...styles,
      scrollHeight: document.body.scrollHeight,
    };
  });

  // 1920x1080 & 390x844
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "mc-1920-top.png") });

  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mCtx.newPage();
  await mPage.goto("https://mountcarmeluniversity.edu.in/", { waitUntil: "networkidle", timeout: 30000 });
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(outDir, "mc-390-top.png") });
  await mCtx.close();

  console.log("MOUNT_CARMEL_AUDIT:", JSON.stringify(audit, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
