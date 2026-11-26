import {
  BRAND,
  OFFICIAL_CATEGORIES,
  OFFICIAL_COMBOS,
  OFFICIAL_COURSES,
  OfficialCategorySeed,
  OfficialComboSeed,
  OfficialCourseSeed,
} from "@vlearnin/shared";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "./firebase";
import { CATEGORY_IMAGE_MAP, COMBO_IMAGE_MAP, COURSE_IMAGE_MAP } from "./api";

export interface HeroBannerContent {
  id: string;
  theme: "jain-blue" | "light-split" | "deep-navy" | "studio-light";
  badge: string;
  headlineWhite: string;
  headlineAccent: string;
  description: string;
  features?: string[];
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?:
    | { label: string; action: "demo" | "brochure" }
    | { label: string; href: string };
}

export interface CustomSectionContent {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  theme: "light" | "blue";
}

export interface SiteContent {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    email: string;
    phoneDisplay: string;
    phoneHref: string;
    whatsappNumber: string;
    address: string;
    shortLocation: string;
    weekdaysTiming: string;
    sundayTiming: string;
    placementDisclaimer: string;
  };
  header: {
    topLocationLabel: string;
    verifyLabel: string;
    partnershipsLabel: string;
    hireLabel: string;
    ctaLabel: string;
    navLinks: { label: string; href: string; hasMega?: boolean }[];
  };
  heroBanners: HeroBannerContent[];
  quickAccess: {
    items: { label: string; href: string }[];
    demoLabel: string;
  };
  brandIntro: {
    eyebrow: string;
    heading: string;
    subTagline: string;
    description: string;
    image: string;
    imageAlt: string;
    ctaLabel: string;
    secondaryLinkLabel: string;
    pillars: { step: string; title: string; desc: string }[];
    highlights: { value: number; padZero: boolean; label: string; sub: string }[];
  };
  domainsSection: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  discoverySection: {
    eyebrow: string;
    heading: string;
    exploreAllLabel: string;
  };
  combosSection: {
    eyebrow: string;
    heading: string;
    description: string;
    exploreAllLabel: string;
  };
  advantagesSection: {
    eyebrow: string;
    heading: string;
    image: string;
    imageAlt: string;
    items: { num: string; title: string; description: string }[];
  };
  placementSection: {
    eyebrow: string;
    heading: string;
    ctaLabel: string;
    stages: { step: string; title: string; desc: string }[];
  };
  academicSection: {
    eyebrow: string;
    heading: string;
    description: string;
    bullets: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    image: string;
    imageAlt: string;
  };
  campusSection: {
    eyebrow: string;
    heading: string;
    description: string;
    visitLabel: string;
    demoLabel: string;
    gallery: { src: string; title: string; alt: string }[];
  };
  finalCtaSection: {
    heading: string;
    description: string;
    demoLabel: string;
    contactLabel: string;
  };
  footer: {
    description: string;
    demoButtonLabel: string;
    programmesHeading: string;
    quickLinksHeading: string;
    contactHeading: string;
    copyrightSuffix: string;
  };
  categories: OfficialCategorySeed[];
  courses: OfficialCourseSeed[];
  combos: OfficialComboSeed[];
  customSections: CustomSectionContent[];
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: {
    name: BRAND.name,
    legalName: BRAND.legalName,
    tagline: BRAND.tagline,
    email: BRAND.email,
    phoneDisplay: BRAND.phoneDisplay,
    phoneHref: BRAND.phoneHref,
    whatsappNumber: BRAND.whatsappNumber,
    address: BRAND.address,
    shortLocation: BRAND.shortLocation,
    weekdaysTiming: BRAND.timings.weekdays,
    sundayTiming: BRAND.timings.sunday,
    placementDisclaimer: BRAND.placementDisclaimer,
  },
  header: {
    topLocationLabel: BRAND.shortLocation,
    verifyLabel: "Verify Certificate",
    partnershipsLabel: "College Partnerships",
    hireLabel: "Hire From VLEARNIN",
    ctaLabel: "Book Free Demo",
    navLinks: [
      { label: "About Us", href: "/about" },
      { label: "Programmes", href: "/courses", hasMega: true },
      { label: "Career Combos", href: "/career-combos" },
      { label: "Placement Assistance", href: "/placement-assistance" },
      { label: "Academic Partnerships", href: "/academic-partnerships" },
      { label: "Contact", href: "/contact" },
    ],
  },
  heroBanners: [
    {
      id: "brand-campaign",
      theme: "jain-blue",
      badge: "THE V-WAY TO LEARN, BUILD & LEAD.",
      headlineWhite: "Shaping Future-Ready Talent Through",
      headlineAccent: "Practical, Industry-Aligned Education",
      description:
        "Master high-demand skills in Artificial Intelligence, Business Intelligence, Corporate Finance, and Digital Media through practical, 30-hour certification programmes.",
      image: "/images/hero-1.jpg",
      imageAlt: "Confident Indian learners in an instructor-led practical training session at VLEARNIN",
      primaryCta: { label: "Explore All Programmes", href: "/courses" },
      secondaryCta: { label: "Book Free Demo", action: "demo" },
    },
    {
      id: "ai-bi",
      theme: "light-split",
      badge: "AI & BUSINESS INTELLIGENCE",
      headlineWhite: "Learn AI. Master Data.",
      headlineAccent: "Lead Business Transformation.",
      description:
        "Hands-on 30-hour certifications in generative AI workplace automation, Power Query data cleaning, DAX modeling, and executive Power BI dashboards.",
      features: [
        "Certified AI Tools for Commerce & Business",
        "Certified Data Visualization Using Power BI",
      ],
      image: "/images/hero-2.jpg",
      imageAlt: "Students analyzing business intelligence dashboards and AI tools in a bright computer lab",
      primaryCta: { label: "Explore AI & Analytics", href: "/courses?category=ai-business-intelligence" },
      secondaryCta: { label: "Book Free Demo", action: "demo" },
    },
    {
      id: "corporate-finance",
      theme: "deep-navy",
      badge: "CORPORATE FINANCE & CAPITAL MARKETS",
      headlineWhite: "Build the Financial Expertise",
      headlineAccent: "Tomorrow's Businesses Need.",
      description:
        "Construct dynamic 3-statement Excel forecasts, DCF company valuations, M&A deal structures, and investment banking pitchbooks through live case studies.",
      features: ["Financial Modelling", "Investment Banking"],
      image: "/images/hero-3.jpg",
      imageAlt: "Corporate finance training classroom featuring financial models and mentor guidance",
      primaryCta: { label: "Explore Finance Programmes", href: "/courses?category=corporate-finance-capital-markets" },
      secondaryCta: { label: "View Career Combos", href: "/career-combos" },
    },
    {
      id: "digital-media",
      theme: "studio-light",
      badge: "DIGITAL MARKETING & CREATIVE MEDIA",
      headlineWhite: "Create. Connect. Grow.",
      headlineAccent: "Lead the Digital Future.",
      description:
        "Launch performance ad campaigns, build 30-day multi-platform content engines, and produce high-retention commercial Reels and YouTube edits.",
      features: [
        "Digital Marketing",
        "Social Media Marketing",
        "Video Editing & Reels Production",
      ],
      image: "/images/hero-4.jpg",
      imageAlt: "Modern creative media studio with video editing workstation and digital production",
      primaryCta: { label: "Explore Digital & Media", href: "/courses?category=digital-marketing-creative-media" },
      secondaryCta: { label: "Download Brochure", action: "brochure" },
    },
  ],
  quickAccess: {
    items: [
      { label: "Programmes", href: "/courses" },
      { label: "Career Combos", href: "/career-combos" },
      { label: "Placement Assistance", href: "/placement-assistance" },
      { label: "Academic Partnerships", href: "/academic-partnerships" },
      { label: "Verify Certificate", href: "/verify-certificate" },
    ],
    demoLabel: "Book Free Demo",
  },
  brandIntro: {
    eyebrow: "WELCOME TO VLEARNIN",
    heading: "Learn With Purpose. Build With Confidence. Lead With Skill.",
    subTagline: "The V-Way to Learn, Build & Lead.",
    description:
      "VLEARNIN bridges the gap between academic knowledge and real-world professional capabilities through practical certification programmes, personalized mentorship and career-oriented learning.",
    image: "/images/about-campus.jpg",
    imageAlt: "Practical instructor-led mentorship at VLEARNIN Academy",
    ctaLabel: "Know More About VLEARNIN",
    secondaryLinkLabel: "Explore Our Learning Methodology",
    pillars: [
      {
        step: "01",
        title: "LEARN",
        desc: "Master relevant industry tools and essential concepts.",
      },
      {
        step: "02",
        title: "BUILD",
        desc: "Apply knowledge through practical projects and real business scenarios.",
      },
      {
        step: "03",
        title: "LEAD",
        desc: "Develop professional confidence and career readiness.",
      },
    ],
    highlights: [
      { value: 7, padZero: true, label: "Certification Programmes", sub: "30-Hour Practical Tracks" },
      { value: 3, padZero: true, label: "Core Learning Domains", sub: "AI/BI, Finance & Digital Media" },
      { value: 30, padZero: false, label: "Hours Per Standalone Programme", sub: "5 Modules × 6 Hours" },
      { value: 4, padZero: true, label: "Career Accelerator Combos", sub: "45 to 90 Hours Dual-Skill" },
    ],
  },
  domainsSection: {
    eyebrow: "EXPLORE OUR LEARNING DOMAINS",
    heading: "Industry-Aligned Certification Programmes",
    description:
      "Structured, hands-on tracks designed around real workplace tools, live datasets and practical assessments.",
  },
  discoverySection: {
    eyebrow: "PROGRAMME DISCOVERY",
    heading: "Discover Programmes That Shape Your Future",
    exploreAllLabel: "Explore All Programmes",
  },
  combosSection: {
    eyebrow: "DUAL-SKILL CAREER TRACKS",
    heading: "Career Accelerator Combos",
    description:
      "Combine complementary certifications into a deeper 45-to-90 hour career track with integrated capstones.",
    exploreAllLabel: "View All Career Combos",
  },
  advantagesSection: {
    eyebrow: "THE VLEARNIN ADVANTAGE",
    heading: "Why Learners Choose The V-Way",
    image: "/images/hero-1.jpg",
    imageAlt: "Small-batch practical mentorship at VLEARNIN",
    items: [
      {
        num: "01",
        title: "100% Practical Pedagogy",
        description:
          "Every module is driven by live business datasets, real financial models, AI workflows and hands-on capstone projects.",
      },
      {
        num: "02",
        title: "Small-Batch Mentorship",
        description:
          "Focused batch sizes ensure personalized guidance, doubt resolution and portfolio building.",
      },
      {
        num: "03",
        title: "QR-Verified Credentials",
        description:
          "VLEARNIN certificates are verifiable online by employers and institutions.",
      },
      {
        num: "04",
        title: "Flexible Batch Timings",
        description:
          "Weekday, evening and weekend batches at our Rajajinagar center, plus on-campus college programmes.",
      },
    ],
  },
  placementSection: {
    eyebrow: "STRUCTURED PLACEMENT ASSISTANCE",
    heading: "From Classroom to Corporate",
    ctaLabel: "Explore Career Support",
    stages: [
      {
        step: "Step 01",
        title: "Live Capstone Portfolio",
        desc: "Graduate with real Power BI dashboards, Excel valuation models, AI workflows or practical marketing campaigns.",
      },
      {
        step: "Step 02",
        title: "ATS Resume & LinkedIn Makeover",
        desc: "Personalized profile optimization tailored to finance, analytics and digital roles.",
      },
      {
        step: "Step 03",
        title: "Mock Interviews & Domain Prep",
        desc: "Practice technical and HR interview rounds with personalized feedback.",
      },
      {
        step: "Step 04",
        title: "Curated Hiring Network",
        desc: "Access to available internship and full-time opportunities through verified employer connections.",
      },
    ],
  },
  academicSection: {
    eyebrow: "INSTITUTIONAL COLLABORATIONS",
    heading: "Partnering with Colleges & Educational Institutions",
    description:
      "VLEARNIN collaborates with degree colleges across Bengaluru and Karnataka to deliver structured value-added certification programmes tailored to B.Com, BBA, BCA, and MBA students.",
    bullets: [
      "30-hour value-added certification programmes",
      "On-campus practical training",
      "Workshops & orientation seminars",
      "Capstone assessments",
      "Curriculum-aligned learning",
      "Career readiness & portfolios",
    ],
    primaryCtaLabel: "Explore Academic Partnerships",
    secondaryCtaLabel: "Request Institutional Proposal",
    image: "/images/academic-partnership.jpg",
    imageAlt: "Illustrative college seminar and faculty workshop",
  },
  campusSection: {
    eyebrow: "LEARNING ENVIRONMENT",
    heading: "Experience Practical Learning at VLEARNIN",
    description: "Illustrative classroom, analytics lab, studio, and mentorship environments.",
    visitLabel: "Visit Our Rajajinagar Center",
    demoLabel: "Book Free Demo",
    gallery: [
      {
        src: "/images/hero-1.jpg",
        title: "Instructor-Led Practical Sessions",
        alt: "Instructor guiding students during practical session",
      },
      {
        src: "/images/hero-2.jpg",
        title: "Computer-Based Analytics Labs",
        alt: "Students working on Power BI and AI dashboards",
      },
      {
        src: "/images/hero-3.jpg",
        title: "Financial Modelling Mentorship",
        alt: "Mentor reviewing financial models with learners",
      },
      {
        src: "/images/hero-4.jpg",
        title: "Creative Studio & Editing Workstations",
        alt: "Video editing and digital production studio",
      },
      {
        src: "/images/domain-creative.jpg",
        title: "Collaborative Capstone Development",
        alt: "Learners collaborating on campaign capstone project",
      },
    ],
  },
  finalCtaSection: {
    heading: "Your Next Career Chapter Begins Here.",
    description:
      "Explore practical certification programmes, connect with our academic team and discover the right learning pathway for your goals.",
    demoLabel: "Book a Free Demo Class",
    contactLabel: "Talk to Our Team",
  },
  footer: {
    description:
      "Practical certification training in Artificial Intelligence, Business Intelligence, Corporate Finance, and Digital Media—built around live datasets, real tools, and dedicated placement assistance.",
    demoButtonLabel: "Book Free Demo Class",
    programmesHeading: "Programmes",
    quickLinksHeading: "Quick Links",
    contactHeading: "Contact Us",
    copyrightSuffix: "All rights reserved.",
  },
  categories: OFFICIAL_CATEGORIES.map((c) => ({
    ...c,
    image: CATEGORY_IMAGE_MAP[c.slug] || "/images/hero-1.jpg",
  })),
  courses: OFFICIAL_COURSES.map((c) => ({
    ...c,
    image: COURSE_IMAGE_MAP[c.slug] || "/images/hero-1.jpg",
  })),
  combos: OFFICIAL_COMBOS.map((c) => ({
    ...c,
    image: COMBO_IMAGE_MAP[c.slug] || "/images/hero-1.jpg",
  })),
  customSections: [],
};

const STORAGE_KEY = "vlearnin_site_content_v1";
const FIRESTORE_COLLECTION = "site_content";
const FIRESTORE_DOC = "published";

export function mergeSiteContent(
  base: SiteContent,
  override?: Partial<SiteContent> | null,
): SiteContent {
  if (!override || typeof override !== "object") return base;
  return {
    ...base,
    ...override,
    brand: { ...base.brand, ...(override.brand || {}) },
    header: { ...base.header, ...(override.header || {}) },
    quickAccess: { ...base.quickAccess, ...(override.quickAccess || {}) },
    brandIntro: { ...base.brandIntro, ...(override.brandIntro || {}) },
    domainsSection: { ...base.domainsSection, ...(override.domainsSection || {}) },
    discoverySection: { ...base.discoverySection, ...(override.discoverySection || {}) },
    combosSection: { ...base.combosSection, ...(override.combosSection || {}) },
    advantagesSection: { ...base.advantagesSection, ...(override.advantagesSection || {}) },
    placementSection: { ...base.placementSection, ...(override.placementSection || {}) },
    academicSection: { ...base.academicSection, ...(override.academicSection || {}) },
    campusSection: { ...base.campusSection, ...(override.campusSection || {}) },
    finalCtaSection: { ...base.finalCtaSection, ...(override.finalCtaSection || {}) },
    footer: { ...base.footer, ...(override.footer || {}) },
    heroBanners: Array.isArray(override.heroBanners) ? override.heroBanners : base.heroBanners,
    categories: Array.isArray(override.categories) ? override.categories : base.categories,
    courses: Array.isArray(override.courses) ? override.courses : base.courses,
    combos: Array.isArray(override.combos) ? override.combos : base.combos,
    customSections: Array.isArray(override.customSections) ? override.customSections : base.customSections,
  };
}

export function loadLocalSiteContent(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_SITE_CONTENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return mergeSiteContent(DEFAULT_SITE_CONTENT, parsed);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export async function loadRemoteSiteContent(): Promise<SiteContent | null> {
  if (typeof window === "undefined") return null;
  try {
    const db = getFirestore(firebaseApp);
    const snap = await getDoc(doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC));
    if (!snap.exists()) return null;
    const data = snap.data() as Partial<SiteContent>;
    const merged = mergeSiteContent(DEFAULT_SITE_CONTENT, data);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return null;
  }
}

export async function persistSiteContent(content: SiteContent): Promise<{ remoteSynced: boolean }> {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new CustomEvent("vlearnin:content-updated"));
  }
  try {
    const db = getFirestore(firebaseApp);
    await setDoc(doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC), {
      ...content,
      updatedAt: new Date().toISOString(),
    });
    return { remoteSynced: true };
  } catch {
    return { remoteSynced: false };
  }
}

export async function resetPersistedSiteContent(): Promise<SiteContent> {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("vlearnin:content-updated"));
  }
  try {
    const db = getFirestore(firebaseApp);
    await setDoc(doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC), {
      ...DEFAULT_SITE_CONTENT,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    // ignore if Firestore not initialized
  }
  return DEFAULT_SITE_CONTENT;
}

export function setValueByPath<T extends object>(obj: T, path: string, value: unknown): T {
  const parts = path.split(".");
  const clone = structuredClone(obj) as Record<string, any>;
  let curr: Record<string, any> = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (curr[key] === undefined || curr[key] === null) {
      curr[key] = /^\d+$/.test(parts[i + 1]) ? [] : {};
    }
    curr = curr[key];
  }
  curr[parts[parts.length - 1]] = value;
  return clone as T;
}

export function getValueByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let curr: any = obj;
  for (const key of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[key];
  }
  return curr;
}
