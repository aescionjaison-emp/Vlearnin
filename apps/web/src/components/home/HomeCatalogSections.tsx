"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  GraduationCap,
  Layers,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import {
  OfficialCategorySeed,
  OfficialComboSeed,
  OfficialCourseSeed,
} from "@vlearnin/shared";
import { useLeadModal } from "@/components/LeadModalProvider";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import {
  ProgrammeCardItem,
  ProgrammeFilterMotion,
} from "@/components/motion/ProgrammeFilterMotion";
import { FlipCard } from "@/components/motion/FlipCard";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableImageTrigger,
  EditableText,
} from "@/components/EditableText";

const FILTER_TABS = [
  { id: "all", label: "All Programmes" },
  { id: "ai-business-intelligence", label: "AI & Business Intelligence" },
  { id: "corporate-finance-capital-markets", label: "Finance & Investment Banking" },
  { id: "digital-marketing-creative-media", label: "Digital Marketing & Media" },
];

const ADVANTAGE_ICONS = [Sparkles, Users, ShieldCheck, Clock] as const;
const PLACEMENT_ICONS = [Layers, FileCheck2, GraduationCap, Briefcase] as const;
const DOMAIN_SURFACES = ["#F8F5EE", "#F1F5FB", "#FBF4F1"] as const;
const COURSE_SURFACES = [
  "#F8F5EE",
  "#F1F5FB",
  "#F8F5EE",
  "#F1F5FB",
  "#F7F8FA",
  "#FBF4F1",
  "#F1F5FB",
] as const;

export function HomeCatalogSections({
  categories: propCategories,
  courses: propCourses,
  combos: propCombos,
}: {
  categories?: OfficialCategorySeed[];
  courses?: OfficialCourseSeed[];
  combos?: OfficialComboSeed[];
}) {
  const { openDemoModal, openBrochureModal } = useLeadModal();
  const { content } = useSiteContent();
  const categories = content.categories.length > 0 ? content.categories : (propCategories || []);
  const courses = content.courses.length > 0 ? content.courses : (propCourses || []);
  const combos = content.combos.length > 0 ? content.combos : (propCombos || []);

  const [activeFilter, setActiveFilter] = useState("all");
  const [activePlacementStage, setActivePlacementStage] = useState(0);

  const domainsRef = useRef<HTMLElement>(null);
  const coursesGridRef = useRef<HTMLDivElement>(null);
  const combosRef = useRef<HTMLElement>(null);
  const advantagesRef = useRef<HTMLElement>(null);
  const placementRef = useRef<HTMLElement>(null);
  const academicRef = useRef<HTMLElement>(null);
  const academicFrameRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((c) => c.categorySlug === activeFilter);

  useEffect(() => {
    if (isReducedMotionOrDisabled()) return;

    // ── 14. LEARNING DOMAINS: Expanding Photographic Panels ──
    const domainsCtx = gsap.context(() => {
      if (!domainsRef.current) return;
      const photos = gsap.utils.toArray<HTMLElement>(".domain-photo-v3", domainsRef.current);
      const titles = gsap.utils.toArray<HTMLElement>(".domain-title-v3", domainsRef.current);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: domainsRef.current, start: "top 84%", once: true },
        defaults: { ease: "expo.out" },
      });

      photos.forEach((p, idx) => {
        tl.fromTo(
          p,
          { clipPath: "inset(12% 12% 12% 12% round 12px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.85, clearProps: "clipPath" },
          idx * 0.09,
        );
        const img = p.querySelector("img");
        if (img) {
          tl.fromTo(img, { scale: 1.09 }, { scale: 1, duration: 0.95, clearProps: "transform" }, idx * 0.09);
        }
      });

      tl.fromTo(
        titles,
        { x: 24, opacity: 0.45 },
        { x: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: "power3.out", clearProps: "transform,opacity" },
        0.15,
      );
    }, domainsRef);

    // ── 15. CERTIFICATION PROGRAMMES: Creative Staggered Grid ──
    const coursesCtx = gsap.context(() => {
      if (!coursesGridRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(".course-card-v3", coursesGridRef.current);
      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        { y: 32, opacity: 0.45 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: coursesGridRef.current, start: "top 86%", once: true },
        },
      );

      cards.forEach((card, idx) => {
        const photo = card.querySelector(".course-photo-v3");
        if (photo) {
          gsap.fromTo(
            photo,
            { clipPath: idx % 2 === 0 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.78,
              delay: (idx % 3) * 0.08,
              ease: "expo.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            },
          );
        }
      });
    }, coursesGridRef);

    // ── 16. CAREER ACCELERATOR COMBOS: Alternating Directional Motion ──
    const combosCtx = gsap.context(() => {
      if (!combosRef.current) return;
      const comboCards = gsap.utils.toArray<HTMLElement>(".combo-card-v3", combosRef.current);
      const clipDirections = [
        "inset(0 100% 0 0)",
        "inset(0 0 0 100%)",
        "inset(100% 0 0 0)",
        "inset(12% 10% 12% 10%)",
      ];

      comboCards.forEach((card, idx) => {
        const photo = card.querySelector(".combo-photo-v3");
        const body = card.querySelector(".combo-body-v3");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
          defaults: { ease: "power3.out" },
        });

        if (photo) {
          tl.fromTo(
            photo,
            { clipPath: clipDirections[idx % 4] },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.out", clearProps: "clipPath" },
            0,
          );
        }
        if (body) {
          tl.fromTo(
            body,
            { x: idx % 2 === 0 ? 26 : -26, opacity: 0.45 },
            { x: 0, opacity: 1, duration: 0.68, clearProps: "transform,opacity" },
            0.12,
          );
        }
      });
    }, combosRef);

    // ── 17. VLEARNIN ADVANTAGES: Animated Bento Grid (4 Varied Entrances) ──
    const advCtx = gsap.context(() => {
      if (!advantagesRef.current) return;
      const bentoCards = gsap.utils.toArray<HTMLElement>(".bento-card-v3", advantagesRef.current);
      const portrait = advantagesRef.current.querySelector(".adv-portrait-v3");

      if (portrait) {
        gsap.fromTo(
          portrait,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            ease: "expo.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: advantagesRef.current, start: "top 84%", once: true },
          },
        );
      }

      const variants = [
        { y: 28, opacity: 0.4 },
        { x: 28, opacity: 0.4 },
        { scale: 0.94, opacity: 0.4 },
        { y: -20, opacity: 0.4 },
      ];

      bentoCards.forEach((card, idx) => {
        gsap.fromTo(card, variants[idx % 4], {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.68,
          delay: idx * 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: advantagesRef.current, start: "top 84%", once: true },
        });
      });
    }, advantagesRef);

    // ── 18. PLACEMENT ASSISTANCE: Continuous Scroll-Linked Journey ──
    const placeCtx = gsap.context(() => {
      if (!placementRef.current) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          ".placement-line-h",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: placementRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => setActivePlacementStage(Math.min(3, Math.floor(self.progress * 4))),
            },
          },
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".placement-line-v",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: placementRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => setActivePlacementStage(Math.min(3, Math.floor(self.progress * 4))),
            },
          },
        );
      });

      gsap.fromTo(
        ".placement-card-v3",
        { y: 24, opacity: 0.45 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: placementRef.current, start: "top 84%", once: true },
        },
      );

      return () => mm.revert();
    }, placementRef);

    // ── 19. ACADEMIC PARTNERSHIPS: Photographic Expansion Within Container ──
    const academicCtx = gsap.context(() => {
      if (!academicRef.current || !academicFrameRef.current) return;

      gsap.fromTo(
        academicFrameRef.current,
        { clipPath: "inset(8% 10% 8% 10% round 12px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          ease: "none",
          scrollTrigger: {
            trigger: academicRef.current,
            start: "top 86%",
            end: "center 48%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        ".academic-text-v3",
        { x: -26, opacity: 0.45 },
        {
          x: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: academicRef.current, start: "top 84%", once: true },
        },
      );
    }, academicRef);

    // ── 20. CAMPUS EXPERIENCE: Photo Masks ──
    const campusCtx = gsap.context(() => {
      if (!campusRef.current) return;
      const tiles = gsap.utils.toArray<HTMLElement>(".campus-tile-v3", campusRef.current);
      gsap.fromTo(
        tiles,
        { clipPath: "inset(14% 0 0 0 round 12px)", opacity: 0.55 },
        {
          clipPath: "inset(0% 0 0 0 round 12px)",
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
          clearProps: "clipPath,opacity",
          scrollTrigger: { trigger: campusRef.current, start: "top 86%", once: true },
        },
      );
    }, campusRef);

    // ── 21. FINAL ENQUIRY: Split Editorial Reveal (750ms) ──
    const finalCtx = gsap.context(() => {
      if (!finalCtaRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: finalCtaRef.current, start: "top 88%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".final-accent-v3",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, clearProps: "transform" },
        0,
      )
        .fromTo(
          ".final-left-v3",
          { y: 22, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, clearProps: "transform,opacity" },
          0.08,
        )
        .fromTo(
          ".final-right-v3",
          { x: 26, opacity: 0.45 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.07, clearProps: "transform,opacity" },
          0.18,
        );
    }, finalCtaRef);

    return () => {
      domainsCtx.revert();
      coursesCtx.revert();
      combosCtx.revert();
      advCtx.revert();
      placeCtx.revert();
      academicCtx.revert();
      campusCtx.revert();
      finalCtx.revert();
    };
  }, []);

  return (
    <div>
      {/* 14 — LEARNING DOMAINS: Expanding Photographic Panels */}
      <section ref={domainsRef} className="py-16 lg:py-24 bg-white border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="h-[2px] w-7 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#526477]">Academic Pathways</span>
            </div>
            <EditableText
              as="h2"
              path="domainsSection.heading"
              value={content.domainsSection.heading}
              className="type-section-heading text-[#10264A]"
            />
            <EditableText
              as="p"
              path="domainsSection.description"
              value={content.domainsSection.description}
              className="mc-lead text-[#526477] mt-2"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {categories.map((cat, idx) => {
              const domainCourses = courses.filter((c) => c.categorySlug === cat.slug);
              const ctaLabel =
                cat.slug === "ai-business-intelligence"
                  ? "Explore AI & Analytics"
                  : cat.slug === "corporate-finance-capital-markets"
                    ? "Explore Finance & IB"
                    : "Explore Digital & Media";
              const cardBg = DOMAIN_SURFACES[idx % DOMAIN_SURFACES.length];

              return (
                <article
                  key={cat.slug}
                  style={{ backgroundColor: cardBg }}
                  className="mc-card-hover border border-[#E1E6EC] hover:border-[#2463A6] rounded-[12px] overflow-hidden flex flex-col justify-between group relative"
                >
                  <EditableDeleteButton
                    path="categories"
                    index={idx}
                    label="Delete Domain"
                    className="absolute top-3 left-3 z-30"
                  />
                  <div>
                    <div className="domain-photo-v3 relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover mc-image-zoom"
                      />
                      <EditableImageTrigger path={`categories.${idx}.image`} currentSrc={cat.image} />
                      <span className="absolute top-3 left-3 bg-[#10264A] text-white font-nav text-xs font-semibold px-3 py-1 rounded-[6px]">
                        Domain 0{idx + 1}
                      </span>
                    </div>

                    <div className="p-6 sm:p-7 space-y-4">
                      <div>
                        <span className="block h-[2px] w-8 bg-[#C49A59] mb-2.5" />
                        <EditableText
                          as="h3"
                          path={`categories.${idx}.name`}
                          value={cat.name}
                          className="domain-title-v3 font-heading text-xl sm:text-2xl font-extrabold text-[#10264A] tracking-[-0.025em]"
                        />
                      </div>
                      <EditableText
                        as="p"
                        path={`categories.${idx}.outcomeSummary`}
                        value={cat.outcomeSummary}
                        className="text-sm sm:text-base text-[#526477] leading-relaxed"
                      />
                      <ul className="space-y-2 border-y border-[#E1E6EC] py-3.5">
                        {domainCourses.map((dc) => (
                          <li key={dc.slug}>
                            <Link
                              href={`/courses/${dc.slug}`}
                              className="motion-link text-sm font-nav font-semibold text-[#2463A6] hover:text-[#10264A]"
                            >
                              <ArrowRight className="arrow w-3.5 h-3.5 text-[#C49A59] shrink-0" />
                              <span>{dc.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 pb-6">
                    <Link
                      href={`/courses?category=${cat.slug}`}
                      className="btn-navy mc-icon-btn w-full justify-center px-5 py-2.5 text-sm inline-flex items-center gap-2"
                    >
                      <span>{ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex justify-end">
            <EditableAddButton
              path="categories"
              label="Add Domain"
              createItem={() => ({
                slug: `domain-${Date.now()}`,
                name: "New Learning Domain",
                shortName: "New Domain",
                description: "Domain description.",
                outcomeSummary: "Describe what learners master in this domain.",
                image: "/images/domain-analytics.jpg",
                displayOrder: categories.length + 1,
              })}
            />
          </div>
        </div>
      </section>

      {/* 15 — CERTIFICATION PROGRAMMES: Creative Staggered Grid */}
      <section className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-[2px] w-7 bg-[#C49A59]" />
                <span className="type-eyebrow text-[#526477]">Certification Catalogue</span>
              </div>
              <EditableText
                as="h2"
                path="discoverySection.heading"
                value={content.discoverySection.heading}
                className="type-section-heading text-[#10264A]"
              />
            </div>

            <Link
              href="/courses"
              className="btn-primary-amber mc-icon-btn px-5 py-2.5 text-sm inline-flex items-center gap-2 self-start lg:self-auto"
            >
              <span>View All 7 Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div
            role="tablist"
            aria-label="Filter certification programmes"
            className="flex flex-wrap gap-2 mb-10 border-b border-[#E1E6EC] pb-4"
          >
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`font-nav text-xs sm:text-sm font-semibold px-4 py-2 rounded-[6px] transition-colors duration-200 cursor-pointer ${
                    active
                      ? "bg-[#2463A6] text-white"
                      : "bg-white border border-[#E1E6EC] text-[#10264A] hover:border-[#2463A6]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div ref={coursesGridRef}>
            <ProgrammeFilterMotion className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredCourses.map((course, idx) => {
                const cIdx = courses.findIndex((c) => c.slug === course.slug);
                const cardSurface = COURSE_SURFACES[(cIdx >= 0 ? cIdx : idx) % COURSE_SURFACES.length];
                return (
                  <ProgrammeCardItem
                    key={course.slug}
                    layoutKey={course.slug}
                    style={{ backgroundColor: cardSurface }}
                    className="course-card-v3 mc-card-hover border border-[#E1E6EC] hover:border-[#2463A6] rounded-[12px] overflow-hidden flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="course-photo-v3 relative h-52 w-full overflow-hidden">
                        {cIdx >= 0 && (
                          <EditableDeleteButton
                            path="courses"
                            index={cIdx}
                            label="Delete"
                            className="absolute top-3 left-3 z-30"
                          />
                        )}
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover mc-image-zoom"
                        />
                        {cIdx >= 0 && (
                          <EditableImageTrigger path={`courses.${cIdx}.image`} currentSrc={course.image} />
                        )}
                        <span className="absolute bottom-3 left-3 bg-[#10264A]/95 text-white font-nav text-xs font-semibold px-3 py-1 rounded-[6px]">
                          Programme 0{idx + 1}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <span className="block h-[2px] w-7 bg-[#C49A59]" />
                        <EditableText
                          as="p"
                          path={cIdx >= 0 ? `courses.${cIdx}.categoryName` : "discoverySection.eyebrow"}
                          value={course.categoryName}
                          className="block font-heading text-xs font-extrabold uppercase tracking-wider text-[#C49A59]"
                        />
                        <EditableText
                          as="h3"
                          path={cIdx >= 0 ? `courses.${cIdx}.title` : "discoverySection.heading"}
                          value={course.title}
                          className="font-heading text-xl font-bold text-[#10264A] leading-snug tracking-[-0.025em]"
                        />
                        <div className="flex flex-wrap gap-4 text-xs font-nav text-[#526477]">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#C49A59]" />
                            {course.durationHours} Hours
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#2463A6]" />
                            5 Modules + Capstone
                          </span>
                        </div>
                        <EditableText
                          as="p"
                          path={cIdx >= 0 ? `courses.${cIdx}.summary` : "discoverySection.heading"}
                          value={course.summary}
                          className="text-sm text-[#526477] leading-relaxed"
                        />
                        <p className="text-xs font-nav text-[#526477]">
                          <strong className="text-[#10264A]">Modes:</strong> {course.learningModes.join(" • ")}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-[#E1E6EC] grid grid-cols-2 gap-3">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="btn-outline-navy mc-icon-btn py-2.5 text-xs text-center"
                      >
                        View Programme
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          openDemoModal({
                            preselectedProgramme: course.title,
                            sourcePage: "homepage-programme-grid",
                          })
                        }
                        className="btn-primary-amber mc-icon-btn py-2.5 text-xs cursor-pointer"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </ProgrammeCardItem>
                );
              })}
            </ProgrammeFilterMotion>
          </div>

          <div className="mt-6 flex justify-end">
            <EditableAddButton
              path="courses"
              label="Add Programme"
              createItem={() => ({
                slug: `programme-${Date.now()}`,
                title: "New Certification Programme",
                categorySlug: categories[0]?.slug || "ai-business-intelligence",
                categoryName: categories[0]?.name || "AI & Business Intelligence",
                durationHours: 30,
                durationLabel: "30 Hours (5 Modules × 6 Hours)",
                idealFor: "Students and working professionals",
                summary: "Hands-on 30-hour certification track with live projects.",
                overview: "Practical instructor-led certification programme.",
                capstoneTitle: "Live Capstone Project",
                capstoneDescription: "Build a portfolio-ready capstone project.",
                careerPathways: ["Analyst", "Specialist"],
                learningModes: ["Classroom (Rajajinagar)", "Live Online"],
                image: "/images/course-ai-commerce.jpg",
                tools: ["AI Tools", "Excel"],
                outcomes: ["Build real-world projects"],
                modules: [],
              })}
            />
          </div>
        </div>
      </section>

      {/* 16 — CAREER ACCELERATOR COMBOS: Alternating Directional Motion */}
      <section ref={combosRef} className="py-16 lg:py-24 bg-white border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-[2px] w-7 bg-[#C49A59]" />
                <span className="type-eyebrow text-[#526477]">Dual-Skill Tracks</span>
              </div>
              <EditableText
                as="h2"
                path="combosSection.heading"
                value={content.combosSection.heading}
                className="type-section-heading text-[#10264A]"
              />
              <EditableText
                as="p"
                path="combosSection.description"
                value={content.combosSection.description}
                className="text-base text-[#526477] mt-2"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/career-combos" className="btn-navy mc-icon-btn px-5 py-2.5 text-sm">
                Explore Career Combos
              </Link>
              <button
                type="button"
                onClick={() => openBrochureModal({ brochureType: "complete" })}
                className="btn-primary-amber mc-icon-btn px-5 py-2.5 text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Complete Course Brochure
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {combos.map((combo, idx) => (
              <article
                key={combo.slug}
                className="combo-card-v3 mc-card-hover bg-[#FAF9F6] border border-[#E1E6EC] hover:border-[#2463A6] hover:bg-white rounded-[12px] overflow-hidden grid grid-cols-1 sm:grid-cols-12 relative group"
              >
                <EditableDeleteButton
                  path="combos"
                  index={idx}
                  label="Delete"
                  className="absolute top-3 right-3 z-30"
                />
                <div className="combo-photo-v3 sm:col-span-5 relative min-h-[220px] overflow-hidden">
                  <Image
                    src={combo.image}
                    alt={combo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="object-cover mc-image-zoom"
                  />
                  <EditableImageTrigger path={`combos.${idx}.image`} currentSrc={combo.image} />
                  <EditableText
                    path={`combos.${idx}.durationLabel`}
                    value={combo.durationLabel}
                    className="absolute top-3 left-3 bg-[#10264A] text-white font-nav text-xs font-semibold px-3 py-1 rounded-[6px]"
                  />
                </div>

                <div className="combo-body-v3 sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="font-heading text-xs font-extrabold text-[#2463A6]">
                      Track 0{idx + 1}
                    </span>
                    <EditableText
                      as="h3"
                      path={`combos.${idx}.title`}
                      value={combo.title}
                      className="font-heading text-xl font-bold text-[#10264A]"
                    />
                    <EditableText
                      as="p"
                      path={`combos.${idx}.includedLabel`}
                      value={combo.includedLabel}
                      className="text-xs font-nav font-semibold text-[#2463A6]"
                    />
                    <EditableText
                      as="p"
                      path={`combos.${idx}.summary`}
                      value={combo.summary}
                      className="text-sm text-[#526477]"
                    />
                    <p className="text-xs text-[#526477]">
                      <strong className="text-[#10264A]">Ideal For:</strong>{" "}
                      <EditableText path={`combos.${idx}.idealFor`} value={combo.idealFor} />
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E1E6EC]">
                    <Link
                      href={`/career-combos/${combo.slug}`}
                      className="motion-link font-nav text-xs font-semibold uppercase tracking-wider text-[#2463A6] hover:text-[#10264A]"
                    >
                      <span>View Track</span>
                      <ArrowRight className="arrow w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        openDemoModal({
                          preselectedProgramme: `${combo.title} (${combo.durationLabel})`,
                          sourcePage: "homepage-combo",
                        })
                      }
                      className="font-nav text-xs font-semibold text-[#10264A] hover:text-[#2463A6] hover:underline cursor-pointer"
                    >
                      Book Free Demo →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-end">
            <EditableAddButton
              path="combos"
              label="Add Career Combo"
              createItem={() => ({
                slug: `combo-${Date.now()}`,
                title: "New Career Accelerator Combo",
                durationHours: 60,
                durationLabel: "60 Hours Dual-Skill",
                includedLabel: "2 Integrated Certifications",
                idealFor: "Graduates & job seekers",
                summary: "Dual-skill career track combining practical tools and capstones.",
                outcomes: ["Portfolio-ready capstone"],
                courseSlugs: [],
                image: "/images/hero-2.jpg",
                displayOrder: combos.length + 1,
              })}
            />
          </div>
        </div>
      </section>

      {/* 17 — VLEARNIN ADVANTAGES: Animated Bento Grid */}
      <section ref={advantagesRef} className="py-16 lg:py-24 bg-[#F7F8FA] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="adv-portrait-v3 lg:col-span-5 relative aspect-[4/3] lg:aspect-[4/5] border border-[#E1E6EC] rounded-[12px] shadow-xs bg-white overflow-hidden group">
            <Image
              src={content.advantagesSection.image}
              alt={content.advantagesSection.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover mc-image-zoom"
            />
            <EditableImageTrigger
              path="advantagesSection.image"
              currentSrc={content.advantagesSection.image}
              altPath="advantagesSection.imageAlt"
              currentAlt={content.advantagesSection.imageAlt}
            />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-[2px] w-7 bg-[#C49A59]" />
                <span className="type-eyebrow text-[#526477]">The VLEARNIN Advantage</span>
              </div>
              <EditableText
                as="h2"
                path="advantagesSection.heading"
                value={content.advantagesSection.heading}
                className="type-section-heading text-[#10264A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.advantagesSection.items.map((adv, advIdx) => {
                const Icon = ADVANTAGE_ICONS[advIdx % ADVANTAGE_ICONS.length];
                return (
                  <div key={advIdx} className="bento-card-v3 relative">
                    <EditableDeleteButton
                      path="advantagesSection.items"
                      index={advIdx}
                      label="×"
                      className="absolute top-2 right-2 z-30 px-1.5 py-0.5 text-[10px]"
                    />
                    <FlipCard
                      className="h-52"
                      front={
                        <div className="h-full p-6 bg-white border border-[#E1E6EC] hover:border-[#2463A6] border-l-4 border-l-[#2463A6] flex flex-col justify-between rounded-[12px] transition-colors duration-200">
                          <div className="flex items-center justify-between">
                            <Icon className="w-6 h-6 text-[#2463A6]" />
                            <EditableText
                              path={`advantagesSection.items.${advIdx}.num`}
                              value={adv.num}
                              className="font-heading text-2xl font-extrabold text-[#2463A6]/40"
                            />
                          </div>
                          <div>
                            <EditableText
                              as="h3"
                              path={`advantagesSection.items.${advIdx}.title`}
                              value={adv.title}
                              className="font-heading text-lg font-bold text-[#10264A]"
                            />
                            <p className="font-nav text-xs font-semibold text-[#2463A6] mt-2">
                              Hover or tap for details →
                            </p>
                          </div>
                        </div>
                      }
                      back={
                        <div className="h-full p-6 bg-[#10264A] text-white border-t-4 border-[#C49A59] flex flex-col justify-center space-y-2 rounded-[12px]">
                          <span className="font-nav text-xs font-semibold uppercase tracking-wider text-[#C49A59]">
                            Advantage {adv.num}
                          </span>
                          <h4 className="font-heading text-lg font-bold text-white">{adv.title}</h4>
                          <EditableText
                            as="p"
                            path={`advantagesSection.items.${advIdx}.description`}
                            value={adv.description}
                            className="text-sm text-white/85 leading-relaxed"
                          />
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <EditableAddButton
                path="advantagesSection.items"
                label="Add Advantage Card"
                createItem={() => ({
                  num: `0${content.advantagesSection.items.length + 1}`,
                  title: "New Advantage",
                  description: "Describe this advantage.",
                })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 18 — PLACEMENT ASSISTANCE: Creative Scroll-Linked Journey */}
      <section ref={placementRef} className="py-16 lg:py-24 bg-white border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-[2px] w-7 bg-[#C49A59]" />
                <span className="type-eyebrow text-[#526477]">Career Readiness</span>
              </div>
              <EditableText
                as="h2"
                path="placementSection.heading"
                value={content.placementSection.heading}
                className="type-section-heading text-[#10264A]"
              />
            </div>
            <Link
              href="/placement-assistance"
              className="btn-primary-amber mc-icon-btn px-5 py-2.5 text-sm inline-flex items-center gap-2 self-start lg:self-auto"
            >
              <EditableText path="placementSection.ctaLabel" value={content.placementSection.ctaLabel} />
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative space-y-5">
            <div className="hidden lg:block h-[3px] w-full bg-[#E1E6EC] rounded-full overflow-hidden">
              <div className="placement-line-h h-full w-full bg-[#2463A6] origin-left" />
            </div>

            <div className="relative pl-5 lg:pl-0">
              <div className="lg:hidden absolute left-1 top-2 bottom-2 w-[3px] bg-[#E1E6EC] rounded-full overflow-hidden">
                <div className="placement-line-v w-full h-full bg-[#2463A6] origin-top" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.placementSection.stages.map((item, sIdx) => {
                  const Icon = PLACEMENT_ICONS[sIdx % PLACEMENT_ICONS.length];
                  const reached = sIdx <= activePlacementStage;
                  return (
                    <div
                      key={sIdx}
                      className={`placement-card-v3 border border-t-4 p-6 space-y-3 transition-colors duration-250 rounded-[12px] relative ${
                        reached
                          ? "bg-[#F1F6FB] border-[#E1E6EC] border-t-[#2463A6]"
                          : "bg-[#F7F8FA] border-[#E1E6EC] border-t-[#E1E6EC]"
                      }`}
                    >
                      <EditableDeleteButton
                        path="placementSection.stages"
                        index={sIdx}
                        label="×"
                        className="absolute top-2 right-2 px-1.5 py-0.5 text-[10px]"
                      />
                      <div className="flex items-center justify-between">
                        <EditableText
                          path={`placementSection.stages.${sIdx}.step`}
                          value={item.step}
                          className={`font-heading text-xs font-extrabold uppercase tracking-wider transition-colors ${
                            reached ? "text-[#2463A6]" : "text-[#718096]"
                          }`}
                        />
                        <Icon className="w-5 h-5 text-[#10264A]" />
                      </div>
                      <EditableText
                        as="h3"
                        path={`placementSection.stages.${sIdx}.title`}
                        value={item.title}
                        className="font-heading text-lg font-bold text-[#10264A]"
                      />
                      <EditableText
                        as="p"
                        path={`placementSection.stages.${sIdx}.desc`}
                        value={item.desc}
                        className="text-sm text-[#526477] leading-relaxed"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <EditableAddButton
                path="placementSection.stages"
                label="Add Placement Stage"
                createItem={() => ({
                  step: `Step 0${content.placementSection.stages.length + 1}`,
                  title: "New Stage",
                  desc: "Describe this placement stage.",
                })}
              />
            </div>
          </div>

          <EditableText
            as="p"
            path="brand.placementDisclaimer"
            value={content.brand.placementDisclaimer}
            className="text-xs text-[#718096] border-t border-[#E1E6EC] pt-5"
          />
        </div>
      </section>

      {/* 19 — ACADEMIC PARTNERSHIPS: Photographic Expansion Within Container */}
      <section ref={academicRef} className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="academic-text-v3 flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#526477]">Institutional Collaborations</span>
            </div>
            <EditableText
              as="h2"
              path="academicSection.heading"
              value={content.academicSection.heading}
              className="academic-text-v3 type-section-heading text-[#10264A]"
            />
            <EditableText
              as="p"
              path="academicSection.description"
              value={content.academicSection.description}
              className="academic-text-v3 text-base text-[#526477] leading-relaxed"
            />
            <div className="academic-text-v3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {content.academicSection.bullets.map((item, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2 text-sm text-[#10264A] justify-between">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2463A6] shrink-0 mt-0.5" />
                    <EditableText path={`academicSection.bullets.${bIdx}`} value={item} />
                  </div>
                  <EditableDeleteButton
                    path="academicSection.bullets"
                    index={bIdx}
                    label="×"
                    className="px-1.5 py-0.5 text-[10px] shrink-0"
                  />
                </div>
              ))}
            </div>
            <div className="academic-text-v3 flex flex-wrap gap-3.5 pt-3 items-center">
              <EditableAddButton
                path="academicSection.bullets"
                label="Add Bullet"
                createItem={() => "New academic partnership highlight"}
              />
              <Link href="/academic-partnerships" className="btn-primary-amber mc-icon-btn px-5 py-2.5 text-sm">
                <EditableText path="academicSection.primaryCtaLabel" value={content.academicSection.primaryCtaLabel} />
              </Link>
              <Link href="/academic-partnerships#institutional-form" className="btn-outline-navy mc-icon-btn px-5 py-2.5 text-sm">
                <EditableText path="academicSection.secondaryCtaLabel" value={content.academicSection.secondaryCtaLabel} />
              </Link>
            </div>
          </div>

          <div
            ref={academicFrameRef}
            className="lg:col-span-6 relative aspect-[16/10] border border-[#E1E6EC] shadow-sm rounded-[12px] overflow-hidden"
          >
            <ParallaxImage travelPx={10} className="relative w-full h-full">
              <Image
                src={content.academicSection.image}
                alt={content.academicSection.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ParallaxImage>
            <EditableImageTrigger
              path="academicSection.image"
              currentSrc={content.academicSection.image}
              altPath="academicSection.imageAlt"
              currentAlt={content.academicSection.imageAlt}
            />
          </div>
        </div>
      </section>

      {/* 20 — CAMPUS EXPERIENCE: Multi-Layer Parallax + Masks */}
      <section ref={campusRef} className="py-16 lg:py-24 bg-white border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <EditableText
                as="h2"
                path="campusSection.heading"
                value={content.campusSection.heading}
                className="type-section-heading text-[#10264A]"
              />
              <EditableText
                as="p"
                path="campusSection.description"
                value={content.campusSection.description}
                className="text-base text-[#526477] mt-2"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-outline-navy mc-icon-btn px-4 py-2 text-sm inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <EditableText path="campusSection.visitLabel" value={content.campusSection.visitLabel} />
              </Link>
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "campus-experience" })}
                className="btn-primary-amber mc-icon-btn px-4 py-2 text-sm cursor-pointer"
              >
                <EditableText path="campusSection.demoLabel" value={content.campusSection.demoLabel} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {content.campusSection.gallery.map((item, gIdx) => (
              <div
                key={gIdx}
                className="campus-tile-v3 group relative aspect-[4/5] border border-[#E1E6EC] bg-[#FAF9F6] rounded-[12px] overflow-hidden"
              >
                <EditableDeleteButton
                  path="campusSection.gallery"
                  index={gIdx}
                  label="Delete"
                  className="absolute top-3 left-3 z-30"
                />
                <ParallaxImage travelPx={gIdx % 2 === 0 ? 18 : 10} className="relative w-full h-full">
                  {item.video || item.src.startsWith("data:video/") || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(item.src) ? (
                    <video
                      src={item.video || item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover"
                    />
                  )}
                </ParallaxImage>
                <EditableImageTrigger
                  path={`campusSection.gallery.${gIdx}.src`}
                  currentSrc={item.src}
                  altPath={`campusSection.gallery.${gIdx}.alt`}
                  currentAlt={item.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10264A]/85 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                  <EditableText
                    as="p"
                    path={`campusSection.gallery.${gIdx}.title`}
                    value={item.title}
                    className="font-nav text-xs sm:text-sm font-semibold text-white leading-snug"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <EditableAddButton
              path="campusSection.gallery"
              label="Add Gallery Photo"
              createItem={() => ({
                src: "/images/hero-1.jpg",
                title: "New Campus Highlight",
                alt: "VLEARNIN campus learning environment",
              })}
            />
          </div>
        </div>
      </section>

      {/* CUSTOM SECTIONS ADDED BY ADMIN */}
      {content.customSections.map((sec, sIdx) => (
        <section
          key={sec.id || sIdx}
          className={`py-16 lg:py-20 border-b border-[#E1E6EC] relative ${
            sec.theme === "blue" ? "bg-[#F1F6FB] text-[#10264A]" : "bg-white text-[#10264A]"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-end">
                <EditableDeleteButton path="customSections" index={sIdx} label="Delete Section" />
              </div>
              <EditableText
                as="h2"
                path={`customSections.${sIdx}.heading`}
                value={sec.heading}
                className="type-section-heading text-[#10264A]"
              />
              <EditableText
                as="p"
                path={`customSections.${sIdx}.description`}
                value={sec.description}
                className="text-base leading-relaxed text-[#526477]"
              />
              {sec.ctaLabel && (
                <div className="pt-2">
                  <Link
                    href={sec.ctaHref || "/contact"}
                    className="btn-navy mc-icon-btn px-5 py-2.5 text-sm inline-flex items-center gap-2"
                  >
                    <EditableText path={`customSections.${sIdx}.ctaLabel`} value={sec.ctaLabel} />
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
            <div className="lg:col-span-5 relative aspect-[16/10] rounded-[12px] border border-[#E1E6EC] overflow-hidden">
              {sec.video || (sec.image && (sec.image.startsWith("data:video/") || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(sec.image))) ? (
                <video
                  src={sec.video || sec.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={sec.image || "/images/hero-1.jpg"}
                  alt={sec.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              )}
              <EditableImageTrigger path={`customSections.${sIdx}.image`} currentSrc={sec.image || "/images/hero-1.jpg"} />
            </div>
          </div>
        </section>
      ))}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-4 flex justify-center">
        <EditableAddButton
          path="customSections"
          label="Add New Custom Section"
          createItem={() => ({
            id: `custom-${Date.now()}`,
            eyebrow: "NEW ANNOUNCEMENT",
            heading: "New Custom Section Heading",
            description: "Click here to write your custom section content.",
            ctaLabel: "Learn More",
            ctaHref: "/courses",
            image: "/images/about-campus.jpg",
            theme: "light",
          })}
        />
      </div>

      {/* 21 — FINAL ENQUIRY: Split Editorial Reveal */}
      <section ref={finalCtaRef} className="py-16 lg:py-20 bg-[#F1F6FB] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="bg-white text-[#10264A] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-[#E1E6EC] border-l-4 border-l-[#C49A59] rounded-[12px] shadow-xs">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="final-accent-v3 origin-left h-[2px] w-7 bg-[#C49A59]" />
                <span className="type-eyebrow text-[#526477]">Admissions &amp; Career Guidance</span>
              </div>
              <EditableText
                as="h2"
                path="finalCtaSection.heading"
                value={content.finalCtaSection.heading}
                className="final-left-v3 type-section-heading text-[#10264A]"
              />
              <EditableText
                as="p"
                path="finalCtaSection.description"
                value={content.finalCtaSection.description}
                className="final-left-v3 text-base text-[#526477] leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "homepage-final-cta" })}
                className="final-right-v3 btn-navy mc-icon-btn px-5 py-3 text-sm cursor-pointer"
              >
                <EditableText path="finalCtaSection.demoLabel" value={content.finalCtaSection.demoLabel} />
              </button>
              <Link href="/contact" className="final-right-v3 btn-outline-navy mc-icon-btn px-5 py-3 text-sm">
                <EditableText path="finalCtaSection.contactLabel" value={content.finalCtaSection.contactLabel} />
              </Link>
              <a
                href={content.brand.phoneHref}
                className="final-right-v3 motion-link font-nav text-sm font-semibold text-[#2463A6] hover:text-[#10264A] px-2"
              >
                <Phone className="w-4 h-4" />
                <EditableText path="brand.phoneDisplay" value={content.brand.phoneDisplay} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
