import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Layers, ArrowRight } from "lucide-react";
import { OFFICIAL_COMBOS } from "@vlearnin/shared";
import { fetchComboBySlug, fetchCourses } from "@/lib/api";
import { ComboActionsClient } from "@/components/combos/ComboActionsClient";

export async function generateStaticParams() {
  return OFFICIAL_COMBOS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const combo = await fetchComboBySlug(slug);
  if (!combo) return { title: "Career Combo Not Found" };
  return {
    title: `${combo.title} (${combo.durationLabel})`,
    description: `${combo.summary} Ideal for: ${combo.idealFor}`,
  };
}

export default async function CareerComboDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [combo, allCourses] = await Promise.all([
    fetchComboBySlug(slug),
    fetchCourses(),
  ]);

  if (!combo) notFound();

  const includedCourses = allCourses.filter((c) =>
    combo.courseSlugs.includes(c.slug),
  );

  return (
    <div className="bg-white">
      <section className="bg-[#1D4ED8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <nav aria-label="Breadcrumb" className="text-xs font-nav text-white/70 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/career-combos" className="hover:text-white">Career Combos</Link>
              <span>/</span>
              <span className="text-[#93C5FD]">{combo.title}</span>
            </nav>

            <span className="inline-flex items-center gap-2 font-nav text-xs font-bold uppercase tracking-widest text-[#93C5FD]">
              <Clock className="w-4 h-4" />
              {combo.durationLabel}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight">
              {combo.title}
            </h1>
            <p className="text-base font-nav font-semibold text-[#93C5FD]">
              {combo.includedLabel}
            </p>
            <p className="text-base text-white/85 leading-relaxed">{combo.summary}</p>
            <div className="pt-2">
              <ComboActionsClient
                comboTitle={combo.title}
                comboDuration={combo.durationLabel}
                comboSlug={combo.slug}
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full border border-white/20 overflow-hidden shadow-2xl rounded-[15px]">
              <Image
                src={combo.image}
                alt={combo.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-7 bg-[#F8FAFC] border border-[#E5E7EB] space-y-4 rounded-[15px]">
              <h2 className="text-2xl font-bold text-[#1D4ED8]">Who Should Enroll</h2>
              <p className="text-base text-[#111827]">{combo.idealFor}</p>
              <p className="text-sm text-[#4B5563]">
                Fee Structure: <strong className="text-[#1D4ED8]">Request Fee Details</strong> via
                our Rajajinagar admissions team.
              </p>
            </div>

            <div className="p-7 bg-[#F8FAFC] border border-[#E5E7EB] space-y-4 rounded-[15px]">
              <h2 className="text-2xl font-bold text-[#1D4ED8]">Key Outcomes</h2>
              <ul className="space-y-2.5">
                {combo.outcomes.map((o) => (
                  <li key={o} className="text-sm text-[#111827] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1D4ED8] flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#EA580C]" />
              Included VLEARNIN Certification Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {includedCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="border border-[#E5E7EB] p-6 hover:border-[#1D4ED8] transition-colors flex flex-col justify-between space-y-4 rounded-[15px]"
                >
                  <div>
                    <span className="font-nav text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                      {course.categoryName}
                    </span>
                    <h3 className="text-lg font-bold text-[#1D4ED8] mt-2">{course.title}</h3>
                    <p className="text-sm text-[#4B5563] mt-2">{course.summary}</p>
                  </div>
                  <span className="font-nav text-xs font-bold text-[#1D4ED8] inline-flex items-center gap-1.5">
                    View Full Syllabus <ArrowRight className="w-3.5 h-3.5 text-[#EA580C]" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
