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
 * Progressive-enhancement motion presets:
 * Note that `from.opacity` stays >= 0.92 (or uses transform/clipPath)
 * so essential content is NEVER invisible if ScrollTrigger has not fired.
 */
export const MOTION_PRESETS: Record<MotionPresetName, MotionPresetConfig> = {
  fadeIn: {
    from: { opacity: 0.72 },
    to: { opacity: 1, duration: 0.7, ease: MOTION_EASING.entrance },
  },
  fadeUp: {
    from: { y: 42, opacity: 0.85 },
    to: { y: 0, opacity: 1, duration: 0.75, ease: MOTION_EASING.entrance },
  },
  fadeDown: {
    from: { y: -28, opacity: 0.88 },
    to: { y: 0, opacity: 1, duration: 0.7, ease: MOTION_EASING.entrance },
  },
  revealLeft: {
    from: { x: -44, opacity: 0.88 },
    to: { x: 0, opacity: 1, duration: 0.78, ease: MOTION_EASING.entrance },
  },
  revealRight: {
    from: { x: 44, opacity: 0.88 },
    to: { x: 0, opacity: 1, duration: 0.78, ease: MOTION_EASING.entrance },
  },
  revealFromBottom: {
    from: { transformPerspective: 1000, y: 52, rotateX: 8, scale: 0.96, opacity: 0.85 },
    to: { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power4.out" },
  },
  headingReveal: {
    from: { clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0.9 },
    to: { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1, duration: 0.78, ease: "power4.out" },
  },
  imageMaskReveal: {
    from: { clipPath: "inset(8% 8% 12% 8% round 15px)", scale: 1.09 },
    to: {
      clipPath: "inset(0% 0% 0% 0% round 15px)",
      scale: 1,
      duration: 0.88,
      ease: MOTION_EASING.entrance,
    },
  },
  imageScaleReveal: {
    from: { scale: 1.08 },
    to: { scale: 1, duration: 0.85, ease: MOTION_EASING.entrance },
  },
  cardReveal: {
    from: { transformPerspective: 1000, y: 46, scale: 0.92, rotateX: 10, opacity: 0.85 },
    to: { y: 0, scale: 1, rotateX: 0, opacity: 1, duration: 0.76, ease: "back.out(1.2)" },
  },
  sectionReveal: {
    from: { transformPerspective: 1000, y: 40, rotateX: 4 },
    to: { y: 0, rotateX: 0, duration: 0.78, ease: "power4.out" },
  },
};

export function prefersReducedMotionOrDisabled(): boolean {
  if (typeof window === "undefined") return true;
  if (document.documentElement.dataset.animations === "disabled") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
