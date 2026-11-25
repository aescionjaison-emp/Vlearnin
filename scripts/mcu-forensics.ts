import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const labDir = path.resolve(__dirname, "../docs/mcu-reference");
const shotsDir = path.join(labDir, "screenshots");
fs.mkdirSync(shotsDir, { recursive: true });

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }

  // ---- DESKTOP 1440x900 FORENSICS ----
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx1440.newPage();

  await page.goto("https://mountcarmeluniversity.edu.in/", { waitUntil: "networkidle", timeout: 35000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(shotsDir, "mcu-desktop-1440-load.png") });

  const desktopData = await page.evaluate(() => {
    const selectors: Record<string, string> = {
      utilityNav: "header .elementor-icon-list-text, header a",
      mainNav: ".elementor-nav-menu a, nav a",
      heroHeading: "h1",
      heroEyebrow: "h2",
      heroDesc: "main p, .elementor-widget-text-editor p",
      sectionHeading: "h3",
      cardHeading: "h4",
      button: ".elementor-button",
      footerHeading: "footer h4, footer h3, footer h2",
      footerLink: "footer a",
    };
    const elements: Record<string, unknown> = {};
    for (const [k, selector] of Object.entries(selectors)) {
      const el = document.querySelector(selector);
      if (!el) {
        elements[k] = null;
        continue;
      }
      const s = getComputedStyle(el);
      elements[k] = {
        selector,
        text: el.textContent?.trim().slice(0, 60) || "",
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        fontStyle: s.fontStyle,
        textTransform: s.textTransform,
        transitionDuration: s.transitionDuration,
        transitionTimingFunction: s.transitionTimingFunction,
      };
    }

    // Elementor data-settings & CSS animations
    const animNodes = Array.from(document.querySelectorAll("[data-settings]"))
      .map((el) => {
        try {
          const parsed = JSON.parse(el.getAttribute("data-settings") || "{}");
          return {
            tag: el.tagName,
            cls: el.className.toString().slice(0, 60),
            animation: parsed._animation || parsed.animation || null,
            delay: parsed._animation_delay || parsed.animation_delay || null,
            backgroundSlideshow: parsed.background_slideshow_slide_transition || null,
            backgroundDuration: parsed.background_slideshow_transition_duration || null,
            kenBurns: parsed.background_slideshow_ken_burns || null,
          };
        } catch {
          return null;
        }
      })
      .filter((x) => x && (x.animation || x.backgroundSlideshow || x.kenBurns));

    // Check smooth scroll / Lenis / native scroll
    const htmlStyle = getComputedStyle(document.documentElement);
    const hasLenis = document.documentElement.classList.contains("lenis");

    // Counters
    const counters = Array.from(document.querySelectorAll(".elementor-counter-number")).map((el) => ({
      toValue: el.getAttribute("data-to-value"),
      duration: el.getAttribute("data-duration"),
      text: el.textContent?.trim(),
      fontFamily: getComputedStyle(el).fontFamily,
      fontSize: getComputedStyle(el).fontSize,
      fontWeight: getComputedStyle(el).fontWeight,
    }));

    return {
      loadedFonts: Array.from(document.fonts)
        .filter((f) => f.status === "loaded")
        .map((f) => ({ family: f.family, weight: f.weight, style: f.style })),
      scrollBehavior: htmlStyle.scrollBehavior,
      hasLenis,
      elements,
      animNodes: animNodes.slice(0, 30),
      counters,
    };
  });

  // Scroll through page and capture mid-scroll & full-page
  const totalH = await page.evaluate(() => document.body.scrollHeight);
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(totalH * 0.35));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(shotsDir, "mcu-desktop-1440-mid.png") });

  await page.evaluate((y) => window.scrollTo(0, y), totalH - 900);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(shotsDir, "mcu-desktop-1440-footer.png") });

  // ---- MOBILE 390x844 FORENSICS ----
  const ctx390 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await ctx390.newPage();
  await mPage.goto("https://mountcarmeluniversity.edu.in/", { waitUntil: "networkidle", timeout: 35000 });
  await mPage.waitForTimeout(1500);
  await mPage.screenshot({ path: path.join(shotsDir, "mcu-mobile-390-load.png") });

  const mobileData = await mPage.evaluate(() => {
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");
    const h3 = document.querySelector("h3");
    const p = document.querySelector("main p, .elementor-widget-text-editor p");
    return {
      h1Size: h1 ? getComputedStyle(h1).fontSize : null,
      h1LineHeight: h1 ? getComputedStyle(h1).lineHeight : null,
      h2Size: h2 ? getComputedStyle(h2).fontSize : null,
      h3Size: h3 ? getComputedStyle(h3).fontSize : null,
      pSize: p ? getComputedStyle(p).fontSize : null,
      bodySize: getComputedStyle(document.body).fontSize,
    };
  });

  fs.writeFileSync(
    path.join(labDir, "typography-audit.json"),
    JSON.stringify({ desktop: desktopData.elements, loadedFonts: desktopData.loadedFonts, mobile: mobileData }, null, 2),
  );
  fs.writeFileSync(
    path.join(labDir, "motion-audit.json"),
    JSON.stringify({ scrollBehavior: desktopData.scrollBehavior, hasLenis: desktopData.hasLenis, animNodes: desktopData.animNodes, counters: desktopData.counters }, null, 2),
  );

  console.log("FORENSICS_COMPLETE", JSON.stringify({
    loadedFontsCount: desktopData.loadedFonts.length,
    animNodesCount: desktopData.animNodes.length,
    countersCount: desktopData.counters.length,
    hasLenis: desktopData.hasLenis,
    scrollBehavior: desktopData.scrollBehavior,
  }));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
