"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMotionDisabled } from "@/lib/motion/presets";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mount Carmel University uses native `scroll-behavior: smooth` (hasLenis: false).
 * Retaining native scrolling avoids artificial inertia while keeping ScrollTrigger
 * synchronized on load and resize, plus driving a sleek global scroll-progress bar.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 250);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }

    if (!progressRef.current || isMotionDisabled()) {
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        },
      );
    });

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#EA580C] scale-x-0"
        />
      </div>
      {children}
    </>
  );
}
