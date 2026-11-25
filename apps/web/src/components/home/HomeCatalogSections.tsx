"use client";

import React, { useRef, useState } from "react";
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
import { Reveal } from "@/components/animation/Reveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

const FILTER_TABS = [
  { id: "all", label: "All Programmes" },
  { id: "ai-business-intelligence", label: "AI & Business Intelligence" },
  { id: "corporate-finance-capital-markets", label: "Finance & Investment Banking" },
  { id: "digital-marketing-creative-media", label: "Digital Marketing & Media" },
];

const ADVANTAGES = [
  {
    num: "01",
    icon: Sparkles,
    title: "100% Practical Pedagogy",
    description:
      "Every module is driven by live business datasets, real financial models, AI workflows and hands-on capstone projects.",
  },
  {
    num: "02",
    icon: Users,
    title: "Small-Batch Mentorship",
    description:
      "Focused batch sizes ensure personalized guidance, doubt resolution and portfolio building.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "QR-Verified Credentials",
    description:
      "VLEARNIN certificates are verifiable online by employers and institutions.",
  },
  {
    num: "04",
    icon: Clock,
    title: "Flexible Batch Timings",
    description:
      "Weekday, evening and weekend batches at our Rajajinagar center, plus on-campus college programmes.",
  },
];

const PLACEMENT_STAGES = [
  {
    step: "Step 01",
    title: "Live Capstone Portfolio",
    desc: "Graduate with real Power BI dashboards, Excel valuation models, AI workflows or practical marketing campaigns.",
    icon: Layers,
  },
  {
    step: "Step 02",
    title: "ATS Resume & LinkedIn Makeover",
    desc: "Personalized profile optimization tailored to finance, analytics and digital roles.",
    icon: FileCheck2,
  },
  {
    step: "Step 03",
    title: "Mock Interviews & Domain Prep",
    desc: "Practice technical and HR interview rounds with personalized feedback.",
    icon: GraduationCap,
  },
  {
    step: "Step 04",
    title: "Curated Hiring Network",
    desc: "Access to available internship and full-time opportunities through verified employer connections.",
    icon: Briefcase,
  },
];

const CAMPUS_GALLERY = [
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
];

export function HomeCatalogSections({
  categories,
  courses,
  combos,
}: {
  categories: OfficialCategorySeed[];
  courses: OfficialCourseSeed[];
  combos: OfficialComboSeed[];
}) {
  const { openDemoModal, openBrochureModal } = useLeadModal();
  const [activeFilter, setActiveFilter] = useState("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const combosRef = useRef<HTMLDivElement>(null);
  const placementRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(domainsRef, ".domain-panel", "fadeUp", 0.12);
  useStaggerReveal(combosRef, ".combo-card", "cardReveal", 0.08);
  useStaggerReveal(placementRef, ".placement-stage", "fadeUp", 0.1);
  useStaggerReveal(campusRef, ".campus-tile", "cardReveal", 0.06);

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
      <section className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mb-12">
            <p className="mc-eyebrow text-[#16529A]">
              EXPLORE OUR LEARNING DOMAINS
            </p>
            <AnimatedHeading as="h2" className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#082F62] mt-2 leading-tight">
              Industry-Aligned Certification Programmes
            </AnimatedHeading>
            <p className="mc-lead text-[#5C6672] mt-3">
              Structured, hands-on tracks designed around real workplace tools, live datasets and
              practical assessments.
            </p>
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
                  className="domain-panel mc-card-hover bg-white border border-[#E2E8F0] shadow-xs grid grid-cols-1 lg:grid-cols-12 overflow-hidden group"
                >
                  <div
                    className={`lg:col-span-6 relative min-h-[260px] lg:min-h-[360px] overflow-hidden ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div
                    className={`lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5 ${
                      reverse ? "lg:order-1" : ""
                    }`}
                  >
                    <div>
                      <span className="font-nav text-xs font-bold uppercase tracking-[0.18em] text-[#F58220]">
                        Domain 0{idx + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#082F62] mt-1">
                        {cat.name}
                      </h3>
                    </div>

                    <p className="text-base text-[#5C6672] leading-relaxed">
                      {cat.outcomeSummary}
                    </p>

                    <ul className="space-y-2 border-y border-[#E2E8F0] py-4">
                      {domainCourses.map((dc) => (
                        <li key={dc.slug}>
                          <Link
                            href={`/courses/${dc.slug}`}
                            className="inline-flex items-center gap-2.5 text-[15px] font-nav font-semibold text-[#16529A] hover:text-[#082F62] transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 text-[#F58220] shrink-0" />
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
      <section className="py-16 lg:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#16529A]">
                PROGRAMME DISCOVERY
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082F62] mt-2">
                Discover Programmes That Shape Your Future
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                aria-label="Scroll programmes left"
                className="w-10 h-10 border border-[#E2E8F0] hover:border-[#082F62] text-[#082F62] flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                aria-label="Scroll programmes right"
                className="w-10 h-10 border border-[#E2E8F0] hover:border-[#082F62] text-[#082F62] flex items-center justify-center cursor-pointer transition-colors"
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
            className="flex flex-wrap gap-2 mb-8 border-b border-[#E2E8F0] pb-4"
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
                      ? "bg-[#082F62] text-white"
                      : "bg-[#F5F7FA] text-[#212529] hover:bg-[#E2E8F0]"
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
              {filteredCourses.map((course) => (
                <motion.article
                  key={course.slug}
                  layout
                  initial={{ opacity: 0.4, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mc-card-hover snap-start shrink-0 w-[300px] sm:w-[360px] border border-[#E2E8F0] bg-white flex flex-col justify-between group hover:border-[#16529A]"
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
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="font-nav text-[11px] font-bold uppercase tracking-wider text-[#16529A]">
                      {course.categoryName}
                    </span>
                    <h3 className="text-xl font-bold text-[#082F62] leading-snug">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs font-nav text-[#5C6672]">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#F58220]" />
                        {course.durationHours} Hours
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#16529A]" />
                        5 Modules + Capstone
                      </span>
                    </div>
                    <p className="text-sm text-[#5C6672] leading-relaxed">{course.summary}</p>
                    <p className="text-xs font-nav text-[#212529]">
                      <strong>Modes:</strong> {course.learningModes.join(" • ")}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#E2E8F0] grid grid-cols-2 gap-3">
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
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 15 — CAREER ACCELERATOR COMBOS */}
      <section className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#16529A]">
                CAREER ACCELERATOR TRACKS
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082F62] mt-2">
                Dual-Skill Career Accelerator Combos
              </h2>
              <p className="text-base text-[#5C6672] mt-2">
                Combine complementary certifications into a single structured portfolio pathway.
              </p>
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
                className="combo-card mc-card-hover bg-white border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-12 overflow-hidden hover:border-[#16529A]"
              >
                <div className="sm:col-span-5 relative min-h-[220px]">
                  <Image
                    src={combo.image}
                    alt={combo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#082F62] text-[#F4C430] font-nav text-xs font-bold px-3 py-1">
                    {combo.durationLabel}
                  </span>
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="font-nav text-[11px] font-bold uppercase tracking-wider text-[#F58220]">
                      Pathway 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-[#082F62]">{combo.title}</h3>
                    <p className="text-xs font-nav font-semibold text-[#16529A]">
                      {combo.includedLabel}
                    </p>
                    <p className="text-sm text-[#5C6672]">{combo.summary}</p>
                    <p className="text-xs text-[#212529]">
                      <strong>Ideal For:</strong> {combo.idealFor}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                    <Link
                      href={`/career-combos/${combo.slug}`}
                      className="font-nav text-xs font-bold uppercase tracking-wider text-[#16529A] hover:text-[#082F62] inline-flex items-center gap-1"
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
                      className="font-nav text-xs font-bold text-[#F58220] hover:underline cursor-pointer"
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
      <section className="py-16 lg:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[4/5] border border-[#E2E8F0] overflow-hidden">
            <Image
              src="/images/hero-1.jpg"
              alt="Small-batch practical mentorship at VLEARNIN"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#16529A]">
                THE VLEARNIN ADVANTAGE
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082F62] mt-2">
                Why Learners Choose The V-Way
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ADVANTAGES.map((adv) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={adv.title}
                    className="p-6 bg-[#F5F7FA] border-l-4 border-[#16529A] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="w-5 h-5 text-[#F58220]" />
                      <span className="font-editorial text-2xl font-bold text-[#082F62]/40">
                        {adv.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#082F62]">{adv.title}</h3>
                    <p className="text-sm text-[#5C6672] leading-relaxed">{adv.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 17 — PLACEMENT ASSISTANCE (Connected Pathway) */}
      <section className="py-16 lg:py-24 bg-[#082F62] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#F4C430]">
                STRUCTURED PLACEMENT ASSISTANCE
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold mt-2">
                From Classroom to Corporate
              </h2>
            </div>
            <Link
              href="/placement-assistance"
              className="btn-gold px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 self-start lg:self-auto"
            >
              <span>Explore Career Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div ref={placementRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLACEMENT_STAGES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="placement-stage bg-white/10 border border-white/15 border-t-4 border-t-[#F4C430] p-6 space-y-3 hover:bg-white/15 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-nav text-xs font-bold uppercase tracking-wider text-[#F4C430]">
                      {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-white/70 border-t border-white/15 pt-5">
            {BRAND.placementDisclaimer}
          </p>
        </div>
      </section>

      {/* 18 — ACADEMIC PARTNERSHIPS */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#16529A]">
              INSTITUTIONAL COLLABORATIONS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082F62] leading-tight">
              Partnering with Colleges &amp; Educational Institutions
            </h2>
            <p className="text-base text-[#5C6672] leading-relaxed">
              VLEARNIN collaborates with degree colleges across Bengaluru and Karnataka to deliver
              structured value-added certification programmes tailored to B.Com, BBA, BCA, and MBA
              students.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "30-hour value-added certification programmes",
                "On-campus practical training",
                "Workshops & orientation seminars",
                "Capstone assessments",
                "Curriculum-aligned learning",
                "Career readiness & portfolios",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-[#212529]">
                  <CheckCircle2 className="w-4 h-4 text-[#16529A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3.5 pt-3">
              <Link
                href="/academic-partnerships"
                className="btn-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
              >
                Explore Academic Partnerships
              </Link>
              <Link
                href="/academic-partnerships#institutional-form"
                className="btn-outline-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
              >
                Request Institutional Proposal
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] border border-[#E2E8F0] overflow-hidden shadow-md">
            <Image
              src="/images/academic-partnership.jpg"
              alt="Illustrative college seminar and faculty workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 19 — CAMPUS AND LEARNING EXPERIENCE */}
      <section className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#16529A]">
                LEARNING ENVIRONMENT
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082F62] mt-2">
                Experience Practical Learning at VLEARNIN
              </h2>
              <p className="text-base text-[#5C6672] mt-2">
                Illustrative classroom, analytics lab, studio, and mentorship environments.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-outline-navy px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Visit Our Rajajinagar Center
              </Link>
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "campus-experience" })}
                className="btn-primary-amber px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                Book Free Demo
              </button>
            </div>
          </div>

          <div ref={campusRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CAMPUS_GALLERY.map((item) => (
              <div
                key={item.title}
                className="campus-tile group relative aspect-[4/5] overflow-hidden border border-[#E2E8F0] bg-[#082F62]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover mc-image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082F62]/90 via-transparent to-transparent flex items-end p-4">
                  <p className="font-nav text-xs sm:text-sm font-bold text-white leading-snug">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20 — FINAL HOMEPAGE ADMISSIONS ENQUIRY BANNER */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="bg-[#082F62] text-white p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-l-8 border-[#F58220]">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Your Next Career Chapter Begins Here.
              </h2>
              <p className="text-base text-white/85 leading-relaxed">
                Explore practical certification programmes, connect with our academic team and
                discover the right learning pathway for your goals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "homepage-final-cta" })}
                className="btn-gold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                Book a Free Demo Class
              </button>
              <Link
                href="/contact"
                className="border border-white/70 hover:bg-white hover:text-[#082F62] text-white font-nav font-semibold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider transition-colors"
              >
                Talk to Our Team
              </Link>
              <a
                href={BRAND.phoneHref}
                className="inline-flex items-center gap-2 font-nav text-sm font-bold text-[#F4C430] hover:underline px-2"
              >
                <Phone className="w-4 h-4" />
                <span>{BRAND.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
