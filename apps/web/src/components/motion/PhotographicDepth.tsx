"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

/**
 * V4 Photographic Depth — Continuous scroll-linked scale + differential Y travel
 * inside a fixed overflow-hidden frame. Reverses naturally on upward scroll.
 */
export function PhotographicDepth({
  children,
  travelPx = 22,
  scaleFrom = 1.09,
  scaleTo = 1.0,
  className = "",
}: {
  children: React.ReactNode;
  travelPx?: number;
  scaleFrom?: number;
  scaleTo?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || isReducedMotionOrDisabled()) return;

    const img = frame.querySelector("img, video");
    if (!img) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        img,
        { y: -travelPx, scale: scaleFrom },
        {
          y: travelPx,
          scale: scaleTo,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    mm.add("(max-width: 768px)", () => {
      const mTravel = Math.max(6, Math.round(travelPx * 0.5));
      gsap.fromTo(
        img,
        { y: -mTravel, scale: Math.min(scaleFrom, 1.06) },
        {
          y: mTravel,
          scale: scaleTo,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, [travelPx, scaleFrom, scaleTo]);

  return (
    <div ref={frameRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
