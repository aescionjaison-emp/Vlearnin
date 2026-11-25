import {
  OFFICIAL_CATEGORIES,
  OFFICIAL_COMBOS,
  OFFICIAL_COURSES,
  OfficialCategorySeed,
  OfficialComboSeed,
  OfficialCourseSeed,
} from "@vlearnin/shared";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function getApiUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${clean}`;
}

/**
 * Image mapping for official courses & categories using our generated photorealistic assets.
 */
export const COURSE_IMAGE_MAP: Record<string, string> = {
  "ai-tools-for-commerce-business": "/images/course-ai-commerce.jpg",
  "data-visualization-power-bi": "/images/domain-analytics.jpg",
  "financial-modelling-for-business": "/images/hero-3.jpg",
  "investment-banking-professional": "/images/course-investment-banking.jpg",
  "ai-powered-digital-marketing": "/images/domain-creative.jpg",
  "social-media-marketing-content-creation": "/images/course-social-media.jpg",
  "video-editing-reels-production": "/images/course-video-editing.jpg",
};

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "ai-business-intelligence": "/images/domain-analytics.jpg",
  "corporate-finance-capital-markets": "/images/hero-3.jpg",
  "digital-marketing-creative-media": "/images/domain-creative.jpg",
};

export const COMBO_IMAGE_MAP: Record<string, string> = {
  "smart-office-ai-starter": "/images/course-ai-commerce.jpg",
  "business-analytics-pro-track": "/images/hero-2.jpg",
  "corporate-finance-ib-master-track": "/images/course-investment-banking.jpg",
  "digital-creator-growth-master-track": "/images/hero-4.jpg",
};

export async function fetchCourses(): Promise<OfficialCourseSeed[]> {
  try {
    const res = await fetch(getApiUrl("/courses"), { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.courses) && data.courses.length > 0) {
        return data.courses.map(normalizeCourse);
      }
    }
  } catch {
    // Fallback to official shared catalog when API is offline during build
  }
  return OFFICIAL_COURSES.map((c) => ({
    ...c,
    image: COURSE_IMAGE_MAP[c.slug] || "/images/hero-1.jpg",
  }));
}

export async function fetchCourseBySlug(slug: string): Promise<OfficialCourseSeed | null> {
  try {
    const res = await fetch(getApiUrl(`/courses/${encodeURIComponent(slug)}`), {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.course) return normalizeCourse(data.course);
    }
  } catch {
    // Fallback below
  }
  const found = OFFICIAL_COURSES.find((c) => c.slug === slug);
  if (!found) return null;
  return {
    ...found,
    image: COURSE_IMAGE_MAP[found.slug] || "/images/hero-1.jpg",
  };
}

export async function fetchCategories(): Promise<OfficialCategorySeed[]> {
  try {
    const res = await fetch(getApiUrl("/categories"), { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.categories) && data.categories.length > 0) {
        return data.categories.map((cat: any) => ({
          slug: cat.slug,
          name: cat.name,
          shortName: cat.shortName,
          description: cat.description,
          outcomeSummary: cat.outcomeSummary,
          image: CATEGORY_IMAGE_MAP[cat.slug] || cat.imageUrl || "/images/hero-1.jpg",
          displayOrder: cat.displayOrder ?? 0,
        }));
      }
    }
  } catch {
    // Fallback below
  }
  return OFFICIAL_CATEGORIES.map((cat) => ({
    ...cat,
    image: CATEGORY_IMAGE_MAP[cat.slug] || "/images/hero-1.jpg",
  }));
}

export async function fetchCombos(): Promise<OfficialComboSeed[]> {
  try {
    const res = await fetch(getApiUrl("/career-combos"), { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.combos) && data.combos.length > 0) {
        return data.combos.map((c: any) => ({
          slug: c.slug,
          title: c.title,
          durationHours: c.durationHours,
          durationLabel: c.durationLabel,
          includedLabel: c.includedLabel,
          idealFor: c.idealFor,
          summary: c.summary,
          outcomes: c.outcomes || [],
          courseSlugs: c.courseSlugs || (c.courses ? c.courses.map((cc: any) => cc.course?.slug).filter(Boolean) : []),
          image: COMBO_IMAGE_MAP[c.slug] || c.imageUrl || "/images/hero-2.jpg",
          displayOrder: c.displayOrder ?? 0,
        }));
      }
    }
  } catch {
    // Fallback below
  }
  return OFFICIAL_COMBOS.map((c) => ({
    ...c,
    image: COMBO_IMAGE_MAP[c.slug] || "/images/hero-2.jpg",
  }));
}

export async function fetchComboBySlug(slug: string): Promise<OfficialComboSeed | null> {
  const combos = await fetchCombos();
  return combos.find((c) => c.slug === slug) || null;
}

function normalizeCourse(c: any): OfficialCourseSeed {
  return {
    slug: c.slug,
    title: c.title,
    categorySlug: c.categorySlug || c.category?.slug || "",
    categoryName: c.categoryName || c.category?.shortName || c.category?.name || "",
    durationHours: c.durationHours ?? 30,
    durationLabel: c.durationLabel || "30 Hours (5 Modules × 6 Hours)",
    idealFor: c.idealFor || "",
    summary: c.summary || "",
    overview: c.overview || "",
    capstoneTitle: c.capstoneTitle || "",
    capstoneDescription: c.capstoneDescription || "",
    careerPathways: c.careerPathways || [],
    learningModes: c.learningModes || ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: COURSE_IMAGE_MAP[c.slug] || c.imageUrl || "/images/hero-1.jpg",
    tools: Array.isArray(c.tools)
      ? c.tools.map((t: any) => (typeof t === "string" ? t : t.name))
      : [],
    outcomes: Array.isArray(c.outcomes)
      ? c.outcomes.map((o: any) => (typeof o === "string" ? o : o.description))
      : [],
    modules: Array.isArray(c.modules) ? c.modules : [],
  };
}
