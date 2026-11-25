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
  const textColor = variant === "light" ? "text-white" : "text-[#071B3D]";
  const taglineColor = variant === "light" ? "text-[#E6C47A]" : "text-[#667085]";

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Official VLEARNIN V-Mark Emblem */}
      <svg
        width={compact ? 36 : 42}
        height={compact ? 36 : 42}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="4"
          fill={variant === "light" ? "#0E2954" : "#071B3D"}
          stroke="#D4A54A"
          strokeWidth="1.5"
        />
        <path
          d="M12.5 14L24 35L35.5 14"
          stroke="#FFFFFF"
          strokeWidth="3.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M18.5 14L24 24.5L29.5 14"
          stroke="#D4A54A"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-nav font-extrabold tracking-[0.14em] leading-none ${
            compact ? "text-lg" : "text-xl"
          } ${textColor}`}
        >
          VLEARNIN
        </span>
        {showTagline && !compact && (
          <span
            className={`font-nav text-[10px] font-semibold tracking-[0.12em] uppercase mt-1 leading-none ${taglineColor}`}
          >
            The V-Way to Learn, Build &amp; Lead.
          </span>
        )}
      </div>
    </div>
  );
}
