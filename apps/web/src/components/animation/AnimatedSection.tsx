"use client";

import React, { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AnimatedSection({
  children,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref, "sectionReveal");

  return (
    <section ref={ref} aria-label={ariaLabel} className={className}>
      {children}
    </section>
  );
}
