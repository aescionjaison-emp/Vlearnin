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
  const staticMedia = banners[0];

  return (
    <section
      aria-label="VLEARNIN Institutional Campaign Showcase"
      className="relative w-full overflow-hidden bg-[#F8FAFC] text-[#111827] border-b border-[#E5E7EB]"
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
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[540px] lg:h-[580px] items-stretch">
        {/* Left Typography & Static CTA Column */}
        <div
          ref={heroTextRef}
          className="lg:col-span-6 px-6 sm:px-10 lg:pl-20 lg:pr-10 pt-12 pb-20 lg:pt-14 lg:pb-20 flex flex-col justify-between z-10"
        >
          {/* Only this text block transitions when the slide changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              <span className="hero-eyebrow block font-nav text-xs font-bold uppercase tracking-[0.18em] text-[#1D4ED8]">
                <EditableText path={`heroBanners.${activeIdx}.badge`} value={banner.badge} />
              </span>

              <h1 className="hero-headline font-editorial text-[34px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.06] tracking-normal text-[#1D4ED8]">
                <EditableText
                  path={`heroBanners.${activeIdx}.headlineWhite`}
                  value={banner.headlineWhite}
                />{" "}
                <EditableText
                  path={`heroBanners.${activeIdx}.headlineAccent`}
                  value={banner.headlineAccent}
                />
              </h1>

              <EditableText
                as="p"
                path={`heroBanners.${activeIdx}.description`}
                value={banner.description}
                className="hero-desc mc-lead max-w-xl text-[#4B5563]"
              />

              {banner.features && (
                <ul className="space-y-1.5 pt-1">
                  {banner.features.map((f, fIdx) => (
                    <li
                      key={fIdx}
                      className="text-sm font-nav font-semibold flex items-center gap-2 text-[#1D4ED8]"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <EditableText path={`heroBanners.${activeIdx}.features.${fIdx}`} value={f} />
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Static Hero CTAs */}
          <div className="hero-ctas flex flex-wrap items-center gap-3.5 pt-6">
            <Link
              href={banners[0].primaryCta.href}
              className="btn-primary-amber mc-icon-btn px-6 py-3.5 text-sm uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>{banners[0].primaryCta.label}</span>
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

        {/* Right Static Diagonal-Cut Photographic Panel */}
        <div className="lg:col-span-6 relative h-[300px] sm:h-[360px] lg:h-full overflow-hidden">
          <div className="absolute inset-0 jain-slant-photo-lg">
            {staticMedia.video ||
            staticMedia.image.startsWith("data:video/") ||
            /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(staticMedia.image) ? (
              <video
                src={staticMedia.video || staticMedia.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <Image
                src={staticMedia.image}
                alt={staticMedia.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            )}
          </div>
          <EditableImageTrigger
            path="heroBanners.0.image"
            currentSrc={staticMedia.image}
            altPath="heroBanners.0.imageAlt"
            currentAlt={staticMedia.imageAlt}
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
                  : "w-3 bg-[#1D4ED8]/30 hover:bg-[#1D4ED8]/60"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? "Resume banner rotation" : "Pause banner rotation"}
          className="p-1.5 border text-xs cursor-pointer border-[#1D4ED8]/30 text-[#1D4ED8] bg-white/80"
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
