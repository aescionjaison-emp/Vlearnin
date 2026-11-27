"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  X,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  Home,
} from "lucide-react";
import { BRAND, OFFICIAL_COURSES } from "@vlearnin/shared";
import { VlearninLogo } from "./VlearninLogo";
import { useLeadModal } from "./LeadModalProvider";
import { useSiteContent } from "./SiteContentProvider";
import { EditableText } from "./EditableText";

export function GlobalHeader({ forceShow = false }: { forceShow?: boolean }) {
  const pathname = usePathname();
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProgOpen, setMobileProgOpen] = useState(false);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MEGA_COLUMNS = [
    {
      title: content.categories[0]?.name || "AI & Business Intelligence",
      categorySlug: "ai-business-intelligence",
      image: content.categories[0]?.image || "/images/domain-analytics.jpg",
      courses: content.courses.filter(
        (c) => c.categorySlug === "ai-business-intelligence",
      ),
    },
    {
      title: content.categories[1]?.name || "Corporate Finance & Capital Markets",
      categorySlug: "corporate-finance-capital-markets",
      image: content.categories[1]?.image || "/images/hero-3.jpg",
      courses: content.courses.filter(
        (c) => c.categorySlug === "corporate-finance-capital-markets",
      ),
    },
    {
      title: content.categories[2]?.name || "Digital Marketing & Creative Media",
      categorySlug: "digital-marketing-creative-media",
      image: content.categories[2]?.image || "/images/domain-creative.jpg",
      courses: content.courses.filter(
        (c) => c.categorySlug === "digital-marketing-creative-media",
      ),
    },
  ];
  const NAV_LINKS = content.header.navLinks;

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!forceShow && pathname?.startsWith("/admin")) {
    return null;
  }

  const handleMegaEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 160);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E5E7EB] shadow-xs">
      {/* Desktop Two-Level JAIN-Inspired Institutional Header */}
      <div className="hidden xl:flex max-w-[1440px] mx-auto items-stretch">
        {/* Left Brand Logo Block */}
        <div className="bg-white pl-8 pr-6 py-3 flex items-center shrink-0 z-20">
          <Link href="/" aria-label="VLEARNIN Academy Home">
            <VlearninLogo variant="dark" showTagline />
          </Link>
        </div>

        {/* Right Two-Tier Navigation Stack */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tier 1: Diagonal-Slanted Deep Blue Utility Bar */}
          <div className="relative bg-[#1D4ED8] text-white h-10 flex items-center justify-between pl-10 pr-8 text-[13px] font-nav">
            {/* Diagonal white slant matching JAIN header */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-7 bg-white"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />

            <div className="flex items-center gap-4 text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span>{BRAND.shortLocation}</span>
              </span>
              <span className="text-white/30">|</span>
              <a
                href={BRAND.phoneHref}
                className="inline-flex items-center gap-1.5 hover:text-[#93C5FD] transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span>{BRAND.phoneDisplay}</span>
              </a>
            </div>

            <nav aria-label="Institutional Utility Links" className="flex items-center gap-4 text-white/90">
              <Link href="/contact" className="hover:text-[#93C5FD] transition-colors">
                Student Enquiries
              </Link>
              <span className="text-white/25">|</span>
              <Link
                href="/academic-partnerships"
                className="hover:text-[#93C5FD] transition-colors inline-flex items-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span>Academic Partnerships</span>
              </Link>
              <span className="text-white/25">|</span>
              <Link
                href="/verify-certificate"
                className="hover:text-[#93C5FD] transition-colors inline-flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span>Verify Certificate</span>
              </Link>
              <span className="text-white/25">|</span>
              <Link
                href="/hire-from-vlearnin"
                className="hover:text-[#93C5FD] transition-colors inline-flex items-center gap-1"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span>Hire From VLEARNIN</span>
              </Link>
            </nav>
          </div>

          {/* Tier 2: Main White Navigation Row */}
          <div className="bg-white h-16 px-8 flex items-center justify-between gap-4">
            <nav aria-label="Main Navigation" className="flex items-center gap-5">
              <Link
                href="/"
                aria-label="Home"
                className={`p-1.5 transition-colors ${
                  pathname === "/" ? "text-[#1D4ED8]" : "text-[#111827] hover:text-[#1D4ED8]"
                }`}
              >
                <Home className="w-4 h-4" />
              </Link>

              {NAV_LINKS.map((item) => {
                const isActive = pathname?.startsWith(item.href);

                if (item.hasMega) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={handleMegaEnter}
                      onMouseLeave={handleMegaLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setMegaOpen((prev) => !prev)}
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                        className={`font-nav text-[14px] font-medium uppercase tracking-wide py-2 inline-flex items-center gap-1 transition-colors relative cursor-pointer ${
                          isActive ? "text-[#1D4ED8] font-bold" : "text-[#111827] hover:text-[#1D4ED8]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            megaOpen ? "rotate-180" : ""
                          }`}
                        />
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D4ED8]" />
                        )}
                      </button>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mc-underline-link font-nav text-[15px] font-medium tracking-wide py-2 transition-colors duration-300 relative whitespace-nowrap ${
                      isActive ? "text-[#1D4ED8] font-semibold" : "text-[#111827] hover:text-[#1D4ED8]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
              className="btn-primary-amber px-5 py-2.5 text-[13px] uppercase tracking-wider shrink-0 cursor-pointer"
            >
              Book Free Demo
            </button>
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Header */}
      <div className="xl:hidden">
        <div className="bg-[#1D4ED8] text-white px-4 py-1.5 flex items-center justify-between text-xs font-nav">
          <span>{BRAND.shortLocation}</span>
          <a href={BRAND.phoneHref} className="font-semibold text-[#93C5FD]">
            {BRAND.phoneDisplay}
          </a>
        </div>
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between bg-white">
          <Link href="/" aria-label="VLEARNIN Academy Home">
            <VlearninLogo variant="dark" compact showTagline={false} />
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
              className="btn-primary-amber hidden sm:inline-flex px-4 py-2 text-xs uppercase tracking-wider"
            >
              Book Free Demo
            </button>
            <Link
              href="/verify-certificate"
              aria-label="Verify Certificate"
              className="p-2 border border-[#E5E7EB] text-[#1D4ED8] rounded-[15px]"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="p-2 border border-[#E5E7EB] text-[#1D4ED8] rounded-[15px]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Three-Column Programmes Mega Menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            className="hidden xl:block absolute left-0 right-0 bg-white border-t border-[#E5E7EB] border-b-4 border-b-[#1D4ED8] shadow-2xl z-50"
          >
          <div className="max-w-[1440px] mx-auto px-10 py-8">
            <div className="grid grid-cols-3 gap-8">
              {MEGA_COLUMNS.map((col) => (
                <div key={col.categorySlug} className="space-y-4">
                  <div className="relative h-32 w-full overflow-hidden border border-[#E5E7EB] rounded-[15px]">
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D4ED8]/90 via-[#1D4ED8]/30 to-transparent flex items-end p-3.5">
                      <span className="font-nav text-xs font-bold uppercase tracking-wider text-white">
                        {col.title}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {col.courses.map((course) => (
                      <li key={course.slug}>
                        <Link
                          href={`/courses/${course.slug}`}
                          onClick={() => setMegaOpen(false)}
                          className="group flex items-start justify-between gap-2 py-1 text-[15px] text-[#111827] hover:text-[#1D4ED8] transition-colors"
                        >
                          <span className="font-medium leading-snug">{course.title}</span>
                          <ArrowRight className="w-4 h-4 shrink-0 mt-1 text-[#EA580C] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E5E7EB] flex items-center justify-between">
              <p className="text-sm text-[#4B5563]">
                All 7 standalone certifications run 30 hours (5 modules × 6 hours) with live capstone evaluation.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMegaOpen(false);
                    openDemoModal({ sourcePage: "mega-menu" });
                  }}
                  className="btn-primary-amber px-5 py-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  Book Free Demo
                </button>
                <Link
                  href="/courses"
                  onClick={() => setMegaOpen(false)}
                  className="btn-navy px-5 py-2 text-xs uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Explore All Programmes
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer with Expandable Programme Categories */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-[#E5E7EB] max-h-[82vh] overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="px-4 py-4 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2.5 font-nav text-sm font-semibold text-[#111827] hover:bg-[#F8FAFC]"
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setMobileProgOpen((v) => !v)}
              aria-expanded={mobileProgOpen}
              className="w-full flex items-center justify-between px-3 py-2.5 font-nav text-sm font-semibold text-[#1D4ED8] bg-[#F8FAFC]"
            >
              <span>Programmes (7 Courses)</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileProgOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileProgOpen && (
              <div className="pl-4 py-2 space-y-3 border-l-2 border-[#1D4ED8] ml-3">
                {MEGA_COLUMNS.map((col) => (
                  <div key={col.categorySlug} className="space-y-1">
                    <p className="font-nav text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                      {col.title}
                    </p>
                    {col.courses.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/courses/${c.slug}`}
                        className="block py-1 text-sm text-[#111827]"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  href="/courses"
                  className="inline-block font-nav text-xs font-bold text-[#EA580C] uppercase pt-1"
                >
                  View All Programmes →
                </Link>
              </div>
            )}

            {NAV_LINKS.filter((l) => !l.hasMega).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 font-nav text-sm font-semibold text-[#111827] hover:bg-[#F8FAFC]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/verify-certificate"
              className="block px-3 py-2.5 font-nav text-sm font-semibold text-[#111827] hover:bg-[#F8FAFC]"
            >
              Verify Certificate
            </Link>
            <Link
              href="/hire-from-vlearnin"
              className="block px-3 py-2.5 font-nav text-sm font-semibold text-[#111827] hover:bg-[#F8FAFC]"
            >
              Hire From VLEARNIN
            </Link>

            <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openDemoModal({ sourcePage: pathname || "/" });
                }}
                className="btn-primary-amber w-full py-3 text-sm"
              >
                Book Free Demo
              </button>
              <a href={BRAND.phoneHref} className="btn-outline-navy w-full py-2.5 text-sm text-center">
                Call {BRAND.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
