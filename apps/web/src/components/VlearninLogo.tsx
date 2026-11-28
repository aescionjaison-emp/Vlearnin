import React from "react";

interface VlearninLogoProps {
  variant?: "light" | "dark";
  compact?: boolean;
  showTagline?: boolean;
}

export function VlearninLogo({
  variant = "dark",
  compact = false,
  showTagline = true,
}: VlearninLogoProps) {
  const taglineColor = variant === "light" ? "text-[#93C5FD]" : "text-[#526477]";
  const wordmarkSrc =
    variant === "light"
      ? "/images/brand/vlearnin-wordmark-light.png"
      : "/images/brand/vlearnin-wordmark-dark.png";

  return (
    <div className="inline-flex flex-col items-start select-none">
      <img
        src={wordmarkSrc}
        alt="VLEARNIN — The V-Way to Learn, Build & Lead"
        className={`${compact ? "h-7 sm:h-8" : "h-9 sm:h-10"} w-auto object-contain`}
      />
      {showTagline && !compact && (
        <span
          className={`font-nav text-[9.5px] font-semibold tracking-[0.14em] uppercase mt-1 leading-none ${taglineColor}`}
        >
          The V-Way to Learn, Build &amp; Lead.
        </span>
      )}
    </div>
  );
}
