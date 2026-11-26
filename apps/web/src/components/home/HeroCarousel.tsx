"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { runHeroTimeline } from "@/lib/motion/timelines";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableImageTrigger,
  EditableText,
} from "@/components/EditableText";

export function HeroCarousel() {
  const { openDemoModal, openBrochureModal } = useLeadModal();
  const { content, isEditMode } = useSiteContent();
  const banners = content.heroBanners;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return runHeroTimeline(heroTextRef.current);
  }, [activeIdx]);

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (isPaused || isEditMode) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, isEditMode, nextSlide]);

  const banner = banners[activeIdx] || banners[0];
  const isDarkTheme = banner.theme === "jain-blue" || banner.theme === "deep-navy";

  return (
    <section
      aria-label="VLEARNIN Institutional Campaign Showcase"
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        banner.theme === "jain-blue"
          ? "bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#1D4ED8] text-white"
          : banner.theme === "deep-navy"
            ? "bg-[#1E3A8A] text-white"
            : "bg-[#F8FAFC] text-[#111827] border-b border-[#E5E7EB]"
      }`}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) nextSlide();
          else prevSlide();
        }
        touchStartX.current = null;
      }}
    >
      {/* Subtle JAIN-style decorative ring on dark campaign slides */}
      {isDarkTheme && (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-[24%] -top-24 w-[420px] h-[420px] rounded-full border-[36px] border-white/[0.06] pointer-events-none"
        />
      )}

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px] items-stretch">
        {/* Left Typography & CTA Column (MCU-04 Coordinated 50ms Stagger Timeline) */}
        <div
          ref={heroTextRef}
          className="lg:col-span-6 px-6 sm:px-10 lg:pl-20 lg:pr-10 py-12 lg:py-16 flex flex-col justify-center z-10"
        >
          <div className="space-y-5">
            <span
              className={`hero-eyebrow inline-block font-nav text-xs font-bold uppercase tracking-[0.16em] px-4 py-1.5 ${
                isDarkTheme
                  ? "bg-white text-[#1E3A8A]"
                  : "bg-[#1E3A8A] text-white"
              }`}
            >
              <EditableText path={`heroBanners.${activeIdx}.badge`} value={banner.badge} />
            </span>

            <h1 className="hero-headline font-editorial text-[36.8px] sm:text-[46px] lg:text-[56px] font-bold leading-[1.04] tracking-normal">
              <EditableText
                path={`heroBanners.${activeIdx}.headlineWhite`}
                value={banner.headlineWhite}
                className={isDarkTheme ? "text-white" : "text-[#1E3A8A]"}
              />{" "}
              <EditableText
                path={`heroBanners.${activeIdx}.headlineAccent`}
                value={banner.headlineAccent}
                className={isDarkTheme ? "text-[#93C5FD]" : "text-[#1D4ED8]"}
              />
            </h1>

            <EditableText
              as="p"
              path={`heroBanners.${activeIdx}.description`}
              value={banner.description}
              className={`hero-desc mc-lead max-w-xl ${
                isDarkTheme ? "text-white/90" : "text-[#4B5563]"
              }`}
            />

            {banner.features && (
              <ul className="space-y-1.5 pt-1">
                {banner.features.map((f, fIdx) => (
                  <li
                    key={fIdx}
                    className={`text-sm font-nav font-semibold flex items-center gap-2 ${
                      isDarkTheme ? "text-[#93C5FD]" : "text-[#1E3A8A]"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <EditableText path={`heroBanners.${activeIdx}.features.${fIdx}`} value={f} />
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-ctas flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={banner.primaryCta.href}
                className={`${
                  isDarkTheme ? "btn-gold" : "btn-primary-amber"
                } mc-icon-btn px-6 py-3.5 text-sm uppercase tracking-wider inline-flex items-center gap-2`}
              >
                <EditableText path={`heroBanners.${activeIdx}.primaryCta.label`} value={banner.primaryCta.label} />
                <ArrowRight className="w-4 h-4" />
              </Link>

              {banner.secondaryCta &&
                ("href" in banner.secondaryCta ? (
                  <Link
                    href={banner.secondaryCta.href}
                    className={`px-6 py-3.5 text-sm font-nav font-semibold uppercase tracking-wider border transition-colors ${
                      isDarkTheme
                        ? "border-white text-white hover:bg-white hover:text-[#1E3A8A]"
                        : "border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                    }`}
                  >
                    <EditableText path={`heroBanners.${activeIdx}.secondaryCta.label`} value={banner.secondaryCta.label} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (banner.secondaryCta && "action" in banner.secondaryCta) {
                        if (banner.secondaryCta.action === "demo") {
                          openDemoModal({ sourcePage: "hero-banner" });
                        } else {
                          openBrochureModal({ brochureType: "complete" });
                        }
                      }
                    }}
                    className={`px-6 py-3.5 text-sm font-nav font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                      isDarkTheme
                        ? "border-white text-white hover:bg-white hover:text-[#1E3A8A]"
                        : "border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                    }`}
                  >
                    <EditableText path={`heroBanners.${activeIdx}.secondaryCta.label`} value={banner.secondaryCta.label} />
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Right Bright Diagonal-Cut Photographic Panel (Mount Carmel swiper-fade crossfade) */}
        <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] lg:min-h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0.45 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.45 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 jain-slant-photo-lg"
            >
              {banner.video || banner.image.startsWith("data:video/") || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(banner.image) ? (
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
            </motion.div>
          </AnimatePresence>
          <EditableImageTrigger
            path={`heroBanners.${activeIdx}.image`}
            currentSrc={banner.image}
            altPath={`heroBanners.${activeIdx}.imageAlt`}
            currentAlt={banner.imageAlt}
          />
        </div>
      </div>

      {/* JAIN-Style Left-Edge Carousel Arrows */}
      <div className="hidden sm:flex flex-col gap-2 absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous campaign banner"
          className="w-9 h-9 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center shadow-md cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next campaign banner"
          className="w-9 h-9 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center shadow-md cursor-pointer transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Slide Indicators & Pause Control */}
      <div className="absolute bottom-4 left-6 sm:left-20 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero banner slides">
          {banners.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIdx}
              aria-label={`Show banner ${idx + 1}: ${b.badge}`}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 transition-all duration-300 cursor-pointer ${
                idx === activeIdx
                  ? "w-8 bg-[#EA580C]"
                  : isDarkTheme
                    ? "w-3 bg-white/40 hover:bg-white/75"
                    : "w-3 bg-[#1E3A8A]/30 hover:bg-[#1E3A8A]/60"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? "Resume banner rotation" : "Pause banner rotation"}
          className={`p-1.5 border text-xs cursor-pointer ${
            isDarkTheme
              ? "border-white/40 text-white bg-[#1E3A8A]/60"
              : "border-[#1E3A8A]/30 text-[#1E3A8A] bg-white/80"
          }`}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        <EditableAddButton
          path="heroBanners"
          label="Add Slide"
          createItem={() => ({
            id: `slide-${Date.now()}`,
            theme: "jain-blue",
            badge: "NEW CAMPAIGN",
            headlineWhite: "New Headline",
            headlineAccent: "Highlight Text",
            description: "Edit this slide description directly.",
            image: "/images/hero-1.jpg",
            imageAlt: "VLEARNIN campaign image",
            primaryCta: { label: "Explore Programmes", href: "/courses" },
            secondaryCta: { label: "Book Free Demo", action: "demo" },
          })}
        />
        {banners.length > 1 && (
          <EditableDeleteButton
            path="heroBanners"
            index={activeIdx}
            label="Delete Slide"
            onAfterDelete={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
          />
        )}
      </div>
    </section>
  );
}
