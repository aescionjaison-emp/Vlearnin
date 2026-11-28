"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isEditorialMotionDisabled } from "@/lib/motion/motion-provider";
import { EDITORIAL_EASE } from "@/lib/motion/motion-easing";

export function ParallaxImage({
  children,
  rangePercent = 4,
  className = "",
}: {
  children: React.ReactNode;
  rangePercent?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || isEditorialMotionDisabled()) return;

    const target = wrap.querySelector("img, video");
    if (!target) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        target,
        { yPercent: -rangePercent, scale: 1.06 },
        {
          yPercent: rangePercent,
          scale: 1.06,
          ease: EDITORIAL_EASE.linear,
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    mm.add("(max-width: 1023px)", () => {
      const mobileRange = Math.max(2, Math.round(rangePercent / 2));
      gsap.fromTo(
        target,
        { yPercent: -mobileRange, scale: 1.04 },
        {
          yPercent: mobileRange,
          scale: 1.04,
          ease: EDITORIAL_EASE.linear,
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, [rangePercent]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
