"use client";

import React from "react";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";

export function AnimatedStatistic({
  value,
  padZero = false,
  className = "",
}: {
  value: number;
  padZero?: boolean;
  className?: string;
}) {
  return <AnimatedCounter value={value} padZero={padZero} className={className} />;
}
