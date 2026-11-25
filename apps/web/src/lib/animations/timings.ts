export const MOTION_TIMINGS = {
  micro: 0.15,
  hover: 0.3,
  dropdown: 0.22,
  fast: 0.18,
  standard: 0.3,
  entrance: 0.55,
  imageReveal: 0.65,
  carouselFade: 0.5,
  counter: 1.0,
  carouselAutoMs: 6500,
  staggerShort: 0.05,
  staggerStandard: 0.05, // Measured from MCU data-animation_delay: 50ms, 100ms, 150ms
  distanceSmall: 14,
  distanceStandard: 20,
} as const;
