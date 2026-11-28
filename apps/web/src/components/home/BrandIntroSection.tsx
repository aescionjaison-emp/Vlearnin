"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import { ExpandingPhotograph } from "@/components/motion/ExpandingPhotograph";
import { PhotographicDepth } from "@/components/motion/PhotographicDepth";
import { ProgressiveTypography } from "@/components/motion/ProgressiveTypography";
import { SvgPathway } from "@/components/motion/SvgPathway";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";
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
  const welcomeRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (isReducedMotionOrDisabled()) return;

    const welcomeCtx = gsap.context(() => {
      if (!welcomeRef.current) return;
      gsap.fromTo(
        ".welcome-accent-v4",
        { scaleX: 0.25 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: welcomeRef.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 0.5,
          },
        },
      );
    }, welcomeRef);

    const statsCtx = gsap.context(() => {
      if (!statsRef.current) return;
      gsap.fromTo(
        ".stat-rule-v4",
        { scaleX: 0.2 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            end: "center 55%",
            scrub: 0.4,
          },
        },
      );
    }, statsRef);

    return () => {
      welcomeCtx.revert();
      statsCtx.revert();
    };
  }, []);

  const pillars = bi.pillars.slice(0, 3);

  return (
    <>
      {/* 10 — WELCOME TO VLEARNIN: Scroll-Driven Photographic Expansion */}
      <section ref={welcomeRef} className="py-16 lg:py-20 bg-[#FAF9F6] border-b border-[#E1E6EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="border border-[#E1E6EC] bg-white shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-[12px]">
            <ExpandingPhotograph
              insetPercent={10}
              scaleFrom={1.1}
              className="lg:col-span-5 relative min-h-[300px] lg:min-h-[440px]"
            >
              <Image
                src={bi.image}
                alt={bi.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <EditableImageTrigger
                path="brandIntro.image"
                currentSrc={bi.image}
                altPath="brandIntro.imageAlt"
                currentAlt={bi.imageAlt}
              />
            </ExpandingPhotograph>

            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="welcome-accent-v4 origin-left h-[2px] w-10 bg-[#C49A59]" />
                  <span className="type-eyebrow text-[#526477]">Institutional Overview</span>
                </div>
                <EditableText
                  as="h2"
                  path="brandIntro.heading"
                  value={bi.heading}
                  className="type-section-heading text-[#10264A]"
                />
                <EditableText
                  as="p"
                  path="brandIntro.subTagline"
                  value={bi.subTagline}
                  className="font-heading font-semibold text-lg sm:text-xl text-[#2463A6] mt-2"
                />
              </div>

              <EditableText
                as="p"
                path="brandIntro.description"
                value={bi.description}
                className="mc-lead text-[#526477]"
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

      {/* 11 & 12 — LEARN, BUILD & LEAD: Signature Typography Illumination + SVG Pathway */}
      <section
        ref={philosophyRef}
        aria-label="Learn Build Lead Brand Philosophy"
        className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E1E6EC]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="max-w-4xl space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-[#C49A59]" />
              <span className="type-eyebrow text-[#526477]">Educational Philosophy</span>
            </div>
            <ProgressiveTypography
              segments={[
                { text: "Learn with", accent: false },
                { text: "purpose.", accent: true },
                { text: "Build with", accent: false },
                { text: "confidence.", accent: true },
                { text: "Lead with", accent: false },
                { text: "skill.", accent: true },
              ]}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] leading-[1.12]"
            />
          </div>

          {/* Scroll-Controlled SVG Educational Pathway */}
          <div className="hidden lg:block">
            <SvgPathway
              orientation="horizontal"
              triggerRef={philosophyRef}
              onProgress={(p) => setActiveStage(p < 0.34 ? 0 : p < 0.68 ? 1 : 2)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((p, idx) => {
              const isHighlighted = idx <= activeStage;
              return (
                <article
                  key={idx}
                  className={`group bg-white border rounded-[12px] overflow-hidden transition-colors duration-250 ${
                    isHighlighted ? "border-[#2463A6]" : "border-[#E1E6EC]"
                  }`}
                >
                  <PhotographicDepth
                    travelPx={14 + idx * 4}
                    scaleFrom={1.08}
                    className="relative aspect-[16/10] w-full"
                  >
                    <Image
                      src={PHILOSOPHY_IMAGES[idx % PHILOSOPHY_IMAGES.length]}
                      alt={`${p.title} at VLEARNIN`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </PhotographicDepth>
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-[#2463A6]">
                        Stage {p.step}
                      </span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-250 ${
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

      {/* 13 — INSTITUTIONAL STATISTICS (Clipped Number Roll + Scrubbed Separators) */}
      <section aria-label="Factual Programme Highlights" className="bg-white border-b border-[#E1E6EC] py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#E1E6EC]">
            {bi.highlights.map((h, idx) => (
              <div key={idx} className="pt-4 sm:pt-0 lg:pl-8 first:pl-0 text-center lg:text-left relative">
                <EditableDeleteButton
                  path="brandIntro.highlights"
                  index={idx}
                  label="×"
                  className="absolute top-0 right-0 px-1.5 py-0.5 text-[10px]"
                />
                <AnimatedCounter
                  value={h.value}
                  padZero={h.padZero}
                  className="mc-counter text-[#10264A]"
                />
                <div className="stat-rule-v4 origin-left h-[2px] w-12 bg-[#C49A59] my-3 mx-auto lg:mx-0" />
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
