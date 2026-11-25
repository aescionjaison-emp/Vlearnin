"use client";

import React, { useState } from "react";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

/**
 * 3D Flip Box inspired by Mount Carmel University's `.elementor-flip-box` cards.
 * Flips on hover (desktop), focus, and click/tap (mobile & keyboard).
 */
export function FlipCard({ front, back, className = "" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`mc-flip-perspective group ${flipped ? "is-flipped" : ""} ${className}`}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
    >
      <div className="mc-flip-inner relative w-full h-full">
        <div className="mc-flip-face mc-flip-front w-full h-full">{front}</div>
        <div className="mc-flip-face mc-flip-back w-full h-full">{back}</div>
      </div>
    </div>
  );
}
