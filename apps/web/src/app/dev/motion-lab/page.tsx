"use client";

import React, { useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { RotateCcw, ArrowRight, Sparkles } from "lucide-react";
import { runHeroTimeline, runSplitEditorialTimeline } from "@/lib/motion/timelines";
import { FlipCard } from "@/components/motion/FlipCard";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";

export default function MotionLabPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [heroKey, setHeroKey] = useState(0);
  const [splitKey, setSplitKey] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(65);

  const heroRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return runHeroTimeline(heroRef.current);
  }, [heroKey]);

  useEffect(() => {
    return runSplitEditorialTimeline(splitRef.current, "left");
  }, [splitKey]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-white border border-[#E1E6EC] p-6 flex flex-wrap items-center justify-between gap-4 rounded-[15px]">
          <div>
            <p className="mc-eyebrow text-[#10264A]">DEVELOPMENT LABORATORY</p>
            <h1 className="text-3xl font-bold text-[#10264A] mt-1">
              VLEARNIN × Mount Carmel Motion Lab
            </h1>
            <p className="text-sm text-[#526477] mt-1">
              Isolated testbed for verified reference timelines (`MCU-01` through `MCU-14`).
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewportMode("desktop")}
              className={`px-4 py-2 text-xs font-nav font-semibold border ${
                viewportMode === "desktop" ? "bg-[#10264A] text-white" : "bg-white text-[#10264A]"
              }`}
            >
              Desktop Preview
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("mobile")}
              className={`px-4 py-2 text-xs font-nav font-semibold border ${
                viewportMode === "mobile" ? "bg-[#10264A] text-white" : "bg-white text-[#10264A]"
              }`}
            >
              Mobile Preview (390px)
            </button>
          </div>
        </div>

        <div className={viewportMode === "mobile" ? "max-w-[390px] mx-auto space-y-8" : "space-y-8"}>
          {/* Demo 1: MCU-04 Hero Sequential Timeline */}
          <div className="bg-white border border-[#E1E6EC] p-6 space-y-4 rounded-[15px]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#C49A59]">MCU-04 • 550ms • 50ms Stagger</span>
                <h2 className="text-2xl font-bold text-[#10264A]">Hero Coordinated Timeline</h2>
              </div>
              <button
                type="button"
                onClick={() => setHeroKey((k) => k + 1)}
                className="btn-navy px-4 py-2 text-xs inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay
              </button>
            </div>
            <div key={heroKey} ref={heroRef} className="bg-[#10264A] text-white p-8 space-y-3 rounded-[15px]">
              <p className="hero-eyebrow mc-eyebrow text-[#C49A59]">THE V-WAY TO LEARN, BUILD &amp; LEAD.</p>
              <h3 className="hero-headline font-editorial text-4xl font-bold">
                Shaping Future-Ready Talent
              </h3>
              <p className="hero-desc mc-lead text-white/85">
                Coordinated 50ms stagger matching Mount Carmel University&apos;s hero entrance.
              </p>
              <div className="hero-ctas pt-2">
                <span className="btn-gold mc-icon-btn px-5 py-2.5 text-xs inline-flex items-center gap-2">
                  Explore Programmes <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Demo 2: MCU-06 Split Curtain Reveal */}
          <div className="bg-white border border-[#E1E6EC] p-6 space-y-4 rounded-[15px]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#C49A59]">MCU-06 • 700ms • Curtain + Opposite Axis</span>
                <h2 className="text-2xl font-bold text-[#10264A]">Split Editorial Curtain Timeline</h2>
              </div>
              <button
                type="button"
                onClick={() => setSplitKey((k) => k + 1)}
                className="btn-navy px-4 py-2 text-xs inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay
              </button>
            </div>
            <div key={splitKey} ref={splitRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="split-image h-44 bg-[#10264A] text-white flex items-center justify-center font-bold">
                Image Curtain Mask (inset 100% → 0%)
              </div>
              <div className="split-content space-y-2">
                <h3 className="text-xl font-bold text-[#10264A]">Opposite-Axis Editorial Reveal</h3>
                <p className="split-stagger-item text-sm text-[#526477]">LEARN — Tools &amp; Concepts</p>
                <p className="split-stagger-item text-sm text-[#526477]">BUILD — Live Capstone Projects</p>
                <p className="split-stagger-item text-sm text-[#526477]">LEAD — Career Readiness</p>
              </div>
            </div>
          </div>

          {/* Demo 3: MCU-10 3D Flip Box */}
          <div className="bg-white border border-[#E1E6EC] p-6 space-y-4 rounded-[15px]">
            <div>
              <span className="text-xs font-bold text-[#C49A59]">MCU-10 • 600ms • rotateY(180deg)</span>
              <h2 className="text-2xl font-bold text-[#10264A]">3D Flip Card (Hover or Tap)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FlipCard
                className="h-52"
                front={
                  <div className="h-full bg-[#10264A] text-white p-6 flex flex-col justify-between border-t-4 border-[#C49A59] rounded-[15px]">
                    <Sparkles className="w-6 h-6 text-[#C49A59]" />
                    <h3 className="text-xl font-bold">100% Practical Pedagogy</h3>
                    <span className="text-xs text-white/75">Hover or tap to flip →</span>
                  </div>
                }
                back={
                  <div className="h-full bg-white border-2 border-[#10264A] p-6 flex flex-col justify-center space-y-2 rounded-[15px]">
                    <h4 className="text-lg font-bold text-[#10264A]">Live Business Datasets</h4>
                    <p className="text-sm text-[#526477]">
                      Every module is driven by real financial models, Power BI datasets, and AI workflows.
                    </p>
                  </div>
                }
              />
              <div className="bg-[#10264A] text-white p-6 flex flex-col justify-center rounded-[15px]">
                <span className="text-xs text-[#C49A59] uppercase">MCU-07 • 1000ms Counter</span>
                <AnimatedCounter value={30} className="mc-counter text-[#C49A59] mt-2" />
                <p className="text-sm mt-1">Hours Per Standalone Programme</p>
              </div>
            </div>
          </div>

          {/* Demo 4: MCU-11 Scrubbed Pathway Progress */}
          <div className="bg-white border border-[#E1E6EC] p-6 space-y-4 rounded-[15px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#C49A59]">MCU-11 • Scroll-Linked Scrub</span>
                <h2 className="text-2xl font-bold text-[#10264A]">Scrubbed Placement Progress</h2>
              </div>
              <label className="text-xs font-nav flex items-center gap-2">
                <span>Progress: {scrubProgress}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={scrubProgress}
                  onChange={(e) => setScrubProgress(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="h-2 bg-[#E1E6EC] overflow-hidden">
              <div
                className="h-full bg-[#C49A59] transition-transform duration-150 origin-left"
                style={{ transform: `scaleX(${scrubProgress / 100})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
