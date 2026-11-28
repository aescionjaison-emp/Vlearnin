"use client";

import React, { useEffect, useRef } from "react";
import { RevealDirection, animatePhotographicReveal } from "@/lib/motion/image-reveal";

export function PhotographicReveal({
  children,
  direction = "bottom",
  delay = 0,
  duration = 0.78,
  className = "",
}: {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return animatePhotographicReveal(ref.current, { direction, delay, duration });
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
