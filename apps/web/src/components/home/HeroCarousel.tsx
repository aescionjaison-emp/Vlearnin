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
      className="relative w-full overflow-hidden bg-[#F8FAFC] text-[#111827] border-b border-[#E5E7EB]"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:h-[580px] items-stretch">
        {/* Left Static Typography & CTA Column */}
        <div
          ref={heroTextRef}
          className="lg:col-span-6 px-6 sm:px-10 lg:pl-20 lg:pr-10 py-12 lg:py-16 flex flex-col justify-center z-10"
        >
          <div className="space-y-4">
            <span className="hero-eyebrow block type-eyebrow text-[#1D4ED8]">
              <EditableText path="heroBanners.0.badge" value={banner.badge} />
            </span>

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
