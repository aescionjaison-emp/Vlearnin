"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, isEditorialMotionDisabled } from "@/lib/motion/motion-provider";

/**
 * Native Browser Scroll Coordinator.
 * Preserves native mouse-wheel and touch scrolling without inertia interception,
 * while keeping ScrollTrigger synchronized on font load, resize, and route changes.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 220);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }

    if (!progressRef.current || isEditorialMotionDisabled()) {
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener("resize", onResize);
      };
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
            scrub: true,
          },
        },
      );
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 160);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-gradient-to-r from-[#10264A] via-[#2463A6] to-[#C49A59] scale-x-0"
        />
      </div>
      {children}
    </>
  );
}
