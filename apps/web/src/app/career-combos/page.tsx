import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock, Layers } from "lucide-react";
import { fetchCombos } from "@/lib/api";
import { ComboActionsClient } from "@/components/combos/ComboActionsClient";

export const metadata: Metadata = {
  title: "Career Accelerator Combos | Dual-Skill Tracks",
  description:
    "Combine complementary skills with VLEARNIN's four Career Accelerator Combos: Smart Office & AI Starter, Business Analytics Pro, Corporate Finance & IB Master, and Digital Creator & Growth Master.",
};

export default async function CareerCombosPage() {
  const combos = await fetchCombos();

  return (
    <div className="bg-white">
      <section className="bg-[#1D4ED8] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="type-page-title max-w-3xl">
            Combine Complementary Skills for <span className="italic">Stronger Career Outcomes</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-3 max-w-2xl">
            45-to-90 hour dual-skill tracks built for stronger portfolios and corporate interviews.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {combos.map((combo, index) => (
            <article
              key={combo.slug}
              className="grid grid-cols-1 lg:grid-cols-12 border border-[#E5E7EB] bg-white shadow-xs overflow-hidden rounded-[15px]"
            >
              <div className="lg:col-span-5 relative min-h-[260px]">
                <Image
                  src={combo.image}
                  alt={combo.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1D4ED8] text-[#93C5FD] font-nav text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-[10px]">
                  Combo 0{index + 1}
                </div>
              </div>

              <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-nav text-[#4B5563]">
                    <span className="inline-flex items-center gap-1.5 text-[#1D4ED8] font-bold">
                      <Clock className="w-4 h-4 text-[#EA580C]" />
                      {combo.durationLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#1D4ED8]" />
                      {combo.includedLabel}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1D4ED8]">{combo.title}</h2>
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                    {combo.summary}
                  </p>
                  <p className="text-sm text-[#111827] bg-[#F8FAFC] px-4 py-2.5 border-l-4 border-[#1D4ED8]">
                    <strong className="font-nav">Ideal For:</strong> {combo.idealFor}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {combo.outcomes.map((o) => (
                      <li key={o} className="text-sm text-[#111827] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E7EB]">
                  <ComboActionsClient
                    comboTitle={combo.title}
                    comboDuration={combo.durationLabel}
                    comboSlug={combo.slug}
                  />
                  <Link
                    href={`/career-combos/${combo.slug}`}
                    className="font-nav text-xs font-bold uppercase tracking-wider text-[#1D4ED8] hover:text-[#1D4ED8] inline-flex items-center gap-1.5"
                  >
                    <span>Full Track Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
