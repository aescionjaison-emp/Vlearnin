"use client";

import React, { useEffect, useRef } from "react";

const MAX_STAGGER_DESKTOP_MS = 160;
const STAGGER_STEP_DESKTOP_MS = 80;
const MAX_STAGGER_MOBILE_MS = 100;
const STAGGER_STEP_MOBILE_MS = 50;

function isReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  if (document.documentElement.dataset.animations === "disabled") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface ScrollPopProps {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  as?: "div" | "article" | "section" | "li";
  style?: React.CSSProperties;
}

/**
 * Lightweight scale-pop reveal on scroll using CSS animations + IntersectionObserver.
 * Falls back to fully visible content when JS or IntersectionObserver is unavailable.
 */
export function ScrollPop({
  children,
  className = "",
  delayIndex = 0,
  as: Tag = "div",
  style,
}: ScrollPopProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const desktopDelay = Math.min(Math.max(0, delayIndex) * STAGGER_STEP_DESKTOP_MS, MAX_STAGGER_DESKTOP_MS);
  const mobileDelay = Math.min(Math.max(0, delayIndex) * STAGGER_STEP_MOBILE_MS, MAX_STAGGER_MOBILE_MS);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isReducedMotion() || typeof IntersectionObserver === "undefined") {
      el.classList.remove("is-pending");
      return;
    }

    const rect = el.getBoundingClientRect();
    const alreadyVisibleOrAbove = rect.top < window.innerHeight * 0.92;
    if (alreadyVisibleOrAbove) {
      el.classList.remove("is-pending");
      el.classList.add("is-revealing");
      return;
    }

    el.classList.add("is-pending");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("is-pending");
          entry.target.classList.add("is-revealing");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mergedStyle = {
    ...style,
    "--pop-delay": `${desktopDelay}ms`,
    "--pop-delay-mobile": `${mobileDelay}ms`,
  } as React.CSSProperties;

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`scroll-pop ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}

/**
 * Observes all `[data-scroll-pop]` descendants inside a container and reveals
 * each one once with a simple scale-pop animation on viewport intersection.
 */
export function useScrollPopContainer(
  containerRef: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-scroll-pop]"));
    if (targets.length === 0) return;

    if (isReducedMotion() || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.remove("is-pending"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("is-pending");
          entry.target.classList.add("is-revealing");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    targets.forEach((el, idx) => {
      const groupIdx = Number(el.dataset.popIndex ?? idx % 3);
      const desktopDelay = Math.min(Math.max(0, groupIdx) * STAGGER_STEP_DESKTOP_MS, MAX_STAGGER_DESKTOP_MS);
      const mobileDelay = Math.min(Math.max(0, groupIdx) * STAGGER_STEP_MOBILE_MS, MAX_STAGGER_MOBILE_MS);
      el.style.setProperty("--pop-delay", `${desktopDelay}ms`);
      el.style.setProperty("--pop-delay-mobile", `${mobileDelay}ms`);
      el.classList.add("scroll-pop");

      if (el.dataset.popDone === "1") {
        el.classList.remove("is-pending");
        return;
      }

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.remove("is-pending");
        el.classList.add("is-revealing");
        el.dataset.popDone = "1";
        return;
      }

      el.classList.add("is-pending");
      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
