"use client";

import React from "react";
import { EditorialHeading } from "@/components/motion/EditorialHeading";

export function AnimatedHeading({
  as = "h2",
  children,
  className = "",
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <EditorialHeading as={as} className={className} delay={delay}>
      {children}
    </EditorialHeading>
  );
}
