/**
 * VLEARNIN — QUIET CONFIDENCE (V2 Motion Tokens)
 * "Make the interface respond, not perform."
 */
export const MOTION_TOKENS = {
  duration: {
    button: 0.2,       // 180–220ms
    nav: 0.25,         // 220–280ms
    imageHover: 0.35,  // 300–400ms
    cardBorder: 0.22,  // 220ms
    filter: 0.32,      // 320ms
    accordion: 0.26,   // 240–300ms
  },
  easing: {
    interaction: "cubic-bezier(0.22, 1, 0.36, 1)",
    interface: "cubic-bezier(0.2, 0, 0, 1)",
    linear: "none",
  },
  travel: {
    arrowPx: 4,
    parallaxHeroPx: 8,       // -8px to +8px (16px total)
    parallaxLargePx: 10,     // -10px to +10px (20px total)
    parallaxSupportPx: 5,    // -5px to +5px (10px total)
  },
  scale: {
    parallaxOverscan: 1.06,
    imageHover: 1.045,
  },
} as const;
