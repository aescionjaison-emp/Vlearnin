"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

export function AnimatedImage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  preset?: "imageMaskReveal" | "imageScaleReveal";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotionOrDisabled()) return;

    const img = el.querySelector("img, video");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      tl.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "expo.out", clearProps: "clipPath" },
        0,
      );
      if (img) {
        tl.fromTo(
          img,
          { scale: 1.07 },
          { scale: 1, duration: 0.95, ease: "power3.out", clearProps: "transform" },
          0,
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
