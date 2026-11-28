"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedStatistic } from "@/components/motion/AnimatedStatistic";
import { PhotographicReveal } from "@/components/motion/PhotographicReveal";
import { gsap, ScrollTrigger, isEditorialMotionDisabled } from "@/lib/motion/motion-provider";
import { EDITORIAL_EASE } from "@/lib/motion/motion-easing";
import { MOTION_TOKENS } from "@/lib/motion/motion-tokens";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableImageTrigger,
  EditableText,
} from "@/components/EditableText";

const PHILOSOPHY_IMAGES = [
  "/images/about-campus.jpg",
  "/images/domain-analytics.jpg",
  "/images/hero-2.jpg",
] as const;

export function BrandIntroSection() {
  const { content } = useSiteContent();
  const bi = content.brandIntro;
  const welcomeRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (isEditorialMotionDisabled()) return;

    // ── Welcome to VLEARNIN: Coordinated Editorial Sequence ──
    const welcomeCtx = gsap.context(() => {
      if (!welcomeRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: welcomeRef.current,
          start: MOTION_TOKENS.triggerStart,
          once: true,
        },
      });

      tl.fromTo(
        ".welcome-photo-mask",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.75,
          ease: EDITORIAL_EASE.editorial,
          clearProps: "clipPath",
        },
        0,
      )
        .fromTo(
          ".welcome-photo-mask img",
          { scale: 1.04 },
          { scale: 1, duration: 0.85, ease: EDITORIAL_EASE.out, clearProps: "transform" },
          0,
        )
        .fromTo(
          ".welcome-accent-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: EDITORIAL_EASE.editorial, clearProps: "transform" },
          0.12,
        )
        .fromTo(
          ".welcome-heading",
          { y: 18, opacity: 0.88 },
          { y: 0, opacity: 1, duration: 0.65, ease: EDITORIAL_EASE.editorial, clearProps: "transform,opacity" },
          0.15,
        )
        .fromTo(
          ".welcome-desc",
          { y: 12, opacity: 0.88 },
          { y: 0, opacity: 1, duration: 0.4, ease: EDITORIAL_EASE.out, clearProps: "transform,opacity" },
          0.28,
        );
    }, welcomeRef);

    // ── LEARN, BUILD & LEAD: Continuous Editorial Philosophy with Connecting Line ──
    const philCtx = gsap.context(() => {
      if (!philosophyRef.current) return;

      gsap.fromTo(
        ".philosophy-progress-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: EDITORIAL_EASE.linear,
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 78%",
            end: "bottom 65%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              setActiveStage(p < 0.34 ? 0 : p < 0.68 ? 1 : 2);
            },
          },
        },
      );

      gsap.fromTo(
        ".philosophy-stage-card",
        { y: 16, opacity: 0.9 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: MOTION_TOKENS.stagger.standard,
          ease: EDITORIAL_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: MOTION_TOKENS.triggerStart,
            once: true,
          },
        },
      );
    }, philosophyRef);

    // ── Institutional Statistics Accent Rules ──
    const statsCtx = gsap.context(() => {
      if (!highlightsRef.current) return;
      gsap.fromTo(
        ".stat-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: EDITORIAL_EASE.editorial,
          clearProps: "transform",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: MOTION_TOKENS.triggerStart,
            once: true,
          },
        },
      );
    }, highlightsRef);

    return () => {
      welcomeCtx.revert();
      philCtx.revert();
      statsCtx.revert();
    };
  }, []);

  const pillars = bi.pillars.slice(0, 3);

  return (
    <>
      {/* 11 — WELCOME TO VLEARNIN (Warm Ivory #FAF9F6) */}
      <section className="py-16 lg:py-20 bg-[#FAF9F6] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div
            ref={welcomeRef}
            className="border border-[#E1E6EC] bg-white shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-[12px]"
          >
            <div className="welcome-photo-mask lg:col-span-5 relative min-h-[300px] lg:min-h-[440px] overflow-hidden">
              <Image
                src={bi.image}
                alt={bi.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover mc-image-zoom"
              />
              <EditableImageTrigger
                path="brandIntro.image"
                currentSrc={bi.image}
                altPath="brandIntro.imageAlt"
                currentAlt={bi.imageAlt}
              />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="welcome-accent-line origin-left h-[2px] w-7 bg-[#C49A59]" />
                  <span className="type-eyebrow text-[#526477]">Institutional Overview</span>
                </div>
                <EditableText
                  as="h2"
                  path="brandIntro.heading"
                  value={bi.heading}
                  className="welcome-heading type-section-heading text-[#10264A]"
                />
                <EditableText
                  as="p"
                  path="brandIntro.subTagline"
                  value={bi.subTagline}
                  className="welcome-heading font-heading font-semibold text-lg sm:text-xl text-[#2463A6] mt-2"
                />
              </div>

              <EditableText
                as="p"
                path="brandIntro.description"
                value={bi.description}
                className="welcome-desc mc-lead text-[#526477]"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E1E6EC]">
                {bi.pillars.map((p, idx) => (
                  <div key={idx} className="pt-3 space-y-1.5 relative">
                    <EditableDeleteButton
                      path="brandIntro.pillars"
                      index={idx}
                      label="×"
                      className="absolute top-2 right-0 px-1.5 py-0.5 text-[10px]"
                    />
                    <div className="flex items-center gap-2">
                      <EditableText
                        path={`brandIntro.pillars.${idx}.step`}
                        value={p.step}
                        className="font-heading font-extrabold text-xl text-[#2463A6]"
                      />
                      <EditableText
                        path={`brandIntro.pillars.${idx}.title`}
                        value={p.title}
                        className="font-heading text-sm font-bold tracking-wider text-[#10264A]"
                      />
                    </div>
                    <EditableText
                      as="p"
                      path={`brandIntro.pillars.${idx}.desc`}
                      value={p.desc}
                      className="text-sm text-[#526477] leading-snug"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="/about"
                  className="btn-navy mc-icon-btn px-5 py-2.5 text-sm inline-flex items-center gap-2"
                >
                  <EditableText path="brandIntro.ctaLabel" value={bi.ctaLabel} />
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/courses"
                  className="mc-underline-link font-nav text-sm font-semibold text-[#2463A6] hover:text-[#10264A]"
                >
                  <EditableText path="brandIntro.secondaryLinkLabel" value={bi.secondaryLinkLabel} />
                </Link>
                <EditableAddButton
                  path="brandIntro.pillars"
                  label="Add Pillar"
                  createItem={() => ({
                    step: `0${bi.pillars.length + 1}`,
                    title: "NEW PILLAR",
                    desc: "Describe this learning pillar.",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARN, BUILD & LEAD — Continuous Editorial Philosophy (All 3 Stages Visible) */}
      <section
        ref={philosophyRef}
        aria-label="Learn Build Lead Brand Philosophy"
        className="py-16 lg:py-20 bg-[#FAF9F6] border-b border-[#E1E6EC]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-[2px] w-7 bg-[#C49A59]" />
                <span className="type-eyebrow text-[#526477]">Educational Philosophy</span>
              </div>
              <h2 className="type-section-heading text-[#10264A]">
                Learn. Build. Lead.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#526477] max-w-md">
              A continuous progression from foundational concepts to evaluated capstone execution and career leadership.
            </p>
          </div>

          {/* Progressive Connecting Line */}
          <div className="hidden lg:block h-[2px] w-full bg-[#E1E6EC] overflow-hidden">
            <div className="philosophy-progress-line h-full w-full bg-[#2463A6] origin-left" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((p, idx) => {
              const isHighlighted = idx <= activeStage;
              return (
                <article
                  key={idx}
                  className={`philosophy-stage-card group bg-white border rounded-[12px] overflow-hidden transition-colors duration-300 ${
                    isHighlighted ? "border-[#2463A6]" : "border-[#E1E6EC]"
                  }`}
                >
                  <PhotographicReveal
                    direction="bottom"
                    delay={idx * 0.08}
                    className="relative aspect-[16/10] w-full"
                  >
                    <Image
                      src={PHILOSOPHY_IMAGES[idx % PHILOSOPHY_IMAGES.length]}
                      alt={`${p.title} at VLEARNIN`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover mc-image-zoom"
                    />
                  </PhotographicReveal>
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-[#2463A6]">
                        Stage {p.step}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                          isHighlighted ? "bg-[#2463A6]" : "bg-[#E1E6EC]"
                        }`}
                      />
                    </div>
                    <h3 className="font-heading text-2xl font-extrabold text-[#10264A]">
                      {p.title}.
                    </h3>
                    <p className="text-sm sm:text-base text-[#526477] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12 — FACTUAL INSTITUTIONAL HIGHLIGHTS (Masked Numerical Roll, 650ms, 80ms Stagger) */}
      <section aria-label="Factual Programme Highlights" className="bg-white border-b border-[#E1E6EC] py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div ref={highlightsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#E1E6EC]">
            {bi.highlights.map((h, idx) => (
              <div key={idx} className="highlight-stat pt-4 sm:pt-0 lg:pl-8 first:pl-0 text-center lg:text-left relative">
                <EditableDeleteButton
                  path="brandIntro.highlights"
                  index={idx}
                  label="×"
                  className="absolute top-0 right-0 px-1.5 py-0.5 text-[10px]"
                />
                <AnimatedStatistic
                  value={h.value}
                  padZero={h.padZero}
                  className="mc-counter text-[#10264A]"
                />
                <div className="stat-rule origin-left h-[2px] w-10 bg-[#C49A59] my-3 mx-auto lg:mx-0" />
                <div>
                  <EditableText
                    as="p"
                    path={`brandIntro.highlights.${idx}.label`}
                    value={h.label}
                    className="font-heading text-sm sm:text-base font-bold text-[#10264A]"
                  />
                  <EditableText
                    as="p"
                    path={`brandIntro.highlights.${idx}.sub`}
                    value={h.sub}
                    className="text-xs sm:text-sm text-[#526477] mt-0.5"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <EditableAddButton
              path="brandIntro.highlights"
              label="Add Counter"
              createItem={() => ({
                value: 10,
                padZero: false,
                label: "New Metric",
                sub: "Metric subtitle",
              })}
            />
          </div>
        </div>
      </section>
    </>
  );
}
