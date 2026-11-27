"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotionOrDisabled } from "@/lib/animations/presets";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animation 04 — Vertical Number-Roll Reveal.
 * Splits multi-digit numbers into individual vertical rolling digit reels inside
 * overflow-hidden clipping masks, preserving stable tabular-nums width and
 * showing exact final digits if animations are disabled.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const formattedFinal = padZero && value < 10 ? `0${value}` : String(value);
  const digits = formattedFinal.split("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotionOrDisabled()) return;

    const reels = el.querySelectorAll<HTMLElement>(".digit-reel");
    if (reels.length === 0) return;

    const ctx = gsap.context(() => {
      reels.forEach((reel, idx) => {
        const targetDigit = Number(reel.dataset.digit || "0");
        // Roll from 0 down to targetDigit (or through a full 10-step reel for drama)
        const targetYPercent = -(targetDigit / 10) * 100;
        gsap.fromTo(
          reel,
          { yPercent: 0 },
          {
            yPercent: targetYPercent,
            duration: 1.05 + idx * 0.14,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [formattedFinal]);

  return (
    <div
      ref={containerRef}
      aria-label={formattedFinal}
      className={`inline-flex items-center tabular-nums leading-none ${className}`}
    >
      {digits.map((ch, idx) => {
        const isNum = /\d/.test(ch);
        if (!isNum) {
          return <span key={idx}>{ch}</span>;
        }
        return (
          <span
            key={idx}
            className="inline-block overflow-hidden h-[1.05em] relative align-top"
            style={{ width: "0.62em" }}
          >
            <span
              data-digit={ch}
              className="digit-reel flex flex-col items-center will-change-transform"
              style={{ transform: `translateY(-${Number(ch) * 10}%)` }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="block h-[1.05em] leading-[1.05em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
}
