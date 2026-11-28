"use client";

import React from "react";

/**
 * Static-First Heading — always visible in its final position without scroll-entrance hiding.
 */
export function AnimatedHeading({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <Tag className={className}>{children}</Tag>;
}
