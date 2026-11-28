"use client";

import React from "react";
import { ExpandingPhotograph } from "@/components/motion/ExpandingPhotograph";

export function AnimatedImage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  preset?: "imageMaskReveal" | "imageScaleReveal";
}) {
  return (
    <ExpandingPhotograph insetPercent={8} scaleFrom={1.08} className={className}>
      {children}
    </ExpandingPhotograph>
  );
}
