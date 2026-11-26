"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import {
  runParallaxScrub,
  runSectionCascadeTimeline,
  runSplitEditorialTimeline,
} from "@/lib/motion/timelines";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableImageTrigger,
  EditableText,
} from "@/components/EditableText";

export function BrandIntroSection() {
  const { content } = useSiteContent();
  const bi = content.brandIntro;
  const splitRef = useRef<HTMLDivElement>(null);
  const splitImgRef = useRef<HTMLImageElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanSplit = runSplitEditorialTimeline(splitRef.current, "left");
    const cleanParallax = runParallaxScrub(splitImgRef.current, splitRef.current, 7);
    const cleanHighlights = runSectionCascadeTimeline(highlightsRef.current, ".highlight-stat");
    return () => {
      cleanSplit();
      cleanParallax();
      cleanHighlights();
    };
  }, []);

  return (
    <>
      {/* 11 — WELCOME TO VLEARNIN (MCU-06 Coordinated Split Curtain Timeline) */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div
            ref={splitRef}
            className="border border-[#E5E7EB] bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-[15px]"
          >
            {/* Large Campus Photograph with Curtain Mask */}
            <div className="split-image lg:col-span-5 relative min-h-[300px] lg:min-h-[440px] overflow-hidden">
              <Image
                ref={splitImgRef}
                src={bi.image}
                alt={bi.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover mc-image-zoom scale-105"
              />
              <EditableImageTrigger
                path="brandIntro.image"
                currentSrc={bi.image}
                altPath="brandIntro.imageAlt"
                currentAlt={bi.imageAlt}
              />
            </div>

            {/* Editorial Narrative & Connected LEARN-BUILD-LEAD Journey */}
            <div className="split-content lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div>
                <EditableText
                  as="p"
                  path="brandIntro.eyebrow"
                  value={bi.eyebrow}
                  className="mc-eyebrow text-[#1D4ED8]"
                />
                <EditableText
                  as="h2"
                  path="brandIntro.heading"
                  value={bi.heading}
                  className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3A8A] mt-2 leading-tight"
                />
                <EditableText
                  as="p"
                  path="brandIntro.subTagline"
                  value={bi.subTagline}
                  className="font-nav text-sm font-semibold text-[#EA580C] mt-2"
                />
              </div>

              <EditableText
                as="p"
                path="brandIntro.description"
                value={bi.description}
                className="mc-lead text-[#4B5563]"
              />

              {/* Connected 3-Step Educational Journey */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5E7EB]">
                {bi.pillars.map((p, idx) => (
                  <div key={idx} className="split-stagger-item pt-3 space-y-1.5 relative">
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
                        className="font-editorial text-xl font-bold text-[#EA580C]"
                      />
                      <EditableText
                        path={`brandIntro.pillars.${idx}.title`}
                        value={p.title}
                        className="font-nav text-sm font-bold tracking-wider text-[#1E3A8A]"
                      />
                    </div>
                    <EditableText
                      as="p"
                      path={`brandIntro.pillars.${idx}.desc`}
                      value={p.desc}
                      className="text-sm text-[#4B5563] leading-snug"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="/about"
                  className="btn-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <EditableText path="brandIntro.ctaLabel" value={bi.ctaLabel} />
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/courses"
                  className="font-nav text-sm font-semibold text-[#1D4ED8] hover:text-[#1E3A8A] underline underline-offset-4"
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

      {/* 12 — FACTUAL INSTITUTIONAL HIGHLIGHTS (CHRIST-style metrics bar) */}
      <section aria-label="Factual Programme Highlights" className="bg-[#1E3A8A] text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div ref={highlightsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
            {bi.highlights.map((h, idx) => (
              <div key={idx} className="highlight-stat pt-4 sm:pt-0 lg:pl-8 first:pl-0 text-center lg:text-left relative">
                <EditableDeleteButton
                  path="brandIntro.highlights"
                  index={idx}
                  label="×"
                  className="absolute top-0 right-0 px-1.5 py-0.5 text-[10px]"
                />
                <AnimatedCounter
                  value={h.value}
                  padZero={h.padZero}
                  className="mc-counter text-[#93C5FD]"
                />
                <EditableText
                  as="p"
                  path={`brandIntro.highlights.${idx}.label`}
                  value={h.label}
                  className="font-nav text-sm sm:text-base font-bold text-white mt-2"
                />
                <EditableText
                  as="p"
                  path={`brandIntro.highlights.${idx}.sub`}
                  value={h.sub}
                  className="text-xs sm:text-sm text-white/70 mt-0.5"
                />
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
