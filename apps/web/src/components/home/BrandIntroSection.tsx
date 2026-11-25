"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { AnimatedImage } from "@/components/animation/AnimatedImage";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import { Reveal } from "@/components/animation/Reveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

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
  const pillarsRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(pillarsRef, ".pillar-item", "fadeUp", 0.08);

  return (
    <>
      {/* 11 — WELCOME TO VLEARNIN (JAIN-style framed editorial introduction) */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="border border-[#E2E8F0] bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Large Campus Photograph */}
            <AnimatedImage className="lg:col-span-5 relative min-h-[300px] lg:min-h-[440px]">
              <Image
                src="/images/about-campus.jpg"
                alt="Practical instructor-led mentorship at VLEARNIN Academy"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover mc-image-zoom"
              />
            </AnimatedImage>

            {/* Editorial Narrative & Connected LEARN-BUILD-LEAD Journey */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div>
                <p className="mc-eyebrow text-[#16529A]">
                  WELCOME TO VLEARNIN
                </p>
                <AnimatedHeading as="h2" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082F62] mt-2 leading-tight">
                  Learn With Purpose. Build With Confidence. Lead With Skill.
                </AnimatedHeading>
                <p className="font-nav text-sm font-semibold text-[#F58220] mt-2">
                  The V-Way to Learn, Build &amp; Lead.
                </p>
              </div>

              <Reveal preset="fadeUp">
                <p className="mc-lead text-[#5C6672]">
                  VLEARNIN bridges the gap between academic knowledge and real-world professional
                  capabilities through practical certification programmes, personalized mentorship and
                  career-oriented learning.
                </p>
              </Reveal>

              {/* Connected 3-Step Educational Journey */}
              <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E2E8F0]">
                {PILLARS.map((p) => (
                  <div key={p.title} className="pillar-item pt-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-editorial text-xl font-bold text-[#F58220]">
                        {p.step}
                      </span>
                      <span className="font-nav text-sm font-bold tracking-wider text-[#082F62]">
                        {p.title}
                      </span>
                    </div>
                    <p className="text-sm text-[#5C6672] leading-snug">{p.desc}</p>
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
                  className="font-nav text-sm font-semibold text-[#16529A] hover:text-[#082F62] underline underline-offset-4"
                >
                  Explore Our Learning Methodology
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 — FACTUAL INSTITUTIONAL HIGHLIGHTS (CHRIST-style metrics bar) */}
      <section aria-label="Factual Programme Highlights" className="bg-[#082F62] text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="pt-4 sm:pt-0 lg:pl-8 first:pl-0 text-center lg:text-left">
                <AnimatedCounter
                  value={h.value}
                  padZero={h.padZero}
                  className="mc-counter text-[#F4C430]"
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
