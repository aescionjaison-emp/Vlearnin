"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { useSiteContent } from "@/components/SiteContentProvider";
import { EditableText } from "@/components/EditableText";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

/**
 * V4 Hero — Immersive Photographic Depth.
 * Immediately visible at load; internal photograph scales and moves smoothly (1.07->1.0, -10px->+22px)
 * while the subtle headline accent line extends with scroll.
 */
export function HeroCarousel() {
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();
  const banner = content.heroBanners[0];
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    const image = imageRef.current;
    if (!scope || !image || isReducedMotionOrDisabled()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: -10, scale: 1.07 },
        {
          y: 22,
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );

      if (accentRef.current) {
        gsap.fromTo(
          accentRef.current,
          { scaleX: 0.35 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              start: "top top",
              end: "bottom top",
              scrub: 0.4,
            },
          },
        );
      }
    }, scope);

    return () => ctx.revert();
  }, []);

  if (!banner) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="VLEARNIN Institutional Campaign Showcase"
      className="relative w-full overflow-hidden bg-[#FAF9F6] text-[#10264A] border-b border-[#E1E6EC]"
    >
      <div className="relative w-full min-h-[680px] sm:min-h-[720px] lg:min-h-[580px] lg:h-[calc(100vh-110px)] lg:max-h-[760px] flex items-start lg:items-center overflow-hidden">
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          <source
            media="(max-width: 1023px)"
            srcSet="/images/hero/vlearnin-main-mobile.webp"
          />
          <img
            ref={imageRef}
            src="/images/hero/vlearnin-main-desktop.webp"
            alt={banner.imageAlt || "VLEARNIN instructor mentoring students in contemporary Bengaluru academy"}
            fetchPriority="high"
            decoding="async"
            className="hero-bg-img w-full h-full object-cover object-bottom lg:object-right-center"
          />
        </picture>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-64 sm:pb-72 lg:py-16">
          <div className="max-w-2xl lg:max-w-[650px] space-y-6">
            <div className="space-y-4">
              <h1 className="hero-headline font-heading text-[36px] sm:text-[48px] lg:text-[62px] xl:text-[66px] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#10264A]">
                <EditableText path="heroBanners.0.headlineWhite" value={banner.headlineWhite} />{" "}
                <EditableText path="heroBanners.0.headlineAccent" value={banner.headlineAccent} />
              </h1>
              <span
                ref={accentRef}
                aria-hidden="true"
                className="block origin-left h-[3px] w-24 bg-[#C49A59]"
              />
            </div>

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
                    className="text-sm sm:text-base font-nav font-semibold flex items-center gap-2 text-[#10264A]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2463A6]" />
                    <EditableText path={`heroBanners.0.features.${fIdx}`} value={f} />
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-ctas flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={banner.primaryCta.href}
                className="btn-primary-amber mc-icon-btn px-6 py-3.5 text-[15px] inline-flex items-center gap-2 shadow-xs"
              >
                <EditableText path="heroBanners.0.primaryCta.label" value={banner.primaryCta.label} />
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "hero-banner" })}
                className="mc-icon-btn px-6 py-3.5 text-[15px] font-nav font-semibold bg-white/95 border border-[#E1E6EC] text-[#10264A] hover:border-[#10264A] hover:bg-[#FAF9F6] cursor-pointer rounded-[6px]"
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
