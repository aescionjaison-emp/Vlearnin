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
  { id: "all", label: "All Courses" },
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
      {/* Page Hero */}
      <section className="bg-[#071B3D] text-white py-16 lg:py-20 border-b-4 border-[#D4A54A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#D4A54A]">
            INDUSTRY-ORIENTED CERTIFICATION PROGRAMMES
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 max-w-3xl leading-tight">
            Practical Courses Built for Real-World Careers
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-4 max-w-3xl leading-relaxed">
            Every programme follows The V-Way to Learn, Build &amp; Lead—combining 30 hours of
            hands-on instruction, industry tools, real case studies, and a capstone portfolio
            project.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openDemoModal({ sourcePage: "/courses" })}
              className="btn-gold px-6 py-3 text-xs uppercase tracking-wider"
            >
              Book Free Demo Class
            </button>
            <button
              type="button"
              onClick={() => openBrochureModal({ brochureType: "complete" })}
              className="border border-white/60 text-white hover:bg-white hover:text-[#071B3D] font-nav font-semibold px-6 py-3 text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Complete Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="bg-[#F4F7FC] border-b border-[#DFE5EE] py-6 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
                  className={`font-nav text-xs font-semibold px-4 py-2.5 border transition-colors ${
                    active
                      ? "bg-[#071B3D] text-white border-[#071B3D]"
                      : "bg-white text-[#101828] border-[#DFE5EE] hover:border-[#071B3D]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programmes or tools..."
              aria-label="Search certification programmes"
              className="w-full bg-white border border-[#DFE5EE] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1746A2]"
            />
          </div>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {activeTab !== "combos" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#071B3D]">
                  Standalone Certification Programmes ({filteredCourses.length})
                </h2>
              </div>

              {filteredCourses.length === 0 ? (
                <p className="text-[#667085] py-8 border border-[#DFE5EE] text-center">
                  No programmes matched your search. Clear filters to view all 7 certifications.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredCourses.map((course) => (
                    <article
                      key={course.slug}
                      className="group border border-[#DFE5EE] bg-white hover:border-[#1746A2] transition-all flex flex-col shadow-xs hover:shadow-lg"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-[#071B3D]/90 text-[#E6C47A] font-nav text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1">
                          {course.categoryName}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          <h3 className="text-lg font-bold text-[#071B3D]">{course.title}</h3>
                          <div className="flex flex-wrap gap-3 text-xs font-nav text-[#667085]">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#D4A54A]" />
                              {course.durationHours} Hours
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5 text-[#1746A2]" />5 Modules
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-[#D4A54A]" />
                              Capstone
                            </span>
                          </div>
                          <p className="text-sm text-[#667085] leading-relaxed">{course.summary}</p>
                          <p className="text-xs text-[#101828]">
                            <strong className="font-nav">Ideal For:</strong> {course.idealFor}
                          </p>
                          <p className="text-xs font-nav font-semibold text-[#1746A2]">
                            Fee: Request Fee Details
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#DFE5EE]">
                          <Link
                            href={`/courses/${course.slug}`}
                            className="btn-outline-navy py-2.5 text-xs text-center"
                          >
                            View Syllabus
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              openDemoModal({
                                preselectedProgramme: course.title,
                                sourcePage: "/courses",
                              })
                            }
                            className="btn-gold py-2.5 text-xs"
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
              <h2 className="text-2xl font-bold text-[#071B3D] mb-6">
                Dual-Skill Career Accelerator Combos ({filteredCombos.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {filteredCombos.map((combo) => (
                  <article
                    key={combo.slug}
                    className="border border-[#DFE5EE] bg-[#F4F7FC] p-7 flex flex-col justify-between space-y-5 hover:border-[#D4A54A] transition-colors"
                  >
                    <div className="space-y-3">
                      <span className="inline-block font-nav text-xs font-bold bg-[#071B3D] text-[#D4A54A] px-3 py-1">
                        {combo.durationLabel}
                      </span>
                      <h3 className="text-xl font-bold text-[#071B3D]">{combo.title}</h3>
                      <p className="text-sm font-nav font-semibold text-[#1746A2]">
                        {combo.includedLabel}
                      </p>
                      <p className="text-sm text-[#667085]">{combo.summary}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#DFE5EE]">
                      <Link
                        href={`/career-combos/${combo.slug}`}
                        className="font-nav text-xs font-bold uppercase tracking-wider text-[#071B3D] hover:text-[#1746A2] inline-flex items-center gap-1.5"
                      >
                        <span>View Track</span>
                        <ArrowRight className="w-4 h-4 text-[#D4A54A]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          openDemoModal({
                            preselectedProgramme: `${combo.title} (${combo.durationLabel})`,
                            sourcePage: "/courses",
                          })
                        }
                        className="btn-gold px-4 py-2 text-xs"
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

      {/* 19 — COURSE PAGE BOTTOM CTA */}
      <section className="bg-[#071B3D] text-white py-16 border-t-4 border-[#D4A54A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Not Sure Which Track Fits Your Career Goal?
          </h2>
          <p className="text-base text-white/80">
            Book a free 15-minute career counseling session or attend a live demo class at our{" "}
            {BRAND.shortLocation} center.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openDemoModal({ sourcePage: "/courses-bottom-cta" })}
              className="btn-gold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider"
            >
              Book Free Demo Class
            </button>
            <a
              href={buildWhatsAppUrl(
                "Hello VLEARNIN, I would like career counseling to choose the right certification programme.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 hover:bg-white hover:text-[#071B3D] text-white font-nav font-semibold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#D4A54A]" />
              Chat on WhatsApp ({BRAND.phoneDisplay})
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
