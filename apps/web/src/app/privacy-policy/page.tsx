import React from "react";
import type { Metadata } from "next";
import { BRAND } from "@vlearnin/shared";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and learner data protection standards for VLEARNIN Academy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#10264A]">Privacy Policy</h1>
        <p className="text-sm text-[#526477]">
          {BRAND.legalName} ({BRAND.address}) is committed to protecting the privacy of prospective
          learners, enrolled students, institutional partners, and employers.
        </p>

        <div className="space-y-4 text-sm text-[#10264A] leading-relaxed">
          <h2 className="text-xl font-bold text-[#10264A] pt-2">1. Information We Collect</h2>
          <p>
            When you submit an enquiry, book a demo class, or request a brochure, we collect only
            necessary contact details (full name, phone/WhatsApp number, qualification, optional
            email, and programme interest) along with your explicit consent record.
          </p>

          <h2 className="text-xl font-bold text-[#10264A] pt-2">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to share requested brochures, schedule demo classes,
            provide fee and batch details, and deliver academic or placement support. We do not sell
            personal data to third parties.
          </p>

          <h2 className="text-xl font-bold text-[#10264A] pt-2">3. Certificate Verification Privacy</h2>
          <p>
            Public certificate verification endpoints display only credential validity, recipient
            display name, programme completed, duration, capstone status, issue date, and issuing
            authority. Private student phone numbers, email addresses, and residential details are
            never exposed publicly.
          </p>

          <h2 className="text-xl font-bold text-[#10264A] pt-2">4. Safeguarding Minors</h2>
          <p>
            Prospective learners under 18 years of age are required to involve a parent or legal
            guardian during enrollment and consent verification.
          </p>

          <h2 className="text-xl font-bold text-[#10264A] pt-2">5. Contact for Privacy Requests</h2>
          <p>
            For data access, correction, or deletion requests, email{" "}
            <a href={`mailto:${BRAND.email}`} className="text-[#10264A] underline">
              {BRAND.email}
            </a>{" "}
            or call {BRAND.phoneDisplay}.
          </p>
        </div>
      </div>
    </div>
  );
}
