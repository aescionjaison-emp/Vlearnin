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
      <footer className="bg-[#082F62] text-white border-t-4 border-[#F58220] pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 — Brand */}
            <div className="space-y-4">
              <VlearninLogo variant="light" />
              <p className="text-sm text-white/80 leading-relaxed">
                Practical certification training in Artificial Intelligence, Business Intelligence,
                Corporate Finance, and Digital Media—built around live datasets, real tools, and
                dedicated placement assistance.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
                  className="btn-gold px-5 py-2.5 text-xs uppercase tracking-wider cursor-pointer"
                >
                  Book Free Demo Class
                </button>
              </div>
            </div>

            {/* Column 2 — Programmes */}
            <div>
              <h3 className="mc-footer-heading text-[#F4C430] mb-5">
                Programmes
              </h3>
              <ul className="space-y-2.5 mc-footer-link text-white/85">
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

            {/* Column 3 — Institutional Links */}
            <div>
              <h3 className="mc-footer-heading text-[#F4C430] mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2.5 mc-footer-link text-white/85">
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
              <h3 className="mc-footer-heading text-[#F4C430] mb-5">
                Contact Us
              </h3>
              <ul className="space-y-3 mc-footer-link text-white/85">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F4C430] shrink-0 mt-1" />
                  <span>
                    {BRAND.legalName}, {BRAND.address}
                  </span>
                </li>
                <li>
                  <a
                    href={BRAND.phoneHref}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#F4C430] shrink-0" />
                    <span>{BRAND.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#F4C430] shrink-0" />
                    <span>{BRAND.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/75">
                  <Clock className="w-4 h-4 text-[#F4C430] shrink-0 mt-1" />
                  <div>
                    <p>{BRAND.timings.weekdays}</p>
                    <p className="mt-0.5">{BRAND.timings.sunday}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/15 space-y-4">
            <p className="text-xs text-white/70 leading-relaxed">
              <strong className="text-white/90">Placement Assistance Disclaimer:</strong>{" "}
              {BRAND.placementDisclaimer}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
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

      {/* Desktop Floating WhatsApp Button */}
      <a
        href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like to know more about your certification programmes.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VLEARNIN on WhatsApp"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[#082F62] text-white border border-[#F4C430] px-4 py-3 shadow-xl hover:bg-[#16529A] transition-colors font-nav text-xs font-semibold uppercase tracking-wider"
      >
        <MessageCircle className="w-4 h-4 text-[#F4C430]" />
        <span>WhatsApp Us</span>
      </a>

      {/* Mobile Fixed Bottom Action Bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#082F62] text-white border-t border-[#F4C430] grid grid-cols-3 divide-x divide-white/15"
        role="region"
        aria-label="Quick Contact Actions"
      >
        <a
          href={BRAND.phoneHref}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <Phone className="w-4 h-4 text-[#F4C430] mb-0.5" />
          <span>Call Now</span>
        </a>
        <a
          href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like programme & demo details.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <MessageCircle className="w-4 h-4 text-[#F4C430] mb-0.5" />
          <span>WhatsApp Us</span>
        </a>
        <button
          type="button"
          onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold bg-[#F58220] text-white"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book Demo</span>
        </button>
      </div>
    </>
  );
}
