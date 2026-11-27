"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { runHeroTimeline } from "@/lib/motion/timelines";
import { useSiteContent } from "@/components/SiteContentProvider";
import { EditableImageTrigger, EditableText } from "@/components/EditableText";

export function HeroCarousel() {
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();
  const banner = content.heroBanners[0];
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return runHeroTimeline(heroTextRef.current);
  }, []);

  if (!banner) return null;

  return (
    <section
      aria-label="VLEARNIN Institutional Campaign Showcase"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#DBEAFE]/55 text-[#111827] border-b border-[#E5E7EB]"
    >
      {/* Layered Architectural Shades, Soft Ambient Glow & Dot Matrix Behind Hero Text */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-65"
          style={{
            backgroundImage: "radial-gradient(rgba(29, 78, 216, 0.14) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 65% 75% at 24% 48%, #000 35%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 65% 75% at 24% 48%, #000 35%, transparent 100%)",
          }}
        />
        <div className="absolute -top-28 -left-24 w-[440px] h-[440px] rounded-full bg-[#1D4ED8]/[0.09] blur-3xl" />
        <div className="absolute -bottom-32 left-[22%] w-[380px] h-[380px] rounded-full bg-[#60A5FA]/[0.16] blur-3xl" />
        <div className="hidden lg:block absolute -left-20 top-12 w-[320px] h-[320px] rounded-full border border-[#1D4ED8]/[0.08]" />
        <div className="hidden lg:block absolute -left-8 top-24 w-[220px] h-[220px] rounded-full border border-[#1D4ED8]/[0.06]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:h-[580px] items-stretch">
        {/* Left Static Typography & CTA Column */}
        <div
          ref={heroTextRef}
          className="lg:col-span-6 px-6 sm:px-10 lg:pl-20 lg:pr-10 py-12 lg:py-16 flex flex-col justify-center z-10"
        >
          <div className="relative pl-5 sm:pl-6 space-y-5">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-[#1D4ED8] via-[#3B82F6] to-[#93C5FD]/40"
            />
            <h1 className="hero-headline font-editorial text-[34px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-[#1D4ED8]">
              <EditableText path="heroBanners.0.headlineWhite" value={banner.headlineWhite} />{" "}
              <EditableText path="heroBanners.0.headlineAccent" value={banner.headlineAccent} />
            </h1>

            <EditableText
              as="p"
              path="heroBanners.0.description"
              value={banner.description}
              className="hero-desc type-body-large max-w-xl text-[#4B5563]"
            />

            {banner.features && (
              <ul className="space-y-1.5 pt-1">
                {banner.features.map((f, fIdx) => (
                  <li
                    key={fIdx}
                    className="text-sm font-nav font-semibold flex items-center gap-2 text-[#1D4ED8]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <EditableText path={`heroBanners.0.features.${fIdx}`} value={f} />
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-ctas flex flex-wrap items-center gap-3.5 pt-4">
              <Link
                href={banner.primaryCta.href}
                className="btn-primary-amber mc-icon-btn px-6 py-3.5 text-sm uppercase tracking-wider inline-flex items-center gap-2"
              >
                <EditableText path="heroBanners.0.primaryCta.label" value={banner.primaryCta.label} />
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "hero-banner" })}
                className="px-6 py-3.5 text-sm font-nav font-semibold uppercase tracking-wider border border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-colors cursor-pointer rounded-[15px]"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        </div>

        {/* Right Static Diagonal-Cut Photographic Panel */}
        <div className="lg:col-span-6 relative h-[300px] sm:h-[360px] lg:h-full overflow-hidden">
          <div className="absolute inset-0 jain-slant-photo-lg">
            {banner.video ||
            banner.image.startsWith("data:video/") ||
            /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(banner.image) ? (
              <video
                src={banner.video || banner.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <Image
                src={banner.image}
                alt={banner.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            )}
          </div>
          <EditableImageTrigger
            path="heroBanners.0.image"
            currentSrc={banner.image}
            altPath="heroBanners.0.imageAlt"
            currentAlt={banner.imageAlt}
          />
        </div>
      </div>
    </section>
  );
}
