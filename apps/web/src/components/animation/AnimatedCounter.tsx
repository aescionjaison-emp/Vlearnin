"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotionOrDisabled } from "@/lib/animations/presets";
import { MOTION_TIMINGS } from "@/lib/animations/timings";
import { MOTION_EASING } from "@/lib/animations/easing";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedCounter({
  value,
  padZero = false,
  className = "",
}: {
  value: number;
  padZero?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const formattedFinal = padZero && value < 10 ? `0${value}` : String(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotionOrDisabled()) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: MOTION_TIMINGS.counter,
        ease: MOTION_EASING.standard,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          const n = Math.round(obj.val);
          el.textContent = padZero && n < 10 ? `0${n}` : String(n);
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [value, padZero]);

  return (
    <p ref={ref} className={className}>
      {formattedFinal}
    </p>
  );
}
