"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone, Clock, Calendar } from "lucide-react";
import { BRAND, buildWhatsAppUrl } from "@vlearnin/shared";
import { VlearninLogo } from "./VlearninLogo";
import { useLeadModal } from "./LeadModalProvider";
import { runSectionCascadeTimeline } from "@/lib/motion/timelines";
import { useSiteContent } from "./SiteContentProvider";
import { EditableText } from "./EditableText";

export function GlobalFooter({ forceShow = false }: { forceShow?: boolean }) {
  const pathname = usePathname();
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();
  const footerGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return runSectionCascadeTimeline(footerGridRef.current, ".footer-col");
  }, []);

  if (!forceShow && pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative z-0 lg:sticky lg:bottom-0 bg-[#1D4ED8] text-white border-t-4 border-[#EA580C] pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
          <div ref={footerGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 — Brand */}
            <div className="footer-col space-y-4">
              <VlearninLogo variant="light" />
              <EditableText
                as="p"
                path="footer.description"
                value={content.footer.description}
                className="text-sm text-white/80 leading-relaxed"
              />
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
                  className="btn-gold px-5 py-2.5 text-xs uppercase tracking-wider cursor-pointer"
                >
                  <EditableText path="footer.demoButtonLabel" value={content.footer.demoButtonLabel} />
                </button>
              </div>
            </div>

            {/* Column 2 — Programmes */}
            <div className="footer-col">
              <EditableText
                as="h3"
                path="footer.programmesHeading"
                value={content.footer.programmesHeading}
                className="mc-footer-heading text-[#93C5FD] mb-5"
              />
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
            <div className="footer-col">
              <h3 className="mc-footer-heading text-[#93C5FD] mb-5">
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
            <div className="footer-col">
              <EditableText
                as="h3"
                path="footer.contactHeading"
                value={content.footer.contactHeading}
                className="mc-footer-heading text-[#93C5FD] mb-5"
              />
              <ul className="space-y-3 mc-footer-link text-white/85">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#93C5FD] shrink-0 mt-1" />
                  <span>
                    <EditableText path="brand.legalName" value={content.brand.legalName} />,{" "}
                    <EditableText path="brand.address" value={content.brand.address} />
                  </span>
                </li>
                <li>
                  <a
                    href={content.brand.phoneHref}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#93C5FD] shrink-0" />
                    <EditableText path="brand.phoneDisplay" value={content.brand.phoneDisplay} />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${content.brand.email}`}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#93C5FD] shrink-0" />
                    <EditableText path="brand.email" value={content.brand.email} />
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/75">
                  <Clock className="w-4 h-4 text-[#93C5FD] shrink-0 mt-1" />
                  <div>
                    <EditableText as="p" path="brand.weekdaysTiming" value={content.brand.weekdaysTiming} />
                    <EditableText as="p" path="brand.sundayTiming" value={content.brand.sundayTiming} className="mt-0.5" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/15 space-y-4">
            <p className="text-xs text-white/70 leading-relaxed">
              <strong className="text-white/90">Placement Assistance Disclaimer:</strong>{" "}
              <EditableText path="brand.placementDisclaimer" value={content.brand.placementDisclaimer} />
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
              <p>
                © {currentYear}{" "}
                <EditableText path="brand.legalName" value={content.brand.legalName} />.{" "}
                <EditableText path="footer.copyrightSuffix" value={content.footer.copyrightSuffix} />
              </p>
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
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[#1D4ED8] text-white border border-[#93C5FD] px-4 py-3 shadow-xl hover:bg-[#1D4ED8] transition-colors font-nav text-xs font-semibold uppercase tracking-wider rounded-[15px]"
      >
        <MessageCircle className="w-4 h-4 text-[#93C5FD]" />
        <span>WhatsApp Us</span>
      </a>

      {/* Mobile Fixed Bottom Action Bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1D4ED8] text-white border-t border-[#93C5FD] grid grid-cols-3 divide-x divide-white/15 rounded-[15px]"
        role="region"
        aria-label="Quick Contact Actions"
      >
        <a
          href={BRAND.phoneHref}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <Phone className="w-4 h-4 text-[#93C5FD] mb-0.5" />
          <span>Call Now</span>
        </a>
        <a
          href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like programme & demo details.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <MessageCircle className="w-4 h-4 text-[#93C5FD] mb-0.5" />
          <span>WhatsApp Us</span>
        </a>
        <button
          type="button"
          onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold bg-[#EA580C] text-white"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book Demo</span>
        </button>
      </div>
    </>
  );
}
