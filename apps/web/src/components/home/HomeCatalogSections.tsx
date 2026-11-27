"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
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
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { FlipCard } from "@/components/motion/FlipCard";
import { isMotionDisabled } from "@/lib/motion/presets";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableImageTrigger,
  EditableText,
} from "@/components/EditableText";

gsap.registerPlugin(ScrollTrigger);

const FILTER_TABS = [
  { id: "all", label: "All Programmes" },
  { id: "ai-business-intelligence", label: "AI & Business Intelligence" },
  { id: "corporate-finance-capital-markets", label: "Finance & Investment Banking" },
  { id: "digital-marketing-creative-media", label: "Digital Marketing & Media" },
];

const ADVANTAGE_ICONS = [Sparkles, Users, ShieldCheck, Clock] as const;
const ADVANTAGE_IMAGES = [
  "/images/about-campus.jpg",
  "/images/hero-1.jpg",
  "/images/domain-analytics.jpg",
  "/images/hero-4.jpg",
] as const;
const PLACEMENT_ICONS = [Layers, FileCheck2, GraduationCap, Briefcase] as const;

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
  const [activeDomainIdx, setActiveDomainIdx] = useState(0);
  const [activeComboIdx, setActiveComboIdx] = useState(0);
  const [activeAdvantageIdx, setActiveAdvantageIdx] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  // Section refs for dedicated section-specific timelines
  const domainsSectionRef = useRef<HTMLElement>(null);
  const domainsViewportRef = useRef<HTMLDivElement>(null);
  const domainsTrackRef = useRef<HTMLDivElement>(null);
  const domainsProgressRef = useRef<HTMLDivElement>(null);

  const stackedSectionRef = useRef<HTMLElement>(null);
  const combosSectionRef = useRef<HTMLElement>(null);
  const advantagesSectionRef = useRef<HTMLElement>(null);
  const pathwaySectionRef = useRef<HTMLElement>(null);
  const academicSectionRef = useRef<HTMLElement>(null);
  const academicFrameRef = useRef<HTMLDivElement>(null);
  const campusSectionRef = useRef<HTMLElement>(null);
  const finalCtaSectionRef = useRef<HTMLElement>(null);

  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((c) => c.categorySlug === activeFilter);

  // Animations 05, 07, 08, 09, 10, 11, 12
  useEffect(() => {
    if (isMotionDisabled()) return;

    const mm = gsap.matchMedia();

    // ── ANIMATION 05: Horizontal Scroll Learning Domains (Desktop Pinned) ──
    mm.add("(min-width: 1024px)", () => {
      const section = domainsSectionRef.current;
      const viewport = domainsViewportRef.current;
      const track = domainsTrackRef.current;
      if (!section || !viewport || !track) return;

      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(900, getDistance() + 300)}`,
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (domainsProgressRef.current) {
              domainsProgressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const count = Math.max(1, categories.length);
            const idx = Math.min(count - 1, Math.floor(self.progress * count));
            setActiveDomainIdx(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // ── ANIMATION 07: Career Combo Sticky Storytelling ──
    const combosCtx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".combo-story-step", combosSectionRef.current);
      items.forEach((step, idx) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setActiveComboIdx(idx),
          onEnterBack: () => setActiveComboIdx(idx),
        });

        gsap.fromTo(
          step,
          { y: 30, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "expo.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, combosSectionRef);

    // ── ANIMATION 08: VLEARNIN Advantage Scroll Image Switcher ──
    const advCtx = gsap.context(() => {
      const advItems = gsap.utils.toArray<HTMLElement>(".vway-adv-step", advantagesSectionRef.current);
      advItems.forEach((item, idx) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => setActiveAdvantageIdx(idx),
          onEnterBack: () => setActiveAdvantageIdx(idx),
        });
      });
    }, advantagesSectionRef);

    // ── ANIMATION 09: Placement Assistance Career Journey ──
    const pathwayCtx = gsap.context(() => {
      const scope = pathwaySectionRef.current;
      if (!scope) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.55,
          onUpdate: (self) => {
            const idx = Math.min(3, Math.floor(self.progress * 4));
            setActiveStageIdx(idx);
          },
        },
      });

      tl.fromTo(".pathway-progress-bar", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

      gsap.fromTo(
        ".pathway-stage-card",
        { x: 48, clipPath: "inset(0 0 0 15%)", opacity: 0.86 },
        {
          x: 0,
          clipPath: "inset(0 0 0 0%)",
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "expo.out",
          clearProps: "transform,clipPath,opacity",
          scrollTrigger: {
            trigger: scope,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, pathwaySectionRef);

    // ── ANIMATION 10: Academic Partnerships Scroll Image Expansion ──
    const academicCtx = gsap.context(() => {
      const scope = academicSectionRef.current;
      const frame = academicFrameRef.current;
      if (!scope || !frame) return;

      gsap.fromTo(
        frame,
        { scale: 0.86, clipPath: "inset(6% 8% 6% 8% round 22px)" },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 15px)",
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top 85%",
            end: "center 45%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        ".academic-reveal-item",
        { y: 24, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: scope,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, academicSectionRef);

    // ── ANIMATION 11: Campus Experience Multi-Layer Parallax ──
    const campusCtx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".campus-tile", campusSectionRef.current);
      tiles.forEach((tile, idx) => {
        const isForeground = idx % 2 === 0;
        gsap.fromTo(
          tile,
          { clipPath: "inset(12% 0 0 0 round 15px)", opacity: 0.88 },
          {
            clipPath: "inset(0% 0 0 0 round 15px)",
            opacity: 1,
            duration: 0.8,
            delay: idx * 0.06,
            ease: "expo.out",
            clearProps: "clipPath,opacity",
            scrollTrigger: {
              trigger: campusSectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          tile,
          { yPercent: isForeground ? -6 : 4 },
          {
            yPercent: isForeground ? 6 : -4,
            ease: "none",
            scrollTrigger: {
              trigger: campusSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      });
    }, campusSectionRef);

    // ── ANIMATION 12: Final Enquiry Cinematic Curtain ──
    const finalCtx = gsap.context(() => {
      const scope = finalCtaSectionRef.current;
      if (!scope) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 82%",
          once: true,
        },
      });

      tl.fromTo(
        ".final-curtain-frame",
        { clipPath: "inset(0 100% 0 0 round 15px)" },
        {
          clipPath: "inset(0 0% 0 0 round 15px)",
          duration: 1.0,
          ease: "expo.out",
          clearProps: "clipPath",
        },
        0,
      )
        .fromTo(
          ".final-cta-text-mask",
          { clipPath: "inset(0 0 100% 0)", y: 20 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "expo.out",
            clearProps: "clipPath,transform",
          },
          0.25,
        )
        .fromTo(
          ".final-cta-action",
          { y: 16, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "expo.out",
            clearProps: "transform,opacity",
          },
          0.42,
        );
    }, finalCtaSectionRef);

    return () => {
      mm.revert();
      combosCtx.revert();
      advCtx.revert();
      pathwayCtx.revert();
      academicCtx.revert();
      campusCtx.revert();
      finalCtx.revert();
    };
  }, [categories.length]);

  // ── ANIMATION 06: Stacked Programme Cards (re-runs smoothly when filter changes) ──
  useEffect(() => {
    if (isMotionDisabled()) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stacked-course-card", stackedSectionRef.current);
      cards.forEach((card, idx) => {
        if (idx < cards.length - 1) {
          gsap.to(card, {
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: cards[idx + 1],
              start: "top 80%",
              end: "top 25%",
              scrub: 0.5,
            },
          });
        }

        const photo = card.querySelector(".stacked-course-photo");
        if (photo) {
          gsap.fromTo(
            photo,
            { clipPath: "inset(10% 0 10% 0 round 12px)", scale: 1.06 },
            {
              clipPath: "inset(0% 0 0% 0 round 12px)",
              scale: 1,
              duration: 0.8,
              ease: "expo.out",
              clearProps: "clipPath,transform",
              scrollTrigger: {
                trigger: card,
                start: "top 86%",
                once: true,
              },
            },
          );
        }
      });
    });

    return () => mm.revert();
  }, [activeFilter, filteredCourses.length]);

  return (
    <div>
      {/* 13 — EXPLORE OUR LEARNING DOMAINS (Animation 05: Horizontal Scroll Showcase) */}
      <section
        ref={domainsSectionRef}
        className="py-14 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center bg-[#F8FAFC] border-b border-[#E5E7EB] overflow-hidden"
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div className="max-w-3xl">
              <AnimatedHeading as="h2" className="type-section-heading text-[#1D4ED8]">
                <EditableText path="domainsSection.heading" value={content.domainsSection.heading} />
              </AnimatedHeading>
              <EditableText
                as="p"
                path="domainsSection.description"
                value={content.domainsSection.description}
                className="mc-lead text-[#4B5563] mt-2"
              />
            </div>
            {/* Desktop Horizontal Progress Indicator */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <span className="font-nav text-sm font-bold text-[#1D4ED8] tabular-nums">
                0{activeDomainIdx + 1} / 0{categories.length}
              </span>
              <div className="w-40 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  ref={domainsProgressRef}
                  className="h-full w-full bg-[#1D4ED8] origin-left scale-x-0"
                />
              </div>
            </div>
          </div>

          <div ref={domainsViewportRef} className="overflow-x-auto lg:overflow-hidden pb-4 lg:pb-0">
            <div
              ref={domainsTrackRef}
              className="flex gap-6 lg:gap-8 w-max lg:w-max snap-x snap-mandatory lg:snap-none"
            >
              {categories.map((cat, idx) => {
                const domainCourses = courses.filter((c) => c.categorySlug === cat.slug);
                const ctaLabel =
                  cat.slug === "ai-business-intelligence"
                    ? "Explore AI & Analytics"
                    : cat.slug === "corporate-finance-capital-markets"
                      ? "Explore Finance & Investment Banking"
                      : "Explore Digital & Media";

                return (
                  <article
                    key={cat.slug}
                    className="domain-panel snap-start shrink-0 w-[86vw] sm:w-[75vw] lg:w-[78vw] max-w-[1060px] mc-card-hover bg-white border border-[#E5E7EB] shadow-xs grid grid-cols-1 lg:grid-cols-12 overflow-hidden group rounded-[15px] relative"
                  >
                    <EditableDeleteButton
                      path="categories"
                      index={idx}
                      label="Delete Domain"
                      className="absolute top-3 left-3 z-30"
                    />
                    <div className="domain-media lg:col-span-6 relative min-h-[240px] lg:min-h-[400px] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 1024px) 90vw, 45vw"
                        className="object-cover mc-image-zoom"
                      />
                      <EditableImageTrigger path={`categories.${idx}.image`} currentSrc={cat.image} />
                      <span className="absolute top-4 left-4 bg-[#1D4ED8] text-white font-nav text-xs font-bold px-3 py-1 rounded-full">
                        Domain 0{idx + 1}
                      </span>
                    </div>

                    <div className="domain-body lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4">
                      <EditableText
                        as="h3"
                        path={`categories.${idx}.name`}
                        value={cat.name}
                        className="vl-mask-title text-2xl sm:text-3xl font-bold text-[#1D4ED8]"
                      />
                      <EditableText
                        as="p"
                        path={`categories.${idx}.outcomeSummary`}
                        value={cat.outcomeSummary}
                        className="text-sm sm:text-base text-[#4B5563] leading-relaxed"
                      />
                      <ul className="space-y-2 border-y border-[#E5E7EB] py-3.5">
                        {domainCourses.map((dc) => (
                          <li key={dc.slug}>
                            <Link
                              href={`/courses/${dc.slug}`}
                              className="inline-flex items-center gap-2.5 text-sm sm:text-[15px] font-nav font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                            >
                              <ArrowRight className="w-4 h-4 text-[#EA580C] shrink-0" />
                              <span>{dc.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link
                          href={`/courses?category=${cat.slug}`}
                          className="btn-navy mc-icon-btn px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
                        >
                          <span>{ctaLabel}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
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

      {/* 14 — CERTIFICATION PROGRAMME DISCOVERY (Animation 06: Stacked Programme Cards) */}
      <section ref={stackedSectionRef} className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <EditableText
                as="h2"
                path="discoverySection.heading"
                value={content.discoverySection.heading}
                className="type-section-heading text-[#1D4ED8]"
              />
            </div>

            <Link
              href="/courses"
              className="btn-primary-amber mc-icon-btn px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 self-start lg:self-auto"
            >
              <span>View All 7 Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter certification programmes"
            className="flex flex-wrap gap-2 mb-10 border-b border-[#E5E7EB] pb-4"
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
                  className={`font-nav text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-[12px] transition-colors cursor-pointer ${
                    active
                      ? "bg-[#1D4ED8] text-white"
                      : "bg-[#F8FAFC] text-[#111827] hover:bg-[#E5E7EB]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sequential Stacked Cards (Sticky layered on desktop, compact stack on mobile) */}
          <div className="space-y-6 lg:space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => {
                const cIdx = courses.findIndex((c) => c.slug === course.slug);
                return (
                  <motion.article
                    key={course.slug}
                    layout
                    initial={{ opacity: 1, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      top: `${114 + Math.min(idx, 5) * 14}px`,
                      zIndex: idx + 10,
                    }}
                    className="stacked-course-card lg:sticky bg-white border border-[#E5E7EB] hover:border-[#1D4ED8] shadow-[0_10px_28px_rgba(17,24,39,0.08)] rounded-[15px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch group"
                  >
                    <div className="stacked-course-photo lg:col-span-5 relative min-h-[220px] lg:min-h-[280px] overflow-hidden">
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
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover mc-image-zoom"
                      />
                      {cIdx >= 0 && (
                        <EditableImageTrigger path={`courses.${cIdx}.image`} currentSrc={course.image} />
                      )}
                      <span className="absolute bottom-3 left-3 bg-[#1D4ED8]/95 text-white font-nav text-xs font-bold px-3 py-1 rounded-full">
                        Programme 0{idx + 1}
                      </span>
                    </div>

                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-4">
                      <div className="space-y-2.5">
                        <EditableText
                          as="p"
                          path={cIdx >= 0 ? `courses.${cIdx}.categoryName` : "discoverySection.eyebrow"}
                          value={course.categoryName}
                          className="block font-nav text-xs font-bold uppercase tracking-wider text-[#EA580C]"
                        />
                        <EditableText
                          as="h3"
                          path={cIdx >= 0 ? `courses.${cIdx}.title` : "discoverySection.heading"}
                          value={course.title}
                          className="vl-mask-title text-xl sm:text-2xl font-bold text-[#1D4ED8] leading-snug"
                        />
                        <div className="flex flex-wrap gap-4 text-xs font-nav text-[#4B5563]">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                            {course.durationHours} Hours
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#1D4ED8]" />
                            5 Modules + Capstone
                          </span>
                        </div>
                        <EditableText
                          as="p"
                          path={cIdx >= 0 ? `courses.${cIdx}.summary` : "discoverySection.heading"}
                          value={course.summary}
                          className="text-sm sm:text-base text-[#4B5563] leading-relaxed"
                        />
                        <p className="text-xs font-nav text-[#111827]">
                          <strong>Modes:</strong> {course.learningModes.join(" • ")}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#E5E7EB]">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="btn-outline-navy px-5 py-2.5 text-xs uppercase tracking-wider"
                        >
                          View Programme
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            openDemoModal({
                              preselectedProgramme: course.title,
                              sourcePage: "homepage-programme-stack",
                            })
                          }
                          className="btn-primary-amber px-5 py-2.5 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
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

      {/* 15 — CAREER ACCELERATOR COMBOS (Animation 07: Sticky Two-Column Storytelling) */}
      <section ref={combosSectionRef} className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <EditableText
                as="h2"
                path="combosSection.heading"
                value={content.combosSection.heading}
                className="type-section-heading text-[#1D4ED8]"
              />
              <EditableText
                as="p"
                path="combosSection.description"
                value={content.combosSection.description}
                className="text-base text-[#4B5563] mt-2"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/career-combos"
                className="btn-navy px-5 py-3 text-xs sm:text-sm uppercase tracking-wider"
              >
                Explore Career Combos
              </Link>
              <button
                type="button"
                onClick={() => openBrochureModal({ brochureType: "complete" })}
                className="btn-primary-amber px-5 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Complete Course Brochure
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Sticky Left Photographic Frame with Cinematic Mask Switching */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative aspect-[4/4.3] rounded-[15px] overflow-hidden border border-[#E5E7EB] shadow-md bg-white">
                {combos.map((combo, idx) => {
                  const isActive = idx === activeComboIdx;
                  return (
                    <div
                      key={combo.slug}
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                        zIndex: isActive ? 2 : 1,
                      }}
                    >
                      <Image
                        src={combo.image}
                        alt={combo.title}
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                        <span className="font-nav text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                          Track 0{idx + 1} / 0{combos.length} · {combo.durationLabel}
                        </span>
                        <p className="text-xl font-bold mt-1">{combo.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 4 Scroll Storytelling Phases */}
            <div className="lg:col-span-7 space-y-6">
              {combos.map((combo, idx) => {
                const isActive = idx === activeComboIdx;
                return (
                  <article
                    key={combo.slug}
                    className={`combo-story-step bg-white border transition-colors duration-300 rounded-[15px] overflow-hidden relative ${
                      isActive ? "border-[#1D4ED8] shadow-md" : "border-[#E5E7EB]"
                    }`}
                  >
                    <EditableDeleteButton
                      path="combos"
                      index={idx}
                      label="Delete"
                      className="absolute top-3 right-3 z-30"
                    />
                    <div className="lg:hidden relative h-52 w-full">
                      <Image
                        src={combo.image}
                        alt={combo.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <EditableText
                          path={`combos.${idx}.durationLabel`}
                          value={combo.durationLabel}
                          className="bg-[#1D4ED8] text-white font-nav text-xs font-bold px-3 py-1 rounded-full"
                        />
                        <span className="font-nav text-xs font-bold text-[#4B5563]">
                          0{idx + 1} / 0{combos.length}
                        </span>
                      </div>
                      <EditableText
                        as="h3"
                        path={`combos.${idx}.title`}
                        value={combo.title}
                        className="text-xl sm:text-2xl font-bold text-[#1D4ED8]"
                      />
                      <EditableText
                        as="p"
                        path={`combos.${idx}.includedLabel`}
                        value={combo.includedLabel}
                        className="text-xs font-nav font-semibold text-[#EA580C]"
                      />
                      <EditableText
                        as="p"
                        path={`combos.${idx}.summary`}
                        value={combo.summary}
                        className="text-sm sm:text-base text-[#4B5563]"
                      />
                      <p className="text-xs text-[#111827]">
                        <strong>Ideal For:</strong>{" "}
                        <EditableText path={`combos.${idx}.idealFor`} value={combo.idealFor} />
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                        <Link
                          href={`/career-combos/${combo.slug}`}
                          className="font-nav text-xs font-bold uppercase tracking-wider text-[#1D4ED8] inline-flex items-center gap-1"
                        >
                          <span>View Track</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            openDemoModal({
                              preselectedProgramme: `${combo.title} (${combo.durationLabel})`,
                              sourcePage: "homepage-combo",
                            })
                          }
                          className="font-nav text-xs font-bold text-[#EA580C] hover:underline cursor-pointer"
                        >
                          Book Free Demo →
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
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

      {/* 16 — WHY LEARNERS CHOOSE THE V-WAY (Animation 08: Scroll Image Switcher) */}
      <section ref={advantagesSectionRef} className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Synchronized Photographic Switcher */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 relative aspect-[4/3] lg:aspect-[4/5] border border-[#E5E7EB] overflow-hidden rounded-[15px] shadow-sm">
            {content.advantagesSection.items.map((adv, idx) => {
              const isActive = idx === activeAdvantageIdx;
              const imgSrc = idx === 0 ? content.advantagesSection.image : ADVANTAGE_IMAGES[idx % ADVANTAGE_IMAGES.length];
              return (
                <div
                  key={idx}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  <Image
                    src={imgSrc}
                    alt={adv.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D4ED8]/85 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="font-nav text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                        Advantage {adv.num}
                      </span>
                      <p className="text-lg font-bold">{adv.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <EditableImageTrigger
              path="advantagesSection.image"
              currentSrc={content.advantagesSection.image}
              altPath="advantagesSection.imageAlt"
              currentAlt={content.advantagesSection.imageAlt}
            />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <EditableText
              as="h2"
              path="advantagesSection.heading"
              value={content.advantagesSection.heading}
              className="type-section-heading text-[#1D4ED8]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.advantagesSection.items.map((adv, advIdx) => {
                const Icon = ADVANTAGE_ICONS[advIdx % ADVANTAGE_ICONS.length];
                const isActive = advIdx === activeAdvantageIdx;
                return (
                  <div
                    key={advIdx}
                    className={`vway-adv-step relative rounded-[15px] transition-all duration-300 ${
                      isActive ? "ring-2 ring-[#1D4ED8] ring-offset-2" : ""
                    }`}
                    onMouseEnter={() => setActiveAdvantageIdx(advIdx)}
                  >
                    <EditableDeleteButton
                      path="advantagesSection.items"
                      index={advIdx}
                      label="×"
                      className="absolute top-2 right-2 z-30 px-1.5 py-0.5 text-[10px]"
                    />
                    <FlipCard
                      className="h-52"
                      front={
                        <div className="h-full p-6 bg-[#F8FAFC] border-l-4 border-[#1D4ED8] flex flex-col justify-between rounded-[15px]">
                          <div className="flex items-center justify-between">
                            <Icon className="w-6 h-6 text-[#EA580C]" />
                            <EditableText
                              path={`advantagesSection.items.${advIdx}.num`}
                              value={adv.num}
                              className="font-editorial text-3xl font-bold text-[#1D4ED8]/35"
                            />
                          </div>
                          <div>
                            <EditableText
                              as="h3"
                              path={`advantagesSection.items.${advIdx}.title`}
                              value={adv.title}
                              className="text-xl font-bold text-[#1D4ED8]"
                            />
                            <p className="font-nav text-xs font-semibold text-[#1D4ED8] mt-2">
                              Hover or tap for details →
                            </p>
                          </div>
                        </div>
                      }
                      back={
                        <div className="h-full p-6 bg-[#1D4ED8] text-white border-t-4 border-[#93C5FD] flex flex-col justify-center space-y-2 rounded-[15px]">
                          <span className="font-nav text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                            Advantage {adv.num}
                          </span>
                          <h4 className="text-lg font-bold text-white">{adv.title}</h4>
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

      {/* 17 — PLACEMENT ASSISTANCE (Animation 09: Interactive Career Journey) */}
      <section ref={pathwaySectionRef} className="py-16 lg:py-24 bg-[#1D4ED8] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <EditableText
                as="h2"
                path="placementSection.heading"
                value={content.placementSection.heading}
                className="type-editorial text-white"
              />
            </div>
            <Link
              href="/placement-assistance"
              className="btn-gold mc-icon-btn px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 self-start lg:self-auto"
            >
              <EditableText path="placementSection.ctaLabel" value={content.placementSection.ctaLabel} />
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative space-y-5">
            <div className="hidden lg:block h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div className="pathway-progress-bar h-full bg-[#93C5FD] origin-left" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.placementSection.stages.map((item, sIdx) => {
                const Icon = PLACEMENT_ICONS[sIdx % PLACEMENT_ICONS.length];
                const reached = sIdx <= activeStageIdx;
                return (
                  <div
                    key={sIdx}
                    className={`pathway-stage-card border border-t-4 p-6 space-y-3 transition-colors duration-300 rounded-[15px] relative ${
                      reached
                        ? "bg-white/15 border-white/25 border-t-[#EA580C]"
                        : "bg-white/10 border-white/15 border-t-[#93C5FD]"
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
                        className="font-nav text-xs font-bold uppercase tracking-wider text-[#93C5FD]"
                      />
                      <Icon className="w-5 h-5 text-white/85" />
                    </div>
                    <EditableText
                      as="h3"
                      path={`placementSection.stages.${sIdx}.title`}
                      value={item.title}
                      className="text-xl font-bold text-white"
                    />
                    <EditableText
                      as="p"
                      path={`placementSection.stages.${sIdx}.desc`}
                      value={item.desc}
                      className="text-sm text-white/85 leading-relaxed"
                    />
                  </div>
                );
              })}
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
            className="text-xs text-white/75 border-t border-white/15 pt-5"
          />
        </div>
      </section>

      {/* 18 — ACADEMIC PARTNERSHIPS (Animation 10: Scroll-Linked Image Expansion) */}
      <section ref={academicSectionRef} className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden">
          <div className="lg:col-span-6 space-y-5">
            <EditableText
              as="h2"
              path="academicSection.heading"
              value={content.academicSection.heading}
              className="academic-reveal-item type-section-heading text-[#1D4ED8]"
            />
            <EditableText
              as="p"
              path="academicSection.description"
              value={content.academicSection.description}
              className="academic-reveal-item text-base text-[#4B5563] leading-relaxed"
            />
            <div className="academic-reveal-item grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {content.academicSection.bullets.map((item, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2 text-sm text-[#111827] justify-between">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
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
            <div className="academic-reveal-item flex flex-wrap gap-3.5 pt-3 items-center">
              <EditableAddButton
                path="academicSection.bullets"
                label="Add Bullet"
                createItem={() => "New academic partnership highlight"}
              />
              <Link
                href="/academic-partnerships"
                className="btn-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
              >
                <EditableText path="academicSection.primaryCtaLabel" value={content.academicSection.primaryCtaLabel} />
              </Link>
              <Link
                href="/academic-partnerships#institutional-form"
                className="btn-outline-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
              >
                <EditableText path="academicSection.secondaryCtaLabel" value={content.academicSection.secondaryCtaLabel} />
              </Link>
            </div>
          </div>

          <div
            ref={academicFrameRef}
            className="lg:col-span-6 relative aspect-[16/10] border border-[#E5E7EB] overflow-hidden shadow-md rounded-[15px] origin-center"
          >
            <Image
              src={content.academicSection.image}
              alt={content.academicSection.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover mc-image-zoom"
            />
            <EditableImageTrigger
              path="academicSection.image"
              currentSrc={content.academicSection.image}
              altPath="academicSection.imageAlt"
              currentAlt={content.academicSection.imageAlt}
            />
          </div>
        </div>
      </section>

      {/* 19 — CAMPUS AND LEARNING EXPERIENCE (Animation 11: Multi-Layer Parallax Gallery) */}
      <section ref={campusSectionRef} className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E5E7EB] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <EditableText
                as="h2"
                path="campusSection.heading"
                value={content.campusSection.heading}
                className="type-section-heading text-[#1D4ED8]"
              />
              <EditableText
                as="p"
                path="campusSection.description"
                value={content.campusSection.description}
                className="text-base text-[#4B5563] mt-2"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-outline-navy px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <EditableText path="campusSection.visitLabel" value={content.campusSection.visitLabel} />
              </Link>
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "campus-experience" })}
                className="btn-primary-amber px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                <EditableText path="campusSection.demoLabel" value={content.campusSection.demoLabel} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:py-4">
            {content.campusSection.gallery.map((item, gIdx) => (
              <div
                key={gIdx}
                className={`campus-tile group relative aspect-[4/5] overflow-hidden border border-[#E5E7EB] bg-[#1D4ED8] rounded-[15px] ${
                  gIdx % 2 === 1 ? "lg:mt-6" : ""
                }`}
              >
                <EditableDeleteButton
                  path="campusSection.gallery"
                  index={gIdx}
                  label="Delete"
                  className="absolute top-3 left-3 z-30"
                />
                {item.video || item.src.startsWith("data:video/") || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(item.src) ? (
                  <video
                    src={item.video || item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover mc-image-zoom"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    className="object-cover mc-image-zoom"
                  />
                )}
                <EditableImageTrigger
                  path={`campusSection.gallery.${gIdx}.src`}
                  currentSrc={item.src}
                  altPath={`campusSection.gallery.${gIdx}.alt`}
                  currentAlt={item.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D4ED8]/90 via-transparent to-transparent flex items-end p-4">
                  <EditableText
                    as="p"
                    path={`campusSection.gallery.${gIdx}.title`}
                    value={item.title}
                    className="vl-mask-title font-nav text-xs sm:text-sm font-bold text-white leading-snug"
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
          className={`py-16 lg:py-20 border-b border-[#E5E7EB] relative ${
            sec.theme === "blue" ? "bg-[#1D4ED8] text-white" : "bg-white text-[#111827]"
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
                className={`text-3xl sm:text-4xl font-bold leading-tight ${
                  sec.theme === "blue" ? "text-white" : "text-[#1D4ED8]"
                }`}
              />
              <EditableText
                as="p"
                path={`customSections.${sIdx}.description`}
                value={sec.description}
                className={`text-base leading-relaxed ${
                  sec.theme === "blue" ? "text-white/85" : "text-[#4B5563]"
                }`}
              />
              {sec.ctaLabel && (
                <div className="pt-2">
                  <Link
                    href={sec.ctaHref || "/contact"}
                    className={`${
                      sec.theme === "blue" ? "btn-gold" : "btn-navy"
                    } px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2`}
                  >
                    <EditableText path={`customSections.${sIdx}.ctaLabel`} value={sec.ctaLabel} />
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
            <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden rounded-[15px] border border-[#E5E7EB]">
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

      {/* 20 — FINAL HOMEPAGE ADMISSIONS ENQUIRY BANNER (Animation 12: Cinematic Curtain) */}
      <section ref={finalCtaSectionRef} className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="final-curtain-frame relative overflow-hidden bg-[#1D4ED8] text-white p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-l-8 border-[#EA580C] rounded-[15px]">
            <Image
              src="/images/hero-2.jpg"
              alt="VLEARNIN practical workshop and career mentorship"
              fill
              sizes="100vw"
              className="object-cover opacity-20 pointer-events-none"
            />
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="final-cta-text-mask">
                <EditableText
                  as="h2"
                  path="finalCtaSection.heading"
                  value={content.finalCtaSection.heading}
                  className="type-editorial text-white"
                />
              </div>
              <div className="final-cta-text-mask">
                <EditableText
                  as="p"
                  path="finalCtaSection.description"
                  value={content.finalCtaSection.description}
                  className="text-base text-white/90 leading-relaxed"
                />
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "homepage-final-cta" })}
                className="final-cta-action btn-gold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                <EditableText path="finalCtaSection.demoLabel" value={content.finalCtaSection.demoLabel} />
              </button>
              <Link
                href="/contact"
                className="final-cta-action border border-white/80 hover:bg-white hover:text-[#1D4ED8] text-white font-nav font-semibold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider transition-colors rounded-[15px]"
              >
                <EditableText path="finalCtaSection.contactLabel" value={content.finalCtaSection.contactLabel} />
              </Link>
              <a
                href={content.brand.phoneHref}
                className="final-cta-action inline-flex items-center gap-2 font-nav text-sm font-bold text-[#93C5FD] hover:underline px-2"
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
