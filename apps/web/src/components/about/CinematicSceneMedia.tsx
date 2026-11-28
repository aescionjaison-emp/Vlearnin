"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneAssetManifest } from "@/lib/about-scenes";

gsap.registerPlugin(ScrollTrigger);

interface CinematicSceneMediaProps {
  manifest: SceneAssetManifest;
  /** Controlled 0..1 progress for isolated preview scrubbing; undefined uses live ScrollTrigger */
  previewProgress?: number;
  className?: string;
  alt: string;
}

export function CinematicSceneMedia({
  manifest,
  previewProgress,
  className = "",
  alt,
}: CinematicSceneMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const cutoutRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLImageElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  const isPreview = typeof previewProgress === "number";

  // Mode B: map previewProgress directly to frame index
  useEffect(() => {
    if (!isPreview || manifest.mode !== "frames" || manifest.framePaths.length === 0) return;
    const total = manifest.framePaths.length;
    setFrameIndex(Math.min(total - 1, Math.max(0, Math.round(previewProgress * (total - 1)))));
  }, [isPreview, previewProgress, manifest.mode, manifest.framePaths.length]);

  // Mode C: apply direct transform when controlled by previewProgress
  useEffect(() => {
    if (!isPreview) return;
    const p = Math.min(1, Math.max(0, previewProgress));
    const range = manifest.movementRangePx;
    if (bgRef.current) {
      bgRef.current.style.transform = `scale(${1.05 - p * 0.05}) translateY(${(p - 0.5) * -range * 0.45}px)`;
    }
    if (cutoutRef.current) {
      cutoutRef.current.style.transform = `scale(${0.98 + p * 0.04}) translateY(${(0.5 - p) * range}px)`;
    }
    if (shadowRef.current) {
      shadowRef.current.style.transform = `translateY(${(0.5 - p) * range * 0.35}px) scale(${0.99 + p * 0.02})`;
    }
  }, [isPreview, previewProgress, manifest.movementRangePx]);

  // Live GSAP ScrollTrigger when not in manual preview scrub mode
  useEffect(() => {
    if (isPreview) return;
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (manifest.mode === "frames" && manifest.framePaths.length > 0) {
        const total = manifest.framePaths.length;
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          scrub: true,
          onUpdate: (self) => {
            setFrameIndex(Math.round(self.progress * (total - 1)));
          },
        });
        return;
      }

      const range = manifest.movementRangePx;
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.05, y: -range * 0.3 },
          {
            scale: 1.0,
            y: range * 0.3,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.55 },
          }
        );
      }
      if (cutoutRef.current) {
        gsap.fromTo(
          cutoutRef.current,
          { scale: 0.98, y: range * 0.6 },
          {
            scale: 1.02,
            y: -range * 0.5,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [isPreview, manifest]);

  if (manifest.mode === "video" && manifest.videoPath) {
    return (
      <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
        <video
          src={manifest.videoPath}
          poster={manifest.masterPath || manifest.backgroundPath || undefined}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (manifest.mode === "frames" && manifest.framePaths.length > 0) {
    const activeSrc = manifest.framePaths[frameIndex] || manifest.framePaths[0];
    return (
      <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
        <img src={activeSrc} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Clean Background Plate */}
      {manifest.backgroundPath && (
        <img
          ref={bgRef}
          src={manifest.backgroundPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
      )}

      {/* Natural Contact Shadow Layer */}
      {manifest.shadowPath && (
        <img
          ref={shadowRef}
          src={manifest.shadowPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none will-change-transform"
        />
      )}

      {/* Borderless Transparent RGBA Student Cutout (no frame, object-contain) */}
      {manifest.cutoutPath ? (
        <img
          ref={cutoutRef}
          src={manifest.cutoutPath}
          alt={alt}
          className="relative z-10 w-full h-full object-contain object-bottom will-change-transform"
        />
      ) : manifest.masterPath ? (
        <img
          ref={cutoutRef}
          src={manifest.masterPath}
          alt={alt}
          className="relative z-10 w-full h-full object-cover object-top will-change-transform"
        />
      ) : (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF9F6]/85 border border-dashed border-[#C49A59]">
          <span className="font-nav text-xs font-bold uppercase tracking-widest text-[#2463A6]">
            Awaiting External / Post-Cooldown Master Artwork
          </span>
          <p className="font-heading text-lg font-bold text-[#10264A] mt-2">{manifest.title}</p>
          <p className="text-xs text-[#526477] mt-1 max-w-md">
            Drop <code>master.webp</code> (or <code>cinematic.mp4</code>) into{" "}
            <code>public/images/about/{manifest.sceneId}/</code> and run{" "}
            <code>create-cutout.py</code>.
          </p>
        </div>
      )}
    </div>
  );
}
