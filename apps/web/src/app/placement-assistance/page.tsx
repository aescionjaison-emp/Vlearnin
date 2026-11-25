import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Layers,
  ArrowRight,
} from "lucide-react";
import { BRAND, CAREER_PATHWAYS } from "@vlearnin/shared";

export const metadata: Metadata = {
  title: "Placement Assistance & Career Support",
  description:
    "VLEARNIN bridges the gap between certification and employment through live capstone portfolios, ATS resume optimization, mock interviews, and curated employer connections.",
};

const STAGES = [
  {
    number: "01",
    title: "Live Capstone Portfolio",
    icon: Layers,
    summary:
      "Graduate with tangible, employer-reviewable work rather than just a certificate.",
    details: [
      "Interactive multi-page Power BI executive dashboards",
      "Dynamic 3-statement Excel & DCF valuation models",
      "Custom workplace AI automation workflows",
      "Performance ad plans, content calendars & video showreels",
    ],
  },
  {
    number: "02",
    title: "ATS Resume & LinkedIn Makeover",
    icon: FileCheck2,
    summary:
      "Personalized profile optimization tailored to finance, analytics, and digital marketing recruiters.",
    details: [
      "Role-specific keyword alignment for ATS screening",
      "Structuring capstone projects as measurable portfolio entries",
      "LinkedIn headline, summary, and featured project setup",
    ],
  },
  {
    number: "03",
    title: "Mock Interviews & Domain Prep",
    icon: GraduationCap,
    summary:
      "Structured practice rounds to build technical clarity and interview confidence.",
    details: [
      "Domain-specific technical Q&A (DAX, Excel, Finance, Marketing)",
      "HR & behavioral interview readiness",
      "Actionable mentor feedback after each mock round",
    ],
  },
  {
    number: "04",
    title: "Curated Hiring Network",
    icon: Briefcase,
    summary:
      "Access to available internship and full-time openings through verified employer connections.",
    details: [
      "Direct sharing of consented candidate portfolios with hiring teams",
      "Internship and entry-level opportunities across Bengaluru",
      "Ongoing career guidance during placement drives",
    ],
  },
];

export default function PlacementAssistancePage() {
  return (
    <div className="bg-white">
      <section className="bg-[#1E3A8A] text-white py-16 lg:py-20 border-b-4 border-[#EA580C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#EA580C]">
            CAREER &amp; PLACEMENT ASSISTANCE
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 max-w-3xl">
            Structured Placement Assistance — From Classroom to Corporate
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-4 max-w-3xl">
            We bridge the gap between certification and employment through portfolio building,
            interview preparation, and verified employer connections.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <article
                  key={stage.number}
                  className="border border-[#E5E7EB] bg-[#F8FAFC] p-8 space-y-4 rounded-[15px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-nav text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
                      Stage {stage.number}
                    </span>
                    <Icon className="w-6 h-6 text-[#EA580C]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E3A8A]">{stage.title}</h2>
                  <p className="text-sm text-[#4B5563]">{stage.summary}</p>
                  <ul className="space-y-2 pt-2">
                    {stage.details.map((d) => (
                      <li key={d} className="text-sm text-[#111827] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* Potential Career Pathways */}
          <div className="border border-[#E5E7EB] p-8 bg-white space-y-6 rounded-[15px]">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
                POTENTIAL CAREER PATHWAYS
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mt-1">
                Roles Our Graduates Prepare For
              </h2>
              <p className="text-sm text-[#4B5563] mt-2">
                Depending on your chosen certification or career combo, you build job-ready
                capabilities aligned with these roles:
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {CAREER_PATHWAYS.map((role) => (
                <span
                  key={role}
                  className="font-nav text-xs font-bold text-[#1E3A8A] bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-[15px]"
                >
                  {role}
                </span>
              ))}
            </div>

            <div className="p-4 bg-[#F8FAFC] border-l-4 border-[#1E3A8A] text-xs text-[#4B5563] rounded-[15px]">
              <strong className="text-[#1E3A8A]">Mandatory Placement Disclaimer:</strong>{" "}
              {BRAND.placementDisclaimer}
            </div>
          </div>

          <div className="bg-[#1E3A8A] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[15px]">
            <div>
              <h3 className="text-2xl font-bold">Looking to Hire VLEARNIN Graduates?</h3>
              <p className="text-sm text-white/75 mt-1">
                Submit your role requirements to receive consented, portfolio-verified candidate profiles.
              </p>
            </div>
            <Link
              href="/hire-from-vlearnin"
              className="btn-gold px-6 py-3 text-xs uppercase tracking-wider inline-flex items-center gap-2 shrink-0"
            >
              <span>Hire From VLEARNIN</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
