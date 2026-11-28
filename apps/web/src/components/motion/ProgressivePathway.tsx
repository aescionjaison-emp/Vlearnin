"use client";

import React, { useEffect, useRef } from "react";
import { animateConnectingLine } from "@/lib/motion/scroll-progress";

export function ProgressivePathway({
  className = "",
  scrub = true,
}: {
  className?: string;
  scrub?: boolean | number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return animateConnectingLine(barRef.current, wrapRef.current, { scrub });
  }, [scrub]);

  return (
    <div ref={wrapRef} className={`h-[2px] w-full bg-[#E1E6EC] overflow-hidden ${className}`}>
      <div ref={barRef} className="h-full w-full bg-[#2463A6] origin-left" />
    </div>
  );
}
