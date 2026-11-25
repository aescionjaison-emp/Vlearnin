"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mount Carmel University uses native `scroll-behavior: smooth` (hasLenis: false).
 * Retaining native scrolling avoids artificial inertia while keeping ScrollTrigger
 * synchronized on load and resize.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(t);
  }, []);

  return <>{children}</>;
}
