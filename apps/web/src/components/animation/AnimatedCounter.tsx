"use client";

import React from "react";

/**
 * Static-First Institutional Statistic.
 * Displays the exact verified number immediately from load without rolling or bouncing.
 */
export function AnimatedCounter({
  value,
  padZero = false,
  className = "",
}: {
  value: number;
  padZero?: boolean;
  className?: string;
}) {
  const formattedFinal = padZero && value < 10 ? `0${value}` : String(value);

  return (
    <p className={`tabular-nums leading-none ${className}`}>
      {formattedFinal}
    </p>
  );
}
