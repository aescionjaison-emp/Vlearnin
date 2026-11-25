"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone, Clock, Calendar } from "lucide-react";
import { BRAND, buildWhatsAppUrl } from "@vlearnin/shared";
import { VlearninLogo } from "./VlearninLogo";
import { useLeadModal } from "./LeadModalProvider";

export function GlobalFooter() {
  const pathname = usePathname();
  const { openDemoModal } = useLeadModal();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#071B3D] text-white border-t-4 border-[#D4A54A] pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 — Brand */}
            <div className="space-y-4">
              <VlearninLogo variant="light" />
              <p className="text-sm text-white/75 leading-relaxed">
                Practical certification training in Artificial Intelligence, Business Intelligence,
                Corporate Finance, and Digital Media—built around live datasets, real tools, and
                dedicated placement assistance.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
                  className="btn-gold px-5 py-2.5 text-xs uppercase tracking-wider"
                >
                  Book Free Demo Class
                </button>
              </div>
            </div>

            {/* Column 2 — Programmes */}
            <div>
              <h3 className="font-nav text-xs font-bold uppercase tracking-[0.16em] text-[#D4A54A] mb-4">
                Programmes
              </h3>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <Link href="/courses?category=ai-business-intelligence" className="hover:text-white transition-colors">
                    AI &amp; Business Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/courses/financial-modelling-for-business" className="hover:text-white transition-colors">
                    Corporate Finance
                  </Link>
                </li>
                <li>
                  <Link href="/courses/investment-banking-professional" className="hover:text-white transition-colors">
                    Investment Banking
                  </Link>
                </li>
                <li>
                  <Link href="/courses/ai-powered-digital-marketing" className="hover:text-white transition-colors">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/courses/video-editing-reels-production" className="hover:text-white transition-colors">
                    Creative Media &amp; Video Editing
                  </Link>
                </li>
                <li>
                  <Link href="/career-combos" className="hover:text-white transition-colors">
                    Career Combos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — Quick Links */}
            <div>
              <h3 className="font-nav text-xs font-bold uppercase tracking-[0.16em] text-[#D4A54A] mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/placement-assistance" className="hover:text-white transition-colors">
                    Placement Assistance
                  </Link>
                </li>
                <li>
                  <Link href="/academic-partnerships" className="hover:text-white transition-colors">
                    Academic Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/verify-certificate" className="hover:text-white transition-colors">
                    Verify Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/hire-from-vlearnin" className="hover:text-white transition-colors">
                    Hire From VLEARNIN
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div>
              <h3 className="font-nav text-xs font-bold uppercase tracking-[0.16em] text-[#D4A54A] mb-4">
                Visit &amp; Contact
              </h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4A54A] shrink-0 mt-0.5" />
                  <span>
                    {BRAND.legalName}, {BRAND.address}
                  </span>
                </li>
                <li>
                  <a
                    href={BRAND.phoneHref}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D4A54A] shrink-0" />
                    <span>{BRAND.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#D4A54A] shrink-0" />
                    <span>{BRAND.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-white/70">
                  <Clock className="w-4 h-4 text-[#D4A54A] shrink-0 mt-0.5" />
                  <div>
                    <p>{BRAND.timings.weekdays}</p>
                    <p className="mt-0.5">{BRAND.timings.sunday}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Placement Disclaimer & Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/15 space-y-4">
            <p className="text-xs text-white/60 leading-relaxed">
              <strong className="text-white/80">Placement Assistance Disclaimer:</strong>{" "}
              {BRAND.placementDisclaimer}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
              <p>© {currentYear} {BRAND.legalName}. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp Contact Button */}
      <a
        href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like to know more about your certification programmes.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VLEARNIN on WhatsApp"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[#071B3D] text-white border border-[#D4A54A] px-4 py-3 shadow-xl hover:bg-[#1746A2] transition-colors font-nav text-xs font-semibold uppercase tracking-wider"
      >
        <MessageCircle className="w-4 h-4 text-[#D4A54A]" />
        <span>WhatsApp Us</span>
      </a>

      {/* Mobile Fixed Bottom Action Bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071B3D] text-white border-t border-[#D4A54A] grid grid-cols-3 divide-x divide-white/15"
        role="region"
        aria-label="Quick Contact Actions"
      >
        <a
          href={BRAND.phoneHref}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <Phone className="w-4 h-4 text-[#D4A54A] mb-0.5" />
          <span>Call Now</span>
        </a>
        <a
          href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like programme & demo details.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <MessageCircle className="w-4 h-4 text-[#D4A54A] mb-0.5" />
          <span>WhatsApp Us</span>
        </a>
        <button
          type="button"
          onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold bg-[#D4A54A] text-[#071B3D]"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book Demo</span>
        </button>
      </div>
    </>
  );
}
