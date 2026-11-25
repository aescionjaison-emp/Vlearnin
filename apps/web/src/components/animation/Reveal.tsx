"use client";

import React, { useRef } from "react";
import { MotionPresetName } from "@/lib/animations/presets";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Reveal({
  children,
  preset = "fadeUp",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  preset?: MotionPresetName;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollAnimation(ref, preset, { delay });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
