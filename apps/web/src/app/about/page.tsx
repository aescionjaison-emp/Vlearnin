import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { BRAND, OFFICIAL_CATEGORIES } from "@vlearnin/shared";

export const metadata: Metadata = {
  title: "About VLEARNIN Academy | Bengaluru",
  description:
    "Learn about VLEARNIN Academy in Rajajinagar, Bengaluru—our educational philosophy, The V-Way to Learn, Build & Lead, and our practical certification methodology.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#1E3A8A] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl">
            The V-Way to Learn, Build &amp; Lead.
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-3 max-w-2xl leading-relaxed">
            Practical, mentor-led certification training in Bengaluru built for real workplace execution.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Who We Are & Campus Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-3xl font-bold text-[#1E3A8A]">Who We Are</h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                Based in Rajajinagar, Bengaluru, VLEARNIN delivers 30-hour hands-on certifications
                across five structured modules—ending with an evaluated capstone project.
              </p>
            </div>
            <div className="lg:col-span-6 relative aspect-[4/3] border border-[#E5E7EB] overflow-hidden shadow-md rounded-[15px]">
              <Image
                src="/images/about-campus.jpg"
                alt="Classroom mentorship session at VLEARNIN Academy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Vision, Mission, Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="p-7 bg-[#F8FAFC] border-t-4 border-[#1E3A8A] space-y-3">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Our Educational Philosophy</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                We believe skill mastery comes from doing. Rather than passive slide decks, our
                sessions emphasize live datasets, real financial models, active ad managers, and
                hands-on production workflows.
              </p>
            </div>
            <div className="p-7 bg-[#F8FAFC] border-t-4 border-[#1D4ED8] space-y-3">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Our Vision</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                To empower students, graduates, and working professionals with practical,
                industry-aligned capabilities that translate directly into workplace confidence.
              </p>
            </div>
            <div className="p-7 bg-[#F8FAFC] border-t-4 border-[#1D4ED8] space-y-3">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Our Mission</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Deliver focused 30-hour certifications and campus courses backed by capstone projects
                and QR-verified credentials.
              </p>
            </div>
          </div>

          {/* Core Learning Domains */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#1E3A8A]">Core Learning Domains</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OFFICIAL_CATEGORIES.map((cat) => (
                <div key={cat.slug} className="border border-[#E5E7EB] p-6 space-y-3 rounded-[15px]">
                  <h3 className="text-lg font-bold text-[#1E3A8A]">{cat.name}</h3>
                  <p className="text-sm text-[#4B5563]">{cat.description}</p>
                  <Link
                    href={`/courses?category=${cat.slug}`}
                    className="inline-flex items-center gap-1.5 font-nav text-xs font-bold text-[#1D4ED8]"
                  >
                    Explore Domain <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology, Mentorship, Career Readiness, Academic Collaboration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[#E5E7EB] p-7 space-y-2 rounded-[15px]">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Practical Learning Methodology</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Each module pairs guided instructor demonstrations with hands-on exercises,
                case studies, and a final capstone project evaluated on real-world clarity.
              </p>
            </div>
            <div className="border border-[#E5E7EB] p-7 space-y-2 rounded-[15px]">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Small-Batch Mentorship</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Focused batch sizes ensure every learner receives individual doubt resolution,
                tool troubleshooting, and feedback on their capstone portfolio.
              </p>
            </div>
            <div className="border border-[#E5E7EB] p-7 space-y-2 rounded-[15px]">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Career Readiness</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Learners receive ATS resume structuring, LinkedIn optimization, mock interview
                practice, and access to curated employer opportunities.
              </p>
            </div>
            <div className="border border-[#E5E7EB] p-7 space-y-2 rounded-[15px]">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Academic Collaboration</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                We partner with degree colleges and management institutes across Bengaluru and
                Karnataka to deliver on-campus and hybrid value-added certifications.
              </p>
            </div>
          </div>

          {/* Visit Rajajinagar Center */}
          <div className="bg-[#1E3A8A] text-white p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-[15px]">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Visit Our Rajajinagar Center</h2>
              <div className="space-y-2 text-sm text-white/85">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-1" />
                  <span>{BRAND.legalName}, {BRAND.address}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#EA580C]" />
                  <span>{BRAND.phoneDisplay}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#EA580C]" />
                  <span>{BRAND.email}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#EA580C] shrink-0 mt-1" />
                  <span>{BRAND.timings.weekdays} | {BRAND.timings.sunday}</span>
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="btn-gold px-7 py-3.5 text-xs uppercase tracking-wider"
              >
                Book Campus Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
