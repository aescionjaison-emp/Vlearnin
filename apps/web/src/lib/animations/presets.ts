import { MOTION_EASING } from "./easing";
import { MOTION_TIMINGS } from "./timings";

export type MotionPresetName =
  | "fadeIn"
  | "fadeUp"
  | "fadeDown"
  | "revealLeft"
  | "revealRight"
  | "revealFromBottom"
  | "headingReveal"
  | "imageMaskReveal"
  | "imageScaleReveal"
  | "cardReveal"
  | "sectionReveal";

export interface MotionPresetConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

/**
 * Premium editorial motion presets — clip-path wipes, momentum slides, skewed entrances.
 * Note: `from` states use transforms/clipPath so content is never invisible if
 * ScrollTrigger has not fired (opacity always >= 0.88).
 */
export const MOTION_PRESETS: Record<MotionPresetName, MotionPresetConfig> = {
  fadeIn: {
    from: { opacity: 0.72 },
    to: { opacity: 1, duration: 0.65, ease: "power2.out" },
  },
  fadeUp: {
    from: { y: 56, opacity: 0.88, skewY: 1.5 },
    to: { y: 0, opacity: 1, skewY: 0, duration: 0.85, ease: "expo.out" },
  },
  fadeDown: {
    from: { y: -32, opacity: 0.88 },
    to: { y: 0, opacity: 1, duration: 0.72, ease: "expo.out" },
  },
  revealLeft: {
    from: { x: -72, opacity: 0.88, skewX: -3 },
    to: { x: 0, opacity: 1, skewX: 0, duration: 0.88, ease: "expo.out" },
  },
  revealRight: {
    from: { x: 72, opacity: 0.88, skewX: 3 },
    to: { x: 0, opacity: 1, skewX: 0, duration: 0.88, ease: "expo.out" },
  },
  revealFromBottom: {
    from: { clipPath: "inset(100% 0 0 0)", y: 20 },
    to: { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.9, ease: "expo.out" },
  },
  headingReveal: {
    // Upward wipe — text is clipped from bottom, slides up into view
    from: { clipPath: "inset(0 0 100% 0)", y: 32 },
    to: { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.95, ease: "expo.out" },
  },
  imageMaskReveal: {
    from: { clipPath: "inset(10% 10% 10% 10% round 12px)", scale: 1.12 },
    to: {
      clipPath: "inset(0% 0% 0% 0% round 12px)",
      scale: 1,
      duration: 0.95,
      ease: "expo.out",
    },
  },
  imageScaleReveal: {
    from: { scale: 1.1, filter: "blur(4px)" },
    to: { scale: 1, filter: "blur(0px)", duration: 1.0, ease: "expo.out" },
  },
  cardReveal: {
    // Skewed upward entrance with momentum
    from: { y: 70, skewY: 3, opacity: 0.88 },
    to: { y: 0, skewY: 0, opacity: 1, duration: 0.82, ease: "expo.out" },
  },
  sectionReveal: {
    // Diagonal wipe from bottom-left
    from: { clipPath: "inset(0 100% 0 0)", x: -20 },
    to: { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.88, ease: "expo.out" },
  },
};

export function prefersReducedMotionOrDisabled(): boolean {
  if (typeof window === "undefined") return true;
  if (document.documentElement.dataset.animations === "disabled") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
