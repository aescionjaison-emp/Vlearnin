"use client";

import React, { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AnimatedHeading({
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
  useScrollAnimation(ref, "headingReveal", { delay });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
