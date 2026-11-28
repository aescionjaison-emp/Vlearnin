/**
 * VLEARNIN — FLUID EDITORIAL MOTION V3
 * Three intensity levels:
 * - Level A (Signature): 850–1200ms, 35–65px, image masks & synchronized text
 * - Level B (Editorial): 550–850ms, 18–40px, staggered grids & directional reveals
 * - Level C (Micro):     180–350ms, 3–8px, buttons, links, filters & nav
 */
export const MOTION_V3 = {
  levelA: { duration: 0.95, ease: "expo.out", distance: 44 },
  levelB: { duration: 0.72, ease: "power3.out", distance: 28 },
  levelC: { duration: 0.24, ease: "power2.out", distance: 5 },
  stagger: {
    tight: 0.06,
    standard: 0.085,
    relaxed: 0.1,
  },
  triggerStart: "top 88%",
} as const;
