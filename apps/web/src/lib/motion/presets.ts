import { MOTION_EASE } from "./easing";
import { MOTION_TOKENS } from "./tokens";

export function isMotionDisabled(): boolean {
  if (typeof window === "undefined") return true;
  if (document.documentElement.dataset.animations === "disabled") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const MOTION_PRESETS = {
  textLineMask: {
    from: { yPercent: 18, opacity: 0.92 },
    to: {
      yPercent: 0,
      opacity: 1,
      duration: MOTION_TOKENS.textEntrance,
      ease: MOTION_EASE.entrance,
    },
  },
  curtainHorizontal: {
    from: { clipPath: "inset(0 100% 0 0)", scale: MOTION_TOKENS.imageScaleInitial },
    to: {
      clipPath: "inset(0 0% 0 0)",
      scale: 1,
      duration: MOTION_TOKENS.imageEntrance,
      ease: MOTION_EASE.entrance,
    },
  },
  curtainVertical: {
    from: { clipPath: "inset(0 0 100% 0)", scale: MOTION_TOKENS.imageScaleInitial },
    to: {
      clipPath: "inset(0 0 0% 0)",
      scale: 1,
      duration: MOTION_TOKENS.imageEntrance,
      ease: MOTION_EASE.entrance,
    },
  },
  revealLeft: {
    from: { x: -MOTION_TOKENS.distanceStandard, opacity: 0.94 },
    to: { x: 0, opacity: 1, duration: MOTION_TOKENS.sectionEntrance, ease: MOTION_EASE.entrance },
  },
  revealRight: {
    from: { x: MOTION_TOKENS.distanceStandard, opacity: 0.94 },
    to: { x: 0, opacity: 1, duration: MOTION_TOKENS.sectionEntrance, ease: MOTION_EASE.entrance },
  },
  cardStagger: {
    from: { y: MOTION_TOKENS.distanceSmall, scale: 0.985 },
    to: {
      y: 0,
      scale: 1,
      duration: MOTION_TOKENS.cardEntrance,
      stagger: MOTION_TOKENS.staggerInterval,
      ease: MOTION_EASE.default,
    },
  },
} as const;
