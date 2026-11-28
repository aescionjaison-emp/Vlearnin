"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

/**
 * V4 Expanding Photograph — Scroll-driven clipPath inset (10% -> 0%) + internal scale (1.10 -> 1.00).
 * Continuously transforms with scroll progress and reverses naturally on upward scroll.
 */
export function ExpandingPhotograph({
  children,
  insetPercent = 10,
  scaleFrom = 1.1,
  className = "",
}: {
  children: React.ReactNode;
  insetPercent?: number;
  scaleFrom?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || isReducedMotionOrDisabled()) return;

    const img = frame.querySelector("img, video");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { clipPath: `inset(${insetPercent}% ${insetPercent}% ${insetPercent}% ${insetPercent}% round 12px)` },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top 92%",
            end: "center 45%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );

      if (img) {
        gsap.fromTo(
          img,
          { scale: scaleFrom },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 92%",
              end: "center 45%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, frameRef);

    return () => ctx.revert();
  }, [insetPercent, scaleFrom]);

  return (
    <div ref={frameRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
