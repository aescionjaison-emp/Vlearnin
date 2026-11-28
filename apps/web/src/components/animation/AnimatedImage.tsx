"use client";

import React from "react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

/**
 * Static-First Image Frame — immediately visible with subtle scroll depth.
 */
export function AnimatedImage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  preset?: "imageMaskReveal" | "imageScaleReveal";
}) {
  return (
    <ParallaxImage travelPx={6} className={className}>
      {children}
    </ParallaxImage>
  );
}
