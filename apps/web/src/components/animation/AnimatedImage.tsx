"use client";

import React, { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AnimatedImage({
  children,
  className = "",
  preset = "imageMaskReveal",
}: {
  children: React.ReactNode;
  className?: string;
  preset?: "imageMaskReveal" | "imageScaleReveal";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollAnimation(ref, preset);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
