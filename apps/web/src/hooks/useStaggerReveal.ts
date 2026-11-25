"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MOTION_PRESETS,
  MotionPresetName,
  prefersReducedMotionOrDisabled,
} from "@/lib/animations/presets";
import { MOTION_TIMINGS } from "@/lib/animations/timings";

gsap.registerPlugin(ScrollTrigger);

export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  itemSelector = ".stagger-item",
  preset: MotionPresetName = "cardReveal",
  stagger: number = MOTION_TIMINGS.staggerStandard,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotionOrDisabled()) return;

    const items = container.querySelectorAll(itemSelector);
    if (items.length === 0) return;

    const config = MOTION_PRESETS[preset];
    const ctx = gsap.context(() => {
      gsap.fromTo(items, config.from, {
        ...config.to,
        stagger,
        clearProps: "transform,clipPath",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, itemSelector, preset, stagger]);
}
