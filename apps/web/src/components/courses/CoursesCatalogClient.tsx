"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Award,
  BookOpen,
  Clock,
  MessageCircle,
  Search,
  ArrowRight,
  Download,
} from "lucide-react";
import {
  BRAND,
  OfficialComboSeed,
  OfficialCourseSeed,
  buildWhatsAppUrl,
} from "@vlearnin/shared";
import { useLeadModal } from "@/components/LeadModalProvider";

const TABS = [
  { id: "all", label: "All Programmes" },
  { id: "ai-business-intelligence", label: "AI & Business Intelligence" },
  { id: "corporate-finance-capital-markets", label: "Finance & Investment Banking" },
  { id: "digital-marketing-creative-media", label: "Digital Marketing & Media" },
  { id: "combos", label: "Career Combos" },
];

export function CoursesCatalogClient({
  courses,
  combos,
}: {
  courses: OfficialCourseSeed[];
  combos: OfficialComboSeed[];
}) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [activeTab, setActiveTab] = useState(initialCat);
  const [query, setQuery] = useState("");
  const { openDemoModal, openBrochureModal } = useLeadModal();

  const filteredCourses = useMemo(() => {
    if (activeTab === "combos") return [];
    return courses.filter((c) => {
      const matchCat = activeTab === "all" || c.categorySlug === activeTab;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tools.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [courses, activeTab, query]);

  const filteredCombos = useMemo(() => {
    if (activeTab !== "all" && activeTab !== "combos") return [];
    const q = query.trim().toLowerCase();
    return combos.filter(
      (c) =>
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.includedLabel.toLowerCase().includes(q),
    );
  }, [combos, activeTab, query]);

  return (
    <div className="bg-white">
      {/* JAIN Programs Inspired Diagonal-Split Page Banner */}
      <section className="bg-white border-b border-[#E2E8F0] overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 px-6 sm:px-10 lg:pl-16 lg:pr-8 py-12 lg:py-16 flex flex-col justify-center space-y-4">
            <nav aria-label="Breadcrumb" className="text-xs font-nav text-[#5C6672] flex items-center gap-2">
              <Link href="/" className="text-[#16529A] hover:underline">Home</Link>
              <span>/</span>
              <span>Programmes</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#16529A] leading-tight">
              Industry-Oriented Certification Programmes
            </h1>
            <p className="text-base sm:text-[17px] text-[#5C6672] leading-relaxed">
              Every programme follows The V-Way to Learn, Build &amp; Lead—combining 30 hours of
              hands-on instruction, industry tools, real case studies, and a capstone portfolio
              project.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "/courses" })}
                className="btn-primary-amber px-6 py-3 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                Book Free Demo Class
              </button>
              <button
                type="button"
                onClick={() => openBrochureModal({ brochureType: "complete" })}
                className="btn-outline-navy px-6 py-3 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[360px]">
            <div className="absolute inset-0 jain-slant-photo-lg">
              <Image
                src="/images/hero-2.jpg"
                alt="VLEARNIN practical certification training"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="bg-[#F5F7FA] border-b border-[#E2E8F0] py-5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Course Categories">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-nav text-xs sm:text-sm font-semibold px-4 py-2.5 border transition-colors cursor-pointer ${
                    active
                      ? "bg-[#082F62] text-white border-[#082F62]"
                      : "bg-white text-[#212529] border-[#E2E8F0] hover:border-[#16529A]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#5C6672] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programmes or tools..."
              aria-label="Search certification programmes"
              className="w-full bg-white border border-[#E2E8F0] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#16529A]"
            />
          </div>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-16">
          {activeTab !== "combos" && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#082F62] mb-6">
                Standalone Certification Programmes ({filteredCourses.length})
              </h2>

              {filteredCourses.length === 0 ? (
                <p className="text-[#5C6672] py-8 border border-[#E2E8F0] text-center">
                  No programmes matched your search. Clear filters to view all 7 certifications.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredCourses.map((course) => (
                    <article
                      key={course.slug}
                      className="mc-card-hover group border border-[#E2E8F0] bg-white hover:border-[#16529A] flex flex-col shadow-xs"
                    >
                      <div className="relative h-52 w-full overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover mc-image-zoom"
                        />
                        <div className="absolute top-3 left-3 bg-[#082F62]/90 text-[#F4C430] font-nav text-[11px] font-bold uppercase tracking-wider px-2.5 py-1">
                          {course.categoryName}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-[#082F62]">{course.title}</h3>
                          <div className="flex flex-wrap gap-3 text-xs font-nav text-[#5C6672]">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#F58220]" />
                              {course.durationHours} Hours
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5 text-[#16529A]" />5 Modules
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-[#F58220]" />
                              Capstone
                            </span>
                          </div>
                          <p className="text-sm text-[#5C6672] leading-relaxed">{course.summary}</p>
                          <p className="text-xs text-[#212529]">
                            <strong className="font-nav">Ideal For:</strong> {course.idealFor}
                          </p>
                          <p className="text-xs font-nav font-semibold text-[#16529A]">
                            Fee: Request Fee Details
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E2E8F0]">
                          <Link
                            href={`/courses/${course.slug}`}
                            className="btn-navy py-2.5 text-xs text-center"
                          >
                            Know More
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              openDemoModal({
                                preselectedProgramme: course.title,
                                sourcePage: "/courses",
                              })
                            }
                            className="btn-primary-amber py-2.5 text-xs cursor-pointer"
                          >
                            Enquire Now
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {filteredCombos.length > 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#082F62] mb-6">
                Dual-Skill Career Accelerator Combos ({filteredCombos.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {filteredCombos.map((combo) => (
                  <article
                    key={combo.slug}
                    className="border border-[#E2E8F0] bg-[#F5F7FA] p-7 flex flex-col justify-between space-y-5 hover:border-[#16529A] transition-colors"
                  >
                    <div className="space-y-3">
                      <span className="inline-block font-nav text-xs font-bold bg-[#082F62] text-[#F4C430] px-3 py-1">
                        {combo.durationLabel}
                      </span>
                      <h3 className="text-xl font-bold text-[#082F62]">{combo.title}</h3>
                      <p className="text-sm font-nav font-semibold text-[#16529A]">
                        {combo.includedLabel}
                      </p>
                      <p className="text-sm text-[#5C6672]">{combo.summary}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                      <Link
                        href={`/career-combos/${combo.slug}`}
                        className="font-nav text-xs font-bold uppercase tracking-wider text-[#16529A] hover:text-[#082F62] inline-flex items-center gap-1.5"
                      >
                        <span>View Track</span>
                        <ArrowRight className="w-4 h-4 text-[#F58220]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          openDemoModal({
                            preselectedProgramme: `${combo.title} (${combo.durationLabel})`,
                            sourcePage: "/courses",
                          })
                        }
                        className="btn-primary-amber px-4 py-2 text-xs cursor-pointer"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#082F62] text-white py-16 border-t-4 border-[#F58220]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Not Sure Which Track Fits Your Career Goal?
          </h2>
          <p className="text-base text-white/85">
            Book a free 15-minute career counseling session or attend a live demo class at our{" "}
            {BRAND.shortLocation} center.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openDemoModal({ sourcePage: "/courses-bottom-cta" })}
              className="btn-gold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              Book Free Demo Class
            </button>
            <a
              href={buildWhatsAppUrl(
                "Hello VLEARNIN, I would like career counseling to choose the right certification programme.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 hover:bg-white hover:text-[#082F62] text-white font-nav font-semibold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#F4C430]" />
              Chat on WhatsApp ({BRAND.phoneDisplay})
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
