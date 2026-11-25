import type { MetadataRoute } from "next";
import { OFFICIAL_COMBOS, OFFICIAL_COURSES } from "@vlearnin/shared";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vlearnin.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/courses",
    "/career-combos",
    "/placement-assistance",
    "/academic-partnerships",
    "/verify-certificate",
    "/about",
    "/contact",
    "/hire-from-vlearnin",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const courseRoutes = OFFICIAL_COURSES.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const comboRoutes = OFFICIAL_COMBOS.map((c) => ({
    url: `${baseUrl}/career-combos/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes, ...comboRoutes];
}
