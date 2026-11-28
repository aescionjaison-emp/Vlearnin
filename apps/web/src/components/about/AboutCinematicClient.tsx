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

          // Scene 01 — Hero 2.5D camera progression
          gsap.fromTo(
            ".about-hero-bg",
            { scale: 1.04, y: 0 },
            {
              scale: 1.1,
              y: 28 * depthMult,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-hero-scene",
                start: "top top",
                end: "bottom top",
                scrub: 0.55,
              },
            }
          );
          gsap.fromTo(
            ".about-hero-arch",
            { scale: 1, y: 0 },
            {
              scale: isDesktop ? 1.09 : 1.04,
              y: -36 * depthMult,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-hero-scene",
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
          gsap.fromTo(
            ".about-hero-copy",
            { y: 0, opacity: 1 },
            {
              y: -24 * depthMult,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-hero-scene",
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );

          // Generic multi-layer 2.5D parallax scenes
          gsap.utils.toArray<HTMLElement>(".cinema-scene").forEach((scene) => {
            const bg = scene.querySelector<HTMLElement>(".layer-bg");
            const mid = scene.querySelector<HTMLElement>(".layer-mid");
            const fg = scene.querySelector<HTMLElement>(".layer-fg");
            const cutout = scene.querySelector<HTMLElement>(".layer-cutout");

            if (bg) {
              gsap.fromTo(
                bg,
                { scale: 1.06, y: -18 * depthMult },
                {
                  scale: 1.0,
                  y: 18 * depthMult,
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

            if (mid) {
              gsap.fromTo(
                mid,
                { y: 26 * depthMult, scale: 0.98 },
                {
                  y: -24 * depthMult,
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

            if (fg) {
              gsap.fromTo(
                fg,
                { y: 38 * depthMult },
                {
                  y: -32 * depthMult,
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

            if (cutout) {
              gsap.fromTo(
                cutout,
                { scale: 0.92, y: 34 * depthMult },
                {
                  scale: 1.04,
                  y: -22 * depthMult,
                  ease: "none",
                  scrollTrigger: {
                    trigger: scene,
                    start: "top 92%",
                    end: "center 35%",
                    scrub: 0.55,
                  },
                }
              );
            }
          });

          // Scene 03 — Philosophy Book Emergence
          gsap.fromTo(
            ".philosophy-emergent",
            { y: 54 * depthMult, scale: 0.9, clipPath: "inset(14% 4% 0% 4% round 12px)" },
            {
              y: -16 * depthMult,
              scale: 1.0,
              clipPath: "inset(0% 0% 0% 0% round 12px)",
              ease: "none",
              scrollTrigger: {
                trigger: ".philosophy-scene",
                start: "top 85%",
                end: "center 40%",
                scrub: 0.55,
              },
            }
          );

          // Scene 04 — Vision Camera Perspective Progression
          gsap.fromTo(
            ".vision-hall-bg",
            { scale: 1.0 },
            {
              scale: isDesktop ? 1.12 : 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: ".vision-scene",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
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
          SCENE 01 — IMMERSIVE 2.5D ARCHITECTURAL HERO
         ================================================================= */}
      <section
        aria-label="About VLEARNIN Hero"
        className="about-hero-scene relative min-h-[86vh] lg:min-h-[88vh] flex items-center overflow-hidden border-b border-[#E1E6EC] bg-[#FAF9F6]"
      >
        {/* Background Layer */}
        <div className="about-hero-bg absolute inset-0 pointer-events-none select-none">
          <Image
            src="/images/about/hero/hero-background.webp"
            alt="Warm ivory architectural studio backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Typography */}
          <div className="about-hero-copy lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#C49A59]" />
              <span className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#2463A6]">
                From Knowledge to Capability
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#10264A]">
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
                className="btn-outline-navy px-6 py-3.5 text-sm"
              >
                Visit Rajajinagar Centre
              </Link>
            </div>
          </div>

          {/* Right 3D CGI Architectural Cutaway Layer */}
          <div className="about-hero-arch lg:col-span-6 relative h-[340px] sm:h-[440px] lg:h-[560px]">
            <Image
              src="/images/about/hero/hero-architecture.png"
              alt="3D architectural cutaway of a contemporary VLEARNIN learning studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center drop-shadow-[0_28px_42px_rgba(16,38,74,0.16)]"
            />
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 02 — WHO WE ARE (2.5D Classroom Depth)
         ================================================================= */}
      <section className="cinema-scene relative py-20 lg:py-28 bg-white border-b border-[#E1E6EC] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] shadow-sm">
            <div className="layer-bg absolute -inset-6">
              <Image
                src="/images/about/who-we-are/who-we-are-background.webp"
                alt="Modern glass-partitioned Bengaluru learning studio"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="layer-mid absolute right-5 bottom-5 w-[64%] sm:w-[58%] aspect-[16/10] rounded-[12px] overflow-hidden border-2 border-white shadow-[0_24px_48px_rgba(16,38,74,0.22)]">
              <Image
                src="/images/about-campus.jpg"
                alt="Mentorship session at VLEARNIN Academy"
                fill
                sizes="(max-width: 1024px) 60vw, 34vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">02 — Institutional Identity</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.12] text-[#10264A]">
              Who We Are
            </h2>
            <p className="text-base sm:text-lg text-[#526477] leading-[1.75]">
              Based in Rajajinagar, Bengaluru, VLEARNIN delivers 30-hour hands-on certifications
              across five structured modules—ending with an evaluated capstone project.
            </p>
            <div className="pt-2 flex flex-wrap gap-6 border-t border-[#E1E6EC]">
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
          SCENE 03 — OUR EDUCATIONAL PHILOSOPHY (Open Book Emergence)
         ================================================================= */}
      <section className="cinema-scene philosophy-scene relative py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E1E6EC] overflow-hidden">
        <div className="layer-bg absolute inset-0 opacity-50 pointer-events-none">
          <Image
            src="/images/about/philosophy/philosophy-background.webp"
            alt="Warm ivory plinth backdrop"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">03 — Transformation</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.12] text-[#10264A]">
              Our Educational Philosophy
            </h2>
            <p className="text-base sm:text-lg text-[#526477] leading-[1.75]">
              Hands-on learning on live datasets, financial models, ad managers, and production
              tools.
            </p>
            <p className="text-sm text-[#526477] leading-relaxed border-l-2 border-[#C49A59] pl-4">
              Every module moves learners directly from foundational concepts into applied software,
              real spreadsheets, live analytics dashboards, and creative production workflows.
            </p>
          </div>

          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
            {/* Emergent practical work layer rising from the book */}
            <div className="philosophy-emergent absolute top-2 right-4 sm:right-10 w-[68%] aspect-[16/10] rounded-[12px] overflow-hidden border border-[#E1E6EC] shadow-[0_24px_50px_rgba(16,38,74,0.18)] z-10 bg-white">
              <Image
                src="/images/domain-analytics.jpg"
                alt="Applied analytics and live datasets emerging from study"
                fill
                sizes="(max-width: 1024px) 70vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* 3D CGI Open Book Base Cutout */}
            <div className="layer-cutout relative w-[86%] sm:w-[78%] aspect-[4/3] z-20 mt-16">
              <Image
                src="/images/about/philosophy/philosophy-book.png"
                alt="3D CGI open hardcover academic book representing practical transformation"
                fill
                sizes="(max-width: 1024px) 86vw, 48vw"
                className="object-contain drop-shadow-[0_24px_36px_rgba(16,38,74,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 04 — OUR VISION (Architectural Perspective Hall)
         ================================================================= */}
      <section className="cinema-scene vision-scene relative py-24 lg:py-36 bg-[#10264A] text-white border-b border-[#E1E6EC] overflow-hidden">
        <div className="vision-hall-bg absolute inset-0 pointer-events-none">
          <Image
            src="/images/about/vision/vision-background.webp"
            alt="Sunlit ivory and navy architectural hall"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10264A]/90 via-[#10264A]/70 to-[#10264A]/35" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#C49A59]">
                04 — Future Horizon
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.035em] leading-[1.08] text-white">
              Our Vision
            </h2>
            <p className="text-lg sm:text-2xl text-white/90 leading-[1.6] max-w-2xl font-normal">
              Equip students and professionals with practical, job-ready capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 05 — OUR MISSION (Executive Desk & Credential Craft)
         ================================================================= */}
      <section className="cinema-scene relative py-20 lg:py-28 bg-white border-b border-[#E1E6EC] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">05 — Credential Standard</span>
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

          <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] shadow-sm order-1 lg:order-2">
            <div className="layer-bg absolute -inset-6">
              <Image
                src="/images/about/mission/mission-background.webp"
                alt="Warm ivory desk surface with navy and gold architectural wall paneling"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="layer-fg absolute left-6 bottom-6 w-[56%] aspect-[16/10] rounded-[12px] overflow-hidden border-2 border-white shadow-[0_22px_44px_rgba(16,38,74,0.22)]">
              <Image
                src="/images/hero-3.jpg"
                alt="Mentor-led practical certification session"
                fill
                sizes="(max-width: 1024px) 56vw, 28vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SCENE 06 — CORE LEARNING DOMAINS (3 Alternating 2.5D Workspaces)
         ================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#2463A6]">06 — Core Learning Domains</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#10264A]">
              Three Focused Workspaces of Capability
            </h2>
          </div>

          {/* Domain 01: AI & Business Intelligence */}
          <div className="cinema-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-[#F1F6FB]">
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/about/domains/ai/ai-background.webp"
                  alt="AI and Business Intelligence architectural studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="layer-cutout relative w-full h-full p-4 sm:p-6">
                <Image
                  src="/images/about/domains/ai/ai-workspace.png"
                  alt="3D CGI business analytics workstation with Power BI charts and laptop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain drop-shadow-[0_24px_38px_rgba(16,38,74,0.2)]"
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
          <div className="cinema-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/about/domains/finance/finance-background.webp"
                  alt="Executive corporate finance walnut study"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="layer-mid absolute right-6 bottom-6 w-[60%] aspect-[16/10] rounded-[12px] overflow-hidden border-2 border-white shadow-[0_24px_48px_rgba(16,38,74,0.22)]">
                <Image
                  src="/images/course-investment-banking.jpg"
                  alt="Corporate finance modelling and investment banking analysis"
                  fill
                  sizes="(max-width: 1024px) 60vw, 35vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Domain 03: Digital Marketing & Creative Media */}
          <div className="cinema-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC] bg-[#FBF4F1]">
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/domain-creative.jpg"
                  alt="Digital marketing and creative media studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="layer-fg absolute left-6 bottom-6 w-[54%] aspect-[16/10] rounded-[12px] overflow-hidden border-2 border-white shadow-[0_24px_48px_rgba(16,38,74,0.24)]">
                <Image
                  src="/images/course-video-editing.jpg"
                  alt="Commercial video editing and reels production workstation"
                  fill
                  sizes="(max-width: 1024px) 54vw, 32vw"
                  className="object-cover"
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
      <section className="py-20 lg:py-28 bg-white border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
          {/* Scene 07: Practical Learning Methodology */}
          <div className="cinema-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="type-eyebrow text-[#2463A6]">07 — Practical Methodology</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#10264A]">
                Practical Learning Methodology
              </h2>
              <p className="text-base sm:text-lg text-[#526477] leading-relaxed">
                Live demonstrations, hands-on exercises, and an evaluated capstone project.
              </p>
            </div>
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC]">
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/about/practical-learning/practical-background.webp"
                  alt="Warm ivory practical learning studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="layer-mid absolute right-5 bottom-5 w-[60%] aspect-[16/10] rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/course-ai-commerce.jpg"
                  alt="Practical project workstation"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Scene 08: Small-Batch Mentorship */}
          <div className="cinema-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC]">
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/about/mentorship/mentorship-background.webp"
                  alt="Glass-partitioned small-batch classroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="layer-mid absolute left-5 bottom-5 w-[60%] aspect-[16/10] rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Small-batch mentorship and portfolio feedback"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover"
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
          <div className="cinema-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC]">
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/about/career-readiness/career-background.webp"
                  alt="Academic to corporate glass corridor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="layer-fg absolute right-5 bottom-5 w-[58%] aspect-[16/10] rounded-[12px] overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/images/hero-2.jpg"
                  alt="Career readiness and portfolio preparation"
                  fill
                  sizes="(max-width: 1024px) 58vw, 29vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Scene 10: Academic Collaboration */}
          <div className="cinema-scene grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E1E6EC]">
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/academic-partnership.jpg"
                  alt="Academic workshop collaboration with colleges"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
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
      <section className="cinema-scene py-20 lg:py-28 bg-[#F1F6FB]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-white border border-[#E1E6EC] rounded-[16px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[380px] overflow-hidden">
              <div className="layer-bg absolute -inset-6">
                <Image
                  src="/images/about-campus.jpg"
                  alt="VLEARNIN Academy Rajajinagar Centre Bengaluru"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
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
