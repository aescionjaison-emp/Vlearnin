"use client";

import React from "react";
import { PhotographicReveal } from "@/components/motion/PhotographicReveal";

export function AnimatedImage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  preset?: "imageMaskReveal" | "imageScaleReveal";
}) {
  return (
    <PhotographicReveal direction="bottom" className={className}>
      {children}
    </PhotographicReveal>
  );
}
