/**
 * Centralized Editorial Motion Design Tokens (VLEARNIN)
 * Continuous, natural, photographic, restrained — zero PowerPoint-style slides.
 */
export const MOTION_TOKENS = {
  duration: {
    micro: 0.18,       // 180ms
    hover: 0.25,       // 250ms
    navigation: 0.35,  // 350ms
    filter: 0.32,      // 320ms
    text: 0.65,        // 650–700ms
    image: 0.78,       // 650–900ms
    heroImage: 0.9,    // 900ms
    statistic: 0.65,   // 650ms
    paragraph: 0.4,    // 400ms
    accentLine: 0.5,   // 500ms
  },
  stagger: {
    tight: 0.07,       // 70ms
    standard: 0.085,   // 85ms
    relaxed: 0.1,      // 100ms
  },
  distance: {
    textMax: 18,       // 16–24px max ordinary text translation
    arrowHover: 4,     // 3–4px directional arrow movement
    parallaxPercent: 4 // 3–6% subtle photographic depth
  },
  scale: {
    imageStart: 1.045, // 1.04–1.06 subtle settle
    imageHover: 1.04,  // 1.035–1.05
  },
  triggerStart: "top 86%",
} as const;
