"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MOTION_PRESETS,
  MotionPresetName,
  prefersReducedMotionOrDisabled,
} from "@/lib/animations/presets";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  preset: MotionPresetName = "fadeUp",
  options?: { start?: string; delay?: number },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotionOrDisabled()) return;

    const config = MOTION_PRESETS[preset];
    const ctx = gsap.context(() => {
      gsap.fromTo(el, config.from, {
        ...config.to,
        delay: options?.delay ?? 0,
        clearProps: "transform,clipPath",
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 88%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, preset, options?.start, options?.delay]);
}
