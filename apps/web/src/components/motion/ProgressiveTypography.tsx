"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

/**
 * V4 Signature Progressive Typography Illumination.
 * All words are visible from load in a readable muted slate (#7B8DA3) and
 * progressively illuminate to Deep Academic Navy (#10264A) or Accent Blue (#2463A6)
 * as the visitor scrolls. Reverses naturally on upward scroll.
 */
export function ProgressiveTypography({
  segments,
  className = "",
}: {
  segments: { text: string; accent?: boolean }[];
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isReducedMotionOrDisabled()) return;

    const words = el.querySelectorAll<HTMLElement>(".illum-word");
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { color: "#7B8DA3" },
        {
          color: (_i: number, target: HTMLElement) =>
            target.dataset.accent === "true" ? "#2463A6" : "#10264A",
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "center 45%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <p ref={containerRef} className={className}>
      {segments.map((seg, sIdx) =>
        seg.text.split(" ").map((word, wIdx) => (
          <span
            key={`${sIdx}-${wIdx}`}
            data-accent={seg.accent ? "true" : "false"}
            className="illum-word inline-block mr-[0.28em] text-[#10264A] transition-none"
          >
            {word}
          </span>
        )),
      )}
    </p>
  );
}
