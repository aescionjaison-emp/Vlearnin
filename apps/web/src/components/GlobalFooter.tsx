"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Clock, Calendar } from "lucide-react";

function WhatsAppGlyph({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.004 3.2C8.944 3.2 3.2 8.942 3.2 16c0 2.256.59 4.458 1.71 6.4L3.09 29.04l6.8-1.784A12.76 12.76 0 0 0 16.004 28.8C23.06 28.8 28.8 23.058 28.8 16c0-7.058-5.74-12.8-12.796-12.8Zm0 23.434a10.6 10.6 0 0 1-5.402-1.476l-.388-.23-4.036 1.058 1.078-3.936-.252-.404a10.58 10.58 0 0 1-1.628-5.646c0-5.862 4.77-10.632 10.632-10.632 5.86 0 10.63 4.77 10.63 10.632 0 5.864-4.77 10.634-10.634 10.634Zm5.834-7.964c-.32-.16-1.894-.934-2.188-1.04-.294-.108-.508-.16-.72.16-.214.32-.826 1.04-1.014 1.254-.186.214-.374.24-.694.08-.32-.16-1.35-.498-2.572-1.586-.95-.848-1.592-1.894-1.778-2.214-.186-.32-.02-.494.14-.654.144-.144.32-.374.48-.56.16-.186.214-.32.32-.534.108-.214.054-.4-.026-.56-.08-.16-.72-1.734-.988-2.374-.26-.624-.524-.54-.72-.55-.186-.01-.4-.01-.614-.01-.214 0-.56.08-.854.4-.294.32-1.12 1.094-1.12 2.668 0 1.574 1.146 3.094 1.306 3.308.16.214 2.256 3.444 5.464 4.83.764.33 1.36.526 1.824.674.766.244 1.464.21 2.014.128.614-.092 1.894-.774 2.16-1.522.268-.748.268-1.388.188-1.522-.08-.134-.294-.214-.614-.374Z" />
    </svg>
  );
}
import { BRAND, buildWhatsAppUrl } from "@vlearnin/shared";
import { VlearninLogo } from "./VlearninLogo";
import { useLeadModal } from "./LeadModalProvider";
import { useSiteContent } from "./SiteContentProvider";
import { EditableText } from "./EditableText";

/**
 * Normal Document-Flow Institutional Footer.
 * All links and contact details remain immediately visible with underline & arrow microinteractions.
 */
export function GlobalFooter({ forceShow = false }: { forceShow?: boolean }) {
  const pathname = usePathname();
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();

  if (!forceShow && pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#F8FAFC] text-[#10264A] border-t border-[#E1E6EC] pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 — Brand */}
            <div className="space-y-4">
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
                  className="btn-navy mc-icon-btn px-5 py-2.5 text-xs tracking-wide cursor-pointer"
                >
                  <EditableText path="footer.demoButtonLabel" value={content.footer.demoButtonLabel} />
                </button>
              </div>
            </div>

            {/* Column 2 — Programmes */}
            <div>
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
            <div>
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
            <div>
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

      <a
        href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like to know more about your certification programmes.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VLEARNIN on WhatsApp"
        title="Chat on WhatsApp"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 w-14 h-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.38)] hover:bg-[#20BD5A] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <WhatsAppGlyph className="w-8 h-8" />
      </a>

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
          <WhatsAppGlyph className="w-4 h-4 text-[#25D366] mb-0.5" />
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
