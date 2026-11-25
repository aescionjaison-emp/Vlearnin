import { expect, test } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/",
  "/courses",
  "/courses/ai-tools-for-commerce-business",
  "/courses/data-visualization-power-bi",
  "/career-combos",
  "/career-combos/business-analytics-pro-track",
  "/placement-assistance",
  "/academic-partnerships",
  "/verify-certificate",
  "/about",
  "/contact",
  "/hire-from-vlearnin",
  "/privacy-policy",
  "/terms-and-conditions",
  "/admin/login",
];

test.describe("VLEARNIN v2 Smoke, Navigation & Responsive Overflow Checks", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`renders ${route} without horizontal overflow`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1").first()).toBeVisible();
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 2,
      );
      expect(hasOverflow).toBe(false);
    });
  }

  test("course category filtering works on /courses", async ({ page }) => {
    await page.goto("/courses");
    await page.getByRole("tab", { name: "Finance & Investment Banking" }).click();
    await expect(
      page.getByText("Certified Professional in Financial Modelling for Business"),
    ).toBeVisible();
  });

  test("demo booking modal opens from header and preselects course on detail page", async ({ page }) => {
    await page.goto("/courses/data-visualization-power-bi");
    await page.getByRole("button", { name: "Enroll / Enquire Now" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("#demo-programme")).toHaveValue(
      "Certified Data Visualization Using Power BI",
    );
  });
});
