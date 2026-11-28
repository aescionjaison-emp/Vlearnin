"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { BRAND, OfficialCategorySeed } from "@vlearnin/shared";

gsap.registerPlugin(ScrollTrigger);

interface AboutCinematicClientProps {
  categories: OfficialCategorySeed[];
}

export function AboutCinematicClient({ categories }: AboutCinematicClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };
          const depthMult = isDesktop ? 1 : 0.45;

          // Scene 01 — Student-Centric Hero gentle camera progression
          gsap.fromTo(
            ".beyond-hero-photo",
            { scale: 1.04, y: 0 },
            {
              scale: isDesktop ? 1.1 : 1.05,
              y: 22 * depthMult,
              ease: "none",
              scrollTrigger: {
                trigger: ".beyond-hero-scene",
                start: "top top",
                end: "bottom top",
                scrub: 0.55,
              },
            }
          );

          // Restrained 2.5D photographic depth across story scenes
          gsap.utils.toArray<HTMLElement>(".story-scene").forEach((scene) => {
            const bg = scene.querySelector<HTMLElement>(".scene-bg-plate");
            const photo = scene.querySelector<HTMLElement>(".scene-student-frame");
            const inset = scene.querySelector<HTMLElement>(".scene-inset-frame");

            if (bg) {
              gsap.fromTo(
                bg,
                { scale: 1.06, y: -14 * depthMult },
                {
                  scale: 1.0,
                  y: 14 * depthMult,
                  ease: "none",
                  scrollTrigger: {
                    trigger: scene,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                  },
                }
              );
            }

            if (photo) {
              gsap.fromTo(
                photo,
                { y: 18 * depthMult, scale: 0.99 },
                {
                  y: -18 * depthMult,
                  scale: 1.02,
                  ease: "none",
                  scrollTrigger: {
                    trigger: scene,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.55,
                  },
                }
              );
            }

            if (inset) {
              gsap.fromTo(
                inset,
                { y: 26 * depthMult },
                {
                  y: -22 * depthMult,
                  ease: "none",
                  scrollTrigger: {
                    trigger: scene,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                  },
                }
              );
            }
          });
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const aiDomain = categories[0];
  const financeDomain = categories[1];
  const creativeDomain = categories[2];

  return (
    <div ref={rootRef} className="bg-[#FAF9F6] text-[#10264A] overflow-x-clip">
      {/* =================================================================
          SCENE 01 — STUDENT-CENTRIC CAMPAIGN HERO
         ================================================================= */}
      <section
        aria-label="About VLEARNIN Hero"
        className="beyond-hero-scene relative min-h-[82vh] lg:min-h-[86vh] flex items-center overflow-hidden border-b border-[#E1E6EC] bg-[#FAF9F6]"
      >
        <div className="beyond-hero-photo absolute inset-0 pointer-events-none select-none">
          <picture className="block w-full h-full">
            <source
              media="(max-width: 1023px)"
              srcSet="/images/hero/vlearnin-main-mobile.webp"
            />
            <img
              src="/images/hero/vlearnin-main-desktop.webp"
              alt="VLEARNIN mentor guiding Indian college students on laptops in contemporary Bengaluru studio"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-bottom lg:object-right-center"
            />
          </picture>
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/92 via-[#FAF9F6]/60 to-transparent w-[58%]" />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/95 via-[#FAF9F6]/70 to-transparent h-[62%]" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-64 sm:pb-72 lg:py-20">
          <div className="max-w-xl lg:max-w-[620px] space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#C49A59]" />
              <span className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#2463A6]">
                VLEARNIN — Beyond the Classroom
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[62px] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#10264A]">
              The V-Way to{" "}
              <span className="text-[#2463A6] italic font-extrabold">
                Learn, Build &amp; Lead.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-[19px] text-[#526477] leading-[1.7] max-w-xl">
              Practical, mentor-led certification training in Bengaluru built for real workplace
              execution.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/courses"
                className="btn-primary-amber px-6 py-3.5 text-sm inline-flex items-center gap-2"
              >
                <span>Explore Certifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline-navy px-6 py-3.5 text-sm bg-white/95"
              >
                Visit Rajajinagar Centre
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 02 — WHO WE ARE (Mentor & Students in Practice)
         ================================================================= */}
      <section className="story-scene relative py-20 lg:py-28 bg-white border-b border-[#E1E6EC] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] shadow-sm">
            <div className="scene-bg-plate absolute -inset-4">
              <Image
                src="/images/about/who-we-are/who-we-are-background.webp"
                alt="Contemporary glass-partitioned Bengaluru learning studio"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="scene-student-frame absolute inset-4 sm:inset-6 rounded-[12px] overflow-hidden border-2 border-white shadow-[0_20px_44px_rgba(16,38,74,0.2)]">
              <Image
                src="/images/about-campus.jpg"
                alt="Indian instructor mentoring college students on laptops at VLEARNIN"
                fill
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">02 — Curiosity to Capability</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.12] text-[#10264A]">
              Who We Are
            </h2>
            <p className="text-base sm:text-lg text-[#526477] leading-[1.75]">
              Based in Rajajinagar, Bengaluru, VLEARNIN delivers 30-hour hands-on certifications
              across five structured modules—ending with an evaluated capstone project.
            </p>
            <div className="pt-3 flex flex-wrap gap-6 border-t border-[#E1E6EC]">
              <div>
                <p className="font-heading text-2xl font-extrabold text-[#10264A]">30 Hours</p>
                <p className="text-xs font-nav text-[#526477] uppercase tracking-wider">Per Certification</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-extrabold text-[#2463A6]">5 Modules</p>
                <p className="text-xs font-nav text-[#526477] uppercase tracking-wider">Structured Execution</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-extrabold text-[#10264A]">1 Capstone</p>
                <p className="text-xs font-nav text-[#526477] uppercase tracking-wider">Evaluated Portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 03 — OUR VISION (Student Imagining Their Professional Future)
         ================================================================= */}
      <section className="story-scene relative py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E1E6EC] overflow-hidden">
        <div className="scene-bg-plate absolute inset-0 opacity-35 pointer-events-none">
          <Image
            src="/images/about/vision/vision-background.webp"
            alt="Sunlit ivory architectural hall"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">03 — Imagining the Future</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] text-[#10264A]">
              Our Vision
            </h2>
            <p className="text-lg sm:text-xl text-[#526477] leading-[1.7]">
              Equip students and professionals with practical, job-ready capabilities.
            </p>
            <p className="text-sm text-[#526477] leading-relaxed border-l-2 border-[#C49A59] pl-4">
              Every student begins with curiosity. Guided practice bridges classroom study with the
              confidence to step into modern analytical, financial, and creative careers.
            </p>
          </div>

          <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] shadow-md bg-white">
            <div className="scene-student-frame relative w-full h-full">
              <Image
                src="/images/hero-4.jpg"
                alt="Students preparing for their professional future through practical study"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 04 — OUR MISSION (Student Project + Mentor Guidance)
         ================================================================= */}
      <section className="story-scene relative py-20 lg:py-28 bg-white border-b border-[#E1E6EC] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] shadow-sm">
            <div className="scene-bg-plate absolute -inset-4">
              <Image
                src="/images/about/mission/mission-background.webp"
                alt="Warm ivory academic studio backdrop"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="scene-student-frame absolute inset-4 sm:inset-6 rounded-[12px] overflow-hidden border-2 border-white shadow-[0_20px_44px_rgba(16,38,74,0.2)]">
              <Image
                src="/images/hero-3.jpg"
                alt="Student completing a practical certification project with mentor guidance"
                fill
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">04 — Knowledge Into Action</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.12] text-[#10264A]">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-[#526477] leading-[1.75]">
              Deliver mentor-led 30-hour certifications backed by capstones and QR verification.
            </p>
            <div className="pt-2">
              <Link
                href="/verify-certificate"
                className="inline-flex items-center gap-2 font-nav text-sm font-semibold text-[#2463A6] hover:text-[#10264A] transition-colors"
              >
                <span>Explore QR Certificate Verification</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 05 — OUR EDUCATIONAL PHILOSOPHY (Learning Beyond Textbooks)
         ================================================================= */}
      <section className="story-scene relative py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E1E6EC] overflow-hidden">
        <div className="scene-bg-plate absolute inset-0 opacity-40 pointer-events-none">
          <Image
            src="/images/about/philosophy/philosophy-background.webp"
            alt="Warm ivory plinth studio backdrop"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">05 — Learning Beyond Textbooks</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.12] text-[#10264A]">
              Our Educational Philosophy
            </h2>
            <p className="text-base sm:text-lg text-[#526477] leading-[1.75]">
              Hands-on learning on live datasets, financial models, ad managers, and production
              tools.
            </p>
            <p className="text-sm text-[#526477] leading-relaxed border-l-2 border-[#C49A59] pl-4">
              Students translate foundational theory directly into applied analytics, valuation
              spreadsheets, campaign managers, and studio production workflows.
            </p>
          </div>

          <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] shadow-md bg-white">
            <div className="scene-student-frame relative w-full h-full">
              <Image
                src="/images/course-ai-commerce.jpg"
                alt="Student applying textbook knowledge to real-world digital and analytical tools"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 06 — CORE LEARNING DOMAINS (3 Student-Centric Workspaces)
         ================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">06 — Core Learning Domains</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#10264A]">
              Students in Action Across Three Disciplines
            </h2>
          </div>

          {/* Domain 01: AI & Business Intelligence */}
          <div className="story-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-[#F1F6FB]">
              <div className="scene-bg-plate absolute -inset-4">
                <Image
                  src="/images/about/domains/ai/ai-background.webp"
                  alt="AI and Business Intelligence studio environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="scene-student-frame absolute inset-4 sm:inset-6 rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/domain-analytics.jpg"
                  alt="Student building Power BI dashboards and AI workflows on laptop"
                  fill
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="font-heading text-xs font-extrabold uppercase tracking-[0.18em] text-[#2463A6]">
                Domain 01
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10264A]">
                {aiDomain?.name || "Artificial Intelligence & Business Intelligence"}
              </h3>
              <p className="text-base text-[#526477] leading-relaxed">
                {aiDomain?.description ||
                  "AI workflows, Power Query, DAX, and Power BI dashboards."}
              </p>
              <div className="pt-2">
                <Link
                  href="/courses?category=ai-business-intelligence"
                  className="btn-navy px-5 py-2.5 text-sm inline-flex items-center gap-2"
                >
                  <span>Explore Domain</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Domain 02: Corporate Finance & Capital Markets */}
          <div className="story-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
              <span className="font-heading text-xs font-extrabold uppercase tracking-[0.18em] text-[#C49A59]">
                Domain 02
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10264A]">
                {financeDomain?.name || "Corporate Finance & Capital Markets"}
              </h3>
              <p className="text-base text-[#526477] leading-relaxed">
                {financeDomain?.description ||
                  "Excel financial models, DCF valuations, M&A, and pitchbooks."}
              </p>
              <div className="pt-2">
                <Link
                  href="/courses?category=corporate-finance-capital-markets"
                  className="btn-navy px-5 py-2.5 text-sm inline-flex items-center gap-2"
                >
                  <span>Explore Domain</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-[#F8F5EE] order-1 lg:order-2">
              <div className="scene-bg-plate absolute -inset-4">
                <Image
                  src="/images/about/domains/finance/finance-background.webp"
                  alt="Corporate finance study backdrop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="scene-student-frame absolute inset-4 sm:inset-6 rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/course-investment-banking.jpg"
                  alt="Aspiring Indian finance learners collaborating on financial modelling"
                  fill
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Domain 03: Digital Marketing & Creative Media */}
          <div className="story-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-[#FBF4F1]">
              <div className="scene-student-frame relative w-full h-full">
                <Image
                  src="/images/domain-creative.jpg"
                  alt="Creative media student with professional camera and studio lighting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="font-heading text-xs font-extrabold uppercase tracking-[0.18em] text-[#2463A6]">
                Domain 03
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10264A]">
                {creativeDomain?.name || "Digital Marketing & Creative Media"}
              </h3>
              <p className="text-base text-[#526477] leading-relaxed">
                {creativeDomain?.description ||
                  "Performance ads, brand content systems, and commercial video editing."}
              </p>
              <div className="pt-2">
                <Link
                  href="/courses?category=digital-marketing-creative-media"
                  className="btn-navy px-5 py-2.5 text-sm inline-flex items-center gap-2"
                >
                  <span>Explore Domain</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENES 07–10 — PRACTICAL LEARNING, MENTORSHIP, CAREER, COLLABORATION
         ================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
          {/* Scene 07: Practical Learning Methodology */}
          <div className="story-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="type-eyebrow text-[#2463A6]">07 — Practical Methodology</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#10264A]">
                Practical Learning Methodology
              </h2>
              <p className="text-base sm:text-lg text-[#526477] leading-relaxed">
                Live demonstrations, hands-on exercises, and an evaluated capstone project.
              </p>
            </div>
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-white">
              <div className="scene-bg-plate absolute -inset-4">
                <Image
                  src="/images/about/practical-learning/practical-background.webp"
                  alt="Practical learning studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="scene-student-frame absolute inset-4 sm:inset-5 rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/hero-2.jpg"
                  alt="Students collaboratively developing a practical capstone project"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Scene 08: Small-Batch Mentorship */}
          <div className="story-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-white">
              <div className="scene-bg-plate absolute -inset-4">
                <Image
                  src="/images/about/mentorship/mentorship-background.webp"
                  alt="Small-batch mentorship classroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="scene-student-frame absolute inset-4 sm:inset-5 rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Mentor explaining concepts to a small group of attentive students"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="type-eyebrow text-[#2463A6]">08 — Guided Execution</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#10264A]">
                Small-Batch Mentorship
              </h2>
              <p className="text-base sm:text-lg text-[#526477] leading-relaxed">
                Focused batches with 1-on-1 doubt resolution and portfolio feedback.
              </p>
            </div>
          </div>

          {/* Scene 09: Career Readiness */}
          <div className="story-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="type-eyebrow text-[#2463A6]">09 — Classroom to Corporate</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#10264A]">
                Career Readiness
              </h2>
              <p className="text-base sm:text-lg text-[#526477] leading-relaxed">
                ATS resumes, LinkedIn optimization, mock interviews, and employer access.
              </p>
              <p className="text-xs text-[#718096] leading-relaxed border-t border-[#E1E6EC] pt-3">
                {BRAND.placementDisclaimer}
              </p>
            </div>
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-white">
              <div className="scene-bg-plate absolute -inset-4">
                <Image
                  src="/images/about/career-readiness/career-background.webp"
                  alt="Academic to corporate corridor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="scene-inset-frame absolute inset-4 sm:inset-5 rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/hero-3.jpg"
                  alt="Students preparing portfolios and career interviews"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Scene 10: Academic Collaboration */}
          <div className="story-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-white">
              <div className="scene-student-frame relative w-full h-full">
                <Image
                  src="/images/academic-partnership.jpg"
                  alt="College students and educators participating in an academic workshop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="type-eyebrow text-[#2463A6]">10 — Institutional Outreach</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#10264A]">
                Academic Collaboration
              </h2>
              <p className="text-base sm:text-lg text-[#526477] leading-relaxed">
                On-campus and hybrid certifications with degree colleges across Karnataka.
              </p>
              <div className="pt-2">
                <Link
                  href="/academic-partnerships"
                  className="inline-flex items-center gap-2 font-nav text-sm font-semibold text-[#2463A6] hover:text-[#10264A] transition-colors"
                >
                  <span>Explore Academic Partnerships</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 11 — VISIT OUR RAJAJINAGAR CENTRE (Genuine Campus Photography)
         ================================================================= */}
      <section className="story-scene py-20 lg:py-28 bg-[#F1F6FB]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-white border border-[#E1E6EC] rounded-[16px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[380px] overflow-hidden">
              <div className="scene-bg-plate absolute -inset-4">
                <Image
                  src="/images/about-campus.jpg"
                  alt="VLEARNIN Academy Rajajinagar Centre Bengaluru"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[2px] w-8 bg-[#C49A59]" />
                  <span className="type-eyebrow text-[#2463A6]">11 — Bengaluru Campus</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#10264A]">
                  Visit Our Rajajinagar Center
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-[#526477]">
                <p className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#2463A6] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#10264A]">{BRAND.legalName}</strong>, {BRAND.address}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2463A6] shrink-0" />
                  <a href={BRAND.phoneHref} className="hover:text-[#10264A] font-medium">
                    {BRAND.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#2463A6] shrink-0" />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-[#10264A] font-medium">
                    {BRAND.email}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#2463A6] shrink-0 mt-0.5" />
                  <span>
                    {BRAND.timings.weekdays} | {BRAND.timings.sunday}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="btn-primary-amber px-7 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Campus Visit</span>
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1.5 font-nav text-sm font-semibold text-[#10264A] hover:text-[#2463A6] transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C49A59]" />
                  <span>View All 7 Certifications</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
