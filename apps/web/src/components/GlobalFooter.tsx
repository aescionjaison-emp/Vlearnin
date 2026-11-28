"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone, Clock, Calendar } from "lucide-react";
import { BRAND, buildWhatsAppUrl } from "@vlearnin/shared";
import { VlearninLogo } from "./VlearninLogo";
import { useLeadModal } from "./LeadModalProvider";
import { useSiteContent } from "./SiteContentProvider";
import { EditableText } from "./EditableText";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

/**
 * Normal Document-Flow Institutional Footer with Short Staggered Column Entrances.
 */
export function GlobalFooter({ forceShow = false }: { forceShow?: boolean }) {
  const pathname = usePathname();
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = gridRef.current;
    if (!scope || isReducedMotionOrDisabled()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col-v3",
        { y: 18, opacity: 0.55 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: scope, start: "top 92%", once: true },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  if (!forceShow && pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#F8FAFC] text-[#10264A] border-t border-[#E1E6EC] pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 — Brand */}
            <div className="footer-col-v3 space-y-4">
              <VlearninLogo variant="dark" />
              <EditableText
                as="p"
                path="footer.description"
                value={content.footer.description}
                className="text-sm text-[#526477] leading-relaxed"
              />
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
                  className="btn-navy px-5 py-2.5 text-xs tracking-wide cursor-pointer"
                >
                  <EditableText path="footer.demoButtonLabel" value={content.footer.demoButtonLabel} />
                </button>
              </div>
            </div>

            {/* Column 2 — Programmes */}
            <div className="footer-col-v3">
              <EditableText
                as="h3"
                path="footer.programmesHeading"
                value={content.footer.programmesHeading}
                className="mc-footer-heading text-[#10264A] mb-5"
              />
              <ul className="space-y-2.5 mc-footer-link text-[#526477]">
                <li>
                  <Link href="/courses?category=ai-business-intelligence" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    AI &amp; Business Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/courses/financial-modelling-for-business" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Corporate Finance
                  </Link>
                </li>
                <li>
                  <Link href="/courses/investment-banking-professional" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Investment Banking
                  </Link>
                </li>
                <li>
                  <Link href="/courses/ai-powered-digital-marketing" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/courses/video-editing-reels-production" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Creative Media &amp; Video Editing
                  </Link>
                </li>
                <li>
                  <Link href="/career-combos" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Career Combos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — Institutional Links */}
            <div className="footer-col-v3">
              <h3 className="mc-footer-heading text-[#10264A] mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2.5 mc-footer-link text-[#526477]">
                <li>
                  <Link href="/about" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/placement-assistance" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Placement Assistance
                  </Link>
                </li>
                <li>
                  <Link href="/academic-partnerships" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Academic Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/verify-certificate" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Verify Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/hire-from-vlearnin" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Hire From VLEARNIN
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div className="footer-col-v3">
              <EditableText
                as="h3"
                path="footer.contactHeading"
                value={content.footer.contactHeading}
                className="mc-footer-heading text-[#10264A] mb-5"
              />
              <ul className="space-y-3 mc-footer-link text-[#526477]">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#2463A6] shrink-0 mt-1" />
                  <span>
                    <EditableText path="brand.legalName" value={content.brand.legalName} />,{" "}
                    <EditableText path="brand.address" value={content.brand.address} />
                  </span>
                </li>
                <li>
                  <a
                    href={content.brand.phoneHref}
                    className="flex items-center gap-2.5 hover:text-[#2463A6] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#2463A6] shrink-0" />
                    <EditableText path="brand.phoneDisplay" value={content.brand.phoneDisplay} />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${content.brand.email}`}
                    className="flex items-center gap-2.5 hover:text-[#2463A6] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#2463A6] shrink-0" />
                    <EditableText path="brand.email" value={content.brand.email} />
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#718096]">
                  <Clock className="w-4 h-4 text-[#2463A6] shrink-0 mt-1" />
                  <div>
                    <EditableText as="p" path="brand.weekdaysTiming" value={content.brand.weekdaysTiming} />
                    <EditableText as="p" path="brand.sundayTiming" value={content.brand.sundayTiming} className="mt-0.5" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E1E6EC] space-y-4">
            <p className="text-xs text-[#718096] leading-relaxed">
              <strong className="text-[#10264A]">Placement Assistance Disclaimer:</strong>{" "}
              <EditableText path="brand.placementDisclaimer" value={content.brand.placementDisclaimer} />
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#526477]">
              <p>
                © {currentYear}{" "}
                <EditableText path="brand.legalName" value={content.brand.legalName} />.{" "}
                <EditableText path="footer.copyrightSuffix" value={content.footer.copyrightSuffix} />
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" className="mc-underline-link hover:text-[#2463A6] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="mc-underline-link hover:text-[#2463A6] transition-colors">
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
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[#10264A] text-white border border-[#17324D] px-4 py-2.5 shadow-lg hover:bg-[#17324D] transition-colors font-nav text-xs font-semibold tracking-wide rounded-[6px]"
      >
        <MessageCircle className="w-4 h-4 text-[#C49A59]" />
        <span>WhatsApp Us</span>
      </a>

      {/* Mobile Fixed Bottom Action Bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#17324D] text-white border-t border-[#E1E6EC]/20 grid grid-cols-3 divide-x divide-white/15"
        role="region"
        aria-label="Quick Contact Actions"
      >
        <a
          href={BRAND.phoneHref}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <Phone className="w-4 h-4 text-[#C49A59] mb-0.5" />
          <span>Call Now</span>
        </a>
        <a
          href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like programme & demo details.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold hover:bg-white/10"
        >
          <MessageCircle className="w-4 h-4 text-[#C49A59] mb-0.5" />
          <span>WhatsApp Us</span>
        </a>
        <button
          type="button"
          onClick={() => openDemoModal({ sourcePage: pathname || "/" })}
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-nav font-semibold bg-[#2463A6] text-white"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book Demo</span>
        </button>
      </div>
    </>
  );
}
