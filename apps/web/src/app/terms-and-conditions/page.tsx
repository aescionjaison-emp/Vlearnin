import React from "react";
import type { Metadata } from "next";
import { BRAND } from "@vlearnin/shared";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for VLEARNIN Academy programmes, certifications, and website use.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
          LEGAL &amp; GOVERNANCE
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A]">Terms &amp; Conditions</h1>
        <p className="text-sm text-[#4B5563]">
          By accessing {BRAND.website} or enrolling in a programme at {BRAND.legalName}, you agree
          to the following terms.
        </p>

        <div className="space-y-4 text-sm text-[#111827] leading-relaxed">
          <h2 className="text-xl font-bold text-[#1E3A8A] pt-2">1. Certification Eligibility</h2>
          <p>
            VLEARNIN certificates are issued upon meeting attendance requirements and completing
            the practical capstone project and assessment. Issued credentials can be verified online
            and may be revoked if obtained through misrepresentation.
          </p>

          <h2 className="text-xl font-bold text-[#1E3A8A] pt-2">2. Placement Assistance</h2>
          <p>{BRAND.placementDisclaimer}</p>

          <h2 className="text-xl font-bold text-[#1E3A8A] pt-2">3. Intellectual Property</h2>
          <p>
            All curriculum syllabi, capstone templates, brochures, and brand assets on this website
            belong to {BRAND.legalName} and may not be reproduced commercially without written
            permission.
          </p>

          <h2 className="text-xl font-bold text-[#1E3A8A] pt-2">4. Jurisdiction</h2>
          <p>
            These terms are governed by the laws of India, with jurisdiction in Bengaluru, Karnataka.
          </p>
        </div>
      </div>
    </div>
  );
}
