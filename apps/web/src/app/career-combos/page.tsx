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
      <section className="bg-[#071B3D] text-white py-16 lg:py-20 border-b-4 border-[#D4A54A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#D4A54A]">
            DUAL-SKILL CAREER ACCELERATOR COMBOS
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 max-w-3xl">
            Combine Complementary Skills for Stronger Career Outcomes
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-4 max-w-2xl">
            Structured 45-to-90 hour pathways designed to help students and professionals build a
            multi-disciplinary portfolio for campus placements and corporate interviews.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {combos.map((combo, index) => (
            <article
              key={combo.slug}
              className="grid grid-cols-1 lg:grid-cols-12 border border-[#DFE5EE] bg-white shadow-xs overflow-hidden"
            >
              <div className="lg:col-span-5 relative min-h-[260px]">
                <Image
                  src={combo.image}
                  alt={combo.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#071B3D] text-[#D4A54A] font-nav text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                  Combo 0{index + 1}
                </div>
              </div>

              <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-nav text-[#667085]">
                    <span className="inline-flex items-center gap-1.5 text-[#071B3D] font-bold">
                      <Clock className="w-4 h-4 text-[#D4A54A]" />
                      {combo.durationLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#1746A2]" />
                      {combo.includedLabel}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#071B3D]">{combo.title}</h2>
                  <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
                    {combo.summary}
                  </p>
                  <p className="text-sm text-[#101828] bg-[#F4F7FC] px-4 py-2.5 border-l-4 border-[#D4A54A]">
                    <strong className="font-nav">Ideal For:</strong> {combo.idealFor}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {combo.outcomes.map((o) => (
                      <li key={o} className="text-sm text-[#101828] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1746A2] shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DFE5EE]">
                  <ComboActionsClient
                    comboTitle={combo.title}
                    comboDuration={combo.durationLabel}
                    comboSlug={combo.slug}
                  />
                  <Link
                    href={`/career-combos/${combo.slug}`}
                    className="font-nav text-xs font-bold uppercase tracking-wider text-[#1746A2] hover:text-[#071B3D] inline-flex items-center gap-1.5"
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
