"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight } from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";

interface HeroSlide {
  id: string;
  badge?: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta:
    | { label: string; action: "demo" | "brochure" }
    | { label: string; href: string };
}

const SLIDES: HeroSlide[] = [
  {
    id: "brand",
    badge: "THE V-WAY TO LEARN, BUILD & LEAD.",
    headline: "Shaping Future-Ready Talent Through Practical, Industry-Aligned Education",
    description:
      "Master high-demand skills in Artificial Intelligence, Business Intelligence, Corporate Finance, and Digital Media. Intensive 30-hour certification programmes with real-world capstone projects and dedicated placement assistance.",
    image: "/images/hero-1.jpg",
    imageAlt: "Instructor-led practical training session in a modern Indian educational classroom at VLEARNIN",
    primaryCta: { label: "Explore All Programmes", href: "/courses" },
    secondaryCta: { label: "Book a Free Demo Class", action: "demo" },
  },
  {
    id: "ai-bi",
    badge: "AI & BUSINESS INTELLIGENCE",
    headline: "Transform Data Into Decisions. Turn AI Into Opportunity.",
    description:
      "Build workplace AI workflows, clean multi-source datasets in Power Query, write DAX formulas, and present interactive executive Power BI dashboards.",
    image: "/images/hero-2.jpg",
    imageAlt: "Students working on Power BI dashboards and AI tools in a modern Bengaluru computer laboratory",
    primaryCta: { label: "Explore AI & Analytics", href: "/courses?category=ai-business-intelligence" },
    secondaryCta: { label: "Book Free Demo", action: "demo" },
  },
  {
    id: "finance",
    badge: "CORPORATE FINANCE & CAPITAL MARKETS",
    headline: "Build the Financial Expertise Tomorrow's Businesses Need.",
    description:
      "Construct dynamic 3-statement Excel models, DCF company valuations, M&A accretion analyses, and investment banking pitchbooks through live case studies.",
    image: "/images/hero-3.jpg",
    imageAlt: "Finance training session with Excel financial models and valuation charts",
    primaryCta: { label: "Explore Finance Programmes", href: "/courses?category=corporate-finance-capital-markets" },
    secondaryCta: { label: "View Career Combos", href: "/career-combos" },
  },
  {
    id: "digital-media",
    badge: "DIGITAL MARKETING & CREATIVE MEDIA",
    headline: "Create. Connect. Grow. Lead the Digital Future.",
    description:
      "Launch ROI-tracked Google and Meta ad campaigns, design 30-day multi-platform content engines, and edit commercial short-form Reels and YouTube videos.",
    image: "/images/hero-4.jpg",
    imageAlt: "Creative media studio featuring video editing workstations and digital marketing production",
    primaryCta: { label: "Explore Digital & Media", href: "/courses?category=digital-marketing-creative-media" },
    secondaryCta: { label: "Download Brochure", action: "brochure" },
  },
];

export function HeroCarousel() {
  const { openDemoModal, openBrochureModal } = useLeadModal();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animate-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeIdx]);

  const slide = SLIDES[activeIdx];

  return (
    <section
      aria-label="Featured Programmes Showcase"
      className="relative w-full min-h-[560px] lg:h-[80vh] lg:max-h-[780px] bg-[#071B3D] overflow-hidden"
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
      {/* Background Slides with Crossfade & Slow Zoom */}
      {SLIDES.map((s, idx) => {
        const isCurrent = idx === activeIdx;
        return (
          <div
            key={s.id}
            aria-hidden={!isCurrent}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                isCurrent ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071B3D]/92 via-[#071B3D]/72 to-[#071B3D]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3D]/75 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* Foreground Editorial Content */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-16 lg:py-20"
      >
        <div className="max-w-3xl space-y-5">
          {slide.badge && (
            <div className="hero-animate-item inline-flex items-center gap-2.5 border border-[#D4A54A]/60 bg-[#071B3D]/75 px-3.5 py-1.5 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 bg-[#D4A54A]" />
              <span className="font-nav text-[11px] font-bold uppercase tracking-[0.2em] text-[#E6C47A]">
                {slide.badge}
              </span>
            </div>
          )}

          <h1 className="hero-animate-item text-3xl sm:text-4xl lg:text-[52px] font-bold text-white leading-[1.12] tracking-tight">
            {slide.headline}
          </h1>

          <p className="hero-animate-item text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed max-w-2xl">
            {slide.description}
          </p>

          <div className="hero-animate-item flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href={slide.primaryCta.href}
              className="btn-gold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>{slide.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {"href" in slide.secondaryCta ? (
              <Link
                href={slide.secondaryCta.href}
                className="border border-white/70 bg-white/10 hover:bg-white hover:text-[#071B3D] text-white font-nav font-semibold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider transition-colors backdrop-blur-xs"
              >
                {slide.secondaryCta.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (slide.secondaryCta && "action" in slide.secondaryCta) {
                    if (slide.secondaryCta.action === "demo") {
                      openDemoModal({ sourcePage: "homepage-hero" });
                    } else {
                      openBrochureModal({ brochureType: "complete" });
                    }
                  }
                }}
                className="border border-white/70 bg-white/10 hover:bg-white hover:text-[#071B3D] text-white font-nav font-semibold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider transition-colors backdrop-blur-xs"
              >
                {slide.secondaryCta.label}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Carousel Controls & Slide Progress */}
      <div className="relative lg:absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Hero slide indicators">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIdx}
              aria-label={`Go to slide ${idx + 1}: ${s.badge}`}
              onClick={() => setActiveIdx(idx)}
              className={`h-1.5 transition-all duration-300 ${
                idx === activeIdx
                  ? "w-10 bg-[#D4A54A]"
                  : "w-4 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            className="w-9 h-9 border border-white/30 bg-[#071B3D]/60 text-white hover:border-[#D4A54A] flex items-center justify-center transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-9 h-9 border border-white/30 bg-[#071B3D]/60 text-white hover:border-[#D4A54A] flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-9 h-9 border border-white/30 bg-[#071B3D]/60 text-white hover:border-[#D4A54A] flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
