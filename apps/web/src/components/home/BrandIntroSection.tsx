"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import {
  runParallaxScrub,
  runSplitEditorialTimeline,
} from "@/lib/motion/timelines";
import { isMotionDisabled } from "@/lib/motion/presets";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableImageTrigger,
  EditableText,
} from "@/components/EditableText";

gsap.registerPlugin(ScrollTrigger);

const KINETIC_PHASE_IMAGES = [
  "/images/about-campus.jpg",
  "/images/domain-analytics.jpg",
  "/images/hero-2.jpg",
] as const;

export function BrandIntroSection() {
  const { content } = useSiteContent();
  const bi = content.brandIntro;
  const splitRef = useRef<HTMLDivElement>(null);
  const splitImgRef = useRef<HTMLImageElement>(null);
  const kineticRef = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const cleanSplit = runSplitEditorialTimeline(splitRef.current, "left");
    const cleanParallax = runParallaxScrub(splitImgRef.current, splitRef.current, 10);

    if (isMotionDisabled()) {
      return () => {
        cleanSplit();
        cleanParallax();
      };
    }

    const mm = gsap.matchMedia();
    const kineticScope = kineticRef.current;

    if (kineticScope) {
      mm.add("(min-width: 1024px)", () => {
        const phases = gsap.utils.toArray<HTMLElement>(".kinetic-word-block", kineticScope);
        const photos = gsap.utils.toArray<HTMLElement>(".kinetic-photo-frame", kineticScope);
        const descs = gsap.utils.toArray<HTMLElement>(".kinetic-desc-block", kineticScope);

        if (phases.length < 3 || photos.length < 3) return;

        gsap.set(phases.slice(1), { yPercent: 105, opacity: 0 });
        gsap.set(descs.slice(1), { y: 24, opacity: 0 });
        gsap.set(photos.slice(1), { clipPath: "inset(100% 0 0 0)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: kineticScope,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setActivePhase(p < 0.34 ? 0 : p < 0.68 ? 1 : 2);
            },
          },
        });

        tl.to(phases[0], { yPercent: -105, opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0.28)
          .to(descs[0], { y: -16, opacity: 0, duration: 0.25 }, 0.28)
          .fromTo(phases[1], { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.32, ease: "power3.out" }, 0.34)
          .fromTo(descs[1], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28 }, 0.36)
          .to(photos[1], { clipPath: "inset(0% 0 0 0)", duration: 0.35, ease: "power2.inOut" }, 0.32)

          .to(phases[1], { yPercent: -105, opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0.66)
          .to(descs[1], { y: -16, opacity: 0, duration: 0.25 }, 0.66)
          .fromTo(phases[2], { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.32, ease: "power3.out" }, 0.72)
          .fromTo(descs[2], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28 }, 0.74)
          .to(photos[2], { clipPath: "inset(0% 0 0 0)", duration: 0.35, ease: "power2.inOut" }, 0.7);
      });

      mm.add("(max-width: 1023px)", () => {
        const mobileCards = gsap.utils.toArray<HTMLElement>(".kinetic-mobile-card", kineticScope);
        mobileCards.forEach((card) => {
          gsap.fromTo(
            card,
            { clipPath: "inset(0 0 25% 0)", y: 28, opacity: 0.85 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "expo.out",
              clearProps: "clipPath,transform,opacity",
              scrollTrigger: {
                trigger: card,
                start: "top 86%",
                once: true,
              },
            },
          );
        });
      });
    }

    const statsCtx = gsap.context(() => {
      if (!highlightsRef.current) return;
      gsap.fromTo(
        ".stat-label-mask",
        { clipPath: "inset(0 0 100% 0)", y: 14 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "expo.out",
          clearProps: "clipPath,transform",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".stat-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "expo.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, highlightsRef);

    return () => {
      cleanSplit();
      cleanParallax();
      mm.revert();
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
            ref={splitRef}
            className="border border-[#E1E6EC] bg-white shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-[12px]"
          >
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

            <div className="split-content lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="h-[2px] w-7 bg-[#C49A59]" />
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
                  className="btn-navy px-5 py-2.5 text-sm inline-flex items-center gap-2"
                >
                  <EditableText path="brandIntro.ctaLabel" value={bi.ctaLabel} />
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/courses"
                  className="font-nav text-sm font-semibold text-[#2463A6] hover:text-[#10264A] underline underline-offset-4"
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

      {/* ANIMATION 03 — LEARN. BUILD. LEAD. KINETIC STORYTELLING */}
      <section
        ref={kineticRef}
        aria-label="Learn Build Lead Kinetic Journey"
        className="bg-[#FAF9F6] border-b border-[#E1E6EC] overflow-hidden"
      >
        <div className="hidden lg:flex max-w-[1440px] mx-auto px-16 min-h-screen items-center">
          <div className="w-full grid grid-cols-12 gap-12 items-center">
            <div className="col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                {pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-[6px] font-nav text-xs font-semibold tracking-wide transition-colors duration-300 ${
                      activePhase === idx
                        ? "bg-[#10264A] text-white"
                        : "bg-white text-[#526477] border border-[#E1E6EC]"
                    }`}
                  >
                    {p.step} — {p.title}
                  </div>
                ))}
              </div>

              <div className="relative h-28 overflow-hidden">
                {pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="kinetic-word-block absolute inset-0 flex items-center"
                  >
                    <span className="font-heading text-7xl font-extrabold tracking-[-0.045em] text-[#10264A]">
                      {p.title}.
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative h-24 overflow-hidden">
                {pillars.map((p, idx) => (
                  <p
                    key={idx}
                    className="kinetic-desc-block absolute inset-0 text-xl text-[#526477] leading-relaxed max-w-lg"
                  >
                    {p.desc}
                  </p>
                ))}
              </div>
            </div>

            <div className="col-span-6">
              <div className="relative aspect-[16/11] w-full rounded-[12px] overflow-hidden border border-[#E1E6EC] shadow-sm bg-white">
                {pillars.map((p, idx) => (
                  <div key={idx} className="kinetic-photo-frame absolute inset-0">
                    <Image
                      src={KINETIC_PHASE_IMAGES[idx % KINETIC_PHASE_IMAGES.length]}
                      alt={`${p.title} at VLEARNIN`}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden max-w-[1440px] mx-auto px-4 sm:px-8 py-12 space-y-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="kinetic-mobile-card bg-white border border-[#E1E6EC] rounded-[12px] overflow-hidden shadow-xs"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={KINETIC_PHASE_IMAGES[idx % KINETIC_PHASE_IMAGES.length]}
                  alt={`${p.title} at VLEARNIN`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <p className="font-heading text-2xl font-extrabold text-[#10264A]">
                  {p.step} · {p.title}.
                </p>
                <p className="text-sm text-[#526477] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12 — FACTUAL INSTITUTIONAL HIGHLIGHTS (Clean Light Stats Bar) */}
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
                <AnimatedCounter
                  value={h.value}
                  padZero={h.padZero}
                  className="mc-counter text-[#10264A]"
                />
                <div className="stat-rule origin-left h-[2px] w-10 bg-[#C49A59] my-3 mx-auto lg:mx-0" />
                <div className="stat-label-mask">
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
