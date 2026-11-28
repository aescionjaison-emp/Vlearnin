"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

/**
 * V4 Scroll-Controlled SVG Pathway (stroke-dashoffset scrubbed 0 -> 1).
 */
export function SvgPathway({
  orientation = "horizontal",
  triggerRef,
  onProgress,
  className = "",
}: {
  orientation?: "horizontal" | "vertical";
  triggerRef: React.RefObject<HTMLElement | null>;
  onProgress?: (p: number) => void;
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const trigger = triggerRef.current;
    if (!path || !trigger || isReducedMotionOrDisabled()) return;

    const length = path.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => onProgress?.(self.progress),
        },
      });
    });

    return () => ctx.revert();
  }, [triggerRef, onProgress]);

  if (orientation === "vertical") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 8 400"
        preserveAspectRatio="none"
        className={`w-2 h-full ${className}`}
      >
        <path d="M 4 0 L 4 400" stroke="#E1E6EC" strokeWidth="3" fill="none" />
        <path
          ref={pathRef}
          d="M 4 0 L 4 400"
          stroke="#2463A6"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 12"
      preserveAspectRatio="none"
      className={`w-full h-3 ${className}`}
    >
      <path d="M 0 6 L 1200 6" stroke="#E1E6EC" strokeWidth="3" fill="none" />
      <path
        ref={pathRef}
        d="M 0 6 C 300 6, 400 6, 600 6 C 800 6, 900 6, 1200 6"
        stroke="#2463A6"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
