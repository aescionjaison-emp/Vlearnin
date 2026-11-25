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

const PILLARS = [
  {
    step: "01",
    title: "LEARN",
    desc: "Master relevant industry tools and essential concepts.",
  },
  {
    step: "02",
    title: "BUILD",
    desc: "Apply knowledge through practical projects and real business scenarios.",
  },
  {
    step: "03",
    title: "LEAD",
    desc: "Develop professional confidence and career readiness.",
  },
];

const HIGHLIGHTS = [
  { value: 7, padZero: true, label: "Certification Programmes", sub: "30-Hour Practical Tracks" },
  { value: 3, padZero: true, label: "Core Learning Domains", sub: "AI/BI, Finance & Digital Media" },
  { value: 30, padZero: false, label: "Hours Per Standalone Programme", sub: "5 Modules × 6 Hours" },
  { value: 4, padZero: true, label: "Career Accelerator Combos", sub: "45 to 90 Hours Dual-Skill" },
];

export function BrandIntroSection() {
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
                src="/images/about-campus.jpg"
                alt="Practical instructor-led mentorship at VLEARNIN Academy"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover mc-image-zoom scale-105"
              />
            </div>

            {/* Editorial Narrative & Connected LEARN-BUILD-LEAD Journey */}
            <div className="split-content lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div>
                <p className="mc-eyebrow text-[#1D4ED8]">
                  WELCOME TO VLEARNIN
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3A8A] mt-2 leading-tight">
                  Learn With Purpose. Build With Confidence. Lead With Skill.
                </h2>
                <p className="font-nav text-sm font-semibold text-[#EA580C] mt-2">
                  The V-Way to Learn, Build &amp; Lead.
                </p>
              </div>

              <p className="mc-lead text-[#4B5563]">
                VLEARNIN bridges the gap between academic knowledge and real-world professional
                capabilities through practical certification programmes, personalized mentorship and
                career-oriented learning.
              </p>

              {/* Connected 3-Step Educational Journey */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5E7EB]">
                {PILLARS.map((p) => (
                  <div key={p.title} className="split-stagger-item pt-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-editorial text-xl font-bold text-[#EA580C]">
                        {p.step}
                      </span>
                      <span className="font-nav text-sm font-bold tracking-wider text-[#1E3A8A]">
                        {p.title}
                      </span>
                    </div>
                    <p className="text-sm text-[#4B5563] leading-snug">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="/about"
                  className="btn-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>Know More About VLEARNIN</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/courses"
                  className="font-nav text-sm font-semibold text-[#1D4ED8] hover:text-[#1E3A8A] underline underline-offset-4"
                >
                  Explore Our Learning Methodology
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 — FACTUAL INSTITUTIONAL HIGHLIGHTS (CHRIST-style metrics bar) */}
      <section aria-label="Factual Programme Highlights" className="bg-[#1E3A8A] text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div ref={highlightsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="highlight-stat pt-4 sm:pt-0 lg:pl-8 first:pl-0 text-center lg:text-left">
                <AnimatedCounter
                  value={h.value}
                  padZero={h.padZero}
                  className="mc-counter text-[#93C5FD]"
                />
                <p className="font-nav text-sm sm:text-base font-bold text-white mt-2">
                  {h.label}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-0.5">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
