import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function isReducedMotionOrDisabled(): boolean {
  if (typeof window === "undefined") return true;
  if (document.documentElement.dataset.animations === "disabled") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
