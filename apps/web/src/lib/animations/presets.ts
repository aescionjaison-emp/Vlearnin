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
    from: { opacity: 0.92 },
    to: { opacity: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.standard },
  },
  fadeUp: {
    from: { y: MOTION_TIMINGS.distanceStandard, opacity: 0.94 },
    to: { y: 0, opacity: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.entrance },
  },
  fadeDown: {
    from: { y: -MOTION_TIMINGS.distanceSmall, opacity: 0.94 },
    to: { y: 0, opacity: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.entrance },
  },
  revealLeft: {
    from: { x: -MOTION_TIMINGS.distanceStandard, opacity: 0.94 },
    to: { x: 0, opacity: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.entrance },
  },
  revealRight: {
    from: { x: MOTION_TIMINGS.distanceStandard, opacity: 0.94 },
    to: { x: 0, opacity: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.entrance },
  },
  revealFromBottom: {
    from: { y: MOTION_TIMINGS.distanceStandard, opacity: 0.94 },
    to: { y: 0, opacity: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.entrance },
  },
  headingReveal: {
    from: { y: MOTION_TIMINGS.distanceSmall, opacity: 0.95 },
    to: { y: 0, opacity: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.entrance },
  },
  imageMaskReveal: {
    from: { clipPath: "inset(0 0 8% 0)", scale: 1.03 },
    to: {
      clipPath: "inset(0 0 0% 0)",
      scale: 1,
      duration: MOTION_TIMINGS.imageReveal,
      ease: MOTION_EASING.entrance,
    },
  },
  imageScaleReveal: {
    from: { scale: 1.04 },
    to: { scale: 1, duration: MOTION_TIMINGS.imageReveal, ease: MOTION_EASING.standard },
  },
  cardReveal: {
    from: { y: MOTION_TIMINGS.distanceSmall, scale: 0.985 },
    to: { y: 0, scale: 1, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.standard },
  },
  sectionReveal: {
    from: { y: MOTION_TIMINGS.distanceSmall },
    to: { y: 0, duration: MOTION_TIMINGS.entrance, ease: MOTION_EASING.standard },
  },
};

export function prefersReducedMotionOrDisabled(): boolean {
  if (typeof window === "undefined") return true;
  if (document.documentElement.dataset.animations === "disabled") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
