"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { BRAND, OFFICIAL_COURSES } from "@vlearnin/shared";
import { VlearninLogo } from "./VlearninLogo";
import { useLeadModal } from "./LeadModalProvider";

const MEGA_COLUMNS = [
  {
    title: "AI & Business Intelligence",
    categorySlug: "ai-business-intelligence",
    image: "/images/domain-analytics.jpg",
    courses: OFFICIAL_COURSES.filter(
      (c) => c.categorySlug === "ai-business-intelligence",
    ),
  },
  {
    title: "Finance & Capital Markets",
    categorySlug: "corporate-finance-capital-markets",
    image: "/images/hero-3.jpg",
    courses: OFFICIAL_COURSES.filter(
      (c) => c.categorySlug === "corporate-finance-capital-markets",
    ),
  },
  {
    title: "Digital Marketing & Creative Media",
    categorySlug: "digital-marketing-creative-media",
    image: "/images/domain-creative.jpg",
    courses: OFFICIAL_COURSES.filter(
      (c) => c.categorySlug === "digital-marketing-creative-media",
    ),
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses", hasMega: true },
  { label: "Career Combos", href: "/career-combos" },
  { label: "Placement Assistance", href: "/placement-assistance" },
  { label: "Academic Partnerships", href: "/academic-partnerships" },
  { label: "Verify Certificate", href: "/verify-certificate" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function GlobalHeader() {
  const pathname = usePathname();
  const { openDemoModal } = useLeadModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  if (pathname?.startsWith("/admin")) {
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
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* 1. Top Institutional Utility Bar */}
      <div
        className={`bg-[#071B3D] text-white transition-all duration-300 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs font-nav">
          <div className="flex items-center gap-4 text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>{BRAND.shortLocation}</span>
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href={BRAND.phoneHref}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#D4A54A] transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>{BRAND.phoneDisplay}</span>
            </a>
          </div>

          <nav aria-label="Utility Navigation" className="hidden md:flex items-center gap-5 text-white/85">
            <Link
              href="/academic-partnerships"
              className="hover:text-[#D4A54A] transition-colors inline-flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>Academic Partnerships</span>
            </Link>
            <Link
              href="/verify-certificate"
              className="hover:text-[#D4A54A] transition-colors inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>Verify Certificate</span>
            </Link>
            <Link
              href="/hire-from-vlearnin"
              className="hover:text-[#D4A54A] transition-colors inline-flex items-center gap-1"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>Hire From VLEARNIN</span>
            </Link>
            <Link href="/contact" className="hover:text-[#D4A54A] transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="border-b border-[#DFE5EE] bg-white/95 backdrop-blur-md">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" aria-label="VLEARNIN Academy Home" className="shrink-0">
            <VlearninLogo variant="dark" compact={isScrolled} showTagline={!isScrolled} />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

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
                      className={`font-nav text-[13px] font-semibold px-3 py-2 inline-flex items-center gap-1 transition-colors relative ${
                        isActive ? "text-[#1746A2]" : "text-[#101828] hover:text-[#1746A2]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      />
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4A54A]" />
                      )}
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-nav text-[13px] font-semibold px-2.5 py-2 transition-colors relative whitespace-nowrap ${
                    isActive ? "text-[#1746A2]" : "text-[#101828] hover:text-[#1746A2]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#D4A54A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Gold CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
              className="btn-gold hidden sm:inline-flex items-center px-4 py-2.5 text-xs uppercase tracking-wider shrink-0"
            >
              Book Free Demo
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="xl:hidden p-2 border border-[#DFE5EE] text-[#071B3D]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Courses Three-Column Mega Menu */}
      {megaOpen && (
        <div
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
          className="hidden xl:block absolute left-0 right-0 bg-white border-b-2 border-[#D4A54A] shadow-2xl z-50"
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="grid grid-cols-3 gap-8">
              {MEGA_COLUMNS.map((col) => (
                <div key={col.categorySlug} className="space-y-4">
                  <div className="relative h-28 w-full overflow-hidden border border-[#DFE5EE]">
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      className="object-cover"
                      sizes="360px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3D]/85 via-[#071B3D]/30 to-transparent flex items-end p-3">
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
                          className="group flex items-start justify-between gap-2 py-1 text-sm text-[#101828] hover:text-[#1746A2] transition-colors"
                        >
                          <span className="font-medium leading-snug">{course.title}</span>
                          <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-[#D4A54A] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[#DFE5EE] flex items-center justify-between">
              <p className="text-xs text-[#667085]">
                Every standalone certification is 30 hours (5 modules × 6 hours) with a live capstone project.
              </p>
              <Link
                href="/courses"
                onClick={() => setMegaOpen(false)}
                className="btn-navy px-5 py-2 text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                View All Programmes
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-[#DFE5EE] max-h-[82vh] overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 font-nav text-sm font-semibold border-l-2 ${
                    isActive
                      ? "border-[#D4A54A] bg-[#F4F7FC] text-[#071B3D]"
                      : "border-transparent text-[#101828] hover:bg-[#F4F7FC]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/hire-from-vlearnin"
              className="block px-3 py-2.5 font-nav text-sm font-semibold border-l-2 border-transparent text-[#101828] hover:bg-[#F4F7FC]"
            >
              Hire From VLEARNIN
            </Link>
            <div className="pt-3 border-t border-[#DFE5EE] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openDemoModal({ sourcePage: pathname || "/" });
                }}
                className="btn-gold w-full py-3 text-sm"
              >
                Book Free Demo
              </button>
              <a
                href={BRAND.phoneHref}
                className="btn-outline-navy w-full py-2.5 text-sm text-center"
              >
                Call {BRAND.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
