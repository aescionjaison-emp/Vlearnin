"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

/**
 * Static-First Photographic Parallax.
 * Image is 100% visible at load; moves subtly inside a fixed overflow-hidden frame.
 */
export function ParallaxImage({
  children,
  travelPx = 8,
  className = "",
}: {
  children: React.ReactNode;
  travelPx?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || isReducedMotionOrDisabled()) return;

    const image = frame.querySelector("img, video");
    if (!image) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        image,
        { y: -travelPx, scale: 1.06 },
        {
          y: travelPx,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    mm.add("(max-width: 768px)", () => {
      const mobileTravel = Math.max(4, Math.round(travelPx * 0.5));
      gsap.fromTo(
        image,
        { y: -mobileTravel, scale: 1.04 },
        {
          y: mobileTravel,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, [travelPx]);

  return (
    <div ref={frameRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
