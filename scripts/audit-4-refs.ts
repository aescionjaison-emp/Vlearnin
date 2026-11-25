import { chromium } from "playwright";
import * as path from "path";

const outDir = path.resolve(__dirname, "../docs/reference-screenshots");

const TARGETS = [
  { name: "christ", url: "https://www.christuniversity.in/" },
  { name: "jain-programs", url: "https://www.jainuniversity.ac.in/programs" },
  { name: "mountcarmel", url: "https://mountcarmeluniversity.edu.in/" },
  { name: "qspiders", url: "https://qspiders.com/" },
];

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  for (const t of TARGETS) {
    const page = await context.newPage();
    try {
      await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(outDir, `${t.name}-1440-top.png`) });
      const metrics = await page.evaluate(() => {
        const header = document.querySelector("header") || document.querySelector("nav");
        const h1 = document.querySelector("h1");
        const bodyStyle = getComputedStyle(document.body);
        return {
          title: document.title,
          bodyBg: bodyStyle.backgroundColor,
          bodyFont: bodyStyle.fontFamily,
          bodySize: bodyStyle.fontSize,
          headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
          h1Font: h1 ? getComputedStyle(h1).fontFamily : null,
          h1Size: h1 ? getComputedStyle(h1).fontSize : null,
          scrollHeight: document.body.scrollHeight,
        };
      });
      console.log(`REF_${t.name.toUpperCase()}:`, JSON.stringify(metrics));
    } catch (e) {
      console.log(`REF_${t.name.toUpperCase()}_ERROR:`, String(e));
    }
    await page.close();
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
