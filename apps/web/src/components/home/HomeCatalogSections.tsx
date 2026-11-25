"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  GraduationCap,
  Layers,
  ShieldCheck,
  Users,
  BookOpen,
  Sparkles,
} from "lucide-react";
import {
  BRAND,
  OfficialCategorySeed,
  OfficialComboSeed,
  OfficialCourseSeed,
} from "@vlearnin/shared";
import { useLeadModal } from "@/components/LeadModalProvider";

gsap.registerPlugin(ScrollTrigger);

const FILTER_TABS = [
  { id: "all", label: "All Programmes" },
  { id: "ai-business-intelligence", label: "AI & Analytics" },
  { id: "corporate-finance-capital-markets", label: "Finance & IB" },
  { id: "digital-marketing-creative-media", label: "Digital & Media" },
];

const ADVANTAGES = [
  {
    icon: Sparkles,
    title: "100% Practical Pedagogy",
    description:
      "Every module is driven by live business datasets, real financial models, AI workflows and hands-on capstone projects.",
  },
  {
    icon: Users,
    title: "Small-Batch Mentorship",
    description:
      "Focused batch sizes ensure personalized guidance, doubt resolution and portfolio building.",
  },
  {
    icon: ShieldCheck,
    title: "QR-Verified Credentials",
    description:
      "VLEARNIN certificates are verifiable online by employers and institutions.",
  },
  {
    icon: Clock,
    title: "Flexible Batch Timings",
    description:
      "Weekday, evening and weekend batches at our Rajajinagar center, plus on-campus college programmes.",
  },
];

const PLACEMENT_STAGES = [
  {
    stage: "Stage 01",
    title: "Live Capstone Portfolio",
    desc: "Graduate with real Power BI dashboards, Excel valuation models, AI workflows or practical marketing campaigns.",
    icon: Layers,
  },
  {
    stage: "Stage 02",
    title: "ATS Resume & LinkedIn Makeover",
    desc: "Personalized profile optimization tailored to finance, analytics and digital roles.",
    icon: FileCheck2,
  },
  {
    stage: "Stage 03",
    title: "Mock Interviews & Domain Prep",
    desc: "Practice technical and HR interview rounds with personalized feedback.",
    icon: GraduationCap,
  },
  {
    stage: "Stage 04",
    title: "Curated Hiring Network",
    desc: "Access to available internship and full-time opportunities through verified employer connections.",
    icon: Briefcase,
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-stagger-group").forEach((group) => {
        const items = group.querySelectorAll(".gsap-stagger-item");
        if (items.length === 0) return;
        gsap.from(items, {
          y: 26,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
            once: true,
          },
        });
      });

      gsap.fromTo(
        ".placement-progress-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".placement-progress-line",
            start: "top 85%",
            once: true,
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((c) => c.categorySlug === activeFilter);

  return (
    <div ref={wrapperRef}>
      {/* 11 — CORE LEARNING DOMAINS */}
      <section className="py-20 bg-[#F4F7FC] border-y border-[#DFE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1746A2]">
              CORE LEARNING DOMAINS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#071B3D] mt-2">
              Industry-Aligned Certification Programmes
            </h2>
            <p className="text-base text-[#667085] mt-3">
              Structured, hands-on tracks designed around real workplace tools, live datasets,
              and practical assessments.
            </p>
          </div>

          <div className="gsap-stagger-group grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const domainCourses = courses.filter((c) => c.categorySlug === cat.slug);
              const ctaLabel =
                cat.slug === "ai-business-intelligence"
                  ? "View AI & Analytics"
                  : cat.slug === "corporate-finance-capital-markets"
                    ? "View Finance & IB"
                    : "View Digital & Media";

              return (
                <article
                  key={cat.slug}
                  className="gsap-stagger-item group bg-white border border-[#DFE5EE] hover:border-[#D4A54A] transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3D]/80 via-[#071B3D]/20 to-transparent" />
                    <span className="absolute bottom-4 left-5 font-nav text-[11px] font-bold uppercase tracking-[0.16em] text-[#E6C47A]">
                      {cat.shortName}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-[#071B3D] leading-snug">
                        {cat.name}
                      </h3>
                      <ul className="space-y-1.5 border-t border-[#DFE5EE] pt-3">
                        {domainCourses.map((dc) => (
                          <li
                            key={dc.slug}
                            className="text-xs font-nav font-semibold text-[#1746A2] flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-[#D4A54A] mt-1.5 shrink-0" />
                            <span>{dc.title}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-[#667085] leading-relaxed pt-1">
                        {cat.outcomeSummary}
                      </p>
                    </div>

                    <Link
                      href={`/courses?category=${cat.slug}`}
                      className="inline-flex items-center justify-between pt-4 border-t border-[#DFE5EE] font-nav text-xs font-bold uppercase tracking-wider text-[#071B3D] group-hover:text-[#1746A2]"
                    >
                      <span>{ctaLabel}</span>
                      <ArrowRight className="w-4 h-4 text-[#D4A54A] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12 — FEATURED CERTIFICATION PROGRAMMES (ALL 7 WITH ANIMATED FILTERING) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1746A2]">
                CERTIFICATION CATALOGUE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#071B3D] mt-2">
                All Seven Official Programmes
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter certification programmes by domain"
              className="flex flex-wrap gap-2"
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
                    className={`font-nav text-xs font-semibold px-4 py-2.5 border transition-all cursor-pointer ${
                      active
                        ? "bg-[#071B3D] text-white border-[#071B3D] shadow-xs"
                        : "bg-white text-[#101828] border-[#DFE5EE] hover:border-[#071B3D]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.article
                  key={course.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  className="group border border-[#DFE5EE] bg-white hover:border-[#1746A2] transition-all duration-300 flex flex-col shadow-xs hover:shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#071B3D]/90 text-[#E6C47A] font-nav text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1">
                      {course.categoryName}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-[#071B3D] leading-snug">
                        {course.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs font-nav text-[#667085]">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#D4A54A]" />
                          {course.durationHours} Hours
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-[#1746A2]" />
                          5 Modules
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#D4A54A]" />
                          Capstone Project
                        </span>
                      </div>
                      <p className="text-sm text-[#667085] leading-relaxed">
                        {course.summary}
                      </p>
                      <p className="text-xs font-nav text-[#101828] bg-[#F4F7FC] px-3 py-2 border-l-2 border-[#1746A2]">
                        <strong>Modes:</strong> {course.learningModes.join(" • ")}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#DFE5EE]">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="btn-outline-navy py-2.5 text-xs text-center"
                      >
                        View Course
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          openDemoModal({
                            preselectedProgramme: course.title,
                            sourcePage: "homepage-course-card",
                          })
                        }
                        className="btn-gold py-2.5 text-xs"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 13 — HIGH-DEMAND CAREER COMBOS */}
      <section className="py-20 bg-[#071B3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#D4A54A]">
                CAREER ACCELERATOR TRACKS
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Dual-Skill Career Accelerator Combos
              </h2>
              <p className="text-base text-white/75 mt-3">
                Combine complementary skills to build a stronger portfolio and stand out in
                campus placements and corporate interviews.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openBrochureModal({ brochureType: "complete" })}
              className="btn-gold px-6 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2 shrink-0 self-start lg:self-auto"
            >
              <Download className="w-4 h-4" />
              Download Complete Course Brochure
            </button>
          </div>

          <div className="gsap-stagger-group grid grid-cols-1 md:grid-cols-2 gap-7">
            {combos.map((combo, index) => (
              <article
                key={combo.slug}
                className="gsap-stagger-item bg-[#0B234D] border border-white/15 hover:border-[#D4A54A] transition-all duration-300 hover:-translate-y-1 p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-nav text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A54A]">
                      Combo 0{index + 1}
                    </span>
                    <span className="font-nav text-xs font-bold bg-white/10 text-white px-3 py-1 border border-white/15">
                      {combo.durationLabel}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{combo.title}</h3>
                  <p className="text-sm font-nav font-semibold text-[#E6C47A]">
                    {combo.includedLabel}
                  </p>
                  <p className="text-sm text-white/75 leading-relaxed">{combo.summary}</p>

                  <div className="pt-2 space-y-1.5">
                    <p className="text-xs font-nav uppercase tracking-wider text-white/60">
                      Ideal For
                    </p>
                    <p className="text-sm text-white/90">{combo.idealFor}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
                  <Link
                    href={`/career-combos/${combo.slug}`}
                    className="font-nav text-xs font-bold uppercase tracking-wider text-[#D4A54A] hover:text-white inline-flex items-center gap-2 transition-colors"
                  >
                    <span>Explore Track Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      openDemoModal({
                        preselectedProgramme: `${combo.title} (${combo.durationLabel})`,
                        sourcePage: "homepage-combo-card",
                      })
                    }
                    className="border border-white/40 hover:bg-white hover:text-[#071B3D] text-white font-nav text-xs font-semibold px-4 py-2 transition-colors"
                  >
                    Book Free Demo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — THE VLEARNIN ADVANTAGE */}
      <section className="py-20 bg-[#F4F7FC] border-b border-[#DFE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1746A2]">
              THE VLEARNIN ADVANTAGE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#071B3D] mt-2">
              Why Learners Choose The V-Way
            </h2>
          </div>

          <div className="gsap-stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="gsap-stagger-item bg-white border border-[#DFE5EE] p-7 hover:border-[#D4A54A] hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <div className="w-11 h-11 bg-[#071B3D] text-[#D4A54A] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#071B3D] mb-2">{adv.title}</h3>
                  <p className="text-sm text-[#667085] leading-relaxed">{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15 — CAREER AND PLACEMENT ASSISTANCE WITH ANIMATED PROGRESS LINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1746A2]">
                CAREER &amp; PLACEMENT ASSISTANCE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#071B3D] mt-2">
                Structured Placement Assistance — From Classroom to Corporate
              </h2>
              <p className="text-base text-[#667085] mt-3">
                We bridge the gap between certification and employment through portfolio building
                and employer connections.
              </p>
            </div>
            <Link
              href="/placement-assistance"
              className="btn-navy px-6 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2 shrink-0 self-start lg:self-auto"
            >
              <span>Learn More About Career Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block placement-progress-line origin-left absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#071B3D] via-[#1746A2] to-[#D4A54A]"
            />
            <div className="gsap-stagger-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-0 lg:pt-4">
              {PLACEMENT_STAGES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.stage}
                    className="gsap-stagger-item border border-[#DFE5EE] bg-[#F4F7FC] p-6 relative hover:border-[#1746A2] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-nav text-xs font-bold uppercase tracking-widest text-[#1746A2]">
                        {item.stage}
                      </span>
                      <Icon className="w-5 h-5 text-[#D4A54A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#071B3D] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#667085] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 p-4 bg-[#F4F7FC] border-l-4 border-[#071B3D] text-xs text-[#667085] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#071B3D] shrink-0 mt-0.5" />
            <p>{BRAND.placementDisclaimer}</p>
          </div>
        </div>
      </section>

      {/* 16 — HOMEPAGE ACADEMIC PARTNERSHIP BANNER */}
      <section className="relative py-24 bg-[#071B3D] overflow-hidden">
        <Image
          src="/images/academic-partnership.jpg"
          alt="Illustrative college workshop and academic training seminar"
          fill
          sizes="100vw"
          className="object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071B3D] via-[#071B3D]/90 to-[#071B3D]/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-stagger-group max-w-3xl space-y-5 border-l-4 border-[#D4A54A] pl-6 sm:pl-8">
            <p className="gsap-stagger-item font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#D4A54A]">
              INSTITUTIONAL COLLABORATIONS
            </p>
            <h2 className="gsap-stagger-item text-3xl sm:text-4xl font-bold text-white leading-tight">
              Partnering with Colleges &amp; Educational Institutions
            </h2>
            <p className="gsap-stagger-item text-base text-white/85 leading-relaxed">
              VLEARNIN collaborates with degree colleges across Bengaluru and Karnataka to deliver
              structured 30-hour value-added certification programmes, workshops, and capstone
              assessments tailored to B.Com, BBA, BCA, and MBA students.
            </p>
            <div className="gsap-stagger-item pt-2">
              <Link
                href="/academic-partnerships"
                className="btn-gold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Explore Academic Partnerships</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
