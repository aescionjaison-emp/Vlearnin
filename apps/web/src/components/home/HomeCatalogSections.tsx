"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
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
  BRAND,
  OfficialCategorySeed,
  OfficialComboSeed,
  OfficialCourseSeed,
} from "@vlearnin/shared";
import { useLeadModal } from "@/components/LeadModalProvider";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { AnimatedImage } from "@/components/animation/AnimatedImage";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { FlipCard } from "@/components/motion/FlipCard";
import {
  runAdvantagesTimeline,
  runAlternatingDomainTimeline,
  runParallaxScrub,
  runScrubbedPathwayTimeline,
  runSectionCascadeTimeline,
  runSplitEditorialTimeline,
} from "@/lib/motion/timelines";
import { useSiteContent } from "@/components/SiteContentProvider";
import { EditableImageTrigger, EditableText } from "@/components/EditableText";

const FILTER_TABS = [
  { id: "all", label: "All Programmes" },
  { id: "ai-business-intelligence", label: "AI & Business Intelligence" },
  { id: "corporate-finance-capital-markets", label: "Finance & Investment Banking" },
  { id: "digital-marketing-creative-media", label: "Digital Marketing & Media" },
];

const ADVANTAGE_ICONS = [Sparkles, Users, ShieldCheck, Clock] as const;
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const discoveryRef = useRef<HTMLDivElement>(null);
  const combosRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const pathwayRef = useRef<HTMLDivElement>(null);
  const academicRef = useRef<HTMLDivElement>(null);
  const academicImgRef = useRef<HTMLImageElement>(null);
  const campusRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(combosRef, ".combo-card", "cardReveal", 0.08);
  useStaggerReveal(campusRef, ".campus-tile", "cardReveal", 0.07);

  useEffect(() => {
    const cleanDomains = runAlternatingDomainTimeline(domainsRef.current);
    const cleanDiscovery = runSectionCascadeTimeline(discoveryRef.current, ".discovery-reveal");
    const cleanAdvantages = runAdvantagesTimeline(advantagesRef.current);
    const cleanPathway = runScrubbedPathwayTimeline(pathwayRef.current);
    const cleanAcademic = runSplitEditorialTimeline(academicRef.current, "right");
    const cleanAcademicParallax = runParallaxScrub(academicImgRef.current, academicRef.current, 6);
    const cleanFinalCta = runSectionCascadeTimeline(finalCtaRef.current, ".final-cta-card");
    return () => {
      cleanDomains();
      cleanDiscovery();
      cleanAdvantages();
      cleanPathway();
      cleanAcademic();
      cleanAcademicParallax();
      cleanFinalCta();
    };
  }, []);

  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((c) => c.categorySlug === activeFilter);

  const scrollCarousel = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const offset = dir === "left" ? -380 : 380;
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div>
      {/* 13 — EXPLORE OUR LEARNING DOMAINS (Large Image-Led Showcases) */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mb-12">
            <EditableText
              as="p"
              path="domainsSection.eyebrow"
              value={content.domainsSection.eyebrow}
              className="mc-eyebrow text-[#1D4ED8]"
            />
            <AnimatedHeading as="h2" className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1E3A8A] mt-2 leading-tight">
              <EditableText path="domainsSection.heading" value={content.domainsSection.heading} />
            </AnimatedHeading>
            <EditableText
              as="p"
              path="domainsSection.description"
              value={content.domainsSection.description}
              className="mc-lead text-[#4B5563] mt-3"
            />
          </div>

          <div ref={domainsRef} className="space-y-8">
            {categories.map((cat, idx) => {
              const domainCourses = courses.filter((c) => c.categorySlug === cat.slug);
              const ctaLabel =
                cat.slug === "ai-business-intelligence"
                  ? "Explore AI & Analytics"
                  : cat.slug === "corporate-finance-capital-markets"
                    ? "Explore Finance & Investment Banking"
                    : "Explore Digital & Media";
              const reverse = idx % 2 === 1;

              return (
                <article
                  key={cat.slug}
                  className="domain-panel mc-card-hover bg-white border border-[#E5E7EB] shadow-xs grid grid-cols-1 lg:grid-cols-12 overflow-hidden group rounded-[15px]"
                >
                  <div
                    className={`domain-media lg:col-span-6 relative min-h-[260px] lg:min-h-[360px] overflow-hidden ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 scale-105"
                    />
                    <EditableImageTrigger
                      path={`categories.${idx}.image`}
                      currentSrc={cat.image}
                    />
                  </div>

                  <div
                    className={`domain-body lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5 ${
                      reverse ? "lg:order-1" : ""
                    }`}
                  >
                    <div>
                      <span className="font-nav text-xs font-bold uppercase tracking-[0.18em] text-[#EA580C]">
                        Domain 0{idx + 1}
                      </span>
                      <EditableText
                        as="h3"
                        path={`categories.${idx}.name`}
                        value={cat.name}
                        className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mt-1"
                      />
                    </div>

                    <EditableText
                      as="p"
                      path={`categories.${idx}.outcomeSummary`}
                      value={cat.outcomeSummary}
                      className="text-base text-[#4B5563] leading-relaxed"
                    />

                    <ul className="space-y-2 border-y border-[#E5E7EB] py-4">
                      {domainCourses.map((dc) => (
                        <li key={dc.slug} className="domain-course-link">
                          <Link
                            href={`/courses/${dc.slug}`}
                            className="inline-flex items-center gap-2.5 text-[15px] font-nav font-semibold text-[#1D4ED8] hover:text-[#1E3A8A] transition-colors"
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
                        className="btn-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
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
      </section>

      {/* 14 — CERTIFICATION PROGRAMME DISCOVERY (Tabs + Horizontal Carousel) */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
        <div ref={discoveryRef} className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="discovery-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <EditableText
                as="p"
                path="discoverySection.eyebrow"
                value={content.discoverySection.eyebrow}
                className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]"
              />
              <EditableText
                as="h2"
                path="discoverySection.heading"
                value={content.discoverySection.heading}
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3A8A] mt-2"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                aria-label="Scroll programmes left"
                className="w-10 h-10 border border-[#E5E7EB] hover:border-[#1E3A8A] text-[#1E3A8A] flex items-center justify-center cursor-pointer transition-colors rounded-[15px]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                aria-label="Scroll programmes right"
                className="w-10 h-10 border border-[#E5E7EB] hover:border-[#1E3A8A] text-[#1E3A8A] flex items-center justify-center cursor-pointer transition-colors rounded-[15px]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link
                href="/courses"
                className="btn-primary-amber px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Explore All Programmes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Filter certification programmes"
            className="flex flex-wrap gap-2 mb-8 border-b border-[#E5E7EB] pb-4"
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
                  className={`font-nav text-xs sm:text-sm font-semibold px-5 py-2.5 transition-colors cursor-pointer ${
                    active
                      ? "bg-[#1E3A8A] text-white"
                      : "bg-[#F8FAFC] text-[#111827] hover:bg-[#E5E7EB]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Accessible Horizontal Programme Carousel with Smooth Category Filter Transitions */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => {
                const cIdx = courses.findIndex((c) => c.slug === course.slug);
                return (
                <motion.article
                  key={course.slug}
                  layout
                  initial={{ opacity: 0.4, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mc-card-hover snap-start shrink-0 w-[300px] sm:w-[360px] border border-[#E5E7EB] bg-white flex flex-col justify-between group hover:border-[#1D4ED8] rounded-[15px]"
                >
                <div>
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {cIdx >= 0 && (
                      <EditableImageTrigger path={`courses.${cIdx}.image`} currentSrc={course.image} />
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <EditableText
                      path={cIdx >= 0 ? `courses.${cIdx}.categoryName` : "discoverySection.eyebrow"}
                      value={course.categoryName}
                      className="font-nav text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]"
                    />
                    <EditableText
                      as="h3"
                      path={cIdx >= 0 ? `courses.${cIdx}.title` : "discoverySection.heading"}
                      value={course.title}
                      className="text-xl font-bold text-[#1E3A8A] leading-snug"
                    />
                    <div className="flex flex-wrap gap-3 text-xs font-nav text-[#4B5563]">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                        {course.durationHours} Hours
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#1D4ED8]" />
                        5 Modules + Capstone
                      </span>
                    </div>
                    <EditableText
                      as="p"
                      path={cIdx >= 0 ? `courses.${cIdx}.summary` : "discoverySection.heading"}
                      value={course.summary}
                      className="text-sm text-[#4B5563] leading-relaxed"
                    />
                    <p className="text-xs font-nav text-[#111827]">
                      <strong>Modes:</strong> {course.learningModes.join(" • ")}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#E5E7EB] grid grid-cols-2 gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn-outline-navy py-2.5 text-xs text-center"
                  >
                    View Programme
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      openDemoModal({
                        preselectedProgramme: course.title,
                        sourcePage: "homepage-programme-carousel",
                      })
                    }
                    className="btn-primary-amber py-2.5 text-xs cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 15 — CAREER ACCELERATOR COMBOS */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <EditableText
                as="p"
                path="combosSection.eyebrow"
                value={content.combosSection.eyebrow}
                className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]"
              />
              <EditableText
                as="h2"
                path="combosSection.heading"
                value={content.combosSection.heading}
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3A8A] mt-2"
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

          <div ref={combosRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {combos.map((combo, idx) => (
              <article
                key={combo.slug}
                className="combo-card mc-card-hover bg-white border border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-12 overflow-hidden hover:border-[#1D4ED8] rounded-[15px]"
              >
                <div className="sm:col-span-5 relative min-h-[220px]">
                  <Image
                    src={combo.image}
                    alt={combo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="object-cover"
                  />
                  <EditableImageTrigger path={`combos.${idx}.image`} currentSrc={combo.image} />
                  <EditableText
                    path={`combos.${idx}.durationLabel`}
                    value={combo.durationLabel}
                    className="absolute top-3 left-3 bg-[#1E3A8A] text-[#93C5FD] font-nav text-xs font-bold px-3 py-1"
                  />
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="font-nav text-[11px] font-bold uppercase tracking-wider text-[#EA580C]">
                      Pathway 0{idx + 1}
                    </span>
                    <EditableText
                      as="h3"
                      path={`combos.${idx}.title`}
                      value={combo.title}
                      className="text-xl font-bold text-[#1E3A8A]"
                    />
                    <EditableText
                      as="p"
                      path={`combos.${idx}.includedLabel`}
                      value={combo.includedLabel}
                      className="text-xs font-nav font-semibold text-[#1D4ED8]"
                    />
                    <EditableText
                      as="p"
                      path={`combos.${idx}.summary`}
                      value={combo.summary}
                      className="text-sm text-[#4B5563]"
                    />
                    <p className="text-xs text-[#111827]">
                      <strong>Ideal For:</strong>{" "}
                      <EditableText path={`combos.${idx}.idealFor`} value={combo.idealFor} />
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                    <Link
                      href={`/career-combos/${combo.slug}`}
                      className="font-nav text-xs font-bold uppercase tracking-wider text-[#1D4ED8] hover:text-[#1E3A8A] inline-flex items-center gap-1"
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
            ))}
          </div>
        </div>
      </section>

      {/* 16 — WHY LEARNERS CHOOSE THE V-WAY (Large Photo + 4 Editorial Benefits) */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
        <div ref={advantagesRef} className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="vway-portrait lg:col-span-5 relative aspect-[4/3] lg:aspect-[4/5] border border-[#E5E7EB] overflow-hidden rounded-[15px]">
            <Image
              src={content.advantagesSection.image}
              alt={content.advantagesSection.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover scale-105"
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
              <EditableText
                as="p"
                path="advantagesSection.eyebrow"
                value={content.advantagesSection.eyebrow}
                className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]"
              />
              <EditableText
                as="h2"
                path="advantagesSection.heading"
                value={content.advantagesSection.heading}
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3A8A] mt-2"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.advantagesSection.items.map((adv, advIdx) => {
                const Icon = ADVANTAGE_ICONS[advIdx % ADVANTAGE_ICONS.length];
                return (
                  <div key={advIdx} className="vway-flip-item">
                    <FlipCard
                      className="h-52"
                      front={
                        <div className="h-full p-6 bg-[#F8FAFC] border-l-4 border-[#1D4ED8] flex flex-col justify-between rounded-[15px]">
                          <div className="flex items-center justify-between">
                            <Icon className="w-6 h-6 text-[#EA580C]" />
                            <EditableText
                              path={`advantagesSection.items.${advIdx}.num`}
                              value={adv.num}
                              className="font-editorial text-3xl font-bold text-[#1E3A8A]/35"
                            />
                          </div>
                          <div>
                            <EditableText
                              as="h3"
                              path={`advantagesSection.items.${advIdx}.title`}
                              value={adv.title}
                              className="text-xl font-bold text-[#1E3A8A]"
                            />
                            <p className="font-nav text-xs font-semibold text-[#1D4ED8] mt-2">
                              Hover or tap for details →
                            </p>
                          </div>
                        </div>
                      }
                      back={
                        <div className="h-full p-6 bg-[#1E3A8A] text-white border-t-4 border-[#93C5FD] flex flex-col justify-center space-y-2 rounded-[15px]">
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
          </div>
        </div>
      </section>

      {/* 17 — PLACEMENT ASSISTANCE (Connected Pathway) */}
      <section className="py-16 lg:py-24 bg-[#1E3A8A] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <EditableText
                as="p"
                path="placementSection.eyebrow"
                value={content.placementSection.eyebrow}
                className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#93C5FD]"
              />
              <EditableText
                as="h2"
                path="placementSection.heading"
                value={content.placementSection.heading}
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold mt-2"
              />
            </div>
            <Link
              href="/placement-assistance"
              className="btn-gold px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 self-start lg:self-auto"
            >
              <EditableText path="placementSection.ctaLabel" value={content.placementSection.ctaLabel} />
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div ref={pathwayRef} className="relative space-y-5">
            <div className="hidden lg:block h-1 bg-white/15 overflow-hidden">
              <div className="pathway-progress-bar h-full bg-[#93C5FD] origin-left" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.placementSection.stages.map((item, sIdx) => {
                const Icon = PLACEMENT_ICONS[sIdx % PLACEMENT_ICONS.length];
                return (
                  <div
                    key={sIdx}
                    className="pathway-stage-card bg-white/10 border border-white/15 border-t-4 border-t-[#93C5FD] p-6 space-y-3 hover:bg-white/15 transition-colors duration-300 rounded-[15px]"
                  >
                    <div className="flex items-center justify-between">
                      <EditableText
                        path={`placementSection.stages.${sIdx}.step`}
                        value={item.step}
                        className="font-nav text-xs font-bold uppercase tracking-wider text-[#93C5FD]"
                      />
                      <Icon className="w-5 h-5 text-white/80" />
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
                      className="text-sm text-white/80 leading-relaxed"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <EditableText
            as="p"
            path="brand.placementDisclaimer"
            value={content.brand.placementDisclaimer}
            className="text-xs text-white/70 border-t border-white/15 pt-5"
          />
        </div>
      </section>

      {/* 18 — ACADEMIC PARTNERSHIPS (MCU-12 Coordinated Split Curtain Timeline) */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
        <div
          ref={academicRef}
          className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden"
        >
          <div className="split-content lg:col-span-6 space-y-5">
            <EditableText
              as="p"
              path="academicSection.eyebrow"
              value={content.academicSection.eyebrow}
              className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]"
            />
            <EditableText
              as="h2"
              path="academicSection.heading"
              value={content.academicSection.heading}
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3A8A] leading-tight"
            />
            <EditableText
              as="p"
              path="academicSection.description"
              value={content.academicSection.description}
              className="text-base text-[#4B5563] leading-relaxed"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {content.academicSection.bullets.map((item, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2 text-sm text-[#111827]">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                  <EditableText path={`academicSection.bullets.${bIdx}`} value={item} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3.5 pt-3">
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

          <div className="split-image lg:col-span-6 relative aspect-[16/10] border border-[#E5E7EB] overflow-hidden shadow-md rounded-[15px]">
            <Image
              ref={academicImgRef}
              src={content.academicSection.image}
              alt={content.academicSection.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover mc-image-zoom scale-105"
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

      {/* 19 — CAMPUS AND LEARNING EXPERIENCE */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <EditableText
                as="p"
                path="campusSection.eyebrow"
                value={content.campusSection.eyebrow}
                className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]"
              />
              <EditableText
                as="h2"
                path="campusSection.heading"
                value={content.campusSection.heading}
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3A8A] mt-2"
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

          <div ref={campusRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {content.campusSection.gallery.map((item, gIdx) => (
              <div
                key={gIdx}
                className="campus-tile group relative aspect-[4/5] overflow-hidden border border-[#E5E7EB] bg-[#1E3A8A] rounded-[15px]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover mc-image-zoom"
                />
                <EditableImageTrigger
                  path={`campusSection.gallery.${gIdx}.src`}
                  currentSrc={item.src}
                  altPath={`campusSection.gallery.${gIdx}.alt`}
                  currentAlt={item.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-transparent to-transparent flex items-end p-4">
                  <EditableText
                    as="p"
                    path={`campusSection.gallery.${gIdx}.title`}
                    value={item.title}
                    className="font-nav text-xs sm:text-sm font-bold text-white leading-snug"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20 — FINAL HOMEPAGE ADMISSIONS ENQUIRY BANNER */}
      <section className="py-16 lg:py-20 bg-white">
        <div ref={finalCtaRef} className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="final-cta-card bg-[#1E3A8A] text-white p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-l-8 border-[#EA580C] rounded-[15px]">
            <div className="space-y-3 max-w-2xl">
              <EditableText
                as="h2"
                path="finalCtaSection.heading"
                value={content.finalCtaSection.heading}
                className="text-3xl sm:text-4xl font-bold"
              />
              <EditableText
                as="p"
                path="finalCtaSection.description"
                value={content.finalCtaSection.description}
                className="text-base text-white/85 leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "homepage-final-cta" })}
                className="btn-gold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                <EditableText path="finalCtaSection.demoLabel" value={content.finalCtaSection.demoLabel} />
              </button>
              <Link
                href="/contact"
                className="border border-white/70 hover:bg-white hover:text-[#1E3A8A] text-white font-nav font-semibold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider transition-colors rounded-[15px]"
              >
                <EditableText path="finalCtaSection.contactLabel" value={content.finalCtaSection.contactLabel} />
              </Link>
              <a
                href={content.brand.phoneHref}
                className="inline-flex items-center gap-2 font-nav text-sm font-bold text-[#93C5FD] hover:underline px-2"
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
