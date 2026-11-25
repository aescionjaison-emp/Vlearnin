"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";

interface HeroBanner {
  id: string;
  theme: "jain-blue" | "light-split" | "deep-navy" | "studio-light";
  badge: string;
  headlineWhite: string;
  headlineAccent: string;
  description: string;
  features?: string[];
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; action: "demo" | "brochure" } | { label: string; href: string };
}

const BANNERS: HeroBanner[] = [
  {
    id: "brand-campaign",
    theme: "jain-blue",
    badge: "THE V-WAY TO LEARN, BUILD & LEAD.",
    headlineWhite: "Shaping Future-Ready Talent Through",
    headlineAccent: "Practical, Industry-Aligned Education",
    description:
      "Master high-demand skills in Artificial Intelligence, Business Intelligence, Corporate Finance, and Digital Media through practical, 30-hour certification programmes.",
    image: "/images/hero-1.jpg",
    imageAlt: "Confident Indian learners in an instructor-led practical training session at VLEARNIN",
    primaryCta: { label: "Explore All Programmes", href: "/courses" },
    secondaryCta: { label: "Book Free Demo", action: "demo" },
  },
  {
    id: "ai-bi",
    theme: "light-split",
    badge: "AI & BUSINESS INTELLIGENCE",
    headlineWhite: "Learn AI. Master Data.",
    headlineAccent: "Lead Business Transformation.",
    description:
      "Hands-on 30-hour certifications in generative AI workplace automation, Power Query data cleaning, DAX modeling, and executive Power BI dashboards.",
    features: [
      "Certified AI Tools for Commerce & Business",
      "Certified Data Visualization Using Power BI",
    ],
    image: "/images/hero-2.jpg",
    imageAlt: "Students analyzing business intelligence dashboards and AI tools in a bright computer lab",
    primaryCta: { label: "Explore AI & Analytics", href: "/courses?category=ai-business-intelligence" },
    secondaryCta: { label: "Book Free Demo", action: "demo" },
  },
  {
    id: "corporate-finance",
    theme: "deep-navy",
    badge: "CORPORATE FINANCE & CAPITAL MARKETS",
    headlineWhite: "Build the Financial Expertise",
    headlineAccent: "Tomorrow's Businesses Need.",
    description:
      "Construct dynamic 3-statement Excel forecasts, DCF company valuations, M&A deal structures, and investment banking pitchbooks through live case studies.",
    features: ["Financial Modelling", "Investment Banking"],
    image: "/images/hero-3.jpg",
    imageAlt: "Corporate finance training classroom featuring financial models and mentor guidance",
    primaryCta: { label: "Explore Finance Programmes", href: "/courses?category=corporate-finance-capital-markets" },
    secondaryCta: { label: "View Career Combos", href: "/career-combos" },
  },
  {
    id: "digital-media",
    theme: "studio-light",
    badge: "DIGITAL MARKETING & CREATIVE MEDIA",
    headlineWhite: "Create. Connect. Grow.",
    headlineAccent: "Lead the Digital Future.",
    description:
      "Launch performance ad campaigns, build 30-day multi-platform content engines, and produce high-retention commercial Reels and YouTube edits.",
    features: [
      "Digital Marketing",
      "Social Media Marketing",
      "Video Editing & Reels Production",
    ],
    image: "/images/hero-4.jpg",
    imageAlt: "Modern creative media studio with video editing workstation and digital production",
    primaryCta: { label: "Explore Digital & Media", href: "/courses?category=digital-marketing-creative-media" },
    secondaryCta: { label: "Download Brochure", action: "brochure" },
  },
];

export function HeroCarousel() {
  const { openDemoModal, openBrochureModal } = useLeadModal();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const banner = BANNERS[activeIdx];
  const isDarkTheme = banner.theme === "jain-blue" || banner.theme === "deep-navy";

  return (
    <section
      aria-label="VLEARNIN Institutional Campaign Showcase"
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        banner.theme === "jain-blue"
          ? "bg-gradient-to-r from-[#082F62] via-[#0B3C7A] to-[#0E4A94] text-white"
          : banner.theme === "deep-navy"
            ? "bg-[#071B3D] text-white"
            : "bg-[#F5F7FA] text-[#212529] border-b border-[#E2E8F0]"
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
        {/* Left Typography & CTA Column */}
        <div className="lg:col-span-6 px-6 sm:px-10 lg:pl-20 lg:pr-10 py-12 lg:py-16 flex flex-col justify-center z-10">
          <div className="space-y-5">
            <span
              className={`inline-block font-nav text-xs font-bold uppercase tracking-[0.16em] px-4 py-1.5 ${
                isDarkTheme
                  ? "bg-white text-[#082F62]"
                  : "bg-[#082F62] text-white"
              }`}
            >
              {banner.badge}
            </span>

            <h1 className="font-editorial text-[38px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.08] tracking-tight">
              <span className={isDarkTheme ? "text-white" : "text-[#082F62]"}>
                {banner.headlineWhite}{" "}
              </span>
              <span className={isDarkTheme ? "text-[#F4C430]" : "text-[#16529A]"}>
                {banner.headlineAccent}
              </span>
            </h1>

            <p
              className={`text-base sm:text-[17px] leading-relaxed max-w-xl ${
                isDarkTheme ? "text-white/90" : "text-[#5C6672]"
              }`}
            >
              {banner.description}
            </p>

            {banner.features && (
              <ul className="space-y-1.5 pt-1">
                {banner.features.map((f) => (
                  <li
                    key={f}
                    className={`text-sm font-nav font-semibold flex items-center gap-2 ${
                      isDarkTheme ? "text-[#F4C430]" : "text-[#082F62]"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={banner.primaryCta.href}
                className={`${
                  isDarkTheme ? "btn-gold" : "btn-primary-amber"
                } px-6 py-3.5 text-sm uppercase tracking-wider inline-flex items-center gap-2`}
              >
                <span>{banner.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {banner.secondaryCta &&
                ("href" in banner.secondaryCta ? (
                  <Link
                    href={banner.secondaryCta.href}
                    className={`px-6 py-3.5 text-sm font-nav font-semibold uppercase tracking-wider border transition-colors ${
                      isDarkTheme
                        ? "border-white text-white hover:bg-white hover:text-[#082F62]"
                        : "border-[#082F62] text-[#082F62] hover:bg-[#082F62] hover:text-white"
                    }`}
                  >
                    {banner.secondaryCta.label}
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
                        ? "border-white text-white hover:bg-white hover:text-[#082F62]"
                        : "border-[#082F62] text-[#082F62] hover:bg-[#082F62] hover:text-white"
                    }`}
                  >
                    {banner.secondaryCta.label}
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
              initial={{ opacity: 0.35, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.35 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 jain-slant-photo-lg"
            >
              <Image
                src={banner.image}
                alt={banner.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* JAIN-Style Left-Edge Carousel Arrows */}
      <div className="hidden sm:flex flex-col gap-2 absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous campaign banner"
          className="w-9 h-9 rounded-full bg-[#F58220] hover:bg-[#DC6D0E] text-white flex items-center justify-center shadow-md cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next campaign banner"
          className="w-9 h-9 rounded-full bg-[#F58220] hover:bg-[#DC6D0E] text-white flex items-center justify-center shadow-md cursor-pointer transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Slide Indicators & Pause Control */}
      <div className="absolute bottom-4 left-6 sm:left-20 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero banner slides">
          {BANNERS.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIdx}
              aria-label={`Show banner ${idx + 1}: ${b.badge}`}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 transition-all duration-300 cursor-pointer ${
                idx === activeIdx
                  ? "w-8 bg-[#F58220]"
                  : isDarkTheme
                    ? "w-3 bg-white/40 hover:bg-white/75"
                    : "w-3 bg-[#082F62]/30 hover:bg-[#082F62]/60"
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
              ? "border-white/40 text-white bg-[#082F62]/60"
              : "border-[#082F62]/30 text-[#082F62] bg-white/80"
          }`}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </section>
  );
}
