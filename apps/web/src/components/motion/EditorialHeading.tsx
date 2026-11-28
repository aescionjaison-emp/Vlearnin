"use client";

import React, { useEffect, useRef } from "react";
import { animateEditorialText } from "@/lib/motion/editorial-reveal";

export function EditorialHeading({
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
    return animateEditorialText(ref.current, { delay, y: 18, duration: 0.65 });
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
