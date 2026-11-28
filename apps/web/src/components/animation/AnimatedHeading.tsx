"use client";

import React, { useEffect, useRef } from "react";
import { gsap, isReducedMotionOrDisabled } from "@/lib/motion/accessibility";

export function AnimatedHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotionOrDisabled()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 22, opacity: 0.45 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          delay,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
