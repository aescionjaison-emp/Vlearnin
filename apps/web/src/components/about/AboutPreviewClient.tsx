"use client";

import React, { useState } from "react";
import type { SceneAssetManifest } from "@/lib/about-scenes";
import { CinematicSceneMedia } from "@/components/about/CinematicSceneMedia";

const PROGRESS_STEPS = [0, 0.25, 0.5, 0.75, 1];

export function AboutPreviewClient({
  scenes,
}: {
  scenes: {
    vision: SceneAssetManifest;
    mission: SceneAssetManifest;
    philosophy: SceneAssetManifest;
  };
}) {
  const [progress, setProgress] = useState(0);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");

  const list = [
    {
      key: "vision" as const,
      eyebrow: "03 — Proof of Concept: Vision",
      heading: "Our Vision",
      body: "Equip students and professionals with practical, job-ready capabilities.",
      alt: "Thoughtful Indian student holding an open academic book and imagining her future",
      manifest: scenes.vision,
    },
    {
      key: "mission" as const,
      eyebrow: "04 — Proof of Concept: Mission",
      heading: "Our Mission",
      body: "Deliver mentor-led 30-hour certifications backed by capstones and QR verification.",
      alt: "Student developing practical laptop skills with mentor guidance",
      manifest: scenes.mission,
    },
    {
      key: "philosophy" as const,
      eyebrow: "05 — Proof of Concept: Philosophy",
      heading: "Our Educational Philosophy",
      body: "Hands-on learning on live datasets, financial models, ad managers, and production tools.",
      alt: "Student reading an open book as knowledge transforms into real-world capability",
      manifest: scenes.philosophy,
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 px-4 sm:px-8 space-y-10">
      <div className="max-w-7xl mx-auto bg-white border border-[#E1E6EC] rounded-[12px] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="font-nav text-xs font-bold uppercase tracking-widest text-[#2463A6]">
            Isolated Development Preview (Not Linked in Production Nav)
          </p>
          <h1 className="font-heading text-2xl font-extrabold text-[#10264A] mt-1">
            Beyond the Classroom V4 — 3-Scene Proof-of-Concept Inspector
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-[6px] border border-[#E1E6EC] overflow-hidden">
            <button
              type="button"
              onClick={() => setViewportMode("desktop")}
              className={`px-3 py-1.5 text-xs font-nav font-semibold cursor-pointer ${
                viewportMode === "desktop" ? "bg-[#10264A] text-white" : "bg-white text-[#10264A]"
              }`}
            >
              Desktop (1440px)
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("mobile")}
              className={`px-3 py-1.5 text-xs font-nav font-semibold cursor-pointer ${
                viewportMode === "mobile" ? "bg-[#10264A] text-white" : "bg-white text-[#10264A]"
              }`}
            >
              Mobile (390px)
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5">
            {PROGRESS_STEPS.map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setProgress(step)}
                className={`px-2.5 py-1.5 text-xs font-nav font-semibold rounded-[6px] cursor-pointer ${
                  progress === step
                    ? "bg-[#2463A6] text-white"
                    : "bg-[#F7F8FA] text-[#10264A] border border-[#E1E6EC]"
                }`}
              >
                {Math.round(step * 100)}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mx-auto transition-all space-y-12 ${
          viewportMode === "mobile" ? "max-w-[390px] border-x border-[#E1E6EC] bg-white" : "max-w-[1440px]"
        }`}
      >
        {list.map((item) => (
          <section
            key={item.key}
            className="relative overflow-hidden bg-white border border-[#E1E6EC] min-h-[540px] flex items-center"
          >
            <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 items-end">
              <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
                <span className="font-nav text-xs font-bold uppercase tracking-[0.18em] text-[#2463A6]">
                  {item.eyebrow}
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#10264A] leading-tight">
                  {item.heading}
                </h2>
                <p className="text-base sm:text-lg text-[#526477] leading-relaxed">{item.body}</p>
                <div className="pt-2 text-xs font-nav text-[#526477] space-y-1 border-t border-[#E1E6EC]">
                  <p>
                    <strong>Mode:</strong> {item.manifest.mode} | <strong>Progress:</strong>{" "}
                    {Math.round(progress * 100)}%
                  </p>
                  <p>
                    <strong>Cutout:</strong> {item.manifest.cutoutPath || "pending"} |{" "}
                    <strong>Background:</strong> {item.manifest.backgroundPath || "pending"}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 h-[380px] sm:h-[480px] relative">
                <CinematicSceneMedia
                  manifest={item.manifest}
                  previewProgress={progress}
                  alt={item.alt}
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
