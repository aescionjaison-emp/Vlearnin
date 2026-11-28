"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMotionDisabled } from "@/lib/motion/presets";

gsap.registerPlugin(ScrollTrigger);

/**
 * Single coordinated scroll management system (Lenis + GSAP ScrollTrigger).
 * - Initializes Lenis once on desktop/motion-enabled browsers.
 * - Syncs Lenis RAF with gsap.ticker and ScrollTrigger.update.
 * - Handles resize, font loading, anchor links, and route changes cleanly.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const disabled = isMotionDisabled();
    let lenis: Lenis | null = null;
    let tickFn: ((time: number) => void) | null = null;

    if (!disabled) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tickFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickFn);
      gsap.ticker.lagSmoothing(0);
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 250);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 900);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }

    let ctx: gsap.Context | null = null;
    if (progressRef.current && !disabled) {
      ctx = gsap.context(() => {
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
              scrub: 0.2,
            },
          },
        );
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
      if (tickFn) gsap.ticker.remove(tickFn);
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Reset scroll cleanly on route change & refresh ScrollTrigger for new page height
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent"
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
