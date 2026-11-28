"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { useSiteContent } from "@/components/SiteContentProvider";
import { EditableText } from "@/components/EditableText";
import { isMotionDisabled } from "@/lib/motion/presets";

gsap.registerPlugin(ScrollTrigger);

export function HeroCarousel() {
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();
  const banner = content.heroBanners[0];
  const sectionRef = useRef<HTMLElement>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const mediaImgRef = useRef<HTMLPictureElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope || isMotionDisabled()) return;

    const ctx = gsap.context(() => {
      // ── ANIMATION 01A: Coordinated 6-Phase Cinematic Hero Entrance ──
      const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Phase 1 & 2: Panoramic artwork horizontal curtain reveal + subtle scale settle
      introTl
        .fromTo(
          mediaFrameRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.15, clearProps: "clipPath" },
          0,
        )
        .fromTo(
          ".hero-bg-img",
          { scale: 1.05 },
          { scale: 1, duration: 1.25, clearProps: "transform" },
          0,
        )
        // Phase 3: Headline line-by-line overflow-hidden mask reveal
        .fromTo(
          ".hero-line-inner",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.1,
            clearProps: "transform",
          },
          0.22,
        )
        // Phase 4: Supporting description restrained vertical reveal
        .fromTo(
          ".hero-desc",
          { y: 20, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.55, clearProps: "transform,opacity" },
          0.45,
        )
        // Features list stagger (if present)
        .fromTo(
          ".hero-features-item",
          { x: -20, opacity: 0.85 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            clearProps: "transform,opacity",
          },
          0.52,
        )
        // Phase 5: CTA buttons sequential stagger
        .fromTo(
          ".hero-cta-btn",
          { y: 18, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          0.58,
        );

      // ── ANIMATION 01B: Real Scroll-Scrubbed Hero Transformation ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(
          mediaFrameRef.current,
          {
            scale: 0.93,
            clipPath: "inset(3% 3% 3% 3% round 22px)",
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-bg-img",
          {
            scale: 1.06,
            yPercent: 6,
            ease: "none",
          },
          0,
        )
        .to(
          textColRef.current,
          {
            y: -48,
            opacity: 0.18,
            ease: "none",
          },
          0,
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  if (!banner) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="VLEARNIN Institutional Campaign Showcase"
      className="relative w-full overflow-hidden bg-white text-[#111827] border-b border-[#E5E7EB]"
    >
      {/* Full-Width Seamless Panoramic Photographic Artwork Container */}
      <div
        ref={mediaFrameRef}
        className="relative w-full min-h-[680px] sm:min-h-[720px] lg:min-h-[580px] lg:h-[calc(100vh-110px)] lg:max-h-[760px] flex items-start lg:items-center overflow-hidden origin-center"
      >
        {/* Responsive Generated Panoramic Photography (Desktop 16:9 & Mobile 3:4) */}
        <picture
          ref={mediaImgRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        >
          <source
            media="(max-width: 1023px)"
            srcSet="/images/hero/vlearnin-main-mobile.webp"
          />
          <img
            src="/images/hero/vlearnin-main-desktop.webp"
            alt={banner.imageAlt || "VLEARNIN instructor mentoring students in contemporary Bengaluru academy"}
            fetchPriority="high"
            decoding="async"
            className="hero-bg-img w-full h-full object-cover object-bottom lg:object-right-center"
          />
        </picture>

        {/* Editorial HTML Content Layer Positioned Over Naturally Bright Architectural Area */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-64 sm:pb-72 lg:py-16">
          <div ref={textColRef} className="max-w-2xl lg:max-w-[650px] space-y-6">
            <h1 className="hero-headline font-heading text-[36px] sm:text-[48px] lg:text-[62px] xl:text-[66px] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#10264A]">
              <span className="block overflow-hidden">
                <span className="hero-line-inner block">
                  <EditableText path="heroBanners.0.headlineWhite" value={banner.headlineWhite} />
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line-inner block">
                  <EditableText path="heroBanners.0.headlineAccent" value={banner.headlineAccent} />
                </span>
              </span>
            </h1>

            <EditableText
              as="p"
              path="heroBanners.0.description"
              value={banner.description}
              className="hero-desc text-base sm:text-lg lg:text-[19px] leading-[1.65] max-w-xl text-[#526477] font-normal"
            />

            {banner.features && (
              <ul className="space-y-2 pt-1">
                {banner.features.map((f, fIdx) => (
                  <li
                    key={fIdx}
                    className="hero-features-item text-sm sm:text-base font-nav font-semibold flex items-center gap-2 text-[#10264A]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2463A6]" />
                    <EditableText path={`heroBanners.0.features.${fIdx}`} value={f} />
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-ctas flex flex-wrap items-center gap-4 pt-3">
              <Link
                href={banner.primaryCta.href}
                className="hero-cta-btn btn-primary-amber mc-icon-btn px-6 py-3.5 text-[15px] inline-flex items-center gap-2 shadow-xs"
              >
                <EditableText path="heroBanners.0.primaryCta.label" value={banner.primaryCta.label} />
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "hero-banner" })}
                className="hero-cta-btn px-6 py-3.5 text-[15px] font-nav font-semibold bg-white/95 border border-[#E1E6EC] text-[#10264A] hover:border-[#10264A] hover:bg-[#FAF9F6] transition-colors cursor-pointer rounded-[6px]"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
