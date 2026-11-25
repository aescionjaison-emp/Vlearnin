"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  GraduationCap,
  Layers,
  MapPin,
  Wrench,
} from "lucide-react";
import { OfficialCourseSeed } from "@vlearnin/shared";
import { useLeadModal } from "@/components/LeadModalProvider";

export function CourseDetailClient({
  course,
  relatedCourses,
}: {
  course: OfficialCourseSeed;
  relatedCourses: OfficialCourseSeed[];
}) {
  const { openDemoModal, openBrochureModal } = useLeadModal();
  const [openModule, setOpenModule] = useState<number>(1);

  return (
    <div className="bg-white">
      {/* Course Hero */}
      <section className="bg-[#071B3D] text-white py-14 lg:py-20 border-b-4 border-[#D4A54A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-xs font-nav text-white/70 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white">Courses</Link>
            <span>/</span>
            <span className="text-[#E6C47A]">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block font-nav text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A54A] border border-[#D4A54A]/50 px-3 py-1">
                {course.categoryName}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight">
                {course.title}
              </h1>
              <p className="text-base text-white/85 leading-relaxed">{course.summary}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/10 p-3.5 border border-white/15">
                  <p className="font-nav text-[10px] uppercase tracking-wider text-[#D4A54A]">Duration</p>
                  <p className="text-sm font-semibold mt-1">{course.durationHours} Hours (5 Modules)</p>
                </div>
                <div className="bg-white/10 p-3.5 border border-white/15">
                  <p className="font-nav text-[10px] uppercase tracking-wider text-[#D4A54A]">Delivery Modes</p>
                  <p className="text-sm font-semibold mt-1">Rajajinagar / Live / Campus</p>
                </div>
                <div className="bg-white/10 p-3.5 border border-white/15 col-span-2 sm:col-span-1">
                  <p className="font-nav text-[10px] uppercase tracking-wider text-[#D4A54A]">Programme Fee</p>
                  <p className="text-sm font-semibold mt-1">Request Fee Details</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    openDemoModal({
                      preselectedProgramme: course.title,
                      sourcePage: `/courses/${course.slug}`,
                    })
                  }
                  className="btn-gold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider"
                >
                  Enroll / Enquire Now
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openBrochureModal({
                      preselectedProgramme: course.title,
                      brochureType: "course",
                      brochureSlug: course.slug,
                    })
                  }
                  className="border border-white/70 hover:bg-white hover:text-[#071B3D] text-white font-nav font-semibold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Syllabus PDF
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full border-2 border-[#D4A54A]/60 overflow-hidden shadow-2xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Enquiry Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview & Ideal Audience */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071B3D]">Programme Overview</h2>
              <p className="text-base text-[#667085] leading-relaxed">{course.overview}</p>
              <div className="p-5 bg-[#F4F7FC] border-l-4 border-[#1746A2] flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#1746A2] shrink-0 mt-0.5" />
                <div>
                  <p className="font-nav text-xs font-bold uppercase tracking-wider text-[#071B3D]">
                    Ideal For
                  </p>
                  <p className="text-sm text-[#101828] mt-1">{course.idealFor}</p>
                </div>
              </div>
            </div>

            {/* Tools Covered */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#071B3D] flex items-center gap-2.5">
                <Wrench className="w-5 h-5 text-[#D4A54A]" />
                Tools &amp; Platforms Covered
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {course.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-nav text-xs font-semibold bg-[#F4F7FC] text-[#071B3D] border border-[#DFE5EE] px-4 py-2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* 5-Module Expandable Syllabus */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#071B3D] flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-[#1746A2]" />
                  Five-Module Curriculum (30 Hours)
                </h2>
              </div>

              <div className="border border-[#DFE5EE] divide-y divide-[#DFE5EE]">
                {course.modules.map((mod) => {
                  const isOpen = openModule === mod.moduleNumber;
                  return (
                    <div key={mod.moduleNumber} className="bg-white">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenModule(isOpen ? 0 : mod.moduleNumber)
                        }
                        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F4F7FC] transition-colors"
                      >
                        <div>
                          <span className="font-nav text-[11px] font-bold uppercase tracking-wider text-[#1746A2]">
                            Module {mod.moduleNumber} • {mod.durationHours} Hours
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-[#071B3D] mt-0.5">
                            {mod.title}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#071B3D] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 bg-[#F4F7FC]/60 space-y-3">
                          <p className="text-sm text-[#667085]">{mod.summary}</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mod.topics.map((topic) => (
                              <li
                                key={topic}
                                className="text-sm text-[#101828] flex items-start gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#D4A54A] shrink-0 mt-0.5" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Learning Outcomes */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#071B3D]">Key Learning Outcomes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="p-4 border border-[#DFE5EE] bg-[#F4F7FC] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#1746A2] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#101828] leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capstone Project */}
            <div className="bg-[#071B3D] text-white p-7 border-l-4 border-[#D4A54A] space-y-3">
              <div className="flex items-center gap-2 text-[#D4A54A] font-nav text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Practical Capstone &amp; Assessment</span>
              </div>
              <h3 className="text-xl font-bold">{course.capstoneTitle}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{course.capstoneDescription}</p>
            </div>

            {/* Career Pathways */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#071B3D] flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-[#D4A54A]" />
                Potential Career Pathways
              </h2>
              <div className="flex flex-wrap gap-3">
                {course.careerPathways.map((role) => (
                  <span
                    key={role}
                    className="font-nav text-xs font-bold text-[#071B3D] bg-white border border-[#071B3D] px-4 py-2"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Columns — Sticky Course Enquiry Card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 border border-[#DFE5EE] bg-[#F4F7FC] p-6 space-y-5 shadow-md">
              <div className="border-b border-[#DFE5EE] pb-4">
                <p className="font-nav text-[11px] font-bold uppercase tracking-[0.18em] text-[#1746A2]">
                  ADMISSIONS &amp; BATCHES
                </p>
                <h3 className="text-xl font-bold text-[#071B3D] mt-1">
                  Enquire About This Programme
                </h3>
              </div>

              <ul className="space-y-3 text-sm text-[#101828]">
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4A54A]" />
                  <span>{course.durationLabel}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#1746A2]" />
                  <span>Weekday Morning / Evening / Weekend / Online</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4A54A]" />
                  <span>6th Block, Rajajinagar, Bengaluru</span>
                </li>
              </ul>

              <div className="p-3.5 bg-white border border-[#DFE5EE] text-xs text-[#667085]">
                <strong className="text-[#071B3D] block font-nav uppercase tracking-wider mb-1">
                  Fee Structure
                </strong>
                Request Fee Details via our admissions desk for current cohort schedules and student offers.
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    openDemoModal({
                      preselectedProgramme: course.title,
                      sourcePage: `/courses/${course.slug}-sidebar`,
                    })
                  }
                  className="btn-gold w-full py-3.5 text-xs uppercase tracking-wider"
                >
                  Book Free Demo &amp; Request Fees
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openBrochureModal({
                      preselectedProgramme: course.title,
                      brochureType: "course",
                      brochureSlug: course.slug,
                    })
                  }
                  className="btn-navy w-full py-3 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Syllabus PDF
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Programmes */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-[#F4F7FC] border-t border-[#DFE5EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#071B3D] mb-8">Related Certification Programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCourses.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/courses/${rc.slug}`}
                  className="bg-white border border-[#DFE5EE] p-6 hover:border-[#1746A2] transition-colors"
                >
                  <span className="font-nav text-[10px] font-bold uppercase tracking-wider text-[#1746A2]">
                    {rc.categoryName}
                  </span>
                  <h3 className="text-lg font-bold text-[#071B3D] mt-2">{rc.title}</h3>
                  <p className="text-xs text-[#667085] mt-2">{rc.durationLabel}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
